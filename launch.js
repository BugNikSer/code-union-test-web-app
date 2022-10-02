const esbuild = require("esbuild");
const http = require("http");

// Start esbuild's server on a random local port
esbuild
  .serve(
    {
      servedir: "www",
      port: 8000,
    },
    {
      bundle: true,
      entryPoints: ["src/index.tsx"],
      outfile: "www/main.js",
    }
  )
  .then((result) => {
    const { host, port } = result;
    console.log('Running at', 'http://127.0.0.1:' + port);

    http
      .createServer((req, res) => {
        const options = {
          path: req.url,
          method: req.method,
        };
        let body = "";

        req.on("readable", () => {
          const chunk = req.read();
          if (chunk) {
            body += chunk;
          }
        });

        req.on("end", (e) => {
          const data = JSON.parse(body);

          const proxyReq = http.request(
            {
              hostname: "188.225.83.80",
              port: "6719",
              path: options.path,
              method: options.method,
              headers: {
                "Content-Type": "application/json",
              },
            },
            (proxyRes) => {
              console.log(`Proxy ${options.method} request ${options.path}`);
              proxyRes.setEncoding("utf8");
              proxyRes.on("data", (chunk) => {
                const response = JSON.parse(chunk);
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
                res.setHeader('Access-Control-Allow-Credentials', true);
                res.write(JSON.stringify(response));
                res.end();
              });
            }
          );

          proxyReq.on("error", (e) => {
            console.error(`problem with request: ${e.message}`);
          });

          proxyReq.write(JSON.stringify(data));
          proxyReq.end();
        });
      })
      .listen(3000);
  });

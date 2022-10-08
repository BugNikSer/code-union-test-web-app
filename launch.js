/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const esbuild = require("esbuild");
const http = require("http");

// Start esbuild's server
esbuild
  .serve(
    {
      servedir: "www",
      port: 8000,
    },
    {
      bundle: true,
      minify: true,
      entryPoints: ["src/index.tsx"],
      outfile: "www/main.js",
      sourcemap: true,
    }
  )
  .then((result) => {
    const { port } = result;
    console.log("Running at http://127.0.0.1:" + port);

    // Proxy server
    http
      .createServer((req, res) => {
        const options = {
          path: req.url,
          headers: req.headers,
          method: req.method,
        };
        let body = "";

        req.set;

        req.on("readable", () => {
          const chunk = req.read();
          if (chunk) {
            body += chunk;
          }
        });

        req.on("end", () => {
          if (options.method !== "OPTIONS") {
            let data;
            try {
              data = JSON.parse(body);
            } catch (e) {
              data = null;
            }

            const proxyHeaders = {};
            if (options.headers["content-type"]) {
              proxyHeaders["content-type"] = options.headers["content-type"];
            }
            if (options.headers["authorization"]) {
              proxyHeaders["authorization"] = options.headers["authorization"];
            }

            const proxyReq = http.request(
              {
                hostname: "188.225.83.80",
                port: "6719",
                path: options.path,
                method: options.method,
                headers: proxyHeaders,
              },
              (proxyRes) => {
                let proxyData = "";
                console.log(`Proxy ${options.method} request ${options.path}`);
                proxyRes.setEncoding("utf8");
                proxyRes.on("data", (chunk) => {
                  proxyData += chunk;
                });
                proxyRes.on("error", (error) => {
                  console.log(error);
                });
                proxyRes.on("end", () => {
                  const response = JSON.parse(proxyData);
                  res.setHeader("Access-Control-Allow-Origin", "*");
                  res.setHeader("Access-Control-Allow-Methods", "*");
                  res.setHeader("Access-Control-Allow-Headers", "*");
                  res.write(JSON.stringify(response));
                  res.end();
                });
              }
            );

            proxyReq.on("error", (e) => {
              console.error(`problem with request: ${e.message}`);
            });

            if (data) proxyReq.write(JSON.stringify(data));
            proxyReq.end();
          } else {
            console.log("skip OPTIONS request");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "*");
            res.setHeader("Access-Control-Allow-Headers", "*");
            res.end();
          }
        });
      })
      .listen(3000);
  });

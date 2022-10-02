import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: "Futura",
  },
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        // disableRipple: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
        },
      },
    },
    // MuiTextField: {
    //   styleOverrides: {
    //     root: {
    //       borderRadius: "20px",
    //     },
    //   },
    // },
  },
});

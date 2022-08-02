import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import { createTheme, ThemeProvider } from "@mui/material";
import App from "./App";

// import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

let theme = createTheme({
   palette: {
      primary: {
         light: "#63ccff",
         main: "#0d4c92", //primary
         dark: "#000", //hover
      },
   },
   components: {
      MuiButton: {
         styleOverrides: {
            root: {
               textTransform: "none",
            },
         },
      },
      MuiTextField: {
         styleOverrides: {
            root: {
               fontSize: "default",
               borderRadius: "10px",
            },
         },
      },
      MuiCard: {
         styleOverrides: {
            root: {
               borderRadius: "10px",
            },
         },
      },
      MuiCardContent: {
         styleOverrides: {
            root: {
               padding: "30px",
            },
         },
      },
      MuiTableRow: {
         styleOverrides: {
            head: {
               backgroundColor: "#f4f6f8",
            },
         },
      },
      MuiTableCell: {
         styleOverrides: {
            root: {
               borderBottom: "none",
            },
         },
      },
   },
});

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
   <div id="layout-wrapper">
      <ThemeProvider theme={theme}>
         <App />
      </ThemeProvider>
   </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

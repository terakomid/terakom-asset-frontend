import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { createTheme, ThemeProvider } from "@mui/material";

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

export default function Layout(props) {
   return (
      <ThemeProvider theme={theme}>
         <Header />
         <Sidebar />
         {props.render}
         <Footer />
      </ThemeProvider>
   );
}

import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function Layout(props) {
   return (
      <>
         <Header />
         <Sidebar />
         {props.render}
         <Footer />
      </>
   );
}

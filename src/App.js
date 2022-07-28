import React, { Component } from "react";

import Header from "./component/Header";
import Sidebar from "./component/Sidebar";

import "./App.css";

class App extends Component {
   render() {
      return (
         <>
            <Header />
            <Sidebar />
         </>
      );
   }
}

export default App;

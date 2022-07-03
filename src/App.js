// App.js

// React component
import React, { Component } from 'react';

import { BrowserRouter, Route, Routes } from "react-router-dom";

// Header
import Header from './component/Header';
import Sidebar from './component/Sidebar';

// Content
import Content from './content/dashboard/Content';

// Footer
import Footer from './component/Footer';

// CSS
import './App.css'

class App extends Component {

  render() {
    return (
      <div id="layout-wrapper">
        {/* Header */}
        <Header />

        {/* Sidebar */}
        <Sidebar />

        <div className='main-content'>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Content />} />
            </Routes>
          </BrowserRouter>

          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
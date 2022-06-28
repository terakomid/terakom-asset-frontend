// App.js

// React component
import React, { Component } from 'react';

// CSS
import "@popperjs/core";
import "bootstrap";

// Header
import Header from './component/Header';
import Sidebar from './component/Sidebar';

// Content
import Content from './content/home/Content';

// Footer
import Footer from './component/Footer';

class App extends Component {

  render() {
    return (
      <div id="layout-wrapper">
        <Header />
        <Sidebar />

        <div className='main-content'>
          <Content />
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
// App.js

// React component
import React, { Component } from 'react';

// Header
import Header from './component/Header';
// Sidebar
import Sidebar from './component/Sidebar';

// CSS
import './App.css'

class App extends Component {

  render() {
    return (
      <div>
        {/* Header */}
        <Header />

        {/* Sidebar */}
        <Sidebar />

      </div>
    );
  }
}

export default App;
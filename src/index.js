import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';

// CSS
import 'bootstrap-icons/font/bootstrap-icons.css';
// Sider & Header
import App from './App';
// Dashboard
import Dashboard from './content/dashboard/Content';
// Asset Location
import AssetLocation from './content/master-data/asset-location/Content';
// Asset Category
import AssetCategory from './content/master-data/asset-category/Content';
// Asset SubCategory
import AssetSubCategory from './content/master-data/asset-subcategory/Content';
// Asset Condition
import AssetCondition from './content/master-data/asset-condition/Content';
// Cost Center
import CostCenter from './content/master-data/cost-center/Content';
// Department
import Department from './content/master-data/department/Content';
// Vendor
import Vendor from './content/master-data/vendor/Content';
// IT
import It from './content/master-data/it/Content';

// Footer
import Footer from './component/Footer';

const root = ReactDOM.createRoot(document.getElementById('App'));
root.render(
  <div id="layout-wrapper">
    <BrowserRouter>
      <App />
      <Routes>
        <Route path='/' element={<Navigate to='/dashboard' />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/asset-location' element={<AssetLocation />} />
        <Route path='/asset-category' element={<AssetCategory />} />
        <Route path='/asset-subcategory' element={<AssetSubCategory />} />
        <Route path='/asset-condition' element={<AssetCondition />} />
        <Route path='/cost-center' element={<CostCenter />} />
        <Route path='/department' element={<Department />} />
        <Route path='/vendor' element={<Vendor />} />
        <Route path='/it' element={<It />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

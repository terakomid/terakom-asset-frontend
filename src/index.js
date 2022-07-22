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
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Sider & Header
import App from './App';

// Dashboard
import Dashboard from './content/dashboard/Content';

// User management
import UserRole from './content/user-management/user-role/Content';
import ListUser from './content/user-management/user-list/Content';
import ListUserAdd from './content/user-management/user-list/Add';

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
import ItSubType from './content/master-data/it-subtype/Content';

// Data Asset
import DataAsset from './content/data-asset/data-asset/Content';
import AssetIT from './content/data-asset/data-asset/AssetIT';
import AssetNonIT from './content/data-asset/data-asset/AssetNonIT';
import AssetNonITEdit from './content/data-asset/data-asset/AssetNonITEdit';
// History Asset
import HistoryAsset from './content/data-asset/history-asset/Content';
// Mutation Asset
import MutationAsset from './content/data-asset/mutation-asset/Content';
import AddMutationAsset from './content/data-asset/mutation-asset/Add';
// Maintenance Asset
import MaintenanceAsset from './content/data-asset/maintenance-asset/Content';
import AddMaintenanceAsset from './content/data-asset/maintenance-asset/Add';
// Stock Opname
import StockOpname from './content/data-asset/stock-opname/Content';
// Reception
import ReceptionAsset from './content/data-asset/reception-asset/Content';
import AddReceptionAsset from './content/data-asset/reception-asset/Add';

// Disposal
import DisposalAsset from './content/disposal-asset/Content';
import AddDisposalAsset from './content/disposal-asset/Add';

// Activity Log
import ActivityLog from './content/activity-log/Content';

// Help
import Help from './content/help/Content';
import HelpAdd from './content/help/Add';

// Footer
import Footer from './component/Footer';

const root = ReactDOM.createRoot(document.getElementById('App'));
root.render(
  <div id="layout-wrapper">
    <BrowserRouter>
      <App />
      <Routes>
        <Route exact index path='/' element={<Navigate to='/dashboard' />} />
        <Route path='/dashboard' element={<Dashboard />} />
        {/* User Management */}
        <Route path='/user-role' element={<UserRole />} />
        <Route path='/user-list' element={<ListUser />} />
        <Route path='/user-list-add' element={<ListUserAdd />} />
        {/* Master Data */}
        <Route path='/asset-location' element={<AssetLocation />} />
        <Route path='/asset-category' element={<AssetCategory />} />
        <Route path='/asset-subcategory' element={<AssetSubCategory />} />
        <Route path='/asset-condition' element={<AssetCondition />} />
        <Route path='/cost-center' element={<CostCenter />} />
        <Route path='/department' element={<Department />} />
        <Route path='/vendor' element={<Vendor />} />
        <Route path='/it' element={<It />} />
        <Route path='/it-subtype' element={<ItSubType />} />
        {/* Data Asset */}
        <Route path='/data-asset' element={<DataAsset />} />
        <Route path='/data-asset-it' element={<AssetIT />} />
        <Route path='/data-asset-non-it' element={<AssetNonIT />} />
        <Route path='/edit-data-asset-non-it' element={<AssetNonITEdit />} />
        <Route path='/history-asset' element={<HistoryAsset />} />
        <Route path='/mutation-asset' element={<MutationAsset />} />
        <Route path='/mutation-asset-add' element={<AddMutationAsset />} />
        <Route path='/maintenance-asset' element={<MaintenanceAsset />} />
        <Route path='/maintenance-asset-add' element={<AddMaintenanceAsset />} />
        <Route path='/stock-opname' element={<StockOpname />} />
        <Route path='/reception-asset' element={<ReceptionAsset />} />
        <Route path='/reception-asset-add' element={<AddReceptionAsset />} />
        {/* Disposal Asset */}
        <Route path='/disposal-asset' element={<DisposalAsset />} />
        <Route path='/disposal-asset-add' element={<AddDisposalAsset />} />
        {/* Activity Log */}
        <Route path='/activity-log' element={<ActivityLog />} />
        {/* Help */}
        <Route path='/help' element={<Help />} />
        <Route path='/help-add' element={<HelpAdd />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

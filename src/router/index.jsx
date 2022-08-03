import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Auth from "../component/Auth";
import Layout from "../component/Layout";

// Auth
import Login from "../views/auth/login";
import ForgotPassword from "../views/auth/forgot-password";

// Dashboard
import Dashboard from "../views/dashboard/Content";

// User management
import UserRole from "../views/user-management/user-role/Content";
import ListUser from "../views/user-management/user-list/Index";
import ListUserAdd from "../views/user-management/user-list/Add";
import ListUserEdit from "../views/user-management/user-list/Edit";

// Master Data
import AssetLocation from "../views/master-data/asset-location";
import AssetCategory from "../views/master-data/asset-category";
import AssetSubCategory from "../views/master-data/asset-subcategory";
import Vendor from "../views/master-data/vendor";
import VendorForm from "../views/master-data/vendor/Form";
import CostCenter from "../views/master-data/cost-center";
import Department from "../views/master-data/department";
import AssetCondition from "../views/master-data/asset-condition";
import It from "../views/master-data/it";
import ItSubType from "../views/master-data/it-subtype";

import DataAsset from "../views/data-asset/data-asset";
import AssetIT from "../views/data-asset/data-asset/IT/Add";
import AssetITEdit from "../views/data-asset/data-asset/IT/Edit";
import AssetNonIT from "../views/data-asset/data-asset/NonIT/Add";
import AssetNonITEdit from "../views/data-asset/data-asset/NonIT/Edit";
import HistoryAsset from "../views/data-asset/history-asset/Content";
import MutationAsset from "../views/data-asset/mutation-asset/Content";
import AddMutationAsset from "../views/data-asset/mutation-asset/Add";
import MaintenanceAsset from "../views/data-asset/maintenance-asset/Content";
import AddMaintenanceAsset from "../views/data-asset/maintenance-asset/Add";
import StockOpname from "../views/data-asset/stock-opname/Content";
import ReceptionAsset from "../views/data-asset/reception-asset/Content";
import AddReceptionAsset from "../views/data-asset/reception-asset/Add";

// Disposal
import DisposalAsset from "../views/disposal-asset/Content";
import AddDisposalAsset from "../views/disposal-asset/Add";

// Activity Log
import ActivityLog from "../views/activity-log/Content";

// Help
import Help from "../views/help/Content";
import HelpAdd from "../views/help/Add";

export default function Router() {
   return (
      <BrowserRouter>
         <Routes>
            <Route exact index path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Auth render={<Login />} />} />
            <Route path="/forgot-password" element={<Auth render={<ForgotPassword />} />} />

            {/* Dashboard */}
            <Route path="/dashboard" element={<Layout render={<Dashboard />} />} />

            {/* User Management */}
            <Route path="/user-role" element={<Layout render={<UserRole />} />} />
            <Route path="/user-list" element={<Layout render={<ListUser />} />} />
            <Route path="/user-list-add" element={<Layout render={<ListUserAdd />} />} />
            <Route path="/user-list-edit/:id" element={<Layout render={<ListUserEdit />} />} />

            {/* Master Data */}
            <Route path="/master-data/asset-location" element={<Layout render={<AssetLocation />} />} />
            <Route path="/master-data/asset-category" element={<Layout render={<AssetCategory />} />} />
            <Route path="/master-data/asset-subcategory/:id" element={<Layout render={<AssetSubCategory />} />} />
            <Route path="/master-data/vendor" element={<Layout render={<Vendor />} />} />
            <Route path="/master-data/vendor/create" element={<Layout render={<VendorForm />} />} />
            <Route path="/master-data/vendor/edit/:id" element={<Layout render={<VendorForm />} />} />
            <Route path="/master-data/cost-center" element={<Layout render={<CostCenter />} />} />
            <Route path="/master-data/department" element={<Layout render={<Department />} />} />
            <Route path="/master-data/asset-condition" element={<Layout render={<AssetCondition />} />} />
            <Route path="/master-data/it" element={<Layout render={<It />} />} />
            <Route path="/master-data/it-subtype/:id" element={<Layout render={<ItSubType />} />} />

            {/* Data Asset */}
            <Route path="/data-asset" element={<Layout render={<DataAsset />} />} />
            <Route path="/data-asset-it" element={<Layout render={<AssetIT />} />} />
            <Route path="/data-asset-it/:id" element={<Layout render={<AssetITEdit />} />} />
            <Route path="/data-asset-non-it" element={<Layout render={<AssetNonIT />} />} />
            <Route path="/edit-data-asset-non-it" element={<Layout render={<AssetNonITEdit />} />} />
            <Route path="/history-asset" element={<Layout render={<HistoryAsset />} />} />
            <Route path="/mutation-asset" element={<Layout render={<MutationAsset />} />} />
            <Route path="/mutation-asset-add" element={<Layout render={<AddMutationAsset />} />} />
            <Route path="/maintenance-asset" element={<Layout render={<MaintenanceAsset />} />} />
            <Route path="/maintenance-asset-add" element={<Layout render={<AddMaintenanceAsset />} />} />
            <Route path="/stock-opname" element={<Layout render={<StockOpname />} />} />
            <Route path="/reception-asset" element={<Layout render={<ReceptionAsset />} />} />
            <Route path="/reception-asset-add" element={<Layout render={<AddReceptionAsset />} />} />

            {/* Disposal Asset */}
            <Route path="/disposal-asset" element={<Layout render={<DisposalAsset />} />} />
            <Route path="/disposal-asset-add" element={<Layout render={<AddDisposalAsset />} />} />

            {/* Activity Log */}
            <Route path="/activity-log" element={<Layout render={<ActivityLog />} />} />

            {/* Help */}
            <Route path="/help" element={<Layout render={<Help />} />} />
            <Route path="/help-add" element={<Layout render={<HelpAdd />} />} />
         </Routes>
      </BrowserRouter>
   );
}

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import * as Middleware from "../middleware";

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
import AssetITDetail from "../views/data-asset/data-asset/IT/Detail";
import AssetNonIT from "../views/data-asset/data-asset/NonIT/Add";
import AssetNonITEdit from "../views/data-asset/data-asset/NonIT/Edit";
import AssetNonITDetail from "../views/data-asset/data-asset/NonIT/Detail";
import HistoryAsset from "../views/data-asset/history-asset";
import MutationAsset from "../views/data-asset/mutation-asset/Content";
import AddMutationAsset from "../views/data-asset/mutation-asset/Add";
import MaintenanceAsset from "../views/data-asset/maintenance-asset/Content";
import AddMaintenanceAsset from "../views/data-asset/maintenance-asset/Add";
import StockOpname from "../views/data-asset/stock-opname/Index";
import ReceptionAsset from "../views/data-asset/reception-asset/Content";
import AddReceptionAsset from "../views/data-asset/reception-asset/Add";

// Disposal
import DisposalAsset from "../views/disposal-asset/Index";
import AddDisposalAsset from "../views/disposal-asset/Add";
import EditDisposalAsset from "../views/disposal-asset/Edit";

// Activity Log
import ActivityLog from "../views/activity-log/Content";

// Help
import Help from "../views/help/Content";
import HelpAdd from "../views/help/Add";

export default function Router() {
   return (
      <BrowserRouter>
         <Routes>
            <Route exact path="/" element={<Navigate to="/login" />} />
            <Route
               path="/login"
               element={
                  <Middleware.Before>
                     <Auth render={<Login />} />
                  </Middleware.Before>
               }
            />
            <Route
               path="/forgot-password"
               element={
                  <Middleware.Before>
                     <Auth render={<ForgotPassword />} />
                  </Middleware.Before>
               }
            />

            {/* Dashboard */}
            <Route
               path="/dashboard"
               element={
                  <Middleware.After>
                     <Layout render={<Dashboard />} />
                  </Middleware.After>
               }
            />

            {/* User Management */}
            <Route
               path="/user-role"
               element={
                  <Middleware.After>
                     <Layout render={<UserRole />} />
                  </Middleware.After>
               }
            />
            <Route
               path="/user-list"
               element={
                  <Middleware.After>
                     <Layout render={<ListUser />} />
                  </Middleware.After>
               }
            />
            <Route
               path="/user-list-add"
               element={
                  <Middleware.After>
                     <Layout render={<ListUserAdd />} />
                  </Middleware.After>
               }
            />
            <Route
               path="/user-list-edit/:id"
               element={
                  <Middleware.After>
                     <Layout render={<ListUserEdit />} />
                  </Middleware.After>
               }
            />

            {/* Master Data */}
            <Route
               path="/master-data/asset-location"
               element={
                  <Middleware.After>
                     <Layout render={<AssetLocation />} />
                  </Middleware.After>
               }
            />
            <Route
               path="/master-data/asset-category"
               element={
                  <Middleware.After>
                     <Layout render={<AssetCategory />} />
                  </Middleware.After>
               }
            />
            <Route
               path="/master-data/asset-subcategory/:id"
               element={
                  <Middleware.After>
                     <Layout render={<AssetSubCategory />} />
                  </Middleware.After>
               }
            />
            <Route
               path="/master-data/vendor"
               element={
                  <Middleware.After>
                     <Layout render={<Vendor />} />
                  </Middleware.After>
               }
            />
            <Route
               path="/master-data/vendor/add"
               element={
                  <Middleware.After>
                     <Layout render={<VendorForm />} />
                  </Middleware.After>
               }
            />
            <Route
               path="/master-data/vendor/edit/:id"
               element={
                  <Middleware.After>
                     <Layout render={<VendorForm />} />
                  </Middleware.After>
               }
            />
            <Route
               path="/master-data/cost-center"
               element={
                  <Middleware.After>
                     <Layout render={<CostCenter />} />
                  </Middleware.After>
               }
            />
            <Route
               path="/master-data/department"
               element={
                  <Middleware.After>
                     <Layout render={<Department />} />
                  </Middleware.After>
               }
            />
            <Route
               path="/master-data/asset-condition"
               element={
                  <Middleware.After>
                     <Layout render={<AssetCondition />} />
                  </Middleware.After>
               }
            />
            <Route
               path="/master-data/it"
               element={
                  <Middleware.After>
                     <Layout render={<It />} />
                  </Middleware.After>
               }
            />
            <Route
               path="/master-data/it-subtype/:id"
               element={
                  <Middleware.After>
                     <Layout render={<ItSubType />} />
                  </Middleware.After>
               }
            />

            {/* Data Asset */}
            <Route
               path="/data-asset"
               element={
                  <Middleware.After>
                     <Layout render={<DataAsset />} />
                  </Middleware.After>
               }
            />
            <Route
               path="/data-asset-it"
               element={
                  <Middleware.After>
                     <Layout render={<AssetIT />} />
                  </Middleware.After>
               }
            />
            <Route
               path="/edit-data-asset-it/:id"
               element={
                  <Middleware.After>
                     <Layout render={<AssetITEdit />} />
                  </Middleware.After>
               }
            />
            <Route
               path="/detail-data-asset-it/:id"
               element={
                  <Middleware.After>
                     <Layout render={<AssetITDetail />} />
                  </Middleware.After>
               }
            />
            <Route
               path="/data-asset-non-it"
               element={
                  <Middleware.After>
                     <Layout render={<AssetNonIT />} />
                  </Middleware.After>
               }
            />
            <Route
               path="/edit-data-asset-non-it/:id"
               element={
                  <Middleware.After>
                     <Layout render={<AssetNonITEdit />} />
                  </Middleware.After>
               }
            />
            <Route
               path="/detail-data-asset-non-it/:id"
               element={
                  <Middleware.After>
                     <Layout render={<AssetNonITDetail />} />
                  </Middleware.After>
               }
            />
            <Route
               path="/history-asset"
               element={
                  <Middleware.After>
                     <Layout render={<HistoryAsset />} />
                  </Middleware.After>
               }
            />
            <Route
               path="/history-asset/mutation-asset"
               element={
                  <Middleware.After>
                     <Layout render={<MutationAsset />} />
                  </Middleware.After>
               }
            />
            <Route
               path="/history-asset/mutation-asset/add"
               element={
                  <Middleware.After>
                     <Layout render={<AddMutationAsset />} />
                  </Middleware.After>
               }
            />
            <Route
               path="/history-asset/maintenance-asset"
               element={
                  <Middleware.After>
                     <Layout render={<MaintenanceAsset />} />
                  </Middleware.After>
               }
            />
            <Route
               path="/history-asset/maintenance-asset/add"
               element={
                  <Middleware.After>
                     <Layout render={<AddMaintenanceAsset />} />
                  </Middleware.After>
               }
            />
            <Route
               path="/history-asset/stock-opname"
               element={
                  <Middleware.After>
                     <Layout render={<StockOpname />} />
                  </Middleware.After>
               }
            />
            <Route
               path="/reception-asset"
               element={
                  <Middleware.After>
                     <Layout render={<ReceptionAsset />} />
                  </Middleware.After>
               }
            />
            <Route
               path="/reception-asset-add"
               element={
                  <Middleware.After>
                     <Layout render={<AddReceptionAsset />} />
                  </Middleware.After>
               }
            />

            {/* Disposal Asset */}
            <Route
               path="/disposal-asset"
               element={
                  <Middleware.After>
                     <Layout render={<DisposalAsset />} />
                  </Middleware.After>
               }
            />
            <Route
               path="/disposal-asset-add"
               element={
                  <Middleware.After>
                     <Layout render={<AddDisposalAsset />} />
                  </Middleware.After>
               }
            />
            <Route
               path="/disposal-asset-edit/:id"
               element={
                  <Middleware.After>
                     <Layout render={<EditDisposalAsset />} />
                  </Middleware.After>
               }
            />

            {/* Activity Log */}
            <Route
               path="/activity-log"
               element={
                  <Middleware.After>
                     <Layout render={<ActivityLog />} />
                  </Middleware.After>
               }
            />

            {/* Help */}
            <Route
               path="/help"
               element={
                  <Middleware.After>
                     <Layout render={<Help />} />
                  </Middleware.After>
               }
            />
            <Route
               path="/help-add"
               element={
                  <Middleware.After>
                     <Layout render={<HelpAdd />} />
                  </Middleware.After>
               }
            />
         </Routes>
      </BrowserRouter>
   );
}

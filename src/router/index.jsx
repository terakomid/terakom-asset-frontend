import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import * as Middleware from "../middleware";

import Auth from "../component/Auth";
import Layout from "../component/Layout";

// Auth
import Login from "../views/auth/login";
import ResetPassword from "../views/auth/reset-password";
import NewPassword from "../views/auth/new-password";

//Header
import Profil from "../views/headers/profil/Form";
import ChangePassword from "../views/headers/reset-password/Form";
import AllNotification from "../views/headers/notification"

// Dashboard
import Dashboard from "../views/dashboard/Index";
import DashboardByCategory from "../views/dashboard/by-category";
import DashboardAssetIt from "../views/dashboard/asset-it";

// User management
import UserRole from "../views/user-management/user-role/Content";
import ListUser from "../views/user-management/user-list";
import ListUserAdd from "../views/user-management/user-list/Add";
import ListUserEdit from "../views/user-management/user-list/Edit";
import AddUserReplacement from "../views/user-management/user-replacement/Add"

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
import HelpAdmin from "../views/master-data/help-admin";

// Data stock
import DataStock from '../views/data-stock'
import DataStockByCategory from '../views/data-stock/data-stock-by-category'

import DataAsset from "../views/data-asset/data-asset";
import AssetIT from "../views/data-asset/data-asset/IT/Add";
import AssetITEdit from "../views/data-asset/data-asset/IT/Edit";
import AssetITDetail from "../views/data-asset/data-asset/IT/Detail";
import AssetNonIT from "../views/data-asset/data-asset/NonIT/Add";
import AssetNonITEdit from "../views/data-asset/data-asset/NonIT/Edit";
import AssetNonITDetail from "../views/data-asset/data-asset/NonIT/Detail";

import HistoryAsset from "../views/data-asset/history-asset";
import PrintLabel from "../views/data-asset/history-asset/PrintLabel";

import MutationAsset from "../views/data-asset/mutation-asset";
import AddMutationAsset from "../views/data-asset/mutation-asset/Add";
import EditMutationAsset from "../views/data-asset/mutation-asset/Edit";

import MaintenanceAsset from "../views/data-asset/maintenance-asset";
import AddMaintenanceAsset from "../views/data-asset/maintenance-asset/Add";
import EditMaintenanceAsset from "../views/data-asset/maintenance-asset/Edit";

import StockOpname from "../views/data-asset/stock-opname";

import AcceptanceAsset from "../views/data-asset/acceptance-asset";
import AddAcceptanceAsset from "../views/data-asset/acceptance-asset/Add";
import EditAcceptanceAsset from "../views/data-asset/acceptance-asset/Edit";
import DetailAcceptanceAsset from "../views/data-asset/acceptance-asset/Detail";

//Qr Tagging
import QrTagging from "../views/qr-tagging";

// Disposal
import DisposalAsset from "../views/disposal-asset";
import AddDisposalAsset from "../views/disposal-asset/Add";
import EditDisposalAsset from "../views/disposal-asset/Edit";
import HistoryDisposal from "../views/disposal-asset/history-disposal";
import DetailDisposal from "../views/disposal-asset/history-disposal/Detail";

// Activity Log
import ActivityLog from "../views/activity-log";

// Help
import Help from "../views/help";
import HelpAdd from "../views/help/Add";
import HelpDetail from "../views/help/Detail";
import HelpExport from "../views/help/Export";

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
               path="/reset-password"
               element={
                  <Middleware.Before>
                     <Auth render={<ResetPassword />} />
                  </Middleware.Before>
               }
            />
            <Route
               path="/reset-password/:token"
               element={
                  <Middleware.Before>
                     <Auth render={<NewPassword />} />
                  </Middleware.Before>
               }
            />

            {/* Headers */}
            <Route
               path="/profil"
               element={
                  <Middleware.After>
                     <Layout render={<Profil />} />
                  </Middleware.After>
               }
            />
            <Route
               path="/change-password"
               element={
                  <Middleware.After>
                     <Layout render={<ChangePassword />} />
                  </Middleware.After>
               }
            />
            <Route
               path="/notification"
               element={
                  <Middleware.After>
                     <Layout render={<AllNotification />} />
                  </Middleware.After>
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
            <Route
               path="/dashboard-by-category/:id"
               element={
                  <Middleware.After>
                     <Layout render={<DashboardByCategory />} />
                  </Middleware.After>
               }
            />
            <Route
               path="/dashboard-asset-it"
               element={
                  <Middleware.After>
                     <Layout render={<DashboardAssetIt />} />
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
               path="/user-replacement"
               element={
                  <Middleware.After>
                     <Layout render={<AddUserReplacement />} />
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
            <Route
               path="/master-data/help-admin"
               element={
                  <Middleware.After>
                     <Layout render={<HelpAdmin />} />
                  </Middleware.After>
               }
            />

            {/* Data Stock */}
            <Route
               path="/data-stock"
               element={
                  <Middleware.After>
                     <Layout render={<DataStock />} />
                  </Middleware.After>
               }
            />
            <Route
               path="/data-stock/:id"
               element={
                  <Middleware.After>
                     <Layout render={<DataStockByCategory />} />
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
               path="/history-asset/print-label"
               element={
                  <Middleware.After>
                     <Layout render={<PrintLabel />} />
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
               path="/history-asset/mutation-asset/edit/:id"
               element={
                  <Middleware.After>
                     <Layout render={<EditMutationAsset />} />
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
               path="/history-asset/maintenance-asset/edit/:id"
               element={
                  <Middleware.After>
                     <Layout render={<EditMaintenanceAsset />} />
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
               path="/acceptance-asset"
               element={
                  <Middleware.After>
                     <Layout render={<AcceptanceAsset />} />
                  </Middleware.After>
               }
            />
            <Route
               path="/acceptance-asset/add"
               element={
                  <Middleware.After>
                     <Layout render={<AddAcceptanceAsset />} />
                  </Middleware.After>
               }
            />
            <Route
               path="/acceptance-asset/edit/:id"
               element={
                  <Middleware.After>
                     <Layout render={<EditAcceptanceAsset />} />
                  </Middleware.After>
               }
            />
            <Route
               path="/acceptance-asset/detail/:id"
               element={
                  <Middleware.After>
                     <Layout render={<DetailAcceptanceAsset />} />
                  </Middleware.After>
               }
            />

            {/* QR Tagging */}
            <Route
               path="/qr-tagging"
               element={
                  <Middleware.After>
                     <Layout render={<QrTagging />} />
                  </Middleware.After>
               }
            />

            {/* Disposal Asset */}
            <Route
               path="/history-disposal"
               element={
                  <Middleware.After>
                     <Layout render={<HistoryDisposal />} />
                  </Middleware.After>
               }
            />
            {/* Disposal Asset */}
            <Route
               path="/detail-disposal-asset/:id"
               element={
                  <Middleware.After>
                     <Layout render={<DetailDisposal />} />
                  </Middleware.After>
               }
            />
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
            <Route
               path="/help-export"
               element={
                  <Middleware.After>
                     <Layout render={<HelpExport />} />
                  </Middleware.After>
               }
            />
            <Route
               path="/help-detail/:id"
               element={
                  <Middleware.After>
                     <Layout render={<HelpDetail />} />
                  </Middleware.After>
               }
            />
         </Routes>
      </BrowserRouter>
   );
}

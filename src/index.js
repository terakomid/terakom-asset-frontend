import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

// CSS
// import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

// Sider & Header
import App from "./App";

// Dashboard
import Dashboard from "./views/dashboard/Content";

// User management
import UserRole from "./views/user-management/user-role/Content";
import ListUser from "./views/user-management/user-list/Index";
import ListUserAdd from "./views/user-management/user-list/Add";
import ListUserEdit from "./views/user-management/user-list/Edit";

import AssetLocation from "./views/master-data/asset-location";
import AssetCategory from "./views/master-data/asset-category";
import AssetSubCategory from "./views/master-data/asset-subcategory";
import Vendor from "./views/master-data/vendor";
import VendorForm from "./views/master-data/vendor/Form";
import CostCenter from "./views/master-data/cost-center";
import Department from "./views/master-data/department";
import AssetCondition from "./views/master-data/asset-condition";
import It from "./views/master-data/it";
import ItSubType from "./views/master-data/it-subtype";

import DataAsset from "./views/data-asset/data-asset";
import AssetIT from "./views/data-asset/data-asset/IT/Add";
import AssetNonIT from "./views/data-asset/data-asset/NonIT/Add";
import AssetNonITEdit from "./views/data-asset/data-asset/NonIT/Edit";
import HistoryAsset from "./views/data-asset/history-asset/Content";
import MutationAsset from "./views/data-asset/mutation-asset/Content";
import AddMutationAsset from "./views/data-asset/mutation-asset/Add";
import MaintenanceAsset from "./views/data-asset/maintenance-asset/Content";
import AddMaintenanceAsset from "./views/data-asset/maintenance-asset/Add";
import StockOpname from "./views/data-asset/stock-opname/Content";
import ReceptionAsset from "./views/data-asset/reception-asset/Content";
import AddReceptionAsset from "./views/data-asset/reception-asset/Add";

// Disposal
import DisposalAsset from "./views/disposal-asset/Content";
import AddDisposalAsset from "./views/disposal-asset/Add";

// Activity Log
import ActivityLog from "./views/activity-log/Content";

// Help
import Help from "./views/help/Content";
import HelpAdd from "./views/help/Add";

// Footer
import Footer from "./component/Footer";

import { createTheme, ThemeProvider } from "@mui/material";
let theme = createTheme({
   palette: {
      primary: {
         light: "#63ccff",
         main: "#0d4c92", //primary
         dark: "#000", //hover
      },
   },
   components: {
      MuiButton: {
         styleOverrides: {
            root: {
               textTransform: "none",
            },
         },
      },
      MuiTextField: {
         styleOverrides: {
            root: {
               fontSize: "default",
               borderRadius: "10px",
            },
         },
      },
      MuiCard: {
         styleOverrides: {
            root: {
               borderRadius: "10px",
            },
         },
      },
      MuiCardContent: {
         styleOverrides: {
            root: {
               padding: "30px",
            },
         },
      },
      MuiTableRow: {
         styleOverrides: {
            head: {
               backgroundColor: "#f4f6f8",
            },
         },
      },
      MuiTableCell: {
         styleOverrides: {
            root: {
               borderBottom: "none",
            },
         },
      },
   },
});

const root = ReactDOM.createRoot(document.getElementById("App"));
root.render(
   <div id="layout-wrapper">
      <ThemeProvider theme={theme}>
         <BrowserRouter>
            <App />
            <Routes>
               <Route exact index path="/" element={<Navigate to="/dashboard" />} />
               <Route path="/dashboard" element={<Dashboard />} />
               {/* User Management */}
               <Route path="/user-role" element={<UserRole />} />
               <Route path="/user-list" element={<ListUser />} />
               <Route path="/user-list-add" element={<ListUserAdd />} />
               <Route path="/user-list-edit/:id" element={<ListUserEdit />} />
               {/* Master Data */}
               <Route path="/asset-location" element={<AssetLocation />} />
               <Route path="/asset-category" element={<AssetCategory />} />
               <Route path="/asset-subcategory/:id" element={<AssetSubCategory />} />
               <Route path="/vendor" element={<Vendor />} />
               <Route path="/vendor/create" element={<VendorForm />} />
               <Route path="/vendor/edit/:id" element={<VendorForm />} />
               <Route path="/cost-center" element={<CostCenter />} />
               <Route path="/department" element={<Department />} />
               <Route path="/asset-condition" element={<AssetCondition />} />
               <Route path="/it" element={<It />} />
               <Route path="/it-subtype/:id" element={<ItSubType />} />
               {/* Data Asset */}
               <Route path="/data-asset" element={<DataAsset />} />
               <Route path="/data-asset-it" element={<AssetIT />} />
               <Route path="/data-asset-non-it" element={<AssetNonIT />} />
               <Route path="/edit-data-asset-non-it" element={<AssetNonITEdit />} />
               <Route path="/history-asset" element={<HistoryAsset />} />
               <Route path="/mutation-asset" element={<MutationAsset />} />
               <Route path="/mutation-asset-add" element={<AddMutationAsset />} />
               <Route path="/maintenance-asset" element={<MaintenanceAsset />} />
               <Route path="/maintenance-asset-add" element={<AddMaintenanceAsset />} />
               <Route path="/stock-opname" element={<StockOpname />} />
               <Route path="/reception-asset" element={<ReceptionAsset />} />
               <Route path="/reception-asset-add" element={<AddReceptionAsset />} />
               {/* Disposal Asset */}
               <Route path="/disposal-asset" element={<DisposalAsset />} />
               <Route path="/disposal-asset-add" element={<AddDisposalAsset />} />
               {/* Activity Log */}
               <Route path="/activity-log" element={<ActivityLog />} />
               {/* Help */}
               <Route path="/help" element={<Help />} />
               <Route path="/help-add" element={<HelpAdd />} />
            </Routes>
            <Footer />
         </BrowserRouter>
      </ThemeProvider>
   </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

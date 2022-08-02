// Sidebar.js
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";

class Sidebar extends Component {
   render() {
      return (
         <div className="vertical-menu">
            <div data-simplebar className="h-100">
               {/* Sidemenu  */}

               <div id="sidebar-menu" role="menubar">
                  {/* Left Menu Start  */}
                  <ul className="metismenu list-unstyled" id="side-menu" role="menu" aria-labelledby="functions">
                     {/* Dashboard */}
                     <li role="menuitem">
                        <Link to="/dashboard" className="waves-effect">
                           <i className="mdi mdi-home"></i>
                           <span className="text-capitalize">dashboard</span>
                        </Link>
                     </li>

                     {/* User Management */}
                     <li role="menuitem">
                        <Link to="/" onClick={(e) => e.preventDefault()} className="has-arrow waves-effect">
                           <i className="mdi mdi-account-circle"></i>
                           <span className="text-capitalize">user management</span>
                        </Link>
                        <ul className="sub-menu" role="menu">
                           <li role="menuitem">
                              <Link to="/user-role" className="text-capitalize">
                                 user role
                              </Link>
                           </li>
                           <li role="menuitem">
                              <Link to="/user-list" className="text-capitalize">
                                 user list
                              </Link>
                           </li>
                        </ul>
                     </li>

                     {/* Master Data */}
                     <li role="menuitem">
                        <Link to="/" onClick={(e) => e.preventDefault()} className="has-arrow waves-effect">
                           <i className="mdi mdi-note-multiple"></i>
                           <span className="text-capitalize">master data</span>
                        </Link>
                        <ul className="sub-menu" role="menu">
                           <li role="menuitem">
                              <Link to="/master-data/asset-location" className="text-capitalize py-2">
                                 master asset location
                              </Link>
                           </li>
                           <li role="menuitem">
                              <Link to="/master-data/asset-category" className="text-capitalize py-2">
                                 master asset category
                              </Link>
                           </li>
                           <li role="menuitem">
                              <Link to="/master-data/vendor" className="text-capitalize py-2">
                                 master vendor
                              </Link>
                           </li>
                           <li role="menuitem">
                              <Link to="/master-data/cost-center" className="text-capitalize py-2">
                                 master cost center
                              </Link>
                           </li>
                           <li role="menuitem">
                              <Link to="/master-data/department" className="text-capitalize py-2">
                                 master department
                              </Link>
                           </li>
                           <li role="menuitem">
                              <Link to="/master-data/asset-condition" className="text-capitalize py-2">
                                 master asset condition
                              </Link>
                           </li>
                           <li role="menuitem">
                              <Link to="/master-data/it" className="text-capitalize py-2">
                                 master IT
                              </Link>
                           </li>
                        </ul>
                     </li>

                     {/* Data Asset */}
                     <li role="menuitem">
                        <Link to="/" onClick={(e) => e.preventDefault()} className="has-arrow waves-effect">
                           <i className="mdi mdi-folder-table"></i>
                           <span className="text-capitalize">data asset</span>
                        </Link>
                        <ul className="sub-menu" role="menu">
                           <li role="menuitem">
                              <Link to="/data-asset" className="text-capitalize">
                                 data asset
                              </Link>
                           </li>
                           <li role="menuitem">
                              <Link to="/history-asset" className="text-capitalize">
                                 history asset
                              </Link>
                           </li>
                           <li role="menuitem">
                              <Link to="/reception-asset" className="text-capitalize">
                                 asset receipt
                              </Link>
                           </li>
                        </ul>
                     </li>

                     {/* Qr Code Tagging */}
                     <li role="menuitem" style={{ display: "none" }}>
                        <Link to="/#" className="waves-effect">
                           <i className="mdi mdi-qrcode"></i>
                           {/* <span className="badge rounded-pill bg-primary float-end">2</span> */}
                           <span className="text-capitalize">qrcode tagging</span>
                        </Link>
                     </li>

                     {/* Penghapusan Asset */}
                     <li role="menuitem">
                        <Link to="/disposal-asset" className="waves-effect">
                           <i className="mdi mdi-trash-can"></i>
                           {/* <span className="badge rounded-pill bg-primary float-end">2</span> */}
                           <span className="text-capitalize">disposal asset</span>
                        </Link>
                     </li>

                     {/* Laporan */}
                     <li role="menuitem" style={{ display: "none" }}>
                        <Link to="/#" className="has-arrow waves-effect">
                           <i className="mdi mdi-chart-line"></i>
                           <span className="text-capitalize">laporan</span>
                        </Link>
                        <ul className="sub-menu" role="menu">
                           <li role="menuitem">
                              <Link to="/#" className="text-capitalize">
                                 activity log
                              </Link>
                           </li>
                           <li role="menuitem">
                              <Link to="/#" className="text-capitalize">
                                 asset lost
                              </Link>
                           </li>
                           <li role="menuitem">
                              <Link to="/#" className="text-capitalize">
                                 data asset
                              </Link>
                           </li>
                           <li role="menuitem">
                              <Link to="/#" className="text-capitalize">
                                 maintenance asset
                              </Link>
                           </li>
                           <li role="menuitem">
                              <Link to="/#" className="text-capitalize">
                                 penghapusan asset
                              </Link>
                           </li>
                           <li role="menuitem">
                              <Link to="/#" className="text-capitalize">
                                 penyusutan asset
                              </Link>
                           </li>
                           <li role="menuitem">
                              <Link to="/#" className="text-capitalize">
                                 transfer/mutation assset
                              </Link>
                           </li>
                        </ul>
                     </li>

                     {/* Help */}
                     <li role="menuitem">
                        <Link to="/help" className="waves-effect">
                           <i className="mdi mdi-help-circle"></i>
                           {/* <span className="badge rounded-pill bg-primary float-end">2</span> */}
                           <span className="text-capitalize">help</span>
                        </Link>
                     </li>

                     {/* Activity Log */}
                     <li role="menuitem">
                        <Link to="/activity-log" className="waves-effect">
                           <i className="mdi mdi-login"></i>
                           {/* <span className="badge rounded-pill bg-primary float-end">2</span> */}
                           <span className="text-capitalize">activity log</span>
                        </Link>
                     </li>
                  </ul>
               </div>

               {/* Sidebar  */}
            </div>
         </div>
      );
   }
}

export default Sidebar;

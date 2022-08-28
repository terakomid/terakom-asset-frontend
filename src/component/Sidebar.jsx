import React from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authentication } from "../store/Authentication";
import { Permission } from "../component/Permission";
import "../App.css";

export default function Sidebar() {
   const { user } = useRecoilValue(authentication);
   return (
      <div className="vertical-menu">
         <div data-simplebar className="h-100">
            {/* Sidemenu  */}

            <div id="sidebar-menu" role="menubar">
               {/* Left Menu Start  */}
               <ul className="metismenu list-unstyled" id="side-menu" role="menu" aria-labelledby="functions">
                  {/* Dashboard */}
                  {Permission(user.permission, "dashboard") && (
                     <li role="menuitem">
                        <Link to="/dashboard" className="waves-effect">
                           <i className="mdi mdi-home"></i>
                           <span className="text-capitalize">dashboard</span>
                        </Link>
                     </li>
                  )}

                  {/* User Management */}
                  {Permission(user.permission, "get user role") || Permission(user.permission, "get user") ? (
                     <li role="menuitem">
                        <Link to="/" onClick={(e) => e.preventDefault()} className="has-arrow waves-effect">
                           <i className="mdi mdi-account-circle"></i>
                           <span className="text-capitalize">user management</span>
                        </Link>
                        <ul className="sub-menu" role="menu">
                           {Permission(user.permission, "get user role") && (
                              <li role="menuitem">
                                 <Link to="/user-role" className="text-capitalize">
                                    user role
                                 </Link>
                              </li>
                           )}
                           {Permission(user.permission, "get user") && (
                              <li role="menuitem">
                                 <Link to="/user-list" className="text-capitalize">
                                    user list
                                 </Link>
                              </li>
                           )}
                        </ul>
                     </li>
                  ) : null}

                  {/* Master Data */}
                  {Permission(user.permission, "get location") ||
                  Permission(user.permission, "get category") ||
                  Permission(user.permission, "get vendor") ||
                  Permission(user.permission, "get cost") ||
                  Permission(user.permission, "get department") ||
                  Permission(user.permission, "get condition") ||
                  Permission(user.permission, "get master it") ? (
                     <li role="menuitem">
                        <Link to="/" onClick={(e) => e.preventDefault()} className="has-arrow waves-effect">
                           <i className="mdi mdi-note-multiple"></i>
                           <span className="text-capitalize">master data</span>
                        </Link>
                        <ul className="sub-menu" role="menu">
                           {Permission(user.permission, "get location") && (
                              <li role="menuitem">
                                 <Link to="/master-data/asset-location" className="text-capitalize py-2">
                                    master asset location
                                 </Link>
                              </li>
                           )}
                           {Permission(user.permission, "get category") && (
                              <li role="menuitem">
                                 <Link to="/master-data/asset-category" className="text-capitalize py-2">
                                    master asset category
                                 </Link>
                              </li>
                           )}
                           {Permission(user.permission, "get vendor") && (
                              <li role="menuitem">
                                 <Link to="/master-data/vendor" className="text-capitalize py-2">
                                    master vendor
                                 </Link>
                              </li>
                           )}
                           {Permission(user.permission, "get cost") && (
                              <li role="menuitem">
                                 <Link to="/master-data/cost-center" className="text-capitalize py-2">
                                    master cost center
                                 </Link>
                              </li>
                           )}
                           {Permission(user.permission, "get department") && (
                              <li role="menuitem">
                                 <Link to="/master-data/department" className="text-capitalize py-2">
                                    master department
                                 </Link>
                              </li>
                           )}
                           {Permission(user.permission, "get condition") && (
                              <li role="menuitem">
                                 <Link to="/master-data/asset-condition" className="text-capitalize py-2">
                                    master asset condition
                                 </Link>
                              </li>
                           )}
                           {Permission(user.permission, "get master it") && (
                              <li role="menuitem">
                                 <Link to="/master-data/it" className="text-capitalize py-2">
                                    master IT
                                 </Link>
                              </li>
                           )}
                        </ul>
                     </li>
                  ) : null}

                  {/* Data Asset */}
                  {Permission(user.permission, "get asset") ||
                  Permission(user.permission, "get asset mutation") ||
                  Permission(user.permission, "get asset maintenance") ||
                  Permission(user.permission, "get stock opname") ||
                  Permission(user.permission, "get asset acceptance") ? (
                     <li role="menuitem">
                        <Link to="/" onClick={(e) => e.preventDefault()} className="has-arrow waves-effect">
                           <i className="mdi mdi-folder-table"></i>
                           <span className="text-capitalize">data asset</span>
                        </Link>
                        <ul className="sub-menu" role="menu">
                           {Permission(user.permission, "get asset") && (
                              <li role="menuitem">
                                 <Link to="/data-asset" className="text-capitalize">
                                    {user.role !== "Employee" ? "data asset" : "my asset"  }
                                 </Link>
                              </li>
                           )}
                           {Permission(user.permission, "get asset mutation") ||
                           Permission(user.permission, "get asset maintenance") ||
                           Permission(user.permission, "get stock opname") ? (
                              <li role="menuitem">
                                 <Link to="/history-asset" className="text-capitalize">
                                    history asset
                                 </Link>
                              </li>
                           ) : null}
                           {Permission(user.permission, "get asset acceptance") && (
                              <li role="menuitem">
                                 <Link to="/acceptance-asset" className="text-capitalize">
                                    acceptance asset
                                 </Link>
                              </li>
                           )}
                        </ul>
                     </li>
                  ) : null}

                  {/* Qr Code Tagging */}
                  {Permission(user.permission, "qrcode") && (
                     <li role="menuitem">
                        <Link to="/qr-tagging" className="waves-effect">
                           <i className="mdi mdi-qrcode"></i>
                           <span className="text-capitalize">qrcode tagging</span>
                        </Link>
                     </li>
                  )}

                  {/* Disposal Asset */}
                  {Permission(user.permission, "get asset disposal") && (
                     <li role="menuitem">
                        <Link to="/" onClick={(e) => e.preventDefault()} className="has-arrow waves-effect">
                           <i className="mdi mdi-trash-can"></i>
                           <span className="text-capitalize">disposal asset</span>
                        </Link>
                        <ul className="sub-menu" role="menu">
                           <li role="menuitem">
                              <Link to="/disposal-asset" className="text-capitalize">
                                 Request Disposal
                              </Link>
                           </li>
                           <li role="menuitem">
                              <Link to="/history-disposal" className="text-capitalize">
                                 History Disposal
                              </Link>
                           </li>
                        </ul>
                     </li>
                  )}

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
                  {Permission(user.permission, "get help") && (
                     <li role="menuitem">
                        <Link to="/help" className="waves-effect">
                           <i className="mdi mdi-help-circle"></i>
                           <span className="text-capitalize">help</span>
                        </Link>
                     </li>
                  )}

                  {/* Activity Log */}
                  {Permission(user.permission, "get activity log") && (
                     <li role="menuitem">
                        <Link to="/activity-log" className="waves-effect">
                           <i className="mdi mdi-login"></i>
                           <span className="text-capitalize">activity log</span>
                        </Link>
                     </li>
                  )}
               </ul>
            </div>
         </div>
      </div>
   );
}

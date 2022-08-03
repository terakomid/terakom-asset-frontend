import React from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authentication } from "../store/Authentication";
import http from "../component/api/Api";
import "../App.css";

export default function Header(props) {
   let token = localStorage.getItem("token");
   const [auth, setAuth] = useRecoilState(authentication);
   const onLogout = async () => {
      await http.post(`logout`).then(() => {
         setAuth({
            ...auth,
            auth: false,
         });
         localStorage.clear();
      });
   };
   return (
      <header id="page-topbar">
         <div className="navbar-header bg-primary">
            <div className="d-flex">
               {/* LOGO */}
               <div className="navbar-brand-box bg-white px-1">
                  <Link to="/dashboard" className="logo logo-dark">
                     <span className="logo-sm">
                        <img src="/assets/images/logo-sm.png" alt="" height="17" />
                     </span>
                     <span className="logo-lg">
                        <img src="/assets/images/logo-dark.png" alt="" height="50" />
                     </span>
                  </Link>

                  <a href="/" className="logo logo-light">
                     <span className="logo-sm">
                        <img src="/assets/images/logo-sm.png" alt="" height="22" />
                     </span>
                     <span className="logo-lg">
                        <img src="/assets/images/logo-light.png" alt="" height="18" />
                     </span>
                  </a>
               </div>

               <button
                  type="button"
                  className="btn btn-sm px-3 font-size-24 header-item waves-effect vertical-menu-btn text-white"
                  onClick={props.openSideMenu}
               >
                  <i className="mdi mdi-menu"></i>
               </button>
            </div>

            <div className="d-flex">
               {/* Fullscreen */}
               {/* <div className="dropdown d-none d-lg-inline-block">
                  <button type="button" className="btn header-item noti-icon waves-effect" data-toggle="fullscreen">
                     <i className="mdi mdi-fullscreen font-size-24 text-white"></i>
                  </button>
               </div> */}

               {/* Notification */}
               <div className="dropdown d-inline-block ms-1">
                  <button
                     type="button"
                     className="btn header-item noti-icon waves-effect"
                     id="page-header-notifications-dropdown"
                     data-bs-toggle="dropdown"
                     aria-haspopup="true"
                     aria-expanded="false"
                  >
                     <i className="ti-bell text-white"></i>
                     <span className="badge bg-danger rounded-pill">9</span>
                  </button>
                  <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-notifications-dropdown">
                     <div className="p-3">
                        <div className="row align-items-center">
                           <div className="col">
                              <h5 className="m-0"> Notifications (9) </h5>
                           </div>
                        </div>
                     </div>
                     <div>
                        <a href="#link" className="text-reset notification-item">
                           <div className="d-flex">
                              <div className="flex-shrink-0 me-3">
                                 <div className="avatar-xs">
                                    <span className="avatar-title border-success rounded-circle ">
                                       <i className="mdi mdi-cart-outline"></i>
                                    </span>
                                 </div>
                              </div>
                              <div className="flex-grow-1">
                                 <h6 className="mb-1">Your order is placed</h6>
                                 <div className="text-muted">
                                    <p className="mb-1">If several languages coalesce the grammar</p>
                                 </div>
                              </div>
                           </div>
                        </a>

                        <a href="#link" className="text-reset notification-item">
                           <div className="d-flex">
                              <div className="flex-shrink-0 me-3">
                                 <div className="avatar-xs">
                                    <span className="avatar-title border-warning rounded-circle ">
                                       <i className="mdi mdi-message"></i>
                                    </span>
                                 </div>
                              </div>
                              <div className="flex-grow-1">
                                 <h6 className="mb-1">New Message received</h6>
                                 <div className="text-muted">
                                    <p className="mb-1">You have 87 unread messages</p>
                                 </div>
                              </div>
                           </div>
                        </a>

                        <a href="#link" className="text-reset notification-item">
                           <div className="d-flex">
                              <div className="flex-shrink-0 me-3">
                                 <div className="avatar-xs">
                                    <span className="avatar-title border-info rounded-circle ">
                                       <i className="mdi mdi-glass-cocktail"></i>
                                    </span>
                                 </div>
                              </div>
                              <div className="flex-grow-1">
                                 <h6 className="mb-1">Your item is shipped</h6>
                                 <div className="text-muted">
                                    <p className="mb-1">It is a long established fact that a reader will</p>
                                 </div>
                              </div>
                           </div>
                        </a>

                        <a href="#link" className="text-reset notification-item">
                           <div className="d-flex">
                              <div className="flex-shrink-0 me-3">
                                 <div className="avatar-xs">
                                    <span className="avatar-title border-primary rounded-circle ">
                                       <i className="mdi mdi-cart-outline"></i>
                                    </span>
                                 </div>
                              </div>
                              <div className="flex-grow-1">
                                 <h6 className="mb-1">Your order is placed</h6>
                                 <div className="text-muted">
                                    <p className="mb-1">Dummy text of the printing and typesetting industry.</p>
                                 </div>
                              </div>
                           </div>
                        </a>

                        <a href="#link" className="text-reset notification-item">
                           <div className="d-flex">
                              <div className="flex-shrink-0 me-3">
                                 <div className="avatar-xs">
                                    <span className="avatar-title border-warning rounded-circle ">
                                       <i className="mdi mdi-message"></i>
                                    </span>
                                 </div>
                              </div>
                              <div className="flex-grow-1">
                                 <h6 className="mb-1">New Message received</h6>
                                 <div className="text-muted">
                                    <p className="mb-1">You have 87 unread messages</p>
                                 </div>
                              </div>
                           </div>
                        </a>
                     </div>
                     <div className="p-2 border-top">
                        <a className="btn btn-sm btn-link font-size-14 w-100 text-center" href="#link">
                           View all
                        </a>
                     </div>
                  </div>
               </div>

               {/* Setting */}
               <div className="dropdown d-inline-block">
                  <button
                     type="button"
                     className="btn header-item waves-effect"
                     id="page-header-user-dropdown"
                     data-bs-toggle="dropdown"
                     aria-haspopup="true"
                     aria-expanded="false"
                  >
                     <img className="rounded-circle header-profile-user" src="/assets/images/users/user-4.jpg" alt="Header Avatar" />
                  </button>
                  <div className="dropdown-menu dropdown-menu-end">
                     {/* item */}
                     <a className="dropdown-item" href="#link">
                        <i className="mdi mdi-account-circle font-size-17 text-muted align-middle me-1"></i>
                        Profile
                     </a>
                     <a className="dropdown-item d-block" href="#link">
                        <i className="mdi mdi-cog font-size-17 text-muted align-middle me-1"></i> Settings
                     </a>
                     <div className="dropdown-divider"></div>
                     <div className="dropdown-item text-danger" style={{ cursor: "pointer" }} onClick={onLogout}>
                        <i className="mdi mdi-power font-size-17 text-muted align-middle me-1 text-danger"></i>
                        Logout
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </header>
   );
}

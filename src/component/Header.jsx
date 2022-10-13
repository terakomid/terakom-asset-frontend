import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { NotificationsNoneOutlined } from "@mui/icons-material";
import { useRecoilState } from "recoil";
import { authentication } from "../store/Authentication";
import { notificationRecoil } from "../store/Notification";
import { Link, useNavigate } from "react-router-dom";
import addNotification, { Notifications } from "react-push-notification";
import http from "../component/api/Api";
import "../App.css";
import moment from "moment";

export default function Header() {
   const navigate = useNavigate();
   const [auth, setAuth] = useRecoilState(authentication);

   const [notification, setNotification] = useRecoilState(notificationRecoil);
   const getNotification = async () => {
      await http.get(`notification`).then((res) => {
         // console.log(res.data.data);
         setNotification(res.data.data);
      });
   };

   const readNotification = async (value) => {
      let category = value.type.split("\\").pop();
      await http.delete(`notification/${value.id}`).then((res) => {
         // console.log(res.data.data);
         if (category === "AddNewAsset") {
            value.data.asset.asset_type === "it"
               ? navigate(`/detail-data-asset-it/${value.data.asset.id}`)
               : navigate(`/detail-data-asset-non-it/${value.data.asset.id}`);
         } else if (category === "AddNewAssetAcceptance") {
            navigate(`/acceptance-asset`);
         }
         getNotification();
      });
   };

   useEffect(() => {
      // window.Echo.private("App.Models.User." + auth.user.id).notification((value) => {
      //    // console.log(value);
      //    showNotification(value);
      //    getNotification();
      // });
      getNotification();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const showNotification = (value) => {
      // console.log(value);
      addNotification({
         title: "title",
         message: "message",
         duration: 60000,
         native: true,
         onClick: () => {
            navigate(`/acceptance-asset`);
         },
      });
   };

   const onLogout = async () => {
      await http.post(`logout`).then(() => {
         setAuth({
            ...auth,
            auth: false,
         });
         localStorage.clear();
      });
   };

   const viewNotification = (value) => {
      let category = value.type.split("\\").pop();
      if (category === "AddNewAsset") {
         return (
            <div className="flex-grow-1">
               <h6 className="mb-1">{value.data.from.name} - Add New Asset</h6>
               <div className="text-muted">
                  {value.data.asset.asset_code} - {value.data.asset.asset_name}
               </div>
               <div className="text-muted">
                  {moment(value.created_at).fromNow()}
               </div>
            </div>
         );
      } else if (category === "AddNewAssetAcceptance") {
         return (
            <div className="flex-grow-1">
               <h6 className="mb-1">{value.data.from.name} - Add New Acceptance Asset</h6>
               <div className="text-muted">
                  {value.data.asset_acceptance.asset_code} - {value.data.asset_acceptance.asset_name}
               </div>
               <div className="text-muted">
                  {moment(value.created_at).fromNow()}
               </div>
            </div>
         );
      }
   };

   function tToggle() {
      var body = document.body;
      body.classList.toggle("vertical-collpsed");
      body.classList.toggle("sidebar-enable");
   }

   return (
      <header id="page-topbar">
         <Notifications />
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
                  id="vertical-menu-btn"
                  // onClick={tToggle}
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
                     {notification.length > 0 && <span className="badge bg-danger rounded-pill">{notification.length}</span>}
                  </button>
                  <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-notifications-dropdown">
                     <div className="p-3 border-bottom">
                        <div className="row align-items-center">
                           <div className="col">
                              <h5 onClick={() => navigate('/notification')} className="m-0" style={{ cursor: 'pointer' }}>See All Notifications {notification.length > 0 && `(${notification.length})`}</h5>
                           </div>
                        </div>
                     </div>
                     <Box sx={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        {notification.length > 0 ? (
                           notification.map((value, index) => (
                              <a href="#" className="text-reset notification-item" key={index} onClick={() => readNotification(value)}>
                                 <div className="d-flex">
                                    <div className="flex-shrink-0 me-3">
                                       <div className="avatar-xs">
                                          <span className="avatar-title border-info rounded-circle ">
                                             <i className="mdi mdi-folder-table"></i>
                                          </span>
                                       </div>
                                    </div>
                                    {viewNotification(value)}
                                 </div>
                              </a>
                           ))
                        ) : (
                           <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", pb: 3, height: 200 }}>
                              <NotificationsNoneOutlined fontSize="large" sx={{ mb: 1 }} />
                              You have no notifications.
                           </Box>
                        )}
                     </Box>
                     {/* {notification.length > 0 && (
                        <div className="p-2 border-top">
                           <a className="btn btn-sm btn-link font-size-14 w-100 text-center" href="#link">
                              View all
                           </a>
                        </div>
                     )} */}
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
                     <img className="rounded-circle header-profile-user" src={auth.user.photo_url} alt="Header Avatar" />
                  </button>
                  <div className="dropdown-menu dropdown-menu-end">
                     {/* item */}
                     <p style={{ cursor: "pointer" }} onClick={() => navigate("/profil")} className="dropdown-item">
                        <i className="mdi mdi-account-circle font-size-17 text-muted align-middle me-1"></i> Profile
                     </p>
                     <p style={{ cursor: "pointer" }} onClick={() => navigate("/change-password")} className="dropdown-item d-block">
                        <i className="mdi mdi-cog font-size-17 text-muted align-middle me-1"></i> Change Password
                     </p>
                     <div className="dropdown-divider"></div>
                     <div className="dropdown-item text-danger" style={{ cursor: "pointer" }} onClick={onLogout}>
                        <i className="mdi mdi-power font-size-17 text-muted align-middle me-1 text-danger"></i> Logout
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </header>
   );
}

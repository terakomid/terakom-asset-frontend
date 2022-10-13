import React, { useState, useEffect } from 'react'
import { Box, Card, CardContent, Grid, Stack } from '@mui/material'
import http from "../../../component/api/Api";
import { NotificationsNoneOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { notificationRecoil } from '../../../store/Notification';
import moment from 'moment';

const index = () => {
    const navigate = useNavigate();
    const [notification, setNotification] = useRecoilState(notificationRecoil);
    const getNotification = async () => {
       await http.get(`notification`).then((res) => {
            //console.log(res.data.data);
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

    return (
        <div className="main-content mb-5">
            <div className="page-content">
                <div className="container">
                    <div className="my-2">
                        <Stack direction="row" justifyContent={"space-between"}>
                            <h3 className="fw-bold mb-2">All Notification</h3>
                        </Stack>
                    </div>
                    <div className="row">
                        <div className="col-xl-12 col-12 mt-3">
                            <Grid container>
                                <Grid item xs={12} md={12}>
                                    <Card>
                                        <CardContent>
                                        <div className="row align-items-center mb-2">
                                            <div className="col">
                                                <h5 className="m-0">Notifications {notification.length > 0 && `(${notification.length})`}</h5>
                                            </div>
                                        </div>
                                        {notification.length > 0 ? (
                                            notification.map((value, index) => (
                                                <Box sx={{ cursor: 'pointer' }} className="text-reset notification-item" key={index} onClick={() => readNotification(value)}>
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
                                                </Box>
                                            ))
                                            ) : (
                                            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", pb: 3, height: 200 }}>
                                                <NotificationsNoneOutlined fontSize="large" sx={{ mb: 1 }} />
                                                You have no notifications.
                                            </Box>
                                            )}
                                        </CardContent>
                                    </Card>
                                </Grid>

                            </Grid>
                        </div>
                    </div>                   
                </div>
            </div>
        </div>
    )
}

export default index;

import React, { useState, useEffect } from "react";
import { Button, Card, CardContent, Grid, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

import http from "../../component/api/Api";
import QrScanner from "qr-scanner";

import { useRecoilValue } from "recoil";
import { authentication } from "../../store/Authentication";
import { Permission } from "../../component/Permission";

const Index = () => {
   const { user } = useRecoilValue(authentication);

   const [code, setCode] = useState("");
   const [data, setData] = useState({});
   const [display, setDisplay] = useState("block");
   const navigate = useNavigate();

   const getDetailAsset = async (asset_code) => {
      try {
         const formData = new FormData();
         formData.append("asset_code", asset_code);
         const res = await http.post(`asset/show_by_code`, formData);
         // console.log(res.data)
         setData(res.data.data);
      } catch (err) {
         console.log(err.response);
      }
   };

   const setScanner = (isOn = true) => {
      setDisplay("block");
      const videoElem = document.querySelector("#video-elem");
      const qrScanner = new QrScanner(
         videoElem,
         (result) => {
            setCode(result);
            setDisplay("none");
            getDetailAsset(result);
            qrScanner.destroy();
         },
         true
      );
      if (isOn) {
         qrScanner.start();
      } else {
         qrScanner.start();
         qrScanner.destroy();
      }
   };

   const handleDetail = () => {
      if (data.asset_type === "it") {
         navigate(`/detail-data-asset-it/${data.id}`);
      } else {
         navigate(`/detail-data-asset-non-it/${data.id}`);
      }
   };

   const handleEdit = () => {
      if (data.asset_type === "it") {
         navigate(`/edit-data-asset-it/${data.id}`);
      } else {
         navigate(`/edit-data-asset-non-it/${data.id}`);
      }
   };

   useEffect(() => {
      Permission(user.permission, "qrcode") === true ? setScanner() : navigate("/dashboard");
   }, []);

   return (
      <div className="main-content mb-5">
         <div className="page-content">
            <div className="container">
               <div className="my-2">
                  <Stack direction="row" justifyContent={"space-between"}>
                     <h3 className="fw-bold mb-2">QR Tagging</h3>
                  </Stack>
               </div>
               <div className="row">
                  <Grid container spacing={3}>
                     <Grid item md={12} xs={12} display={display}>
                        <Card>
                           <CardContent>
                              <Typography>Scan QR Code Here</Typography>
                              <video style={{ height: "400px" }} id="video-elem"></video>
                           </CardContent>
                        </Card>
                     </Grid>
                     <Grid item md={12} xs={12}>
                        <Card>
                           <CardContent>
                              <Typography>Asset Code : {code}</Typography>
                              <Stack direction="row" spacing={2}>
                                 <Button
                                    variant="contained"
                                    onClick={() => {
                                       setScanner();
                                    }}
                                 >
                                    Re-Scan QR Code
                                 </Button>
                                 {JSON.stringify(data) !== "{}" && (
                                    <>
                                       <Button variant="contained" onClick={handleDetail}>
                                          Lihat Detail Asset
                                       </Button>
                                       <Button variant="contained" onClick={handleEdit}>
                                          Edit Asset
                                       </Button>
                                    </>
                                 )}
                              </Stack>
                           </CardContent>
                        </Card>
                     </Grid>
                  </Grid>
               </div>
            </div>
         </div>
      </div>
   );
};
export default Index;

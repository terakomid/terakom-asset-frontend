import React, { useState, useEffect } from "react";
import { Button, Card, CardContent, Grid, Typography, Stack, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import http from "../../component/api/Api";
import QrScanner from "qr-scanner";

import { useRecoilValue } from "recoil";
import { authentication } from "../../store/Authentication";
import { Permission } from "../../component/Permission";
import { LabelTable } from "../../component/LabelTable";

const Index = () => {
   const { user } = useRecoilValue(authentication);
   const [isOn, setIsOn] = useState(true)
   const [code, setCode] = useState("");
   const [data, setData] = useState({});
   const [display, setDisplay] = useState("block");
   const navigate = useNavigate();

   const getDetailAsset = async (asset_code) => {
      try {
         const formData = new FormData();
         formData.append("asset_code", asset_code);
         const res = await http.post(`asset/show_by_code`, formData);
         setData(res.data.data);
      } catch (err) {
      } finally {
         setCode(asset_code);
      }
   };

   const setScanner = (isOn = true) => {
      setCode('')
      setData({})
      setDisplay("block");
      const videoElem = document.querySelector("#video-elem");
      const qrScanner = new QrScanner(
         videoElem,
         (result) => {
            qrScanner.destroy();
            setDisplay("none");
            setIsOn(false)
            getDetailAsset(result);
         }, 
         true
      );
      return qrScanner
   };

   useEffect(() => {
      let mounted = true 
      const temp = setScanner()
      if(Permission(user.permission, "qrcode") && mounted){
         temp.start()
         if(!isOn){
            temp.destroy()
            setDisplay("none");
   
         }
      }else{
         navigate('/dashboard')
      }
      return () => {
         temp.destroy()
         mounted = false
      }
   }, [isOn])

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
                              <Typography sx={{ fontWeight: 'bold' }}>Asset Code : {code}</Typography>
                              <Stack direction={{ md: 'row', xs: 'column' }} mt={2} spacing={3}>
                                 {!isOn &&
                                 <Button
                                    variant="contained"
                                    onClick={() => {
                                       setIsOn(true)
                                    }}
                                 >
                                    Re-Scan QR Code
                                 </Button> 
                                 }
                                 
                                 {isOn &&
                                 <Button variant="contained" onClick={() => setIsOn(false)}>
                                    Stop Scan
                                 </Button>
                                 }
                                 
                                 {JSON.stringify(data) !== "{}" && (
                                    <>
                                       <Button variant="contained" onClick={handleDetail}>
                                          Lihat Detail Asset
                                       </Button>
                                       <Button variant="contained" onClick={handleEdit}>
                                          Reconcile Asset
                                       </Button>
                                    </>
                                 )}
                              </Stack>
                              
                           </CardContent>
                        </Card>
                     </Grid>
                     {JSON.stringify(data) !== "{}" &&
                     <Grid item md={12} xs={12}>
                        <Card sx={{ p: 2 }}>
                           <CardContent>
                              <Typography sx={{ fontWeight: 'bold', textAlign: 'center' }}>Qr Asset</Typography>
                              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                                 <LabelTable data={data} />
                              </Box>
                           </CardContent>
                        </Card>
                     </Grid>
                     }
                  </Grid>
               </div>
            </div>
         </div>
      </div>
   );
};
export default Index;

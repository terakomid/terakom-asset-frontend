import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, TextField, Stack, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import http from "../../../component/api/Api";
import { useNavigate, useParams } from "react-router-dom";

export default function VendorForm() {
   const { id } = useParams();
   const navigate = useNavigate();

   const [data, setData] = useState({
      code: "",
      name: "",
      address: "",
      pic_contact: "",
      contact: "",
   });

   const getData = async (id) => {
      http
         .get(`/vendor/${id}`, {})
         .then((res) => {
            // console.log(res.data.data);
            setData(res.data.data);
         })
         .catch((err) => {
            // console.log(err.response);
         });
   };

   useEffect(() => {
      if (id) getData(id);
   }, [id]);

   const [loading, setLoading] = useState(false);
   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      if (id === undefined) {
         let formData = new FormData();
         formData.append("code", data.code);
         formData.append("name", data.name);
         formData.append("address", data.address);
         formData.append("pic_contact", data.pic_contact);
         formData.append("contact", data.contact);
         // console.log(Object.fromEntries(formData));
         http
            .post(`/vendor`, formData, {})
            .then((res) => {
               // console.log(res.data.data);
               navigate("/vendor");
            })
            .catch((err) => {
               // console.log(err.response.data);
               setLoading(false);
            });
      } else {
         let formData = new FormData();
         formData.append("_method", "PUT");
         formData.append("code", data.code);
         formData.append("name", data.name);
         formData.append("address", data.address);
         formData.append("pic_contact", data.pic_contact);
         formData.append("contact", data.contact);
         http
            .post(`/vendor/${data.id}`, formData, {})
            .then((res) => {
               // console.log(res.data.data);
               navigate("/vendor");
            })
            .catch((err) => {
               // console.log(err.response.data);
               setLoading(false);
            });
      }
   };

   const handleChange = (e) => {
      setData({
         ...data,
         [e.target.name]: e.target.value,
      });
   };

   return (
      <div className="main-content mb-5">
         <div className="page-content">
            <div className="container">
               <h3 className="fw-bold mt-2 mb-4">{id === undefined ? "Create" : "Edit"} Master Vendor Name</h3>
               <Card>
                  <CardContent>
                     <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                           <Grid item xs={12} sm={6}>
                              <TextField name="code" label="Code" variant="outlined" value={data.code} onChange={handleChange} autoFocus fullWidth required />
                           </Grid>
                           <Grid item xs={12} sm={6}>
                              <TextField name="name" label="Vendor Name" variant="outlined" value={data.name} onChange={handleChange} fullWidth required />
                           </Grid>
                           <Grid item xs={12}>
                              <TextField
                                 name="address"
                                 label="Vendor Address"
                                 variant="outlined"
                                 value={data.address}
                                 onChange={handleChange}
                                 rows={5}
                                 multiline
                                 fullWidth
                                 required
                              />
                           </Grid>
                           <Grid item xs={12} sm={6}>
                              <TextField
                                 name="pic_contact"
                                 label="PIC Contact"
                                 variant="outlined"
                                 value={data.pic_contact}
                                 onChange={handleChange}
                                 fullWidth
                                 required
                              />
                           </Grid>
                           <Grid item xs={12} sm={6}>
                              <TextField name="contact" label="Contact" variant="outlined" value={data.contact} onChange={handleChange} fullWidth required />
                           </Grid>
                           <Grid item xs={12}>
                              <Stack direction="row" justifyContent="flex-end" spacing={1}>
                                 <LoadingButton type="submit" loading={loading} variant="contained">
                                    Save
                                 </LoadingButton>
                              </Stack>
                           </Grid>
                        </Grid>
                     </Box>
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
   );
}

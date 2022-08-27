import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, TextField, Stack, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import http from "../../../component/api/Api";
import { useNavigate, useParams } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { authentication } from "../../../store/Authentication";
import { Permission } from "../../../component/Permission";

export default function VendorForm() {
   const { user } = useRecoilValue(authentication);
   const { id } = useParams();
   const navigate = useNavigate();

   const [error, setError] = useState("");
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
      if (id) {
         Permission(user.permission, "update vendor") === true ? getData(id) : navigate("/master-data/vendor");
      } else {
         Permission(user.permission, "create vendor") === false && navigate("/master-data/vendor");
      }
   }, [id]);

   const [loading, setLoading] = useState(false);
   const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
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
            .post(`/vendor`, formData)
            .then((res) => {
               // console.log(res.data.data);
               navigate("/master-data/vendor");
            })
            .catch((xhr) => {
               // console.log(xhr.response.data);
               xhr.response && setError(xhr.response.data.errors);
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
            .post(`/vendor/${data.id}`, formData)
            .then((res) => {
               // console.log(res.data.data);
               navigate("/master-data/vendor");
            })
            .catch((xhr) => {
               // console.log(xhr.response.data);
               xhr.response && setError(xhr.response.data.errors);
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
                     <Box component="form" noValidate={true} onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                           <Grid item xs={12} sm={6}>
                              <TextField
                                 name="code"
                                 label="Code"
                                 variant="outlined"
                                 value={data.code}
                                 onChange={handleChange}
                                 error={!!error.code}
                                 helperText={error.code !== undefined && error.code[0]}
                                 autoFocus
                                 fullWidth
                                 required
                              />
                           </Grid>
                           <Grid item xs={12} sm={6}>
                              <TextField
                                 name="name"
                                 label="Vendor Name"
                                 variant="outlined"
                                 value={data.name}
                                 onChange={handleChange}
                                 error={!!error.name}
                                 helperText={error.name !== undefined && error.name[0]}
                                 fullWidth
                                 required
                              />
                           </Grid>
                           <Grid item xs={12}>
                              <TextField
                                 name="address"
                                 label="Vendor Address"
                                 variant="outlined"
                                 value={data.address}
                                 onChange={handleChange}
                                 error={!!error.address}
                                 helperText={error.address !== undefined && error.address[0]}
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
                                 error={!!error.pic_contact}
                                 helperText={error.pic_contact !== undefined && error.pic_contact[0]}
                                 fullWidth
                                 required
                              />
                           </Grid>
                           <Grid item xs={12} sm={6}>
                              <TextField
                                 name="contact"
                                 label="No. Telp/HP"
                                 variant="outlined"
                                 value={data.contact}
                                 onChange={handleChange}
                                 error={!!error.cantact}
                                 helperText={error.cantact !== undefined && error.cantact[0]}
                                 fullWidth
                              />
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

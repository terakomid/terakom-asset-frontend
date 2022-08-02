import React, { useState } from "react";
import { Box, Card, CardContent, Checkbox, FormControl, FormControlLabel, FormGroup, Link, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link as RouterLink } from "react-router-dom";
import http from "../../component/api/Api";

export default function Login() {
   const [loading, setLoading] = useState(false);
   const [data, setData] = useState({
      email: "",
      password: "",
   });
   const onChange = (e) => {
      setData({
         ...data,
         [e.target.name]: e.target.value,
      });
   };
   const onSubmit = (e) => {
      e.preventDefault();
      setLoading(true);
      let formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      http
         .post(`/login`, formData)
         .then((res) => {
            let value = res.data.data;
            localStorage.setItem("token", value.access_token);
            // setAuth({
            //    auth: true,
            //    user: value.user,
            // });
         })
         .catch((err) => {
            // console.log(err.response);
            let responseError = err.response.data.data;
            if (responseError.message === "Unauthorized") {
               // setAlert(true);
               setLoading(false);
               // setError("Email atau password salah.");
            }
         });
   };
   return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
         <Card sx={{ width: "400px" }}>
            <CardContent sx={{ textAlign: "center" }}>
               <img alt="Logo" src="/assets/images/logo.webp" />
               <Typography variant="h6" my={5} fontWeight="bold" color="text.primary">
                  Asset Management System
               </Typography>
               <Box component="form" onSubmit={onSubmit} px={2} mb={1}>
                  <TextField name="email" type="email" label="Email" margin="normal" onChange={onChange} fullWidth required autoFocus />
                  <TextField name="password" label="Password" margin="normal" onChange={onChange} fullWidth required />
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                     <FormGroup>
                        <FormControlLabel
                           sx={{ mb: 0 }}
                           control={<Checkbox size="small" />}
                           label={
                              <Typography variant="body2" color="text.primary">
                                 Remember me
                              </Typography>
                           }
                        />
                     </FormGroup>
                     <Link component={RouterLink} to="/forgot-password">
                        <Typography variant="body2">Forgot password?</Typography>
                     </Link>
                  </Box>
                  <FormControl margin="normal" fullWidth>
                     <LoadingButton type="submit" variant="contained" loading={loading}>
                        Login
                     </LoadingButton>
                  </FormControl>
               </Box>
            </CardContent>
         </Card>
      </Box>
   );
}

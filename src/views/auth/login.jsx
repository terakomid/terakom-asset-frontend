import React, { useState } from "react";
import {
   Alert,
   Box,
   Card,
   CardContent,
   Collapse,
   FormControl,
   IconButton,
   InputAdornment,
   InputLabel,
   Link,
   OutlinedInput,
   TextField,
   Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useRecoilState } from "recoil";
import { Link as RouterLink } from "react-router-dom";
import { authentication } from "../../store/Authentication";
import http from "../../component/api/Api";

export default function Login() {
   const [auth, setAuth] = useRecoilState(authentication);
   const [error, setError] = useState();
   const [alert, setAlert] = useState(false);
   const [loading, setLoading] = useState(false);
   const [data, setData] = useState({
      email: "",
      password: "",
   });
   const handleChange = (e) => {
      setData({
         ...data,
         [e.target.name]: e.target.value,
      });
   };
   const handleSubmit = (e) => {
      e.preventDefault();
      setAlert(false);
      setLoading(true);
      let formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      http
         .post(`login`, formData)
         .then((res) => {
            // console.log(res.data.data);
            let value = res.data.data;
            localStorage.setItem("token", value.access_token);
            setAuth({
               auth: true,
               user: value.user,
            });
         })
         .catch((xhr) => {
            // console.log(xhr.response);
            let err = xhr.response.data.data;
            if (err.message === "Unauthorized") {
               setAlert(true);
               setLoading(false);
               setError("Invalid email address or password.");
            }
         });
   };

   const [values, setValues] = useState({
      showPassword: false,
   });
   const handleClickShowPassword = () => {
      setValues({
         ...values,
         showPassword: !values.showPassword,
      });
   };
   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };
   return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
         <Card sx={{ width: "400px" }}>
            <CardContent sx={{ textAlign: "center", mt: 5 }}>
               <img alt="Logo" src="/assets/images/logo-dark.png" />
               <Typography variant="h6" my={5} fontWeight="bold" color="text.primary">
                  Asset Management System
               </Typography>
               <Box component="form" onSubmit={handleSubmit} px={2} mb={1}>
                  <Collapse in={alert} sx={{ mt: 1 }}>
                     <Alert severity="error">{error}</Alert>
                  </Collapse>
                  <TextField name="email" type="email" label="Email Address" margin="normal" onChange={handleChange} fullWidth required autoFocus />
                  <FormControl margin="normal" variant="outlined" fullWidth>
                     <InputLabel>Password *</InputLabel>
                     <OutlinedInput
                        name="password"
                        label="Password"
                        type={values.showPassword ? "text" : "password"}
                        onChange={handleChange}
                        inputProps={{ minLength: 8, maxLength: 32 }}
                        endAdornment={
                           <InputAdornment position="end">
                              <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                                 {values.showPassword ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                              </IconButton>
                           </InputAdornment>
                        }
                        fullWidth
                        required
                     />
                  </FormControl>
                  <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", mt: 1 }}>
                     <Link component={RouterLink} to="/reset-password">
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

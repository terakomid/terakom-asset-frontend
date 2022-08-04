import React, { useState, useEffect } from "react";
import {
   Card,
   Grid,
   CardContent,
   Avatar,
   Stack,
   Typography,
   TextField,
   Box,
   MenuItem,
   Button,
   OutlinedInput,
   InputLabel,
   FormControl,
   InputAdornment,
   FormHelperText,
   IconButton,
   FormLabel,
   RadioGroup,
   FormControlLabel,
   Radio,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";
import http from "../../../component/api/Api";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Loading from "../../../component/Loading";

const Form = (props) => {
   const navigate = useNavigate();
   const [form, setForm] = useState({
      employ_code: "",
      full_name: "",
      phone_number: "",
      email: "",
      department: "",
      role: "",
      address: "",
      status: "1",
      old_password: "",
      password: "",
      password_confirmation: "",
   });
   const [image, setImage] = useState({
      image_preview: "",
      image_file: "",
   });
   const [departmentOptions, setDepartmentOptions] = useState([]);
   const [roleOptions, setRoleOptions] = useState([]);
   const [loading, setLoading] = useState(false);
   const [isComplete, setIsComplete] = useState(false);
   const [errors, setErrors] = useState({});
   const [showNew, setShowNew] = useState("password");
   const [showCon, setShowCon] = useState("password");

  
   const onShowNew = (e) => {
      if (showNew === "password") {
         setShowNew("text");
      } else {
         setShowNew("password");
      }
   };

   const onShowCon = (e) => {
      if (showCon === "password") {
         setShowCon("text");
      } else {
         setShowCon("password");
      }
   };

   const getDepartment = async () => {
      const res = await http.get(`dept`);
      setDepartmentOptions([...res.data.data]);
      return 1;
   };

   const getRole = async () => {
      const res = await http.get(`role`);
      setRoleOptions([...res.data.data]);
      return 1;
   };

   useEffect(() => {
      let mounted = true;
      if (mounted) {
         Promise.all([getDepartment(), getRole()]).then((res) => {
            setIsComplete(true);
            if (props.data) {
               const data = props.data;
               setForm({
                  employ_code: data.code,
                  full_name: data.name,
                  phone_number: data.phone_number,
                  email: data.email,
                  department: data.dept.id,
                  role: data.role,
                  address: data.address,
                  status: data.status,
                  old_password: "",
                  password: "",
                  password_confirmation: "",
               });
               setImage({
                  ...image,
                  image_preview: data.photo_url,
               });
            }
         });
      }

      return () => (mounted = false);
   }, [props]);

   const handleImage = (e) => {
      let image_preview = URL.createObjectURL(e.target.files[0]);
      let image_file = e.target.files[0];
      setImage({
         image_preview,
         image_file,
      });
   };

   const onChange = (e) => {
      setForm({
         ...form,
         [e.target.name]: e.target.value,
      });
   };

   const onSubmit = (e) => {
      e.preventDefault();
      setLoading(true);
      const formData = new FormData();
      formData.append("code", form.employ_code);
      formData.append("name", form.full_name);
      formData.append("phone_number", form.phone_number);
      formData.append("email", form.email);
      formData.append("department_id", form.department);
      formData.append("address", form.address);
      formData.append("status", form.status);
      formData.append("role", form.role);

      // setTimeout(() => {
      // 	console.log(Object.fromEntries(formData))
      // 	setLoading(false)
      // }, 500);
      if (props.title == "add") {
         formData.append("password", form.password);
         formData.append("password_confirmation", form.password_confirmation);
         formData.append("photo", image.image_file);
         http
            .post("user", formData)
            .then((res) => {
               // console.log(res.data)
               navigate("/user-list");
            })
            .catch((err) => {
               console.log(err.response)
               if(err.response){
                  setErrors(err.response.data.errors)
               }
            })
            .finally((res) => {
               setLoading(false);
            });
      } else {
         if (image.image_file !== "") formData.append("photo", image.image_file);
         formData.append("_method", "PUT");
         http
            .post(`user/${props.data.id}`, formData)
            .then((res) => {
               // console.log(res.data)
               navigate("/user-list");
            })
            .catch((err) => {
               // console.log(err.response)
               if(err.response){
                  setErrors(err.response.data.errors)
               }
            })
            .finally((res) => {
               setLoading(false);
            });
      }
   };

   return (
      <Grid container spacing={2}>
         {isComplete && (
            <>
               <Grid item md={4} xs={12}>
                  {console.log(errors)}
                  <Card>
                     <CardContent>
                        <Stack direction="column" alignItems={"center"}>
                           <input
                              onChange={handleImage}
                              type="file"
                              name="image"
                              style={{ display: "none" }}
                              id="image"
                              accept="image/png, image/gif, image/jpeg, image/jpg"
                              required
                           />
                           <Box component="label" htmlFor="image">
                              <Avatar
                                 sx={{ height: "20vh", width: "20vh", boxShadow: 1, mb: 2, cursor: "pointer" }}
                                 alt="Remy Sharp"
                                 src={image.image_preview !== "" ? image.image_preview : "/assets/images.default.png"}
                              />
                           </Box>
                           <Typography color="primary" variant="caption">
                              Allowed *.jpeg, *.jpg, *.png, *.gif,{" "}
                           </Typography>
                           <Typography variant="caption">Max Size 3.1 MB </Typography>
                        </Stack>
                     </CardContent>
                  </Card>
               </Grid>
               <Grid item md xs={12}>
                  <Card>
                     <CardContent>
                        <Box component="form" onSubmit={onSubmit} autoComplete="off">
                           <Grid container spacing={3}>
                              <Grid item xs={12} md={6}>
                                 <TextField 
                                    name="employ_code" 
                                    label="Employe code" 
                                    fullWidth 
                                    value={form.employ_code} 
                                    onChange={onChange}
                                    required
                                    helperText={typeof errors?.code !== 'undefined' ? errors.code[0] : ''}
                                    error={typeof errors?.code !== 'undefined' ? true : false} 
                                 />
                              </Grid>
                              <Grid item xs={12} md={6}>
                                 <TextField 
                                    name="full_name" 
                                    label="Full Name" 
                                    fullWidth 
                                    value={form.full_name} 
                                    onChange={onChange} 
                                    helperText={typeof errors?.full_name !== 'undefined' ? errors.full_name[0] : ''}
                                    error={typeof errors?.full_name !== 'undefined' ? true : false} 
                                 />
                              </Grid>
                              <Grid item xs={12} md={6}>
                                 <TextField 
                                    name="phone_number" 
                                    label="Phone Number" 
                                    fullWidth 
                                    value={form.phone_number} 
                                    onChange={onChange} 
                                    helperText={typeof errors?.phone_number !== 'undefined' ? errors.phone_number[0] : ''}
                                    error={typeof errors?.phone_number !== 'undefined' ? true : false}
                                 />
                              </Grid>
                              <Grid item xs={12} md={6}>
                                 <TextField 
                                    name="email" 
                                    label="Email" 
                                    fullWidth 
                                    value={form.email} 
                                    onChange={onChange} 
                                    helperText={typeof errors?.email !== 'undefined' ? errors.email[0] : ''}
                                    error={typeof errors?.email !== 'undefined' ? true : false}
                                 />
                              </Grid>
                              <Grid item xs={12} md={6}>
                                 <TextField
                                    name="department"
                                    label="Department"
                                    fullWidth
                                    select
                                    value={form.department}
                                    onChange={onChange}
                                    disabled={!isComplete}
                                    required
                                 >
                                    {departmentOptions.length > 0 &&
                                       departmentOptions.map((v) => (
                                          <MenuItem key={v.id} value={v.id}>
                                             {v.dept}
                                          </MenuItem>
                                       ))}
                                    {departmentOptions.length == 0 && <MenuItem disabled>Kosong</MenuItem>}
                                 </TextField>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                 <TextField name="role" label="Role" fullWidth select value={form.role} onChange={onChange} disabled={!isComplete} required>
                                    {roleOptions.length > 0 &&
                                       roleOptions.map((v) => (
                                          <MenuItem key={v.id} value={v.name}>
                                             {v.name}
                                          </MenuItem>
                                       ))}
                                    {roleOptions.length == 0 && <MenuItem disabled>Kosong</MenuItem>}
                                 </TextField>
                              </Grid>
                              <Grid item xs={12} md={12}>
                                 <TextField 
                                    name="address" 
                                    label="Address" 
                                    fullWidth 
                                    multiline 
                                    rows={4} 
                                    value={form.address} 
                                    onChange={onChange} 
                                    helperText={typeof errors?.address !== 'undefined' ? errors.address[0] : ''}
                                    error={typeof errors?.address !== 'undefined' ? true : false}
                                 />
                              </Grid>

                              {props.title === "add" && (
                                 <>
                                    {/* password */}
                                    <Grid item xs={12} md={6}>
                                       <FormControl error={typeof errors?.password !== "undefined" ? true : false} fullWidth>
                                          <InputLabel size="small" htmlFor="password">
                                             Password
                                          </InputLabel>
                                          <OutlinedInput
                                             id="password"
                                             type={showNew}
                                             label={"Password Baru"}
                                             variant="outlined"
                                             fullWidth
                                             name="password"
                                             onChange={onChange}
                                             value={form.password}
                                             required
                                             endAdornment={
                                                <InputAdornment position="end">
                                                   <IconButton aria-label="toggle password visibility" onClick={onShowNew}>
                                                      {showNew === "text" ? <VisibilityOff /> : <Visibility />}
                                                   </IconButton>
                                                </InputAdornment>
                                             }
                                          />
                                          <FormHelperText>
                                             {typeof errors?.password !== "undefined" ? <span style={{ color: "red" }}>{errors.password[0]}</span> : ""}
                                          </FormHelperText>
                                       </FormControl>
                                    </Grid>

                                    {/* password confirmation */}
                                    <Grid item xs={12} md={6}>
                                       <FormControl error={typeof errors?.password_confirmation !== "undefined" ? true : false} fullWidth>
                                          <InputLabel size="small" htmlFor="password_confirmation">
                                             Ulangi Password Baru
                                          </InputLabel>
                                          <OutlinedInput
                                             id="password_confirmation"
                                             type={showCon}
                                             label={"Ulangi Password Baru"}
                                             variant="outlined"
                                             fullWidth
                                             name="password_confirmation"
                                             onChange={onChange}
                                             value={form.password_confirmation}
                                             required
                                             endAdornment={
                                                <InputAdornment position="end">
                                                   <IconButton aria-label="toggle password_confirmation visibility" onClick={onShowCon}>
                                                      {showCon === "text" ? <VisibilityOff /> : <Visibility />}
                                                   </IconButton>
                                                </InputAdornment>
                                             }
                                          />
                                          <FormHelperText>
                                             {typeof errors?.password_confirmation !== "undefined" ? (
                                                <span style={{ color: "red" }}>{errors.password_confirmation[0]}</span>
                                             ) : (
                                                ""
                                             )}
                                          </FormHelperText>
                                       </FormControl>
                                    </Grid>

                                    {/* old password
										<Grid item xs={12} md={12}> 
											<FormControl 
												error={typeof errors?.message !== 'undefined' ? true : false}
												fullWidth
											>
												<InputLabel size="small" htmlFor="old_password">Password Lama</InputLabel>
												<OutlinedInput
													id="old_password"
													type={showOld}
													variant="outlined"
													label={'Password Lama'}
													fullWidth
													name='old_password'
													onChange={onChange}
													value={form.old_password}
													required 
													endAdornment={
														<InputAdornment position="end">
															<IconButton
																aria-label="toggle password visibility"
																onClick={onShowOld}
															>
																{showOld === 'text' ? <VisibilityOff /> : <Visibility />}
															</IconButton>
														</InputAdornment>
													}
												/>
												<FormHelperText>
													{typeof errors?.message !== 'undefined' ? <span style={{color: 'red'}}>{errors.message}</span> : ''}
												</FormHelperText>
											</FormControl>
										</Grid> */}
                                 </>
                              )}

                              <Grid item xs={12} md={12}>
                                 <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Status User</FormLabel>
                                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="status" value={form.status} onChange={onChange}>
                                       <FormControlLabel value="1" control={<Radio />} label="Active" />
                                       <FormControlLabel value="0" control={<Radio />} label="Not Active" />
                                    </RadioGroup>
                                 </FormControl>
                              </Grid>
                           </Grid>
                           <LoadingButton sx={{ display: "flex", mt: 2, borderRadius: 25, ml: "auto" }} type="submit" loading={loading} variant="contained">
                              {props.title !== "add" ? "Save" : "Create"}
                           </LoadingButton>
                        </Box>
                     </CardContent>
                  </Card>
               </Grid>
            </>
         )}
         {!isComplete && (
            <Grid item xs={12} md={12}>
               <Loading />
            </Grid>
         )}
      </Grid>
   );
};

export default Form;

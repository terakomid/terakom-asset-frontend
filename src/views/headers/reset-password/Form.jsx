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
import { useRecoilState } from "recoil";
import { authentication } from "../../../store/Authentication";

const Form = (props) => {

    const [auth, setAuth] = useRecoilState(authentication);

    const navigate = useNavigate();
    const [form, setForm] = useState({
        old_password: "",
        password: "",
        password_confirmation: "",
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [showNew, setShowNew] = useState("password");
    const [showCon, setShowCon] = useState("password");
    const [showOld, setShowOld] = useState("password");

  
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

    const onShowOld = (e) => {
        if (showOld === "password") {
            setShowOld("text");
        } else {
            setShowOld("password");
        }
    };

    const resetDataUser = async () => {
        let auth = false;
        let user = null;
        try {
            const { data } = await http.get(`/profile`);
            auth = data.meta.status === "success" ? true : false;
            user = data.data;
        } catch {
            auth = false;
            user = null;
        }
        setAuth({
            auth,
            user,
        })
    }

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
        formData.append("old_password", form.old_password);
        formData.append("password", form.password);
        formData.append("password_confirmation", form.password_confirmation);
        http.patch(`user/${auth.user.id}/change_password`, {}, {
            params: {
                old_password: form.old_password,
                password: form.password,
                password_confirmation: form.password_confirmation,
            }
        })
        .then(res => {
            resetDataUser().then(res => {
                navigate('/dashboard')
            })
        })
        .catch(err => {
            if(err.response){
                setErrors(err.response.data.errors)
            }
        })
        .finally((e) =>{
            setLoading(false)
        })
    };

    return (
        <div className='main-content'>
            <div className="page-content">
                <div className="container-fluid">
                    <div className='row'>
                        <Grid container spacing={2}>
                            <Grid item md={12} xs={12}>
                                <Card>
                                    <CardContent>
                                        <Box component="form" onSubmit={onSubmit} autoComplete="off">
                                        <Grid container spacing={3}>

                                            {/* Old Password */}
                                            <Grid item xs={12} md={12}> 
                                                <FormControl 
                                                    error={typeof errors?.old_password !== 'undefined' ? true : false}
                                                    fullWidth
                                                >
                                                    <InputLabel htmlFor="old_password">Old Password</InputLabel>
                                                    <OutlinedInput
                                                        id="old_password"
                                                        type={showOld}
                                                        variant="outlined"
                                                        label={'Old Password'}
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
                                                                    {showOld === 'text' ? <Visibility /> : <VisibilityOff /> }
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                    />
                                                    <FormHelperText>
                                                        {typeof errors?.old_password !== 'undefined' ? <span style={{color: 'red'}}>{errors.old_password}</span> : ''}
                                                    </FormHelperText>
                                                </FormControl>
                                            </Grid>
                                            
                                            {/* New Password */}
                                            <Grid item xs={12} md={6}>
                                                <FormControl error={typeof errors?.password !== "undefined" ? true : false} fullWidth>
                                                    <InputLabel htmlFor="password">
                                                        New Password
                                                    </InputLabel>
                                                    <OutlinedInput
                                                        id="password"
                                                        type={showNew}
                                                        label={"New Password"}
                                                        variant="outlined"
                                                        fullWidth
                                                        name="password"
                                                        onChange={onChange}
                                                        value={form.password}
                                                        required
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton aria-label="toggle password visibility" onClick={onShowNew}>
                                                                    {showNew === "text" ? <Visibility /> : <VisibilityOff />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                    />
                                                    <FormHelperText>
                                                        {typeof errors?.password !== "undefined" ? <span style={{ color: "red" }}>{errors.password[0]}</span> : ""}
                                                    </FormHelperText>
                                                </FormControl>
                                            </Grid>

                                            {/* New Password Confirm */}
                                            <Grid item xs={12} md={6}>
                                                <FormControl error={typeof errors?.password_confirmation !== "undefined" ? true : false} fullWidth>
                                                    <InputLabel htmlFor="password_confirmation">
                                                        Repeat New Password
                                                    </InputLabel>
                                                    <OutlinedInput
                                                        id="password_confirmation"
                                                        type={showCon}
                                                        label={"Repeat New Password"}
                                                        variant="outlined"
                                                        fullWidth
                                                        name="password_confirmation"
                                                        onChange={onChange}
                                                        value={form.password_confirmation}
                                                        required
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton aria-label="toggle password_confirmation visibility" onClick={onShowCon}>
                                                                    {showCon === "text" ? <Visibility /> : <VisibilityOff />}
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

                                            

                                        </Grid>
                                        <LoadingButton sx={{ display: "flex", mt: 2, borderRadius: 25, ml: "auto" }} type="submit" loading={loading} variant="contained">
                                            {props.title !== "add" ? "Save" : "Create"}
                                        </LoadingButton>
                                        </Box>
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

export default Form;

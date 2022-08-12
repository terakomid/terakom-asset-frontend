import React, { useEffect, useState } from "react";
import {
   Card,
   CardContent,
   Grid,
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
   FormControl,
   InputLabel,
   Select,
   OutlinedInput,
   Chip,
   MenuItem,
   Checkbox,
   ListItemText,
   Divider,
   Typography,
   Box,
   TextField,
   TableContainer,
   Table,
   TableHead,
   TableRow,
   TableCell,
   TableBody,
   IconButton,
   Stack,
   Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import moment from "moment";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// import { useNavigate } from "react-router-dom";
import http from "../../../component/api/Api";
import Loading from "../../../component/Loading";
import { NumberFormat } from "../../../component/Format";
import { FilterListRounded, MoreVert } from "@mui/icons-material";
import QRCode from "react-qr-code";

export default function Print() {
   // const navigate = useNavigate();

   const [rows, setRows] = useState({
      category: [],
      employee: [],
      capitalized_from: null,
      capitalized_until: null,
      vendor: [],
      department: [],
      location: [],
      condition: [],
      cost: [],
      useful: [],

      device: [],
      brand: [],
      processor: [],
      windows: [],
      office: [],
      antivirus: [],
   });
   const [data, setData] = useState();
   const getCategory = async () => {
      const res = await http.get(`category`);
      return res.data.data;
   };
   const getEmployee = async () => {
      const res = await http.get(`user?paginate=0`);
      return res.data.data.data;
   };
   const getVendor = async () => {
      const res = await http.get(`vendor`);
      return res.data.data;
   };
   const getDepartment = async () => {
      const res = await http.get(`dept`);
      return res.data.data;
   };
   const getLocation = async () => {
      const res = await http.get(`location`);
      return res.data.data;
   };
   const getCondition = async () => {
      const res = await http.get(`condition`);
      return res.data.data;
   };
   const getCost = async () => {
      const res = await http.get(`cost`);
      return res.data.data;
   };
   const getUseful = async () => {
      const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
      const res = arr.map((value) => value * 12);
      return res;
   };
   const getMasterit = async () => {
      const res = await http.get(`master_it?child=1`);
      return res.data.data;
   };

   useEffect(() => {
      let mounted = true;
      if (mounted) {
         Promise.all([getCategory(), getEmployee(), getVendor(), getDepartment(), getLocation(), getCondition(), getCost(), getUseful(), getMasterit()]).then(
            (res) => {
               handleComplete();
               setData({
                  category: res[0],
                  employee: res[1],
                  vendor: res[2],
                  department: res[3],
                  location: res[4],
                  condition: res[5],
                  cost: res[6],
                  useful: res[7],
                  device: res[8].filter((value) => value.id === 1),
                  brand: res[8].filter((value) => value.id === 2),
                  processor: res[8].filter((value) => value.id === 3),
                  windows: res[8].filter((value) => value.id === 4),
                  office: res[8].filter((value) => value.id === 5),
                  antivirus: res[8].filter((value) => value.id === 6),
               });
               // console.clear();
               // console.log(res[8].filter((value) => value.id === 1));
            }
         );
      }
   }, []);

   const [asset, setAsset] = useState([]);
   const handleSubmit = async (e) => {
      e.preventDefault();
      handleLoading();
      await http
         .get(`asset`, {
            params: data,
         })
         .then((res) => {
            // console.log(res.data.data);
            setAsset(res.data.data.data);
            setLoading(false);
            handleDialog();
         })
         .catch((err) => {
            // console.log(err.response);
         });
   };

   const [staging, setStaging] = useState({
      asset: [],
   });
   const handleCheckbox = (e) => {
      if (staging.asset.indexOf(e.target.value) === -1) {
         let newState = staging.asset.concat(e.target.value);
         setStaging({
            ...staging,
            [e.target.name]: newState,
         });
      } else {
         let newState = staging.asset.filter((value) => value !== e.target.value);
         setStaging({
            ...staging,
            [e.target.name]: newState,
         });
      }
   };

   const [print, setPrint] = useState(false);
   const handlePrint = () => {
      setPrint(!print);
   };
   const [complete, setComplete] = useState(false);
   const handleComplete = () => {
      setComplete(!complete);
   };
   const [dialog, setDialog] = useState(true);
   const handleDialog = () => {
      setDialog(!dialog);
   };
   const [loading, setLoading] = useState(false);
   const handleLoading = () => {
      setLoading(!loading);
   };
   const handleChange = async (e) => {
      const {
         target: { value },
      } = e;
      setRows({
         ...rows,
         [e.target.name]: typeof value === "string" ? value.split(",") : value,
      });
   };

   return (
      <div className="main-content mb-5">
         <div className="page-content">
            <div className="container">
               <div className="d-flex align-items-center justify-content-between mt-2 mb-4">
                  <h3 className="fw-bold mb-0">Print Label</h3>
                  <Stack direction="row" spacing={1}>
                     <Button variant={print ? "outlined" : "contained"} disabled={staging.asset.length < 1} onClick={handlePrint}>
                        {print ? "Kembali" : "Print Label"}
                     </Button>
                  </Stack>
               </div>
               {print === false ? (
                  <Card>
                     <CardContent>
                        <Grid container spacing={2} justifyContent="flex-end">
                           <Grid item>
                              <LoadingButton variant="link" startIcon={<FilterListRounded />} onClick={handleDialog}>
                                 Filter
                              </LoadingButton>
                           </Grid>
                        </Grid>
                        <TableContainer>
                           <Table sx={{ minWidth: 650, mt: 3 }} aria-label="simple table">
                              <TableHead>
                                 <TableRow
                                    sx={{
                                       "& th:first-of-type": { borderRadius: "0.5em 0 0 0.5em" },
                                       "& th:last-of-type": { borderRadius: "0 0.5em 0.5em 0" },
                                    }}
                                 >
                                    <TableCell align="center">
                                       <Checkbox />
                                    </TableCell>
                                    <TableCell align="center">No.</TableCell>
                                    <TableCell>Code Asset</TableCell>
                                    <TableCell>SAP Code</TableCell>
                                    <TableCell>Asset Name</TableCell>
                                    <TableCell>Category Asset</TableCell>
                                    <TableCell>Capitalized On</TableCell>
                                    <TableCell>Useful Life</TableCell>
                                    <TableCell>Usage Limit</TableCell>
                                    {/* <TableCell>Usage Period</TableCell> */}
                                    <TableCell>Asset Acquistion Value</TableCell>
                                    <TableCell>Deprecation</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                 </TableRow>
                              </TableHead>
                              <TableBody>
                                 {asset.length > 0 ? (
                                    asset.map((value, index) => (
                                       <TableRow key={index}>
                                          <TableCell component="th" scope="row" align="center">
                                             <Checkbox name="asset" value={value.id} onChange={handleCheckbox} checked={staging.asset.indexOf(value.id) > -1} />
                                          </TableCell>
                                          <TableCell align="center">{index + 1}.</TableCell>
                                          <TableCell>{value.asset_code}</TableCell>
                                          <TableCell>{value.sap_code}</TableCell>
                                          <TableCell>{value.asset_name}</TableCell>
                                          <TableCell>
                                             {value.category.code} - {value.category.category}
                                          </TableCell>
                                          <TableCell>{moment(value.capitalized).format("LL")}</TableCell>
                                          <TableCell>{value.useful_life} Month</TableCell>
                                          <TableCell>{value.useful_life / 12} Year</TableCell>
                                          {/* <TableCell>{value.asset_code}</TableCell> */}
                                          <TableCell>{NumberFormat(value.acquisition_value)}</TableCell>
                                          <TableCell>{NumberFormat(value.depreciation)}</TableCell>
                                          <TableCell align="center">
                                             <IconButton onClick={(e) => handleClick(e, value)}>
                                                <MoreVert />
                                             </IconButton>
                                          </TableCell>
                                       </TableRow>
                                    ))
                                 ) : (
                                    <TableRow>
                                       <TableCell component="th" scope="row" sx={{ textAlign: "center", py: 10 }} colSpan={100}>
                                          No result found.
                                       </TableCell>
                                    </TableRow>
                                 )}
                              </TableBody>
                           </Table>
                        </TableContainer>
                     </CardContent>
                  </Card>
               ) : (
                  asset.map((value, index) => (
                     <Box sx={{ display: "flex" }} key={index}>
                        <table style={{ border: "1px solid black" }}>
                           <tbody>
                              <tr>
                                 <td rowSpan={4} style={{ border: "1px solid black", padding: "40px 10px", background: "#fff" }}>
                                    <QRCode size={100} value={value.asset_code} />
                                 </td>
                              </tr>
                              <tr>
                                 <td colSpan={5} style={{ border: "1px solid black", padding: "0px 30px" }}>
                                    <Typography variant="h6" fontWeight="bold" textAlign="center" color="black">
                                       PT. Haier Sales Indonesia
                                    </Typography>
                                 </td>
                              </tr>
                              <tr>
                                 <td style={{ border: "1px solid black" }}>
                                    <Typography variant="body2" fontWeight="bold" textAlign="center" color="black">
                                       {value.asset_code.split("/")[0]}
                                    </Typography>
                                 </td>
                                 <td style={{ border: "1px solid black" }}>
                                    <Typography variant="body2" fontWeight="bold" textAlign="center" color="black">
                                       {value.asset_code.split("/")[1]}
                                    </Typography>
                                 </td>
                                 <td style={{ border: "1px solid black" }}>
                                    <Typography variant="body2" fontWeight="bold" textAlign="center" color="black">
                                       {value.asset_code.split("/")[2]}
                                    </Typography>
                                 </td>
                                 <td style={{ border: "1px solid black" }}>
                                    <Typography variant="body2" fontWeight="bold" textAlign="center" color="black">
                                       {value.asset_code.split("/")[3]}
                                    </Typography>
                                 </td>
                                 <td style={{ border: "1px solid black" }}>
                                    <Typography variant="body2" fontWeight="bold" textAlign="center" color="black">
                                       {value.asset_code.split("/")[4]}
                                    </Typography>
                                 </td>
                              </tr>
                              <tr>
                                 <td colSpan={5} style={{ border: "1px solid black", padding: "0px 30px" }}>
                                    <Typography
                                       variant="subtitle2"
                                       fontWeight="bold"
                                       textAlign="center"
                                       color="black"
                                    >{`${value.asset_name} - ${value.employee.name} - ${value.department.dept}`}</Typography>
                                 </td>
                              </tr>
                           </tbody>
                        </table>
                     </Box>
                  ))
               )}
               <Dialog open={dialog} onClose={handleDialog} maxWidth="md" fullWidth>
                  <DialogTitle>Filter Print Label</DialogTitle>
                  <Divider />
                  {complete ? (
                     <DialogContent>
                        <Grid container spacing={2}>
                           <Grid item xs={12} md={6}>
                              <FormControl sx={{ mt: 1 }} fullWidth>
                                 <InputLabel>Category</InputLabel>
                                 <Select
                                    multiple
                                    name="category"
                                    value={rows.category}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Category" />}
                                    renderValue={(selected) => {
                                       return data.category
                                          .filter((v) => selected.includes(v.id))
                                          .map((v, i) => {
                                             return <Chip key={i} label={v.category} onDelete={() => "cemas"} sx={{ mr: 0.5 }} />;
                                          });
                                    }}
                                 >
                                    {data.category.length > 0 &&
                                       data.category.map((v, i) => {
                                          return (
                                             <MenuItem key={i} value={v.id}>
                                                <Checkbox checked={rows.category.indexOf(v.id) > -1} />
                                                <ListItemText primary={v.category} />
                                             </MenuItem>
                                          );
                                       })}
                                 </Select>
                              </FormControl>
                           </Grid>
                           <Grid item xs={12} md={6}>
                              <FormControl sx={{ mt: 1 }} fullWidth>
                                 <InputLabel>Employee</InputLabel>
                                 <Select
                                    multiple
                                    name="employee"
                                    value={rows.employee}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Employee" />}
                                    renderValue={(selected) => {
                                       return data.employee
                                          .filter((v) => selected.includes(v.id))
                                          .map((v, i) => {
                                             return <Chip key={i} label={v.name} onDelete={() => "cemas"} sx={{ mr: 0.5 }} />;
                                          });
                                    }}
                                 >
                                    {data.employee.length > 0 &&
                                       data.employee.map((v, i) => {
                                          return (
                                             <MenuItem key={i} value={v.id}>
                                                <Checkbox checked={rows.employee.indexOf(v.id) > -1} />
                                                <ListItemText primary={v.name} />
                                             </MenuItem>
                                          );
                                       })}
                                 </Select>
                              </FormControl>
                           </Grid>
                           <Grid item xs={12} md={6}>
                              <FormControl margin="normal" fullWidth>
                                 <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                       value={rows.capitalized_from}
                                       name="capitalized_from"
                                       label="Capitalized From"
                                       inputFormat="dd/MM/yyyy"
                                       mask="__/__/____"
                                       onChange={(newValue) => {
                                          setRows({
                                             ...rows,
                                             capitalized_from: newValue,
                                          });
                                       }}
                                       renderInput={(params) => <TextField fullWidth {...params} />}
                                    />
                                 </LocalizationProvider>
                              </FormControl>
                           </Grid>
                           <Grid item xs={12} md={6}>
                              <FormControl margin="normal" fullWidth>
                                 <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                       minDate={rows.capitalized_from}
                                       value={rows.capitalized_until}
                                       name="capitalized_until"
                                       label="Capitalized Until"
                                       inputFormat="dd/MM/yyyy"
                                       mask="__/__/____"
                                       onChange={(newValue) => {
                                          setRows({
                                             ...rows,
                                             capitalized_until: newValue,
                                          });
                                       }}
                                       renderInput={(params) => <TextField fullWidth {...params} />}
                                    />
                                 </LocalizationProvider>
                              </FormControl>
                           </Grid>
                           <Grid item xs={12} md={6}>
                              <FormControl sx={{ mt: 1 }} fullWidth>
                                 <InputLabel>Vendor Name</InputLabel>
                                 <Select
                                    multiple
                                    name="vendor"
                                    value={rows.vendor}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Vendor Name" />}
                                    renderValue={(selected) => {
                                       return data.vendor
                                          .filter((v) => selected.includes(v.id))
                                          .map((v, i) => {
                                             return <Chip key={i} label={v.name} onDelete={() => "cemas"} sx={{ mr: 0.5 }} />;
                                          });
                                    }}
                                 >
                                    {data.vendor.length > 0 &&
                                       data.vendor.map((v, i) => {
                                          return (
                                             <MenuItem key={i} value={v.id}>
                                                <Checkbox checked={rows.vendor.indexOf(v.id) > -1} />
                                                <ListItemText primary={v.name} />
                                             </MenuItem>
                                          );
                                       })}
                                 </Select>
                              </FormControl>
                           </Grid>
                           <Grid item xs={12} md={6}>
                              <FormControl sx={{ mt: 1 }} fullWidth>
                                 <InputLabel>Department Using</InputLabel>
                                 <Select
                                    multiple
                                    name="department"
                                    value={rows.department}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Department Using" />}
                                    renderValue={(selected) => {
                                       return data.department
                                          .filter((v) => selected.includes(v.id))
                                          .map((v, i) => {
                                             return <Chip key={i} label={v.dept} onDelete={() => "cemas"} sx={{ mr: 0.5 }} />;
                                          });
                                    }}
                                 >
                                    {data.department.length > 0 &&
                                       data.department.map((v, i) => {
                                          return (
                                             <MenuItem key={i} value={v.id}>
                                                <Checkbox checked={rows.department.indexOf(v.id) > -1} />
                                                <ListItemText primary={v.dept} />
                                             </MenuItem>
                                          );
                                       })}
                                 </Select>
                              </FormControl>
                           </Grid>
                           <Grid item xs={12} md={6}>
                              <FormControl sx={{ mt: 1 }} fullWidth>
                                 <InputLabel>Asset Location</InputLabel>
                                 <Select
                                    multiple
                                    name="location"
                                    value={rows.location}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Asset Location" />}
                                    renderValue={(selected) => {
                                       return data.location
                                          .filter((v) => selected.includes(v.id))
                                          .map((v, i) => {
                                             return <Chip key={i} label={v.location} onDelete={() => "cemas"} sx={{ mr: 0.5 }} />;
                                          });
                                    }}
                                 >
                                    {data.location.length > 0 &&
                                       data.location.map((v, i) => {
                                          return (
                                             <MenuItem key={i} value={v.id}>
                                                <Checkbox checked={rows.location.indexOf(v.id) > -1} />
                                                <ListItemText primary={v.location} />
                                             </MenuItem>
                                          );
                                       })}
                                 </Select>
                              </FormControl>
                           </Grid>
                           <Grid item xs={12} md={6}>
                              <FormControl sx={{ mt: 1 }} fullWidth>
                                 <InputLabel>Asset Condition</InputLabel>
                                 <Select
                                    multiple
                                    name="condition"
                                    value={rows.condition}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Asset Condition" />}
                                    renderValue={(selected) => {
                                       return data.condition
                                          .filter((v) => selected.includes(v.id))
                                          .map((v, i) => {
                                             return <Chip key={i} label={v.condition} onDelete={() => "cemas"} sx={{ mr: 0.5 }} />;
                                          });
                                    }}
                                 >
                                    {data.condition.length > 0 &&
                                       data.condition.map((v, i) => {
                                          return (
                                             <MenuItem key={i} value={v.id}>
                                                <Checkbox checked={rows.condition.indexOf(v.id) > -1} />
                                                <ListItemText primary={v.condition} />
                                             </MenuItem>
                                          );
                                       })}
                                 </Select>
                              </FormControl>
                           </Grid>
                           <Grid item xs={12} md={6}>
                              <FormControl sx={{ mt: 1 }} fullWidth>
                                 <InputLabel>Cost Center Name</InputLabel>
                                 <Select
                                    multiple
                                    name="cost"
                                    value={rows.cost}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Cost Center Name" />}
                                    renderValue={(selected) => {
                                       return data.cost
                                          .filter((v) => selected.includes(v.id))
                                          .map((v, i) => {
                                             return <Chip key={i} label={v.name} onDelete={() => "cemas"} sx={{ mr: 0.5 }} />;
                                          });
                                    }}
                                 >
                                    {data.cost.length > 0 &&
                                       data.cost.map((v, i) => {
                                          return (
                                             <MenuItem key={i} value={v.id}>
                                                <Checkbox checked={rows.cost.indexOf(v.id) > -1} />
                                                <ListItemText primary={v.name} />
                                             </MenuItem>
                                          );
                                       })}
                                 </Select>
                              </FormControl>
                           </Grid>
                           <Grid item xs={12} md={6}>
                              <FormControl sx={{ mt: 1 }} fullWidth>
                                 <InputLabel>Useful Life (Month)</InputLabel>
                                 <Select
                                    multiple
                                    name="useful"
                                    value={rows.useful}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Useful Life (Month)" />}
                                    renderValue={(selected) => {
                                       return data.useful
                                          .filter((v) => selected.includes(v))
                                          .map((v, i) => {
                                             return <Chip key={i} label={`${v} Month`} onDelete={() => "cemas"} sx={{ mr: 0.5 }} />;
                                          });
                                    }}
                                 >
                                    {data.useful.length > 0 &&
                                       data.useful.map((v, i) => {
                                          return (
                                             <MenuItem key={i} value={v}>
                                                <Checkbox checked={rows.useful.indexOf(v) > -1} />
                                                <ListItemText primary={`${v} Month`} />
                                             </MenuItem>
                                          );
                                       })}
                                 </Select>
                              </FormControl>
                           </Grid>
                        </Grid>
                        <Divider sx={{ my: 5 }} />
                        <Typography fontWeight="bold" pb={2}>
                           Filter IT
                        </Typography>
                        <Grid container spacing={2}>
                           <Grid item xs={12} md={6}>
                              <FormControl sx={{ mt: 1 }} fullWidth>
                                 <InputLabel>Device</InputLabel>
                                 <Select
                                    multiple
                                    name="device"
                                    value={rows.device}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Device" />}
                                    renderValue={(selected) => {
                                       return data.device[0].sub_master_it
                                          .filter((v) => selected.includes(v.id))
                                          .map((v, i) => {
                                             return <Chip key={i} label={v.sub_type} onDelete={() => "cemas"} sx={{ mr: 0.5 }} />;
                                          });
                                    }}
                                 >
                                    {data.device[0].sub_master_it?.length > 0 &&
                                       data.device[0].sub_master_it.map((v, i) => {
                                          return (
                                             <MenuItem key={i} value={v.id}>
                                                <Checkbox checked={rows.device.indexOf(v.id) > -1} />
                                                <ListItemText primary={v.sub_type} />
                                             </MenuItem>
                                          );
                                       })}
                                 </Select>
                              </FormControl>
                           </Grid>
                           <Grid item xs={12} md={6}>
                              <FormControl sx={{ mt: 1 }} fullWidth>
                                 <InputLabel>Brand</InputLabel>
                                 <Select
                                    multiple
                                    name="brand"
                                    value={rows.brand}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Brand" />}
                                    renderValue={(selected) => {
                                       return data.brand[0].sub_master_it
                                          .filter((v) => selected.includes(v.id))
                                          .map((v, i) => {
                                             return <Chip key={i} label={v.sub_type} onDelete={() => "cemas"} sx={{ mr: 0.5 }} />;
                                          });
                                    }}
                                 >
                                    {data.brand[0].sub_master_it?.length > 0 &&
                                       data.brand[0].sub_master_it.map((v, i) => {
                                          return (
                                             <MenuItem key={i} value={v.id}>
                                                <Checkbox checked={rows.brand.indexOf(v.id) > -1} />
                                                <ListItemText primary={v.sub_type} />
                                             </MenuItem>
                                          );
                                       })}
                                 </Select>
                              </FormControl>
                           </Grid>
                           <Grid item xs={12} md={6}>
                              <FormControl sx={{ mt: 1 }} fullWidth>
                                 <InputLabel>Processor</InputLabel>
                                 <Select
                                    multiple
                                    name="processor"
                                    value={rows.processor}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Processor" />}
                                    renderValue={(selected) => {
                                       return data.processor[0].sub_master_it
                                          .filter((v) => selected.includes(v.id))
                                          .map((v, i) => {
                                             return <Chip key={i} label={v.sub_type} onDelete={() => "cemas"} sx={{ mr: 0.5 }} />;
                                          });
                                    }}
                                 >
                                    {data.processor[0].sub_master_it?.length > 0 &&
                                       data.processor[0].sub_master_it.map((v, i) => {
                                          return (
                                             <MenuItem key={i} value={v.id}>
                                                <Checkbox checked={rows.processor.indexOf(v.id) > -1} />
                                                <ListItemText primary={v.sub_type} />
                                             </MenuItem>
                                          );
                                       })}
                                 </Select>
                              </FormControl>
                           </Grid>
                           <Grid item xs={12} md={6}>
                              <FormControl sx={{ mt: 1 }} fullWidth>
                                 <InputLabel>Windows OS</InputLabel>
                                 <Select
                                    multiple
                                    name="windows"
                                    value={rows.windows}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Windows OS" />}
                                    renderValue={(selected) => {
                                       return data.windows[0].sub_master_it
                                          .filter((v) => selected.includes(v.id))
                                          .map((v, i) => {
                                             return <Chip key={i} label={v.sub_type} onDelete={() => "cemas"} sx={{ mr: 0.5 }} />;
                                          });
                                    }}
                                 >
                                    {data.windows[0].sub_master_it?.length > 0 &&
                                       data.windows[0].sub_master_it.map((v, i) => {
                                          return (
                                             <MenuItem key={i} value={v.id}>
                                                <Checkbox checked={rows.windows.indexOf(v.id) > -1} />
                                                <ListItemText primary={v.sub_type} />
                                             </MenuItem>
                                          );
                                       })}
                                 </Select>
                              </FormControl>
                           </Grid>
                           <Grid item xs={12} md={6}>
                              <FormControl sx={{ mt: 1 }} fullWidth>
                                 <InputLabel>Office</InputLabel>
                                 <Select
                                    multiple
                                    name="office"
                                    value={rows.office}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Office" />}
                                    renderValue={(selected) => {
                                       return data.office[0].sub_master_it
                                          .filter((v) => selected.includes(v.id))
                                          .map((v, i) => {
                                             return <Chip key={i} label={v.sub_type} onDelete={() => "cemas"} sx={{ mr: 0.5 }} />;
                                          });
                                    }}
                                 >
                                    {data.office[0].sub_master_it?.length > 0 &&
                                       data.office[0].sub_master_it.map((v, i) => {
                                          return (
                                             <MenuItem key={i} value={v.id}>
                                                <Checkbox checked={rows.office.indexOf(v.id) > -1} />
                                                <ListItemText primary={v.sub_type} />
                                             </MenuItem>
                                          );
                                       })}
                                 </Select>
                              </FormControl>
                           </Grid>
                           <Grid item xs={12} md={6}>
                              <FormControl sx={{ mt: 1 }} fullWidth>
                                 <InputLabel>Antivirus</InputLabel>
                                 <Select
                                    multiple
                                    name="antivirus"
                                    value={rows.antivirus}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Antivirus" />}
                                    renderValue={(selected) => {
                                       return data.antivirus[0].sub_master_it
                                          .filter((v) => selected.includes(v.id))
                                          .map((v, i) => {
                                             return <Chip key={i} label={v.sub_type} onDelete={() => "cemas"} sx={{ mr: 0.5 }} />;
                                          });
                                    }}
                                 >
                                    {data.antivirus[0].sub_master_it?.length > 0 &&
                                       data.antivirus[0].sub_master_it.map((v, i) => {
                                          return (
                                             <MenuItem key={i} value={v.id}>
                                                <Checkbox checked={rows.antivirus.indexOf(v.id) > -1} />
                                                <ListItemText primary={v.sub_type} />
                                             </MenuItem>
                                          );
                                       })}
                                 </Select>
                              </FormControl>
                           </Grid>
                        </Grid>
                     </DialogContent>
                  ) : (
                     <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
                        <Loading />
                     </Box>
                  )}
                  <Divider />
                  {complete && (
                     <DialogActions sx={{ py: 2, px: 3 }}>
                        <LoadingButton loading={loading} variant="contained" onClick={handleSubmit}>
                           Apply
                        </LoadingButton>
                     </DialogActions>
                  )}
               </Dialog>
            </div>
         </div>
      </div>
   );
}

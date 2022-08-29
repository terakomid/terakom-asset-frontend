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
   Stack,
   Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import moment from "moment";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import HTMLtoDOCX from "html-to-docx";
import { saveAs } from "file-saver";

import http from "../../../component/api/Api";
import Loading from "../../../component/Loading";
import { NumberFormat } from "../../../component/Format";
import { Download, FilterListRounded } from "@mui/icons-material";
import QRCode from "react-qr-code";
import { ConvertLabel } from "../../../help/LabelHelp";

export default function Print() {
   const [rows, setRows] = useState({
      category_id: [],
      employees_id: [],
      capitalized_from: null,
      capitalized_until: null,
      vendor_id: [],
      department_id: [],
      location_id: [],
      condition_id: [],
      cost_id: [],
      useful_id: [],

      device_id: [],
      brand_id: [],
      processor_id: [],
      windows_id: [],
      office_id: [],
      antivirus_id: [],
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
      setStaging({
         ...staging,
         asset: [],
      });
      await http
         .get(`asset`, {
            params: {
               ...rows,
               capitalized_from: rows.capitalized_from !== null ? moment(rows.capitalized_from).format("yyyy-MM-DD") : "",
               capitalized_until: rows.capitalized_until !== null ? moment(rows.capitalized_until).format("yyyy-MM-DD") : "",
            },
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
      if (staging.asset.indexOf(e.target.value) == -1) {
         let newState = staging.asset.concat(e.target.value);
         setStaging({
            ...staging,
            [e.target.name]: newState,
         });
      } else {
         let newState = staging.asset.filter((value) => value != e.target.value);
         setStaging({
            ...staging,
            [e.target.name]: newState,
         });
      }
   };
   const handleAllCheckbox = (e) => {
      if (staging.asset.length === asset.length) {
         setStaging({
            ...staging,
            asset: [],
         });
      } else {
         setStaging({
            ...staging,
            asset: asset.map((v) => v.id.toString()),
         });
      }
   };

   const PrintTable = (props) => {
      const [asset_code, setAssetCode] = useState([]);

      useEffect(() => {
         let mounted = true;
         if (mounted) {
            if (props.capitalizedSplit) {
               setAssetCode(ConvertLabel(props.data, props.capitalizedSplit));
            } else {
               setAssetCode(ConvertLabel(props.data));
            }
         }
         return () => (mounted = false);
      }, []);

      return (
         <table style={{ border: "1px solid black", width: "302px", height: "188px" }}>
            <tbody>
               {/* <tr>
                  <td rowSpan={4}>
                     <QRCode size={80} value={asset_code.join("/")} />
                  </td>
               </tr> */}
               <tr>
                  <td colSpan={5}>
                     <Typography variant="subtitle2" fontWeight="bold" textAlign="center" color="black">
                        PT. Haier Sales Indonesia
                     </Typography>
                  </td>
               </tr>
               <tr>
                  <td>
                     <Typography variant="body2" fontWeight="bold" textAlign="center" color="black">
                        {asset_code[0]}
                     </Typography>
                  </td>
                  <td>
                     <Typography variant="body2" fontWeight="bold" textAlign="center" color="black">
                        {asset_code[1]}
                     </Typography>
                  </td>
                  <td>
                     <Typography variant="body2" fontWeight="bold" textAlign="center" color="black">
                        {asset_code[2]}
                     </Typography>
                  </td>
                  <td>
                     <Typography variant="body2" fontWeight="bold" textAlign="center" color="black">
                        {asset_code[3]}
                     </Typography>
                  </td>
                  <td>
                     <Typography variant="body2" fontWeight="bold" textAlign="center" color="black">
                        {asset_code[4]}
                     </Typography>
                  </td>
               </tr>
               <tr>
                  <td colSpan={5}>
                     <Typography
                        variant="p"
                        fontWeight="bold"
                        textAlign="center"
                        color="black"
                     >{`${props.data.asset_name} - ${props.data.employee.name} - ${props.data.department.dept}`}</Typography>
                  </td>
               </tr>
            </tbody>
         </table>
      );
   };

   const [print, setPrint] = useState(false);
   const handlePrint = async () => {
      setPrint(!print);
      const download = document.getElementById("download").innerHTML;
      const printLabel = `<!DOCTYPE html>
         <html lang="en">
            <head>
               <meta charset="UTF-8" />
               <title>Document</title>
            </head>
            <body>${download}</body>
         </html>`;
      const fileBuffer = await HTMLtoDOCX(printLabel, null);
      saveAs(fileBuffer, "Print-Label.docx");
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
                     <Button variant="contained" disabled={staging.asset.length < 1 && print === false} onClick={handlePrint} startIcon={<Download />}>
                        Download Label
                     </Button>
                  </Stack>
               </div>
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
                                    <Checkbox
                                       onClick={handleAllCheckbox}
                                       checked={staging.asset.length > 0 && staging.asset.length === asset.length ? true : false}
                                    />
                                 </TableCell>
                                 <TableCell align="center">No.</TableCell>
                                 <TableCell>Code Asset</TableCell>
                                 <TableCell>Asset Name</TableCell>
                                 <TableCell>Category Asset</TableCell>
                                 <TableCell>Capitalized On</TableCell>
                                 <TableCell>Useful Life</TableCell>
                                 <TableCell>Usage Limit</TableCell>
                                 {/* <TableCell>Usage Period</TableCell> */}
                                 <TableCell>Asset Acquistion Value</TableCell>
                                 <TableCell>Deprecation</TableCell>
                              </TableRow>
                           </TableHead>
                           <TableBody>
                              {asset.length > 0 ? (
                                 asset.map((value, index) => (
                                    <TableRow key={index}>
                                       <TableCell component="th" scope="row" align="center">
                                          <Checkbox
                                             name="asset"
                                             value={value.id}
                                             onChange={handleCheckbox}
                                             checked={staging.asset.filter((v) => v == value.id).length > 0 ? true : false}
                                          />
                                       </TableCell>
                                       <TableCell align="center">{index + 1}.</TableCell>
                                       <TableCell>{value.asset_code}</TableCell>
                                       <TableCell>{value.asset_name}</TableCell>
                                       <TableCell>
                                          {value.category.code} - {value.category.category}
                                       </TableCell>
                                       <TableCell>{moment(value.capitalized).format("LL")}</TableCell>
                                       <TableCell>{value.useful_life} Month</TableCell>
                                       <TableCell>{value.useful_life / 12} Year</TableCell>
                                       {/* <TableCell>{value.asset_code}</TableCell> */}
                                       <TableCell>{NumberFormat(value.acquisition_value, "Rp")}</TableCell>
                                       <TableCell>{NumberFormat(value.depreciation)}</TableCell>
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
               <div id="download" hidden>
                  {asset.map((value, index) => staging.asset.filter((v) => v == value.id).length > 0 && <PrintTable data={value} key={index} />)}
               </div>
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
                                    name="category_id"
                                    value={rows.category_id}
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
                                                <Checkbox checked={rows.category_id.indexOf(v.id) > -1} />
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
                                    name="employees_id"
                                    value={rows.employees_id}
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
                                                <Checkbox checked={rows.employees_id.indexOf(v.id) > -1} />
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
                                    name="vendor_id"
                                    value={rows.vendor_id}
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
                                                <Checkbox checked={rows.vendor_id.indexOf(v.id) > -1} />
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
                                    name="department_id"
                                    value={rows.department_id}
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
                                                <Checkbox checked={rows.department_id.indexOf(v.id) > -1} />
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
                                    name="location_id"
                                    value={rows.location_id}
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
                                                <Checkbox checked={rows.location_id.indexOf(v.id) > -1} />
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
                                    name="condition_id"
                                    value={rows.condition_id}
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
                                                <Checkbox checked={rows.condition_id.indexOf(v.id) > -1} />
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
                                    name="cost_id"
                                    value={rows.cost_id}
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
                                                <Checkbox checked={rows.cost_id.indexOf(v.id) > -1} />
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
                                    name="useful_id"
                                    value={rows.useful_id}
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
                                                <Checkbox checked={rows.useful_id.indexOf(v) > -1} />
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
                                    name="device_id"
                                    value={rows.device_id}
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
                                                <Checkbox checked={rows.device_id.indexOf(v.id) > -1} />
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
                                    name="brand_id"
                                    value={rows.brand_id}
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
                                                <Checkbox checked={rows.brand_id.indexOf(v.id) > -1} />
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
                                    name="processor_id"
                                    value={rows.processor_id}
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
                                                <Checkbox checked={rows.processor_id.indexOf(v.id) > -1} />
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
                                    name="windows_id"
                                    value={rows.windows_id}
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
                                                <Checkbox checked={rows.windows_id.indexOf(v.id) > -1} />
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
                                    name="office_id"
                                    value={rows.office_id}
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
                                                <Checkbox checked={rows.office_id.indexOf(v.id) > -1} />
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
                                    name="antivirus_id"
                                    value={rows.antivirus_id}
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
                                                <Checkbox checked={rows.antivirus_id.indexOf(v.id) > -1} />
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

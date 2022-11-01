import React, { useState, useEffect, useRef } from "react";
import {
   Grid,
   Card,
   CardContent,
   Typography,
   TextField,
   MenuItem,
   Box,
   Stack,
   FormControl,
   FormLabel,
   RadioGroup,
   FormControlLabel,
   Radio,
   Chip,
   Button,
   Divider,
   Tabs,
   Tab,
   TableContainer,
   Table,
   TableBody,
   TableHead,
   TableRow,
   TableCell,
   TablePagination,
   IconButton,
   Dialog,
   DialogTitle,
   DialogContent,
   DialogContentText,
   DialogActions,
   Autocomplete,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import http from "../../../component/api/Api";
import { useNavigate } from "react-router-dom";
import Loading from "../../../component/Loading";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { produce } from "immer";
import {
   AssignmentLateOutlined,
   AssignmentTurnedInOutlined,
   DescriptionOutlined,
   Download,
   DownloadForOffline,
   DownloadForOfflineOutlined,
   InsertPhotoOutlined,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import QRCode from "react-qr-code";
import { NumberFormat } from "../../../component/Format";
import { ConvertLabel } from "../../../help/LabelHelp";
import { LabelTable } from "../../../component/LabelTable";
import { useSnackbar } from "notistack";
import { useRecoilValue } from "recoil";
import { authentication } from "../../../store/Authentication";
import { DataURIToBlob } from "../../../help/DataUriToBlob";
import Camera from "react-html5-camera-photo";
import 'react-html5-camera-photo/build/css/index.css';
import { Permission } from "../../../component/Permission";

const role = ["Admin Department", "Employee"]

const DetailModal = (props) => {
   const navigate = useNavigate();
   const { enqueueSnackbar } = useSnackbar();
   const handleClose = () => {
      if (props.title === "add") {
         enqueueSnackbar("Add Asset Successfuly", { variant: "success" });
      } else {
         enqueueSnackbar("Edit Asset Successfuly", { variant: "success" });
      }
      navigate("/data-asset");
   };

   const download = async () => {
      const formData = new FormData()
      formData.append('ids[]', props.data.id)
      const res = await http.post('print_label', formData, {
         responseType: 'blob'
      })
      const temp = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = temp;
      link.setAttribute("download", `${props.data.asset_code}.pdf`); 
      document.body.appendChild(link);
      link.click();
      // const temp = window.URL.createObjectURL(new Blob([res.data], {
      //    type: 'application/pdf'
      // }));
      // window.open(temp)
   }

   return (
      <Dialog fullWidth maxWidth="xs" open={props.open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
         <DialogTitle>QR Asset</DialogTitle>
         <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
               <LabelTable data={props.data} capitalizedSplit={"/"} />
               <Button onClick={download}  sx={{ mt: 2 }} variant="contained">
                  Print
               </Button>
            </Box>
         </DialogContent>
         <DialogActions>
            <Button variant="success" onClick={handleClose}>
               Close
            </Button>
         </DialogActions>
      </Dialog>
   );
};

const SuccessModal = (props) => {
   return (
      <Dialog
         fullWidth
         maxWidth="xs"
         open={props.open}
         onClose={props.handleClose}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
      >
         <DialogTitle>Confirm</DialogTitle>
         <DialogContent>
            <DialogContentText>Are you sure want to {props.title} this asset?</DialogContentText>
         </DialogContent>
         <DialogActions>
            <Button variant="text" onClick={props.handleClose}>
               Cancel
            </Button>
            {/* <Box component="form" onSubmit={() => props.onSubmit()}>
               
            </Box> */}
            <LoadingButton loading={props.loading} onClick={props.onSubmit}  variant="text" color="success">
               {props.title}
            </LoadingButton>
         </DialogActions>
      </Dialog>
   );
};

const TabPanel = (props) => {
   const { children, value, id, index, ...other } = props;

   const [depreciationData, setDepreciationData] = useState();
   const [maintanceData, setMaintanceData] = useState();
   const [mutationData, setMutationData] = useState();
   const [changeData, setChangeData] = useState();
   const [params, setParams] = useState({
      asset_id: id,
      limit: 10,
      paginate: 1,
      page: 1,
   });

   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(5);

   const getAssetDepreciation = async () => {
      http
         .get(`/asset_depreciation`, {
            params: params,
         })
         .then((res) => {
            setDepreciationData(res.data.data);
         })
         .catch((err) => {});
   };

   const getAssetMaintance = async () => {
      http
         .get(`/asset_maintenance`, {
            params: params,
         })
         .then((res) => {
            setMaintanceData(res.data.data);
         })
         .catch((err) => {});
   };

   const getAssetMutation = async () => {
      http
         .get(`/asset_mutation`, {
            params: params,
         })
         .then((res) => {
            setMutationData(res.data.data);
         })
         .catch((err) => {});
   };

   const getAssetChange = async () => {
      http
         .get(`/activity_log`, {
            params: params,
         })
         .then((res) => {
            setChangeData(res.data.data);
         })
         .catch((err) => {});
   };

   const handleChangePage = (event, newPage) => {
      setParams({
         ...params,
         page: newPage + 1,
      });
   };

   const handleChangeRowsPerPage = (event) => {
      setParams({
         ...params,
         page: 1,
         limit: +event.target.value,
      });
   };

   useEffect(() => {
      let mounted = true;
      if (mounted) {
         if (value === 0) {
            //depreciation history
            getAssetDepreciation();
         } else if (value === 1) {
            //maintance history
            getAssetMaintance();
         } else if (value === 2) {
            //mutation history
            getAssetMutation();
         } else if (value === 3) {
            //change history
            getAssetChange();
         }
      }

      return () => (mounted = false);
   }, []);

   return (
      <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
         {/* depreciation */}
         {value === 0 && (
            <Box sx={{ p: 3 }}>
               <TableContainer>
                  <Table sx={{ minWidth: 650, mt: 2 }} aria-label="simple table">
                     <TableHead>
                        <TableRow
                           sx={{
                              "& th:first-of-type": { borderRadius: "0.5em 0 0 0.5em" },
                              "& th:last-of-type": { borderRadius: "0 0.5em 0.5em 0" },
                           }}
                        >
                           <TableCell align="center">No.</TableCell>
                           <TableCell>Year</TableCell>
                           <TableCell>Total Month</TableCell>
                           <TableCell>Depreciation Date</TableCell>
                           <TableCell>Depreciation Desc</TableCell>
                           <TableCell>Depreciation</TableCell>
                           <TableCell>Final Accumulated Depreciation</TableCell>
                           <TableCell>Book Value</TableCell>
                           <TableCell>Created At</TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {depreciationData !== undefined ? (
                           depreciationData.data.length > 0 ? (
                              depreciationData.data.map((value, index) => (
                                 <TableRow key={index}>
                                    <TableCell component="th" scope="row" align="center">
                                       {depreciationData.meta.from + index}.
                                    </TableCell>
                                    <TableCell>{value.year}</TableCell>
                                    <TableCell>{value.total_month}</TableCell>
                                    <TableCell>{value.depreciation_date}</TableCell>
                                    <TableCell>{value.depreciation_desc}</TableCell>
                                    <TableCell>{NumberFormat(value.debit)}</TableCell>
                                    <TableCell>{NumberFormat(value.credit)}</TableCell>
                                    <TableCell>{NumberFormat(value.book_value)}</TableCell>
                                    <TableCell>{moment(value.created_at).format("ll")}</TableCell>
                                 </TableRow>
                              ))
                           ) : (
                              <TableRow>
                                 <TableCell component="th" scope="row" sx={{ textAlign: "center", py: 10 }} colSpan={100}>
                                    No result found.
                                 </TableCell>
                              </TableRow>
                           )
                        ) : (
                           <TableRow>
                              <TableCell component="th" scope="row" sx={{ textAlign: "center", py: 5 }} colSpan={100}>
                                 <Loading />
                              </TableCell>
                           </TableRow>
                        )}
                     </TableBody>
                  </Table>
               </TableContainer>
               {depreciationData !== undefined && depreciationData.data.length > 0 && (
                  <TablePagination
                     component="div"
                     count={depreciationData.meta.total}
                     page={params.page - 1}
                     rowsPerPage={params.limit}
                     onPageChange={handleChangePage}
                     onRowsPerPageChange={handleChangeRowsPerPage}
                     rowsPerPageOptions={[10, 25, 50]}
                  />
               )}
            </Box>
         )}

         {/* maintance */}
         {value === 1 && (
            <Box sx={{ p: 3 }}>
               <TableContainer>
                  <Table sx={{ minWidth: 650, mt: 2 }} aria-label="simple table">
                     <TableHead>
                        <TableRow
                           sx={{
                              "& th:first-of-type": { borderRadius: "0.5em 0 0 0.5em" },
                              "& th:last-of-type": { borderRadius: "0 0.5em 0.5em 0" },
                           }}
                        >
                           <TableCell align="center">No.</TableCell>
                           <TableCell>Maintenance Code</TableCell>
                           <TableCell>PIC Asset</TableCell>
                           <TableCell>Department</TableCell>
                           <TableCell>Applicant Date</TableCell>
                           <TableCell>Request Date Repair</TableCell>
                           <TableCell>Request Time To Finish</TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {maintanceData !== undefined ? (
                           maintanceData.data.length > 0 ? (
                              maintanceData.data.map((value, index) => (
                                 <TableRow key={index}>
                                    <TableCell component="th" scope="row" align="center">
                                       {index + 1}.
                                    </TableCell>
                                    <TableCell>{value.pic.code}</TableCell>
                                    <TableCell>{value.pic.name}</TableCell>
                                    <TableCell>{value.pic.name}</TableCell>
                                    <TableCell>{moment(value.applicant_date).format("LL")}</TableCell>
                                    <TableCell>{moment(value.request_date_repair).format("LL")}</TableCell>
                                    <TableCell>{moment(value.request_time_finish).format("LL")}</TableCell>
                                 </TableRow>
                              ))
                           ) : (
                              <TableRow>
                                 <TableCell component="th" scope="row" sx={{ textAlign: "center", py: 10 }} colSpan={100}>
                                    No result found.
                                 </TableCell>
                              </TableRow>
                           )
                        ) : (
                           <TableRow>
                              <TableCell component="th" scope="row" sx={{ textAlign: "center", py: 5 }} colSpan={100}>
                                 <Loading />
                              </TableCell>
                           </TableRow>
                        )}
                     </TableBody>
                  </Table>
               </TableContainer>
               {maintanceData !== undefined && maintanceData.data.length > 0 && (
                  <TablePagination
                     component="div"
                     count={maintanceData.meta.total}
                     page={params.page - 1}
                     rowsPerPage={params.limit}
                     onPageChange={handleChangePage}
                     onRowsPerPageChange={handleChangeRowsPerPage}
                     rowsPerPageOptions={[10, 25, 50]}
                  />
               )}
            </Box>
         )}

         {/* mutation */}
         {value === 2 && (
            <Box sx={{ p: 3 }}>
               <TableContainer>
                  <Table sx={{ minWidth: 650, mt: 2 }} aria-label="simple table">
                     <TableHead>
                        <TableRow
                           sx={{
                              "& th:first-of-type": { borderRadius: "0.5em 0 0 0.5em" },
                              "& th:last-of-type": { borderRadius: "0 0.5em 0.5em 0" },
                           }}
                        >
                           <TableCell align="center">No.</TableCell>
                           <TableCell>PIC Asset</TableCell>
                           <TableCell>Receive Name</TableCell>
                           <TableCell>Asset Code</TableCell>
                           <TableCell>Asset Name</TableCell>
                           <TableCell>From Branch</TableCell>
                           <TableCell>From Room</TableCell>
                           <TableCell>To Branch</TableCell>
                           <TableCell>To Room</TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {mutationData !== undefined ? (
                           mutationData.data.length > 0 ? (
                              mutationData.data.map((value, index) => (
                                 <TableRow key={index}>
                                    <TableCell component="th" scope="row" align="center">
                                       {mutationData.meta.from + index}.
                                    </TableCell>
                                    <TableCell>{value.pic.name}</TableCell>
                                    <TableCell>{value.receive.name}</TableCell>
                                    <TableCell>{value.asset.asset_code}</TableCell>
                                    <TableCell>{value.asset.asset_name}</TableCell>
                                    <TableCell>
                                       {value.from_branch.code} - {value.from_branch.location}
                                    </TableCell>
                                    <TableCell>{value.from_room}</TableCell>
                                    <TableCell>
                                       {value.to_branch.code} - {value.to_branch.location}
                                    </TableCell>
                                    <TableCell>{value.to_room}</TableCell>
                                 </TableRow>
                              ))
                           ) : (
                              <TableRow>
                                 <TableCell component="th" scope="row" sx={{ textAlign: "center", py: 10 }} colSpan={100}>
                                    No result found.
                                 </TableCell>
                              </TableRow>
                           )
                        ) : (
                           <TableRow>
                              <TableCell component="th" scope="row" sx={{ textAlign: "center", py: 5 }} colSpan={100}>
                                 <Loading />
                              </TableCell>
                           </TableRow>
                        )}
                     </TableBody>
                  </Table>
               </TableContainer>
               {mutationData !== undefined && mutationData.data.length > 0 && (
                  <TablePagination
                     component="div"
                     count={mutationData.meta.total}
                     page={params.page - 1}
                     rowsPerPage={params.limit}
                     onPageChange={handleChangePage}
                     onRowsPerPageChange={handleChangeRowsPerPage}
                     rowsPerPageOptions={[10, 25, 50]}
                  />
               )}
            </Box>
         )}

         {/* change */}
         {value === 3 && (
            <Box sx={{ p: 3 }}>
               <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                     <TableHead>
                        <TableRow
                           sx={{
                              "& th:first-of-type": { borderRadius: "0.5em 0 0 0.5em" },
                              "& th:last-of-type": { borderRadius: "0 0.5em 0.5em 0" },
                           }}
                        >
                           <TableCell align="center">No.</TableCell>
                           <TableCell>Log Name</TableCell>
                           <TableCell>Description</TableCell>
                           <TableCell>User</TableCell>
                           <TableCell>Ip</TableCell>
                           <TableCell>Browser</TableCell>
                           <TableCell>OS</TableCell>
                           <TableCell>Created At</TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {changeData !== undefined ? (
                           changeData.data.length > 0 ? (
                              changeData.data.map((value, key) => (
                                 <TableRow key={key}>
                                    <TableCell component="th" scope="row" align="center">
                                       {changeData.meta.from + key}.
                                    </TableCell>
                                    <TableCell>{value.log_name}</TableCell>
                                    <TableCell>{value.description}</TableCell>
                                    <TableCell>{value.user !== null && value.user}</TableCell>
                                    <TableCell>{value.ip}</TableCell>
                                    <TableCell>{value.browser}</TableCell>
                                    <TableCell>{value.os}</TableCell>
                                    <TableCell>{moment(value.created_at).format("ll")}</TableCell>
                                 </TableRow>
                              ))
                           ) : (
                              <TableRow>
                                 <TableCell component="th" scope="row" sx={{ textAlign: "center", py: 10 }} colSpan={10}>
                                    No result found.
                                 </TableCell>
                              </TableRow>
                           )
                        ) : (
                           <TableRow>
                              <TableCell component="th" scope="row" sx={{ textAlign: "center", py: 5 }} colSpan={10}>
                                 <Loading />
                              </TableCell>
                           </TableRow>
                        )}
                     </TableBody>
                  </Table>
               </TableContainer>
               {changeData !== undefined && changeData.data.length > 0 && (
                  <TablePagination
                     component="div"
                     count={changeData.meta.total}
                     page={params.page - 1}
                     rowsPerPage={params.limit}
                     onPageChange={handleChangePage}
                     onRowsPerPageChange={handleChangeRowsPerPage}
                     rowsPerPageOptions={[10, 25, 50, 100]}
                     showFirstButton
                     showLastButton
                  />
               )}
            </Box>
         )}
      </div>
   );
};

const a11yProps = (index) => {
   return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
   };
};

const TabsComponent = (props) => {
   const [value, setValue] = useState(0);
   const handleChange = (e, val) => {
      setValue(val);
   };
   return (
      <>
         <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Depreciation History" {...a11yProps(0)} />
            <Tab label="Maintance History" {...a11yProps(1)} />
            <Tab label="Mutation History" {...a11yProps(2)} />
            <Tab label="Change History" {...a11yProps(3)} />
         </Tabs>
         {value === 0 && (
            <TabPanel value={value} index={0} id={props.id}>
               Depreciation History
            </TabPanel>
         )}
         {value === 1 && (
            <TabPanel value={value} index={1} id={props.id}>
               Maintance History
            </TabPanel>
         )}
         {value === 2 && (
            <TabPanel value={value} index={2} id={props.id}>
               Mutation History
            </TabPanel>
         )}
         {value === 3 && (
            <TabPanel value={value} index={3} id={props.id}>
               Change History
            </TabPanel>
         )}
      </>
   );
};

const DetailComponent = (props) => {
   const [asset_code, setAssetCode] = useState("");
   const { user } = useRecoilValue(authentication);
   const navigate = useNavigate();
   const download = async () => {
      const formData = new FormData()
      formData.append('ids[]', props.data.id)
      const res = await http.post('print_label', formData, {
         responseType: 'blob'
      })
      const temp = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = temp;
      link.setAttribute("download", `${props.data.asset_code}.pdf`); 
      document.body.appendChild(link);
      link.click();
      // const temp = window.URL.createObjectURL(new Blob([res.data], {
      //    type: 'application/pdf'
      // }));
      // window.open(temp)
   }

   const navigateEditAsset = (data) => {
      if (data.asset_type === "it") {
         navigate(`/edit-data-asset-it/${data.id}`);
      } else {
         navigate(`/edit-data-asset-non-it/${data.id}`);
      }
   }

   useEffect(() => {
      let mounted = true;
      if (mounted) {
         setAssetCode(ConvertLabel(props.data).join("/"));
      }

      return () => (mounted = false);
   }, []);
   return (
      <Grid item xs={12} md={12} alignItems="center" justifyContent="center" display="flex" flexDirection={"column"}>
         <Grid container spacing={3} mt={2} justifyContent={"center"} alignItems="center">
            <Grid item md={6} xs={12}>
               <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <LabelTable data={props.data} />
               </Box>
            </Grid>
         </Grid>
         <Box sx={{ mt: 2 }}>
         <Button onClick={download} variant="contained">
            Print Label
         </Button>
         {Permission(user.permission, "update asset") &&
         <Button sx={{ ml: 1 }} onClick={() => navigateEditAsset(props.data)} variant="contained">
            Edit Asset 
         </Button>
         }
         </Box>
      </Grid>
   );
};

const ModalCamera = (props) => {
   const ref = useRef(null)
   const deleteCamera = () => {
      ref.current.remove()
   }

   return (
      <Dialog fullWidth maxWidth="md" open={props.open} onClose={props.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
         <DialogTitle>Camera</DialogTitle>
         <DialogContent ref={ref}>
            <Camera
               idealFacingMode="user"
               isSilentMode={true}
               onTakePhoto = {(dataUri) => { 
                  let blob = DataURIToBlob(dataUri) 
                  let file = new File([blob], `Capture-${props.cameraIndex + 1}.png`, { type: 'image/png' });
                  let file_url = URL.createObjectURL(file) 
                  let file_name = file.name
                  props.setEvidences((currentAnswers) => 
                     produce(currentAnswers, (v) => { 
                        v[props.cameraIndex] = { 
                           id: "", 
                           file, 
                           file_url, 
                           file_name, 
                        };
                     }) 
                  ); 
                  deleteCamera()
                  props.handleClose()
               }} 
            />
         </DialogContent>
         <DialogActions>
            <Button variant="success" onClick={props.handleClose}>
               Close
            </Button>
         </DialogActions>
      </Dialog>
   )
}

const ModalCamera2 = (props) => {
   const ref = useRef(null)
   const deleteCamera = () => {
      ref.current.remove()
   }

   return (
      <Dialog fullWidth maxWidth="md" open={props.open} onClose={props.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
         <DialogTitle>Camera</DialogTitle>
         <DialogContent ref={ref}>
            <Camera
               idealFacingMode="user"
               isSilentMode={true}
               onTakePhoto = {(dataUri) => { 
                  let blob = DataURIToBlob(dataUri) 
                  let image_file = new File([blob], `Capture-${props.cameraIndex + 1}.png`, { type: 'image/png' });
                  let image_preview = URL.createObjectURL(image_file) 
                  let image_name = image_file.name
                  props.setPictures((currentAnswers) => 
                     produce(currentAnswers, (v) => { 
                        v[props.cameraIndex] = {
                           id: "",
                           image_file,
                           image_preview,
                           image_name,
                        };
                     }) 
                  ); 
                  deleteCamera()
                  props.handleClose()
               }} 
            />
         </DialogContent>
         <DialogActions>
            <Button variant="success" onClick={props.handleClose}>
               Close
            </Button>
         </DialogActions>
      </Dialog>
   )
}

const Form = (props) => {
   const [id, setId] = useState("");
   const { user } = useRecoilValue(authentication);

   //form
   const [form, setForm] = useState({
      // asset information
      asset_code: " /FA/ / /",
      category_id: "",
      sub_category_id: "",
      asset_name: "",
      specification: "",
      capitalized: null,
      sap_code: "",

      // asset holder
      employee_id: "",
      department_id: "",
      location_id: "",
      condition_id: "",
      latitude: "",
      longitude: "",

      // depreciation asset
      cost_id: "",
      acquisition_value: "",
      depreciation_value: "",
      value_book: "",
      depreciation: "1",

      // Vendor information
      vendor_id: "",
      vendor_address: "",
      pic_contact: "",
      contact: "",

      // Device information
      device_id: "",
      type: "",
      brand_id: "",
      monitor_inch: "",
      model_brand: "",
      mac_address: "",
      warranty: null,
      computer_name: "",

      // Hardware
      dlp: "",
      soc: "",
      snnbpc: "",
      processor_id: "",
      hardware: "",

      //Sofware
      os_id: "",
      sn_windows: "",
      office_id: "",
      sn_office: "",
      antivirus_id: "",

      // information support
      notes: "",
   });

   // utils
   const navigate = useNavigate();
   const { enqueueSnackbar } = useSnackbar();
   const [isComplete, setIsComplete] = useState(false);
   const [loading, setLoading] = useState(false);
   const [errors, setErrors] = useState({});
   const [open, setOpen] = useState(false);
   const [detailModal, setDetailModal] = useState(false);
   const [detailModalData, setDetailModalData] = useState();

   //select
   const [assetLocations, setAssetLocations] = useState([]);
   const [assetCategories, setAssetCategories] = useState([]);
   const [subCategories, setSubCategories] = useState([]);
   const [employees, setEmployees] = useState([]);
   const [assetConditions, setAssetConditions] = useState([]);
   const [assetCost, setAssetCost] = useState([]);
   const [assetVendor, setAssetVendor] = useState([]);
   const [masterDevices, setMasterDevices] = useState([]);
   const [masterBrands, setMasterBrands] = useState([]);
   const [masterProcessors, setMasterProcessors] = useState([]);
   const [masterWindowOS, setMasterWindowOS] = useState([]);
   const [masterOffices, setMasterOffices] = useState([]);
   const [masterAntiVirus, setMasterAntiVirus] = useState([]);

   //loading select
   const [subCategoriesLoading, setSubCategoriesLoading] = useState(false);

   //otomatic value
   const [department, setDepartment] = useState("");
   const [vendor, setVendor] = useState({
      vendor_address: "",
      contact: "",
      pic_contact: "",
   });
   const [useful, setUseFul] = useState("");
   const [mainPicture, setMainPicture] = useState({});

   //picture and evidence
   const [pictures, setPictures] = useState([
      {
         id: "",
         image_file: "",
         image_preview: "",
         image_name: "",
      },
   ]);
   const [evidences, setEvidences] = useState([
      {
         id: "",
         file: "",
         file_url: "",
         file_name: ""
      },
   ]);

   //get data from API
   const getAssetCategories = async () => {
      const res = await http.get(`category`);
      setAssetCategories([...res.data.data]);
      return 1;
   };

   const getSubCategory = async (category_id) => {
      setSubCategoriesLoading(true);
      const res = await http.get(`sub_category?category_id=${category_id}`);
      setSubCategories([...res.data.data]);
      setSubCategoriesLoading(false);
   };

   const getAssetLocations = async () => {
      const res = await http.get(`location`);
      setAssetLocations([...res.data.data]);
      return 1;
   };

   const [paramsEmployee, setParamsEmploy] = useState({
      paginate: 1,
      limit: 3,
      search: "",
   });
   const getEmployees = async () => {
      const res = await http.get(`user`, {
         params: paramsEmployee,
      });
      setEmployees([...res.data.data.data]);
      return 1;
   };

   useEffect(() => {
      setEmployees([]);
      let timer = setTimeout(() => {
         if (paramsEmployee) getEmployees();
      }, 500);
      return () => clearTimeout(timer);
   }, [paramsEmployee]);

   const getAssetCondition = async () => {
      const res = await http.get(`condition`);
      setAssetConditions([...res.data.data]);
      return 1;
   };

   const getAssetCost = async () => {
      const res = await http.get(`cost`);
      setAssetCost([...res.data.data]);
   };

   const [vendorParams, setVendorParams] = useState({
      paginate: 1,
      limit: 3,
      search: "",
   });
   const getVendor = async () => {
      const res = await http.get(`vendor`, {
         params: {
            vendorParams
         }
      });
      setAssetVendor([...res.data.data.data]);
   };

   useEffect(() => {
      setAssetVendor([]);
      let timer = setTimeout(() => {
         if (vendorParams) getVendor();
      }, 500);
      return () => clearTimeout(timer);
   }, [vendorParams]);

   const getAssetMasterIt = async (master_it_id) => {
      const res = await http.get(`sub_master_it`, {
         params: {
            master_it_id,
         },
      });
      if (master_it_id === 1) {
         setMasterDevices([...res.data.data]);
      } else if (master_it_id === 2) {
         setMasterBrands([...res.data.data]);
      } else if (master_it_id === 3) {
         setMasterProcessors([...res.data.data]);
      } else if (master_it_id === 4) {
         setMasterWindowOS([...res.data.data]);
      } else if (master_it_id === 5) {
         setMasterOffices([...res.data.data]);
      } else if (master_it_id === 6) {
         setMasterAntiVirus([...res.data.data]);
      }
      return 1;
   };

   // event handler
   const handleChange = (e) => {
      if (e.target.name === "category_id") {
         const temp = assetCategories.find((v) => v.id === e.target.value);
         const splitCode = form.asset_code.split("/");
         splitCode[3] = temp.code;
         getSubCategory(e.target.value);
         setForm({
            ...form,
            [e.target.name]: e.target.value,
            asset_code: splitCode.join("/"),
         });
      } else if (e.target.name === "sub_category_id") {
         const subCategory = subCategories.find((v) => v.id == e.target.value);
         const device = masterDevices.find((v) => v.sub_type.toLowerCase() == subCategory.sub_category.toLowerCase());
         setUseFul(subCategory.useful_life);
         if (device) {
            setForm({
               ...form,
               [e.target.name]: e.target.value,
               device_id: device.id,
            });
         } else {
            setForm({
               ...form,
               [e.target.name]: e.target.value,
            });
         }
      } else if (e.target.name === "employee_id") {
         const user = employees.find((v) => v.id == e.target.value);
         const splitCode = form.asset_code.split("/");
         splitCode[2] = user.location.code;
         setForm({
            ...form,
            [e.target.name]: e.target.value,
            department_id: user.dept.id,
            location_id: user.location.id,
            asset_code: splitCode.join("/"),
         });
         setDepartment(user.dept.dept);
      } else if (e.target.name === "vendor_id") {
         const vendor = assetVendor.find((v) => v.id == e.target.value);
         setForm({
            ...form,
            [e.target.name]: e.target.value,
         });
         setVendor({
            vendor_address: vendor.address,
            contact: vendor.contact,
            pic_contact: vendor.pic_contact,
         });
      } else if (e.target.name === "sap_code") {
         const splitCode = form.asset_code.split("/");
         splitCode[4] = e.target.value;
         setForm({
            ...form,
            [e.target.name]: e.target.value,
            asset_code: splitCode.join("/"),
         });
      } else {
         setForm({
            ...form,
            [e.target.name]: e.target.value,
         });
      }
   };

   const handleChangeForBlurField = (e) => {
      setForm({
         ...form,
         [e.target.name]: e.target.value,
      });
   };

   const handleModal = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const handleDetailModal = () => {
      setDetailModal(true);
   };

   const handleDetailClose = () => {
      setDetailModal(false);
   };

   //Automatic value for edit
   const setAutomatic = (data) => {
      setParamsEmploy({
         ...paramsEmployee,
         search: `${data.employee.code} - ${data.employee.name}`,
      });
      setVendorParams({
         ...vendorParams,
         search: `${data.vendor.code} - ${data.vendor.name}`
      })
      setId(data.id);
      setDepartment(data.department.dept);
      setUseFul(data.sub_category.useful_life);
      setVendor({
         vendor_address: data.vendor.address,
         contact: data.vendor.contact,
         pic_contact: data.vendor.pic_contact,
      });
   };

   //set image and evidence
   const setPictureFromApi = (data) => {
      let temp = [];
      data.picture.map((v, i) => {
         temp.push({
            id: v.id,
            image_preview: v.file,
            image_file: "",
            image_name: v.file.split('/').pop()
         });
      });
      setPictures([...temp]);
      let main = data.picture.find((v) => v.main === 1);
      setMainPicture(main);
   };

   const setEvidenceFromApi = (data) => {
      let temp = [];
      data.evidence.map((v, i) => {
         temp.push({
            id: v.id,
            file: "",
            file_url: v.file,
            file_name: v.file.split('/').pop()
         });
      });
      setEvidences([...temp]);
   };

   const [cameraOpen, setCameraOpen] = useState(false)
   const [cameraIndex, setCameraIndex] = useState(0)
   const handleCamera = () => {
      setCameraOpen(!cameraOpen)
   }
   const handleOpenCamera = (i) => {
      setCameraIndex(i)
      handleCamera()
   }
   
   const [cameraOpen2, setCameraOpen2] = useState(false)
   const [cameraIndex2, setCameraIndex2] = useState(0)
   const handleCamera2 = () => {
      setCameraOpen2(!cameraOpen2)
   }
   const handleOpenCamera2 = (i) => {
      setCameraIndex2(i)
      handleCamera2()
   }

   const store = async (formData) => {
      try {
         const res = await http.post("asset", formData);
         setLoading(false);
         setDetailModalData(res.data.data);
         handleDetailModal();
      } catch (err) {
         setLoading(false);
         handleClose();
         enqueueSnackbar("Complete All Mandatory Field!", { variant: 'error' })
         window.scrollTo({
            top: 0, 
            behavior: 'smooth'
         });
         if (err.response) {
            setErrors(err.response.data.errors);
         }
      }
   };

   const edit = async (formData, id) => {
      try {
         const res = await http.post(`asset/${id}`, formData);
         setLoading(false);
         setDetailModalData(res.data.data);
         handleDetailModal();
      } catch (err) {
         setLoading(false);
         handleClose();
         enqueueSnackbar("Complete All Mandatory Field", { variant: 'error' })
         window.scrollTo({
            top: 0, 
            behavior: 'smooth'
         });
         if (err.response) {
            setErrors(err.response.data.errors);
         }
      }
   };

   const onSubmit = (e) => {
      e.preventDefault();
      setLoading(true);
      setErrors({})
      let url = "";
      const formData = new FormData();

      //asset Information
      formData.append("asset_code", form.asset_code);
      formData.append("category_id", form.category_id);
      formData.append("sub_category_id", form.sub_category_id);
      formData.append("asset_name", form.asset_name);
      formData.append("specification", form.specification);
      formData.append("capitalized", moment(form.capitalized).format("yyyy/MM/DD"));
      formData.append("sap_code", form.sap_code);

      //asset holder
      formData.append("employee_id", form.employee_id);
      formData.append("department_id", form.department_id);
      formData.append("location_id", form.location_id);
      formData.append("condition_id", form.condition_id);
      form.latitude !== "" && formData.append("latitude", form.latitude);
      form.longitude !== "" && formData.append("longitude", form.longitude);

      //depreciation asset
      formData.append("cost_id", form.cost_id);
      formData.append("acquisition_value", form.acquisition_value.replaceAll("IDR ", "").replaceAll(".", ""));
      // formData.append('depreciation_value', form.depreciation_value)
      // formData.append('value_book', form.value_book)
      formData.append("depreciation", form.depreciation);

      //Vendor information
      formData.append("vendor_id", form.vendor_id);
      form.notes !== "" && formData.append("notes", form.notes);

      if (props.title === "add") {
         pictures.map((v, i) => {
            if (i === 0) {
               if (v.image_file !== "") {
                  formData.append(`picture[${i}][file]`, v.image_file);
                  formData.append(`picture[${i}][main]`, 1);
               }
            } else {
               if (v.image_file !== "") {
                  formData.append(`picture[${i}][file]`, v.image_file);
                  formData.append(`picture[${i}][main]`, 0);
               }
            }
         });
         evidences.map((v, i) => {
            if (i === 0) {
               formData.append(`evidence[${i}][file]`, v.file);
            } else {
               formData.append(`evidence[${i}][file]`, v.file);
            }
         });
      } else {
         pictures.map((v, i) => {
            if (i === 0) {
               if (v.image_file === "") {
                  if (v.id !== ""){
                     formData.append(`picture[${i}][id]`, v.id);
                     formData.append(`picture[${i}][main]`, 1);
                  }
               } else {
                  if (v.image_file !== ""){
                     formData.append(`picture[${i}][file]`, v.image_file);
                     formData.append(`picture[${i}][main]`, 1);
                  }
               }
            } else {
               if (v.image_file === "") {
                  if (v.id !== ""){
                     formData.append(`picture[${i}][id]`, v.id);
                     formData.append(`picture[${i}][main]`, 0);
                  }
               } else {
                  if (v.image_file !== "") {
                     formData.append(`picture[${i}][file]`, v.image_file);
                     formData.append(`picture[${i}][main]`, 0);
                  }
               }
            }
         });
         evidences.map((v, i) => {
            if (v.file === "") {
               if (v.id !== "") formData.append(`evidence[${i}][id]`, v.id);
            } else {
               if (v.file !== "") formData.append(`evidence[${i}][file]`, v.file);
            }
         });
      }
      if (props.type === "it") {
         formData.append("asset_type", "it");

         //Device information
         form.device_id !== "" && formData.append("device_id", form.device_id);
         form.type !== "" && formData.append("type", form.type);
         form.brand_id !== "" && formData.append("brand_id", form.brand_id);
         form.monitor_inch !== "" && formData.append("monitor_inch", form.monitor_inch);
         form.model_brand !== "" && formData.append("model_brand", form.model_brand);
         form.mac_address !== "" && formData.append("mac_address", form.mac_address);
         form.warranty !== null && formData.append("warranty", moment(form.warranty).format("yyyy/MM/DD"));
         form.computer_name !== "" && formData.append("computer_name", form.computer_name);

         //Hardware
         form.dlp !== "" && formData.append("dlp", form.dlp);
         form.soc !== "" && formData.append("soc", form.soc);
         form.snnbpc !== "" && formData.append("snnbpc", form.snnbpc);
         form.processor_id !== "" && formData.append("processor_id", form.processor_id);
         form.hardware !== "" && formData.append("hardware", form.hardware);

         //Sofware
         form.os_id !== "" && formData.append("os_id", form.os_id);
         form.sn_windows !== "" && formData.append("sn_windows", form.sn_windows);
         form.office_id !== "" && formData.append("office_id", form.office_id);
         form.sn_office !== "" && formData.append("sn_office", form.sn_office);
         form.antivirus_id !== "" && formData.append("antivirus_id", form.antivirus_id);

         if (props.title === "add") {
            store(formData);
         } else {
            formData.append("_method", "PUT");
            edit(formData, id);
         }
      } else {
         formData.append("asset_type", "non-it");
         if (props.title === "add") {
            store(formData);
         } else {
            formData.append("_method", "PUT");
            edit(formData, id);
         }
      }
   };

   useEffect(() => {
      let mounted = true;
      if (mounted) {
         Promise.all([
            getAssetCategories(),
            getAssetLocations(),
            getEmployees(),
            getAssetCondition(),
            getAssetCost(),
            getVendor(),
            getAssetMasterIt(1),
            getAssetMasterIt(2),
            getAssetMasterIt(3),
            getAssetMasterIt(4),
            getAssetMasterIt(5),
            getAssetMasterIt(6),
         ]).then((res) => {
            if (props.data) {
               const data = props.data;
               //otomatic value
               setAutomatic(data);

               const asset_code = ConvertLabel(data);

               data.picture.length > 0 && setPictureFromApi(data);
               data.evidence.length > 0 && setEvidenceFromApi(data);
               getSubCategory(data.category.id).then((res) => {
                  if (props.type === "it") {
                     setForm({
                        ...form,

                        // asset information
                        asset_code: asset_code.join("/"),
                        category_id: data.category.id,
                        sub_category_id: data.sub_category.id,
                        asset_name: data.asset_name,
                        specification: data.specification,
                        capitalized: moment(data.capitalized).format("yyyy/MM/DD"),
                        sap_code: data.sap_code,

                        // asset holder
                        employee_id: data.employee.id,
                        department_id: data.department.id,
                        location_id: data.location.id,
                        condition_id: data.condition.id,
                        latitude: data.latitude === null ? "" : data.latitude,
                        longitude: data.longitude === null ? "" : data.longitude,

                        // depreciation asset
                        cost_id: data.cost.id,
                        acquisition_value: NumberFormat(data.acquisition_value),
                        depreciation_value: data.depreciation_value,
                        value_book: data.value_book,
                        depreciation: data.depreciation,

                        // Vendor information
                        vendor_id: data.vendor.id,

                        // Device information
                        device_id: data.device === null ? "" : data.device.id,
                        type: data.type === null ? "" : data.type,
                        brand_id: data.brand === null ? "" : data.brand.id,
                        monitor_inch: data.monitor_inch === null ? "" : data.monitor_inch,
                        model_brand: data.model_brand === null ? "" : data.model_brand,
                        mac_address: data.mac_address === null ? "" : data.mac_address,
                        warranty: data.warranty === null ? null : moment(data.warranty).format("yyyy/MM/DD"),
                        computer_name: data.computer_name === null ? "" : data.computer_name,

                        // Hardware
                        dlp: data.dlp === null ? "" : data.dlp,
                        soc: data.soc === null ? "" : data.soc,
                        snnbpc: data.snnbpc === null ? "" : data.snnbpc,
                        processor_id: data.processor === null ? "" : data.processor.id,
                        hardware: data.hardware === null ? "" : data.hardware,

                        //Sofware
                        os_id: data.os === null ? "" : data.os.id,
                        sn_windows: data.sn_windows === null ? "" : data.sn_windows,
                        office_id: data.office === null ? "" : data.office.id,
                        sn_office: data.sn_office === null ? "" : data.sn_office,
                        antivirus_id: data.antivirus === null ? "" : data.antivirus.id,

                        // information support
                        notes: data.notes === null ? "" : data.notes,
                     });
                  } else {
                     setForm({
                        ...form,

                        // asset information
                        asset_code: asset_code.join("/"),
                        category_id: data.category.id,
                        sub_category_id: data.sub_category.id,
                        asset_name: data.asset_name,
                        specification: data.specification,
                        capitalized: moment(data.capitalized).format("yyyy/MM/DD"),
                        sap_code: data.sap_code,

                        // asset holder
                        employee_id: data.employee.id,
                        department_id: data.department.id,
                        location_id: data.location.id,
                        condition_id: data.condition.id,
                        latitude: data.latitude === null ? "" : data.latitude,
                        longitude: data.longitude === null ? "" : data.longitude,

                        // depreciation asset
                        cost_id: data.cost.id,
                        acquisition_value: NumberFormat(data.acquisition_value),
                        depreciation_value: data.depreciation_value,
                        value_book: data.value_book,
                        depreciation: data.depreciation,

                        // Vendor information
                        vendor_id: data.vendor.id,

                        // information support
                        notes: data.notes === null ? "" : data.notes,
                     });
                  }
                  setIsComplete(true);
               });
            } else {
               setIsComplete(true);
            }
         });
      }

      return () => (mounted = false);
   }, [props]);

   return (
      <Box component="form" onSubmit={onSubmit}>
         <Grid container spacing={4}>
            {isComplete && (
               <>
                  {/* Print Label*/}
                  {props.detail && <DetailComponent data={props.data} />}

                  {/* Asset Information */}
                  <Grid item xs={12} md={12}>
                     <Card>
                        <CardContent>
                           <Typography>Asset Information</Typography>
                           <Grid container mt={2} spacing={2}>
                              <Grid item md={4} xs={12}>
                                 <TextField
                                    disabled
                                    onBlur={handleChange}
                                    onChange={handleChangeForBlurField}
                                    value={form.asset_code}
                                    name="asset_code"
                                    fullWidth
                                    label="Asset Code"
                                    required
                                    helperText={typeof errors?.asset_code !== "undefined" ? errors.asset_code[0] : ""}
                                    error={typeof errors?.asset_code !== "undefined" ? true : false}
                                 />
                              </Grid>
                              <Grid item md={4} xs={12}>
                                 <TextField
                                    name="category_id"
                                    value={form.category_id}
                                    disabled={props.detail || user.role === "Admin Department" ? true : false}
                                    onBlur={handleChange}
                                    onChange={handleChangeForBlurField}
                                    fullWidth
                                    label="Category Code"
                                    select
                                    required
                                    helperText={typeof errors?.category_id !== "undefined" ? errors.category_id[0] : ""}
                                    error={typeof errors?.category_id !== "undefined" ? true : false}
                                 >
                                    {assetCategories.length > 0 &&
                                       assetCategories.map((v) => {
                                          if(props.type === "it"){
                                             if(v.code === "ID08" || v.code === "ID03" || v.code === "ID11"){
                                                return <MenuItem key={v.id} value={v.id}>{`${v.code} - ${v.category}`}</MenuItem>
                                             }
                                          }else{
                                             return <MenuItem key={v.id} value={v.id}>{`${v.code} - ${v.category}`}</MenuItem>
                                          }
                                       })}
                                    {assetCategories.length == 0 && <MenuItem disabled>Kosong</MenuItem>}
                                 </TextField>
                              </Grid>
                              <Grid item md={4} xs={12}>
                                 <TextField
                                    name="sub_category_id"
                                    value={form.sub_category_id}
                                    disabled={props.detail || user.role === "Admin Department" ? true : false}
                                    onBlur={handleChange}
                                    onChange={handleChangeForBlurField}
                                    fullWidth
                                    label="Sub Category Code"
                                    select
                                    required
                                    helperText={typeof errors?.sub_category_id !== "undefined" ? errors.sub_category_id[0] : ""}
                                    error={typeof errors?.sub_category_id !== "undefined" ? true : false}
                                 >
                                    {subCategoriesLoading && (
                                       <MenuItem disabled>
                                          {" "}
                                          <Loading />{" "}
                                       </MenuItem>
                                    )}
                                    {subCategories.length > 0 &&
                                       subCategories.map((v) => (
                                          <MenuItem key={v.id} value={v.id}>
                                             {v.sub_category}
                                          </MenuItem>
                                       ))}
                                    {subCategories.length == 0 && !subCategoriesLoading && <MenuItem disabled>Kosong</MenuItem>}
                                 </TextField>
                              </Grid>
                              <Grid item md={4} xs={12}>
                                 <TextField
                                    disabled={props.detail || user.role === "Admin Department" ? true : false}
                                    onBlur={handleChange}
                                    onChange={handleChangeForBlurField}
                                    value={form.asset_name}
                                    name="asset_name"
                                    fullWidth
                                    label="Asset Name"
                                    required
                                    helperText={typeof errors?.asset_name !== "undefined" ? errors.asset_name[0] : ""}
                                    error={typeof errors?.asset_name !== "undefined" ? true : false}
                                 />
                              </Grid>
                              <Grid item md={4} xs={12}>
                                 <TextField
                                    disabled={props.detail || user.role === "Admin Department" ? true : false}
                                    onBlur={handleChange}
                                    onChange={handleChangeForBlurField}
                                    value={form.specification}
                                    name="specification"
                                    fullWidth
                                    label="Specification"
                                    required
                                    helperText={typeof errors?.specification !== "undefined" ? errors.specification[0] : ""}
                                    error={typeof errors?.specification !== "undefined" ? true : false}
                                 />
                              </Grid>
                              <Grid item md={4} xs={12}>
                                 <TextField value={useful} name="useful" fullWidth label="Useful Life" disabled />
                              </Grid>
                              <Grid item md={6} xs={12}>
                                 <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                       value={form.capitalized}
                                       name="capitalize"
                                       label="Capitalized On"
                                       inputFormat="yyyy/MM/dd"
                                       mask="____/__/__"
                                       disabled={props.detail || user.role === "Admin Department" ? true : false}
                                       onChange={(newValue) => {
                                          if(newValue){
                                             const splitCode = form.asset_code.split("/");
                                             splitCode[0] = newValue.toString().split(" ")[3];
                                             setForm({
                                                ...form,
                                                capitalized: newValue,
                                                asset_code: splitCode.join("/"),
                                             });
                                          }
                                       }}
                                       renderInput={(params) => (
                                          <TextField
                                             fullWidth
                                             {...params}
                                             required
                                             helperText={typeof errors?.capitalized !== "undefined" ? errors.capitalized[0] : ""}
                                             error={typeof errors?.capitalized !== "undefined" ? true : false}
                                          />
                                       )}
                                    />
                                 </LocalizationProvider>
                              </Grid>
                              <Grid item md={6} xs={12}>
                                 <TextField
                                    disabled={props.detail || user.role === "Admin Department" ? true : false}
                                    onBlur={handleChange}
                                    onChange={handleChangeForBlurField}
                                    value={form.sap_code}
                                    name="sap_code"
                                    fullWidth
                                    label="SAP Code"
                                    required
                                    helperText={typeof errors?.sap_code !== "undefined" ? errors.sap_code[0] : ""}
                                    error={typeof errors?.sap_code !== "undefined" ? true : false}
                                 />
                              </Grid>
                           </Grid>
                        </CardContent>
                     </Card>
                  </Grid>

                  {/* Asset Holder */}
                  <Grid item xs={12} md={12}>
                     <Card>
                        <CardContent>
                           <Typography>Asset Holder</Typography>
                           <Grid container mt={2} spacing={2}>
                              <Grid item md={6} xs={12}>
                                 <Autocomplete
                                    disabled={props.detail}
                                    freeSolo
                                    disableClearable
                                    options={employees}
                                    fullWidth
                                    getOptionLabel={(option) => {
                                       return `${option.code} - ${option.name}`;
                                    }}
                                    inputValue={paramsEmployee.search}
                                    onInputChange={(event, newInputValue, reason) => {
                                       setParamsEmploy({
                                          ...paramsEmployee,
                                          search: newInputValue,
                                       });
                                    }}
                                    onChange={(e, value) => {
                                       const splitCode = form.asset_code.split("/");
                                       splitCode[2] = value.location.code;
                                       setForm({
                                          ...form,
                                          employee_id: value.id,
                                          department_id: value.dept.id,
                                          location_id: value.location.id,
                                          asset_code: splitCode.join("/"),
                                       });
                                       setDepartment(value.dept.dept);
                                    }}
                                    renderInput={(params) => (
                                       <TextField
                                          {...params}
                                          label="Employ Name / PIC"
                                          InputProps={{
                                             ...params.InputProps,
                                             type: "search",
                                          }}
                                       />
                                    )}
                                 />
                              </Grid>
                              <Grid item md={6} xs={12}>
                                 <TextField value={department} name="department_id" fullWidth label="Department Using" disabled />
                              </Grid>
                              <Grid item md={6} xs={12}>
                                 <TextField
                                    name="location_id"
                                    fullWidth
                                    disabled
                                    onChange={handleChangeForBlurField}
                                    onBlur={handleChange}
                                    value={form.location_id}
                                    label="Asset Location"
                                    select
                                    required
                                    helperText={typeof errors?.location_id !== "undefined" ? errors.location_id[0] : ""}
                                    error={typeof errors?.location_id !== "undefined" ? true : false}
                                 >
                                    {assetLocations.length > 0 &&
                                       assetLocations.map((v) => <MenuItem key={v.id} value={v.id}>{`${v.code} - ${v.location}`}</MenuItem>)}
                                    {assetLocations.length == 0 && <MenuItem disabled>Kosong</MenuItem>}
                                 </TextField>
                              </Grid>
                              <Grid item md={6} xs={12}>
                                 <TextField
                                    disabled={props.detail}
                                    onBlur={handleChange}
                                    onChange={handleChangeForBlurField}
                                    value={form.condition_id}
                                    name="condition_id"
                                    fullWidth
                                    label="Asset Condition"
                                    select
                                    required
                                    helperText={typeof errors?.condition_id !== "undefined" ? errors.condition_id[0] : ""}
                                    error={typeof errors?.condition_id !== "undefined" ? true : false}
                                 >
                                    {assetConditions.length > 0 &&
                                       assetConditions.map((v) => (
                                          <MenuItem key={v.id} value={v.id}>
                                             {v.condition}
                                          </MenuItem>
                                       ))}
                                    {assetConditions.length == 0 && <MenuItem disabled>Kosong</MenuItem>}
                                 </TextField>
                              </Grid>
                              <Grid item md={6} xs={12}>
                                 <TextField
                                    value={form.latitude}
                                    disabled={props.detail || user.role === "Admin Department" ? true : false}
                                    onBlur={handleChange}
                                    onChange={handleChangeForBlurField}
                                    name="latitude"
                                    fullWidth
                                    label="Asset Coordinate Latitude"
                                    helperText={typeof errors?.latitude !== "undefined" ? errors.latitude[0] : ""}
                                    error={typeof errors?.latitude !== "undefined" ? true : false}
                                 />
                              </Grid>
                              <Grid item md={6} xs={12}>
                                 <TextField
                                    value={form.longitude}
                                    disabled={props.detail || user.role === "Admin Department" ? true : false}
                                    onBlur={handleChange}
                                    onChange={handleChangeForBlurField}
                                    name="longitude"
                                    fullWidth
                                    label="Asset Coordinate Longitude"
                                    helperText={typeof errors?.longitude !== "undefined" ? errors.longitude[0] : ""}
                                    error={typeof errors?.longitude !== "undefined" ? true : false}
                                 />
                              </Grid>
                           </Grid>
                        </CardContent>
                     </Card>
                  </Grid>

                  {!role.includes(user.role) && (
                     <>
                        {/* Depreciation Asset */}
                        <Grid item xs={12} md={12}>
                           <Card>
                              <CardContent>
                                 <Typography>Depreciation Asset</Typography>
                                 <Grid container mt={2} spacing={2}>
                                    <Grid item md={6} xs={12}>
                                       <TextField
                                          value={form.cost_id}
                                          disabled={props.detail}
                                          onBlur={handleChange}
                                          onChange={handleChangeForBlurField}
                                          name="cost_id"
                                          fullWidth
                                          label="Cost Center Name"
                                          select
                                          required
                                          helperText={typeof errors?.cost_id !== "undefined" ? errors.cost_id[0] : ""}
                                          error={typeof errors?.cost_id !== "undefined" ? true : false}
                                       >
                                          {assetCost.length > 0 && assetCost.map((v) => <MenuItem key={v.id} value={v.id}>{`${v.code} - ${v.name}`}</MenuItem>)}
                                          {assetCost.length == 0 && <MenuItem disabled>Kosong</MenuItem>}
                                       </TextField>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                       <TextField
                                          value={NumberFormat(form.acquisition_value, "Rp")}
                                          disabled={props.detail}
                                          onBlur={handleChange}
                                          onChange={handleChangeForBlurField}
                                          name="acquisition_value"
                                          fullWidth
                                          label="Acquisition Value"
                                          required
                                          helperText={typeof errors?.acquisition_value !== "undefined" ? errors.acquisition_value[0] : ""}
                                          error={typeof errors?.acquisition_value !== "undefined" ? true : false}
                                       />
                                    </Grid>
                                    <Grid item md={4} xs={12}>
                                       <FormControl>
                                          <FormLabel id="demo-row-radio-buttons-group-label">Calculate Asset Depreciation ? </FormLabel>
                                          <RadioGroup
                                             row
                                             aria-labelledby="demo-row-radio-buttons-group-label"
                                             name="depreciation"
                                             value={form.depreciation}
                                             disabled={props.detail}
                                             onChange={handleChange}
                                          >
                                             <FormControlLabel disabled={props.detail} value={"1"} control={<Radio />} label="Yes" />
                                             <FormControlLabel disabled={props.detail} value={"0"} control={<Radio />} label="No" />
                                          </RadioGroup>
                                       </FormControl>
                                    </Grid>
                                 </Grid>
                              </CardContent>
                           </Card>
                        </Grid>

                        {/* Vendor Information */}
                        <Grid item xs={12} md={12}>
                           <Card>
                              <CardContent>
                                 <Typography>Vendor Information</Typography>
                                 <Grid container mt={2} spacing={2}>
                                    <Grid item md={6} xs={12}>
                                    <Autocomplete
                                       disabled={props.detail || user.role === "Admin Department" ? true : false}
                                       freeSolo
                                       disableClearable
                                       options={assetVendor}
                                       fullWidth
                                       getOptionLabel={(option) => {
                                          return `${option.code} - ${option.name}`;
                                       }}
                                       inputValue={vendorParams.search}
                                       onInputChange={(event, newInputValue, reason) => {
                                          setVendorParams({
                                             ...vendorParams,
                                             search: newInputValue,
                                          });
                                       }}
                                       onChange={(e, value) => {
                                          setForm({
                                             ...form,
                                             vendor_id: value.id,
                                          });
                                          setVendor({
                                             vendor_address: value.address,
                                             contact: value.contact,
                                             pic_contact: value.pic_contact,
                                          });
                                       }}
                                       renderInput={(params) => (
                                          <TextField
                                             {...params}
                                             label="Vendor Name"
                                             InputProps={{
                                                ...params.InputProps,
                                                type: "search",
                                             }}
                                          />
                                       )}
                                    />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                       <TextField value={vendor.vendor_address} name="vendor_address" fullWidth label="Vendor Address" disabled />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                       <TextField value={vendor.pic_contact} name="pic_contact" fullWidth label="PIC Contact" disabled />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                       <TextField value={vendor.contact} name="contact" fullWidth label="Contact" disabled />
                                    </Grid>
                                 </Grid>
                              </CardContent>
                           </Card>
                        </Grid>

                        {props.type === "it" && (
                           <>
                              {/* Device Information */}
                              <Grid item xs={12} md={12}>
                                 <Card>
                                    <CardContent>
                                       <Typography>Device Information</Typography>
                                       <Grid container mt={2} spacing={2}>
                                          <Grid item md={4} xs={12}>
                                             <TextField
                                                disabled={props.detail}
                                                onChange={handleChange}
                                                value={form.device_id}
                                                name="device_id"
                                                fullWidth
                                                label="Device"
                                                select
                                                helperText={typeof errors?.device_id !== "undefined" ? errors.device_id[0] : ""}
                                                error={typeof errors?.device_id !== "undefined" ? true : false}
                                             >
                                                {masterDevices.length > 0 &&
                                                   masterDevices.map((v) => (
                                                      <MenuItem key={v.id} value={v.id}>
                                                         {v.sub_type}
                                                      </MenuItem>
                                                   ))}
                                                {masterDevices.length == 0 && <MenuItem disabled>Kosong</MenuItem>}
                                             </TextField>
                                          </Grid>
                                          <Grid item md={4} xs={12}>
                                             <TextField
                                                disabled={props.detail}
                                                onChange={handleChange}
                                                value={form.type}
                                                name="type"
                                                fullWidth
                                                label="Type"
                                                helperText={typeof errors?.type !== "undefined" ? errors.type[0] : ""}
                                                error={typeof errors?.type !== "undefined" ? true : false}
                                             />
                                          </Grid>
                                          <Grid item md={4} xs={12}>
                                             <TextField
                                                disabled={props.detail}
                                                onChange={handleChange}
                                                value={form.brand_id}
                                                name="brand_id"
                                                fullWidth
                                                label="Brand"
                                                select
                                                helperText={typeof errors?.brand_id !== "undefined" ? errors.brand_id[0] : ""}
                                                error={typeof errors?.brand_id !== "undefined" ? true : false}
                                             >
                                                {masterBrands.length > 0 &&
                                                   masterBrands.map((v) => (
                                                      <MenuItem key={v.id} value={v.id}>
                                                         {v.sub_type}
                                                      </MenuItem>
                                                   ))}
                                                {masterBrands.length == 0 && <MenuItem disabled>Kosong</MenuItem>}
                                             </TextField>
                                          </Grid>
                                          <Grid item md={4} xs={12}>
                                             <TextField
                                                disabled={props.detail}
                                                onChange={handleChange}
                                                value={form.monitor_inch}
                                                name="monitor_inch"
                                                fullWidth
                                                label="Monitor Inch"
                                                helperText={typeof errors?.monitor_inch !== "undefined" ? errors.monitor_inch[0] : ""}
                                                error={typeof errors?.monitor_inch !== "undefined" ? true : false}
                                             />
                                          </Grid>
                                          <Grid item md={4} xs={12}>
                                             <TextField
                                                disabled={props.detail}
                                                onChange={handleChange}
                                                value={form.model_brand}
                                                name="model_brand"
                                                fullWidth
                                                label="Model Brand"
                                                helperText={typeof errors?.model_brand !== "undefined" ? errors.model_brand[0] : ""}
                                                error={typeof errors?.model_brand !== "undefined" ? true : false}
                                             />
                                          </Grid>
                                          <Grid item md={4} xs={12}>
                                             <TextField
                                                disabled={props.detail}
                                                onChange={handleChange}
                                                value={form.mac_address}
                                                name="mac_address"
                                                fullWidth
                                                label="Mac Address"
                                                helperText={typeof errors?.mac_address !== "undefined" ? errors.mac_address[0] : ""}
                                                error={typeof errors?.mac_address !== "undefined" ? true : false}
                                             />
                                          </Grid>
                                          <Grid item md={6} xs={12}>
                                             <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                   value={form.warranty}
                                                   name="warranty"
                                                   label="Warranty Expiry"
                                                   inputFormat="yyyy/MM/dd"
                                                   mask="____/__/__"
                                                   disabled={props.detail}
                                                   onChange={(newValue) => {
                                                      setForm({
                                                         ...form,
                                                         warranty: newValue,
                                                      });
                                                   }}
                                                   renderInput={(params) => (
                                                      <TextField
                                                         helperText={typeof errors?.warranty !== "undefined" ? errors.warranty[0] : ""}
                                                         error={typeof errors?.warranty !== "undefined" ? true : false}
                                                         fullWidth
                                                         {...params}
                                                      />
                                                   )}
                                                />
                                             </LocalizationProvider>
                                          </Grid>
                                          <Grid item md={6} xs={12}>
                                             <TextField
                                                disabled={props.detail}
                                                onChange={handleChange}
                                                value={form.computer_name}
                                                name="computer_name"
                                                fullWidth
                                                label="Computer Name"
                                                helperText={typeof errors?.computer_name !== "undefined" ? errors.computer_name[0] : ""}
                                                error={typeof errors?.computer_name !== "undefined" ? true : false}
                                             />
                                          </Grid>
                                       </Grid>
                                    </CardContent>
                                 </Card>
                              </Grid>

                              {/* Hardware */}
                              <Grid item xs={12} md={12}>
                                 <Card>
                                    <CardContent>
                                       <Typography>Hardware</Typography>
                                       <Grid container mt={2} spacing={2}>
                                          <Grid item md={4} xs={12}>
                                             <TextField disabled={props.detail} onChange={handleChange} value={form.dlp} name="dlp" fullWidth label="DLP" />
                                          </Grid>
                                          <Grid item md={4} xs={12}>
                                             <TextField disabled={props.detail} onChange={handleChange} value={form.soc} name="soc" fullWidth label="SOC" />
                                          </Grid>
                                          <Grid item md={4} xs={12}>
                                             <TextField
                                                disabled={props.detail}
                                                onChange={handleChange}
                                                value={form.snnbpc}
                                                name="snnbpc"
                                                fullWidth
                                                label="Serial Number"
                                             />
                                          </Grid>
                                          <Grid item md={12} xs={12}>
                                             <TextField
                                                disabled={props.detail}
                                                onChange={handleChange}
                                                value={form.processor_id}
                                                name="processor_id"
                                                fullWidth
                                                label="Processor"
                                                select
                                             >
                                                {masterProcessors.length > 0 &&
                                                   masterProcessors.map((v) => (
                                                      <MenuItem key={v.id} value={v.id}>
                                                         {v.sub_type}
                                                      </MenuItem>
                                                   ))}
                                                {masterProcessors.length == 0 && <MenuItem disabled>Kosong</MenuItem>}
                                             </TextField>
                                          </Grid>
                                         
                                       </Grid>
                                    </CardContent>
                                 </Card>
                              </Grid>

                              {/* Software */}
                              <Grid item xs={12} md={12}>
                                 <Card>
                                    <CardContent>
                                       <Typography>Software</Typography>
                                       <Grid container mt={2} spacing={2}>
                                          <Grid item md={6} xs={12}>
                                             <TextField
                                                disabled={props.detail}
                                                onChange={handleChange}
                                                value={form.os_id}
                                                name="os_id"
                                                fullWidth
                                                label="OS"
                                                select
                                             >
                                                {masterWindowOS.length > 0 &&
                                                   masterWindowOS.map((v) => (
                                                      <MenuItem key={v.id} value={v.id}>
                                                         {v.sub_type}
                                                      </MenuItem>
                                                   ))}
                                                {masterWindowOS.length == 0 && <MenuItem disabled>Kosong</MenuItem>}
                                             </TextField>
                                          </Grid>
                                          <Grid item md={6} xs={12}>
                                             <TextField
                                                disabled={props.detail}
                                                onChange={handleChange}
                                                value={form.sn_windows}
                                                name="sn_windows"
                                                fullWidth
                                                label="SN Windows"
                                             />
                                          </Grid>
                                          <Grid item md={4} xs={12}>
                                             <TextField
                                                disabled={props.detail}
                                                onChange={handleChange}
                                                value={form.office_id}
                                                name="office_id"
                                                fullWidth
                                                label="MS Office"
                                                select
                                             >
                                                {masterOffices.length > 0 &&
                                                   masterOffices.map((v) => (
                                                      <MenuItem key={v.id} value={v.id}>
                                                         {v.sub_type}
                                                      </MenuItem>
                                                   ))}
                                                {masterOffices.length == 0 && <MenuItem disabled>Kosong</MenuItem>}
                                             </TextField>
                                          </Grid>
                                          <Grid item md={4} xs={12}>
                                             <TextField
                                                disabled={props.detail}
                                                onChange={handleChange}
                                                value={form.sn_office}
                                                name="sn_office"
                                                fullWidth
                                                label="SN Office"
                                             />
                                          </Grid>
                                          <Grid item md={4} xs={12}>
                                             <TextField
                                                disabled={props.detail}
                                                onChange={handleChange}
                                                value={form.antivirus_id}
                                                name="antivirus_id"
                                                fullWidth
                                                label="Anti Virus"
                                                select
                                             >
                                                {masterAntiVirus.length > 0 &&
                                                   masterAntiVirus.map((v) => (
                                                      <MenuItem key={v.id} value={v.id}>
                                                         {v.sub_type}
                                                      </MenuItem>
                                                   ))}
                                                {masterAntiVirus.length == 0 && <MenuItem disabled>Kosong</MenuItem>}
                                             </TextField>
                                          </Grid>
                                       </Grid>
                                    </CardContent>
                                 </Card>
                              </Grid>
                           </>
                        )}
                     </>
                  )}

                  {/* Information Support */}
                  <Grid item xs={12} md={12}>
                     <Card>
                        <CardContent>
                           <Typography>Information Support</Typography>
                           <Grid container mt={2} spacing={2}>
                              <Grid item md={12} xs={12}>
                                 <TextField
                                    disabled={props.detail || user.role === "Admin Department" ? true : false}
                                    onChange={handleChange}
                                    value={form.notes}
                                    name="notes"
                                    fullWidth
                                    label="Notes"
                                    multiline
                                    rows={5}
                                    helperText={typeof errors?.notes !== "undefined" ? errors.notes[0] : ""}
                                    error={typeof errors?.notes !== "undefined" ? true : false}
                                 />
                              </Grid>
                              
                              {user.role === "Admin Department" &&
                              // {/* image for admin department */}
                              <Grid item md={12} xs={12}>
                                 <Typography>Picture </Typography>
                                 <Grid container>
                                    {pictures.map((v, i) => {
                                       return (
                                          <Grid key={i} item xs={6} md={4}>
                                             <Stack spacing={2} alignItems="center">
                                                <Box component="label" sx={{ mt: { xs: 2 }, cursor: "pointer", display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} htmlFor={`img-${i}`}>
                                                   {v.image_preview == "" ? (
                                                      <InsertPhotoOutlined sx={{ fontSize: "100px" }} />
                                                   ) : (
                                                      <img src={v.image_preview} style={{ width: '150px', height: '150px', objecFit: 'cover', objectPosition: 'center' }} />
                                                   )}
                                                   {v.image_preview !== "undefined" && (
                                                      <Typography>{v.image_name}</Typography>
                                                   )}
                                                   {errors !== undefined && typeof errors[`picture.${i}.file`] !== "undefined" && (
                                                      <Typography sx={{ color: "red" }}>Image Required </Typography>
                                                   )}
                                                </Box>
                                                <input
                                                   disabled={props.detail}
                                                   type="file"
                                                   style={{ display: "none" }}
                                                   id={`img-${i}`}
                                                   accept="image/*"
                                                   onChange={(e) => {
                                                      let image_file = e.target.files[0];
                                                      let image_preview = URL.createObjectURL(e.target.files[0]);
                                                      let image_name = image_file.name
                                                      setPictures((currentAnswers) =>
                                                         produce(currentAnswers, (v) => {
                                                            v[i] = {
                                                               id: "",
                                                               image_file,
                                                               image_preview,
                                                               image_name,
                                                            };
                                                         })
                                                      );
                                                   }}
                                                />
                                                {!props.detail && 
                                                <Chip 
                                                   label="Take Photo"
                                                   onClick={() => handleOpenCamera2(i)}
                                                />
                                                }
                                                <Stack  direction="row" justifyContent={"center"} alignContent="center">
                                                   {v.image_preview !== "" && 
                                                      <a target="_blank" href={v.image_preview} style={{ cursor: "pointer" }}>
                                                         <Download sx={{ fontSize: "10x", marginTop: "1px", marginRight: "3px" }} />
                                                      </a>
                                                   }
                                                   {pictures.length > 1 && (
                                                      <Chip
                                                         disabled={props.detail}
                                                         color="error"
                                                         label="delete"
                                                         onClick={() => {
                                                            setPictures((currentAnswers) => currentAnswers.filter((v, x) => x !== i));
                                                         }}
                                                      />
                                                   )}
                                                </Stack>
                                             </Stack>
                                          </Grid>
                                       );
                                    })}
                                    <Grid item md={12} xs={12}>
                                       <Chip
                                          disabled={props.detail}
                                          color="primary"
                                          sx={{ width: { xs: "100%", md: "auto" }, mt: { xs: 2, md: 5 } }}
                                          label="Tambah Image"
                                          onClick={() => {
                                             setPictures((currentAnswers) => [
                                                ...currentAnswers,
                                                {
                                                   id: "",
                                                   image_file: "",
                                                   image_preview: "",
                                                },
                                             ]);
                                          }}
                                       />
                                    </Grid>
                                    {!props.detail && 
                                    <Grid item md={12} xs={12}>
                                       <ModalCamera2
                                          open={cameraOpen2} 
                                          handleClose={handleCamera2} 
                                          cameraIndex={cameraIndex2} 
                                          setPictures={setPictures} 
                                       />
                                    </Grid>
                                    }
                                 </Grid>
                              </Grid>
                              }

                              {props.detail && user.role !== "Admin Department" && pictures[0].image_preview !== "" &&
                              // {/* image just for view */}
                              <Grid item md={12} xs={12}>
                                 <Typography>Picture </Typography>
                                 <Grid container>
                                    {pictures.map((v, i) => {
                                       return (
                                          <Grid key={i} item xs={6} md={4}>
                                             <Stack spacing={2} alignItems="center">
                                                <Box component="label" sx={{ mt: { xs: 2 }, cursor: "pointer", display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} htmlFor={`img-${i}`}>
                                                   {v.image_preview !== "" &&
                                                      <img src={v.image_preview} style={{ width: '150px', height: '150px', objecFit: 'cover', objectPosition: 'center' }} />
                                                   }
                                                   {v.image_preview !== "undefined" && (
                                                      <Typography>{v.image_name}</Typography>
                                                   )}
                                                </Box>
                                                <Stack  direction="row" justifyContent={"center"} alignContent="center">
                                                   {v.image_preview !== "" && 
                                                      <a target="_blank" href={v.image_preview} style={{ cursor: "pointer" }}>
                                                         <Download sx={{ fontSize: "10x", marginTop: "1px", marginRight: "3px" }} />
                                                      </a>
                                                   }
                                                </Stack>
                                             </Stack>
                                          </Grid>
                                       );
                                    })}
                                 </Grid>
                              </Grid>
                              }

                              {/* Upload Image and Attachment */}
                              <Grid item md={12} xs={12}>
                                 <Typography>Upload Image & Attachment</Typography>
                                 <Grid container>
                                    {evidences.map((v, i) => {
                                       return (
                                          <Grid key={i} item xs={6} md={4}>
                                             <Stack spacing={2} alignItems="center">
                                                <Box component="label" sx={{ mt: { xs: 2 }, cursor: "pointer", display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} htmlFor={`ev-${i}`}>
                                                   {v.file_url == "" ? (
                                                      <DescriptionOutlined sx={{ fontSize: "100px" }} />
                                                   ) : (
                                                      <AssignmentTurnedInOutlined sx={{ fontSize: "100px" }} />
                                                   )}
                                                   { v.file_url !== "undefined" && (
                                                      <Typography>{v.file_name}</Typography>
                                                   )}
                                                   {errors !== undefined && typeof errors[`evidence.${i}.file`] !== "undefined" && (
                                                      <Typography sx={{ color: 'red' }}>Evidence/Image Required</Typography>
                                                   )}
                                                </Box>
                                                <input
                                                   type="file"
                                                   disabled={props.detail || user.role === "Admin Department" ? true : false}
                                                   style={{ display: "none" }}
                                                   id={`ev-${i}`}
                                                   accept="image/*,.pdf"
                                                   onChange={(e) => {
                                                      let file = e.target.files[0];
                                                      let file_url = URL.createObjectURL(file)
                                                      let file_name = file.name
                                                      setEvidences((currentAnswers) =>
                                                         produce(currentAnswers, (v) => {
                                                            v[i] = {
                                                               id: "",
                                                               file,
                                                               file_url,
                                                               file_name,
                                                            };
                                                         })
                                                      );
                                                   }}
                                                />
                                                {user.role !== "employee" && user.role !== "Admin Department" && !props.detail &&
                                                <Chip 
                                                   label="Take Photo"
                                                   onClick={() => handleOpenCamera(i)}
                                                />
                                                }
                                                <Stack direction="row" justifyContent={"center"} alignContent="center">
                                                   {user.role !== "Admin Department" && user.role !== "Employee" && v.file_url !== "" && 
                                                      <a target="_blank" href={v.file_url} style={{ cursor: "pointer" }}>
                                                         <Download sx={{ fontSize: "10x", marginTop: "1px", marginRight: "3px" }} />
                                                      </a>
                                                   }

                                                   {evidences.length > 1 && (
                                                      <Chip
                                                         disabled={props.detail || user.role === "Admin Department" ? true : false}
                                                         color="error"
                                                         label="delete"
                                                         onClick={() => {
                                                            setEvidences((currentAnswers) => currentAnswers.filter((v, x) => x !== i));
                                                         }}
                                                      />
                                                   )}
                                                </Stack>
                                                
                                             </Stack>
                                          </Grid>
                                       );
                                    })}
                                    <Grid item md={12} xs={12}>
                                       <Chip
                                          disabled={props.detail || user.role === "Admin Department" ? true : false}
                                          color="primary"
                                          sx={{ width: { xs: "100%", md: "auto" }, mt: { xs: 2, md: 5 } }}
                                          label="Tambah Document"
                                          onClick={() => {
                                             setEvidences((currentAnswers) => [
                                                ...currentAnswers,
                                                {
                                                   id: "",
                                                   file: "",
                                                   file_url: "",
                                                   file_name: "",
                                                },
                                             ]);
                                          }}
                                       />
                                    </Grid>
                                    {!props.detail && 
                                    <Grid item md={12} xs={12}>
                                       <ModalCamera 
                                          open={cameraOpen} 
                                          handleClose={handleCamera} 
                                          cameraIndex={cameraIndex} 
                                          setEvidences={setEvidences} 
                                       />
                                    </Grid>
                                    }
                                 </Grid>
                              </Grid>
                           </Grid>
                        </CardContent>
                     </Card>
                  </Grid>

                  {/* Button */}
                  {!props.detail && (
                     <Grid item xs={12} md={12}>
                        <Card>
                           <CardContent>
                              <LoadingButton
                                 sx={{ display: "flex", mt: 2, borderRadius: 25, mx: "auto", width: "50%" }}
                                 type="button"
                                 onClick={handleModal}
                                 variant="contained"
                              >
                                 {props.title !== "add" ? "Save" : "Create"}
                              </LoadingButton>

                              <SuccessModal
                                 loading={loading}
                                 title={props.title !== "add" ? "Save" : "Create"}
                                 open={open}
                                 handleClose={handleClose}
                                 onSubmit={onSubmit}
                              />

                              {detailModalData !== undefined && (
                                 <DetailModal handleClose={handleDetailClose} title={props.title} open={detailModal} data={detailModalData} />
                              )}
                           </CardContent>
                        </Card>
                     </Grid>
                  )}

                  {props.detail && user.role !== "Employee" && (
                     <Grid item xs={12} md={12}>
                        <Card>
                           <CardContent>
                              <TabsComponent id={props.data.id} />
                           </CardContent>
                        </Card>
                     </Grid>
                  )}
               </>
            )}

            {!isComplete && (
               <Grid item xs={12} md={12}>
                  <Loading />
               </Grid>
            )}

            {/* close Grid Container */}
         </Grid>
      </Box>
   );
};

export default Form;

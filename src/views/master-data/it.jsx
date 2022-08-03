import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Stack, TablePagination, Link } from "@mui/material";
import { FileDownload, FileUpload } from "@mui/icons-material";

import { Link as RouterLink } from "react-router-dom";
import http from "../../component/api/Api";
import Loading from "../../component/Loading";

export default function AssetCategory() {
   const [rows, setRows] = useState();
   const getData = async () => {
      http
         .get(`/master_it`)
         .then((res) => {
            // console.log(res.data.data);
            setRows(res.data.data);
         })
         .catch((err) => {
            // console.log(err.response);
         });
   };

   useEffect(() => {
      getData();
   }, []);

   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(5);
   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
   };

   return (
      <div className="main-content mb-5">
         <div className="page-content">
            <div className="container">
               <div className="d-flex align-items-center justify-content-between mt-2 mb-4">
                  <h3 className="fw-bold mb-0">Master IT</h3>
                  <Stack direction="row" spacing={1}>
                     <Button variant="contained" startIcon={<FileDownload />}>
                        Import
                     </Button>
                     <Button variant="contained" startIcon={<FileUpload />}>
                        Export
                     </Button>
                  </Stack>
               </div>
               <Card>
                  <CardContent>
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
                                 <TableCell>Type</TableCell>
                              </TableRow>
                           </TableHead>
                           <TableBody>
                              {rows !== undefined ? (
                                 rows.length > 0 ? (
                                    rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((value, key) => (
                                       <TableRow key={key}>
                                          <TableCell component="th" scope="row" align="center">
                                             {page * rowsPerPage + key + 1}.
                                          </TableCell>
                                          <TableCell>
                                             <Link component={RouterLink} to={`/master-data/it-subtype/${value.id}`}>
                                                {value.type}
                                             </Link>
                                          </TableCell>
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
                     {rows !== undefined && rows.length > 0 && (
                        <TablePagination
                           rowsPerPageOptions={[5, 10, 25]}
                           component="div"
                           count={rows.length}
                           page={page}
                           rowsPerPage={rowsPerPage}
                           onPageChange={handleChangePage}
                           onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                     )}
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
   );
}

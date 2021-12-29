import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";

import Button from "@mui/material/Button";
import "../Navbar/navbar.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

import Stack from "@mui/material/Stack";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import DateTimePicker from "@mui/lab/DateTimePicker";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import MobileDatePicker from "@mui/lab/MobileDatePicker";

import {Link} from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Student = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [formData, setFormData] = useState({});
  const [allData, setData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    //   setFormData({...formData, id : id})
  };

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [tpage, setTPage] = useState(1);

  const handleChangePage = async (event, newPage) => {
    setPage(newPage);
    const { data } = await axios.get(
      `http://localhost:2233/student?size=6&page=${page}`
    );
    setData(data.student);
    setTPage(data.totalpage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 0));
    setPage(1);
  };

  const handleDelete = async (id) => {
    const { data } = await axios.delete(`http://localhost:2233/student/${id}`);
    console.log(data.student);
    setData(data.student);
  };

  const handleSubmit = async () => {
    const c = await axios.post("http://localhost:2233/student", formData);
    const { data } = await axios.get(`http://localhost:2233/student`);

    setData(data.student);
  };
  const handleName = async () => {
    const { data } = await axios.get(
      "http://localhost:2233/student/sortByname"
    );
    setData(data.student);
  };
  const handleAge = async () => {
    const { data } = await axios.get("http://localhost:2233/student/sortByAge");
    setData(data.student);
  };

  const fetchData = async () => {
    const { data } = await axios.get(
      `http://localhost:2233/student?page=${page}&size=6`
    );
    console.log(data.student);
    setData(data.student);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [O, setO] = useState(false);
  const handleO = () => setO(true);
  const handleC = () => setO(false);
  const [contest, setContest] = useState({});
  const [value, setValue] = React.useState(new Date("2014-08-18T21:11:54"));

  const handleChangeContest = (e) => {
    const { name, value } = e.target;
    setContest({ ...contest, [name]: value });
  };
  console.log(contest);

  const handleContest = async () => {
    const { data } = await axios.post("http://localhost:2233/contest", contest);
  };

  return (
    <>
      <div className="navbarContainer">
        <Link to = "/">
          <Button variant = "contained" color = "success">Home page</Button>
        </Link>
        <div className="buttonContainer">
          <Button
            sx={{ ml: 3 }}
            color="success"
            onClick={handleName}
            variant="contained"
          >
            SORT BY NAME
          </Button>
          <Button
            sx={{ ml: 3 }}
            color="info"
            onClick={handleAge}
            variant="contained"
          >
            SORT BY AGE
          </Button>
          <Button sx={{ ml: 3 }} onClick={handleOpen} variant="contained">
            ADD NEW Student
          </Button>
          <Button sx={{ ml: 3 }} onClick={handleO} variant="contained">
            ADD NEW Contest
          </Button>
        </div>

        {/* contest modal */}
        <Modal
          open={O}
          onClose={handleC}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <TextField
              sx={{ p: 2, width: 400 }}
              required
              name="title"
              onChange={(e) => {
                handleChangeContest(e);
              }}
              id="outlined-required"
              label="Title"
              defaultValue=""
            />
            <TextField
              sx={{ p: 2, width: 400 }}
              name="type"
              onChange={(e) => {
                handleChangeContest(e);
              }}
              required
              id="outlined-required"
              label="type"
              defaultValue=""
            />
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
                label="deadline"
                name = "deadline"
                sx={{ p: 2, width: 400 }}
                value={value}
                onChange={(e) => {
                    handleChangeContest(e);
                }}
                renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider> */}
            <TextField
              sx={{ p: 2, width: 400 }}
              name="tags"
              onChange={(e) => {
                handleChangeContest(e);
              }}
              required
              id="outlined-required"
              label="tags"
              defaultValue=""
            />

            <TextField
              sx={{ p: 2, width: 400 }}
              name="time"
              onChange={(e) => {
                handleChangeContest(e);
              }}
              id="outlined-number"
              label="time"
              
            />
            <Button onClick={handleContest} variant="contained">
              Click to Add
            </Button>
          </Box>
        </Modal>

        {/* student modal */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <TextField
              sx={{ p: 2, width: 400 }}
              required
              name="name"
              onChange={(e) => {
                handleChange(e);
              }}
              id="outlined-required"
              label="name"
              defaultValue="Name"
            />
            <TextField
              sx={{ p: 2, width: 400 }}
              name="city"
              onChange={(e) => {
                handleChange(e);
              }}
              required
              id="outlined-required"
              label="City"
              defaultValue="City"
            />
            <TextField
              sx={{ p: 2, width: 400 }}
              name="age"
              onChange={(e) => {
                handleChange(e);
              }}
              id="outlined-number"
              label="age"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              sx={{ p: 2, width: 400 }}
              name="education"
              onChange={(e) => {
                handleChange(e);
              }}
              required
              id="outlined-required"
              label="eduucation"
              defaultValue="education"
            />
            <TextField
              sx={{ p: 2, width: 400 }}
              name="gender"
              onChange={(e) => {
                handleChange(e);
              }}
              required
              id="outlined-required"
              label="gender"
              defaultValue="male"
            />
            <TextField
              sx={{ p: 2, width: 400 }}
              name="contact"
              onChange={(e) => {
                handleChange(e);
              }}
              id="outlined-number"
              label="Contact"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button onClick={handleSubmit} variant="contained">
              Click to Add
            </Button>
          </Box>
        </Modal>
      </div>

      <div style={{ height: 300, width: "100%" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>NAME</StyledTableCell>
                <StyledTableCell align="right">City</StyledTableCell>
                <StyledTableCell align="right">AGE</StyledTableCell>
                <StyledTableCell align="right">EDUCATION</StyledTableCell>
                <StyledTableCell align="right">CONTACT</StyledTableCell>
                <StyledTableCell align="right">DELETE</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allData.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.city}</StyledTableCell>
                  <StyledTableCell align="right">{row.age}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.education}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.contact}</StyledTableCell>

                  <StyledTableCell align="right">
                    <Button
                      onClick={() => {
                        handleDelete(row._id);
                      }}
                      variant="contained"
                    >
                      delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={tpage}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>
    </>
  );
};

export { Student };

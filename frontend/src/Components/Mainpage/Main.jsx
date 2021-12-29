
import "./main.css";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import {useState, useEffect} from "react";





import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Avatar from '@mui/material/Avatar';




import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';












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





const Main = () => {

    const [allData, setData] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [page, setPage] = useState(1);
    const [auth, setAuth] = useState({
      isAdmin : false,
      user : ""
    })
    const dsa = async () => {
        let {data} = await axios.get(`http://localhost:2233/contest?size=5&page=${page}`);
        const d = data.contest.filter((e) => {
            if(e.type === "dsa") {
                return e
            }
        })
         setData(d);
         setTotalPage(data.totalPage);

    }
    const coding = async () => {
        let {data} = await axios.get(`http://localhost:2233/contest?size=5&page=${page}`);
        const d = data.contest.filter((e) => {
            if(e.type === "coding") {
                return e;
            }
        })
        setData(d);
        setTotalPage(data.totalPage);

    }

    const fetchData = async () => {
        let {data} = await axios.get(`http://localhost:2233/contest?size=5&page=${page}`);
        console.log(data.contest);
        setData(data.contest);
        setTotalPage(data.totalPage);
    }
    const fetchLogin = async () => {
      let {data} = await axios.get("http://localhost:2233/profile", {withCredentials: true})
      if(data) {
        setAuth({isAdmin: true, user : data.user.picture});
      }
      console.log(data);
      
    }

    useEffect(() => {
        fetchData();
        fetchLogin();

    }, [])

    const handleLogin =  () => {
      window.location.href = "http://localhost:2233/auth/google"
    }


    return (
        <div className = "navbarContainer">
            <div className="buttonContainer">
            <Stack direction="row" spacing={2}>
              {
                auth.isAdmin? (<Link to = "/admin">
                <Button sx={{ ml: 3 }}  variant="contained">
                  Admin panel
                </Button>
                </Link>): ("")
              }
         
          <Button onClick = {dsa} sx = {{ml : 3}} variant = "contained">
              DSA filter
          </Button>
          <Button onClick = {coding} sx = {{ml : 3}} variant = "contained">
              Coding Filter
          </Button>
          <Button onClick = {fetchData} sx = {{ml : 3}} variant = "contained">
              All
          </Button>
          {
            auth.isAdmin? (<Avatar
              alt="Remy Sharp"
              src={auth.user}
              sx={{ width: 30, height: 30 }}
            />) : (
              <Button onClick = {handleLogin} sx = {{ml : 3}} variant = "contained">
                  Login
              </Button>
            )
          }
          </Stack>
        </div>
        <div style={{ height: 300, width: "100%" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell align="right">Type</StyledTableCell>
                <StyledTableCell align="right">Tags</StyledTableCell>
                <StyledTableCell align="right">Time</StyledTableCell>
                <StyledTableCell align="right">Deadline</StyledTableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {allData.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.title}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.type}</StyledTableCell>
                  <StyledTableCell align="right">{row.tags}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.time}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.deadline}</StyledTableCell>

                  
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          
          </TableContainer>
          <Stack spacing={2}>
            
            <Pagination onChange = {(e) => {
                setPage(page + 1);
                fetchData();
            }} page = {page} sx = {{ml : 120, mt : 2}} count={totalPage} variant="outlined" shape="rounded" />
            </Stack>
      </div>
    </div>
    )
}


export {Main};
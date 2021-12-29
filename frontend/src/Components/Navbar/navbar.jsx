import Button from '@mui/material/Button';
import "./navbar.css";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import {useState} from "react";
import axios from "axios";




const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };









const Navbar = () => {

    const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [ida, setId] = useState(1);
  const [formData, setFormData] = useState({id : ida + 1})
    
    
  const handleChange = (e) => {
      const {name, value} = e.target;
      setFormData({...formData, [name] : value})
    //   setFormData({...formData, id : id})
  }
  console.log(formData);

const handleSubmit = async () => {
    setId(ida + 1);
   const c = await axios.post("http://localhost:2233/student", formData);
   console.log(c);
}

    return (
        <div className = "navbarContainer">
            <div className = "buttonContainer">
                <Button onClick = {handleOpen} variant = "contained">ADD NEW Student</Button>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <TextField
                    sx = {{p:2, width: 400}}
                    required
                    name = "name"
                    onChange = {(e) => {
                        handleChange(e)
                    }}
                    id="outlined-required"
                    label="name"
                    defaultValue="Name"
                    />
                     <TextField
                     sx = {{p:2, width: 400}}
                     name = "city"
                     onChange = {(e) => {
                         handleChange(e)
                     }}
                    required
                    id="outlined-required"
                    label="City"
                    defaultValue="City"
                    />
                    <TextField
                    sx = {{p:2, width: 400}}
                    name = "age"
                    onChange = {(e) => {
                        handleChange(e)
                    }}
                        id="outlined-number"
                        label="age"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />
                         <TextField
                         sx = {{p:2, width: 400}}
                         name = "education"
                         onChange = {(e) => {
                             handleChange(e)
                         }}
                    required
                    id="outlined-required"
                    label="eduucation"
                    defaultValue="education"
                    />
                     <TextField
                     sx = {{p:2, width: 400}}
                     name = "gender"
                     onChange = {(e) => {
                         handleChange(e)
                     }}
                    required
                    id="outlined-required"
                    label="gender"
                    defaultValue="male"
                    />
                     <TextField
                     sx = {{p:2, width: 400}}
                     name = "contact"
                     onChange = {(e) => {
                         handleChange(e)
                     }}
                        id="outlined-number"
                        label="Contact"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />
                    <Button onClick = {handleSubmit} variant = "contained">Click to Add</Button>
                </Box>
            </Modal>
        </div>
    )
}

export {Navbar};
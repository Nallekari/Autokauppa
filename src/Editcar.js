import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { PropertyKeys } from 'ag-grid-community';




export default function Editcar(props) {
    
    const [open, setOpen] = React.useState(false);
    const [car, setCar] = useState({ brand: '', model: '', color: '', fuel: '', year: '', price: '' });

    const handleClickOpen = () => {
        console.log(props)
        setOpen(true);
        setCar({brand: props.data.brand, model: props.data.model, color: props.data.color, fuel: props.data.fuel, year: props.data.year, price:props.data.price })

    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleInputChange = (event) => {
        setCar({...car, [event.target.name]: event.target.value})

    }

    const updateCar = () => {
        props.colDef.updateCar.updateCar(car, props.data._links.car.href);
        handleClose();
        setCar({ brand: '', model: '', color: '', fuel: '', year: '', price: '' });
    }

    return (
    <div>
        <Button variant="contained" color="success" size='small' onClick={handleClickOpen}>Edit</Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle id="form-dialog-title">Edit Car</DialogTitle>
            <DialogContent>
            <TextField autoFocus margin="dense" name="brand" value={car.brand} onChange={e => handleInputChange(e)} label="Brand" fullWidth/>
            <TextField margin="dense" name="model" value={car.model} onChange={e => handleInputChange(e)} label="Model" fullWidth/>
            <TextField margin="dense" name="color" value={car.color} onChange={e => handleInputChange(e)} label="Color" fullWidth/>
            <TextField margin="dense" name="fuel" value={car.fuel} onChange={e => handleInputChange(e)} label="Fuel" fullWidth/>
            <TextField margin="dense" name="year" value={car.year} onChange={e => handleInputChange(e)} label="Year" fullWidth/>
            <TextField margin="dense" name="price" value={car.price} onChange={e => handleInputChange(e)} label="Price" fullWidth/>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">Cancel</Button>
            <Button onClick={updateCar} color="primary">Update</Button>
            </DialogActions>
        </Dialog>
    </div>
    );


}
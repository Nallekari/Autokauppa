
import React, { useState, useRef, useEffect } from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Snackbar from '@mui/material/Snackbar';

import Button from '@mui/material/Button';
import MuiAlert from '@mui/material/Alert';
import Addcar from './Addcar';
import Editcar from './Editcar';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default function AutoLista() {
    
    
    const [cars, setCars] = useState([]);
    const gridRef = useRef();
    const [open, setOpen] = React.useState(false);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
        .then(response => response.json())
            .then(data => setCars(data._embedded.cars))
    }

    const deleteCar = (link) => {
        if (gridRef.current.getSelectedNodes().length > 0) {
            if (window.confirm('Are you sure?')){
                fetch(gridRef.current.getSelectedNodes()[0].data._links.self.href, { method: 'DELETE' }).
                then(res => fetchData())
                    .catch(err => console.error(err))
                handleNotification();
            }
        }
        else {
            alert('Select row first')
        }
    }


    const saveCar = (car) => {
        fetch('https://carstockrest.herokuapp.com/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }

    const updateCar = (car, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }

    const handleNotification = () => {
        setOpen(true);
      };

      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
    
    const columns = [
        { field: "brand", sortable: true, filter: true, floatingFilter: true },
        { field: "model", sortable: true, filter: true, floatingFilter: true },
        { field: "color", sortable: true, filter: true, floatingFilter: true,
         cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'}
        },
        { field: "fuel", sortable: true, filter: true, floatingFilter: true },
        { field: "year", sortable: true, filter: true, floatingFilter: true },
        { field: "price", sortable: true, filter: true, floatingFilter: true },
        { cellRenderer: Editcar, updateCar: { updateCar } },
        
       
    ]

    return (
        <div>
        <Addcar saveCar={saveCar}/>
            <div>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>Car deleted succesfully!</Alert>
                </Snackbar>
                <div className="ag-theme-material" style={{ height: '700px', width: '80%', margin: 'auto', justifyContent:'center', alignItems:'center' }} >
                    <AgGridReact
                        ref={gridRef}
                        onGridReady={ params => gridRef.current = params.api }
                        rowSelection="single"
                        columnDefs={columns}
                        rowData={cars}
                        animateRows='true'
                    >
                    </AgGridReact>
                </div>
                <div style={{display: 'flex',justifyContent: 'center', align: 'center'}}>
                    <Button color="error" style={{margin: 10}} size='medium' variant='contained' onClick={deleteCar}>Delete Selected Car</Button>
                </div>
            </div>
        </div>
    );

}

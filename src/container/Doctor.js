import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import { useDispatch, useSelector } from 'react-redux';
import { DialogContentText } from '@mui/material';
import { adddoctordata, Deletedoctor, getDoctor, updatedoctor } from '../Redux/Action/doctor.action';



export default function Doctor() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([])
  const [Update, setUpdate] = useState('')
  const [filter, setfilterdata] = useState([])
  const [dopen, setDopen] = useState(false);
  const [did, setDid] = useState()
  const [uid, setUid] = useState()
  const dispatch = useDispatch()

  const count = useSelector(state => state.counter)
  const doctors = useSelector(state => state.doctordata)
  console.log(doctors.isLoading);



  const handleClickDopen = (id) => {
    setDopen(true);
    setDid(id);
  };

  const handleClickOpen = () => {
    setOpen(true);
    setUpdate()
  };

  const handleClose = () => {
    setOpen(false);
    setUpdate()
    formik.resetForm();
  };


  let medicine = {
    name: yup.string().required('enter name'),
    price: yup.string().required('please enter price'),
    quantity: yup.string().required('please enter quantity'),
    expiry: yup.string().required('please enter expiry'),
  }


  let schema = yup.object().shape(medicine);

  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      quantity: '',
      expiry: ''
    },
    validationSchema: schema,
    onSubmit: (value, { resetForm }) => {
      if (Update) {
        handleupdate(value)
      } else {
        handleSubmitdata(value)
      }
      resetForm();
    }
  })

  const handleupdate = (value) => {
    // let localdata = JSON.parse(localStorage.getItem("medicine"));

    // let udata = localdata.map((l, i) => {
    //   if (l.id === value.id) {
    //     return value;
    //   } else {
    //     return l;
    //   }
    // })
    // console.log(udata);

    // localStorage.setItem("medicine", JSON.stringify(udata))

    console.log(value);
    dispatch(updatedoctor(value))
    setOpen(false)
    setUpdate()
    loadData()
  }

  const handleSubmitdata = (value) => {
    // let localdata = JSON.parse(localStorage.getItem("medicine"));

    // let udata = {
    //   id: Math.floor(Math.random() * 1000),
    //   ...value
    // }

    // console.log(udata);

    dispatch(adddoctordata(value))


    // if (localdata === null) {
    //   localStorage.setItem("medicine", JSON.stringify([data]))
    // } else {
    //   localdata.push(data)
    //   localStorage.setItem("medicine", JSON.stringify(localdata))
    // }

    setOpen(false);
    loadData()

  }

  const loadData = () => {
    setData(doctors.doctor)
  }

  useEffect(
    () => {
      loadData()
      dispatch(getDoctor())
    },
    [])

  // useEffect(
  //   () => {
  //     loadData()
  //   },
  //   [doctors.isLoading])



  const columns = [

    { field: 'id', headerName: 'id', width: 130 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'price', headerName: ' Price', width: 130 },
    { field: 'quantity', headerName: 'Quantity', width: 130 },
    { field: 'expiry', headerName: 'Expiry', width: 130 },
    {
      field: 'delete', headerName: 'Delete', width: 130,
      renderCell: (params) => (
        <>
          <IconButton aria-label="delete" onClick={() => handleClickDopen(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      )
    },
    {
      field: 'edit', headerName: 'Edit', width: 130,
      renderCell: (params) => (
        <>
          <IconButton aria-label="edit" onClick={() => handleEdit(params)}>
            <CreateIcon />
          </IconButton>
        </>
      )
    }
  ];

  const handleEdit = (params) => {
    setOpen(true);
    setUpdate(true);
    formik.setValues({
      id: params.id,
      name: params.row.name,
      price: params.row.price,
      quantity: params.row.quantity,
      expiry: params.row.expiry
    });
    setUid(params.row.id)
    // console.log(data);
  }

  const handleDelete = (id) => {
    // let localData = JSON.parse(localStorage.getItem('medicine'));
    // let filterData = localData.filter((v, i) => v.id !== id);
    // localStorage.setItem("medicine", JSON.stringify(filterData))
    dispatch(Deletedoctor(did))
    loadData()
    setDopen(false);
    console.log(id);
  }

  const handleSearch = (val) => {
    // let localdata = JSON.parse(localStorage.getItem("users"))

    let fdata = doctors.doctor.filter((d) => (
      d.id.toString().includes(val) ||
      d.name.toString().toLowerCase().includes(val.toLowerCase()) ||
      d.price.toLowerCase().includes(val.toLowerCase()) ||
      d.quantity.toString().includes(val) ||
      d.expiry.toString().includes(val)

    ))

    console.log(fdata);

    setfilterdata(fdata)
    console.log(val);
  }

  let filterData = filter.length > 0 ? filter : data
  console.log(filterData);

  console.log(doctors.errors);

  return (
    <>
      {
        doctors.isLoading ?
          <p>Loading...</p> :
          (doctors.errors ?

            <p>{doctors.errors}</p> :

            <Box>
              <Container>
                <div>
                  <center>
                    <Button variant="outlined" onClick={() => handleClickOpen()}>
                      Add Medicine
                    </Button>
                    <p>{count.counter}</p>
                  </center>

                  <div className="form-group mt-3 col-lg-12">
                    <TextField
                      type="text"
                      id='search'
                      label='search'
                      variant='standard'
                      values="values"
                      onChange={(e) => handleSearch(e.target.value)}

                    />
                    <div className="validate" />
                  </div>
                  <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                      rows={doctors.doctor}
                      columns={columns}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      checkboxSelection
                    />

                  </div>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add Medicine</DialogTitle>
                    <Formik value={formik}>
                      <Form onSubmit={formik.handleSubmit}>
                        <DialogContent>
                          <TextField
                            margin="dense"
                            id="name"
                            label="name"
                            type="name"
                            fullWidth
                            variant="standard"
                            onChange={formik.handleChange}
                            defaultValue={formik.values.name}
                            helperText={formik.errors.name}
                            error={formik.errors.name ? true : false}

                          />
                          <TextField
                            margin="dense"
                            id="price"
                            label="price"
                            type="price"
                            fullWidth
                            variant="standard"
                            onChange={formik.handleChange}
                            defaultValue={formik.values.price}
                            helperText={formik.errors.price}
                            error={formik.errors.price ? true : false}
                          />
                          <TextField
                            margin="dense"
                            id="quantity"
                            label="quantity"
                            fullWidth
                            variant="standard"
                            onChange={formik.handleChange}
                            defaultValue={formik.values.quantity}
                            helperText={formik.errors.quantity}
                            error={formik.errors.quantity ? true : false}

                          />
                          <TextField
                            margin="dense"
                            id="expiry"
                            label="expiry"
                            fullWidth
                            variant="standard"
                            onChange={formik.handleChange}
                            defaultValue={formik.values.expiry}
                            helperText={formik.errors.expiry}
                            error={formik.errors.expiry ? true : false}
                          />
                          <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            {
                              Update ?
                                <Button type="submit">Update</Button>
                                :
                                <Button type="submit">Submit</Button>
                            }
                          </DialogActions>
                        </DialogContent>
                      </Form>
                    </Formik>
                  </Dialog>
                  <div>
                    <Dialog
                      open={dopen}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Are You Sure Delete Medicine Data ...? "}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">

                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => handleDelete()} autofocus>yes</Button>
                        <Button onClick={handleClose}>No</Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                </div>
              </Container>
            </Box>
          )
      }
    </>
  )
}
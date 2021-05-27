import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField from '@material-ui/core/TextField';
import styles from './Dashboard.module.scss';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const AddEmployeeForm = (props) => {
    let { handelSubmit } = props;
    let [projectList] = useState(JSON.parse(localStorage.getItem('projectList')) || []);

    let initialValues = {
        name: "",
        email: "",
        contactNumber: "",
        project: ""
    }
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
                handelSubmit(values);
                setSubmitting(false);
            }}
            validationSchema={
                Yup.object().shape({
                    name: Yup.string()
                        .required("Required"),
                    email: Yup.string()
                        .email()
                        .required("Required"),
                    contactNumber: Yup.string()
                        .required("Required"),
                    project: Yup.string()
                        .required("Required")
                })
            }
        >
            {props => {
                const {
                    values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit
                } = props;
                return (
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <TextField
                            name="name"
                            type="text"
                            label="Name"
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        {errors.name && touched.name && (
                            <div className={styles.errorMSG}>{errors.name}</div>
                        )}

                        <TextField
                            name="email"
                            type="text"
                            label="Email"
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        {errors.email && touched.email && (
                            <div className={styles.errorMSG}>{errors.email}</div>
                        )}

                        <TextField
                            name="contactNumber"
                            type="text"
                            label="Contact Number"
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        {errors.contactNumber && touched.contactNumber && (
                            <div className={styles.errorMSG}>{errors.contactNumber}</div>
                        )}
                        <FormControl variant="outlined">
                            <InputLabel id="demo-simple-select-outlined-label">Project</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                name="project"
                                onChange={handleChange}
                                label="Project"
                            >
                                {projectList.map(data => {
                                    return (<MenuItem value={data.title}>{data.title}</MenuItem>)
                                })}
                            </Select>
                        </FormControl>

                        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                            Add Employee
                        </Button>
                    </form>
                );
            }}
        </Formik>
    )
};

export default AddEmployeeForm;

import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField from '@material-ui/core/TextField';
import styles from './Dashboard.module.scss';
import Button from '@material-ui/core/Button';

const AddProjectForm = (props) => {
    let { handelSubmit } = props;
    return (
        <Formik
            initialValues={{ key: "", title: "" }}
            onSubmit={(values, { setSubmitting }) => {
                handelSubmit(values);
                setSubmitting(false);
            }}
            validationSchema={Yup.object().shape({
                key: Yup.string()
                    .required("Required"),
                title: Yup.string()
                    .required("Required")
            })}
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
                        <TextField name="key"
                            type="text" label="Key" variant="outlined" onChange={handleChange}
                            onBlur={handleBlur} />
                        {errors.key && touched.key && (
                            <div className={styles.errorMSG}>{errors.key}</div>
                        )}

                        <TextField name="title"
                            type="text" label="Title" variant="outlined" onChange={handleChange}
                            onBlur={handleBlur} />
                        {errors.title && touched.title && (
                            <div className={styles.errorMSG}>{errors.title}</div>
                        )}

                        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                            Add Project
                        </Button>
                    </form>
                );
            }}
        </Formik>
    )
};

export default AddProjectForm;

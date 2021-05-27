import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AddEmployeeForm from './AddEmployeeForm';
import styles from './Dashboard.module.scss';

const useStyles = makeStyles({
    root: {
        width: 500,
        padding: 20,
    }
});

const AddEmployeeDialog = (props) => {
    const classes = useStyles();
    const { onClose, open } = props;

    const handelSubmit = async (payload) => {
        let employeeList = JSON.parse(localStorage.getItem('employeeList')) || [];
        if (await checkEmployeeExistsOrNot(employeeList, 'email', payload.key)) {
            console.log("Error: Employee already exist")
            return false;
        }
        employeeList.push(payload);
        localStorage.setItem('employeeList', JSON.stringify(employeeList));
        onClose(true);
    };

    const checkEmployeeExistsOrNot = async (list, key, value) => {
        let isAvailable = false;

        if (list.length === 0)
            return isAvailable;

        list.forEach(item => {
            if (item[key] === value)
                isAvailable = true
        });

        return isAvailable;
    }
    return (
        <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
            <div className={classes.root}>
                <div className={styles.dialogTitle}>Employee</div>
                <AddEmployeeForm handelSubmit={handelSubmit} />
            </div>
        </Dialog>
    );
}

export default AddEmployeeDialog;
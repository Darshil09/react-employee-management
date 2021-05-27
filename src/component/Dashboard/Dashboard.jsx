import React, { useState } from 'react';
import EmployeeTable from './EmployeeTable';
import styles from './Dashboard.module.scss';
import Button from '@material-ui/core/Button';
import AddProjectDialog from './AddProjectDialog';
import AddEmployeeDialog from './AddEmployeeDialog';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const Dashboard = (props) => {
    let [openAddProjectDialog, setOpenAddProjectDialog] = useState(false)
    let [openEmployeeDialog, setOpenEmployeeDialog] = useState(false)
    let [employeeData, setEmployeeList] = useState(JSON.parse(localStorage.getItem('employeeList')) || []);
    let [projectList, setProjectList] = useState(JSON.parse(localStorage.getItem('projectList')) || []);

    const [openSnackBar, setOpenSnackBar] = useState({
        open: false,
        message: ''
    });

    // Close snackBar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway')
            return;

        setOpenSnackBar({
            open: false,
            message: ''
        });
    };

    // Open Employee Dialog only if there is at least one project added
    const openAddEmployeeDialog = () => {
        if (projectList.length > 0)
            setOpenEmployeeDialog(true)
        else
            setOpenSnackBar({
                open: true,
                message: "Please add atleast one project to add an employee"
            });

    }

    // Close project event
    const handelCloseProjectEvent = (data) => {
        if (data)
            setProjectList(JSON.parse(localStorage.getItem('projectList')) || [])

        setOpenAddProjectDialog(false)
    }

    // Close Employee event
    const handelCloseEmaployeeEvent = (data) => {
        if (data)
            setEmployeeList(JSON.parse(localStorage.getItem('employeeList')) || [])

        setOpenEmployeeDialog(false)
    }

    return (
        <div className={styles.mainDiv}>
            <div className={styles.buttonContainer}>
                <Button style={{ marginRight: 20 }} variant="contained" color="primary" onClick={() => { setOpenAddProjectDialog(true) }}>
                    Add Project
                </Button>
                <Button variant="contained" color="primary" onClick={() => { openAddEmployeeDialog() }}>
                    Add Employee
                </Button>
            </div>
            {employeeData.length > 0 ?
                <EmployeeTable rows={employeeData} className={styles.table} />
                :
                <div className={styles.noDataFound}>No Employee Data Found!</div>
            }
            <AddProjectDialog open={openAddProjectDialog} onClose={(data) => handelCloseProjectEvent(data)} />
            <AddEmployeeDialog open={openEmployeeDialog} onClose={(data) => handelCloseEmaployeeEvent(data)} />
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={openSnackBar.open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={openSnackBar.message}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </div>
    );
};

export default Dashboard;
import React, { useState } from 'react';
import EmployeeTable from './EmployeeTable';
import styles from './Dashboard.module.scss';
import Button from '@material-ui/core/Button';
import AddProjectDialog from './AddProjectDialog';
import AddEmployeeDialog from './AddEmployeeDialog';

const Dashboard = (props) => {
    let [openAddProjectDialog, setOpenAddProjectDialog] = useState(false)
    let [openEmployeeDialog, setOpenEmployeeDialog] = useState(false)
    let [employeeData, setEmployeeData] = useState(JSON.parse(localStorage.getItem('employeeList')) || []);

    return (
        <div className={styles.mainDiv}>
            <Button variant="contained" color="primary" onClick={() => { setOpenAddProjectDialog(true) }}>
                Add Project
            </Button>
            <Button variant="contained" color="primary" onClick={() => { setOpenEmployeeDialog(true) }}>
                Add Employee
            </Button>
            {employeeData.length > 0 &&
                <EmployeeTable rows={employeeData} />
            }
            <AddProjectDialog open={openAddProjectDialog} onClose={() => setOpenAddProjectDialog(false)} />
            <AddEmployeeDialog open={openEmployeeDialog} onClose={() => setOpenEmployeeDialog(false)} />
        </div>
    );
};

export default Dashboard;
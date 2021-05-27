import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AddProjectForm from './AddProjectForm';
import styles from './Dashboard.module.scss';

const useStyles = makeStyles({
    root: {
        width: 500,
        padding: 20,
    }
});

const AddProjectDialog = (props) => {
    const classes = useStyles();
    const { onClose, open } = props;

    const handelSubmit = async (payload) => {
        let projectList = JSON.parse(localStorage.getItem('projectList')) || [];
        if (await checkProjectExistsOrNot(projectList, 'key', payload.key)) {
            console.log("Error: Project Key already exist")
            return false;
        }
        projectList.push(payload);
        localStorage.setItem('projectList', JSON.stringify(projectList));
        onClose(true);
    };

    const checkProjectExistsOrNot = async (list, key, value) => {
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
                <div className={styles.dialogTitle}>Project</div>
                <AddProjectForm handelSubmit={handelSubmit} />
            </div>
        </Dialog>
    );
}

export default AddProjectDialog;
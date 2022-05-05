import React, { ReactElement } from 'react'
import { Button, ButtonProps } from "@mui/material"
import { makeStyles } from '@mui/styles';




const useStyles = makeStyles({
    submitBtn: {
        width: "auto",
        height: "3rem",
        // marginTop: "3rem",
        padding: "1rem 3rem",
        marginRight: "1rem"
    },
});

export const SubmitBtn: React.FC<ButtonProps> = ({ children, ...other }) => {
    const classes = useStyles();
    return (
        <Button
            className={classes.submitBtn}
            {...other}
        >
            {children}
        </Button>

    )
}

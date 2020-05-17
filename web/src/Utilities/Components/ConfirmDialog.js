import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
    paper_small: {
        maxWidth: '300px',
    },
    paper_middle: {
        maxWidth: '400px',
    },
    paper_large: {
        maxWidth: '500px',
    },
}));

export default function ConfirmDialog({
                                          children,
                                          onCancel = () => {
                                          },
                                          onAccept = () => {
                                          },
                                          open = true,
                                          yes = 'Yes',
                                          no = 'No',
                                          size = 'middle',
                                          ...props
                                      }) {
    const classes = useStyles();
    /*TODO: add sizes*/

    return (
        <Dialog onClose={onCancel} aria-labelledby="confirm-dialog-title" open={open}>
            <Paper className={classes.paper_middle}>
                <DialogTitle id="confirm-dialog-title">{children}</DialogTitle>
                <Grid container>
                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            size={"large"}
                            onClick={onCancel}
                        >
                            {no}
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            size={"large"}
                            onClick={onAccept}
                        >
                            {yes}
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Dialog>
    );
}
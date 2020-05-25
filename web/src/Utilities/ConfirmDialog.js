/* Author: Andrieiev Danil | danssg08@gmail.com | https://github.com/DanilAndreev
   Copyright (C) 2020 */
import React from 'react'

//MUI components
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";


const ConfirmDialogContext = React.createContext({user: null, token: null});

function ConfirmDialogProvider({children, ...props}) {
    const defaultSettings = {
        title: 'Are you sure?',
        text: '',
        size: 'middle',
        type: 'yesno',
        userFunc: () => {
        }
    };

    const [settings, setSettings] = React.useState({
        settings: defaultSettings,
        open: false,
    });

    async function confirm(func = () => {}, {title = 'Are you sure?', text = '', size = 'middle', type = 'yesno'}) {
        setSettings({
            settings: {text, size, type, title, userFunc: func},
            open: true,
        });
    }

    function handleClose() {
        setSettings({
            settings: defaultSettings,
            open: false,
        });
    }

    function handleCancel() {
        handleClose();
    }

    function handleAgree() {
        handleClose();
        settings.settings.userFunc();
    }

    let buttons = (
        <React.Fragment>
            <Button onClick={handleAgree} color="primary">
                Yes
            </Button>
            <Button onClick={handleCancel} color="primary" autoFocus>
                No
            </Button>
        </React.Fragment>
    );

    switch (settings.settings.type) {
        case 'continue':
            buttons = (
                <React.Fragment>
                    <Button onClick={handleAgree} color="primary">
                        Continue
                    </Button>
                </React.Fragment>
            );
            break;
        case 'accept':
            buttons = (
                <React.Fragment>
                    <Button onClick={handleAgree} color="primary">
                        Accept
                    </Button>
                </React.Fragment>
            );
            break;
        case 'confirmdecline':
            buttons = (
                <React.Fragment>
                    <Button onClick={handleAgree} color="primary">
                        Confirm
                    </Button>
                    <Button onClick={handleCancel} color="primary" autoFocus>
                        Decline
                    </Button>
                </React.Fragment>
            );
    }


    return (
        <ConfirmDialogContext.Provider value={confirm} {...props} >
            <Dialog
                open={settings.open}
                onClose={handleCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{settings.settings.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {settings.settings.text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAgree} color="primary">
                        Yes
                    </Button>
                    <Button onClick={handleCancel} color="primary" autoFocus>
                        No
                    </Button>
                </DialogActions>
            </Dialog>
            {children}
        </ConfirmDialogContext.Provider>
    );
}

const useConfirmDialog = () => React.useContext(ConfirmDialogContext);

export {ConfirmDialogProvider, useConfirmDialog}
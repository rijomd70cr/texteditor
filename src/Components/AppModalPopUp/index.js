import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AppModalPopUp({ title = "", dialogContent = true, maxWidth = "sm", children, open = false, onClose = () => {}, fullWidth = false }) {

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={onClose}
                aria-describedby="alert-dialog-slide-description"
                fullWidth
                maxWidth={maxWidth}
            >
                {title ? <DialogTitle>{"Use Google's location service?"}</DialogTitle> : null}
                {dialogContent ? <DialogContent>
                        <div>{children}</div>
                    </DialogContent>
                : children
                }
            </Dialog>
        </div>
    );
}

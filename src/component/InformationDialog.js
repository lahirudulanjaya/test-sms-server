import React, {Component} from 'react';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {Link} from "@material-ui/core";

class InformationDialog extends Component {
    constructor(props) {
        super(props);
        this.state={
            open:false
        }
    }
    handleClose(){
        this.setState({open:false})
    }
    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Add senders by uploading excel file."}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Now you can fill senders list by uploading excel file.
                            You can find sample excel file using <Link
                            href={"https://docs.google.com/spreadsheets/d/10ETqIFjXyDrjjhLpRGwqih7Eg7AidiyZzV00q1s6KyI/edit?usp=sharing"}>this</Link> link.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default InformationDialog;
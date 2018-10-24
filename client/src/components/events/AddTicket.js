import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import TextField from '@material-ui/core/TextField';
import { Button, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {createTicket} from "../../actions/tickets";
import Dropzone from 'react-dropzone';
import request from 'superagent';

const styles = theme => ({
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    heading: {
        margin: 0
    },
    formBody: {
        margin: "20px",
        padding: "20px"
    },
    firstField: {
        marginTop: 0
    }
});
const CLOUDINARY_UPLOAD_PRESET = 'thrbsrlc';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/ticketuploader/image/upload';
class AddTicket extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            event_id: props.match.params.event_id,
            price: '',
            description: null,
            uploadedFile: null,
            uploadedFileCloudinaryUrl: ''
         };
    }
    
    handleSubmit = () => {
        this.props.addTicket({
            event_id: this.state.event_id,
            price: this.state.price,
            description: this.state.description,
            image_url: this.state.uploadedFileCloudinaryUrl
        }).then(() => {
            this.props.history.push(`/events/${this.state.event_id}`);
        })
    }

    onImageDrop(files) {
        this.setState({
          uploadedFile: files[0]
        });
    
        this.handleImageUpload(files[0]);
      }
    
    handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);

    upload.end((err, response) => {
        if (err) {
        console.error(err);
        }

        if (response.body.secure_url !== '') {
        this.setState({
            uploadedFileCloudinaryUrl: response.body.secure_url
        });
        }
    });
    }
   
    render () {
        let { classes } = this.props;
        return (
            <div className={classes.commentsSection}>
                <Paper className={classes.formBody}>
                    <h1 className={classes.heading}>Add Ticket</h1>
                    
                    <div className="FileUpload">
                        <Dropzone
                            onDrop={this.onImageDrop.bind(this)}
                            multiple={false}
                            accept="image/*">
                            <div>Drop an image or click to select a file to upload.</div>
                        </Dropzone>
                    </div>

                    <div>
                        {this.state.uploadedFileCloudinaryUrl === '' ? null :
                        <div>
                            <img src={this.state.uploadedFileCloudinaryUrl} width="500px" height="500px"/>
                        </div>}
                    </div>

                    <br />

                    <TextField
                        id="price"
                        label="€"
                        className={classes.textField}
                        onChange = {(event) => {this.setState({price: event.target.value})}}
                        margin="normal"
                        value={this.state.price}
                    />
                    <br />
                    <TextField
                        id="description"
                        label="Description"
                        className={classes.textField}
                        onChange = {(event) => {this.setState({description: event.target.value})}}
                        margin="normal"
                    />
                    <br />
                    <Button variant="contained" color="primary" className={classes.button} onClick={this.handleSubmit.bind(this)}>Submit</Button>
                </Paper>
           </div>
        )
    }
}


let AddTicketWrapper  = withStyles(styles)(AddTicket);
export default connect(null, { 
    addTicket: createTicket 
})(AddTicketWrapper);

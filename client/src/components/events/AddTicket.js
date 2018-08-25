import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import TextField from '@material-ui/core/TextField';
import { Button, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {createTicket} from "../../actions/tickets";

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

class AddTicket extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            event_id: props.match.params.event_id,
            image_url: null,
            price: 0,
            description: null
         };
    }
    
    handleSubmit = () => {
        this.props.addTicket({
            event_id: this.state.event_id,
            price: this.state.price,
            image_url: this.state.image_url,
            description: this.state.description
        }).then(() => {
            this.props.history.push(`/events/${this.state.event_id}`);
        })
    }
   
    render () {
        let { classes } = this.props;
        return (
            <div className={classes.commentsSection}>
                <Paper className={classes.formBody}>
                    <h1 className={classes.heading}>Add Ticket</h1>
                    
                    <TextField
                        id="image"
                        label="Image url"
                        className={`${classes.textField} ${classes.firstField} `}
                        onChange = {(event) => {this.setState({image_url: event.target.value})}}
                        margin="normal"
                    />
                    <br />

                    <TextField
                        id="price"
                        label="price"
                        className={classes.textField}
                        onChange = {(event,newValue) => {this.setState({price: event.target.value})}}
                        margin="normal"
                        value={this.state.price}
                    />
                    <br />
                    <TextField
                        id="description"
                        label="description"
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

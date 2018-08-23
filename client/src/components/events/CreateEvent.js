import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { createEvent } from '../../actions/events'
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    eventCreateForm: {
        padding: "20px",
        margin: "20px 30px"
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    }
});

class CreateEvent extends PureComponent {

    state = {
       name: null,
       image_url: null,
       date: null,
       description: null
    }
    handleSubmit = () => {
        const { history } = this.props;
        this.props.createEvent({
            name: this.state.name,
            image_url: this.state.image_url,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            description: this.state.description
        }).then(function() {
            history.push(`/`);
        })
        
    }
   
    render () {
        let { classes } = this.props;
        

        return (
            <div>
                <Paper className={classes.eventCreateForm}>
                    <h1>Create Event</h1>
                    <TextField
                        id="name"
                        label="Name"
                        className={classes.textField}
                        onChange = {(event) => {this.setState({name:event.target.value})}}
                        margin="normal"
                    />
                    <br />
                    <TextField
                        id="image"
                        label="Image url"
                        className={classes.textField}
                        onChange = {(event) => {this.setState({image_url:event.target.value})}}
                        margin="normal"
                    />
                    <br />

                    <TextField
                        id="date"
                        label="Start Date"
                        type="date"
                        className={classes.textField}
                        onChange = {(event) => {this.setState({start_date:event.target.value})}}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <br />
                    <TextField
                        id="date"
                        label="End Date"
                        type="date"
                        className={classes.textField}
                        onChange = {(event) => {this.setState({end_date:event.target.value})}}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <br />

                    <TextField
                        id="description"
                        label="description"
                        className={classes.textField}
                        onChange = {(event) => {this.setState({description:event.target.value})}}
                        margin="normal"
                    />
                    <br />
                    <Button variant="contained" color="primary" className={classes.button} onClick={this.handleSubmit.bind(this)}>Submit</Button>
                </Paper>
           </div>
        )
    }


}

// const mapStateToProps = (state, props) => {
    
//     return {
//         comments : comments
//     }
// } 



let CreateEventWrapper  = withStyles(styles)(CreateEvent);
export default connect(null, { createEvent })(CreateEventWrapper)   

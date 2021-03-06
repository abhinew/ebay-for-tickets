import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { createEvent } from '../../actions/events'
import Paper from '@material-ui/core/Paper';
import {Redirect} from 'react-router-dom'
import _ from "lodash";
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
        start_date: null,
        end_date: null,
        description: null,
        errors: {
            name: false,
            image_url: false,
            start_date: false,
            end_date: false
            
        }
    }

    isEmpty(str) {
        let formInput = _.trim(str)
        return formInput.length === 0;
    }

    hasError(errors) {
        return (errors.name 
             || errors.image_url
             || errors.start_date
             || errors.end_date)
    }

    handleSubmit = () => {

        let errors = {...this.state.errors};
        errors.name = (this.isEmpty(this.state.name)) ;
        errors.image_url = (this.isEmpty(this.state.image_url)) ;
        errors.start_date = (this.isEmpty(this.state.start_date)) ;
        errors.end_date = (this.isEmpty(this.state.end_date));

        let newState = {...this.state}

        newState.errors = errors;
        this.setState(newState);
        
        if (this.hasError(errors)) {
            return;
        }

        const { history } = this.props;
        this.props.createEvent({
            name: this.state.name,
            image_url: this.state.image_url,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            description: this.state.description
        }).then(function () {
            history.push(`/`);
        })
    }

    render() {
        let { classes, authenticated } = this.props;

        if (!authenticated) {
            return <Redirect to="/login" />;
        }

        return (
            <div>
                <Paper className={classes.eventCreateForm}>
                    <h1>Create Event</h1>
                    <TextField
                        id="name"
                        label="Name"
                        required={true}
                        className={classes.textField}
                        error={this.state.errors.name}
                        onChange={(event) => { this.setState({ name: event.target.value }) }}
                        margin="normal"
                    />
                    <br />
                    <TextField
                        id="image"
                        label="Image url"
                        className={classes.textField}
                        required={true}
                        
                        error={this.state.errors.image_url}
                        onChange={(event) => { this.setState({ image_url: event.target.value }) }}
                        margin="normal"
                    />
                    <br />

                    <TextField
                        id="date"
                        label="Start Date"
                        type="date"
                        error={this.state.errors.start_date}
                        className={classes.textField}
                        onChange={(event) => { this.setState({ start_date: event.target.value }) }}
                        margin="normal"
                        required={true}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <br />
                    <TextField
                        id="date"
                        label="End Date"
                        type="date"
                        error={this.state.errors.end_date}
                        className={classes.textField}
                        onChange={(event) => { this.setState({ end_date: event.target.value }) }}
                        margin="normal"
                        required={true}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <br />

                    <TextField
                        id="description"
                        label="description"
                        required={true}
                        className={classes.textField}
                        onChange={(event) => { this.setState({ description: event.target.value }) }}
                        margin="normal"
                    />
                    <br />
                    <Button variant="contained" color="primary" className={classes.button} onClick={this.handleSubmit.bind(this)}>Submit</Button>
                </Paper>
            </div>
        )
    }


}

const mapStateToProps = (state, props) => {

    return {
        authenticated: state.currentUser !== null
    }
} 



let CreateEventWrapper = withStyles(styles)(CreateEvent);
export default connect(mapStateToProps, { createEvent })(CreateEventWrapper)   

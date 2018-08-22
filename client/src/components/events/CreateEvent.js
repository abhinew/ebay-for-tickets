import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import TextField from '@material-ui/core/TextField';
import { Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {addEvent} from '../../actions/events'


const styles = theme => ({
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
        this.props.addEvent({
            name: this.state.name,
            picture: this.state.image_url,
            date: this.state.date,
            description: this.state.description
        })
    }
   
    render () {
        let { classes } = this.props;
        return (
            <div className={classes.commentsSection}>
                <TextField
                    id="name"
                    label="Name"
                    className={classes.textField}
                    onChange = {(event,newValue) => {this.setState({name:newValue})}}
                    margin="normal"
                />
                <br />
                <TextField
                    id="picture"
                    label="Picture"
                    className={classes.textField}
                    onChange = {(event,newValue) => {this.setState({image_url:newValue})}}
                    margin="normal"
                />
                <br />

                <TextField
                    id="date"
                    label="Date"
                    type="date"
                    className={classes.textField}
                    onChange = {(event,newValue) => {this.setState({date:newValue})}}
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
                    onChange = {(event,newValue) => {this.setState({description:newValue})}}
                    margin="normal"
                />
                <br />
                <Button variant="contained" color="primary" className={classes.button} onClick={this.handleSubmit.bind(this)}>Submit</Button>
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
export default connect(null, { addEvent })(CreateEventWrapper)   

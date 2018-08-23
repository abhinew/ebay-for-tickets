import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import TextField from '@material-ui/core/TextField';
import { Button, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {addEvent} from '../../actions/events'

const styles = theme => ({
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    formBody: {
        margin: "20px",
        padding: "20px"
    }
});

class AddTicket extends PureComponent {

    state = {
       name: null,
       image_url: null,
       date: null,
       description: null
    }
    handleSubmit = () => {
        this.props.addEvent({
            name: this.state.name,
            image_url: this.state.image_url,
            date: this.state.date,
            description: this.state.description
        })
    }
   
    render () {
        let { classes } = this.props;
        return (
            <div className={classes.commentsSection}>
                <Paper className={classes.formBody}>
                    <h1>Add Ticket</h1>
                    
                    <br />
                    <TextField
                        id="image"
                        label="Image url"
                        className={classes.textField}
                        onChange = {(event,newValue) => {this.setState({image_url:newValue})}}
                        margin="normal"
                    />
                    <br />

                    <TextField
                        id="price"
                        label="price"
                        className={classes.textField}
                        onChange = {(event,newValue) => {this.setState({price:newValue})}}
                        margin="normal"
                        
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



let AddTicketWrapper  = withStyles(styles)(AddTicket);
export default connect(null, { addEvent })(AddTicketWrapper)   

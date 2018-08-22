import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import TextField from '@material-ui/core/TextField';
import { Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {addEvent} from '../../actions/events'
import Select from '@material-ui/core/Select';


const styles = theme => ({
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
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
            picture: this.state.image_url,
            date: this.state.date,
            description: this.state.description
        })
    }
   
    render () {
        let { classes } = this.props;
        return (
            <div className={classes.commentsSection}>
                <Select
                        value={this.state.name}
                        onChange={this.handleChange}
                        inputProps={{
                        name: 'event'
                        }}
                    >
                   
                    {/* {this.props.bases.map(this.createMenuItem)} */}
                
                </Select>
                
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

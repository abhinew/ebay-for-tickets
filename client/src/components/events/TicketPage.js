import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import './TicketPage.css'


const styles = theme => ({
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    }

  });


class TicketPage extends PureComponent {

    state = {
        name: null
    }
    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };

    render() {
         let { classes, ticket } = this.props;
 
        return(
            <div>
                <h4>Ticket from  {ticket.author} </h4>
                <h4>Risk: {ticket.color} </h4>
                <h4>€ {ticket.price} </h4>
                <img className="ticket-image" src={ticket.image_url} alt="ticket-scan" />
                <div className="comments-section">
                    <h3> Comments</h3>
                    <TextField
                        id="name"
                        label="Enter your comment"
                        className={classes.textField}
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" className={classes.button}>Submit</Button>
                </div>
               
            </div>
        )
    }
} 

const mapStateToProps = (state, props) => {
    let ticketId = parseInt(props.match.params.id);
    let ticket = state.tickets.find((ticket) => {    
       return ticket.ticket_id === ticketId;
    })

    return {
        ticket: ticket
    }
} 

let TicketPageWrapper  = withStyles(styles)(TicketPage);
export default connect(mapStateToProps)(TicketPageWrapper)
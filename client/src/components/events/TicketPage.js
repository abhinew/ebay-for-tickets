import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import './TicketPage.css'
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Link } from 'react-router-dom'
import DialogTitle from '@material-ui/core/DialogTitle';
import {updateTicket} from '../../actions/tickets'
import Comments from './Comments';
import {Redirect} from 'react-router-dom';

const styles = theme => ({
    ticket: {
        padding: "30px",
        margin: "30px"
    },
    heading: {
        textAlign: "center"
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    back: {
        marginRight: "20px"
    }

});


class TicketPage extends PureComponent {

    state = {
        open: false,
        price: null,
        description: null,
        image_url: null

    }
    updateProperty = (obj) => {
        var newState = Object.assign({}, this.state, obj);
        this.setState(newState);
    }
    handleClickOpen = (ticket) => {
        this.updateProperty({ 
            open: true,
            price: ticket.price,
            description: ticket.description,
            image_url: ticket.image_url
         })
    };

    handleClose = () => {
        this.updateProperty({ open: false });
        
    };
    handlePriceChange = (event) => {
        this.updateProperty({ 
            price : event.target.value 
        });
    };
    handleDescChange = (event) => {
        this.updateProperty({
          description : event.target.value
        });
    };
    handleImageChange = (event) => {
        this.updateProperty({
          image_url : event.target.value
        });
    };
    handleSubmit = (ticketId) => {
        this.updateProperty({ open: false });
        this.props.updateTicket(this.state,ticketId);
    }
   

    renderDialog(ticket) {
    
       
        return (<Dialog
            open={true}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit ticket</DialogTitle>
            <DialogContent>
                <TextField
                autoFocus
                margin="dense"
                id="Description"
                label="Description"
                type="text"
                fullWidth
                onChange={this.handleDescChange}
                value={this.state.description}
                />
                <TextField
                autoFocus
                margin="dense"
                id="Price"
                label="Price"
                type="text"
                fullWidth
                onChange={this.handlePriceChange}
                value={this.state.price}
                />
                 <TextField
                autoFocus
                margin="dense"
                id="image"
                label="Enter image url"
                type="text"
                fullWidth
                onChange={this.handleImageChange}
                value={this.state.image_url}
                />
            </DialogContent>
            <DialogActions>
                <Button  onClick={this.handleClose} color="primary">
                Cancel
                </Button>
                <Button  onClick={this.handleSubmit.bind(this,ticket.ticket_id)} color="primary">
                Submit
                </Button>
            </DialogActions>
        </Dialog>)
    }
    back() {
        let {ticket} = this.props;
        this.props.history.push(`/events/${ticket.event_id}`)
    }
    
    render() {
         let { classes, ticket } = this.props;
         let isDialogOpen = this.state.open;  
         
         if (!ticket) {
            return <Redirect to="/"/>
        }
        return(
            <div>
                <Paper className={classes.ticket}>
                <Button className={classes.back} onClick={this.back.bind(this)}> Back </Button>
                <Button variant="contained" color="primary" className={classes.button} onClick={ this.handleClickOpen.bind(this, ticket)}> Edit </Button>
                    <h1 className={classes.heading}>Ticket from  {ticket.author_name} </h1>
                    <h2 className={classes.heading}>Risk:  </h2>
                    <h3 className={classes.heading}>€{ticket.price}</h3>
                    <img className="ticket-image" src={ticket.image_url} alt="ticket-scan" />
                    
                    {isDialogOpen? this.renderDialog(ticket):null}
                    <Comments ticketId={ticket.ticket_id}/>
                </Paper>
            </div>
        )
    }
} 

const mapStateToProps = (state, props) => {
    let ticketId = parseInt(props.match.params.id, 10); 
    let eventId = parseInt(props.match.params.event_id, 10); 
    let ticket = null;
    if (typeof state.tickets[eventId] !== "undefined") {
        ticket = state.tickets[eventId].find((ticket) => ticket.ticket_id === ticketId);
    }
    return {
        ticket: ticket
    }
} 



let TicketPageWrapper  = withStyles(styles)(TicketPage);
export default connect(mapStateToProps, { updateTicket })(TicketPageWrapper)
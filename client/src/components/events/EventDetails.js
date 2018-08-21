import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  });



class EventDetails extends PureComponent {
  
    
  
    render() {
         let { event, classes, tickets } = this.props;

         
        return(
            <div>
                <h1>{event.name}</h1>
                <img src={event.image_url} alt="evet-poster" />
                <Paper className={classes.root}>
                <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <TableCell>Price</TableCell>
                    <TableCell numeric>Author</TableCell>
                    <TableCell numeric>Risk percentage</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {tickets.map(ticket => {
                    return (
                    <TableRow key={ticket.ticket_id}>
                        {/* <TableCell component="th" scope="row">{row.name}</TableCell> */}
                        <TableCell numeric>{ticket.price}</TableCell>
                        <TableCell numeric>{ticket.author}</TableCell>
                        <TableCell numeric>{ticket.risk_color}</TableCell>
                    </TableRow>
                    );
                })}
                </TableBody>
                </Table>
                </Paper>
            </div>
        )
    }
}


const mapStateToProps = (state, props) => {
    let eventId = parseInt(props.match.params.id);
    let event = state.events.find((event) => {    
       return event.event_id === eventId;
    })
    let tickets = state.tickets.filter((ticket) => {
        if (ticket.event_id === eventId) {
            return ticket;
        }
        
    })
    console.log(tickets);
    return {
        event : event,
        tickets: tickets
    }
} 

let EventDetailsWrapper  = withStyles(styles)(EventDetails);
export default connect(mapStateToProps)(EventDetailsWrapper)

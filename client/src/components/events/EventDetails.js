import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './EventDetails.css'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'


const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    button: {
        margin: theme.spacing.unit,
    },
    table: {
      minWidth: 700,
    },
  });

  let color = "null";


class EventDetails extends PureComponent {
    findRiskColor = (riskPercent) => {
        if (riskPercent < 30) {
            color = "#32CD32"
        }
        else if (riskPercent > 30 && riskPercent < 60) {
            color = "#FF8C00"
        }
        else {
            color = "#FF0000"
        }
        return color;
    }
    render() {
         let { event, classes, tickets } = this.props;
 
        return(
            <div className="event-container" >
                <h1>{event.name}</h1>
                <img src={event.image_url} alt="event-poster" />
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                    <TableHead>
                    <TableRow>
                        <TableCell>Price</TableCell>
                        <TableCell numeric>Author</TableCell>
                        <TableCell numeric>Risk color</TableCell>
                        <TableCell numeric></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {tickets.map(ticket => {
                        let color = this.findRiskColor(ticket.risk_percent);
                        let customStyles = {  height: '25px',
                            width: '25px',
                            'background-color': color,
                            'border-radius': '50%',
                            display: 'inline-block' }
                        return (
                            <TableRow key={ticket.ticket_id}>
                                <TableCell numeric>{ticket.price}</TableCell>
                                <TableCell numeric>{ticket.author}</TableCell>
                                <TableCell numeric><span style={ customStyles }></span></TableCell>
                                <TableCell numeric><Link to={`/tickets/${ticket.ticket_id}`}><Button variant="contained" color="primary" className={classes.button}>More</Button> </Link></TableCell>  
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
    return {
        event : event,
        tickets: tickets
    }
} 

let EventDetailsWrapper  = withStyles(styles)(EventDetails);
export default connect(mapStateToProps)(EventDetailsWrapper)

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
import {getTickets} from "../../actions/tickets";
import {Redirect} from 'react-router-dom';
import { Typography } from '@material-ui/core';

const styles = theme => ({
    actionCell: {
        textAlign: "right"
    },
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
    componentWillMount() {
        var event_id = this.props.match.params.id;
        this.props.getTickets(event_id);
      }
    
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

        let { event, classes, tickets, authenticated } = this.props;

        if (!event) {
            return <Redirect to="/"/>
        }
 
        console.log(event);
        return(
            <div className="event-container" >
                <h1>{event.name}</h1>
                <img src={event.image_url} width="500" height="500" alt="event-poster" />
                <br />
                {authenticated? <Link to={`/add-ticket/${event.event_id}`}><Button variant="contained" color="primary" className={classes.button}>ADD TICKET</Button></Link>: null}
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                    <TableHead>
                    <TableRow>
                        <TableCell >Author</TableCell>
                        <TableCell>Risk color</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell numeric></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {tickets.map(ticket => {
                        let color = this.findRiskColor(ticket.risk_percent);
                        let customStyles = {  height: '25px',
                            width: '25px',
                            'backgroundColor': color,
                            'borderRadius': '50%',
                            display: 'inline-block' }
                        return (
                            <TableRow key={ticket.ticket_id}>
                                <TableCell ><Typography>{ticket.author_name}</Typography></TableCell>
                                <TableCell><span style={ customStyles }></span></TableCell>
                                <TableCell ><Typography>{ticket.price}</Typography></TableCell>
                                <TableCell className={classes.actionCell}><Link to={`/tickets/${event.event_id}/${ticket.ticket_id}`}><Button variant="contained" color="primary" className={classes.button}>Show</Button> </Link></TableCell>  
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

    let id = parseInt(props.match.params.id);
    let theEvent = state.events.find(function (event) {
        return event.event_id === id;
    });
    let tickets = [];

    if (typeof state.tickets[id] !== "undefined") {
        tickets = state.tickets[id];
    }
    return {
        authenticated: state.currentUser !== null,
        event : theEvent,
        tickets: tickets
    }
} 

let EventDetailsWrapper  = withStyles(styles)(EventDetails);
export default connect(mapStateToProps, {
    getTickets
})(EventDetailsWrapper)

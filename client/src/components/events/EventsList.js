import React, {PureComponent} from 'react'
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import {getUsers} from '../../actions/users'
import {getEvents} from '../../actions/events'
import Paper from '@material-ui/core/Paper';
import moment from 'moment';


const styles = theme => ({
    container: {
        width: "970px",
        margin: "0 auto",
        padding: "20px 0"
    },
    event: {
        padding: "20px",
        marginBottom: "20px",
        '&:after' : {
            clear: "both",
            content: "close-quote",
            display: "block"
        }
    },
    eventDetails: {
            float: "left",
            width: "50%",
            '&:second-child' : {
                "padding-left" : "20px"
            }
    },
    list: {
        listStyle: "none",
        padding: "0"
    },
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });

class EventsList extends PureComponent {
    componentWillMount() {
        if (this.props.authenticated) {
          if (this.props.users === null) this.props.getUsers()
        }

        this.props.getEvents();
      }
    state = {
        activePage: 1
    }
    displayEvent = (event) => {
        const {classes} = this.props;
        return ( <li key={event.event_id}>
            <Paper className={classes.event}>
                <div className={classes.eventDetails}>
                    <Link to={`/events/${event.event_id}`} ><img src={event.image_url} alt="event-poster" /></Link>
                </div>    
                <div className={classes.eventDetails}> 
                    <h1>{event.name}</h1>
                    <p>{event.description}</p>
                    <span> {moment(event.start_date).format('LL')} - {moment(event.end_date).format('LL')}</span>
                </div>
                
            </Paper>
        </li>)
    }
    onNextClick = () => {
        this.setState({
            activePage: this.state.activePage + 1
        })
    }
    onPreviousClick = () => {

        this.setState({activePage: this.state.activePage - 1})
    }
   render() {
        let { events, authenticated } =  this.props,
            currentPageEvents;
        const { classes } = this.props;
        let startIndex = (this.state.activePage - 1) * 8;


        let hasMoreThan8 = events.length > 8;
        if (hasMoreThan8) {
            currentPageEvents = events.slice(startIndex, startIndex + 8);
        } else {
            currentPageEvents = events.slice();
        }


        return (
            <div className={classes.container}>
                {authenticated? <Link to={`/create-event/`}><Button variant="contained" color="primary" className={classes.button}>CREATE EVENT</Button></Link> :null}
                
                    <ul className={classes.list}>
                        { currentPageEvents.map(this.displayEvent) }
                    </ul>
                    { (hasMoreThan8) ? this.getPageNumbers(): null}
            </div>
        )
    }

    getPageNumbers() {
        let {classes, events}  = this.props;
        let shouldShowNextButton = this.state.activePage <= Math.floor(events.length / 8);
        let shouldShowPrevButton = this.state.activePage > 1;
        return <div>
            {(shouldShowPrevButton) ? <Button variant="contained" color="primary" className={classes.button} onClick={ this.onPreviousClick.bind(this) }>Previous</Button> : null }
            {(shouldShowNextButton) ? <Button variant="contained" color="primary" className={classes.button} onClick={ this.onNextClick.bind(this) }>Next</Button> : null }
        </div>
    }
}


const mapStateToProps = state => ({
    authenticated: state.currentUser !== null,
    users: state.users === null ? null : state.users,
    events: state.events
})

let EventsListWrapper = withStyles(styles)(EventsList)
export default connect(mapStateToProps, { getUsers, getEvents })(EventsListWrapper);

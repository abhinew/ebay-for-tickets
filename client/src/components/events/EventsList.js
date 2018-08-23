import React, {PureComponent} from 'react'
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import {getUsers} from '../../actions/users'
import {Redirect} from 'react-router-dom'
import {getEvents} from '../../actions/events'
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    container: {
        padding: "30px"
    },
    event: {
        padding: "20px",
        marginBottom: "20px"
    },
    list: {
        listStyle: "none"
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

        this.props.getEvents()
      }
    state = {
        activePage: 1
    }
    displayEvent = (event) => {
        const {classes} = this.props;
        return ( <li key={event.event_id}>
            <Paper className={classes.event}>    
                <div>
                    <h1>{event.name}</h1>
                    <Link to={`/events/${event.event_id}`} ><img src={event.image_url} width="200" height="200" alt="event-poster" /></Link>
                    <p>{event.description}</p>
                    <span>From {event.start_date} to {event.end_date}</span>
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
        let startIndex = (this.state.activePage - 1) * 4;
        let hasMoreThan4 = events.length > 4;
        if (hasMoreThan4) {
            currentPageEvents = events.slice(startIndex, startIndex + 4);
        } else {
            currentPageEvents = events.slice();
        }

        if (!authenticated) {
            return <Redirect to="/login" />;
        } 

        return (
            <div className={classes.container}> 
                <Link to={`/create-event/`}><Button variant="contained" color="primary" className={classes.button}>CREATE EVENT</Button></Link>
                <Link to={`/add-ticket/`}><Button variant="contained" color="primary" className={classes.button}>ADD TICKET</Button></Link>
                    <ul className={classes.list}>
                        { currentPageEvents.map(this.displayEvent) }
                    </ul>
                    { (hasMoreThan4) ? this.getPageNumbers(): null}
            </div>
        )
    }

    getPageNumbers() {
        let {classes, events}  = this.props;
        let shouldShowNextButton = this.state.activePage <= Math.floor(events.length / 4);
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

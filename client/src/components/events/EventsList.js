import React, {PureComponent} from 'react'
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });

class EventsList extends PureComponent {
    state = {
        activePage: 1
    }
    displayEvent = (event) => (
        
        <li key={event.event_id}>
            
            <div>
                <h1>{event.name}</h1>
                <Link to={`/events/${event.event_id}`} ><img src={event.image_url} alt="event-poster" /></Link>
                <p>{event.description}</p>
                <span>From {event.start_date} to {event.end_date}</span>
            </div>
            
        </li> 
    )
    onNextClick = () => {
        
        this.setState({activePage: this.state.activePage + 1})
    }
    onPreviousClick = () => {
        
        this.setState({activePage: this.state.activePage - 1})
    }
   render() {
    let { events } =  this.props;
    const { classes } = this.props;
    let startIndex = (this.state.activePage - 1) * 4;
    let currentPageEvents = events.slice(startIndex, startIndex + 4);

       return (
           <div> 
               <Link to={`/create-event/`}><Button variant="contained" color="primary" className={classes.button}>CREATE EVENT</Button></Link>
               <Link to={`/add-ticket/`}><Button variant="contained" color="primary" className={classes.button}>ADD TICKET</Button></Link>
                <ul>
                    { currentPageEvents.map(this.displayEvent) }
                </ul>
                {(this.state.activePage > 1) ? <Button variant="contained" color="primary" className={classes.button} onClick={ this.onPreviousClick.bind(this) }>Previous</Button> : null }
                {   
                    (this.state.activePage <= Math.floor(events.length / 4)) ? <Button variant="contained" color="primary" className={classes.button} onClick={ this.onNextClick.bind(this) }>Next</Button> : null }
           </div>
       )
   }
}


const mapStateToProps = state => ({
   events: state.events
})
  
let EventsListWrapper = withStyles(styles)(EventsList) 
export default connect(mapStateToProps)(EventsListWrapper);

import React, {PureComponent} from 'react'
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles';

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
        <li key={event.id}>
            <div>
                <h1>{event.name}</h1>
                <img src={event.image_url} alt="event-poster" />
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
    let eventsList = events.splice(startIndex,4)
       return (
           <div> 
                <ul>
                    { eventsList.map(this.displayEvent) }
                </ul>
                <Button variant="contained" color="primary" className={classes.button} onClick={  this.state.activePage > 1? this.onPreviousClick : null }>Previous</Button>
                <Button variant="contained" color="primary" className={classes.button} onClick={ this.state.activePage <= Math.floor(events.length / 4)? this.onNextClick: null }>Next</Button>
           </div>
       )
   }
}


const mapStateToProps = state => ({
   events: state.events
})
  
let EventsListWrapper = withStyles(styles)(EventsList) 
export default connect(mapStateToProps)(EventsListWrapper);

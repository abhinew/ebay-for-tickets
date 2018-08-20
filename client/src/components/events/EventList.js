import React, {PureComponent} from 'react'

class EventsList extends PureComponent {

    displayEvent = (event) => (
        <li key={event.event_id}>
            <div>
                <h1>{event.name}</h1>
                <img src={event.image} alt="event-poster" />
            </div>
        </li> 
    )

   render() {
    let { events } =  this.props;

       return (
           <ul>
               {events.map(this.displayEvent)}
           </ul>
       )
   }
}
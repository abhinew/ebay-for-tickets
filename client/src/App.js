import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import './App.css';
import TopBar from './components/layout/TopBar';
import LoginPage from './components/login/LoginPage';
import LogoutPage from './components/logout/LogoutPage';
import SignupPage from './components/signup/SignupPage';
import EventsList from "./components/events/EventsList";
import EventDetails from './components/events/EventDetails'
import TicketPage from './components/events/TicketPage';
import CreateEvent from './components/events/CreateEvent';
import AddTicket from './components/events/AddTicket'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <TopBar />
          </nav>
          <main style={{ marginTop: 75 }}>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/logout" component={LogoutPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/events" component={EventsList} />
            <Route exact path="/events/:id" component={EventDetails} />
            <Route exact path="/tickets/:event_id/:id" component={TicketPage} />
            <Route exact path="/create-event" component={CreateEvent} />
            <Route exact path="/add-ticket/:event_id" component={AddTicket} />
            <Route exact path="/" render={() => <Redirect to="/events" />} />
          </main>
        </div>
      </Router>
    )
  }
}
export default App

import React, {PureComponent} from 'react'
import './SignupForm.css'
import TextField from '@material-ui/core/TextField';
import { Button, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {FormControl} from '@material-ui/core';
const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
		}
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class SignupForm extends PureComponent {
	state = {}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state)
	}



	render() {
		const { classes } = this.props;
		return (
			<main className={classes.layout}>
            <Paper className={classes.paper}>
   
			<Typography component="h1" variant="headline">
          Sign up
      </Typography>
  			<form className={classes.form} onSubmit={this.handleSubmit}>
				<FormControl margin="normal" required fullWidth>
						<TextField
							id="email"
							label="Email"
							className={classes.textField}
							value={this.state.email || ''}
							onChange = {(event) => {this.setState({email: event.target.value})}}
							margin="normal"
						/>
						</FormControl>
						<FormControl margin="normal" required fullWidth>

						<TextField
							id="password"
							label="Password"
							className={classes.textField}
							type="password"
							value={this.state.password || ''}
							onChange = {(event) => {this.setState({password: event.target.value})}}
							margin="normal"
						/>
						</FormControl>
  				
						<FormControl margin="normal" required fullWidth>

						<TextField
							id="confirmPassword"
							label="Confirm Password"
							className={classes.textField}
							type="password"
							value={this.state.password || ''}
							onChange = {(event) => {this.setState({confirmPassword: event.target.value})}}
							margin="normal"
						/>
						</FormControl>

  				{
  					this.state.password &&
  					this.state.confirmPassword &&
  					this.state.password !== this.state.confirmPassword &&
  					<p style={{color:'red'}}>The passwords do not match!</p>
  				}

  				<Button className={classes.submit} variant="contained" color="primary" className={classes.button} fullWidth type="submit">Sign up</Button>
  			</form>
     
			</Paper>
			</main>
		)
	}
}


export default withStyles(styles)(SignupForm);
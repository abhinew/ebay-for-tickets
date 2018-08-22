import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import TextField from '@material-ui/core/TextField';
import { Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {addComment} from '../../actions/comments';

const styles = theme => ({
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    commentsSection: {
        width: "60%",
        padding: "20px"
    },
    comment: {
        padding: theme.spacing.unit * 2,
    }
});


class Comments extends PureComponent {

    state = {
       comment: ''
    }
    handleSubmit = (ticketId) => {
        this.props.addComment(this.state.comment, ticketId )
    }
    handleCommentChange = (event) => {
        this.setState({
            comment: event.target.value
        })
    }
    render () {
        let { classes, comments, ticketId } = this.props;
        return (
            <div className={classes.commentsSection}>
                <h3> Comments</h3>
                {comments.map((comment) => (<Paper className={classes.comment}>
                    <Typography>
                        {comment.authorName} 
                    </Typography>
                    <Typography>
                        {comment.text} 
                    </Typography>
                </Paper>))}


               
                <TextField
                    id="name"
                    label="Enter your comment"
                    className={classes.textField}
                    onChange={this.handleCommentChange}
                    margin="normal"
                />
                <Button variant="contained" color="primary" className={classes.button} onClick={this.handleSubmit.bind(this, ticketId)}>Submit</Button>
           </div>
        )
    }


}

const mapStateToProps = (state, props) => {
    

   let comments = state.comments.filter((comment) => {
        return comment.ticket_id === props.ticketId;
           
    })
    return {
        comments : comments
    }
} 



let CommentsWrapper  = withStyles(styles)(Comments);
export default connect(mapStateToProps, { addComment })(CommentsWrapper)
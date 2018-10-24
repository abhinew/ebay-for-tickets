import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import { Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { createComment, getComments } from '../../actions/comments';

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
    componentWillMount() {
        this.props.getComments(this.props.ticketId);
    }

    state = {
        text: ''
    }
    handleSubmit = (ticketId) => {
        this.props.createComment({
            text: this.state.text,
            ticket_id: ticketId
        }).then(() => this.props.getComments(this.props.ticketId));
    }
    handleCommentChange = (event) => {
        this.setState({
            text: event.target.value
        })
    }
    render() {
        let { classes, comments, ticketId } = this.props;

        return (
            <div className={classes.commentsSection}>
                <h3> Comments</h3>
                {comments.map((comment) => (<Paper key={comment.id} className={classes.comment}>
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
    let comments = [];
    if (typeof state.comments[props.ticketId] !== "undefined") {
        comments = state.comments[props.ticketId];
    }
    return {
        comments: comments
    }
}



let CommentsWrapper = withStyles(styles)(Comments);
export default connect(mapStateToProps, { createComment, getComments })(CommentsWrapper)
import { useEffect, useState, useContext } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import { NotificationCCtx } from '../../store/notificationContext'
function Comments(props) {
  const notiCtx = useContext(NotificationCCtx)
  const { eventId } = props;
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    if (showComments) {
      fetch('/api/comments/' + eventId)
      .then(resp => resp.json())
      .then(data => {
        console.log("🚀 ~ data", data)
        if (data.comments) {
          setComments(data.comments)
        }
      })
    }
  }, [showComments])    // This get triggered by one banch update of two setStates from line 38 and 40.

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }
  function addCommentHandler(commentData) {
    notiCtx.showNoti_mthd_fromCtx({
      title: "Posting for your comment !",
      message: "Please wait a few sec ...",
      status: "pending"
    })
    fetch('/api/comments/' + eventId, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then( resp => {
      if (resp.ok) {return resp.json()}
      resp.json().then(data => {
        throw new Error(data.message || "resp is not returned 'ok'")
      })
      resp.json()
    })
    .then( data => {
      notiCtx.showNoti_mthd_fromCtx({
        title: "Success. Posting for your comment !",
        message: "We have posted your comment now ...",
        status: "success"
      })
      if (data.result) {
        setShowComments(false);
        console.log("* * showComments:", showComments); // true bcoz of scheduled setState prevline.
        setShowComments(prev => {
          console.log("* * prev:", prev)                // false bcoz of setState previously.
          return !prev;                                 // this line not works!
          // return 'true';                                // this line works!
        });
        // console.log("* * showComments:", showComments); // true bcoz of two scheduled setState previously.
      }
    })
    .catch( err => {
      notiCtx.showNoti_mthd_fromCtx({
        title: "Something went not right !",
        message: err.message || "Something went not right, we can fix it ...",
        status: "error"
      })
    })
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  );
}

export default Comments;

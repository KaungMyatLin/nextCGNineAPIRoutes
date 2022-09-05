import { useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
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
    fetch('/api/comments/' + eventId, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then( resp => resp.json())
    .then( data => {
      console.log("🚀 ~ data", data)
      if (data.result) {
        setShowComments('false');
        // console.log("* * showComments:", showComments); // true bcoz of scheduled setState prevline.
        setShowComments(prev => {
          // console.log("* * prev:", prev)                // false bcoz of setState previously.
          // return !prev;                                 // this line not works!
          return 'true';                                // this line works!
        });
        // console.log("* * showComments:", showComments); // true bcoz of two scheduled setState previously.
      }
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

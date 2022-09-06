import classes from './newsletter-registration.module.css';
import { useContext, useRef } from 'react'
import { NotificationCCtx } from '../../store/notificationContext'
function NewsletterRegistration() {
  const notiCtx = useContext(NotificationCCtx)

  const inpEm = useRef();
  function registrationHandler(event) {
    event.preventDefault();
    notiCtx.showNoti_mthd_fromCtx({
      title: "Registering for newsletter !",
      message: "Please wait a few sec ...",
      status: "pending"
    })
    const entEm = inpEm.current.value;
    fetch('/api/newsletter-hdl', {
      method: 'POST',
      body: JSON.stringify( { email: entEm } ),
      headers: {
        'content-type': 'application/json',
      }
    })
    .then( resp => {
      if (resp.ok) {return resp.json()}
      resp.json().then(data => {
        throw new Error(data.message || "resp is not returned 'ok'")
      })
    })
    .then( () => {
      notiCtx.showNoti_mthd_fromCtx({
        title: "Just Signed up ",
        message: "You are on our e-mailing list ...",
        status: "success"
      })
    })
    .catch( err => {
      notiCtx.notification({
        title: "Something went not right !",
        message: err.message || "Something went not right, we can fix it ...",
        status: "error"
      })
    })
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={inpEm}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;

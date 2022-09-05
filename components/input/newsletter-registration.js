import classes from './newsletter-registration.module.css';
import { useRef } from 'react'
function NewsletterRegistration() {
  const inpEm = useRef();
  function registrationHandler(event) {
    event.preventDefault();
    const entEm = inpEm.current.value;
    fetch('/api/newsletter-hdl', {
      method: 'POST',
      body: JSON.stringify( { email: entEm } ),
      headers: {
        'content-type': 'application/json',

      }
    })
    .then( resp => resp.json())
    .then( data => console.log(data.message) )
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

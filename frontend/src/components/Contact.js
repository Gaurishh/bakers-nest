import React from 'react';
import styles from '../LandingPage.module.css';

const Contact = React.forwardRef((props, ref) => {
  return (
    <div className={styles.contactPageWrapper} ref={ref}>
        <h1 style={{fontWeight: "bold"}} className={styles.primaryHeading}>Have a question in mind?</h1>
        <h1 style={{fontWeight: "bold"}} className={styles.primaryHeading}>Let us help you!</h1>
        <div className={styles.contactFormContainer}>
            {/* <input type="text" placeholder='yourmail@email.com' /> */}
            <button className={styles.contactButton} id={styles.removed}><a href='mailto:bakersnest2022@gmail.com?subject=Query%20regarding%20orders'>Send us an Email!</a></button>
        </div>
    </div>
  )
})

export default Contact;

// import '../LandingPage.css';
import Home from '../components/Home.js';
import About from '../components/About.js';
import Contact from '../components/Contact.js';
import Footer from '../components/Footer.js';
import { useRef } from 'react';

import styles from '../LandingPage.module.css';

function LandingScreen() {
  
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  return (
    <div className={styles.Landing}>
      <Home ref={homeRef} home={homeRef} about={aboutRef} contact={contactRef}/>
      <About ref={aboutRef}/>
      <Contact ref={contactRef}/>
      <Footer />
    </div>
  );
}


export default LandingScreen;
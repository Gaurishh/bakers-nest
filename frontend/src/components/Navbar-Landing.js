import React, { useState } from 'react';
import Logo4 from "../Assets/Logo4.jpg";
import { HiOutlineBars3 } from "react-icons/hi2/index.esm.js";
import Box from "@mui/material/Box/index.js";
import Drawer from "@mui/material/Drawer/index.js";
import List from "@mui/material/List/index.js";
import ListItem from "@mui/material/ListItem/index.js";
import ListItemButton from "@mui/material/ListItemButton/index.js";
import ListItemText from "@mui/material/ListItemText/index.js";
import HomeIcon from "@mui/icons-material/Home.js";
import InfoIcon from "@mui/icons-material/Info.js";
import PhonePausedRounded from "@mui/icons-material/PhoneRounded.js";
import { FiArrowRight } from 'react-icons/fi/index.esm.js';
import { ListItemIcon } from '@mui/material';

import styles from '../LandingPage.module.css';

const LandingNavbar = (props) => {
  const [openMenu, setOpenMenu] = useState(false);

  const scrollFunction = (elementRef) => {
    window.scrollTo({top: elementRef.current.offsetTop, behavior: 'smooth'});
  }

  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />,
      fnctn: (e) => {scrollFunction(props.home); e.preventDefault()}
    },
    {
      text: "About",
      icon: <InfoIcon />,
      fnctn: (e) => {scrollFunction(props.about); e.preventDefault()}
    },
    {
      text: "Contact",
      icon: <PhonePausedRounded />,
      fnctn: (e) => {scrollFunction(props.contact); e.preventDefault()}
    }
  ]

  return (
    <nav className={styles.nav}>
      <div className={styles.navLogoContainer}>
        <img className={styles.logo} src={Logo4} alt="" />
      </div>

      <div className={styles.navbarLinksContainer}>
        <a href='' onClick={(e) => {scrollFunction(props.home); e.preventDefault()}}>Home</a>
        <a href='' onClick={(e) => {scrollFunction(props.about); e.preventDefault()}}>About</a>
        <a href='' onClick={(e) => {scrollFunction(props.contact); e.preventDefault()}}>Contact</a>
        <button className={styles.primaryButton} id={styles.removed}>
          <a href="/shop" target="_blank" style={{marginRight: 0}}>Shop now</a>
        </button>
      </div>

      <div className={styles.navbarMenuContainer}>
        <HiOutlineBars3 onClick={() => setOpenMenu(true)}></HiOutlineBars3>
      </div>

      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box sx={{width: 250}} role="presentation" onClick={() => setOpenMenu(false)}>
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={item.fnctn}>
                  {/* <ListItemIcon>{item.icon}</ListItemIcon> */}
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem key="Shop now" disablePadding style={{marginTop: '1rem'}}>
              <ListItemButton id={styles.removed}>
                <ListItemIcon><FiArrowRight /></ListItemIcon>
                <a href="/shop" target="_blank" >Shop now</a> 
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </nav>
  );
}

export default LandingNavbar;

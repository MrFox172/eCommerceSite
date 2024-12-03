import React from "react";
import styles from "./styles.module.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <Button onClick={() => window.scrollTo(0, 0)} className={styles.button}>
          Back to top
        </Button>
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <h4>SKATER LLC</h4>
          <p>&copy; 2024 - All Rights Reserved</p>
        </div>
        <div className={styles.middle}>
          <h4>Want to Become a Partner?</h4>
          <p>Selling with us is not selling out!</p>
          <p>
            Partners get unique opportunities and become part of the SKATER
            network!
          </p>
          <p>
            Interested in getting started? Create an{" "}
            <Link to="/account" className={styles.link}>
              account
            </Link>{" "}
            with us!
          </p>
        </div>
        <div className={styles.right}>
          <h4>Follow Us</h4>
          <span>
            <a href="https://www.facebook.com">
              <FontAwesomeIcon
                icon={faFacebook}
                className={styles.icon}
                size="lg"
              />
            </a>
            <a href="https://www.instagram.com">
              <FontAwesomeIcon
                icon={faInstagram}
                className={styles.icon}
                size="lg"
              />
            </a>
            <a href="https://www.twitter.com">
              <FontAwesomeIcon
                icon={faTwitter}
                className={styles.icon}
                size="lg"
              />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

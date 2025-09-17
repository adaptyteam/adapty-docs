import React, { useState, Suspense } from "react";
import { Helmet } from "react-helmet";
import BrowserOnly from "@docusaurus/BrowserOnly";
import clsx from "clsx";
import styles from "./styles.module.css";
import "./styles/stoplight.css";
import Stoplight from "../Stoplight";

const Fallback = <div className={styles.stoplightFallback} />;

const Api = ({
  url,
  title = "API reference",
  socialBanner = "https://adapty.io/img/og-image.png",
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.apiContainer}>
      <Helmet>
        <title>{title}</title>
        <meta data-rh="true" name="og:image" content={socialBanner} />
        <meta data-rh="true" name="twitter:image" content={socialBanner} />
      </Helmet>

      <div className={styles.apiNav}>
        <a href="/" className={styles.logo}>
          <img src="/img/adapty-logo.svg" alt="Adapty" className={styles.logoImage} />
          <span className={styles.logoText}>Adapty</span>
        </a>
        <div className={styles.navLinks}>
          <a href="/docs">Documentation</a>
          <a href="/api-reference">API Reference</a>
        </div>
      </div>

      <main>
        <div
          className={styles.menuToggle}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "Hide endpoints" : "Show all endpoints"}
        </div>

        <div
          className={clsx(styles.stoplightWrapper, !menuOpen && "menu-closed")}
        >
          <BrowserOnly>
            {() => <Stoplight apiDescriptionUrl={url} />}
          </BrowserOnly>
        </div>

        <div className={clsx(styles.stoplightPlaceholder, "col")}>
          <p>Our API reference is not supported at this screen size.</p>
        </div>
      </main>
    </div>
  );
};

export default Api;

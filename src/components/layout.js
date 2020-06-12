import React from 'react';
import { Link } from 'gatsby';
import { rhythm, scale } from '../utils/typography';
import useDarkMode from 'use-dark-mode';
import Toggle from './Toggle';
import sun from '../../content/assets/sun.png';
import moon from '../../content/assets/moon.png';
import './layout.css';

const Layout = ({ location, title, children }) => {
  const darkMode = useDarkMode(false, { storageKey: 'ganes.dev-theme' });
  const rootPath = `${__PATH_PREFIX__}/`;
  let header;

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(1),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}>
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
          }}
          to={`/`}>
          {title}
        </Link>
      </h1>
    );
  } else {
    header = (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}>
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
          }}
          to={`/`}>
          {title}
        </Link>
      </h3>
    );
  }
  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2.625rem',
        }}>
        <>{header}</>
        <Toggle
          checked={darkMode.value}
          onChange={darkMode.toggle}
          icons={{
            checked: (
              <img
                src={moon}
                width="16"
                height="16"
                role="presentation"
                style={{ pointerEvents: 'none' }}
              />
            ),
            unchecked: (
              <img
                src={sun}
                width="16"
                height="16"
                role="presentation"
                style={{ pointerEvents: 'none' }}
              />
            ),
          }}
        />
      </header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  );
};

export default Layout;

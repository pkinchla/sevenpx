import { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from '../components/Head';
import '../styles/globals.css';

function App({ Component, pageProps }) {
  const [domReady, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, [domReady]);

  const props = { ...pageProps, domReady };

  return (
    <Fragment>
      <Head {...props} />
      <Component {...props} />
    </Fragment>
  );
}

App.propTypes = {
  domReady: PropTypes.bool,
  pageProps: PropTypes.object,
};

export default App;

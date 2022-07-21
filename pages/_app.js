import { Fragment, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import Head from '../components/Head';
import '../styles/globals.css';

import svgs from '../svgs';
const Vector = dynamic(() => import('../components/VectorCollage'), {
  ssr: false,
});

function App({ Component, pageProps }) {
  const [domReady, setReady] = useState(false);
  const [drawings, setDrawings] = useState(svgs);

  useEffect(() => {
    setReady(true);
  }, [domReady]);

  function updateDrawings(title, path, index, transform) {
    // copy current state
    const portraits = [...drawings];

    // filter out target svg based on title
    const target = portraits.filter((item) => {
      return item.title === title;
    });

    // update appropriate path
    target[0].children.map((item, path_index) => {
      if (index === path_index) {
        item.attributes.d = path;
        item.attributes.transform = transform;
      }
    });

    setDrawings(portraits);
  }

  const props = { ...pageProps, updateDrawings, domReady, drawings };

  return (
    <Fragment>
      <Head {...pageProps} />
      <Component {...props} />
      <Vector svgs={drawings} />
    </Fragment>
  );
}

App.propTypes = {
  domReady: PropTypes.bool,
  pageProps: PropTypes.object,
};

export default App;

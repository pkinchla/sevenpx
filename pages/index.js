import { Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { getContent } from '../utils/helpers';

import Logo from '../components/Logo';

export default function Index(props) {
  const { content } = props;

  return (
    <Fragment>
      <div className="intro-container">
        <div className="intro base-layout">
          <h1 className="page-title title" tabIndex="-1">
            <Logo />
          </h1>
          <div className="copy">
            {content.hasError ? (
              <p>{content.error}</p>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: content.copy }} />
            )}
            <Link href="/drawings" as="/drawings" className="single-link">
              View Drawings &rarr;
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export async function getServerSideProps({ res }) {
  const content = await getContent();

  if (content.hasError) {
    res.statusCode = content.status;
  }

  return {
    props: {
      title: 'Seven Pixels | Home',
      description:
        'A series of vector portraits that can be edited as collages in this application. each drawing is based on a seven pixel stroke.',
      content,
    },
  };
}

Index.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  content: PropTypes.shape({
    copy: PropTypes.string,
    hasError: PropTypes.bool,
    status: PropTypes.number,
    error: PropTypes.string,
  }),
  domReady: PropTypes.bool,
};

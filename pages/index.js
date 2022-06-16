import { Fragment } from 'react';

export default function Home(props) {
  return (
    <Fragment>
      <h1>Index Page</h1>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </Fragment>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      title: 'Seven Pixels | Home',
      description:
        'A series of vector portraits that can be edited as collages in this application. each drawing is based on a seven pixel stroke.',
    },
  };
}

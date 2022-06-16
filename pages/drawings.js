import { Fragment } from 'react';

export default function Drawings(props) {
  return (
    <Fragment>
      <h2>Drawings</h2>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </Fragment>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      title: 'Seven Pixels | Drawings',
      description:
        'A list of vector drawings that can edited in the browser. as each drawing is updated the backround collage will update',
    },
  };
}

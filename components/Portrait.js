import PropTypes from 'prop-types';

export default function Portrait({ viewBox, title, paths, updateDrawings }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox}>
      <title>{title}</title>
      {paths.map((item, index) => {
        if (item.name !== 'path') {
          return null;
        }

        return (
          <path
            className="draggable"
            tabIndex={0}
            key={index}
            d={item.attributes.d}
            transform={item.attributes.transform}
          />
        );
      })}
    </svg>
  );
}

Portrait.propTypes = {
  title: PropTypes.string,
  paths: PropTypes.array,
  viewBox: PropTypes.string,
};

Portrait.defaultProps = {
  title: '',
  paths: [],
  viewBox: '',
};

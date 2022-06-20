import PropTypes from 'prop-types';

function generatePaths(svgs) {
  const fills = ['path-green', 'path-purple', 'path-black'];
  let collage = [];

  for (let i = 0; i < svgs.length; i++) {
    const svg = svgs[i];
    for (let j = 0; j < svg.children.length; j++) {
      const child = svg.children[j];

      if (child.name === 'path') {
        collage.push({
          path: child.attributes.d,
          transform: child.attributes.transform ?? null,
          fill: fills[Math.floor(Math.random() * fills.length)],
        });
      }
    }
  }

  return collage;
}

const Vector = ({ svgs }) => {
  if (!svgs) {
    return null;
  }

  const vectors = generatePaths(svgs);

  return (
    <div className="background">
      <svg
        aria-hidden="true"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
        {vectors.map((item, index) => {
          return (
            <path
              key={index}
              className={item.fill}
              d={item.path}
              transform={item.transform}
            />
          );
        })}
      </svg>
    </div>
  );
};

Vector.propTypes = {
  svgs: PropTypes.array,
};

Vector.defaultProps = {
  svgs: [],
};

export default Vector;

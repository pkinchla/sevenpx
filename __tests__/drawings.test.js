import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Drawings, { getStaticProps } from '../pages/drawings';
import drawings from '../svgs.json';

describe('<Drawings />', () => {
  const context = {
    res: {
      statusCode: 200,
    },
  };

  const response = getStaticProps(context);
  const props = { ...response.props, drawings };

  it('renders SVG', () => {
    render(<Drawings {...props} />);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems[0].children[0].tagName).toBe('svg');
  });

  it('renders level heading', () => {
    render(<Drawings {...props} />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent).toEqual('Drawings');
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import ListItem from '../components/ListItem';
import bernie from '../__mocks__/bernie.json';

describe('<ListItem />', () => {
  const props = {
    drawing: bernie,
    index: 0,
    updateDrawings: () => true,
    domReady: false,
    // fix mock later
    setActive: (index) =>
      props.active === index ? (props.active = null) : (props.active = index),
    active: null,
  };

  it('renders with no props', () => {
    render(<ListItem />);
    const title = screen.queryByText('bernie');

    expect(title).toBe(null);
  });

  it('renders with props', () => {
    render(<ListItem {...props} />);
    const title = screen.queryByText('bernie');

    expect(title).toBeInTheDocument();
  });

  it('handles active state', async () => {
    props.domReady = true;
    render(<ListItem {...props} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(props.active).toBe(0);

    fireEvent.click(button);
    expect(props.active).toBe(null);
  });
});

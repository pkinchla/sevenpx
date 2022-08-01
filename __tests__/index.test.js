import next from 'next';
import { render, screen } from '@testing-library/react';
import Index, { getServerSideProps } from '../pages/index';

describe('<Index />', () => {
  const space = process.env.SPACE_ID;
  const token = process.env.ACCESS_TOKEN;
  const entry = process.env.CONTENT_ENTRY;

  beforeEach(() => {
    process.env.SPACE_ID = space;
    process.env.ACCESS_TOKEN = token;
    process.env.CONTENT_ENTRY = entry;
  });

  const props = {
    content: {
      copy: '<p>copy</p>',
    },
  };
  const context = {
    res: {
      statusCode: 200,
    },
  };

  it('renders svg', () => {
    render(<Index {...props} />);
    const logo = screen.getByTitle('Seven Pixels');
    expect(logo).toBeInTheDocument();
  });

  it('fetches server side,', async () => {
    const response = await getServerSideProps(context);
    render(<Index {...response.props} />);
    const heading = screen.getAllByRole('heading', { level: 2 });
    expect(heading[0]).toBeInTheDocument();
  });

  it('resolves 401 error,', async () => {
    process.env.ACCESS_TOKEN = 'bad_token';
    const response = await getServerSideProps(context);
    render(<Index {...response.props} />);
    expect(
      screen.getByText(
        'The access token you sent could not be found or is invalid.'
      )
    ).toBeInTheDocument();
  });

  it('resolves 404 error,', async () => {
    process.env.CONTENT_ENTRY = 'bad_entry';
    const response = await getServerSideProps(context);
    render(<Index {...response.props} />);

    expect(
      screen.getByText('The resource could not be found.')
    ).toBeInTheDocument();
  });
});

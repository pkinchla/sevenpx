import * as utils from '../utils/helpers';

describe('getContent()', () => {
  it('it fetches content correctly', async () => {
    const content = await utils.getContent();
    expect(typeof content.copy).toBe('string');
  });

  it('handles 404s', async () => {
    process.env.CONTENT_ENTRY = 'bad_id';
    const content = await utils.getContent();
    expect(content.status).toBe(404);
  });

  it('handles 401 error', async () => {
    process.env.ACCESS_TOKEN = 'bad_token';
    const content = await utils.getContent();
    expect(content.status).toBe(401);
  });
});

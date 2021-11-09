const { formatDate, calculateQueryParams } = require('../../../src/utils');

describe('The Utility Functions', () => {
  it('returns a date in Isostring format', async () => {
    const date = formatDate('22/12/2020', '/');

    expect(date).toEqual(new Date('2020-12-22T00:00:00.000Z'));
  });

  it('returns a invalid date if date formate is not accepted', async () => {
    const query = { page: '1', limit: '2' };
    const { page, offset } = calculateQueryParams(query);

    console.log({ page, offset });

    expect(page).toBeNumber();
    expect(offset).toBeNumber();
  });
});

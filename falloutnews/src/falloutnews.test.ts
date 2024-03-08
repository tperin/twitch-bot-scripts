import { formatNewsEntry } from './falloutnews';

describe('formatNewsEntry', () => {
  it('should format the news entry correctly', () => {
    const response = {
      entries: [
        {
          title: 'Prefix: News Title',
          date: '2022-01-01',
          blurb: 'This is a sample news blurb',
          url: '/news/sample-news'
        }
      ]
    };

    const prefix = '';
    const notFoundMessage = 'No news found';

    const expected = '[2022-01-01] Prefix: News Title - This is a sample news blurb - https://fallout.bethesda.net/news/sample-news';
    const result = formatNewsEntry(response, prefix, notFoundMessage);

    expect(result).toEqual(expected);
  });

  it('should return notFoundMessage when no matching entry is found', () => {
    const response = {
      entries: [
        {
          title: 'Other Title',
          date: '2022-01-01',
          blurb: 'This is a sample news blurb',
          url: '/news/sample-news'
        }
      ]
    };

    const prefix = 'Prefix: ';
    const notFoundMessage = 'No news found';

    const expected = 'No news found';
    const result = formatNewsEntry(response, prefix, notFoundMessage);

    expect(result).toEqual(expected);
  });

  it('should truncate the blurb when it exceeds the maximum length', () => {
    const response = {
      entries: [
        {
          title: 'Prefix: News Title',
          date: '2022-01-01',
          blurb: 'This is a very long news blurb that exceeds the maximum length allowed for the blurb. This is a very long news blurb that exceeds the maximum length allowed for the blurb. This is a very long news blurb that exceeds the maximum length allowed for the blurb. This is a very long news blurb that exceeds the maximum length allowed for the blurb. This is a very long news blurb that exceeds the maximum length allowed for the blurb',
          url: '/news/sample-news'
        }
      ]
    };

    const prefix = 'Prefix: ';
    const notFoundMessage = 'No news found';

    const expected = '[2022-01-01] Prefix: News Title - This is a very long news blurb that exceeds the maximum length allowed for the blurb. This is a very long news blurb that exceeds the maximum length allowed for the blurb. This is a very long news blurb that exceeds the maximum length allowed for the blurb. This is a very long news blurb that exceeds the maximum l... - https://fallout.bethesda.net/news/sample-news';
    const result = formatNewsEntry(response, prefix, notFoundMessage);

    expect(result).toEqual(expected);
  });
});
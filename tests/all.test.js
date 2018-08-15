import R, { apiBaseURL } from '../src/main';
import { buildEndpoint, parseResponse, APICall } from '../src/helpers';

const apiKey = process.env.RT_API_KEY || '';
const config = { apiKey };
const wrongPath = 'test/api/endpoint';
const correctPath = 'lists/dvds/top_rentals.json';

describe('class instanciation', () => {
  test('should fails without config', () => {
    expect(() => new R()).toThrow();
  });

  test('should fails without apiKey', () => {
    expect(() => new R({})).toThrow();
  });

  test('passes with apiKey', () => {
    expect(() => new R(config)).not.toThrow();
  });

  test('rt object should have a config object and a buildURL method', () => {
    const rt = new R(config);

    expect(rt.buildURL).toBeDefined();
    expect(rt.config).toBeDefined();
    expect(rt.config).toEqual(config);
  });
});

describe('buildEndpoint helper', () => {

  test('should be a function', () => {
    expect(buildEndpoint).toEqual(expect.any(Function));
  });

  test('should return a function', () => {
    expect(buildEndpoint()).toEqual(expect.any(Function));
  });

  const { buildURL } = new R(config);
  const path = 'test/api/endpoint';
  const emptyParams = {};
  const filledParams = {
    limit: 15,
    country: 'us'
  };

  const searchParams = {
    ...filledParams,
    q: 'a complexe search'
  };

  test('should build an url', () => {
    expect(buildURL(path, null)).toBe(`${apiBaseURL}/${path}?apikey=${apiKey}`);
    expect(buildURL(path, undefined)).toBe(`${apiBaseURL}/${path}?apikey=${apiKey}`);
    expect(buildURL(path, emptyParams)).toBe(`${apiBaseURL}/${path}?apikey=${apiKey}`);
    expect(buildURL(path, filledParams)).toBe(`${apiBaseURL}/${path}?limit=15&country=us&apikey=${apiKey}`);
    expect(buildURL(path, searchParams)).toBe(`${apiBaseURL}/${path}?limit=15&country=us&q=${encodeURIComponent(searchParams.q)}&apikey=${apiKey}`);
  });
});

describe('parseResponse helper', () => {

  const validAPIResponse = `{
    "movie": "The Shawshank Redemption",
    "year": 1994
  }`;

  const invalidAPIResponse = `(${validAPIResponse})`;

  test('should catch JSON parsing error', () => {
    expect(() => parseResponse(invalidAPIResponse)).not.toThrow();
  });

  test('should return an object with a parsingError', () => {
    expect(parseResponse(invalidAPIResponse)).toEqual({
      parsingError: expect.any(SyntaxError),
      parsedResponse: null
    });
  });

  test('should return an object with a correct parsed text', () => {
    expect(parseResponse(validAPIResponse)).toEqual({
      parsingError: null,
      parsedResponse: expect.any(Object)
    });
  });
});

describe.skip('APICall helper', () => {
  test('promise', async () => {

    const { buildURL } = new R(config);

    await expect(APICall(buildURL(wrongPath))).rejects.toThrow();
    await expect(APICall(buildURL(correctPath))).resolves.toBeDefined();
  });

  test('callback error', done => {

    const { buildURL } = new R(config);

    APICall(buildURL(wrongPath), (error, result) => {
      expect(error).toBeDefined();
      expect(result).toBeUndefined();

      done();
    });
  });

  test('callback success', done => {

    const { buildURL } = new R(config);

    APICall(buildURL(correctPath), (error, result) => {
      expect(error).toBeNull();
      expect(result).toBeDefined();

      done();
    });
  });
});

import test from 'ava';
import R, { apiBaseURL } from './src/main';
import { buildEndpoint, APICall } from './src/helpers';

const apiKey = process.env.RT_API_KEY || '';
const config = { apiKey };

test('class instanciation fails without config', t => t.throws(() => new R()));
test('class instanciation fails without apiKey', t => t.throws(() => new R({})));
test('class instanciation passes with apiKey', t => t.doesNotThrow(() => new R(config)));
test('rt object should have a config object and a buildURL method', t => {
  const rt = new R(config);

  t.ok(rt.config);
  t.same(rt.config, config);

  t.ok(rt.buildURL);
});

test('buildEndpoint helper', t => {

  t.is(typeof buildEndpoint, 'function', 'buildEndpoint helper is a function');
  t.is(typeof buildEndpoint(), 'function', 'buildEndpoint returns a clojure');

  const { buildURL } = new R(config);
  const path = 'test/api/endpoint';
  const params = {};

});

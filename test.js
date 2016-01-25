import test from 'ava';
import R from './src/main';

test('class instanciation needs apiKey', t => t.throws(new R()));

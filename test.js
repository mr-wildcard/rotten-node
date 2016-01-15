import test from 'ava';
import 'babel-core/register';
import R from './src';

test('class R should have static method init', t => t.ok(R.init))
test('class R static method init should be callable', t => t.true(typeof R.init === "function"))
test('class R static method init has one argument', t => t.true(R.init.length === 1))

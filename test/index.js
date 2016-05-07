import test from 'ava';
const DoV2 = require('../');
const API = new DoV2({token: process.env.DOTOKEN});

test('throw without a `token`', t => {
	t.throws(() => new DoV2(), 'Expecting an access token');
});

test('API construct has `config` property', t => {
	t.truthy(API.config, 'exists');
});

test('Account.getUser', async t => {
	const res = await t.notThrows(API.getUser());
	t.truthy(res);
});

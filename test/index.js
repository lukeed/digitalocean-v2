import test from 'ava';
const DoV2 = require('../');
const API = new DoV2({token: process.env.DOTOKEN});

test('throw without a `token`', t => {
	t.throws(() => new DoV2(), 'Expecting an access token');
});

test('API construct has `config` property', t => {
	t.truthy(API.config, 'exists');
});

test('Invalid API response', async t => {
	await t.throws(API.getAction('aaa'), /Cannot read property/);
});

test('Account.getUser()', async t => {
	await t.notThrows(API.getUser());
});

test('Account.listActions()', async t => {
	const res = await t.notThrows(API.listActions());
	// fetch an action, if had any
	if (res.length) {
		await t.notThrows(API.getAction(res[0].id), 'Account.getAction(id)');
	}
});

test('Domain.listDomains()', async t => {
	await t.notThrows(API.listDomains());
	// // fetch an action, if had any
	// if (res.length) {
	// 	await t.notThrows(API.getAction(res[0].id), 'Domain.getAction(id)');
	// }
});

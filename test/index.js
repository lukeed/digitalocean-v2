import test from 'ava';
import sleep from 'sleep-promise';

if (!process.env.DOTOKEN) {
	console.error('You must provide a DigitalOcean API token as the DOTOKEN env var to run these tests.');
	process.exit(1);
}

const DoV2 = require('../');
const API = new DoV2({token: process.env.DOTOKEN});

const FAKE = {
	ID: 'aaa',
	NAME: 'name',
	SIZE: '512mb',
	SIZE_GIGABYTES: 20,
	REGION: 'nyc3',
	IMAGE: 'ubuntu-14-04-x64'
};

const isNotFound = (t, res) => {
	t.is(res.message, 'Not Found');
	t.is(res.code, 404);
};

test('throw without a `token`', t => {
	t.throws(() => new DoV2(), 'Expecting an access token');
});

test('API construct has `config` property', t => {
	t.truthy(API.config, 'exists');
});

test('Account.getUser()', async t => {
	await t.notThrows(API.getUser());
});

test('Account.listActions()', async t => {
	await t.notThrows(API.listActions());
});

test('Account.getAction(id)', async t => {
	const res = await t.notThrows(API.getAction(FAKE.ID));
	isNotFound(t, res);
});

test('Domain.listDomains()', async t => {
	await t.notThrows(API.listDomains());
});

test('Droplet.listDroplets()', async t => {
	await t.notThrows(API.listDroplets());
});

test('Droplet.createDroplet()', async t => {
	t.plan(5);

	const body = {};
	for (let k of Object.keys(FAKE)) {
		if (k !== 'ID') {
			body[k.toLowerCase()] = FAKE[k];
		}
	}

	const res = await t.notThrows(API.createDroplet({name: FAKE.NAME}));
	t.is(res.message, 'Unprocessable Entity');
	t.is(res.code, 422);

	const data = await t.notThrows(API.createDroplet(body), 'complete request');

	await sleep(40000);
	console.log('waited 40s!');

	await t.notThrows(API.deleteDroplet(data.id), 'Droplet.deleteDroplet(id)');
});

const shouldBe404 = [
	'getDroplet', 'listDropletKernels',
	'listDropletSnapshots', 'listDropletBackups',
	'getDropletAction', 'resetDropletPassword',
	'powerOnDroplet', 'powerOffDroplet', 'powerCycleDroplet',
	'shutdownDroplet', 'rebootDroplet', 'disableDropletBackups',
	'enableDropletIpv6', 'enableDropletPrivateNetworking'
];

for (let act of shouldBe404) {
	test(`Droplet.${act}(id)`, async t => {
		const res = await t.notThrows(API[act](FAKE.ID));
		isNotFound(t, res);
	});
}

test('Droplet.listDropletActions(id)', async t => {
	const res = await API.listDropletActions(FAKE.ID);
	t.deepEqual(res, [], 'is empty array');
});

test('Droplet.restoreDroplet(id, image)', async t => {
	const res = await t.notThrows(API.restoreDroplet());
	isNotFound(t, res);
});

test('Droplet.rebuildDroplet(id, image)', async t => {
	const res = await t.notThrows(API.rebuildDroplet(FAKE.ID, FAKE.IMAGE));
	isNotFound(t, res);
});

test('Droplet.resizeDroplet(id, size)', async t => {
	const res = await t.notThrows(API.resizeDroplet(FAKE.ID, FAKE.SIZE));
	isNotFound(t, res);
});

test('Droplet.renameDroplet(id, name)', async t => {
	const res = await t.notThrows(API.renameDroplet(FAKE.ID, FAKE.NAME));
	isNotFound(t, res);
});

test('Droplet.changeDropletKernel(id, kernel)', async t => {
	const res = await t.notThrows(API.changeDropletKernel(FAKE.ID, FAKE.KERNEL));
	isNotFound(t, res);
});

test('Droplet.takeDropletSnapshot(id, name)', async t => {
	const res = await t.notThrows(API.takeDropletSnapshot(FAKE.ID, FAKE.NAME));
	isNotFound(t, res);
});

for (let act of ['listImages', 'listDistributionImages', 'listApplicationImages']) {
	test(`Image.${act}()`, async t => {
		await t.notThrows(API[act]());
	});
}

for (let act of ['getImage', 'deleteImage']) {
	test(`Image.${act}(id)`, async t => {
		const res = await t.notThrows(API[act](FAKE.ID));
		isNotFound(t, res);
	});
}

test('Image.renameImage(id, name)', async t => {
	const res = await t.notThrows(API.renameImage(FAKE.ID, FAKE.NAME));
	isNotFound(t, res);
});

test('Image.transferImage(id, region)', async t => {
	const res = await t.notThrows(API.transferImage(FAKE.ID, FAKE.REGION));
	isNotFound(t, res);
});

test('Volume.listVolumes()', async t => {
	await t.notThrows(API.listVolumes());
});

test('Volume.createVolume()', async t => {
	t.plan(5);

	const body = {};
	for (let k of Object.keys(FAKE)) {
		if (k !== 'ID') {
			body[k.toLowerCase()] = FAKE[k];
		}
	}

	const res = await t.notThrows(API.createVolume({name: FAKE.NAME}));
	t.is(res.message, 'Unprocessable Entity');
	t.is(res.code, 422);

	const data = await t.notThrows(API.createVolume(body), 'complete request');

	await sleep(20000);
	console.log('waited 20s!');

	await t.notThrows(API.deleteVolume(data.id), 'Volume.deleteVolume(id)');
});

const shouldAlsoBe404 = [
	'getVolume', 'listVolumeSnapshots', 'getVolumeAction'
];

for (let act of shouldAlsoBe404) {
	test(`Volume.${act}(id)`, async t => {
		const res = await t.notThrows(API[act](FAKE.ID));
		isNotFound(t, res);
	});
}

test('Volume.listVolumeActions(id)', async t => {
	const res = await API.listVolumeActions(FAKE.ID);
	t.deepEqual(res, [], 'is empty array');
});

test('Volume.takeVolumeSnapshot(id, name)', async t => {
	const res = await t.notThrows(API.takeVolumeSnapshot(FAKE.ID, FAKE.NAME));
	isNotFound(t, res);
});

test('Volume.attachVolume(volumeId, dropletId)', async t => {
	const res = await t.notThrows(API.attachVolume(FAKE.ID, FAKE.ID));
	isNotFound(t, res);
});

test('Volume.detachVolume(volumeId, dropletId)', async t => {
	const res = await t.notThrows(API.detachVolume(FAKE.ID, FAKE.ID));
	isNotFound(t, res);
});

test('Volume.resizeVolume(id, size)', async t => {
	const res = await t.notThrows(API.resizeVolume(FAKE.ID, FAKE.SIZE_GIGABYTES));
	isNotFound(t, res);
});

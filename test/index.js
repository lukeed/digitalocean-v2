import test from 'ava';
import sleep from 'sleep-promise';
import DoV2 from '..';

if (!process.env.DOTOKEN) {
	console.error('You must provide a DigitalOcean API token as the DOTOKEN env var to run these tests.');
	process.exit(1);
}

const API = new DoV2({token: process.env.DOTOKEN});

const FAKE = {
	ID: 'aaa',
	NAME: 'name',
	NONEXISTANT_NAME: 'nonexistant_name',
	SIZE: '512mb',
	SIZE_GIGABYTES: 20,
	REGION: 'nyc3',
	STORAGE_REGION: 'nyc1', // Storage is not available in all regions.
	IMAGE: 'ubuntu-14-04-x64',
	VOLUME: '7724db7c-e098-11e5-b522-000f53304e51',
	IP: '192.168.0.1'
};

const isNotFound = (t, res) => t.is(res.code, 404);

test('throw without a `token`', t => {
	t.throws(() => new DoV2(), 'Expecting an access token');
});

test('API construct has `headers` property', t => {
	t.truthy(API.headers, 'exists');
});

test('Account.getUser()', async t => {
	await t.notThrows(API.getUser());
});

test('Account.listActions()', async t => {
	await t.notThrows(API.listActions());
});

test('Account.getAction(id)', async t => {
	isNotFound(t, await API.getAction(FAKE.ID));
});

test('Domain.listDomains()', async t => {
	await t.notThrows(API.listDomains());
});

test('Droplet.listDroplets()', async t => {
	await t.notThrows(API.listDroplets());
});

test('Droplet.createDroplet()', async t => {
	t.plan(4);

	const body = {};
	for (const k of Object.keys(FAKE)) {
		if (k !== 'ID' && k !== 'VOLUME') {
			body[k.toLowerCase()] = FAKE[k];
		}
	}

	const res = await API.createDroplet({name: FAKE.NAME});
	t.is(res.message, 'Unprocessable Entity');
	t.is(res.code, 422);

	const data = await API.createDroplet(body);
	t.pass('completes request');

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

for (const act of shouldBe404) {
	test(`Droplet.${act}(id)`, async t => {
		isNotFound(t, await API[act](FAKE.ID));
	});
}

test('Droplet.listDropletActions(id)', async t => {
	t.deepEqual(await API.listDropletActions(FAKE.ID), [], 'is empty array');
});

test('Droplet.restoreDroplet(id, image)', async t => {
	isNotFound(t, await API.restoreDroplet());
});

test('Droplet.rebuildDroplet(id, image)', async t => {
	isNotFound(t, await API.rebuildDroplet(FAKE.ID, FAKE.IMAGE));
});

test('Droplet.resizeDroplet(id, size)', async t => {
	isNotFound(t, await API.resizeDroplet(FAKE.ID, FAKE.SIZE));
});

test('Droplet.renameDroplet(id, name)', async t => {
	isNotFound(t, await API.renameDroplet(FAKE.ID, FAKE.NAME));
});

test('Droplet.changeDropletKernel(id, kernel)', async t => {
	isNotFound(t, await API.changeDropletKernel(FAKE.ID, FAKE.KERNEL));
});

test('Droplet.takeDropletSnapshot(id, name)', async t => {
	isNotFound(t, await API.takeDropletSnapshot(FAKE.ID, FAKE.NAME));
});

for (const act of ['listImages', 'listDistributionImages', 'listApplicationImages']) {
	test(`Image.${act}()`, async t => {
		await t.notThrows(API[act]());
	});
}

for (const act of ['getImage', 'deleteImage']) {
	test(`Image.${act}(id)`, async t => {
		isNotFound(t, await API[act](FAKE.ID));
	});
}

test('Image.renameImage(id, name)', async t => {
	isNotFound(t, await API.renameImage(FAKE.ID, FAKE.NAME));
});

test('Image.transferImage(id, region)', async t => {
	isNotFound(t, await API.transferImage(FAKE.ID, FAKE.REGION));
});

test('Volume.listVolumes()', async t => {
	await t.notThrows(API.listVolumes());
});

test('Volume.listVolumes(region)', async t => {
	await t.notThrows(API.listVolumes(FAKE.REGION));
});

test('Volume.createVolume()', async t => {
	t.plan(3);

	const body = {};
	for (const k of Object.keys(FAKE)) {
		if (k !== 'ID' && k !== 'VOLUME') {
			body[k.toLowerCase()] = FAKE[k];
		}
	}

	const res = await API.createVolume({name: FAKE.NAME});
	t.is(res.code, 400);

	const data = await API.createVolume({
		size_gigabytes: FAKE.SIZE_GIGABYTES,
		name: FAKE.NAME,
		region: FAKE.STORAGE_REGION
	});
	t.pass('completes request');

	if (data.code && data.code !== 201) {
		t.fail(`volume could not be created: ${JSON.stringify(data)}`);
	}

	await sleep(20000);
	console.log('waited 20s!');

	await t.notThrows(API.deleteVolume(data.id), 'Volume.deleteVolume(id)');
});

const shouldAlsoBe404 = [
	'getVolume', 'listVolumeSnapshots', 'getVolumeAction'
];

for (const act of shouldAlsoBe404) {
	test(`Volume.${act}(id)`, async t => {
		isNotFound(t, await API[act](FAKE.VOLUME, FAKE.ID));
	});
}

test('Volume.getVolumeByName(name, region)', async t => {
	const res = await API.getVolumeByName(FAKE.NONEXISTANT_NAME, FAKE.STORAGE_REGION);
	t.deepEqual(res, [], 'is empty array');
});

test('Volume.deleteVolumeByName(name, region)', async t => {
	isNotFound(t, await API.deleteVolumeByName(FAKE.NONEXISTANT_NAME, FAKE.STORAGE_REGION));
});

test('Volume.listVolumeActions(id)', async t => {
	const res = await API.listVolumeActions(FAKE.VOLUME);
	t.true(Array.isArray(res));
	t.is(res.length, 0); // may not be true for you
});

test('Volume.takeVolumeSnapshot(id, name)', async t => {
	const res = await API.takeVolumeSnapshot(FAKE.VOLUME, FAKE.NAME);
	isNotFound(t, res);
});

test('Volume.attachVolume(volumeId, dropletId)', async t => {
	isNotFound(t, await API.attachVolume(FAKE.VOLUME, FAKE.ID));
});

test('Volume.detachVolume(volumeId, dropletId)', async t => {
	isNotFound(t, await API.detachVolume(FAKE.VOLUME, FAKE.ID));
});

test('Volume.resizeVolume(id, size)', async t => {
	isNotFound(t, await API.resizeVolume(FAKE.VOLUME, FAKE.SIZE_GIGABYTES));
});

test('Region.listRegions()', async t => {
	await t.notThrows(API.listRegions());
});

test('FloatingIP.listFloatingIPs()', async t => {
	await t.notThrows(API.listFloatingIPs());
});

test('FloatingIP.createFloatingIP()', async t => {
	t.plan(7);

	const noParamsError = t.throws(() => {
		API.createFloatingIP({});
	});
	t.regex(noParamsError.message, /Please specify either/);

	const excessiveParamsError = t.throws(() => {
		API.createFloatingIP({droplet_id: FAKE.ID, region: FAKE.REGION});
	});
	t.regex(excessiveParamsError.message, /not both/);

	const res = await API.createFloatingIP({region: 'bad region'});
	t.is(res.code, 422);

	const data = await API.createFloatingIP({region: FAKE.REGION});
	t.pass('completes request');

	if (data.code && data.code !== 202) {
		t.fail(`floating ip could not be created: ${JSON.stringify(data)}`);
	}

	await sleep(10000);

	await t.notThrows(API.deleteFloatingIP(data.ip), 'deletes IP with `No Content` response');
});

const shouldAlsoAlsoBe404 = [
	'getFloatingIP', 'getFloatingIPAction'
];

for (const act of shouldAlsoAlsoBe404) {
	test(`FloatingIP.${act}(id)`, async t => {
		isNotFound(t, await API[act](FAKE.VOLUME, FAKE.ID));
	});
}

test('FloatingIP.assignFloatingIP(ip, dropletId)', async t => {
	isNotFound(t, await API.assignFloatingIP(FAKE.IP, FAKE.ID));
});

test('FloatingIP.unassignFloatingIP(ip)', async t => {
	isNotFound(t, await API.unassignFloatingIP(FAKE.IP));
});

test('FloatingIP.listFloatingIPActions(ip)', async t => {
	const res = await API.listFloatingIPActions(FAKE.IP);
	t.deepEqual(res, [], 'is empty array');
});

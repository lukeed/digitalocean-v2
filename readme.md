# DigitalOcean-v2
> A lightweight, Promise-based wrapper for the DigitalOcean v2 API.

[![npm package][npm-ver-link]][releases]
[![][dl-badge]][npm-pkg-link]
[![][travis-badge]][travis-link]

## Installation

```
npm install digitalocean-v2 --save
```

## Usage

### All Interactions

If you want access to the full [DigitalOcean API](https://developers.digitalocean.com/documentation/v2/), then import the entire module:

```js
const Digi = require('digitalocean-v2');

// initialize the API wrapper
const API = new Digi({token: 'your-digitalocean-access-token'});

// do something
API.listDroplets().then(data => {
	console.log(data); // all droplets
});
```

### Customized Interactions

However, you may only want to interact with a certain _component_ of the API, like `domains` and `images`, for example. 

So you have the ability to **inject** the relevant modules into your Core:

```js
const Core = require('digitalocean-v2/core');
const Domain = require('digitalocean-v2/domain');
const Image = require('digitalocean-v2/image');

// merge functionality into the API's Core prototype
Core.prototype.inject(Domain, Image);

// initialize the API wrapper
const API = new Core({token: 'your-digitalocean-access-token'});

API.listDomains().then(data => {
	console.log(data); // all domains
});

// undefined function (Droplet component not injected)
API.getDroplet();
```

## API

#### token

Type: `string`<br>
Default: `undefined`

Your DigitalOcean access token. Required. Learn [how to acquire a token](https://www.digitalocean.com/community/tutorials/how-to-use-the-digitalocean-api-v2).

> **Note:** This is sensitive information! Do not share it freely.

It is a good idea to set your `token` as an environment variable:

```bash
DO_API_V2_TOKEN=my-token-from-digitalocean node index.js
```

```js
const token = process.env.DO_API_V2_TOKEN;
const DOV2 = require('digitalocean-v2');
const API = new DOV2({token});
```

## Components

You may choose to inject a series of components instead of working with the full API wrapper, as [demonstrated above](#customized-interactions).

These are the component names available for `require()`:

* [Account](https://developers.digitalocean.com/documentation/v2/#account): `require('digitalocean-v2/account')`
* [Domains](https://developers.digitalocean.com/documentation/v2/#domains): `require('digitalocean-v2/domain')`
* [Droplets](https://developers.digitalocean.com/documentation/v2/#droplets): `require('digitalocean-v2/droplet')`
* [Images](https://developers.digitalocean.com/documentation/v2/#images): `require('digitalocean-v2/image')`

(Incomplete Component coverage)

## Component Methods

#### Account.getUser()

Docs: [Link](https://developers.digitalocean.com/documentation/v2/#get-user-information)<br>
Return: `Promise`<br>
Response: `Object` 

#### Account.listActions()

Docs: [Link](https://developers.digitalocean.com/documentation/v2/#list-all-actions)<br>
Return: `Promise`<br>
Response: `Array`

#### Account.getAction(id)

Type: `Integer`<br><br>
Docs: [Link](https://developers.digitalocean.com/documentation/v2/#retrieve-an-existing-action)<br>
Return: `Promise`<br>
Response: `Object`

#### Domain.listDomains()

Docs: [Link](https://developers.digitalocean.com/documentation/v2/#list-all-domains)<br>
Return: `Promise`<br>
Response: `Array`

#### Domain.getDomain(name)

Type: `String`<br><br>
**@todo**

#### Domain.createDomain(options)

Type: `Object`<br><br>
**@todo**

#### Domain.deleteDomain(name)

Type: `String`<br><br>
**@todo**

## Todos

- [ ] Finish docs (:gun:)
- [ ] Add missing methods 
- [ ] Add missing components (Regions, SSH Keys, Sizes, IPs, Tags)
- [ ] Add tests
- [x] Better error-handling

## License

MIT © [Luke Edwards](https://lukeed.com)

[releases]:     https://github.com/lukeed/digitalocean-v2/releases
[npm-pkg-link]: https://www.npmjs.org/package/digitalocean-v2
[npm-ver-link]: https://img.shields.io/npm/v/digitalocean-v2.svg?style=flat-square
[dl-badge]:     http://img.shields.io/npm/dm/digitalocean-v2.svg?style=flat-square
[travis-link]:  https://travis-ci.org/lukeed/digitalocean-v2
[travis-badge]: http://img.shields.io/travis/lukeed/digitalocean-v2.svg?style=flat-square

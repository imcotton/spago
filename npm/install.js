"use strict";

const tar = require("tar");
const fetch = require("node-fetch");
const { promisify } = require("util");
const { pipeline } = require("stream");
const { strict: assert } = require("assert");

const version = "PACKAGE_VERSION";

const { platform } = process;

const filename = {
    win32: "Windows",
    darwin: "macOS",
    linux: "Linux",
}[platform];

assert.ok(filename, `non supported platform: ${ platform }`);

const url = [
    "https://github.com/purescript/spago/releases/download",
    version,
    `${ filename }.tar.gz`,
].join("/");

const pipe = promisify(pipeline);

fetch(url).then(({ body }) => pipe(body, tar.x({ cwd: "./" }))).catch(console.error);


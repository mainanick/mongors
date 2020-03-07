#!/usr/bin/env node

import chalk from "chalk";
import rimraf from "rimraf";
import cp from "child_process";
import fs from "fs";
import meow from "meow";

import ReplicaSet from "./rs";
import { mongoRsOptions } from "./typings";
import {
  CACHE_PATH,
  DEFAULT_OPTIONS,
  DEFAULT_PORT,
  isWindows,
  where,
  thunkDataPath
} from "./utils";

const log = console.log;

const cli = meow(
  `
  Usage
      $ mongors
 
    Options
      --keep, -k  Keep the data folder if present
 
    Examples
      $ mongors --keep
`,
  {
    flags: {
      port: {
        type: "number",
        alias: "p",
        default: DEFAULT_PORT
      }
    },
    autoVersion: true,
    booleanDefault: undefined
  }
);

function _isMongoInstalled() {
  try {
    cp.execSync(`${where} mongod`);
    return true;
  } catch {
    return false;
  }
}
const isMongoInstalled = _isMongoInstalled();
if (!isMongoInstalled) {
  log(chalk.red("Mongo hasn't been installed. Please install it :)"));
  process.exit(1);
}

function getOptions() {
  const pkgoptions: mongoRsOptions = cli.pkg.mongors || {};
  const rc = isWindows
    ? `${process.cwd()}\\.mongorsrc`
    : `${process.cwd()}/.mongorsrc`;
  let rcOptions: mongoRsOptions = {};
  if (fs.existsSync(rc)) {
    rcOptions = JSON.parse(fs.readFileSync(rc, "utf8"));
  }
  const options = Object.assign(
    DEFAULT_OPTIONS,
    rcOptions,
    pkgoptions,
    cli.flags
  );
  if (Number.isNaN(options.port) || typeof options.port !== "number") {
    //@ts-ignore
    options.port = Number.parseInt(options.port, 10) || DEFAULT_PORT;
  }

  return options;
}

const options = getOptions();
log("Mongo is installed: ", isMongoInstalled);
log(chalk.green(`Using mongors cache folder:  ${CACHE_PATH}`));

const run = async () => {
  const rs = new ReplicaSet({ ...options });
  log(chalk.green(`Starting ReplicaSet`));
  try {
    await rs.start();
  } catch (e) {
    log(chalk.red(`Starting ReplicaSet`));
    process.exit(1);
  }
  const url = await rs.url();
  log(chalk.green(`ReplicaSet Connection url: ${url}`));
};

run();

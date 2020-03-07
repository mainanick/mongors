import findCache from "find-cache-dir";
import os from "os";
import cp from "child_process";
import { mongoRsOptions } from "./typings";

export const isWindows = process.platform === "win32";
export const where = isWindows ? "where" : "command -v";
export const thunk = findCache({ name: "mongors", create: true, thunk: true });
export const thunkDataPath = (f: string) => thunk("data", f);
export const LOG_PATH = thunk("log", "mongod.log");

export const DEFAULT_DBPATH = thunk("data");
export const CACHE_PATH = thunk();
export const DEFAULT_PORT = 27017;
export const DEFAULT_KEEP = true;
export const DEFAULT_FORK = false;

export const DEFAULT_HOSTNAME =
  process.platform === "win32" ? os.hostname() : "localhost";
export const DEFAULT_OPTIONS: mongoRsOptions = {
  keep: DEFAULT_KEEP,
  port: DEFAULT_PORT
};

function _isMongoInstalled() {
  try {
    cp.execSync(`${where} mongod`);
    return true;
  } catch {
    return false;
  }
}

export const isMongoInstalled = _isMongoInstalled();

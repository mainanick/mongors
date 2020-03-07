import { ReplSet } from "mongodb-topology-manager";

import { mongoRsOptions } from "./typings";
import { DEFAULT_HOSTNAME, thunkDataPath } from "./utils";

export class ReplicaSet {
  server;
  options: mongoRsOptions;
  constructor(options: mongoRsOptions) {
    this.options = options;
    this.setServer();
  }
  setServer = () => {
    const ports = [];
    for (let i = 0; i < 3; i++) {
      ports.push(this.options.port + i);
    }
    const nodes = ports.map((port, index) => {
      const config = {
        options: {
          bind_ip: DEFAULT_HOSTNAME,
          port,
          dbpath: thunkDataPath(`${port}`)
        }
      };
      //Set last node as arbiter
      if (ports.length - 1 === index) {
        config["arbiter"] = true;
      }
      return config;
    });
    this.server = new ReplSet("mongod", nodes, {
      replSet: "rs"
    });
  };
  purge = () => this.server.purge();
  discover = () => this.server.discover();
  url = () => `"mongodb://${this.server.url()}?replicaSet=rs"`;
  start = async () => {
    if (!this.options.keep) {
      await this.purge();
    }
    this.server.start();
  };
  stop = () => this.server.stop();
}
export default ReplicaSet;

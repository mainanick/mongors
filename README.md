A very opinionated cli to run a MongoDB replica set locally for development

Replica set connection uri will be console logged

Does not download Mongo, uses existing mongod

Won't work in ci/cd env

DBPath will be in `node_modules/.cache/mongors/`

```sh
yarn add --dev mongors
```

```js

  Usage
      $ mongors

    Options
      --keep, -k  Keep the data folder if present
      --port, -p Port
      --dbpath, -d Mongo Data Path

    Examples
      $ mongors --keep
      $ mongors --port 31104
      $ mongors --keep --dbpath C:\data\

```

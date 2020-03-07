A very opinionated cli to run a MongoDB replica set locally for development

Replica set connection uri will be console logged

Does not download Mongo, uses existing mongod
Deletes data path before starting server

Won't work in ci/cd env

DBPath will be in `node_modules/.cache/mongors/`

```sh
yarn add --dev @nickmaina/mongors
```

```js

  Usage
      $ mongors

    Options
      --port, -p Port

    Examples
      $ mongors --port 31104

```

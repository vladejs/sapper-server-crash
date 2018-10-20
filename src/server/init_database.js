const mongoose = require('mongoose');

export let db;

export const connect = URL => {

  mongoose.connect(URL, { useMongoClient: true })
    .catch((e) => {
      console.log(e.name);
    });

  db = mongoose.connection;

  db.once('open', () => console.info('connected to db'))
};

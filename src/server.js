import dotenv from 'dotenv'
import { connect } from './server/init_database'

import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import { urlencoded, json } from 'body-parser'
import { Store } from 'svelte/store'

import session from 'express-session'
import sessionFileStore from 'session-file-store'
import passport from 'passport'

import * as sapper from '../__sapper__/server.js';

import { initModels } from './server/models';
import { createUsersFixtures } from './server/fixtures';

import User from './server/models/user'
import { ROUTES } from './strings';

const { PORT, NODE_ENV, NOW } = process.env;
const dev = NODE_ENV === 'development';

const app = express();

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const FileStore = sessionFileStore(session);
const sessionConfig = {
  secret: 'dd',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: 86400000
  },
  store: new FileStore({
    path: NOW ? '/tmp/.sessions' : '.sessions'
  })
};

app.use(
  compression({ threshold: 0 }),
  urlencoded({ extended: true }),
  json(),
  sirv('static', { dev }),
  session(sessionConfig)
);

app.use(
  passport.initialize(),
  passport.session()
);

app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: ROUTES.DASHBOARD,
    failureRedirect: ROUTES.ERROR_LOGIN
  })
);

app.post(
  '/logout',
  (req, res, next) => {
    req.logout();
    res.end('ok');
  }
);

app.use(
  sapper.middleware({
    store: req => {
      // req.user is a Mongo Object
      const nu = req.user ? req.user.toObject() : null;
      const user = nu && {
        email: nu.username,
        fullName: `${nu.firstName} ${nu.lastName}`,
        role: nu.role
      };

      return new Store({ user });
    }
  })
);

app.listen(PORT);



initModels();
createUsersFixtures();

dotenv.config();
connect(process.env.MONGO_URL);

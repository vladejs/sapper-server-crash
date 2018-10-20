import Task from 'data.task';
import { head, compose, prop } from 'ramda';
import { trace } from '../routes/_helpers/types';
import { ROLES } from '../strings';

import User from './models/user'

const users = [
  {
    username: 'support@company.com',
    password: 'support',
    firstName: 'Administrator',
    lastName: 'Company',
    role: ROLES.ADMIN
  }
];

// this will resolve if user isn't found
const findUser = username => new Task((rej, res) =>
  User.findOne({ username })
    .exec()
    .then(user => user ? rej(user.username) : res())
    .catch(res));

const insertUser = (user, password) => () => new Task((rej, res) =>
  User.register(new User(user), password, (err, user) => user
    ? res(user)
    : rej(err)));

export const createUser = ({ username, firstName, lastName, role, password }) =>
  findUser(username)
    .map(trace('the user'))
    .chain(insertUser({ username, firstName, lastName, role }, password));

export const createUsersFixtures = () =>
  createUser(head(users))
    .fork(
      compose(trace('user already exists')),
      trace('user inserted successfully')
    );

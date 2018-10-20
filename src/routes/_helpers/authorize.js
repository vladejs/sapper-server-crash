import passport from 'passport';
import { goto } from '../../../__sapper__/client'

export const isAuth = (store, redirect) =>
  !store.get().user && redirect(302, '/');

export const observeAuth = ({changed, current}) =>
  changed.$user && current.$user == null && goto('/');

// @param (successRedirect, failureRedirect)
// @param (req, res) -> Express request and response
export const authenticate = (sr, fr) => passport.authenticate('local', {
  successRedirect: sr,
  failureRedirect: fr
});

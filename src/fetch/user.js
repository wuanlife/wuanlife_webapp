import fetch from './fetch'
import qs from 'qs'
import util from '../util'

export function signup(regobj) {
  const data = {
    name: regObj.nickname,
    mail: regObj.email,
    password: regObj.password,
    code: regObj.inviteword,
  };
  return fetch({
    url: '/users',
    method: 'post',
    data: data,
  });
}

export function loginF(email, password) {
  const data = {
    mail: email,
    password: password,
  };
  return fetch({
    url: '/users/signin',
    method: 'post',
    data: data,
  });
}

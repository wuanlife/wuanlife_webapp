import axios from 'axios'
import util from '../util'
import store from '../vuex/store'
import fetchWuan from './fetchWuan'

export function getQiniuToken () {
  return fetchWuan({
    url: `/qiniu/token`,
    method: 'get'
  })
}
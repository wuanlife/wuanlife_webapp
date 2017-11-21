var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://47.88.58.119:800/"',
  APP_ORIGIN: '"http://wuanlife.com"',
  // 七牛域名
  QINIU_DOMAIN_URL: '"http://7xlx4u.com1.z0.glb.clouddn.com/"'
})

import axios from 'axios'
import util from '../util'
import store from '../vuex/store'
import fetchWuan from './fetchWuan'

//星球列表
export function groupsList (offset, limit) {
  return fetchWuan({
    url: `/groups?offset=${offset}&limit=${limit}`,
    method: 'get'
  })
}

//获取单个星球信息
export function getSinglePlanet (planetId) {
  return fetchWuan({
    url: `/groups/${planetId}`,
    method: 'get'
  })
}

//帖子收藏
export function toCollection (params) {
  const data = {
    post_id: params.post_id
  }
  return fetchWuan({
    url: `/users/${params.id}/collections`,
    method: 'put',
    data: data
  })
}

//加入星球
export function joinPlanet (planetId) {
  return fetchWuan({
    url: `/groups/${planetId}/members`,
    method: 'post',
  })
}

//申请加入私密星球
export function applyJoinPlanet (planetId, message) {
  const data = {
    text: message
  }
  return fetchWuan({
    url: `/groups/${planetId}/private`,
    method: 'post',
    data: data
  })
}

//退出星球
export function quitPlanet (planetId) {
  return fetchWuan({
    url: `/groups/${planetId}/members`,
    method: 'delete',
  })
}

//判断是否加入星球
export function isJoinPlanet (planetId, mid) {
  return fetchWuan({
    url: `/groups/${planetId}/members/${mid}`,
    method: 'get',
  })
}

//搜索星球
export function searchGroup (params) {
  return fetchWuan({
    url: `/groups`,
    method: 'get',
    params: params
  })
}

//创建星球
export function createGroup (params) {
  const data = {
    name: params.planetName,
    image_url: params.img_url,
    introduction: params.planetIntroduction,
    private: params.selected,
  }
  return fetchWuan({
    url: `/groups`,
    method: 'post',
    data: data
  })
}

//获取用户加入的星球
export function userJoinPlanet (params) {
  const data = {
      offset: params.offset,
      limit: params.limit,
      user_id: params.id
  }
  return fetchWuan({
    url: '/groups',
    method: 'get',
    params: data
  })
}

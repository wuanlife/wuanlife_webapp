import axios from 'axios'
import util from '../util'
import store from '../vuex/store'
import fetchWuan from './fetchWuan'

//帖子点赞
export function toApproval (id) {
  return fetchWuan({
    url: `/posts/${id}/approval`,
    method: 'post'
  })
}

//帖子收藏
export function toCollection (params) {
  const data = {
    post_id: params.post_id
  }
  console.log(data)
  return fetchWuan({
    url: `/users/${params.id}/collections`,
    method: 'put',
    data: {
      post_id: params.post_id
    }
  })
}

//单个星球的帖子展示
export function showSinglePlanet (params) {
  const data = {
    offset: params.offset,
    limit: params.limit
  }
  return fetchWuan({
    url: `/groups/${params.id}/posts`,
    method: 'get',
    data: data
  })
}

//帖子详情(不包含评论)
export function planetContent (postId) {
  return fetchWuan({
    url: `/posts/${postId}`,
    method: 'get',
  })
}

//帖子详情(评论内容)
export function planetComment (params) {
  const data = {
    offset: params.offset,
    limit: params.limit
  }
  return fetchWuan({
    url: `/posts/${params.postId}/comments`,
    method: 'get',
    data: data
  })
}

//置顶
export function postTop (postId) {
  return fetchWuan({
    url: `/posts/${postId}/tops`,
    method: 'put',
  })
}

//锁定
export function postLock (postId) {
  return fetchWuan({
    url: `/posts/${postId}/locks`,
    method: 'put',
  })
}

//编辑
export function postEdit (params) {
  const data = {
    title: params.title,
    content: params.content
  }
  return fetchWuan({
    url: `/posts/${params.postId}`,
    method: 'put',
    data: data
  })
}

//删除
export function postDelete (postId) {
  return fetchWuan({
    url: `/posts/${postId}`,
    method: 'delete',
  })
}

//帖子回复
export function postReply (params) {
  const data = {
    comment: params.Comment,
    floor: params.floor
  }
  return fetchWuan({
    url: `/posts/${params.postId}/comments`,
    method: 'post',
    data: data
  })
}

//删除帖子回复
export function postReplyDelete (postId, floor) {
  const data = {
    floor: floor
  }
  return fetchWuan({
    url: `/posts/${postId}/comments`,
    method: 'delete',
    data: data
  })
}

//我的收藏帖子展示
export function postMyCollestion (id,params) {
  return fetchWuan({
    url: `/users/${id}/collections?limit=${params.limit}&offset=${params.offset}`,
    method: 'get',
  })
}

//搜索帖子
export function searchPost (params) {
  return fetchWuan({
    url: `/posts`,
    method: 'get',
    params: params
  })
}

//发表帖子
export function createPost (planetId, params) {
  const data = params
  return fetchWuan({
    url: `/groups/${planetId}/posts`,
    method: 'post',
    data: data
  })
}

//首页帖子
export function indexPosts (params) {
  const data = params
  return fetchWuan({
    url: `/posts`,
    method: 'get',
    params: data
  })
}
import util from '@/util'
import api from 'api'
import { NEXTSONG } from '@/vuex/mutation-types'
import { PREVSONG } from '@/vuex/mutation-types'
import { PLAYSONG } from '@/vuex/mutation-types'
import { PAUSESONG } from '@/vuex/mutation-types'
import { TOGGLEMUSICLIST } from '@/vuex/mutation-types'
import { SETCURRENTTIME, SYNCCURRENTTIME, SETPLAYERDOM, INITSONG } from '@/vuex/mutation-types'
import { ADDSONGTOLIST, DELSONG } from '@/vuex/mutation-types'

import { GETLYRIC } from '@/vuex/mutation-types'

const state = {
    musicList: [],
    dom: null, // audio dom element
    musicNow: {},
    lyricNow: '',
    isPlaying:false,
    currentSecond:0,//音乐播放进度
    duration:0,//音乐长度
    showList:false,//播放列表状态
}
const getters = {
    getPlayerDOM: state => state.dom,
    isShowMusicList: state => state.showList,
    getMusicList: state => state.musicList,
    getCurrentMusic: state => state.musicNow,
    currentSecond: state => state.currentSecond,
    currentTimeFormat: state => util.secondsToFormat(state.currentSecond),
    durationSecond: state => state.duration,
    durationTimeFormat: state => util.secondsToFormat(state.duration),
    nextSong: state => {
        let now = state.musicList.indexOf(state.musicNow)
        if(now == -1) {
            return state.musicList[0]
        }
        if(now+1 >= state.musicList.length) {
            return state.musicList[0]
        }
        return state.musicList[now+1]
    },
    prevSong: state => {
        let now = state.musicList.indexOf(state.musicNow)
        if(now == -1 || now == 0) {
            return state.musicList[0]
        }
        return state.musicList[now-1]        
    },
    getMusicPlace: state => {
        return state.musicList.indexOf(state.musicNow)
    }
}
const mutations = {
    [SETPLAYERDOM]: (state, audio) => {
        state.dom = audio
    },
    [INITSONG]: (state, music) => {
        state.musicNow = music
        state.currentSecond = 0
        state.isPlaying = true
        state.dom.src= state.musicNow.src
        state.dom.onloadedmetadata = () => {
            state.duration = state.dom.duration
        }
        state.dom.load()
    },
    [PLAYSONG]: (state) => {
        if(state.isPlaying) {
            return;
        }
        state.isPlaying = true
        state.dom.play()
    },
    [PAUSESONG]: (state) => {
        if(!state.isPlaying) {
            return;
        }
        state.isPlaying = false
        state.dom.pause()
    },
    [TOGGLEMUSICLIST]: (state) => {
        state.showList = !state.showList
    },
    [SETCURRENTTIME]: (state, time) => {
        state.currentSecond = time
    },
    [SYNCCURRENTTIME]: (state) => {
        state.currentSecond = state.dom.currentTime
    },
    [ADDSONGTOLIST]: (state, music) => {
        state.musicList.push(music)
    },
    [DELSONG]: (state, music_index) => {
        state.musicList.splice(music_index, 1)
    },
    [GETLYRIC]: (state, lyric_obj) => {
        state.lyricNow = lyric_obj
    }
}
const actions = {
    toggleMusicList:({ commit }) => {commit(TOGGLEMUSICLIST)},
    /*
    setUserInfo: ({ commit }, user) => {commit(SET_USER_INFO, user)},
    loadUserInfo({ commit }){
        let user = util.storeWithExpiration.get('user');
        if(!user){
            commit(SET_USER_INFO, {})
        } else {
            commit(SET_USER_INFO, user);
        }
    }
    */
    setPlayerDOM:({ commit, state }, audio) => {commit(SETPLAYERDOM, audio)},
    syncCurrentTime: ({ commit }) => {commit(SYNCCURRENTTIME)},
    playSong: ({ commit }) => {
        commit(PLAYSONG)
    },
    pauseSong: ({ commit }) => {
        commit(PAUSESONG)
    },
    initSong: ({ commit }, music) => {
        commit(INITSONG, music)
    },
    addSongToList: ({ commit }, music) => {
        commit(ADDSONGTOLIST, music)
    },
    delSong: ({ commit }, music_index) => {
        commit(DELSONG, music_index)
    },
    getLyric_url: ({ commit }, lyric_url) => {
        api.getLyrics_url(lyric_url).then(function(response) {
            commit(GETLYRIC, response)
        }).catch(function(error) {
            console.log(error);
        })
    },
}  

export default {
    state,
    getters,
    actions,
    mutations
};
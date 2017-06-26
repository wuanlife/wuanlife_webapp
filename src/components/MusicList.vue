<template>
    <transition
            enter-active-class="animated fadeInUp"
            leave-active-class="animated fadeOutDown"
    >
    <div class="hj-playList" v-show="isShowMusicList">
        <div class="hj-playList-header">
            <div class="hj-playList-header-list">
                <h4>播放列表（{{getMusicList?getMusicList.length:0}}首）</h4>
                <a href="javascript:;" class="clear" data-action="clear"><span class="ico icn-del"></span>清除</a>                
            </div>
            <div class="hj-playList-header-song">
                <p class="title">谷雨</p>
                <span class="close" @click="toggleMusicList"></span>
            </div>
        </div>
        <div class="hj-playList-content">
            <div class="hj-playList-listc">
                <ul class="hj-playList-list">
                    <li v-for="(val,index) in getMusicList" :class="{playing:getMusicPlace==index}" @click="">
                        <p @click.stop="selectMusic(index)">
                            {{val?val.name:你还没有添加列表}}
                        </p>
                        <button class="playlist-icon delbtn" @click.stop="delSong(index)"></button>
                    </li>
                </ul>
            </div>
            <lyrics-box class="hj-playList-lyrics"
                :music="getCurrentMusic" 
                :currentSecond="currentSecond">
                
            </lyrics-box>
        </div>
    </div>
    </transition>
</template>
<script>
    import {mapActions,mapGetters} from 'vuex'
    import LyricsBox from '@/components/LyricsBox'
    export default{
        data(){
            return{
                playbarState: {
                    isPlaying: false,
                },
                songInfo: {
                    name: "fuck",
                    singer: "fuckyou"
                },
            }
        },
        components:{
            LyricsBox,
        },
        computed: {
            ...mapGetters(['isShowMusicList', 'getMusicList', 'getMusicPlace', 'getCurrentMusic', 'currentSecond']),

        },
        methods:mapActions(['toggleMusicList','selectMusic','delSong'])//getters.js里有注释功能
    }
</script>
<style lang="scss" scoped>
    .hj-playList {
        display: flex;
        flex-direction: column;
        position: fixed;
        height:36vh;
        bottom: 54px;
        z-index: 2;
        width: 980px;
        overflow: auto;
        background: #eee;
        opacity: .8;
        overflow: initial;

        .hj-playList-header {
            display: flex;
            align-items: center;
            
            flex: 0 0 40px;
            font-size: 12px;
            color: #333;
            background: #101010;
            border-radius: 10px 10px 0 0;
            padding: 0 20px;

            font-family: Arial, Helvetica, sans-serif;
            .hj-playList-header-list {
                display: flex;
                justify-content: space-between;
                flex: 1 1 560px;
                h4 {
                    line-height: 39px;
                    font-size: 14px;
                    color: #e2e2e2;
                }
            }
            .hj-playList-header-song {
                display: flex;
                justify-content: center;
                flex: 0 0 420px;
                p.title {
                    color: #fff;
                }
                .close {
                    position: absolute;
                    top: 6px;
                    right: 8px;
                    width: 30px;
                    height: 30px;
                    overflow: hidden;
                    cursor: pointer;
                    background-image: url(http://s2.music.126.net/style/web2/img/frame/playlist.png?d6913329a522b876085665a29d80b789);
                    background-position: -195px 9px;
                }
            }
        }
        .hj-playList-content {
            background: #212121;
        }
    }
    .hj-playList-content {
        display: flex;
        flex: 1;
        .hj-playList-listc {
            flex: 1 1 560px;
            overflow: auto;
            ul.hj-playList-list {
                li {
                    color: #ccc; 
                    background-color: rgba(0,0,0,0.3);
                    cursor: pointer;
                    display: flex;
                    justify-content: space-between;
                    padding: 2px 20px;
                    .playlist-icon {
                        width: 20px;
                        cursor: pointer;
                        border: none;
                        background-image: url(http://s2.music.126.net/style/web2/img/frame/playlist.png?d6913329a522b876085665a29d80b789);
                        background-color: transparent;
                    }
                    .delbtn {
                        background-position: -51px 0;
                        &:hover {
                            background-position: -51px 56px;
                        }
                    }

                }
                li.playing {
                    background-color: #121212;
                }
            }
        }
        .hj-playList-lyrics {
            flex: 0 0 420px;

        }

    }
    
    .musicList .playing{
        color: #00e09e;
    }
    .musicList_box h1{
        text-align: center;
        color: #000;
        height:3vh;
        line-height: 3vh;
        font-size: 1.2rem;
    }
    .musicList{
        overflow: auto;
        height: 25vh;
    }
    .musicList li{
        display: flex;
        justify-content: space-between;
        height:5vh;
        color: #000;
        border-top: 1px #999 solid;
        line-height: 5vh;
        font-size: 1.2rem;
    }
    .musicList li button{
        color: #000;
        margin-right: 1rem;
    }
    .musicList li b{
        flex:1;
        padding-left: 1rem;
        font-weight: normal;
    }
    .closeList{
        display: block;
        color: #000;
        text-align: center;
        line-height: 5vh;
        font-size: 1.2rem;
    }
</style>
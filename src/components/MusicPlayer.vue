<template>
    <div class="hj-player">
        <music-list></music-list>
        <ul class="hj-playbar">
            <li class="hj-playBar-playbtns">
                <button id="playBar-prevBtn" @click="prev()"></button>
                <button id="playBar-playBtn" v-if="!playbarState.isPlaying" @click="play()"></button>
                <button id="playBar-stopBtn" v-else @click="stop()"></button>
                <button id="playBar-nextBtn" @click="next()"></button>
            </li>
            <li class="hj-playBar-main">
                <h1 class="songName">{{getCurrentMusic.name}}</h1>
                <div class="progress">
                    <div class="start-time">{{ currentTimeFormat }}</div>
                    <div @click="changeTime($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)" ref="progressBar" class="progress-bar">
                        <div :style="{width: (currentSecond / durationSecond).toFixed(3)*100 + '%'}" class="now"></div>
                    </div>
                    <div class="end-time">{{ durationTimeFormat }}</div>
                </div>
            </li>
            <li class="hj-playBar-funcbtns">
                <button id="playBar-showList" :class="{show : isShowMusicList}" @click="toggleMusicList()"></button>                
            </li>
        </ul>
    </div>
</template>
<script>
    import MusicList from '@/components/MusicList'
    import {mapActions,mapGetters} from 'vuex'
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
                musicList: [{
                    id: '123',
                    name: "fuck",
                    avatar_url: "",
                    singer: {
                        id: '1',
                        name: 'adyden'
                    },
                    composer: {
                        id: '3',
                        name: 'fuck'
                    },
                    lyricist: {
                        id: '3',
                        name: 'fuck',
                    },
                    lyrics_url: "https://api.darlin.me/music/lyric/12/",
                    album: {
                        id: '5',
                        name: 'album test',
                        avatar_url: "",
                        songs: 12,
                    },
                    src: "http://data.5sing.kgimg.com/G104/M08/04/11/SJQEAFk2UD2AUCKVAIERS2toLx8306.mp3",
                    published_at: "2009-01-17T20:14:40Z"
                }, {
                    id: '123',
                    name: "miaomiao",
                    avatar_url: "",
                    singer: {
                        id: '1',
                        name: 'adyden'
                    },
                    composer: {
                        id: '3',
                        name: 'fuck'
                    },
                    lyricist: {
                        id: '3',
                        name: 'fuck',
                    },
                    lyrics_url: "https://api.darlin.me/music/lyric/12/",
                    album: {
                        id: '5',
                        name: 'album test',
                        avatar_url: "",
                        songs: 12,
                    },
                    src: "http://data.5sing.kgimg.com/G104/M09/1C/1D/qA0DAFk1fVGAGWkMAOMuQpygo8g155.mp3",
                }]
            }
        },
        computed: {
            ...mapGetters([
                'getCurrentMusic',
                'getPlayerDOM', 
                'getMusicList',
                'currentSecond', 
                'currentTimeFormat', 
                'durationSecond',
                'durationTimeFormat',
                'nextSong',
                'prevSong',
                'isShowMusicList',
            ]),
        },
        components:{
            MusicList
        },
        methods: {
            ...mapActions(['toggleMusicList', 'initSong','playSong', 'pauseSong']),
            play() {
                if(Object.getOwnPropertyNames(this.getCurrentMusic).length == 1) {
                    this.playbarState.isPlaying = true
                    this.$store.dispatch('initSong', this.nextSong);
                    this.$store.dispatch('playSong');
                } else {
                    this.playbarState.isPlaying = true
                    this.$store.dispatch('playSong');
                    console.log("now playing")
                }
            },
            stop() {
                this.playbarState.isPlaying = false
                this.$store.dispatch('pauseSong');
                console.log("now stop")
            },
            prev() {
                this.playbarState.isPlaying = true
                this.$store.dispatch('initSong', this.prevSong);
                this.$store.dispatch('playSong');   
            },
            next() {
                this.playbarState.isPlaying = true
                this.$store.dispatch('initSong', this.nextSong);
                this.$store.dispatch('playSong');                
            },
            changeTime(event) {
                let progressBar = this.$refs.progressBar;
                let coordStart = progressBar.getBoundingClientRect().left;
                let coordEnd = event.pageX;
                this.getPlayerDOM.currentTime = (coordEnd - coordStart) / progressBar.offsetWidth * this.durationSecond;
                this.$store.dispatch('playSong'); 
            },
        },
    }
</script>
<style lang="scss" scoped>
.hj-player {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    bottom: 0;
    padding: 0;
    margin: auto;
    background-color: transparent;
    width: 100%;
    box-sizing: border-box;
    ul.hj-playbar {
        display: flex;
        box-sizing: border-box;
        padding: 10px 50px;
        align-items: center;
        width: 100%;
        margin: auto;
        background-color: #1d1d1d;
        li.hj-playBar-playbtns {
            flex:0 0 100px;
            button {
                width: 30px;
                height: 30px;
                border: none;
                background-image: url(http://gtms03.alicdn.com/tps/i3/T1bMh.FxNXXXb_r3IF-72-730.png);
                background-color: transparent;
                cursor: pointer;

                &:focus {
                    outline: none;
                }
            }
            #playBar-prevBtn {
                background-position: 0 -90px;
            }
            #playBar-playBtn {

            }
            #playBar-stopBtn {
                background-position: 0 -30px;
            }
            #playBar-nextBtn {
                background-position: 0 -60px;
            }
        }
        li.hj-playBar-main {
            flex: 1;
            h1 {
                font-family: "Helvetica Neue","Hiragino Sans GB","Microsoft Yahei",Helvetica,Arial,sans-serif;
            }
            .progress {
                display: flex;
                justify-content: center;
                align-items: center;

                    color: #fff;
                    opacity: .3;
                .progress-bar {
                    position: relative;
                    width: 50%;
                    height: 5px;
                    background-color: hsla(0,0%,100%,.5);
                    border-radius: 3px;
                    margin: 0 20px;
                    cursor: pointer;
                }
                .now {
                    position: absolute;
                    left: 0;
                    display: inline-block;
                    max-width: 100%;
                    height: 5px;
                    background-color: #31c27c;  
                }
            }
        }
        li.hj-playBar-funcbtns {
            flex: 0 0 100px;
            #playBar-showList {
                border: none;
                width: 30px;
                height: 30px;
                overflow: hidden;
                cursor: pointer;
                background-image: url(http://s2.music.126.net/style/web2/img/frame/playbar.png?d64aec0f5b1842762a54cab817ba6d81);
                background-position: -42px -64px;
                background-color: transparent;
            }
            #playBar-showList.show {
                background-position: -42px -98px;
            }
        }
    }
}

</style>

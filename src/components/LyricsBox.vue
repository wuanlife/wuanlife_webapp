<template>
    <div class="hj-lyricsbox">
        <div id="lyric">
            <p class="lyric-item" v-for="v in currentLyric">{{v}}</p>
        </div>        
    </div>
</template>
<script>
    import {mapActions,mapGetters} from 'vuex'
    import Base64 from '../util/base64'
    export default{
        props: ['currentSecond', 'music'],
        data(){
            return{
                lyric: null,
            }
        },
        components:{
            
        },
        methods: {
            ...mapActions(['toggleMusicList']),
            
        },
        computed: {
            ...mapGetters(['playBtnClass','duration','songImg','songInfo']),
            currentLyric: function () {
                let self = this;
                if (this.lyric !== null) {
                    let that = this
                    let pastLyric = []
                    Object.keys(this.lyric).forEach(function (key) {
                        let keyArray = key.split(':');
                        let keySecond = parseInt(keyArray[0])*60 + parseFloat(keyArray[1])
                        let isNow = keySecond <= self.currentSecond
                        if (isNow) {
                            pastLyric.push(that.lyric[key])
                        }
                    })
                    return pastLyric.slice(pastLyric.length - 4, pastLyric.length - 1)
                }
            },
        },
        watch: {
            music: function (newmusic) {
                let self = this;
                this.$store.dispatch('getLyric_url', newmusic.lyrics_url)
                    .then(function(responce) {
                        console.dir(response)
                        self.lyric = {
                            lyric: "W3RpOkxPVkVdClthcjpCRVlPTkRdClthbDozMDMyODFdCltieTpdCltvZmZzZXQ6MF0KWzAwOjAwLjEwXUxvdmUgLSBCRVlPTkQKWzAwOjAwLjIwXeivje+8muWPtuS4luiNowpbMDA6MDAuMzBd5puy77ya5Y+25LiW6I2jClswMDowMC40MF0KWzAwOjI3LjI2XeS8oOadpeeahOWjsOmfs+WlveeGn+aCiQpbMDA6MzAuNTFd5LiA5Liq5Lq65aW95YOP5Zyo5qKm6YeMClswMDozMy43M10KWzAwOjM0LjgwXeS4gOebtOWcqOaDs+W/teS9oApbMDA6MzguMzJdClswMDo0MC4wOF3ov5zmlrnnmoTkvaDkuI3opoHlk63ms6MKWzAwOjQzLjMzXeWboOS4uuaIkeS7juadpeayoeaVheaEjwpbMDA6NDcuNjZd5Lyk5a6z5LqG5L2g55qE5b+DClswMDo1MS41N10KWzAwOjUzLjY4XeS9oOacgOeIsemXruaIkQpbMDA6NTYuOTFd5LuA5LmI5pe25YCZ5Y+v5Lul6Zmq5Ly0552A5L2gClswMTowNS42OV0KWzAxOjA2LjU5XeS9oOWvueaIkeivtOi/hwpbMDE6MDkuODhd5LiN6IO95YWl552hIOWkque0rwpbMDE6MTQuMjJd5LiA5Liq5Lq65aSq56m66JmaClswMToxOC4zMV0KWzAxOjE5LjU4Xei9u+i9u+eahOWRvOWQuCDlnKjogLPovrkKWzAxOjI2LjAwXeS9oOaYr+WQpuW3sumZtumGieWcqOaAgOmHjApbMDE6MzAuODVdClswMTozMi42N13mvKvmvKvplb/lpJzph4wg5oul5oqx5L2gClswMTozOC45N13miJHlj6rmg7Plr7nkvaDor7QKWzAxOjQzLjU2XUkgTE9WRSBZT1UKWzAxOjQ3LjEzXQpbMDI6MTEuNTZd6L276L2755qE5ZG85ZC4IOWcqOiAs+i+uQpbMDI6MTcuOTFd5L2g5piv5ZCm5bey6Zm26YaJ5Zyo5oCA6YeMClswMjoyMy4xMF0KWzAyOjI0LjQzXea8q+a8q+mVv+WknOmHjCDmi6XmirHkvaAKWzAyOjMwLjgwXeaIkeWPquaDs+WvueS9oOivtApbMDI6MzUuMjNdClswMjozNi45N13kvKDmnaXnmoTlo7Dpn7Plpb3nhp/mgokKWzAyOjQwLjE0XeS4gOS4quS6uuWlveWDj+WcqOaipumHjApbMDI6NDMuODNdClswMjo0NC4zOF3kuIDnm7TlnKjmg7Plv7XkvaAKWzAyOjQ4LjIzXQpbMDI6NDkuODhd6L+c5pa555qE5L2g5LiN6KaB5ZOt5rOjClswMjo1My4xMl3lm6DkuLrmiJHku47mnaXmsqHmlYXmhI8KWzAyOjU3LjE5XeS8pOWus+S6huS9oOeahOW/gwpbMDM6MDEuMTZdClswMzowMy4yNV3kvaDmnIDniLHpl67miJEKWzAzOjA2LjU2XeS7gOS5iOaXtuWAmeWPr+S7pemZquS8tOedgOS9oApbMDM6MTUuMTZdClswMzoxNi4yOV3kvaDlr7nmiJHor7Tov4cKWzAzOjE5LjQ4XeS4jeiDveWFpeedoSDlpKrntK8KWzAzOjI0LjE3XeS4gOS4quS6uuWkquepuuiZmgpbMDM6MjguMTZdClswMzoyOS4zMl3ovbvovbvnmoTlkbzlkLgg5Zyo6ICz6L65ClswMzozNS42Nl3kvaDmmK/lkKblt7LpmbbphonlnKjmgIDph4wKWzAzOjQwLjY0XQpbMDM6NDIuMzFd5ryr5ryr6ZW/5aSc6YeMIOaLpeaKseS9oApbMDM6NDguNDJd5oiR5Y+q5oOz5a+55L2g6K+0ClswMzo1Mi43Nl0KWzAzOjUzLjMzXUkgTE9WRSBZT1U="
                        }
                        /*
                        this.lyric = Base64
                            .decode(responce.data.lyric)
                            .split('[')
                            .slice(5)
                            .map(str => {
                                let t = str.split(']')
                                return {[t[0]]: t[1]}
                            })
                            .reduce((a, b) => {
                                return {...a, ...b}
                            })
                        */
                        return this.lyric;
                    })
                    .catch(function(error) {
                        self.lyric = {
                            lyric: "W3RpOkxPVkVdClthcjpCRVlPTkRdClthbDozMDMyODFdCltieTpdCltvZmZzZXQ6MF0KWzAwOjAwLjEwXUxvdmUgLSBCRVlPTkQKWzAwOjAwLjIwXeivje+8muWPtuS4luiNowpbMDA6MDAuMzBd5puy77ya5Y+25LiW6I2jClswMDowMC40MF0KWzAwOjI3LjI2XeS8oOadpeeahOWjsOmfs+WlveeGn+aCiQpbMDA6MzAuNTFd5LiA5Liq5Lq65aW95YOP5Zyo5qKm6YeMClswMDozMy43M10KWzAwOjM0LjgwXeS4gOebtOWcqOaDs+W/teS9oApbMDA6MzguMzJdClswMDo0MC4wOF3ov5zmlrnnmoTkvaDkuI3opoHlk63ms6MKWzAwOjQzLjMzXeWboOS4uuaIkeS7juadpeayoeaVheaEjwpbMDA6NDcuNjZd5Lyk5a6z5LqG5L2g55qE5b+DClswMDo1MS41N10KWzAwOjUzLjY4XeS9oOacgOeIsemXruaIkQpbMDA6NTYuOTFd5LuA5LmI5pe25YCZ5Y+v5Lul6Zmq5Ly0552A5L2gClswMTowNS42OV0KWzAxOjA2LjU5XeS9oOWvueaIkeivtOi/hwpbMDE6MDkuODhd5LiN6IO95YWl552hIOWkque0rwpbMDE6MTQuMjJd5LiA5Liq5Lq65aSq56m66JmaClswMToxOC4zMV0KWzAxOjE5LjU4Xei9u+i9u+eahOWRvOWQuCDlnKjogLPovrkKWzAxOjI2LjAwXeS9oOaYr+WQpuW3sumZtumGieWcqOaAgOmHjApbMDE6MzAuODVdClswMTozMi42N13mvKvmvKvplb/lpJzph4wg5oul5oqx5L2gClswMTozOC45N13miJHlj6rmg7Plr7nkvaDor7QKWzAxOjQzLjU2XUkgTE9WRSBZT1UKWzAxOjQ3LjEzXQpbMDI6MTEuNTZd6L276L2755qE5ZG85ZC4IOWcqOiAs+i+uQpbMDI6MTcuOTFd5L2g5piv5ZCm5bey6Zm26YaJ5Zyo5oCA6YeMClswMjoyMy4xMF0KWzAyOjI0LjQzXea8q+a8q+mVv+WknOmHjCDmi6XmirHkvaAKWzAyOjMwLjgwXeaIkeWPquaDs+WvueS9oOivtApbMDI6MzUuMjNdClswMjozNi45N13kvKDmnaXnmoTlo7Dpn7Plpb3nhp/mgokKWzAyOjQwLjE0XeS4gOS4quS6uuWlveWDj+WcqOaipumHjApbMDI6NDMuODNdClswMjo0NC4zOF3kuIDnm7TlnKjmg7Plv7XkvaAKWzAyOjQ4LjIzXQpbMDI6NDkuODhd6L+c5pa555qE5L2g5LiN6KaB5ZOt5rOjClswMjo1My4xMl3lm6DkuLrmiJHku47mnaXmsqHmlYXmhI8KWzAyOjU3LjE5XeS8pOWus+S6huS9oOeahOW/gwpbMDM6MDEuMTZdClswMzowMy4yNV3kvaDmnIDniLHpl67miJEKWzAzOjA2LjU2XeS7gOS5iOaXtuWAmeWPr+S7pemZquS8tOedgOS9oApbMDM6MTUuMTZdClswMzoxNi4yOV3kvaDlr7nmiJHor7Tov4cKWzAzOjE5LjQ4XeS4jeiDveWFpeedoSDlpKrntK8KWzAzOjI0LjE3XeS4gOS4quS6uuWkquepuuiZmgpbMDM6MjguMTZdClswMzoyOS4zMl3ovbvovbvnmoTlkbzlkLgg5Zyo6ICz6L65ClswMzozNS42Nl3kvaDmmK/lkKblt7LpmbbphonlnKjmgIDph4wKWzAzOjQwLjY0XQpbMDM6NDIuMzFd5ryr5ryr6ZW/5aSc6YeMIOaLpeaKseS9oApbMDM6NDguNDJd5oiR5Y+q5oOz5a+55L2g6K+0ClswMzo1Mi43Nl0KWzAzOjUzLjMzXUkgTE9WRSBZT1U="
                        }
                        self.lyric = Base64
                            .decode(self.lyric.lyric)
                            .split('[')
                            .slice(5)
                            .map(str => {
                                let t = str.split(']')
                                return {[t[0]]: t[1]}
                            })
                            .reduce((a, b) => {
                                return {...a, ...b}
                            })
                        self.$store.commit('GETLYRIC', self.lyric)
                        return self.lyric
                    })
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>

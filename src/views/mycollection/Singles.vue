<template>
    <div id="profile">
        <el-table
            :data="tableData"
            style="width: 100%"
            @row-click="handleClick">
            <el-table-column
                prop="name"
                label="song's name">
            </el-table-column>
            <el-table-column
                prop="singer.name"
                label="author"
                width="200">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="operations"
                width="200">
                <template scope="scope">
                    <el-button class="addToList" type="text" size="small">add to List</el-button>
                    <el-button class="like" type="text" size="small">like</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import util from 'util'
import {mapActions,mapGetters} from 'vuex'
export default {
    data () {
        return {
            tableData: [{
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
    methods: {
        ...mapActions(['addSongToList']),
        onSubmit() {
            console.log('submit!');
        },
        handleClick(row, event, column) {
            console.dir(row)
            if("addTolist".indexOf(event.target.classList) != -1) {
                this.addMusicToList(util.getPureObj(row))
            } else if("like".indexOf(event.target.classList) != -1) {
                like(util.getPureObj(row))
            }
            console.dir(event)
            if(event.target)
            console.log(row.id);
            
        },
        addMusicToList(music) {
            this.addSongToList(music)
        }
    }
}
</script>

<style lang="scss" scoped>
#current {
    display: flex;
    max-width: 1000px;
    margin: 50px auto;
}
</style>

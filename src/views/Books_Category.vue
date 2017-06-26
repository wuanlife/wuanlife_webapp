<template>
    <div class="section ">
        <div class="section-title">
            <h1>{{ title }}</h1>
        </div>
        <div class="section-content">
            <div id="book-123" class="book-entry">
                <img class="book-entry-thumbnail" src="https://img1.doubanio.com/spic/s29372139.jpg">
                <div class="book-entry-intro">
                    <h1>play snake</h1>
                    <h2>Yuyi Liang / 2017-5-29 / adoubi </h2>
                    <p>A book which can teach you how to play snake.</p>
                </div>
            </div>
            <div id="book-124" class="book-entry">
                <img class="book-entry-thumbnail" src="https://img1.doubanio.com/spic/s29372139.jpg">
                <div class="book-entry-intro">
                    <h1>play snake</h1>
                    <h2>Yuyi Liang / 2017-5-29 / adoubi </h2>
                    <p>A book which can teach you how to play snake.</p>
                </div>
            </div>
            <div id="book-125" class="book-entry">
                <img class="book-entry-thumbnail" src="https://img1.doubanio.com/spic/s29372139.jpg">
                <div class="book-entry-intro">
                    <h1>play snake</h1>
                    <h2>Yuyi Liang / 2017-5-29 / adoubi </h2>
                    <p>A book which can teach you how to play snake.</p>
                </div>
            </div>
        </div>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage1"
            :page-size="100"
            layout="total, prev, pager, next"
            :total="1000">
        </el-pagination>
    </div>
</template>
<script>
    export default {
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        },
        data() {
            return {
                title: "Computer Science",
                currentPage1: 5,
            };
        },
        mounted() {
            console.log(`this is in ${this.$route.params.category}`)
        },
        watch: {
            $route(curVal, oldVal) {
                console.log(`this is in ${this.$route.params.category}`);
            }
        }
    }
</script>

<style lang="scss" scoped>
.section-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 0 50px;
    border: 1px solid #eee;
}
.book-entry {
    display: flex;
    width: 100%;
    height: 150px;
    padding: 20px;
    &:not(:first-child) {
        border-top: 1px dashed #ddd;
    }
    img {
        width: 100px;
        height: 145px;
        padding: 0 15px;
    }
    .book-entry-intro {
        display: flex;
        flex-direction: column;
        h1 {
            text-align: left;
            margin: 0 0 0.5em 0;
            font-size: 1em;
        }
        h2 {
            text-align: left;
            margin: 0 0 0.5em 0;
            font-size: 0.75em;
        }
        p {
            flex: 1;
        }
    }
}
</style>

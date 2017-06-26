<template>
    <div>
        <el-tabs v-model="$route.name" @tab-click="handleClick">
            <el-tab-pane label="Profile" name="profile" data-tab="profile"></el-tab-pane>
            <el-tab-pane label="Settings" name="settings" data-tab="settings"></el-tab-pane>
        </el-tabs>
        <div class="books-content">
            <router-view></router-view>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            options: [{

            },{

            }]
        };
    },
    methods: {
        handleClick(tab, event) {
            this.$router.push({ path: `/personal/${tab.$el.getAttribute('data-tab')}` });
        }
    },
};
</script>


<style lang="scss" scoped>
#books {
    display: flex;
}
.books-categories {
    height: 100%;
    p {
        display: inline-block;
        margin: auto;
    }
}
.category {
    display: flex;
    justify-content: center;
    align-items: center;
}
.books-sidebar {
    width: 180px;
}
.books-content {
}
</style>
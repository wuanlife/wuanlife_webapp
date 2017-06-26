<template>
    <div id="profile">
        <div class="profile-avatar">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496137367529&di=0053aa17672b88f114980053338a172a&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F42166d224f4a20a4a15a40e59a529822720ed048.jpg">
            <div class="profile-avatar-change">
                <i class="el-icon-menu"></i>
                <p>change</p>
            </div>
        </div>
        <div class="profile-details">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="email">
                    <el-input v-model="form.email" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="nickname">
                    <el-input v-model="form.nickname"></el-input>
                </el-form-item>
                <el-form-item label="birthday">
                    <el-date-picker type="date" placeholder="chose your birthday" v-model="form.birthday" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="gender">
                    <el-radio-group v-model="form.gender">
                        <el-radio label="male"></el-radio>
                        <el-radio label="female"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">Save</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            form: {
                email: '443474713@qq.com',
                nickname: 'lwio',
                gender: '',
                birthday: '',
            },
        } 
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        }
    }
}
</script>

<style lang="scss" scoped>
#profile {
    display: flex;
    max-width: 1000px;
    margin: 50px auto;
}
.profile-avatar {
    img {
        width: 120px;
        height: 120px;
        border-radius: 60px;
    }
    .profile-avatar-change {
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
}
.profile-details {
    flex: 1;
}
</style>

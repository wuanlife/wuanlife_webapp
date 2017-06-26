<template>
    <div id="settings">
        <div class="settings-form">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="email">
                    <el-switch
                        v-model="form.test1"
                        on-text=""
                        off-text=""
                        @change="onStatusChange">
                    </el-switch>
                </el-form-item>
                <el-form-item label="nickname">
                    <el-switch
                        v-model="form.test2"
                        on-text=""
                        off-text=""
                        @change="onStatusChange">
                    </el-switch>
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
                test1: true,
                test2: false,
            },
        } 
    },
    methods: {
        onStatusChange(newvalue) {
            console.log('status changed!' + newvalue);
        }
    }
}
</script>

<style lang="scss" scoped>
.settings-form {
    width: 300px;
}
</style>

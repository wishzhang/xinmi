<template>
    <basic-container>
        <van-nav-bar left-arrow
                     left-text="设置"
                     @click-left="onClickLeft"/>
        <van-cell
                title="邮箱"
                :value="userInfo.emailAddress"
                is-link
                :to="{path: '/index-layout/email-setting'}">
        </van-cell>
        <van-cell
                title="密码"
                value="修改密码"
                is-link
                :to="{path: '/index-layout/password-setting'}">
        </van-cell>
        <van-button @click="onLoginOut" style="position: absolute;bottom:30px;" block type="default">退出登录</van-button>
    </basic-container>
</template>

<script>
    import {socket} from "../util/socket";
    import {mapGetters} from 'vuex';

    export default {
        name: "setting",
        computed: {
            ...mapGetters(['userInfo'])
        },
        methods: {
            onLoginOut() {
                this.$store.dispatch('Logout').then(() => {
                    if (socket !== null) {
                        socket.emit('sessionOff', {account: this.userInfo.username})
                        socket.disconnect();
                    }
                    this.$router.push({path: '/login'});
                })
            },
            onClickLeft() {
                history.back();
            }
        }
    }
</script>

<style scoped>

</style>

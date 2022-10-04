import Vue from "vue";

/**
 * 判断按钮是否有权限
 */

//Vue.mixin 全局方法
Vue.mixin({
    methods: {
        hasAuth(perm){
            var authority = this.$store.state.menus.permList
            //获取权限列表
            console.log(authority)
            return authority.indexOf(perm) > -1

        //    判断是否在权限列表里面

        }

    }

    }
)
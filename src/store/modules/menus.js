import Vue from 'vue'
import Vuex from 'vuex'
import fa from "element-ui/src/locale/lang/fa";

Vue.use(Vuex)

//状态管理器
export default {
    state: {
        menuList: [],
        permList: [],
        hasRoute: false,

        editableTabsValue: 'Index',
        editableTabs: [{
            title: '首页',
            name: 'Index',
        }],
    },
    mutations: {
        resetState:(state) =>{
            state.menuList=[];
            state.permList=[];
            state.hasRoute=false;
            state.editableTabsValue='Index';
            state. editableTabs= [{
                title: '首页',
                name: 'Index',
            }];

        },
        setMenuList(state,menus){
            state.menuList =  menus
        },
        setPermList(state,perms){
            state.permList =  perms
        },
        changeRouteStatus (state,hasRoute){
            state.hasRoute = hasRoute

            sessionStorage.setItem("hasRoute",hasRoute)
        },
        //添加标签
        addTab(state,tab) {

            //判断是否已经存在标签
            let index = state.editableTabs.findIndex(e =>e.name === tab.name)

            if (index === -1 ){
                state.editableTabs.push({
                    title: tab.title,
                    name: tab.name,
                });
            }

            state.editableTabsValue =  tab.name;
        },

    },
    actions: {
    },
}


// const constantRouterComponents = {
//
// }

// 前端未找到页面路由（固定不用改）
import {MenusAdminType} from "@/api/menus_admin";
import {BasicLayout, RouteViewLayout} from "@/layouts";
import router from "@/router/index";
import {tabsKeyMap, TabsObj} from "@/config/tabs.config";
import {useUserInfo} from "@/store/userInfo";
import {myRouterMap} from "@/config/router.config";

const modules = import.meta.glob('../views/*/*.vue')
const lauModules = import.meta.glob('../layouts/RouteViewLayout.vue')
const notFoundRouter =     {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        hidden: true
    }



// 根级菜单
const rootRouter = {
    path: '/',
    name: '/',
    component: BasicLayout ,
    redirect: "/dashboard",
    breadcrumbName:'首页',
    meta: { title: '仪表盘', icon: 'DashboardOutlined'},
    statusFlag: 2,
    children: [] as any[]
}
export function GeneratorDynamicRouter(data:MenusAdminType[]) {
    const menuNav = generator(data);
    rootRouter.children = menuNav;
    myRouterMap.push(rootRouter)

    router.addRoute("", rootRouter);
    router.addRoute("",     {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
    });
    generatorTabs(data,[],"",tabsKeyMap);
    console.log("tabsKeyMap",tabsKeyMap)
}
const generator = (routerMap:MenusAdminType[]) => {
  return   routerMap.map(item => {
        const currentRouter = {
            path: item.path,
            name: item.identifier,
            breadcrumbName:item.breadcrumbName,
            statusFlag: item.statusFlag,
            meta: { title: item.name, icon: item.icon,type:item.type },
        }
        currentRouter.component = lauModules['../layouts/RouteViewLayout.vue'];
        if (item.component&&item.component.length>0) {
            currentRouter.component = modules[`..${item.component}`];
           // currentRouter.component = (() => import(`@/${item.component}`));
        }
        if (item.redirect&&item.redirect.length>0) {
            currentRouter.redirect = item.redirect
        }
        if (item.children && item.children.length > 0) {
            // Recursion
            currentRouter.children = generator(item.children)
        }
        return currentRouter
    })
}

const generatorTabs = (routerMap:MenusAdminType[],parents:string[],pkey:string,rest:TabsObj[]) => {

  return   routerMap.map(item => {
      let temp = parents.slice(0)
      const currentRouter = {
          key:item.identifier,
          title: item.name,
          path:item.path,
          breadcrumbName:item.breadcrumbName,
          parent:temp,
          pkey:""
      }

      if (item.component&&item.component.length>0) {
          currentRouter.pkey = pkey
      }
      if (item.children && item.children.length > 0) {
          let nowTemp = temp.slice(0)
          nowTemp.push(item.identifier as string)
          generatorTabs(item.children,nowTemp,item.identifier as string,rest)
      }
      rest.push(currentRouter)
    })
}
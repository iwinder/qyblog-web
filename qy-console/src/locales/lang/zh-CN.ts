import antd from 'ant-design-vue/es/locale-provider/zh_CN'
// import moment from "moment"
import  'moment/dist/locale/zh-cn'
// moment.locale('zh-cn')

const components = {
    antLocale: antd,
    momentName: 'zh-cn',
    momentLocale:  'zh-cn'
}

export default {
    message: '-',

    'layouts.usermenu.dialog.title': '信息',
    'layouts.usermenu.dialog.content': '您确定要注销吗？',
    'layouts.userLayout.title': 'Ant Design 是西湖区最具影响力的 Web 设计规范',
    ...components,
}

export const MenusAdminColumns = [
    // {
    //     title: '角色ID',
    //     dataIndex: 'id',
    //     key: 'id',
    // },
    {
        title: '展示名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '标签页名称',
        dataIndex: 'breadcrumbName',
        key: 'breadcrumbName',
    },
    {
        title: '图标',
        dataIndex: 'icon',
        key: 'icon',
    },
    {
        title: '路由名称',
        dataIndex: 'identifier',
        key: 'identifier',
    },
    {
        title: '路由Path',
        dataIndex: 'path',
        key: 'path',
    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        fixed: 'right',
    },

];


export const MenusAdminTypeOptions = [
    {
        value:1,
        name: "菜单",
    },
    {
        value:2,
        name: "按钮",
    },
]
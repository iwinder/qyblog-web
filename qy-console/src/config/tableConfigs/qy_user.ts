export const UserCcolumns = [
    {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: '昵称',
        dataIndex: 'nickname',
        key: 'nickname',
    },

    {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: '用户角色',
        dataIndex: 'roles',
        key: 'roles',
    },
    {
        title: '账户状态',
        dataIndex: 'statusFlag',
        key: 'statusFlag',
    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        fixed: 'right',
    },

];
export const UserStates = [{
    value:-1,
    label:"请选择状态",
},{
    value:1,
    label:"启用",
},{
    value:2,
    label:"禁用",
}];



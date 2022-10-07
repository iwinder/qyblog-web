export const ApisCcolumns = [
    {
        title: 'Api路径',
        dataIndex: 'path',
        key: 'path',
    },
    {
        title: 'Api分组',
        dataIndex: 'apiGroup',
        key: 'apiGroup',
    },
    {
        title: 'Api简介',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Api请求',
        dataIndex: 'method',
        key: 'method',
    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        fixed: 'right',
    },
]

export const ApisGroupCcolumns = [
    {
        title: '分组名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '分组标识',
        dataIndex: 'identifier',
        key: 'identifier',
    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        fixed: 'right',
    },
]

export const ApisMethodOptions = [
    {
        value:"",
        label: "",
    },
    {
        value:"POST",
        label: "创建(POST)",
    },
    {
        value:"PUT",
        label: "更新(PUT)",
    },
    {
        value:"DELETE",
        label: "删除(DELETE)",
    },
    {
        value:"GET",
        label: "查询(GET)",
    },
]
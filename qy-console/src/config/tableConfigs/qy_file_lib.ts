export const FileLibColumns = [
    {
        title: '文件名',
        dataIndex: 'fname',
        key: 'fname',
        scopedSlots: { customRender: 'fname' },
    },
    {
        title: '原文件名',
        dataIndex: 'originFileName',
        key: 'originFileName',
    },
    {
        title: '文件类型',
        dataIndex: 'mimeType',
        key: 'mimeType',
    },
    {
        title: '文件大小',
        dataIndex: 'fsize',
        key: 'fsize',
        scopedSlots: { customRender: 'fsize' },
    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        fixed: 'right',
    },
]
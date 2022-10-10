import {FileLibType} from "@/api/file_lib_config";

export const FileLibTypeColumns = [
    {
        title: '媒体库名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '类型标识',
        dataIndex: 'identifier',
        key: 'identifier',
    },
    {
        title: '状态',
        dataIndex: 'statusFlag',
        key: 'statusFlag',
    },
    {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        fixed: 'right',
    },

];
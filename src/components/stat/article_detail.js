import React from 'react';
import { Table, Typography } from 'antd';

const { Link } = Typography;

let monthFilter = [];
let dayFilter = [];
for (let m = 1; m <= 12; m++) {
    monthFilter.push({ text: `${m}月`, value: m })
}
for (let d = 1; d <= 31; d++) {
    dayFilter.push({ text: `${d}日`, value: d })
}

const columns = [
    {
        title: '月份',
        dataIndex: 'month',
        key: 'month',
        filters: monthFilter,
        onFilter: (value, record) => record.month === value,
    },
    {
        title: '日',
        dataIndex: 'day',
        key: 'day',
        filters: dayFilter,
        onFilter: (value, record) => record.day === value,
    },
    {
        title: '日期',
        dataIndex: 'date',
        key: 'date'
    },
    {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        render: (text, record) => (
            <Link href={record.url} target="_blank">{text}</Link>
        )
    },
    {
        title: '阅读总量',
        dataIndex: 'int_page_read_count',
        key: 'int_page_read_count',
        sorter: (a, b) => a.int_page_read_count - b.int_page_read_count,
    },
    {
        title: '阅读用户数',
        dataIndex: 'int_page_read_user',
        key: 'int_page_read_user',
        sorter: (a, b) => a.int_page_read_user - b.int_page_read_user,
    },
    {
        title: '分享总量',
        dataIndex: 'share_count',
        key: 'share_count',
        sorter: (a, b) => a.share_count - b.share_count,
    },
    {
        title: '分享用户数',
        dataIndex: 'share_user',
        key: 'share_user',
        sorter: (a, b) => a.share_user - b.share_user,
    },
    {
        title: '朋友圈阅读人数',
        dataIndex: 'int_page_from_session_read_user',
        key: 'int_page_from_session_read_user',
        sorter: (a, b) => a.int_page_from_session_read_user - b.int_page_from_session_read_user,
    },
];

const ArticleDetail = (props) => {
    const { data } = props;

    return (
        <Table columns={columns} dataSource={data} />
    )
}

export default ArticleDetail;
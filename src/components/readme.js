import React from 'react';
import { Typography, Space } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
const { Paragraph, Link } = Typography;

const IconLink = ({ src, text }) => (
    <a className="example-link">
        <img className="example-link-icon" src={src} alt={text} />
        {text}
    </a>
);

const ReadMe = () => {
    return (
        <>
            <Paragraph>
                这是一个可以统计年终公众平台运营数据的工具。该工具完全开源，直接通过您的计算机与微信服务器进行通讯下载数据，不存在任何安全隐患！
            </Paragraph>
            <Paragraph style={{ margin: '10px' }}>
                <Typography.Title level={4}>使用条件:</Typography.Title>
                <Paragraph>
                    微信公众号必须通过企业/单位认证，也就是交300元的那个。（个人认证无法使用）
                </Paragraph>
                <Paragraph>
                    你必须至少是长期运营者（可以扫码登录不需要管理员审批）才能完成该操作
                </Paragraph>
                <Paragraph>
                    你必须知道开发者密钥
                </Paragraph>
            </Paragraph>
            <Space style={{ margin: '10px' }}>
                <GithubOutlined style={{ fontSize: '20px', color: '#1890ff' }} />
                <Link src="https://github.com/chenzibin2019/mpannual-antd">GitHub</Link>
            </Space>
        </>
    )
}

export default ReadMe;
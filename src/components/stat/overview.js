import React from 'react';
import { Alert, Divider, Statistic, Row, Col, Typography } from 'antd';
import { FieldTimeOutlined, FileDoneOutlined, EyeOutlined } from '@ant-design/icons'
const { Title, Link } = Typography;

const OverView = (props) => {
    const { config, analytics } = props;

    console.log(config, analytics);
    const report_digest = `${config.year}年${config.account_name ?? ''}公众号共计运营 ${analytics.running_days} 天，累计发布消息 ${analytics.article_count}条，全年总阅读量 ${analytics.read_count}`

    return (
        <>
            <Alert
                description={report_digest}
                type="success"
            />
            <Divider />
            <Title level={2}>全年运营数据</Title>
            <Row gutter={16}>
                <Col span={10}>
                    <Statistic title="运营天数" value={analytics.running_days} prefix={<FieldTimeOutlined />} />
                </Col>
                <Col span={10}>
                    <Statistic title="发布图文条数" value={analytics.article_count} prefix={<FileDoneOutlined />} />
                </Col>
                <Col span={10}>
                    <Statistic title="全年总阅读量" value={analytics.read_count} prefix={<EyeOutlined />} />
                </Col>
                <Col span={10}>
                    <Statistic title="平均单篇阅读量" value={analytics.read_count / analytics.article_count} precision={2} prefix={<EyeOutlined />} />
                </Col>
            </Row>

            <Divider />
            <Title level={2}>单篇阅读分析</Title>
            <Row gutter={16}>
                <Col span={16}>
                    <Statistic title="最高阅读文章" suffix={<Link href={analytics.max_article_url} target="_blank">点击阅读</Link>} value={analytics.max_article} />
                </Col>
                <Col span={10}>
                    <Statistic title="最高阅读量" value={analytics.max_read_count} />
                </Col>
                <Col span={10}>
                    <Statistic title="发布日期" value={analytics.max_article_day} />
                </Col>
            </Row>
            <Divider />
            <Title level={2}>单日阅读分析</Title>
            <Row gutter={16}>
                <Col span={10}>
                    <Statistic title="单日最高阅读量" value={analytics.max_daily_reading} />
                </Col>
                <Col span={10}>
                    <Statistic title="日期" value={`${analytics.max_daily_read_day.month} - ${analytics.max_daily_read_day.day}`} />
                </Col>
                <Col span={16}>
                    <Statistic title="当日头条" suffix={<Link href={analytics.max_daily_read_url} target="_blank">点击阅读</Link>} value={analytics.max_daily_read_headline} />
                </Col>
            </Row>
            <Divider />
            <Title level={2}>分享数据分析</Title>
            <Row gutter={16}>
                <Col span={10}>
                    <Statistic title="最高分享数量" value={analytics.max_sharing_count} />
                </Col>
                <Col span={16}>
                    <Statistic title="最高分享文章" suffix={<Link href={analytics.max_sharing_article_url} target="_blank">点击阅读</Link>} value={analytics.max_sharing_article} />
                </Col>
            </Row>
        </>
    )
}

export default OverView;
import React from 'react';
import { Descriptions, Alert, Divider, Statistic, Row, Col } from 'antd';

const FollowerDigest = (props) => {
    const { follower_data, initial_followers, final_followers } = props;

    console.log(follower_data);

    const digest_list = follower_data.map((item, index) => {
        return (
            <Descriptions.Item key={index} label={item.scene_name}>
                <p>新增：{item.inc}</p>
                <p>取关：{item.dec}</p>
            </Descriptions.Item>
        )
    });

    return (
        <>
            <Row gutter={18}>
                <Col span={6}>
                    <Statistic title="年初粉丝数" value={initial_followers} />
                </Col>
                <Col span={6}>
                    <Statistic title="年末粉丝数" value={final_followers} />
                </Col>
                <Col span={6}>
                    <Statistic title="净增用户数" value={final_followers - initial_followers} />
                </Col>
            </Row>
            <Divider />
            <Descriptions title="粉丝增长渠道" layout="vertical" bordered>
                {digest_list}
            </Descriptions>
            <Divider />
            <Alert
                type="info"
                message="说明：取关数表示这一年中，有这么多从该渠道关注的用户取关了"
            />
        </>
    )
}

export default FollowerDigest;
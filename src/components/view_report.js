import React from 'react';
import { Tabs } from 'antd';

import OverView from './stat/overview';
import Article from './stat/article';
import ArticleDetail from './stat/article_detail';
import Follower from './stat/follower';
import Message from './stat/message';
import FollowerDigest from './stat/follower_digest';

const { TabPane } = Tabs;

const ViewReport = (props) => {
    const { config, statics } = props;

    return (
        <Tabs defaultActiveKey="1">
            <TabPane tab="基础数据" key="1">
                <OverView
                    config={config}
                    analytics={statics.analytics_data}
                />
            </TabPane>
            <TabPane tab="文章数据" key="2" >
                <Article
                    article_plot_data={statics.analytics_data.article_plot_data}
                    article_share_plot_data={statics.analytics_data.article_share_plot_data}
                    article_target_user_plot_data={statics.analytics_data.article_target_user_plot_data}
                />
            </TabPane>
            <TabPane tab="文章详情" key="3" >
                <ArticleDetail
                    data={statics.analytics_data.report_article}
                />
            </TabPane>
            <TabPane tab="粉丝数据" key="4" >
                <Follower
                    follower_data={statics.raw_data.cumulate_user_data}
                />
            </TabPane>
            <TabPane tab="粉丝增长" key="5" >
                <FollowerDigest
                    follower_data={statics.analytics_data.user_subscribe_digest}
                    initial_followers={statics.raw_data.initial_followers}
                    final_followers={statics.raw_data.final_followers}
                />
            </TabPane>
            <TabPane tab="互动数据" key="6" >
                <Message
                    message_user={statics.analytics_data.message_user_plot_data}
                    message_count={statics.analytics_data.message_count_plot_data}
                />
            </TabPane>
        </Tabs>
    );
};

export default ViewReport;
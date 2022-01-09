import React from 'react';
import MyChart from './chart';

const Article = (props) => {
    const { article_plot_data, article_share_plot_data, article_target_user_plot_data } = props;
    const labels = Object.keys(article_share_plot_data);

    const scales = {
        article_sent: {
            type: 'linear',
            display: true,
            position: 'left',
        },
        article_read: {
            type: 'linear',
            display: true,
            position: 'left',
        },
        article_share: {
            type: 'linear',
            display: true,
            position: 'right',
        }
    };

    const data = {
        labels,
        datasets: [
            {
                label: '文章发送人数',
                data: labels.map((e) => article_target_user_plot_data[e]),
                borderColor: '#1890ff',
                backgroundColor: '#1890ff',
                yAxisID: 'article_share',
            },
            {
                label: '文章阅读人数',
                data: labels.map((e) => article_plot_data[e]),
                borderColor: '#9254de',
                backgroundColor: '#9254de',
                yAxisID: 'article_share',
            },
            {
                label: '文章分享人数',
                data: labels.map((e) => article_share_plot_data[e]),
                borderColor: '#52c41a',
                backgroundColor: '#52c41a',
                yAxisID: 'article_share',
            }
        ],
    };
    return (
        <MyChart
            data={data}
            scales={scales}
        />
    )
}

export default Article;
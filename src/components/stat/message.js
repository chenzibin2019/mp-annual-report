import React from 'react';
import MyChart from './chart';

const Follower = (props) => {
    const { message_count, message_user } = props;
    const labels = Object.keys(message_count);

    const scales = {
        message_count: {
            type: 'linear',
            display: true,
            position: 'left',
        },
        message_user: {
            type: 'linear',
            display: true,
            position: 'right',
        }
    };

    const data = {
        labels,
        datasets: [
            {
                label: '消息数',
                data: labels.map((e) => message_count[e]),
                borderColor: '#1890ff',
                backgroundColor: '#1890ff',
                yAxisID: 'message_count',
            },
            {
                label: '发送人数',
                data: labels.map((e) => message_user[e]),
                borderColor: '#73d13d',
                backgroundColor: '#73d13d',
                yAxisID: 'message_user',
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

export default Follower;
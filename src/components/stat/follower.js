import React from 'react';
import MyChart from './chart';

const Follower = (props) => {
    const { follower_data } = props;
    const labels = Object.keys(follower_data);

    const scales = {
        follower: {
            type: 'linear',
            display: true,
            position: 'left',
        }
    };

    const data = {
        labels,
        datasets: [
            {
                label: '粉丝数',
                data: labels.map((e) => follower_data[e]),
                borderColor: '#1890ff',
                backgroundColor: '#1890ff',
                yAxisID: 'follower',
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
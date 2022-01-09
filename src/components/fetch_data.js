import React, { useState } from 'react';
import { Result, Button, Progress, message } from 'antd';
import { getArticleStatics } from '../utils/static_helper';

const FetchData = (props) => {
    const { access_token, config, dataCallBack, viewReport } = props;
    const display_message = [
        '点击下方按钮从微信服务器下载数据',
        '正在下载数据，请稍后',
        '数据下载完毕，正在处理，请稍后',
        '数据处理完毕，点击下方按钮查看报告'
    ];
    const button_text = [
        '下载数据',
        '请稍等',
        '请稍等',
        '查看报告'
    ];

    let [percent, setPercent] = useState(0);
    let finished_days = 0;
    let [status, setStatus] = useState(0); // 0 -> ready, 1 -> downloading, 2-> processing, 3->ready

    const fetcherCallBack = (total_days) => {
        if (++finished_days > total_days) {
            return;
        }
        setPercent(100 * finished_days / total_days);
    }

    const buttonClick = () => {
        switch (status) {
            case 0: {
                setPercent(0);
                getArticleStatics({ access_token, ...config }, config.year, fetcherCallBack, setStatus).then((res) => {
                    dataCallBack(res);
                    message.success('数据处理完毕，点击下方按钮查看报告！');
                }).catch((err) => {
                    console.error(err);
                    message.error('数据处理异常');
                    setPercent(0);
                    setStatus(0);
                })
                break;
            }
            case 3: {
                viewReport();
                break;
            }
            default: {
                message.error('请稍等');
                return;
            }
        }

    }

    return (
        <Result
            icon={<Progress type="circle" percent={percent.toFixed(2)} />}
            title={display_message[status]}
            extra={
                <Button
                    type="primary"
                    disabled={status === 1 || status === 2}
                    onClick={buttonClick}
                    loading={status === 1 || status === 2}
                >
                    {button_text[status]}
                </Button>
            }
        />
    )
}

export default FetchData;
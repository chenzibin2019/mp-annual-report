import React from 'react';
import { Steps, Button } from 'antd';
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';

const { Step } = Steps;

const ConfigSteps = (props) => {
    const { currentState, exportData } = props;
    return (
        <Steps current={currentState}>
            <Step title="配置开发信息" description="配置微信公众平台开发者凭据" />
            <Step title="开发数据授权" description="授权本机调用微信公众平台开发者接口" />
            <Step title="获取统计数据" description="请求微信服务器获取统计数据" />
            <Step title="查看数据" description={<Button hidden={currentState !== 3} onClick={exportData}>导出数据</Button>} />
        </Steps>
    )
};

export default ConfigSteps;
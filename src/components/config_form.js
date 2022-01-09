import React from 'react';
import { Form, Input, Button } from 'antd';

const ConfigForm = (props) => {
    const { onFinish, values } = props;

    const initialValues = values
    return (
        <Form
            name="config"
            onFinish={onFinish}
            autoComplete="off"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 18 }}
            initialValues={values}
            onFinishFailed={() => { /* do nothing */ }}
        >
            <Form.Item
                label="公众号名称"
                name="account_name"
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="查询年份"
                name="year"
                rules={[{ required: true, message: '请输入年份' }]}
            >
                <Input type="number" />
            </Form.Item>

            <Form.Item
                label="公众号AppID"
                name="appid"
                rules={[{ required: true, message: '请输入你的公众号AppID' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="公众号AppSecret"
                name="secret"
                rules={[{ required: true, message: '请输入你的公众号AppSecret' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    查询
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ConfigForm;
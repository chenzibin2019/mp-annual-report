import React from 'react';
import { Modal, Form, Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { Buffer } from 'buffer';

const ImportData = (props) => {
    const { callback, isModalVisible, setIsModalVisible } = props;

    let file_content = {};

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    const readFileContent = async (f) => {
        return new Promise(async (resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(f);
            reader.onload = (e) => {
                console.log(e.target.result);
                const content = Buffer.from(e.target.result.replace('data:application/json;base64,', ''), 'base64').toString('utf-8');
                console.log(content);
                resolve(content);
            }
        })
    }

    const handleUpload = async (f) => {
        console.log(f)
        const content = await readFileContent(f);
        try {
            file_content = JSON.parse(content);
        } catch (e) {
            message.error('错误的数据文件!');
            return true;
        }
        return false;
    }

    const handelImport = () => {
        callback(file_content);
    }

    return (
        <Modal title="导入数据" visible={isModalVisible} onOk={handelImport} onCancel={handleCancel}>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={() => { }}
                autoComplete="off"
            >
                <Form.Item
                    label="数据文件"
                    name="data"
                >
                    <Upload
                        name="data"
                        beforeUpload={handleUpload}
                        maxCount={1}
                    >
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default ImportData;
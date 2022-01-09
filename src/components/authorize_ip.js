import React, { useEffect, useState } from 'react';
import { Result, Button, Skeleton, Alert, Divider, message, Typography } from 'antd';
import API from '../service/api';
const publicIP = require("react-public-ip");

const { Link } = Typography;

var mp_config = {};

const getAccessToken = async () => {
    if (!mp_config || !mp_config.appid || !mp_config.secret) {
        message.error('读取AppID/Secret失败，请刷新页面重试!');
        return;
    }
    return new Promise(async (resolve, reject) => {
        /*
        fetch(`${API.token_url}?appid=${mp_config.appid}&secret=${mp_config.secret}`).then(resp => resp.json()).then(res => {
            if (!res.access_token) {
                message.error('提供的凭据无法获得access_token，请检查appid与token是否正确，IP地址是否已经正确授权！');
                reject('access_token not available');
            }
            resolve(res.access_token);
        })*/
        fetch(`${API.token}appid=${mp_config.appid}&secret=${mp_config.secret}`).then(resp => resp.json()).then(res => {
            if (!res.access_token) {
                message.error('提供的凭据无法获得access_token，请检查appid与token是否正确，IP地址是否已经正确授权！');
                reject('access_token not available');
            }
            resolve(res.access_token);
        }).catch(error => {
            reject('access_token not available');
        })
    })
}

const AuthorizeIp = (props) => {
    const { config, onFinish, onBack } = props;
    mp_config = config;
    console.log(mp_config);
    const [public_ip_address, setPublicIp] = useState('0.0.0.0');
    const [has_ip_address, setHasIpAddress] = useState(false);
    const [checking, setChecking] = useState(false);
    useEffect(() => {
        if (!has_ip_address) {
            /*
            fetch(`${mp_config.proxy_server}/ip.php`).then(resp => resp.text()).then(res => {
                setPublicIp(res);
                setHasIpAddress(true);
            }).catch(err => {
                message.error('配置代理服务器出错，请检查代理服务器配置');
            })*/
            publicIP.v4().then(ip => {
                setPublicIp(ip);
                setHasIpAddress(true);
            }).catch(err => {
                message.error('获取本机公网IP失败，请重试');
            })
        }

    })

    const checkConfig = () => {
        setChecking(true);
        getAccessToken().then((token) => {
            setChecking(false)
            onFinish(token)
        }).catch(err => {
            setChecking(false)
        })
    }

    return (
        <Result
            title="需要IP授权"
            extra={
                <>
                    <Skeleton
                        loading={!has_ip_address}
                    >
                        <Alert
                            message={[`你的配置提交成功，请前往微信公众平台后台添加代理服务器IP到AccessToken白名单，提交成功后点击下方按钮检查是否成功！`,`本机IP：${public_ip_address}。`,<Link href="https://cloud.tencent.com/developer/article/1698593" target="_blank">点击查看如何设置白名单</Link>]} type="info"
                        />
                    </Skeleton>

                    <Divider />
                    <Button
                        type="default"
                        onClick={onBack}
                    >
                        返回修改
                    </Button>
                    <Button
                        type="primary"
                        key="console"
                        onClick={checkConfig}
                        loading={checking}
                        disabled={!has_ip_address}
                    >
                        我已完成设置
                    </Button>
                </>
            }
        />
    )
}

export default AuthorizeIp;
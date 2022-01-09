import './App.css';
import '@ant-design/pro-layout/dist/layout.css';
import { PageContainer, DefaultFooter } from '@ant-design/pro-layout';
import ConfigSteps from './components/config_steps';
import ReadMe from './components/readme';
import { useState } from 'react';
import ConfigForm from './components/config_form';
import { Divider, message, Button, Space } from 'antd';
import AuthorizeIp from './components/authorize_ip';
import FetchData from './components/fetch_data';
import ViewReport from './components/view_report';
import createAndDownloadFile from './utils/download';
import ImportData from './components/import_data';
import { GithubOutlined } from '@ant-design/icons';

let mp_config = {year: new Date().getFullYear() - 1};
let access_token = false;
let data = {};

function App() {
  const years = ['2021', '2020', '2019'];
  const [currentState, setCurrentState] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  document.title = '公众号年报';

  const collectConfig = (config) => {
    if (currentState !== 0) message.error('发生未知错误，请刷新页面！');
    mp_config = config;
    setCurrentState(1);
  }

  const back = () => {
    setCurrentState(currentState - 1);
  }

  const getAccessToken = (token) => {
    if (token) {
      access_token = token;
      setCurrentState(2);
    }
  }

  const dataCallBack = (ret) => {
    console.log('received data', ret)
    data = ret;
  }

  const viewReport = () => {
    if (data) {
      setCurrentState(3);
    }
  }

  const handleUpload = (imported_data) => {
    if (!imported_data.hasOwnProperty('config') || !imported_data.hasOwnProperty('data')) {
      message.error('无效的数据文件！');
      return;
    }
    mp_config = imported_data.config;
    data = imported_data.data;
    console.log(data)
    setCurrentState(3);
    setIsModalVisible(false);
    message.success('导入成功');
  }

  const exportData = async () => {
    //if (currentState !== 3) return;
    const config = { secret: '', ...mp_config };
    console.log({ config, data });
    createAndDownloadFile('export.json', JSON.stringify({ config, data }));
    message.success('导出的文件已下载');
  }

  return (
    <>
      <PageContainer
        className="site-page-header"
        avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
        title="公众号年报"
        subTitle="请按下面的步骤填写公众号开发者信息获取年报"
        extra={[
          <Button key="import" type="default" onClick={() => { setIsModalVisible(true) }}>
            导入数据
          </Button>,
          <Button key="start_over" type="primary" onClick={() => { setCurrentState(0) }}>
            重新开始
          </Button>
        ]}
        key="main"
      >
        <Space direction="vertical" size="large">
          <ReadMe />

          <ConfigSteps
            currentState={currentState}
            exportData={exportData}
          />
          <Divider />
          {currentState === 0 && (
            <ConfigForm
              values={mp_config}
              onFinish={collectConfig}
            />
          )}
          {currentState === 1 && (
            <AuthorizeIp
              config={mp_config}
              onFinish={getAccessToken}
              onBack={back}
            />
          )}
          {currentState === 2 && (
            <FetchData
              access_token={access_token}
              config={mp_config}
              dataCallBack={dataCallBack}
              viewReport={viewReport}
            />
          )}
          {currentState === 3 && (
            <ViewReport
              config={mp_config}
              statics={data}
            />
          )}
          <ImportData
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            callback={handleUpload}
          />
        </Space>
      </PageContainer>
      <DefaultFooter
        style={{backgroundColor: '#fff'}}
        copyright={`${new Date().getFullYear()} MPAnnual Report, XCookie Org All Right Reserved`}
        links={[
          {
            key: 'github',
            title: <GithubOutlined />,
            href: 'https://github.com/chenzibin2019/mpannual-antd',
            blankTarget: true,
          }
        ]}
      />
    </>
  );
}

export default App;

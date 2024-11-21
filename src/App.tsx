import React, { useState } from 'react';
import { Layout, theme, Typography } from 'antd';
import { SiderBar } from './components/sider-bar';
import { AppHeader } from './components/header';
import { ImportingData } from './components/importingData';
import { ChangeData } from './components/changeData';
import { AllCharts } from './components/allCharts';
import { DontWork } from './components/dontWork';
import { isMobile } from 'react-device-detect';

const { Header, Content, Footer, Sider } = Layout;

export interface Data {
  fileName: string;
  selected: boolean;
  data: Array<unknown>;
}

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [contentIndex, setContentIndex] = useState(1);

  // console.log(data);




  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const renderContent = () => {
    switch (contentIndex) {
      case 1:
        return <AllCharts />;
      case 2:
        return <ChangeData switchToImportData={setContentIndex} />;
      case 3:
        return <ImportingData />;
      case 4:
        return <DontWork />;
      case 5:
        return <DontWork />;
      default:
        return <DontWork />;
    }
  };

  return (<>
    {isMobile ? <DontWork /> :
      <Layout style={{ minHeight: '100svh' }}>
        <Sider collapsible collapsed={collapsed} width={240} onCollapse={(value) => setCollapsed(value)}>
          <SiderBar collapsed={collapsed} contentIndex={contentIndex} changeContentIndex={setContentIndex} />
        </Sider>
        <Layout>
          <Header style={{ background: colorBgContainer, display: "flex", alignItems: 'center', justifyContent: 'flex-end', padding: '0 16px' }}>
            <AppHeader />
          </Header>
          <Content style={{ padding: '16px' }}>
            {/* {contentIndex === 1 ? <LayoutGraph>
          <div
            style={{
              // minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {renderContent()}
          </div>
        </LayoutGraph> : <div
          style={{
            // minHeight: 360,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {renderContent()}
        </div>} */}
            <div
              style={{
                // minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {renderContent()}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            <Typography.Title level={4} style={{ color: '#4f4f4f' }}>WBM ©{new Date().getFullYear()} </Typography.Title>
          </Footer>
        </Layout>
      </Layout>}
  </>

  );
};

export default App;

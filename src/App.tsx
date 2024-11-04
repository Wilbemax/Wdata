import React, { useEffect, useState } from 'react';
import { Layout, theme } from 'antd';
import { SiderBar } from './components/sider-bar';
import { AppHeader } from './components/header';
import { ImportingData } from './components/importingData';
import { ChangeData } from './components/changeData';
import { AllCharts } from './components/allCharts';

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
        return <ChangeData  switchToImportData={setContentIndex} />;
      case 3:
        return <ImportingData />;
      case 4:
        return <div>Content 4</div>;
      case 5:
        return <div>Content 5</div>;
      default:
        return <div>Default Content</div>;
    }
  };

  return (
    <Layout style={{ minHeight: '100svh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <SiderBar collapsed={collapsed} contentIndex={contentIndex} changeContentIndex={setContentIndex} />
      </Sider>
      <Layout>
        <Header style={{ background: colorBgContainer, display: "flex", alignItems: 'center', justifyContent: 'flex-end', padding: '0 16px' }}>
          <AppHeader />
        </Header>
        <Content style={{ padding: '16px' }}>
          <div
            style={{
              
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {renderContent()}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          WBM ©{new Date().getFullYear()} 
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;

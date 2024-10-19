import React, { useEffect, useState } from 'react';
import { Layout, theme } from 'antd';
import { SiderBar } from './components/sider-bar';
import { AppHeader } from './components/header';
import { ImportingData } from './components/importingData';
import { ChangeData } from './components/changeData';

const { Header, Content, Footer, Sider } = Layout;

export interface Data {
  fileName: string;
  data: Array<unknown>;
}

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [contentIndex, setContentIndex] = useState(1);
  const [data, setData] = useState<Data[]>(() => {
    const savedData = localStorage.getItem('importedData');
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    localStorage.setItem('importedData', JSON.stringify(data));
  }, [data]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const renderContent = () => {
    switch (contentIndex) {
      case 1:
        return <div>Content 1</div>;
      case 2:
        return <ChangeData data={data} switchToImportData={setContentIndex} />;
      case 3:
        return <ImportingData onImport={setData} />;
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
        <Content style={{ margin: '16px' }}>
          <div
            style={{
              padding: 24,
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

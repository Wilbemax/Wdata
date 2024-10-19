import { Typography, Menu, MenuProps } from "antd"
import { ChartScatter, ReplaceAll, FolderDown, FolderUp, User } from "lucide-react";


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Data preview', '1', <ChartScatter size={16} />),
  getItem('Changing the data', '2', <ReplaceAll size={16} />),
  getItem('Importing data', '3', <FolderDown size={16} />),
  getItem('Exporting data', '4', <FolderUp size={16} />),
  getItem('User', '5', <User size={16} />),
];

interface Props {
  collapsed: boolean;
  contentIndex: number;
  changeContentIndex: (index: number) => void;
}

const SiderBar = ({ collapsed, contentIndex, changeContentIndex }: Props) => {

  const onClick: MenuProps['onClick'] = (e) => {
    changeContentIndex(+e.key);
  };
  return (
    <>
      <div className='logo' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 70, margin: 'auto' }}>
        <Typography.Title level={1} style={{ color: '#4c96fe', margin: 0, lineHeight: 1 }}>W</Typography.Title>
        {!collapsed ? <Typography.Title level={1} style={{ color: '#fff', margin: 0, lineHeight: 1, textWrap: 'nowrap' }}>Data</Typography.Title> : ''}
      </div>
      <Menu onClick={onClick} theme="dark" defaultSelectedKeys={['1']} selectedKeys={[String(contentIndex)]} mode="inline" items={items} />
    </>
  )
}

export { SiderBar }
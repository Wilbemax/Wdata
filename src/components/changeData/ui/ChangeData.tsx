import { Empty, Button, TableProps, Tag, Table, Typography, Popconfirm, message } from "antd"
import { Data } from "../../../App"
import { mapDataForTable } from "../../../utils/mapDataForTable"
import { dataStore } from "../../../store/dataStore"

type Props = {
    data: Data[]
    deleteByIndex: (index: number) => void
    switchToImportData: (index: number) => void
}


export interface mapDataI {
    key: string;
    name: string;
    size: number;
    type: string;
}





//созадть модалку, где можно будет реадктировать файл 
const ChangeData = ({ deleteByIndex, switchToImportData }: Props) => {
    const data = dataStore(state => state.data)
    const rowSelection: TableProps<mapDataI>['rowSelection'] = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: mapDataI[]) => {
            // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record: mapDataI) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };

    const confirm = (index: string) => {
        deleteByIndex(+index)
        message.success('The file was successfully deleted');
    };

    const columns: TableProps<mapDataI>['columns'] = [
        {
            title: 'File name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
        },
        {
            title: 'Type',
            key: 'type',
            dataIndex: 'type',
            render: (_, { type }) => {
                let color = type === 'json' ? 'yellow' : 'green';
                if (type === 'loser') {
                    color = 'volcano';
                }
                return (
                    <Tag color={color} key={type}>
                        {type.toUpperCase()}
                    </Tag>
                );
            }
            ,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Popconfirm
                    title="Delete the file"
                    description="Are you sure to delete this file?"
                    onConfirm={() => confirm(record.key)}
                    // onCancel={cancel}
                    okText="Shure"
                    cancelText="Cancel"
                >
                    <Button danger>Delete</Button>
                </ Popconfirm>
            ),
        },
    ];
    const mapData = mapDataForTable(data)

    // сделать возможность скрывть файлы от построения графиков 

    if (data.length === 0) {
        return <div style={{ width: '100%', height: 360, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
            <Empty />
            <Button onClick={() => switchToImportData(3)} type='primary'>Importing data</Button>
        </div>
    }
    return (
        <div style={{ width: '100%', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Typography.Title level={5} style={{ margin: 0 }}>Select the elements that will participate in the analysis</Typography.Title>
            <Table<mapDataI> columns={columns} dataSource={mapData} style={{ width: '100%', }} pagination={false} rowSelection={{ type: "checkbox", ...rowSelection }} />
        </div>
    )
}

export { ChangeData }
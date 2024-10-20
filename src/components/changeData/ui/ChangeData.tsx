import { Card, Empty, Button, TableProps, Tag, Space, Table } from "antd"
import { Data } from "../../../App"
import { mapDataForTable } from "../../../utils/mapDataForTable"

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
const ChangeData = ({ data, deleteByIndex, switchToImportData }: Props) => {
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
                <Space size="middle">
                    <a onClick={() => deleteByIndex(+record.key)
                    }>Delete</a>
                </Space >
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
            <Table<mapDataI>  columns={columns} dataSource={mapData} style={{ width: '100%', }} pagination={false} />
        </div>
    )
}

export { ChangeData }
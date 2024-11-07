import { Empty, Button, TableProps, Tag, Table, Typography, Popconfirm, message } from "antd"
import { mapDataForTable } from "../../../utils/mapDataForTable"
import { dataStore } from "../../../store/dataStore"

type Props = {
    // data: Data[]
    // deleteByIndex: (index: number) => void
    switchToImportData: (index: number) => void
}


export interface mapDataI {
    key: string;
    name: string;
    size: number;
    type: string;
}





const ChangeData = ({ switchToImportData }: Props) => {
    const data = dataStore(state => state.data)
    const removeData = dataStore(state => state.removeData)
    const toggleSelected = dataStore(state => state.toggleSelected)
    console.log(data)
    const rowSelection: TableProps<mapDataI>['rowSelection'] = {
        onChange: (_, selectedRows) => {
            const selectedNames = selectedRows.map((item) => `${item.name}.${item.type}`);
            
            data.forEach((dataItem) => {
                const shouldBeSelected = selectedNames.includes(dataItem.fileName);
                
                if (dataItem.selected !== shouldBeSelected) {
                    toggleSelected(dataItem.fileName);
                }
            });
        },
        getCheckboxProps: (record: mapDataI) => {
            console.log(data.filter(item => item.fileName === `${record.name}.${record.type}`)[0].selected);
            
            return ({
                name: record.name,
                checked:data.filter(item => item.fileName === `${record.name}.${record.type}`)[0].selected,
            })
        },
    };

    
    const confirm = (name: string) => {
        console.log(name);

        removeData(name)
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
                    onConfirm={() => confirm(`${record.name}.${record.type}`)}

                    // onCancel={cancel}
                    okText="Shure"
                    cancelText="Cancel"
                >
                    <Button danger >Delete</Button>
                </ Popconfirm >
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
        <div style={{ width: '100%', display: 'flex', gap: '1rem', flexWrap: 'wrap', padding: 16 }}>
            <Typography.Title level={5} style={{ margin: 0 }}>Select the elements that will participate in the analysis</Typography.Title>
            <Table<mapDataI> columns={columns} dataSource={mapData} style={{ width: '100%', }} pagination={false} rowSelection={{ type: "checkbox", ...rowSelection }} />
        </div>
    )
}

export { ChangeData }
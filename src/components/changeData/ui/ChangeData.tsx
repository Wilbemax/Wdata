import { Empty, Button, TableProps, Tag, Table, Typography, Popconfirm, message } from "antd";
import { mapDataForTable } from "../../../utils/mapDataForTable";
import { dataStore } from "../../../store/dataStore";
import { useEffect, useState } from "react";

type Props = {
    switchToImportData: (index: number) => void;
};

export interface mapDataI {
    key: string;
    name: string;
    size: number;
    type: string;
}

const ChangeData = ({ switchToImportData }: Props) => {

    const data = dataStore((state) => state.data);

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);


    const removeData = dataStore((state) => state.removeData);
    const toggleSelected = dataStore((state) => state.toggleSelected);

    useEffect(() => {
        const initialSelectedKeys = data.map((item, index) => item.selected ? index.toString() : '');
        setSelectedRowKeys(initialSelectedKeys);
    }, [data]);


    const rowSelection: TableProps<mapDataI>['rowSelection'] = {
        selectedRowKeys,
        onChange: (_, selectedRows) => {
            const selectedNames = selectedRows.map((item) => `${item.name}.${item.type}`);

            ///########################## работает 
            data.forEach((dataItem) => {
                const shouldBeSelected = selectedNames.includes(dataItem.fileName);
                if (dataItem.selected !== shouldBeSelected) {
                    toggleSelected(dataItem.fileName);
                }
            });


        },
        getCheckboxProps: (record: mapDataI) => {
            return {
                name: record.name,
            };
        },
    };

    const confirm = (name: string) => {
        removeData(name);
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
            render: (_, { size }) => {
                return size > 10000 ? (
                    <>
                        {size}
                        <Tag color="warning" style={{ marginLeft: 5 }}>Warning: read about</Tag>
                    </>
                ) : (
                    size
                );
            },

        },
        {
            title: 'Type',
            key: 'type',
            dataIndex: 'type',
            render: (_, { type }) => {
                const color = type === 'json' ? 'yellow' : 'green';
                return <Tag color={color} key={type}>{type.toUpperCase()}</Tag>;
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Popconfirm
                    title="Delete the file"
                    description="Are you sure to delete this file?"
                    onConfirm={() => confirm(`${record.name}.${record.type}`)}
                    okText="Sure"
                    cancelText="Cancel"
                >
                    <Button danger>Delete</Button>
                </Popconfirm>
            ),
        },
    ];

    const mapData = mapDataForTable(data);

    if (data.length === 0) {
        return (
            <div style={{ width: '100%', minHeight: '80svh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
                <Empty />
                <Button onClick={() => switchToImportData(3)} type='primary'>
                    Importing data</Button>
            </div>
        );
    }

    return (
        <div style={{ width: '100%', minHeight: '80svh', padding: 16 }}>
            <Typography.Title level={5} style={{ margin: 0 }}>
                Select the elements that will participate in the analysis
            </Typography.Title>
            <Table<mapDataI>
                columns={columns}
                dataSource={mapData}
                style={{ width: '100%', marginTop: '1rem' }}
                pagination={false}
                rowSelection={{ type: "checkbox", ...rowSelection }}
            />
        </div>
    );
};

export { ChangeData };

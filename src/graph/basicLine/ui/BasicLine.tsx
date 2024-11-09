import { Line } from '@ant-design/plots';
import { dataStore } from '../../../store/dataStore';
import { Button, Modal, Select, Typography, Watermark } from 'antd';
import { useEffect, useState } from 'react';

interface SelectedDataInterface {
    [key: string]: string;
}


interface FileData {
    [key: string]: unknown; // Замените на конкретные типы свойств, если они известны
}

interface File {
    fileName: string;
    selected: boolean;
    data: FileData[];
}

const BasicLine = () => {
    const data = dataStore(state => state.data);
    console.log(data);


    const [selectedData, setSelectedData] = useState<SelectedDataInterface[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [xField, setXfield] = useState<string>('');
    const [yField, setYfield] = useState<string>('');

    const selectedFile = dataStore(state => state.data.find(file => file.selected) as File);
    const fields = selectedFile && selectedFile.data.length > 0 ? Object.keys(selectedFile.data[0]) : [];

    useEffect(() => {
        if (selectedFile) {
            const filteredData = selectedFile.data.map(item => {
                return ({
                    [xField]: item[xField] as string,
                    [yField]: item[yField] as string
                })
            });
            setSelectedData(filteredData);
        }

        if (selectedData.length === 0) {
            setIsModalOpen(true);
        }
    }, [xField, yField]);

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const dataForChart = selectedData.length > 0 ? selectedData : [
        { year: '1991', value: 3 },
        { year: '1992', value: 4 },
        { year: '1993', value: 3.5 },
        { year: '1994', value: 5 },
        { year: '1995', value: 4.9 },
        { year: '1996', value: 6 },
        { year: '1997', value: 7 },
        { year: '1998', value: 9 },
        { year: '1999', value: 13 }
    ];

    const config = {
        data: dataForChart,
        xField: xField || 'year',
        yField: yField || 'value',

        point: {
            shapeField: 'square',
            // sizeField: 1,
        },
        interaction: {
            tooltip: {
                marker: false,
            },
        },
        style: {
            lineWidth: 2,
            gradient: 'x',
        },
        slider: {
            x: { labelFormatter: (d) => d },
            y: { labelFormatter: '~s' },
        },
        seriesField: 'division',
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Modal title="Choose data" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div style={{ width: '100%', display: 'flex', gap: '1rem' }}>
                    <Select
                        style={{ width: '100%' }}
                        showSearch
                        placeholder="Select horizontal field"
                        onChange={(value) => setXfield(value)}
                        status={xField === yField && xField !== '' ? 'warning' : ''}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={
                            fields.map(field => ({
                                label: field,
                                value: field
                            }))
                        }
                    />
                    <Select
                        showSearch
                        style={{ width: '100%' }}
                        onChange={(value) => setYfield(value)}
                        status={xField === yField && xField !== '' ? 'warning' : ''}
                        placeholder="Select vertical field"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={
                            fields.map(field => ({
                                label: field,
                                value: field
                            }))
                        }
                    />
                </div>
                {xField === yField && xField !== '' ? (<Typography.Paragraph type='warning' style={{ width: '100%', textAlign: 'end' }}> *You chose similar fields</Typography.Paragraph>) : null}
            </Modal >
            {selectedData.length > 0 ? <Line {...config} autoFit={true} /> : <Watermark
                style={{height : '100%'}}
                height={60}
                width={100}
                content={['WBM', 'Example chart']}
            >
                <Line {...config} autoFit={true} />
            </Watermark>}
            
        </div>
    );
};

export { BasicLine };
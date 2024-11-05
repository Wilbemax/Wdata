import { Line } from '@ant-design/plots';
import { dataStore } from '../../../store/dataStore';
import { Modal, Select, Typography } from 'antd';
import { useEffect, useState } from 'react';

interface SelectedDataInterface {
    x: string;
    y: string;
}

const BasicLine = () => {
    const data = dataStore(state => state.data);
    const [selectedData, setSelectedData] = useState<SelectedDataInterface[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const [xField, setXfield] = useState<string>('');
    const [yField, setYfield] = useState<string>('');


    const selectedFile = dataStore(state => state.data.find(file => file.selected));
    const fields = selectedFile && selectedFile.data.length > 0 ? Object.keys(selectedFile.data[0]) : [];


    // const fields = data.length > 0 ? Object.keys(data[0]) : [];
    console.log(fields);



    useEffect(() => {
        // Выбираем данные с флагом selected
        // const filteredData = data
        //     .filter(item => item.selected)
        //     .map(item => ({ x: item.fileName, y: item. })); // Замените на реальные поля данных

        // setSelectedData(filteredData);
        console.log(selectedData);

        if (selectedData.length === 0) {
            setIsModalOpen(true);
        }
    }, [selectedData]);

    // const showModal = () => {
    //     setIsModalOpen(true);
    // };

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
        xField: 'year',
        yField: 'value',
        point: {
            shapeField: 'square',
            sizeField: 4,
        },
        interaction: {
            tooltip: {
                marker: false,
            },
        },
        style: {
            lineWidth: 2,
        },
    };

    return (
        <>
            <Modal title="Chose data" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                {/* {data.map((item) => {
                    (
                        
                    )

                })} */}
            </Modal>
            <Line {...config} autoFit={true} />

        </>
    );
};

export { BasicLine };

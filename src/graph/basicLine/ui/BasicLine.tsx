import { Line } from '@ant-design/plots';
import { dataStore } from '../../../store/dataStore';
import { Button, Watermark } from 'antd';
import { useEffect, useState } from 'react';
import { Pen, Settings } from 'lucide-react';
import { LineDataSelectModal } from './LineDataSelectModal';
import { LineDataViewDrawer } from './LineDataViewDrawer';

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

    // modal changing data
    const [selectedData, setSelectedData] = useState<SelectedDataInterface[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [xField, setXfield] = useState<string>('');
    const [yField, setYfield] = useState<string | number>('');

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



    // drawer for setting chart view 
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    const [slider, setSlider] = useState<boolean>(false)
    const [more1Line, setMore1Line] = useState<boolean>(false)
    const [categoryColor, setCategoryColor] = useState<string | undefined>(undefined)

    const [dotSize, setDotSize] = useState<number>(1)
    const [lineSize, setLineSize] = useState<number>(1)
    const [pointers, setPointers] = useState<'square' | 'circle'>('square')


    const dataForChart = (selectedData.length > 0 && xField !== '' && yField !== '') ? selectedData : [
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
            shapeField: pointers,
            sizeField: dotSize,
        },
        interaction: {
            tooltip: {
                marker: false,
            },
        },
        style: {
            lineWidth: lineSize,
        },
        slider: slider && {
            x: { labelFormatter: (d: unknown) => d },
            y: { labelFormatter: '~s' },
        },
        colorField: categoryColor !== '' ? categoryColor : false,
        // seriesField: 'division',
    };
    console.log(lineSize);

    return (
        <div style={{ width: '100%', height: 'calc(100% - 1rem)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <LineDataSelectModal
                fields={fields}
                isModalOpen={isModalOpen}
                xField={xField}
                yField={yField}
                handleCancel={handleCancel}
                handleOk={handleOk}
                setXfield={setXfield}
                setYfield={setYfield}
            />
            <LineDataViewDrawer
                drawerOpen={drawerOpen}
                setDrawerOpen={setDrawerOpen}

                slider={slider}
                setSlider={setSlider}

                fields={fields}
                more1Line={more1Line}
                setMore1Line={setMore1Line}
                setCategoryColor={setCategoryColor}

                dotSize={dotSize}
                setDotSize={setDotSize}

                lineSize={lineSize}
                setLineSize={setLineSize}

                pointers={pointers}
                setPointers={setPointers}


            />




            {
                (selectedData.length > 0 && xField !== '' && yField !== '') ?
                    <Line {...config} autoFit={true} animate={true} />
                    :
                    <Watermark
                        style={{ height: '100%' }}
                        height={60}
                        width={100}
                        content={['WBM', 'Example chart']}
                    >
                        <Line {...config} autoFit={true} animate={true} />
                    </Watermark>
            }






            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <Button type='primary' size='large' icon={<Pen size={16} />} style={{ lineHeight: 1 }} onClick={() => setIsModalOpen(true)}>
                    Change fields
                </Button>
                <Button size='large' icon={<Settings size={16} />} style={{ lineHeight: 1 }} onClick={() => setDrawerOpen(true)}>
                    Chart settings
                </Button>
            </div>
        </div>

    );
};

export { BasicLine };
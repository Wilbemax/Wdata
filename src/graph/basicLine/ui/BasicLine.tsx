import { Line } from '@ant-design/plots';
import { dataStore } from '../../../store/dataStore';

// interface dataI {
//         year?: number;
//         value?: number;
// }
const BasicLine = () => {
    
    const data =  dataStore(state => state.data)
    
    const config = {
        data,
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
    return <Line {...config} autoFit={true} />;
};
export { BasicLine }

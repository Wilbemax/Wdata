import { Card } from "antd"
import { Data } from "../../../App"
import { BasicLine } from "../../../graph/basicLine"
import classes from './classes.module.css'
import Meta from "antd/es/card/Meta"
import { useState } from "react"
import { dataString } from "../type"
import { dataStore } from "../../../store/dataStore"


type Props = {
    data: Data[]
}

const AllCharts = () => {
    const [selectedData, setSelectedData] = useState<dataString>(null)
    const data = dataStore(state => state.data)
    console.log(data);
    
    switch (selectedData) {
        case "BasicPlot":
            return <BasicLine />
    
        default:
            return (
                <div className={classes.wrapper}>
                    <Card
                        hoverable
                        bordered
                        style={{ width: 250, height: 220, padding: 1 }}
                        cover={<img alt="example" src={'/BaseLine1.png'} />}
                        onClick={() => setSelectedData("BasicPlot")}

                    >
                        <Meta title="Basic line plot" />
                    </Card>
                </div >
        
            )
    }
    
   
}
export { AllCharts }
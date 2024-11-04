import { Card } from "antd"
import { Data } from "../../../App"
import { BasicLine } from "../../../graph/basicLine"
import classes from './classes.module.css'
import Meta from "antd/es/card/Meta"


type Props = {
    data: Data[]
}

const AllCharts = ({ data }: Props) => {
    return (
        <div className={classes.wrapper}>
            <Card
                hoverable
                bordered
                style={{ width: 250, height: 220, padding: 1 }}
                cover={<img alt="example" src={'/BaseLine1.png'} />}
            >
                <Meta title="Basic line plot"  />
            </Card>
        </div >

    )
}
export { AllCharts }
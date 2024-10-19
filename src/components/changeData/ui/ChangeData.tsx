import { Card, Empty, Button} from "antd"
import { Data } from "../../../App"

type Props = {
    data: Data[]
    switchToImportData: (index: number) => void
}
//созадть модалку, где можно будет реадктировать файл 
const ChangeData = ({ data, switchToImportData }: Props) => {
    if(data.length === 0){
        return <div style={{width: '100%', height: 360,display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem'}}>
            <Empty />
            <Button onClick={() => switchToImportData(3)} type='primary'>Importing data</Button>
        </div>
    }
    return (
        <div style={{ width: '100%', display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
            {data.map((item, index) => {
                console.log(index);
                return (
                    <Card style={{width: 300}} title={item.fileName} >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur commodi voluptate eum, nisi veritatis aliquam veniam sapien</Card>
                )

            })}
        </div>
    )
}

export { ChangeData }
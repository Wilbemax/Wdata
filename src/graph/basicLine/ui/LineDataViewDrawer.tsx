import { Button, Checkbox, Drawer, InputNumber, Select } from "antd"
import { Eye, EyeOff } from "lucide-react"
import { useEffect } from "react"


type Props = {
    drawerOpen: boolean
    setDrawerOpen: (drawerOpen: boolean) => void

    slider: boolean
    setSlider: (slider: boolean) => void

    more1Line: boolean
    fields?: string[]
    setMore1Line?: (more1Line: boolean) => void
    setCategoryColor: (categoryColor: string | undefined) => void

    setDotSize: (dotSize: number) => void
    dotSize: number

}

export const LineDataViewDrawer = ({ drawerOpen, setDrawerOpen, slider, setSlider, more1Line, setCategoryColor, setDotSize, dotSize}: Props) => {
    useEffect(() => {
        if (!more1Line){
            setCategoryColor(undefined)
        }
    }, [more1Line, setCategoryColor])
    return (
        <Drawer title="Change view" open={drawerOpen} onClose={() => setDrawerOpen(false)} >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {slider ?
                    <Button type="default" size="large" style={{ width: 180 }} icon={<EyeOff />} onClick={() => setSlider(false)} >Hide the slider</Button> :
                    <Button type="primary" size="large" style={{ width: 180 }} icon={<Eye />} onClick={() => setSlider(true)}>Show the slider</Button>
                }

                {/* <div style={{ display: 'flex', flexDirection: 'column',gap: '1rem' }}>
                    <Checkbox onChange={(e) => setMore1Line(e.target.checked)}>
                        More than 1 line
                    </Checkbox>
                    {more1Line && <Select
                        style={{ width: 180 }}
                        showSearch
                        placeholder="Select horizontal field"
                        onChange={(value) => setCategoryColor(value)}
                        
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={
                            fields.map(field => ({
                                label: field,
                                value: field
                            }))
                        } /> }
                </div> */}
                <InputNumber placeholder="Set dot size" max={10} min={1} defaultValue={1} onChange={(e) => setDotSize(e!)} value={dotSize}/>
                
            </div>


        </Drawer>
    )
}
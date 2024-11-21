import { Button, Drawer, InputNumber, Popover, Radio, Space, Typography } from "antd"
import { CircleHelp, Eye, EyeOff } from "lucide-react"
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

    lineSize: number
    setLineSize: (lineSize: number) => void


    pointers: "square" | "circle"
    setPointers: (pointers: "square" | "circle") => void
}

export const LineDataViewDrawer = ({ drawerOpen, setDrawerOpen, slider, setSlider, more1Line, setCategoryColor, setDotSize, dotSize, lineSize, setLineSize, pointers, setPointers }: Props) => {
    useEffect(() => {
        if (!more1Line) {
            setCategoryColor(undefined)
        }
    }, [more1Line, setCategoryColor])

    const content = () => {
        return <Space direction="vertical">
            <Typography.Text>
                Scaling may not work on an approximate graph.
            </Typography.Text>
            <Typography.Text>
                If it doesn't work, refresh the page, select the width and then select the data.
            </Typography.Text>
        </Space>
    }
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
                <div>
                    <Radio.Group onChange={(e) => setPointers(e.target.value)} value={pointers}>
                        <Radio value={'square'}>Square</Radio>
                        <Radio value={'circle'}>Circle</Radio>
                    </Radio.Group>
                </div>


                <div>
                    <Typography.Title level={5} style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '.5rem', lineHeight: 1 }}>
                        Dot size
                        <Popover content={content}><CircleHelp size={16} color="#4f4f4f" /></Popover>
                    </Typography.Title>
                    <InputNumber placeholder="Set dot size" max={10} min={1} defaultValue={1} onChange={(e) => setDotSize(e!)} value={dotSize} />
                </div>

                <div>
                    <Typography.Title level={5} style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '.5rem', lineHeight: 1 }}>
                        Line width
                        <Popover content={content}><CircleHelp size={16} color="#4f4f4f" /></Popover>
                    </Typography.Title>
                    <InputNumber placeholder="Set line size" max={10} min={1} defaultValue={1} onChange={(e) => setLineSize(e!)} value={lineSize} />
                </div>
                
            </div>


        </Drawer>
    )
}
import { Button, Input } from "antd"
import { Search } from "lucide-react"

type Props = {}

const AppHeader = (props: Props) => {
    return (
        <>
            <Input placeholder={`Search`} prefix={<Search size={16} color='#b4b4b4' />} allowClear variant="filled" style={{ width: 200 }} />

            <Button style={{ marginLeft: 16 }}>
                log in
            </Button>
            <Button type='primary' style={{ marginLeft: 16, background: '#1677ff' }}>
                sign in
            </Button>
        </>

    )
}

export { AppHeader }
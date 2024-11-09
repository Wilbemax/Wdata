import { Button, Input } from "antd"
import { Search } from "lucide-react"

type Props = {}

const AppHeader = (props: Props) => {
    return (
        <>
            <Input placeholder={`Search`} prefix={<Search size={16} color='#b4b4b4' />} allowClear variant="filled" size="large" style={{ width: 200 }} />

            <Button style={{ marginLeft: 16 }} size="large">
                log in
            </Button>
            <Button type='primary' size="large" style={{ marginLeft: 16, background: '#1677ff' }}>
                sign in
            </Button>
        </>

    )
}

export { AppHeader }
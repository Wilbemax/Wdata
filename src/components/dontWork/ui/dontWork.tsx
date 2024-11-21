import { Button, Result } from "antd"


export const DontWork = () => {
    return (
        <Result
            status="500"
            title="500"
            subTitle="It seems that the functionality and the mobile version are in development. Stay tuned in our Telegram"
            extra={<Button type="primary"><a href="https://t.me/wbmdev" target="_blank">Telegram</a></Button>}
        />
    )
}
import { Splitter } from "antd"

export const LayoutGraph = ({ children }: { children: React.ReactElement }) => {
    return (
        <Splitter layout="vertical" style={{ height: '80svh', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <Splitter.Panel max='100%' min='30%' defaultSize="70%">
                {children}
            </Splitter.Panel>
            <Splitter.Panel>

            </Splitter.Panel>
        </Splitter>
    )
}
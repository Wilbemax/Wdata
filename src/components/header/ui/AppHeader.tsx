import { Button, Input, Modal } from "antd"
import { Search } from "lucide-react"
import { useState } from "react";
import { DontWork } from "../../dontWork";


const AppHeader = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>

            <Modal title="Sorry" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <DontWork />
            </Modal>
            <Input placeholder={`Search`} prefix={<Search size={16} color='#b4b4b4' />} allowClear variant="filled" size="large" style={{ width: 200 }} />

            <Button style={{ marginLeft: 16 }} size="large" onClick={showModal}>
                log in
            </Button>
            <Button type='primary' size="large" style={{ marginLeft: 16, background: '#1677ff' }} onClick={showModal}>
                sign in
            </Button>
        </>

    )
}

export { AppHeader }
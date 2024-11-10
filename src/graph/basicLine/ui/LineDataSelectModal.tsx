import { Modal, Select, Typography } from "antd"

type Props = {
    isModalOpen: boolean
    handleOk: () => void
    handleCancel: () => void
    setXfield: (value: string) => void
    setYfield: (value: string) => void
    xField?: string
    yField?: string | number
    fields: string[]

}

export const LineDataSelectModal = ({ fields, handleCancel, handleOk, isModalOpen, setXfield, setYfield, xField, yField}: Props) => {
    return (
        <Modal title="Choose data" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <div style={{ width: '100%', display: 'flex', gap: '1rem' }}>
                <Select
                    style={{ width: '100%' }}
                    showSearch
                    placeholder="Select horizontal field"
                    onChange={(value) => setXfield(value)}
                    status={xField === yField && xField !== '' ? 'warning' : ''}
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={
                        fields.map(field => ({
                            label: field,
                            value: field
                        }))
                    }
                />
                <Select
                    showSearch
                    style={{ width: '100%' }}
                    onChange={(value) => setYfield(value)}
                    status={xField === yField && xField !== '' ? 'warning' : ''}
                    placeholder="Select vertical field"
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={
                        fields.map(field => ({
                            label: field,
                            value: field
                        }))
                    }
                />
            </div>
            {
                xField === yField && xField !== ''
                    ?
                    (<Typography.Paragraph type='warning' style={{ width: '100%', textAlign: 'end' }}> *You chose similar fields
                    </Typography.Paragraph>)
                    : null}
        </Modal >
    )
}
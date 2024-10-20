import React, { useState, } from 'react';
import { UploadFile, UploadProps, message } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { Inbox } from 'lucide-react';
import * as XLSX from 'xlsx';
import { Data } from '../../../App';

type Props = {
    onImport: (data: Data[] | ((prevData: Data[]) => Data[])) => void;
}


const ImportingData = ({ onImport }: Props) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    
    const processExcel = (file: UploadFile) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const binaryStr = e.target?.result;
            const workbook = XLSX.read(binaryStr, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData: Data[] = XLSX.utils.sheet_to_json(worksheet);
            saveData(jsonData, file.name);
        };
        reader.readAsBinaryString(file.originFileObj as Blob);
    };

    const processJson = (file: UploadFile) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const jsonData: Data[] = JSON.parse(e.target?.result as string);
            saveData(jsonData, file.name);
        };
        reader.readAsText(file.originFileObj as Blob);
    };

    const saveData = (data: Array<unknown>, fileName: string) => {
        const importedData: Data = { fileName, data };
        onImport((prevData: Data[]) => [...prevData, importedData]);
        message.success('Data imported and saved locally!');
    };



    const onChangeFileList: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        if (newFileList.length) {
            const file = newFileList[0];
            if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                processExcel(file);
            } else if (file.type === 'application/json') {
                processJson(file);
            }
        }
    };
    const props: UploadProps = {
        name: 'file',
        multiple: false,
        listType: 'picture',
        beforeUpload(file) {
            const isXlsx = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            const isJson = file.type === 'application/json';
            if (!isXlsx && !isJson) {
                message.error(`${file.name} is not a supported file type!`);
            }
            return false; // Останавливаем загрузку на сервер
        },
        onChange: onChangeFileList,
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 360}}>
            <Dragger {...props} style={{ maxWidth: 650 }}>
            <p className="ant-upload-drag-icon">
                <Inbox size={42} color="#1677ff" />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
                Support for a single or bulk upload. Files are supported .xlsx or .json. We can't process other files yet.
            </p>
        </Dragger>
        </div>
        
    );
};

export { ImportingData };

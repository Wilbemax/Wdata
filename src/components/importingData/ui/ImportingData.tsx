import  { useState, } from 'react';
import { UploadFile, UploadProps, message, notification } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { Inbox } from 'lucide-react';
import * as XLSX from 'xlsx';
import { Data } from '../../../App';
import { dataStore } from '../../../store/dataStore';



const ImportingData = () => {


    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = () => {
      api.info({
        message: 'What does it mean?',
        description:
          'At the moment, the functionality is under development, an example of the data can be found on the About tab.',
      });
    };

    
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const setData = dataStore((state) => state.setData)
    const data = dataStore((state) => state.data);
    // console.log(data)

    const processExcel = (file: UploadFile) => {
        try {
            const reader = new FileReader();
            reader.onload = (e) => {
                const binaryStr = e.target?.result;
                const workbook = XLSX.read(binaryStr, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData: Data[] = XLSX.utils.sheet_to_json(worksheet);
                if (data.find((item) => item.fileName === file.name)) {
                    message.error(`File ${file.name} already exists!`);
                    setFileList((prevFileList) => prevFileList.filter((f) => f.uid !== file.uid));
                    return;
                }
                setData({ fileName: file.name, data: jsonData, selected: false });
            };
            reader.readAsBinaryString(file.originFileObj as Blob);
        } catch (e) {
            message.error('Error processing the file.');
            setFileList((prevFileList) => prevFileList.filter((f) => f.uid !== file.uid)); // Удаляем файл
        }
    };

    const processJson = (file: UploadFile) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const jsonData: Data[] = JSON.parse(e.target?.result as string);

                if (!Array.isArray(jsonData)) {
                    message.error('The JSON file we not can convert this file yet');
                    openNotificationWithIcon()
                    setFileList((prevFileList) => prevFileList.filter((f) => f.uid !== file.uid));
                    return;
                }

                if (data.find((item) => item.fileName === file.name)) {
                    message.error(`File ${file.name} already exists!`);
                    setFileList((prevFileList) => prevFileList.filter((f) => f.uid !== file.uid));
                    return;
                }

                setData({ fileName: file.name, data: jsonData, selected: false });
            } catch (e) {
                message.error('Error processing the JSON file.');
                setFileList((prevFileList) => prevFileList.filter((f) => f.uid !== file.uid));
            }
        };
        reader.readAsText(file.originFileObj as Blob);
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
        fileList,
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
        <>
        {contextHolder}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80svh' }}>

                <Dragger {...props} style={{ width: '100%', height: '80%' }}>
                    <p className="ant-upload-drag-icon">
                        <Inbox size={42} color="#1677ff" />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Files are supported .xlsx or .json. We can't process other files yet.
                    </p>
                </Dragger>
            </div>

        </>


    );
};

export { ImportingData };

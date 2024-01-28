import React, { Component } from 'react'
import excelLogo from '../../assets/image/excel-logo.png'
import './UploadExcel.css'
import * as XLSX from 'xlsx'
import UploadedTable from '../table/UploadedTable'

export class UploadExcel extends Component {
    state = {
        excelData: null,
        fileName: null,
        error: null
    }

    handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (this.isValidFileType(file)) {
            this.readExcel(file);
            this.setState({ fileName: file.name, error: null });
        } else {
            this.setState({ error: "Invalid file type. Please upload an Excel file." });
        }
    }

    isValidFileType = (file) => {
        return file && file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    }

    readExcel = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result)
            const workbook = XLSX.read(data, { type: 'array' })
            const sheetName = workbook.SheetNames[0]
            const sheet = workbook.Sheets[sheetName]
            const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 })
            this.setState({ excelData })
            console.log('excelData', excelData)
        }
        reader.readAsArrayBuffer(file)
    }

    handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0]
        if (this.isValidFileType(file)) {
            this.readExcel(file)
            this.setState({ fileName: file.name, error: null })
        } else {
            this.setState({ error: "Invalid file type. Please upload an Excel file." })
        }
    }

    handleDragOver = (e) => {
        e.preventDefault();
    }

    render() {
        const { excelData, fileName, error } = this.state
        return (
            <>
               <div className='flex flex-col justify-center items-center h-[80vh]'>
               <div className='center'>
                    <div className='box flex justify-center items-center h-screen'
                        onDrop={this.handleDrop}
                        onDragOver={this.handleDragOver}>
                        <div className="flex flex-col items-center">
                            <div>
                                <img src={excelLogo} alt="Excel Logo" />
                            </div>
                            <div className='mt-4'>
                                <p className='excel-text'>Drop your excel sheet here or <label htmlFor="file-upload">browse</label></p>
                            </div>
                        </div>
                    </div>
                    <label htmlFor="file-upload" className="upload-btn text-white py-2 px-4 rounded inline-flex items-center justify-center mt-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M19.125 14.1923V16.9327C19.125 18.1435 18.1435 19.125 16.9327 19.125H7.06731C5.85653 19.125 4.875 18.1435 4.875 16.9327V14.1923M12 15.8365V4.875M12 4.875L8.71154 8.16346M12 4.875L15.2885 8.16346" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        Upload
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        onChange={this.handleFileUpload}
                        style={{ display: 'none' }}
                    />
                    {/* <button type="button" className="upload-btn text-white py-2 px-4 rounded inline-flex items-center justify-center mt-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M19.125 14.1923V16.9327C19.125 18.1435 18.1435 19.125 16.9327 19.125H7.06731C5.85653 19.125 4.875 18.1435 4.875 16.9327V14.1923M12 15.8365V4.875M12 4.875L8.71154 8.16346M12 4.875L15.2885 8.16346" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        Upload
                    </button> */}
                </div>
               </div>
                
               {excelData ? <UploadedTable initialData={excelData} /> : ''}
                {/* {error && <p style={{ color: 'red' }}>{error}</p>}
                {excelData && (
                    <div>
                        <h3>Uploaded Excel Data:</h3>
                        <pre>{JSON.stringify(excelData, null, 2)}</pre>
                    </div>
                )} */}
            </>
        )
    }
}

export default UploadExcel
import React, { Component } from 'react'
import excelLogo from '../../assets/image/excel-logo.png'
import './UploadExcel.css'

export class UploadExcel extends Component {
    render() {
        return (
            <div className='center'>
                <div className='box flex justify-center items-center h-screen'>
                    <div className="flex flex-col items-center">
                        <div>
                            <img src={excelLogo} alt="Excel Logo" />
                        </div>
                        <div className='mt-4'>
                            <p className='excel-text'>Drop your excel sheet here or <span>browse</span></p>
                        </div>
                    </div>
                </div>
                <button type="button" className="upload-btn text-white py-2 px-4 rounded inline-flex items-center justify-center mt-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M19.125 14.1923V16.9327C19.125 18.1435 18.1435 19.125 16.9327 19.125H7.06731C5.85653 19.125 4.875 18.1435 4.875 16.9327V14.1923M12 15.8365V4.875M12 4.875L8.71154 8.16346M12 4.875L15.2885 8.16346" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    Upload
                </button>

            </div>
        )
    }
}

export default UploadExcel
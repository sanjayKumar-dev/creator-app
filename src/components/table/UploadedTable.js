import React, { useState } from 'react'
import './UploadedTable.css'

function UploadedTable({ initialData }) {
    const [tableData] = useState(initialData ? initialData.slice(1) : [])
    const [selectedTags, setSelectedTags] = useState([])

    const handleSelectTag = (tag, rowIndex) => {
        const updatedRowSelectedTags = [...selectedTags];
        if (!updatedRowSelectedTags[rowIndex]) {
            updatedRowSelectedTags[rowIndex] = [];
        }
        if (!updatedRowSelectedTags[rowIndex].includes(tag)) {
            updatedRowSelectedTags[rowIndex].push(tag);
        }
        setSelectedTags(updatedRowSelectedTags);
    }

    const renderSelectTagsDropdown = (tags, rowIndex) => {
        return (
            <select className='custom-select' onChange={(e) => handleSelectTag(e.target.value, rowIndex)}>
                <option disabled selected>Select Tags</option>

                {tags.map((tag, index) => (
                    <option className='custom-select-option' key={index} value={tag}>{tag}</option>
                ))}
            </select>
        )
    }

    const renderTableRows = () => {
        return tableData.map((row, index) => (
            <tr key={index}>
                {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cellIndex === 3 ? renderSelectTagsDropdown(cell.split(', '), index) : cell}</td>
                ))}
                <td>{selectedTags[index] && selectedTags[index].join(', ')}</td>
            </tr>
        ))
    }

    return (
        <div className='table-container'>
            <h2 className='text-2xl'>Uploads</h2>
            <div className='table mt-6'>
                <table >
                    <thead>
                        <tr align="Left">
                            {initialData[0].map((header, index) => (
                                <th style={{ textTransform: 'capitalize' }} key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {renderTableRows()}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UploadedTable
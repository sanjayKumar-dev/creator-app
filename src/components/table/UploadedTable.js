import React, { useState } from 'react'

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
            <select onChange={(e) => handleSelectTag(e.target.value, rowIndex)}>
                {tags.map((tag, index) => (
                    <option key={index} value={tag}>{tag}</option>
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
        <div className=''>
            Uploads
            <div>
                <table>
                    <thead>
                        <tr>
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
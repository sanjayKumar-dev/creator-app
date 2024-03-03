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

    const handleRemoveTag = (tagIndex, rowIndex) => {
        const updatedRowSelectedTags = [...selectedTags];
        updatedRowSelectedTags[rowIndex].splice(tagIndex, 1);
        setSelectedTags(updatedRowSelectedTags);
    }

    const renderTableRows = () => {
        return tableData.map((row, index) => (
            <tr key={index}>
                {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cellIndex === 1 ? <a className='link' href={`https://${cell}`} target="_blank">{cell}</a> :
                        cellIndex === 3 ? renderSelectTagsDropdown(cell.split(', '), index) : cell}</td>
                ))}

                <td>
                    {selectedTags[index] && selectedTags[index].map((tag, tagIndex) => (
                        <span className='tags' key={tagIndex}>{tag} &nbsp;<button onClick={() => handleRemoveTag(tagIndex, index)}>X</button></span>
                    ))}
                </td>
            </tr>
        ))
    }

    return (
        <div className='table-container m-6'>
            <h2 className='text-2xl mt-6 font-bold'>Uploads</h2>
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
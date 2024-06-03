import React, { useState } from 'react';
import api from '../api'; // Make sure to adjust the import path to your actual API module
import './FileUploadButton.css';

const FileUploadButton = ({ roundId, id, disabled }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [paintingTitle, setPaintingTitle] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [paintingState, setPaintingState] = useState('true');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleTitleChange = (event) => {
        setPaintingTitle(event.target.value);
    };

    const handleCheckboxChange = (event) => {
        setPaintingState(event.target.checked ? 'false' : 'true');
    };

    const handleFileUpload = () => {
        if (!selectedFile) {
            alert('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('paintingTitle', paintingTitle);
        formData.append('paintingState', paintingState);
        formData.append('roundId', roundId);

        api.post('/paintings', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(response => {
            console.log('File uploaded successfully:', response.data);
            alert('업로드 완료!');
            setIsModalOpen(false); // Close modal on success
            window.location.reload();
        })
        .catch(error => {
            console.error('Error uploading file:', error);
            alert('Error uploading file.');
        });
    };

    return (
        <div>
            <button 
                className="open-modal-button" 
                id={id}
                disabled={disabled}
                onClick={() => setIsModalOpen(true)}
            >
                Upload Image
            </button>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
                        <input type="text" placeholder="Enter painting title" value={paintingTitle} onChange={handleTitleChange} />
                        <input type="file" onChange={handleFileChange} />
                        <label style={{ marginRight: '10px', fontSize: '15px' }} >
                            <input
                                type="checkbox"
                                checked={paintingState === 'false'}
                                onChange={handleCheckboxChange}
                                style={{ marginRight: '8px'}}
                            />
                            그림 비공개
                        </label>
                        <button 
                            className="open-modal-button" 
                            onClick={handleFileUpload}
                            id={id}
                            disabled={disabled}
                        >
                            Upload
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileUploadButton;

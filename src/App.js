import React, { useState } from "react";
import "./App.css";

function App() {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const removeFile = (index) => {
    return () => {
      setFiles((prev) => {
        prev.splice(index, 1);
        return [...prev];
      });
    };
  };

  const handleFileChange = (e) => {
    setFiles((prev) => [...prev, ...Array.from(e.target.files)]);
  };

  const onDropImage = (e) => {
    handleFileChange({ target: { files: e.dataTransfer.files } });
    e.preventDefault();
  };
  const onDragOverImage = (e) => {
    setIsDragging(true);
    e.preventDefault();
  };
  const onDragExitImage = (e) => {
    setIsDragging(false);
    e.preventDefault();
  };

  const handleFileUpload = async () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    for (let i = 0; i < files.length; ++i) {
      formData.append("KEY TO IDENTIFY THE FILE", files[i], files[i].name);
    }

    // Details of the uploaded file for debugging
    console.log(files);

    // TODO: Make the backend call to send the files
    const response = await fetch("SOME_URL", {
      method: "POST",
      body: formData,
    });
    if (response.status !== 200) {
      // TODO: Handle error
      return;
    }
    // TODO: handle success response
  };

  return (
    // wrapper that should span the whole screen to handle the drag and dropped files
    <div
      className="App"
      onDrop={onDropImage}
      onDragOver={onDragOverImage}
      onDragExit={onDragExitImage}
    >
      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="file-upload" className="custom-file-upload">
          {isDragging ? "Drop files to upload!!" : "Upload file"}
        </label>
        <input
          id="file-upload"
          // TODO: Set the kind of files accepted: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept
          accept="image/*"
          type="file"
          // Change to false if only one file
          multiple={true}
          onChange={handleFileChange}
        />
        {/* Displaying the list of uploaded files */}
        {files.map((file, index) => {
          return (
            <React.Fragment key={index}>
              <p>
                <strong onClick={removeFile(index)} className="remove-button">
                  <span>X</span>
                </strong>
                {file.name}
              </p>
              {file.type.startsWith("image") && (
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="image-preview"
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
      <button className="btn" onClick={handleFileUpload}>
        Save
      </button>
    </div>
  );
}

export default App;

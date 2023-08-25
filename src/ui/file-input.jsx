/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { FileCard, FileUploader, MimeType, Pane } from "evergreen-ui";
import React from "react";
import { Label } from "../components/ui/label";
import { Progress } from "../components/ui/progress";

const FileInput = ({ files, setFiles, fileName, progress, handleChangeFile, label, progressClassName }) => {
  const [fileRejections, setFileRejections] = React.useState([]);
  const handleChange = React.useCallback((files) => {
    setFiles([files[0]]);
    handleChangeFile([files[0]]);
  }, []);
  const handleRejected = React.useCallback(
    (fileRejections) => setFileRejections([fileRejections[0]]),
    []
  );
  const handleRemove = React.useCallback(() => {
    setFiles([]);
    setFileRejections([]);
  }, []);
  return (
    <Pane maxWidth={654} className="mt-10">
      <Label htmlFor="upload" className="text-sm mt-4">
        {label || 'Logo'} *
      </Label>
      <FileUploader
        label=""
        description="You can upload 1 file. File can be up to 50 MB."
        maxSizeInBytes={50 * 1024 ** 2}
        acceptedFiles={[MimeType.jpeg, MimeType.png,]}
        maxFiles={1}
        onChange={handleChange}
        onRejected={handleRejected}
        renderFile={(file) => {
          const { name, size, type } = file;
          const fileRejection = fileRejections.find(
            (fileRejection) => fileRejection.file === file
          );
          const { message } = fileRejection || {};
          return (
            <FileCard
              key={name}
              isInvalid={fileRejection != null}
              name={name}
              onRemove={handleRemove}
              sizeInBytes={size}
              type={type}
              validationMessage={message}
            />
          );
        }}
        values={files}
      />
      {(Number(progress) > 0 || fileName) && (
        <div className="w-full flex items-center my-3">
          <Progress
            value={progress}
            className={`w-[88%] ${progressClassName}`}
          />
          <p className={`text-sm ml-2 mt-1 w-[12%] ${progressClassName}`}>{`${progress}%`}</p>
        </div>
      )}
    </Pane>
  );
};

export default FileInput;
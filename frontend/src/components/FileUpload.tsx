import { useState } from "react";
import axios from "axios";

interface Props {
  onUploadSuccess: (data: any) => void;
}

function FileUpload({ onUploadSuccess }: Props) {
  const [file, setFile] = useState<File | null>(null);

  const uploadFile = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("swagger", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData
      );

      onUploadSuccess(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".json"
        onChange={(e) =>
          setFile(e.target.files ? e.target.files[0] : null)
        }
      />

      <button onClick={uploadFile}>
        Upload Swagger File
      </button>
    </div>
  );
}

export default FileUpload;
import { useState, useCallback } from 'react';
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';

interface UploadedFile extends File {
  id: string;
  progress: number;
  status: 'uploading' | 'success' | 'error';
}

export function FileUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      ...file,
      id: Math.random().toString(36).substring(7),
      progress: 0,
      status: 'uploading' as const,
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach((file) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress > 100) {
          clearInterval(interval);
          setFiles((prev) =>
            prev.map((f) =>
              f.id === file.id ? { ...f, status: 'success' as const } : f
            )
          );
        } else {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === file.id ? { ...f, progress } : f
            )
          );
        }
      }, 500);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
  });

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={cn(
          "flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-lg transition-colors duration-200",
          isDragActive
            ? "border-fundspoke-500 bg-fundspoke-50 dark:bg-fundspoke-900/20"
            : "border-gray-300 dark:border-gray-600 hover:border-fundspoke-500"
        )}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 text-gray-400 mb-4" />
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {isDragActive ? (
            "Drop the files here"
          ) : (
            "Drag and drop files here, or click to select files"
          )}
        </p>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          PDF, DOC, DOCX, XLS, XLSX up to 50MB each
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Uploaded Files
          </h3>
          <ul className="space-y-3">
            {files.map((file) => (
              <li
                key={file.id}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {file.status === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : file.status === 'error' ? (
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-fundspoke-500 border-t-transparent rounded-full animate-spin" />
                    )}
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {file.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {file.status === 'success'
                        ? 'Completed'
                        : file.status === 'error'
                        ? 'Failed'
                        : `${file.progress}%`}
                    </span>
                    <button
                      onClick={() => removeFile(file.id)}
                      className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {file.status === 'uploading' && (
                  <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div
                      className="bg-fundspoke-500 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${file.progress}%` }}
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {files.length > 0 && (
        <div className="flex justify-end">
          <Button
            type="button"
            variant="secondary"
            className="mr-3"
            onClick={() => setFiles([])}
          >
            Clear All
          </Button>
          <Button
            type="button"
            disabled={files.some((f) => f.status === 'uploading')}
          >
            Process Files
          </Button>
        </div>
      )}
    </div>
  );
}
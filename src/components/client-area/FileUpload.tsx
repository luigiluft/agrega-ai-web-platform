import { useState } from "react";
import { Upload, File, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

const FileUpload = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files).map(file => ({
      name: file.name,
      size: file.size,
      type: file.type
    }));
    
    setFiles(prev => [...prev, ...droppedFiles]);
    toast.success("Arquivos adicionados com sucesso!");
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).map(file => ({
        name: file.name,
        size: file.size,
        type: file.type
      }));
      
      setFiles(prev => [...prev, ...selectedFiles]);
      toast.success("Arquivos adicionados com sucesso!");
    }
  };

  const removeFile = (fileName: string) => {
    setFiles(files.filter(file => file.name !== fileName));
    toast.success("Arquivo removido com sucesso!");
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Arquivos do Projeto</h2>
      
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? "border-primary bg-primary/5" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-2">
          Arraste arquivos aqui ou clique para selecionar
        </p>
        <input
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="inline-block bg-primary text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-primary/90 transition-colors"
        >
          Selecionar Arquivos
        </label>
      </div>

      {files.length > 0 && (
        <div className="mt-6 space-y-2">
          <h3 className="font-medium mb-2">Arquivos Carregados</h3>
          {files.map((file) => (
            <div
              key={file.name}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <File className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFile(file.name)}
                className="p-1 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default FileUpload;
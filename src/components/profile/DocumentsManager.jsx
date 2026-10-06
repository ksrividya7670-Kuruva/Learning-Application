import React, { useState, useRef } from 'react';
import { Upload, FileText, Download, Trash2, FileCheck, Eye, X } from 'lucide-react';

const DocumentsManager = ({ profile }) => {
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Student ID Card.pdf', type: 'ID Card', size: '245 KB', uploadedAt: '12 May 2026', status: 'Verified' },
    { id: 2, name: '10th_Mark_Sheet.pdf', type: 'Mark Sheet', size: '1.2 MB', uploadedAt: '15 May 2026', status: 'Pending' },
  ]);

  const [selectedType, setSelectedType] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const documentTypes = [
    'Profile Photo',
    'Resume/CV',
    'Aadhaar Card',
    'PAN Card',
    'Passport',
    'Student ID Card',
    'Degree Certificate',
    'Mark Sheet'
  ];

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleFileSelection = (file) => {
    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit");
      return;
    }
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (!selectedFile || !selectedType) return;
    
    const newDoc = {
      id: Date.now(),
      name: selectedFile.name,
      type: selectedType,
      size: (selectedFile.size / 1024).toFixed(1) > 1024 
            ? (selectedFile.size / (1024 * 1024)).toFixed(1) + ' MB' 
            : (selectedFile.size / 1024).toFixed(1) + ' KB',
      uploadedAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Pending'
    };

    setDocuments([newDoc, ...documents]);
    setSelectedFile(null);
    setSelectedType('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDelete = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  return (
    <div className="space-y-8">
      
      {/* Upload Section */}
      <div className="rounded-none border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)]">
        <div className="mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            Upload Document
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Upload your academic and identification documents here (PDF, JPG, PNG). Max 5MB.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-full sm:w-1/3">
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Document Type</label>
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full rounded-none border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm focus:border-primary focus:bg-white dark:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition"
            >
              <option value="">Select Type</option>
              {documentTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div className="w-full sm:w-2/3">
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Select File</label>
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => {
                if (!selectedFile && fileInputRef.current) {
                  fileInputRef.current.click();
                }
              }}
              className={`mt-1 flex justify-center rounded-none border-2 border-dashed px-6 py-8 transition cursor-pointer ${
                isDragging ? 'border-primary bg-slate-50 dark:bg-slate-800' : 'border-slate-300 dark:border-slate-600 hover:border-primary hover:bg-slate-50 dark:bg-slate-800/50'
              }`}
            >
              <div className="text-center">
                {selectedFile ? (
                  <div className="flex flex-col items-center">
                    <FileText className="mx-auto h-8 w-8 text-primary" />
                    <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">{selectedFile.name}</p>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      className="mt-2 text-xs font-medium text-red-500 hover:text-red-700 flex items-center gap-1"
                    >
                      <X className="h-3 w-3" /> Remove File
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="mx-auto h-8 w-8 text-slate-400" />
                    <div className="mt-4 flex text-sm leading-6 text-[#7C3AED]">
                      <span className="relative cursor-pointer rounded-none font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary/80">
                        <span>Upload a file</span>
                        <input 
                          id="file-upload" 
                          name="file-upload" 
                          type="file" 
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept=".pdf,.png,.jpg,.jpeg"
                          className="sr-only" 
                        />
                      </span>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">PDF, PNG, JPG up to 5MB</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button 
            onClick={handleUpload}
            disabled={!selectedFile || !selectedType}
            className="rounded-none bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)] transition hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Upload
          </button>
        </div>
      </div>

      {/* Uploaded Documents List */}
      <div className="rounded-none border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)]">
        <div className="mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">My Documents</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Manage your uploaded files.</p>
        </div>

        {documents.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead>
                <tr>
                  <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Document Name</th>
                  <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date</th>
                  <th scope="col" className="relative px-4 py-3.5"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50 dark:bg-slate-800 transition">
                    <td className="whitespace-nowrap px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-none bg-slate-100 dark:bg-slate-800 text-primary">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-white text-sm">{doc.name}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">{doc.size}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-[#7C3AED]">
                      {doc.type}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        doc.status === 'Verified' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20' : 
                        'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 ring-1 ring-inset ring-[#7C3AED]/20'
                      }`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-[#7C3AED]">
                      {doc.uploadedAt}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button className="text-slate-400 hover:text-primary transition" title="Preview">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-slate-400 hover:text-blue-600 transition" title="Download">
                          <Download className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(doc.id)}
                          className="text-slate-400 hover:text-red-600 transition" title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <FileCheck className="mx-auto h-12 w-12 text-slate-300" />
            <h3 className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">No documents</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Get started by uploading a new document.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default DocumentsManager;



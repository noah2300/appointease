import { useState } from 'react';
import { FileText, Download, Upload, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const mockDocuments = [
  {
    id: '1',
    name: 'Business License',
    type: 'PDF',
    size: '2.5 MB',
    uploadedAt: '2024-03-01',
    status: 'verified'
  },
  {
    id: '2',
    name: 'Insurance Certificate',
    type: 'PDF',
    size: '1.8 MB',
    uploadedAt: '2024-02-28',
    status: 'pending'
  }
];

export function DocumentsTab() {
  const [documents] = useState(mockDocuments);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Documents</h2>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </div>

      <div className="rounded-lg border bg-white">
        <div className="p-4">
          <h3 className="font-medium">Required Documents</h3>
          <p className="mt-1 text-sm text-gray-600">
            Please ensure all required documents are up to date
          </p>
        </div>
        <div className="divide-y">
          {documents.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-gray-100 p-2">
                  <FileText className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-medium">{doc.name}</h4>
                  <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
                    <span>{doc.type}</span>
                    <span>•</span>
                    <span>{doc.size}</span>
                    <span>•</span>
                    <span>{doc.uploadedAt}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                  doc.status === 'verified' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                </span>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
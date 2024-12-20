import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (service: any) => void;
}

export function AddServiceModal({ isOpen, onClose, onAdd }: AddServiceModalProps) {
  const [serviceName, setServiceName] = useState('');
  const [duration, setDuration] = useState('60');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      name: serviceName,
      duration: parseInt(duration),
      price: parseFloat(price),
      description,
      category,
      status: 'active'
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-xl font-semibold">Add New Service</h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Service Name
            </label>
            <input
              type="text"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Duration (minutes)
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2"
            >
              <option value="30">30 minutes</option>
              <option value="60">60 minutes</option>
              <option value="90">90 minutes</option>
              <option value="120">120 minutes</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price ($)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2"
              required
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2"
              required
            >
              <option value="">Select a category</option>
              <option value="Hair">Hair</option>
              <option value="Spa">Spa</option>
              <option value="Massage">Massage</option>
              <option value="Dental">Dental</option>
              <option value="Medical">Medical</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2"
              rows={3}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Add Service
          </Button>
        </form>
      </div>
    </div>
  );
}
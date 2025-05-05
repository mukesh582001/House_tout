import React, { useState } from 'react';

function AdminPanel() {
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [type, setType] = useState('exterior'); // Default to exterior

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('model', file);
    formData.append('type', type);

    try {
      const res = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error('Failed to upload model:', err);
      alert('Failed to upload model');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <form onSubmit={handleUpload} className="space-y-4">
        <input
          type="text"
          placeholder="Model Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="file"
          accept=".glb"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 w-full"
          required
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 w-full"
          required
        >
          <option value="exterior">Exterior</option>
          <option value="interior">Interior</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Upload Model
        </button>
      </form>
    </div>
  );
}

export default AdminPanel;
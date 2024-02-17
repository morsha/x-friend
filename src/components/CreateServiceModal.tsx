import { useState } from 'react';

function CreateServiceModal({ onClose, onSubmit }: any) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit({ title, description });
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Create Service</button>
        <button type="button" onClick={onClose}>Close</button>
      </form>
    </div>
  );
}

export default CreateServiceModal;

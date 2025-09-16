import React, { useState } from "react";

type DataInputFormProps = {
  onAdd: (data: { title: string; value: string }) => void;
};

const DataInputForm: React.FC<DataInputFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !value.trim()) {
      setError("Both fields are required.");
      return;
    }
    setError("");
    onAdd({ title: title.trim(), value: value.trim() });
    setTitle("");
    setValue("");
  };

  return (
    <form className="w-full max-w-md mb-4" onSubmit={handleSubmit}>
      <div className="flex gap-2 mb-2">
        <input
          className="border border-gray-300 rounded px-3 py-2 w-1/2"
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          className="border border-gray-300 rounded px-3 py-2 w-1/2"
          type="text"
          placeholder="Value"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </div>
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        type="submit"
      >
        Add Data
      </button>
    </form>
  );
};

export default DataInputForm;
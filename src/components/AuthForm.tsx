import React, { useState } from "react";

type AuthFormProps = {
  onLogin: (username: string) => void;
};

const AuthForm: React.FC<AuthFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Username is required.");
      return;
    }
    setError("");
    onLogin(username.trim());
  };

  return (
    <form className="w-full max-w-xs mx-auto" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <input
        className="border border-gray-300 rounded px-3 py-2 w-full mb-2"
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoFocus
      />
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
        type="submit"
      >
        Log In
      </button>
    </form>
  );
};

export default AuthForm;
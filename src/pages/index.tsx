import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import Dashboard from "../components/Dashboard";
import DataInputForm from "../components/DataInputForm";

type Datum = { title: string; value: string };

export default function Home() {
  const [username, setUsername] = useState<string | null>(null);
  const [data, setData] = useState<Datum[]>([]);

  const handleLogin = (user: string) => setUsername(user);
  const handleLogout = () => {
    setUsername(null);
    setData([]);
  };

  const handleAddData = (datum: Datum) => setData(prev => [...prev, datum]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <h1 className="text-4xl font-bold mb-2">Open Impact</h1>
      <p className="mb-8 text-center max-w-md text-gray-700">
        Open Impact is an open-source platform to explore, analyze, and share social and environmental impact data.
      </p>
      {!username ? (
        <AuthForm onLogin={handleLogin} />
      ) : (
        <>
          <DataInputForm onAdd={handleAddData} />
          <Dashboard username={username} data={data} onLogout={handleLogout} />
        </>
      )}
    </main>
  );
}
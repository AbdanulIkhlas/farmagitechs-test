"use client";

import { useState } from "react";

export default function GroupSearch({ onSearch }) {
  const [searchId, setSearchId] = useState("");

  const handleSearch = () => {
    onSearch(searchId.trim()); // bisa kosong atau angka
  };

  return (
    <div className="mb-6 flex items-center space-x-4">
      <input
        type="number"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        placeholder="Cari berdasarkan ID Group"
        className="border px-3 py-2 rounded w-64 text-gray-700 hp:w-full"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Cari
      </button>
    </div>
  );
}

import React from "react";
import { useState } from "react";

export default function PokeSearch({ onSearch }) {
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearch(query);
    onSearch(query);
  };
  return (
    <div>
      <input
        type="text"
        value={search}
        placeholder="Search Pokémon..."
        onChange={handleSearch}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          marginBottom: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
}

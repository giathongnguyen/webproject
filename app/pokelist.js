"use client";

import React, { useEffect, useState } from "react";
import Pokemon from "./pokemon";
import PokeSearch from "./pokeSearch";

const PokeList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  const fetchPokemon = async () => {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0"
    );
    const data = await response.json();

    const fetchedPokemon = [];

    for (const poke of data.results) {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${poke.name}`
      );
      const pokemonData = await response.json();
      fetchedPokemon.push(pokemonData);
      fetchedPokemon.sort((a, b) => a.id - b.id);
      setPokemon([...fetchedPokemon]);
      setFilteredPokemon([...fetchedPokemon]);
    }

    console.log(fetchedPokemon);
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = pokemon.filter((poke) =>
      poke.name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredPokemon(filtered);
  };
  return (
    <div>
      <PokeSearch onSearch={handleSearch} />
      <div className="">
        {filteredPokemon.map((pokemonstats) => (
          <Pokemon
            key={pokemonstats.id}
            id={pokemonstats.id.toString().padStart(3, "0")}
            image={pokemonstats.sprites.front_default}
            name={pokemonstats.name.replace(/^./, (c) => c.toUpperCase())}
            type={pokemonstats.types
              .map((typeObj) => typeObj.type.name)
              .join(", ")}
            weight={pokemonstats.weight}
            height={pokemonstats.height}
            stats={pokemonstats.stats.map((stat) => stat.base_stat).slice(0, 3)}
            statsName={pokemonstats.stats
              .map((stat) => stat.stat.name)
              .slice(0, 3)}
          />
        ))}
      </div>
    </div>
  );
};

export default PokeList;

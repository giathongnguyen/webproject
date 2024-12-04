"use client";

import React, { useEffect, useState } from "react";
import Pokemon from "./pokemon";
import PokeSearch from "./pokeSearch";

const PokeList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      window.scrollY > 500 ? setIsVisible(true) : setIsVisible(false);
    };
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    isVisible &&
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
  };
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
      <div className="flex flex-wrap justify-center gap-4 p-4 bg-red-500">
        {filteredPokemon.map((pokemonstats) => (
          <Pokemon
            key={pokemonstats.id}
            id={pokemonstats.id.toString().padStart(3, "0")}
            image={pokemonstats.sprites.other["official-artwork"].front_default}
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
      <button
        className={`font-bold bg-yellow-300 fixed bottom-4 right-4 rounded-full p-2 outline-none transition-opacity duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={scrollToTop}
      >
        SCROLL TO TOP
      </button>
    </div>
  );
};

export default PokeList;

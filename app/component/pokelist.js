"use client";

import React, { useEffect, useState } from "react";
import Pokemon from "./pokemon";
import PokeSearch from "../topbar/pokeSearch";
import Loading from "../loading/loading";
import Theme from "../topbar/Theme";

const PokeList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(loaderTimeout);
  }, []);

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
    }

    fetchedPokemon.sort((a, b) => a.id - b.id);
    setPokemon(fetchedPokemon);
    setFilteredPokemon(fetchedPokemon);
    setIsLoading(false);
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-white dark:bg-gray-800">
      <div className="absolute top-28 right-4 z-10">
        <Theme />
      </div>
      <PokeSearch onSearch={handleSearch} />
      <div className="flex flex-wrap justify-center gap-4 p-4">
        {filteredPokemon.map((pokemonstats) => (
          <Pokemon
            key={pokemonstats.name}
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
            abilities={pokemonstats.abilities
              .map((ability) => ability.ability.name)
              .slice(0, 3)}
          />
        ))}
      </div>

      <button
        className={`font-bold bg-yellow-300 fixed bottom-4 right-4 rounded-full p-4 outline-none transition-opacity duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={scrollToTop}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 18.75 7.5-7.5 7.5 7.5"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 12.75 7.5-7.5 7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default PokeList;

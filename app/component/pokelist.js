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
  const [page, setPage] = useState(0);
  const [inputPage, setInputPage] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  const limit = 50;

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
        behavior: "smooth",
      });
  };

  const fetchPokemon = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0"
      );
      const data = await response.json();

      const fetchedPokemon = await Promise.all(
        data.results.map(async (poke) => {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${poke.name}`
          );
          return await response.json();
        })
      );

      fetchedPokemon.sort((a, b) => a.id - b.id);

      setPokemon(fetchedPokemon);
      setFilteredPokemon(fetchedPokemon);
      setTotalPages(Math.ceil(fetchedPokemon.length / limit));
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    } finally {
      setIsLoading(false);
    }
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
    setPage(0);
    setTotalPages(Math.ceil(filtered.length / limit));
  };

  const handlePageChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[0-9\b]+$/.test(value)) {
      setInputPage(value);
    }
  };

  const goToPage = () => {
    if (inputPage !== "") {
      const pageNumber = parseInt(inputPage) - 1;
      if (!isNaN(pageNumber) && pageNumber >= 0 && pageNumber < totalPages) {
        setPage(pageNumber);
      }
    }
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const goToFirstPage = () => {
    setPage(0);
  };

  const goToLastPage = () => {
    setPage(totalPages - 1);
  };

  if (isLoading) {
    return <Loading />;
  }

  const displayedPokemon = filteredPokemon.slice(
    page * limit,
    (page + 1) * limit
  );

  return (
    <div className="bg-white dark:bg-gray-800">
      <div className="absolute top-28 right-4 z-10">
        <Theme />
      </div>
      <PokeSearch onSearch={handleSearch} />
      <div className="flex flex-wrap justify-center gap-4 p-4">
        {displayedPokemon.map((pokemonstats) => (
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

      <div className="flex justify-center space-x-4 p-4">
        <button
          className="font-bold bg-yellow-300 rounded-full p-4 outline-none"
          onClick={goToFirstPage}
          disabled={page === 0}
        >
          First
        </button>
        <button
          className="font-bold bg-yellow-300 rounded-full p-4 outline-none"
          onClick={handlePrevPage}
          disabled={page === 0}
        >
          Previous
        </button>
        <input
          type="text"
          value={inputPage}
          onChange={handlePageChange}
          placeholder="Page number"
          className="text-center rounded-full p-2 border-2 border-gray-300"
        />
        <button
          className="font-bold bg-yellow-300 rounded-full p-4 outline-none w-20"
          onClick={goToPage}
        >
          Go
        </button>
        <button
          className="font-bold bg-yellow-300 rounded-full p-4 outline-none w-20"
          onClick={handleNextPage}
          disabled={page === totalPages - 1}
        >
          Next
        </button>
        <button
          className="font-bold bg-yellow-300 rounded-full p-4 outline-none w-20"
          onClick={goToLastPage}
          disabled={page === totalPages - 1}
        >
          Last
        </button>
      </div>

      <div className="flex justify-center p-4 mr-20">
        <span className="dark:text-white">
          Page {page + 1} of {totalPages}
        </span>
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

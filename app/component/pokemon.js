import React from "react";
import { useState } from "react";
import PokemonPopup from "./pokemonpopup";

const Pokemon = ({
  id,
  name,
  image,
  type,
  weight,
  height,
  stats,
  statsName,
  abilities,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const typesArray = type.split(", ");
  const typeColors = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#D685AD",
  };

  return (
    <div>
      <div
        className="dark:text-white gap-2 p-4 rounded-lg drop-shadow-lg m-2 w-56 flex flex-col items-center transform transition-transform duration-300 ease-in-out hover:scale-105 hover:drop-shadow-2xl cursor-pointer"
        style={{ backgroundColor: "rgba(105, 105, 105, 0.5)" }}
        onClick={handleOpenPopup}
      >
        <div className="flex flex-col items-center">
          <img src={image} alt={name} className="mb-2" />
          <p className="text-center">No. {id}</p>
          <p className="text-center font-bold">{name}</p>
        </div>
        <div className="flex gap-2 flex-wrap justify-center">
          {typesArray.map((type) => (
            <span
              key={type}
              style={{
                backgroundColor: typeColors[type.toLowerCase()] || "#ccc",
                color: "#fff",
                padding: "5px 10px",
                borderRadius: "20px",
                fontWeight: "bold",
                textTransform: "capitalize",
                border: "2px solid #fff",
                width: "90px",
                textAlign: "center",
              }}
            >
              {type}
            </span>
          ))}
        </div>
        <div className="text-center mt-2">
          <p className="dark:text-[#C5A880] text-[#532E1C] font-bold">
            Weight: {weight} lbs
          </p>
          <p className="dark:text-[#8174A0] text-[#441752] font-bold">
            Height: {height}0 cm
          </p>
        </div>
      </div>
      {isPopupOpen && (
        <PokemonPopup
          id={id}
          image={image}
          name={name}
          weight={weight}
          height={height}
          stats={stats}
          statsName={statsName}
          type={type}
          abilities={abilities}
          onClick={handleClosePopup}
        />
      )}
    </div>
  );
};

export default Pokemon;

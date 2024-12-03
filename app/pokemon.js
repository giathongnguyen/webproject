import React from "react";

const Pokemon = ({
  id,
  name,
  image,
  type,
  weight,
  height,
  stats,
  statsName,
}) => {
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
    dark: "#EE99AC",
  };
  return (
    <div>
      <div>
        <img src={image} alt={name} />
        <p>No. {id}</p>
        <p>{name}</p>
      </div>
      <div
        style={{
          display: "flex",
          gap: "5px",
          flexWrap: "wrap",
        }}
      >
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
            }}
          >
            {type}
          </span>
        ))}
      </div>
      <div>
        <p>Weight: {weight} lbs</p>
        <p>Height: {height}0 cm</p>
      </div>
      <div className="flex gap-2">
        <div>
          {statsName.map((stats, index) => (
            <p className="uppercase" key={index}>
              {stats}:
            </p>
          ))}
        </div>
        <div>
          {stats.map((stats, index) => (
            <p key={index}>{stats}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pokemon;

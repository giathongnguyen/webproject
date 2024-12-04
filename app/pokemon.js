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
    fairy: "#D685",
  };
  return (
    <div
      className="gap-2 p-4 rounded-lg drop-shadow-lg m-2 w-56 flex flex-col items-center"
      style={{ backgroundColor: "rgba(105, 105, 105, 0.5)" }}
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
              width: "80px",
              textAlign: "center",
            }}
          >
            {type}
          </span>
        ))}
      </div>
      <div className="text-center mt-2">
        <p>Weight: {weight} lbs</p>
        <p>Height: {height}0 cm</p>
      </div>
      <div className="flex gap-2 justify-center items-center mt-2">
        <div>
          {statsName.map((stats, index) => (
            <p className="uppercase text-center" key={index}>
              {stats}:
            </p>
          ))}
        </div>
        <div>
          {stats.map((stats, index) => (
            <p className="text-center" key={index}>
              {stats}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pokemon;

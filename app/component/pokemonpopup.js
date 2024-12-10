import React from "react";

const PokemonPopup = ({
  id,
  image,
  name,
  type,
  weight,
  height,
  stats,
  statsName,
  onClick,
  abilities,
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
    fairy: "#D685AD",
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClick}
    >
      <div
        className="bg-[#9AA6B2] p-4 rounded-lg shadow-lg w-auto relative"
        onClick={handleContentClick}
      >
        <div
          onClick={onClick}
          className="absolute top-2 right-2 bg-black rounded-full cursor-pointer px-2 py-1 text-white text-xs"
        >
          ✖
        </div>
        <div className="flex flex-col items-center text-4xl">
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
          <p className="text-[#532E1C] font-bold">Weight: {weight} lbs</p>
          <p className="text-[#441752] font-bold">Height: {height}0 cm</p>
        </div>
        <div className="flex flex-wrap justify-evenly">
          <div className="text-xl flex justify-center items-center gap-2 mt-2 p-3 px-7 bg-[#758694] rounded-lg outline outline-2">
            <div>
              {statsName.map((stat, index) => (
                <p
                  className={`uppercase font-bold ${
                    stat.toLowerCase() === "attack"
                      ? "text-red-500"
                      : stat.toLowerCase() === "defense"
                      ? "text-blue-500"
                      : "text-green-500"
                  }`}
                  key={index}
                >
                  {stat}:
                </p>
              ))}
            </div>
            <div>
              {stats.map((stat, index) => (
                <p className="text-center" key={index}>
                  {stat}
                </p>
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center mt-2 bg-[#758694] rounded-lg outline outline-2 ">
            <div className="font-bold text-center">
              <div className="uppercase border-b-2 border-black">
                <p className="m-3 mx-14">Abilities</p>
              </div>
              <div className="bg-[#9AA6B2]">
                {abilities.map((ability, index) => (
                  <p
                    className={`capitalize px-2 py-2 ${
                      index === 0 ? "border-b-2 border-black" : ""
                    }`}
                    key={index}
                  >
                    {ability}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonPopup;

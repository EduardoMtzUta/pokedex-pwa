import "./App.css";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';


function App() {

  const [pokemon, setPokemon] = useState({});

  const fetchPokemon = (id) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => response.json())
      .then((data) => setPokemon(data));
  };

  const showAlert = () => {
    Swal.fire({
      title: pokemon?.name,
      text: pokemon?.abilities?.map((ability) => ability.ability.name),
      imageUrl: pokemon?.sprites?.front_default,
      imageWidth: 300,
      imageHeight: 300,
      imageAlt: 'Custom image',
    })
  }


  const getRandomInt = (min = 1, max = 600) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const getNext = () => {
    return pokemon.id + 1;
  };

  const getBack = () => {
    return pokemon.id - 1;
  };

  const showAbilities = () => {
    document.getElementById("abilities").style.display = "block";
    setTimeout(() => {
      document.getElementById("abilities").style.display = "none";
    }, 10000);
  };

  useEffect(() => {
    console.log({ pokemon });
    console.log(pokemon?.abilities?.map((ability) => ability.ability.name));
  }, [pokemon]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="flex-container">
          <a
            className="alignCentral"
            href="https://github.com/EduardoMtzUta/pokedex"
          >
            Github
          </a>
          <img
            src={
              pokemon?.sprites?.front_default ??
              "https://1000marcas.net/wp-content/uploads/2020/01/Logo-Pokemon.png"
            }
            className="poke-image"
            alt="logo"
          />
          <img
            src={
              pokemon?.sprites?.back_default ??
              "https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png"
            }
            className="poke-image"
            alt="logo"
          />
        </div>
        <p>Id: {pokemon.id ?? "No pokemon selected"}</p>
        <p>Name: {pokemon.name ?? "No pokemon selected"}</p>
        {pokemon.id ? (
          <>
            <button
              className="hiddenAbilities buttonAbilities"
              onClick={(showAbilities, () => showAlert())}
            >
              Abilities
            </button>
            <br />
            <br />
          </>
        ) : (
          <p></p>
        )}
        <div className="flex-container">
          {pokemon.id ? (
            <>
              <button
                className="button"
                onClick={() => fetchPokemon(getBack())}
              >
                Back
              </button>{" "}
            </>
          ) : (
            <button className="button" onClick={() => fetchPokemon(600)}>
              Back
            </button>
          )}

          <button
            className="button"
            onClick={() => fetchPokemon(getRandomInt())}
          >
            Random
          </button>

          {pokemon.id ? (
            <>
              <button
                className="button"
                onClick={() => fetchPokemon(getNext())}
              >
                Next
              </button>{" "}
            </>
          ) : (
            <button className="button" onClick={() => fetchPokemon(1)}>
              Next
            </button>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;

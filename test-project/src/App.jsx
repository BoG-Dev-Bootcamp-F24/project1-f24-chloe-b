// use dependencies from React library
import React, { useState, useEffect } from 'react';
// import custom styles 
import './App.css';

function App() {
  // declare variables to store fetched Pokemon data
  const [pokemon, setPokemon] = useState(null); 
  const [pokemonId, setPokemonId] = useState(1);
  const [attributes, setAttributes] = useState('info');

  // fetch Pokemon data from PokeAPI as pokemonId changes
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then((response) => response.json()).then((data) => setPokemon(data));
  }, [pokemonId]);

  // fetch the next Pokemon by incrementing pokemonId
  const next = () => setPokemonId((currId) => currId + 1);
  // fetch previous Pokemon by decrementing pokemonId
  const prev = () => setPokemonId((currId) => (currId > 1 ? currId - 1 : 1));

  // object contains colors for various Pokemon types/categories
  const categoryColors = {
    normal: '#A8A77A',
    bug: '#B07C4F',
    dark: '#9D6282',
    dragon: '#A52DD2',
    electric: '#EEC011',
    fairy: '#F68AC6',
    fighting: '#B8474D',
    fire: '#EF1016',
    flying: '#44BB95',
    ghost: '#D1B9ED',
    grass: '#37BD0B',
    ground: '#A0740A',
    ice: '#B4E7FF',
    poison: '#0EFF2D',
    psychic: '#8807C9',
    rock: '#888888',
    steel: '#D4D4D4',
    water: '#0ACDF5',
  };

  return (
    <div className='pokemonProject'>
      {pokemon && (
        <>
          <h1>Bits of Good Mid-Semester Project</h1>
          <div className="content">
            <div className='pokeDisplay'>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <p id='pokeName'>{pokemon.name}</p>
              <p><b>Types:</b></p>
              <div>
                {pokemon.types.map((typeInfo, index) => (
                  <span key={index} className='pokeTypes' style={{ backgroundColor: categoryColors[typeInfo.type.name] }}>{typeInfo.type.name}</span>
                ))}
              </div>
              <div className='navArrows'>
                <button className='prevBtn' onClick={prev}>{'<'}</button>
                <button className='nextBtn' onClick={next}>{'>'}</button>
              </div>
            </div>

            <div className='pokeInfo'>
              <h2 className='detailsDisplay'><b>{attributes === 'info' ? 'Info' : 'Moves'}</b></h2>
              <div className='details'>
                {attributes === 'info' ? (
                  <div>
                    <p>
                      height: {pokemon.height / 10}m<br />
                      weight: {pokemon.weight / 10}kg<br />
                      {pokemon.stats.map((statInfo, index) => (
                        <React.Fragment key={index}>
                          {statInfo.stat.name}: {statInfo.base_stat}
                          {index < pokemon.stats.length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </p>
                  </div>
                ) : (
                  <div>
                    <ul>
                      {pokemon.moves.map((moveInfo, index) => (
                        <li key={index}>{moveInfo.move.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className='detailsOptions'>
                <button className={attributes === 'info' ? 'active' : ''} onClick={() => setAttributes('info')}>Info</button>
                <button className={attributes === 'moves' ? 'active' : ''} onClick={() => setAttributes('moves')}>Moves</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;

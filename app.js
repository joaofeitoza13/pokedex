const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromisses = () => Array(150).fill().map((_, index) => 
  fetch(getPokemonUrl(index+1)).then(response => response.json()))

const generateHTML = pokemons => {
  return pokemons.reduce((acc, pokemon) => {
    const types = pokemon.types.map(typeInfo => typeInfo.type.name)

    acc += `
      <li class="card ${types[0]}">
        <img class="card-image" 
          alt="${pokemon.name}"
          src="https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon.id}.svg" 
        />
        <h2 class="card-title"> ${pokemon.id}. ${pokemon.name} </h2>
        <p class="card-subtitle"> ${types.join(' | ')} </p>
      </li>
    `
    return acc
  }, '')

}

const insertPokemonsIntoPage = pokemons => {
  const ul = document.querySelector('[data-js="pokedex"]')
  ul.innerHTML = pokemons
}

const pokemonPromises = generatePokemonPromisses

Promise.all(pokemonPromises)
  .then(generateHTML)
  .then(insertPokemonsIntoPage)

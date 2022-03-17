const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromisses = () => Array(150).fill().map((_, index) => 
  fetch(getPokemonUrl(index+1)).then(response => response.json()))

const generateHTML = pokemons => pokemons.reduce((acc, { name, id, types}) => {
  const elementTypes = types.map(typeInfo => typeInfo.type.name)

  acc += `
    <li class="card ${elementTypes[0]}">
      <img class="card-image" 
        alt="${name}"
        src="https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg" 
      />
      <h2 class="card-title"> ${id}. ${name} </h2>
      <p class="card-subtitle"> ${elementTypes.join(' | ')} </p>
    </li>
  `
  return acc
}, '')


const insertPokemonsIntoPage = pokemons => {
  const ul = document.querySelector('[data-js="pokedex"]')
  ul.innerHTML = pokemons
}

const pokemonPromises = generatePokemonPromisses()

Promise.all(pokemonPromises)
  .then(generateHTML)
  .then(insertPokemonsIntoPage)

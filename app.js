const fetchPokemon = () => {
  const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

  for(let i = 1; i <= 150; i++){
    fetch(getPokemonUrl(i)).then(response => response.json().then(pokemon => console.log(pokemon)))
  }

}

fetchPokemon()
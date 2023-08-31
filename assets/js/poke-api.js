
const pokeApi = {}

function convertPokemonApiDetailToPokemonModel(pokemonDetail) {
    const pokemon = new Pokemon()
    pokemon.pokemon_name = pokemonDetail.name
    pokemon.pokemon_id = pokemonDetail.id
    pokemon.pokemon_photo = pokemonDetail.sprites.other["official-artwork"].front_default

    const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.main_type = type
    
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokemonApiDetailToPokemonModel)
}

pokeApi.getPokemons = (offset = 0, limite = 9) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limite}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonbody) => jsonbody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))      
}

pokeApi.getOnePokemon = (id) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((response) => response.json())
    }

pokeApi.getPokemonSpecie = (pokemon) => {
    return fetch(pokemon.species.url)
        .then((response) => response.json())
        .then((jsonbody) => jsonbody.genera[7].genus)
}

pokeApi.getPokemonMoveDetails = (url) => {
    return fetch(url)
        .then((response) => response.json())

}

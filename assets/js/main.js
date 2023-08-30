
const pokemonList = document.getElementById('pokemonList')
const loadMoreBtn = document.querySelector("#loadMoreBtn")
const pokedex = document.querySelector(".pokedex")
const maxRecords = 151
const limite = 9
let offset = 0

function loadPokemonItens(offset, limite) {
    pokeApi.getPokemons(offset, limite).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.main_type}" onclick="getDetails(${pokemon.pokemon_id})">
            <span class="number">#${pokemon.pokemon_id}</span>
            <span class="name">${pokemon.pokemon_name}</span>
    
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.pokemon_photo}" alt="${pokemon.name}">
            </div>
        </li>
        `).join('')
    })
}

loadPokemonItens(offset, limite)

loadMoreBtn.addEventListener('click', () => {
    offset += limite
    debugger
    const qtdRecordNexPag = offset + limite

    if (qtdRecordNexPag >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreBtn.parentElement.removeChild(loadMoreBtn)
    } else {
        loadPokemonItens(offset, limite)
    }

})

function getDetails(pokemon_id) {
    pokeApi.getOnePokemon(pokemon_id).then((pokemon) => {
        pokedex.innerHTML = `<header>
        <nav>
            <a href="index.html" class="button" >Back</a>
        </nav>
        <h1>${pokemon.name}</h1>
        <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type.type.name}">${type.type.name}</li>`).join('')}
        </ol>
    </header>

    <section class="pokemonDetails">
        <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name} sprite">
        <article>
            <ul>
                <li onclick="loadAbout(${pokemon.id})"><h2>About</h2></li>
                <li><h2>Base Stats</h2></li>
                <li><h2>Evolution</h2></li>
                <li><h2>Moves</h2></li>
            </ul>        
            <article id="pokedexContent">    
                <ul>
                    <li class="specie">${loadSpecie(pokemon)}</li>
                    <li>Height: ${pokemon.height}0cm</li>
                    <li>Weight: ${pokemon.weight}0g</li>
                    <li>Abilities: ${pokemon.abilities.map((ability) => `${ability.ability.name}`).join(',')}</li>
                </ul>   
            </article>
        </article>
    </section>`
    })

}

function loadAbout(pokemonId) {
    const pokedexContent = document.getElementById('pokedexContent')
    pokeApi.getOnePokemon(pokemonId).then((pokemon) => {
        pokedexContent.innerHTML = `
        <ul>
            <li class="specie">${loadSpecie(pokemon)}</li>
            <li>Height: ${pokemon.height}0cm</li>
            <li>Weight: ${pokemon.weight}0g</li>
            <li>Abilities: ${pokemon.abilities.map((ability) => `${ability.ability.name}`).join(',')}</li>
        </ul>`
    })
}

function loadSpecie(pokemon) {
    pokeApi.getPokemonSpecie(pokemon).then((pokemonSpecie) => {
        const specie = document.querySelector(".specie")
        specie.innerHTML = `Species: ${pokemonSpecie}`
    })
}

function loadBaseStats(pokemonId) {
    // todo
}

function loadEvolution(pokemonId) {
    // todo
}

function loadMoves(pokemonId) {
    // todo
}

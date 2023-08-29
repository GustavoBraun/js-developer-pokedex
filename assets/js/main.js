
const pokemonList = document.getElementById('pokemonList')
const loadMoreBtn = document.querySelector("#loadMoreBtn")
const maxRecords = 151
const limite = 9
let offset = 0

function loadPokemonItens(offset, limite) {
    pokeApi.getPokemons(offset, limite).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.main_type}"><a class="pokemonDetailsLink" href="pokemon-details.html">
            <span class="number">#${pokemon.pokemon_id}</span>
            <span class="name">${pokemon.pokemon_name}</span>
    
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) =>`<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.pokemon_photo}" alt="${pokemon.name}">
            </div>
        </a></li>
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
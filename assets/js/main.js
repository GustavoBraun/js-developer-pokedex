
const pokemonList = document.querySelector('.pokemons')
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
            <ul class="pokemonDetailsMenu">
                <li onclick="loadAbout(${pokemon.id})">About</li>
                <li onclick="loadBaseStats(${pokemon.id})">Base Stats</li>
                <li onclick="loadMoves(${pokemon.id})">Moves</li>
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
    const pokedexContent = document.getElementById('pokedexContent')
    pokeApi.getOnePokemon(pokemonId).then((pokemon) => {
        pokedexContent.innerHTML = `
        <ul class="stats">
            ${pokemon.stats.map((stats) => `<li><div><div style="display: inline-block; width: 20%"><p>${stats.stat.name}</p></div><p style="display:inline; padding:0px 30px;">${stats.base_stat}</p><div style="display:inline-block; background-color:#ccc; height: .5rem; width:10rem; border-radius: .5rem">
                <div style="width: ${stats.base_stat}%; height: 100%; border-radius: .5rem; background-color: ${loadColorToStatBar(stats.base_stat)};"></div>
            </div></div></li>
            `
            ).join('')}
        </ul>
        `
    })
}

function loadColorToStatBar(number) {
    if (number < 50) {
        return "#f91717d9";
    } else {
        return "#4bc07ad9";
    }
}

function loadMoves(pokemonId) {
    const pokedexContent = document.getElementById('pokedexContent')
    pokeApi.getOnePokemon(pokemonId).then((pokemon) => {
        pokedexContent.innerHTML = `
            <ol class="moveList">
                ${pokemon.moves.map((moves) => {
                    const moveList = document.querySelector('.moveList')
                    pokeApi.getPokemonMoveDetails(moves.move.url).then((move) => {
                        moveList.appendChild(`
                        <li class="move ${move.type.name}">${move.name}</li>
                        `)
                    })
                }).join('')}
            </ol>
        `
    })
}

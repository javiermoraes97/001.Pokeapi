const pokemonContainer = document.querySelector('.mainContainerPokemon');
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');

let offset = 1;
let limit = 8;

previous.addEventListener('click', () => {
    if (offset != 1){
        offset -= 9;
        removeChildNodes(pokemonContainer);
        fetchPokemons(offset, limit);
    }
});

next.addEventListener('click', () => {
    offset += 9;
    removeChildNodes(pokemonContainer);
    fetchPokemons(offset, limit);
});

function fetchPokemon(id) {
   fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
   .then((res) => res.json())
   .then((data) => {
    createPokemon(data)
   });
}

function fetchPokemons(offset, limit) {
    for (let i = offset; i <= offset + limit; i++){
        fetchPokemon(i);
    }
}

function createPokemon(pokemon) {
    const card = document.createElement('div');
    card.classList.add('mainBlockPokemon');

    const spriteContainer = document.createElement('div');
    spriteContainer.classList.add('mainContainerSprite');

    const sprite = document.createElement('img');
    sprite.src = pokemon.sprites.front_default;

    spriteContainer.appendChild(sprite);

    const number = document.createElement('p');
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`

    const name = document.createElement('p');
    name.classList.add('mainNamePokemon');
    name.textContent = pokemon.name

    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);

    pokemonContainer.appendChild(card);
}

function removeChildNodes(parent) {
    while (parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

fetchPokemons(offset, limit);
const pokemon1 = document.getElementById('Pokemon1');
const searchbar = document.getElementById('searchbar');
const Displayres = document.getElementById('Displayres');
let pokemon = [];
searchbar.addEventListener('keyup', (e) => {
    const searchtext = e.target.value.toLowerCase();

    const endresult = pokemon.filter((text) => {
        return (
            text.name.toLowerCase().includes(searchtext) 
        );
    });
    displayPokemon(endresult);
});

const fetchPokemon = async() => {

        const url = `https://pokeapi.co/api/v2/pokemon?limit=150`;
         res=await fetch(url); 
        data=await res.json();
         pokemon = data.results.map((result,index) => ({
            name: result.name,
            id:index+1,
            image1:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png`,
            image2:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${index+1}.png`

        }));
        displayPokemon(pokemon);
    };

var displayPokemon = (pokemon) => {
   
    const op= pokemon
        .map(
            (pokeman) => `
        <li class="card">
            <img class="card-image" src="${pokeman.image1}"onclick= "window.open(this.src)"  />
            <img class="card-image" src="${pokeman.image2}"onclick= "window.open(this.src)"  />
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
            <p class="card-subtitle">Type: ${pokeman.type}</p>
        </li>
    `
        )
        .join('');
    pokemon1.innerHTML = op;
};

fetchPokemon();

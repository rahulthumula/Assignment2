const pokemon1 = document.getElementById('Pokemon1');
const searchbar = document.getElementById('searchbar');

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
            image1:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index+1}.png`,
            image2:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${index+1}.png`,

        }));
        displayPokemon(pokemon);
    };

var displayPokemon = (pokemon) => {
   
    const op= pokemon
        .map(
            (pokeman) => `
            <li class="card" onclick="selectPokemon(${pokeman.id})">
            <img class="card-image" src="${pokeman.image1}"/>
            <img class="card-image" src="${pokeman.image2}"/>
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
            
        </li>
    `
        )
        .join('');
    pokemon1.innerHTML = op;
};
const selectPokemon = async id => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokeman = await res.json();
  displayPokemanPopup(pokeman);
};
  const displayPokemanPopup = pokeman => {
    console.log(pokeman);
    const type = pokeman.types.map(type => type.type.name).join(", ");
    const htmlString = 
    `<div class="popup"> 
    <button id="closeBtn" onclick="closePopup()">Close</button>
     <div class="card"> <img class="card-image" src="${pokeman.sprites.other.dream_world['front_default']}"/> 
      <h2 >${pokeman.name}</h2> 
      <p>Type: ${type} | Height:${pokeman.height} | Weight: ${pokeman.weight}</p> 
      </div> </div> `;
    pokemon1.innerHTML = htmlString + pokemon1.innerHTML;
  };
  const closePopup = () => {
    const popup = document.querySelector(".popup");
    popup.parentElement.removeChild(popup);
  };
fetchPokemon();

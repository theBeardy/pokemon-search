const statBlock = document.querySelector(".stat-block");
const pokemonName = document.getElementById("pokemon-name");
const pokemonID = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const atk = document.getElementById("attack");
const def = document.getElementById("defense");
const spAtk = document.getElementById("special-attack");
const spDef = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const avatar = document.getElementById("sprite");
const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const table = document.querySelector("table");
const pokeURL = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
let searchResUrl = "";

async function getData(str) {
    try {
        const res = await fetch(`${str}`);
        const data = await res.json();
        updateStatBlock(data);
    } catch (err) {
        alert("Pokemon not found");
    }
    
}

const formatName = (str) => {
    if (!str) {
        return "";
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const typesStringify = (obj) => {
    const typesArr = obj.types;
    types.innerHTML = ``;
    let index = 1;

    typesArr.forEach((e) => {
        types.innerHTML += `<p class="type" id="type-${index}">${formatName(e.type.name)}</p>`;
        document.getElementById(`type-${index}`).style.backgroundColor = `var(--${e.type.name})`;
        index++;
    });

    return types.innerHTML;
}

const updateStatBlock = (data) => {
    avatar.src = data.sprites.front_default;
    table.style.display = "flex";
    pokemonName.innerText = `${formatName(data.name).toUpperCase()}`;
    pokemonID.innerText = `${data.id}`;
    weight.innerText = `${data.weight}`;
    height.innerText = `${data.height}`;
    types.innerHTML = typesStringify(data);
    hp.innerText = `${data.stats[0].base_stat}`;
    atk.innerText = `${data.stats[1].base_stat}`;
    def.innerText = `${data.stats[2].base_stat}`;
    spAtk.innerText = `${data.stats[3].base_stat}`;
    spDef.innerText = `${data.stats[4].base_stat}`;
    speed.innerText = `${data.stats[5].base_stat}`;
}

const processSearch = () => {
    const searchValue = searchInput.value.trim().toLowerCase();
    searchResUrl = searchValue;
    const url = pokeURL + "/" + searchResUrl;
    getData(url);
    searchInput.value = '';
}

searchInput.addEventListener("keydown", (e) => {
    e.preventDefault;
    if (e.key === "Enter"){
        processSearch();
    }
})

searchBtn.addEventListener("click", processSearch);
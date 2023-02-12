import axios from 'axios';
import { getRandomInt } from './helpers/getNumerRandom.js';
import './style.css';

async function callPoke() {
	const { data } = await axios.get(
		`https://pokeapi.co/api/v2/pokemon/${getRandomInt(1008)}`,
	);
	const { name, sprites } = data;
	const imgPokemon = sprites.other.home.front_default;
	document.querySelector('#app').innerHTML = `
    <div>
      <h1>${name}</h1>
      <img src="${imgPokemon}" alt="pokemon">
    </div>
  `;
}

callPoke();

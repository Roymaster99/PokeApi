import Chart from 'chart.js/auto';
import { callPoke } from './services/axios.js';

async function main() {
	const { name, sprites, types, height, id, weight, abilities, stats } =
		await callPoke();

	const imgPokemon = sprites.other.home.front_default;
	document.querySelector('#pokemon').innerHTML = `
    <div>
	<h1>Pokemon</h1>
       <h2>${name}</h2>
       <img src="${imgPokemon}" alt="pokemon">
     </div>
   `;

	const he = height * 0.1;
	const we = weight * 0.1;

	let typesPokemon = `
<h3>Numero pokedex: ${id}</h3>
<h3>Altura: ${he.toFixed(1)} M</h3>
<h3>Peso: ${we.toFixed(1)} kg</h3>
<h3>Tipo:</h3>
`;

	for (let i = 0; i < types.length; i++) {
		let typePoke = `
	<h4>${types[i].type.name}</h4>
`;
		typesPokemon = typesPokemon + typePoke;
		document.querySelector('#datos').innerHTML = typesPokemon;
	}
	let ab = `
<h3>Habilidades:</h3>
`;

	for (let i = 0; i < abilities.length; i++) {
		let abilitiesPoke = `
	<h4>${abilities[i].ability.name}</h4>
`;
		ab = ab + abilitiesPoke;
		document.querySelector('#fortalezas').innerHTML = ab;
	}

	let nameStat = [];
	let valStat = [];

	await stats.map((res) => {
		valStat.push(res.base_stat);
		nameStat.push(res.stat.name);
	});

	const ctx = document.getElementById('stats');

	new Chart(ctx, {
		type: 'radar',
		data: {
			labels: nameStat,
			datasets: [
				{
					label: 'Estadisticas',
					data: valStat,
					fill: true,
					borderWidth: 1,
				},
			],
		},
		options: {
			elements: {
				line: {
					borderWidth: 3,
				},
			},
		},
	});
}

main();

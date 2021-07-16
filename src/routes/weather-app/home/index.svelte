<script>

	import { onMount } from 'svelte';
	import List from '../Lib/List.svelte';
	import Search from '../Lib/Search.svelte';
	import { Container, Row, Col } from 'sveltestrap';
	import variables from '../../../../.env.js';
	import { getWeather } from '../actions/weatherActions';

	//const baseURL = `https://api.openweathermap.org/data/2.5/forecast`;
	//const baseURL = variables.API_WHEATHER_URL;
	//const API_KEY = variables.API_WEATHER_KEY;

	let city = 'paris';
	let cityFound = 'paris';
	let items = [];

	onMount(async() => {
		const result = await getWeather(city);
		if (result) {
			city = result.city;
			cityFound = result.cityFound;
			items = result.items;
		}
		//console.log(items);
	});

	const handleCall = async (event) => {
		//debugger;
		const result = await getWeather(event.detail.city);
		if (result) {
			city = result.city;
			cityFound = result.cityFound;
			items = result.items;
		}
	};
	
</script>

<Container>
	<Row class="mt-3">
		<Search bind:city on:message={handleCall}/>
	</Row>
	<Row class="mt-3">
		<h1>{cityFound}</h1>
	</Row>
	<Row class="mt-3">
		
		{#if items.length > 0}
			<Col md={4} sm={12} class='text-center'>
				<h3>Today</h3>
				<List {items} day={0} />
			</Col>
			<Col md={4} sm={12} class='text-center'>
				<h3>Day +1</h3>
				<List {items} day={1} />
			</Col>
			<Col md={4} sm={12} class='text-center'>
				<h3>Day + 2</h3>
				<List {items} day={2} />
			</Col>
		{/if}
	</Row>
</Container>
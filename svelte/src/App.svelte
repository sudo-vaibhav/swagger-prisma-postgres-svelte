<script>
	import { onMount } from 'svelte';
	import {DefaultApi} from "to_dos"
	import axios from "axios"

	// const client = new DefaultApi()
	const axiosForAPI = axios.create({
		baseURL: process.env.ENVIRONMENT==="dev" ? "http://localhost:8000/" : "http://localhost:7000/"
	})
	let toDos = []

	let toDoField = ""

	const client = new DefaultApi()
	async function fetchToDos (){
		client.listToDos((error, data, response)=>{
			console.log("this mah todos:")
			console.log(error,data,response)
		})
		// toDos = await client.listToDos()
		// await axiosForAPI.get("/ToDos").then(resp=>resp.data)
	}

	async function handleSubmit(e){
		e.preventDefault()
		await axiosForAPI.post("/ToDos",{
			title : toDoField
		})
		fetchToDos()
	}

	async function handleDelete(id){
		await axiosForAPI.delete("/ToDos/"+id)
		fetchToDos()
	}

	onMount(()=>{
		fetchToDos()
	})
</script>

<main class="container w-75 mx-auto">
	<h1>To-Dos App (svelte, prisma, swagger, PostgreSQL)</h1>

	<form class="my-5" on:submit={handleSubmit}>
		<label for="title" class="form-label">title</label>
		<div class="d-flex">
			<input bind:value={toDoField} type="text" class="form-control flex-1" id="title" placeholder="type something...">
			<button type="submit" class="btn btn-primary">
				Submit
			</button>
		</div>
	</form>
	<ul class="list-group ">
		{#each toDos as { id, title, finished }}
		<li class="list-group-item d-flex justify-content-between">
			<div class="fw-bold">
				{id}
			</div>
			<div style="text-decoration : {finished ? "line-through" : "none"}">
				{title}
			</div>
			<div>
				<input type="checkbox" checked={finished}/>
				<button class="btn" on:click={()=>handleDelete(id)}>
					🗑️
				</button>
			</div>

		</li>
		{:else}
		Loading To-Dos...
		{/each}
	</ul>
</main>

<style>
	main {

		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		font-size: 2em;
		font-weight: 100;
		text-align: center;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
<script>
	import { onMount } from 'svelte';
	import {DefaultApi} from "../gen/api";

	import axios from "axios"
	const axiosForAPI = axios.create()
	axiosForAPI.interceptors.response.use(
		response=>response.data,
		error => Promise.reject(error)
	)
	const client = new DefaultApi(undefined,"http://localhost:8000",axiosForAPI)

	let toDos = []
	let toDoField = ""


	async function fetchToDos (){
		toDos = await client.listToDos()
	}

	async function handleSubmit(e){
		e.preventDefault()
		await client.addToDo({
			data:
			{
				title:toDoField
			}
		})
		fetchToDos()
	}

	async function handleDelete(id){
		await client.deleteToDo(id)
		fetchToDos()
	}

	async function handleChange(e,id,title){
		console.log(e.target.checked,id,title)
		await client.updateToDo(id,{
			title,
			finished: e.target.checked
		})
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
				<input type="checkbox" checked={finished} on:change={(e)=>handleChange(e,id,title)}/>
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
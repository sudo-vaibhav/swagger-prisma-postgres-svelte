<script>
	import { onMount } from 'svelte';
	import {DefaultApi} from "../gen/api"; // generated sdk

	import axios from "axios"
	const axiosForAPI = axios.create()
	const client = new DefaultApi(undefined,"https://swagger-prisma-svelte-postgres-todos.azurewebsites.net",axiosForAPI)
	let toDoField = ""
	let toDos = []

	onMount(()=>{
		fetchToDos()
	})



	async function fetchToDos (){
		toDos = (await client.listToDos()).data
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
		const result = (await client.deleteToDo(id)).data
		console.log(result)
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
<script lang="ts">
	import ky from 'ky';
	import type { Project } from '$lib/types/DenoDeploy';
	import Projects from '$lib/components/denodeploy/Projects.svelte';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { API_KEY, DENO_ID } from '$lib/store';

	let projects: Project[] = [];

	const fetchProjects = async () => {
		const BASE_URL = 'https://api.deno.com/v1/organizations/:deno_id:/projects';
		const url = BASE_URL.replace(':deno_id:', get(DENO_ID));
		const data = await ky
			.get(url, {
				headers: {
					authorization: `Bearer ${get(API_KEY)}`
				}
			})
			.json<Project[]>();
		projects = data;
	};

	onMount(async () => {
		await fetchProjects();
	});
</script>

<div class="mt-10">
	<Projects {projects} />
</div>

<script lang="ts">
	import type { Project } from '$lib/types/DenoDeploy';
	import Projects from '$lib/components/denodeploy/Projects.svelte';
	import { onMount } from 'svelte';
	import { fetchProjects, isAPIError } from '$lib/denodeploy-api';

	let projects: Project[] = [];

	onMount(async () => {
		await getProjects();
	});

	const getProjects = async () => {
		const response = await fetchProjects();

		const isError = isAPIError(response);
		if (isError){ console.log(response); return; }

		projects = response as Project[];
	}
</script>

<div class="mt-10">
	<Projects {projects} />
</div>

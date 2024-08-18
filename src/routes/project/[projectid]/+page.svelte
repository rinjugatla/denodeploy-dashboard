<script lang="ts">
	import ky from 'ky';
	import type { APIError, Deployment, Project } from '$lib/types/DenoDeploy';
	import Deployments from '$lib/components/denodeploy/Deployments.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { get } from 'svelte/store';
	import { API_KEY } from '$lib/store';
	import { fetchProject, isAPIError } from '$lib/denodeploy-api';

	export let data: PageData;
	let project: Project | null;
	let deployments: Deployment[] = [];
	let errorMessage: string | null = null;

	const sleep = (msec: number) => new Promise((resolve) => setTimeout(resolve, msec));

	const fetchDeployments = async () => {
		const BASE_URL =
			'https://api.deno.com/v1/projects/:project_id:/deployments?limit=100&order=desc';
		const url = BASE_URL.replace(':project_id:', data.project_id);
		const response = await ky
			.get(url, {
				headers: {
					authorization: `Bearer ${get(API_KEY)}`
				}
			})
			.json<Deployment[]>();
		deployments = response;
	};

	const getCurrentProject = async () => {
		const response = await fetchProject(data.project_id);
		if(!response){return;}

		const isError = isAPIError(response);
		if (isError) { 
			errorMessage = (response as unknown as APIError).message;
			return; 
		}

		project = response as unknown as Project;
	}

	onMount(async () => {
		await getCurrentProject();
		await fetchDeployments();
	});
</script>

<div class="mt-10">
	{#if project}
		<Deployments
			{project}
			{deployments}
			on:deletedDeployments={async (e) => {
				// すぐに取得するとDenoからデータが消える前に取得してしまうので少し待つ
				await sleep(1000);
				await fetchDeployments();
			}}
		/>
	{:else}
		{#if errorMessage}
			<div class="text-red-500">
				{errorMessage}
			</div>
		{/if}
	{/if}
</div>

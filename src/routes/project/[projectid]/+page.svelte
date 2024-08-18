<script lang="ts">
	import type { APIError, Deployment, Project } from '$lib/types/DenoDeploy';
	import Deployments from '$lib/components/denodeploy/Deployments.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { fetchDeployments, fetchProject, isAPIError } from '$lib/denodeploy-api';
	import { sleep } from '$lib';

	export let data: PageData;
	let project: Project | null;
	let deployments: Deployment[] = [];
	let errorMessage: string | null = null;

	onMount(async () => {
		await getProject();
		await getDeployments();
	});

	const getProject = async () => {
		const response = await fetchProject(data.project_id);
		if (!response) {
			return;
		}

		const isError = isAPIError(response);
		if (isError) {
			errorMessage = (response as unknown as APIError).message;
			return;
		}

		project = response as unknown as Project;
	};

	const getDeployments = async () => {
		const response = await fetchDeployments(data.project_id);
		if (!response) {
			return;
		}

		const isError = isAPIError(response);
		if (isError) {
			errorMessage = (response as unknown as APIError).message;
			return;
		}

		deployments = response as unknown as Deployment[];
	};
</script>

<div class="mt-10">
	{#if project}
		<Deployments
			{project}
			{deployments}
			on:deletedDeployments={async (e) => {
				// すぐに取得するとDenoからデータが消える前に取得してしまうので少し待つ
				await sleep(1000);
				await fetchDeployments(data.project_id);
			}}
		/>
	{:else if errorMessage}
		<div class="text-red-500">
			{errorMessage}
		</div>
	{/if}
</div>

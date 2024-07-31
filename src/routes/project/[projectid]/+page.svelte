<script lang="ts">
	import ky from 'ky';
	import type { Deployment } from '$lib/types/DenoDeploy';
	import Deployments from '$lib/components/denodeploy/Deployments.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { get } from 'svelte/store';
	import { API_KEY } from '$lib/store';

	export let data: PageData;
	let deployments: Deployment[] = [];

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

	onMount(async () => {
		await fetchDeployments();
	});
</script>

<div class="mt-10">
	<Deployments
		{deployments}
		on:deletedDeployments={async (e) => {
			// すぐに取得するとDenoからデータが消える前に取得してしまうので少し待つ
			await sleep(1000);
			await fetchDeployments();
		}}
	/>
</div>

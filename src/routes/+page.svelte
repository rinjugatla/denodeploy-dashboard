<script lang="ts">
	import type { Project } from '$lib/types/DenoDeploy';
	import Projects from '$lib/components/denodeploy/Projects.svelte';
	import { onMount } from 'svelte';
	import { fetchProjects, isAPIError } from '$lib/denodeploy-api';

	/**
	 * プロジェクト情報一覧
	 */
	let projects: Project[] = [];
	/**
	 * API呼び出しのエラー
	 */
	let errorMessage: string | null = null;

	onMount(async () => {
		await getProjects();
	});

	/**
	 * プロジェクト一覧を取得
	 */
	const getProjects = async () => {
		const response = await fetchProjects();

		const isError = isAPIError(response);
		if (isError) {
			errorMessage = response.message;
			return;
		}

		errorMessage = null;
		projects = response as Project[];
	};
</script>

<div class="mt-10">
	{#if errorMessage}
		<div class="text-red-500">
			{errorMessage}
		</div>
	{:else}
		<Projects {projects} />
	{/if}
</div>

<script lang="ts">
	import type { APIError, Deployment, Project } from '$lib/types/DenoDeploy';
	import Deployments from '$lib/components/denodeploy/Deployments.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { fetchDeployments, fetchProject, isAPIError } from '$lib/denodeploy-api';
	import { sleep } from '$lib';

	/**
	 * URLパラメータ
	 */
	export let data: PageData;
	/**
	 * プロジェクト情報
	 */
	let project: Project | null;
	/**
	 * デプロイ情報
	 */
	let deployments: Deployment[] = [];
	/**
	 * API呼び出しのエラー
	 */
	let errorMessage: string | null = null;

	onMount(async () => {
		await getProject();
		await getDeployments();
	});

	/**
	 * 現在のプロジェクトを取得
	 */
	const getProject = async () => {
		const response = await fetchProject(data.project_id);
		if (!response) {
			return;
		}

		const isError = isAPIError(response);
		if (isError) {
			errorMessage = (response as APIError).message;
			return;
		}

		project = response as Project;
	};

	/**
	 * プロジェクトのデプロイ一覧を取得
	 */
	const getDeployments = async () => {
		const response = await fetchDeployments(data.project_id);
		if (!response) {
			return;
		}

		const isError = isAPIError(response);
		if (isError) {
			errorMessage = (response as APIError).message;
			return;
		}

		deployments = response as Deployment[];
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

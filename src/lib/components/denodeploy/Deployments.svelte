<script lang="ts">
	import ky from 'ky';
	import type { Deployment, Project } from '$lib/types/DenoDeploy';
	import { Button, Checkbox, Modal, Toggle } from 'flowbite-svelte';
	import { get } from 'svelte/store';
	import { API_KEY } from '$lib/store';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	/**
	 * プロジェクト概要
	 */
	export let project: Project;
	/**
	 * DenoDeployデプロイ情報
	 */
	export let deployments: Deployment[] = [];

	/**
	 * ProductionのDeployを削除可能か
	 */
	let canDeleteProduction= false;
	/**
	 * 削除確認モーダルが表示されているか
	 */
	let showDeletePopUpModal = false;
	/**
	 * 削除対象のデプロイID
	 */
	let deleteIds = new Set<string>();

	/**
	 * Production中のDeployに紐づくURL
	 */
	$: productionUrl = project ? `${project?.name}.deno.dev` : null;

	/**
	 * プロジェクトの削除
	 */
	const deleteDeployments = async () => {
		const BASE_URL = 'https://api.deno.com/v1/deployments/:deployment_id:';
		const deleteds: Deployment[] = [];
		const faileds: Deployment[] = [];
		deleteIds.forEach(async (id) => {
			const url = BASE_URL.replace(':deployment_id:', id);
			const response = await ky.delete(url, {
				headers: {
					authorization: `Bearer ${get(API_KEY)}`
				}
			});

			const deployment = deployments.filter((d) => d.id === id)[0];
			if (response.status === 200) {
				deleteds.push(deployment);
			} else {
				faileds.push(deployment);
			}
		});

		dispatch('deletedDeployments', { success: deleteds, failed: faileds });
	};
</script>

<Modal bind:open={showDeletePopUpModal} size="xs" autoclose outsideclose>
	<div class="text-center">
		<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
			Do you want to delete the currently selected deployments? This cannot be undone!
		</h3>
		<Button color="red" class="me-2" on:click={async () => await deleteDeployments()}
			>Yes, I'm sure</Button
		>
		<Button color="alternative">No, cancel</Button>
	</div>
</Modal>

<div class="my-3 mr-3 flex items-center justify-end gap-3">
	<Toggle bind:checked={canDeleteProduction}>Production can be delete</Toggle>
	<Button color="red" on:click={() => (showDeletePopUpModal = true)}>Delete</Button>
</div>

<table class="w-full table-fixed text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
	<thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
		<th class="w-10">No</th>
        <th>ID</th>
		<th>Description</th>
		<th>Deploy</th>
		<th>Create</th>
		<th class="w-20">Delete</th>
	</thead>
	<tbody>
		{#each deployments as deployment, index}
			{@const isProduction = productionUrl ? deployment.domains.includes(productionUrl) : false}
			<tr 
				class="border-b border-gray-700 bg-gray-800"
				>
                <td class="py-4">{index + 1}</td>
				<td>
					{deployment.id}
					{#if isProduction}
						<span class="mx-1 px-3 py-1 text-white border-solid rounded-full bg-green-800">Prod</span>
					{/if}
				</td>
				<td>{deployment.description}</td>
				<td>
					{#each deployment.domains as domain}
						<div class="text-gray-900 dark:text-blue-500">
							<a href="https://{domain}" target="_blank">{domain}</a>
						</div>
					{/each}
				</td>
				<td>{deployment.createdAt}</td>
				<td
					><Checkbox
						class="justify-center"
						disabled={isProduction && !canDeleteProduction}
						on:change={(e) => {
							const checked = e.target?.checked;
							if (checked) {
								deleteIds.add(deployment.id);
							} else {
								deleteIds.delete(deployment.id);
							}
						}}
					/>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

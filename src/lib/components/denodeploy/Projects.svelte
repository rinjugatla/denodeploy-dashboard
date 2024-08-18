<script lang="ts">
	import type { Project } from '$lib/types/DenoDeploy';

	/**
	 * プロジェクト情報一覧
	 */
	export let projects: Project[] = [];
</script>

<table class="w-full table-fixed text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
	<thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
		<th class="w-10">No</th>
		<th>Name</th>
		<th>Description</th>
	</thead>
	<tbody>
		{#if projects}
			{#each projects as project, index}
				<tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
					<td class="py-4">{index + 1}</td>
					<td class="font-medium text-gray-900 dark:text-blue-500">
						<a href="/project/{project.id}">{project.name}</a>
					</td>
					<td>{project.description}</td>
				</tr>
			{/each}
		{/if}
	</tbody>
</table>

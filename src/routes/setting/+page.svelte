<script lang="ts">
	import { DENO_ID, API_KEY } from '$lib/store';
	import { Input, Label, Button } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	let deno_id = '';
	let api_key = '';

	const save = () => {
		DENO_ID.set(deno_id);
		API_KEY.set(api_key);
	};

	onMount(() => {
		deno_id = get(DENO_ID);
		api_key = get(API_KEY);
	});
</script>

<div class="mt-10">
    <div class="grid gap-3">
        <div>
            <Label for="denoid" class="mb-2">User ID / Organization ID</Label>
            <Input
                type="text"
                id="denoid"
                placeholder="abc-abc-abc-abc-abc"
                bind:value={deno_id}
                required
            />
        </div>
        <div>
            <Label for="apikey" class="mb-2">API Key</Label>
            <Input type="password" id="apikey" placeholder="" bind:value={api_key} required />
        </div>
    
        <Button on:click={save}>Save</Button>
    </div>
</div>

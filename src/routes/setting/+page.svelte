<script lang="ts">
	import { DENO_ID, API_KEY } from '$lib/store';
	import type { APIError, Project } from '$lib/types/DenoDeploy';
	import { Input, Label, Button } from 'flowbite-svelte';
	import ky, { HTTPError } from 'ky';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	let deno_id = '';
	let api_key = '';
    let pairStatus: IdApiKeyPairStatus;

	const save = async () => {
        pairStatus = await validIdApikeyPair(deno_id, api_key);
        if(!pairStatus.status){ return; }

		DENO_ID.set(deno_id);
		API_KEY.set(api_key);
	};

    type IdApiKeyPairStatus = {
        /**
         * 正常なペアか
         */
        status: boolean,
        /**
         * 不正な場合のエラーメッセージ
         */
        message: string
    }

    /**
     * Deno User Id / Organization IDとAPIKEY問い合わせ可能なペアか
     * @param deno_id User ID or Organization ID
     * @param api_key APIKEY
     */
    const validIdApikeyPair = async (
        deno_id: string, 
        api_key: string): Promise<IdApiKeyPairStatus> => {
        if(!deno_id || !api_key) { 
            return { 
                status: false, 
                message:  "ID and API key are required."
            };
        }

        const BASE_URL = 'https://api.deno.com/v1/organizations/:deno_id:/projects?limit=1';
		const url = BASE_URL.replace(':deno_id:', deno_id);
        try {
            await ky
                .get(url, {
                    headers: {
                        authorization: `Bearer ${api_key}`
                    }
                }).json<Project[]>();
            
            return {
                status: true,
                message: ""
            };
        } catch (error) {
            const hError = error as HTTPError;
            const response = await hError.response.json<APIError>();

            return {
                status: false,
                message: response.message
            }; 
        }
    }

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
        <Button on:click={async () => await save()}>Save</Button>
    </div>

    <div class="mt-5">
        {#if !pairStatus?.status && pairStatus?.message}
        <div class="text-red-500">
            {pairStatus?.message}
        </div>
        {:else if pairStatus?.status}
            <div class=" text-green-500">
                Valid ID and API Key!
            </div>
        {/if}
    </div>
</div>

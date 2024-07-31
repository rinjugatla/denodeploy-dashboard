<script lang="ts">
    import TwitterLinkIcon from '$lib/components/link-icon/TwitterLinkIcon.svelte';
    import GithubLinkIcon from '$lib/components/link-icon/GithubLinkIcon.svelte';

    const twitter_name = 'rin_jugatla';
	const github_name = 'rinjugatla/denodeploy-dashboard';
</script>

<div class="w-full absolute left-0 bottom-0 bg-gray-900">
	<div class="m-5">
        <div class="flex justify-center items-center relative">
            <div class="block text-xs text-white text-center">
                <div>
                    2024 rin_jugatla
                </div>
            </div>
            <div class="absolute right-0">
                <TwitterLinkIcon name={twitter_name} />
				<GithubLinkIcon name={github_name} />
            </div>
        </div>
	</div>
</div>
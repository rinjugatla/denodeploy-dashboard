<script>
	import Footer from '$lib/components/commons/Footer.svelte';
	import Header from '$lib/components/commons/Header.svelte';
	import '../app.pcss';
</script>

<svelte:head>
	<title>Denodeploy Dashboard</title>
	<meta name="description" content="Denodeploy Dashboard" />
</svelte:head>

<div class="relative pb-14 min-h-screen h-full bg-on_the_run-theme cell">
	<Header />
	<div class="my-5 container mx-auto">
		<slot />
	</div>
	<Footer />
</div>

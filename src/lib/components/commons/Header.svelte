<script lang="ts">
	import { page } from "$app/stores";
	import { NavBrand, NavLi, NavUl, Navbar, NavHamburger } from "flowbite-svelte";

	$: activeUrl = $page.url.pathname;
</script>

<Navbar class="bg-gray-900">
	<NavBrand href="/">
		<span class=" text-xl ml-3">DenoDeploy Dashboard</span>
	</NavBrand>
	<NavHamburger />
	<NavUl {activeUrl}>
		<NavLi href="/">Home</NavLi>
		<NavLi href="/setting">Setting</NavLi>
	</NavUl>
</Navbar>

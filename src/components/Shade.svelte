<script>
	export let isOpen = false;
</script>

{#if isOpen}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<section class="fixed top-0 left-0 w-screen h-screen z-40 flex items-center justify-center">
		<section
			id="shade"
			class="fixed top-0 left-0 bg-slate-950 bg-opacity-50 w-full h-full"
			on:click={() => (isOpen = false)}
		></section>
		<slot />
	</section>
{/if}

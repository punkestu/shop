<script>
	export let isOpen = false;
	import { get_current_component } from 'svelte/internal';
	function createEventDispatcher() {
		const component = get_current_component();
		return (
			/** @type {string} */ type,
			/** @type {{ dispatchEvent: (arg0: CustomEvent<any>) => void; }} */ target,
			/** @type {any} */ detail
		) => {
			const callbacks = component.$$.callbacks[type];
			if (callbacks) {
				const event = new CustomEvent(type, { detail });
				target.dispatchEvent(event);
				callbacks
					.slice()
					.forEach((/** @type {{ call: (arg0: any, arg1: CustomEvent<any>) => void; }} */ fn) => {
						fn.call(component, event);
					});
			}
		};
	}

	const dispatch = createEventDispatcher();
	/**
	 * @this {any}
	 */
	function dispatchClose() {
		dispatch('close', this, 'close modal');
	}
</script>

{#if isOpen}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<section class="fixed top-0 left-0 w-screen h-screen z-40 flex items-center justify-center">
		<section
			id="shade"
			class="fixed top-0 left-0 bg-slate-950 bg-opacity-50 w-full h-full"
			on:click={() => {
				isOpen = false;
				dispatchClose();
			}}
		></section>
		<slot />
	</section>
{/if}

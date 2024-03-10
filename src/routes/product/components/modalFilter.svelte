<script>
	import Shade from '$lib/components/Shade.svelte';
	export let filterIsOpen = false;
	/**
	 * @type {{name: string; categories: string[]}[]}
	 */
	export let products = [];
	/**
	 * @type {string[]}
	 */
	export let selectedCategories = [];
	let searchCategory = '';
	$: categories = [...new Set(products.flatMap((product) => product.categories))];
</script>

<Shade bind:isOpen={filterIsOpen}>
	<div class="animate-popup bg-slate-50 z-50 text-slate-900 p-4 w-1/4">
		<h2 class="text-2xl font-bold">Filter</h2>
		<input type="text" bind:value={searchCategory} />
		<div class="flex flex-wrap gap-4">
			{#each categories.filter((category) => category
					.toLowerCase()
					.includes(searchCategory.toLocaleLowerCase())) as category, index (index)}
				<label>
					<input
						type="checkbox"
						on:change={() => {
							selectedCategories = selectedCategories.includes(category)
								? selectedCategories.filter((c) => c !== category)
								: [...selectedCategories, category];
						}}
						checked={selectedCategories.includes(category)}
					/>
					<span class="ml-2">{category}</span>
				</label>
			{/each}
		</div>
	</div>
</Shade>

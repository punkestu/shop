<script>
	import Products from '$lib/data/products.json';
	import ModalFilter from './components/modalFilter.svelte';
	import ModalAddCart from './components/modalAddCart.svelte';

	let search = '';
	let filterIsOpen = false;
	let addCartIsOpen = false;
	let selectedProduct = -1;
	/**
	 * @type {string[]}
	 */
	let selectedCategories = [];
	$: filteredProducts = Products.filter((product) =>
		product.name.toLowerCase().includes(search.toLowerCase())
	).filter((product) =>
		selectedCategories.length === 0
			? true
			: product.categories.some((category) => selectedCategories.includes(category))
	);
</script>

<ModalFilter products={Products} bind:filterIsOpen bind:selectedCategories />
<ModalAddCart bind:addCartIsOpen products={Products} bind:selectedProduct />

<section class="flex gap-4 p-4">
	<input
		type="text"
		class="flex-grow px-4 py-1 bg-transparent border-b-2 border-slate-50 focus:border-b-2 focus:ring-0 outline-none"
		bind:value={search}
		placeholder="Search..."
	/>
	<button type="button" class="bg-slate-800 px-4 py-2" on:click={() => (filterIsOpen = true)}
		>Filter ({selectedCategories.length})</button
	>
</section>

<section class="px-4 py-6 md:py-12 flex flex-wrap">
	{#if filteredProducts.length === 0}
		<p class="text-2xl font-bold text-center w-full">No products found</p>
	{/if}
	{#each filteredProducts as product (product.id)}
		<div class="w-1/3 p-2">
			<div
				class="p-4 flex flex-col gap-4 bg-gradient-to-b from-slate-800 to-slate-700 shadow-md shadow-slate-800 hover:shadow-lg hover:shadow-slate-950 duration-500"
			>
				<div class="flex gap-4">
					<div class="w-52">
						<img
							src={product.image}
							alt={product.name}
							class="w-full h-full object-cover rounded-lg"
						/>
					</div>
					<div class="flex flex-col gap-2">
						<h2 class="text-2xl font-bold">{product.name}</h2>
						<p class="text-lg">{product.description}</p>
						<p class="text-lg font-bold">${product.price}</p>
					</div>
				</div>
				<button
					type="button"
					class="bg-slate-800 px-4 py-2"
					on:click={() => {
						selectedProduct = product.id;
						addCartIsOpen = true;
					}}>Add to Cart</button
				>
			</div>
		</div>
	{/each}
</section>

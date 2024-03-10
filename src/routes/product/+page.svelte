<script>
	import Products from '$lib/data/products.json';
	import Shade from '../../components/Shade.svelte';
	import { onMount } from 'svelte';
	import { cart } from '$lib/store/cart';

	/**
	 * @type {any[]}
	 */
	let cartProducts = [];
	onMount(() => {
		cartProducts = JSON.parse(localStorage.getItem('cart') || '[]') || [];
		cart.update((cart) => {
			cart = cartProducts;
			return cart;
		});
	});

	let search = '';
	let searchCategory = '';
	let filterIsOpen = false;
	let addCartIsOpen = false;
	let selectedProduct = -1;
	let selectedQty = 0;
	$: filteredProducts = Products.filter((product) =>
		product.name.toLowerCase().includes(search.toLowerCase())
	).filter((product) =>
		selectedCategories.length === 0
			? true
			: product.categories.some((category) => selectedCategories.includes(category))
	);
	$: categories = [...new Set(Products.flatMap((product) => product.categories))];
	/**
	 * @type {string[]}
	 */
	let selectedCategories = [];
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

<Shade bind:isOpen={addCartIsOpen}>
	<div class="animate-popup bg-slate-50 z-50 text-slate-900 p-4 w-1/4 flex flex-col">
		<h2 class="text-2xl font-bold">{Products.find((p) => p.id === selectedProduct)?.name}</h2>
		<div class="flex w-full justify-between mb-2">
			<button
				class="w-1/4 bg-slate-800 px-4 py-2 text-slate-50"
				on:click={() => {
					if (selectedQty > 0) selectedQty--;
				}}>-</button
			>
			<input class="text-center w-1/2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" type="number" bind:value={selectedQty} />
			<button
				class="w-1/4 bg-slate-800 px-4 py-2 text-slate-50"
				on:click={() => {
					selectedQty++;
				}}>+</button
			>
		</div>
		<button
			type="button"
			class="bg-slate-800 px-4 py-2 text-slate-50"
			on:click={() => {
				let productIndex = cartProducts.findIndex((product) => product.id === selectedProduct);
				if (productIndex < 0) {
					if (selectedQty > 0)
						cartProducts = [...cartProducts, { id: selectedProduct, qty: selectedQty }];
				} else {
					if (selectedQty === 0) cartProducts.splice(productIndex, 1);
					else cartProducts[productIndex].qty = selectedQty;
				}
				localStorage.setItem('cart', JSON.stringify(cartProducts));
				cart.update((cart) => {
					cart = cartProducts;
					return cart;
				});
				selectedQty = 0;
				addCartIsOpen = false;
			}}>Add</button
		>
	</div>
</Shade>

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
						selectedQty = cartProducts.find((p) => p.id === product.id)?.qty || 0;
						addCartIsOpen = true;
					}}>Add to Cart</button
				>
			</div>
		</div>
	{/each}
</section>

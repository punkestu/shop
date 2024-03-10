<script>
	import { cart } from '$lib/store/cart';
	import Shade from '$lib/components/Shade.svelte';
	import { onMount } from 'svelte';
	export let addCartIsOpen = false;
	/**
	 * @type {{id: number;name: string;price: number}[]}
	 */
	export let products = [];
	export let selectedProduct = -1;
	$: selectedQty = cartProducts.find((p) => p.id === selectedProduct)?.qty || 0;
	/**
	 * @type {{id: number; qty: number}[]}
	 */
	export let cartProducts = [];
	onMount(() => {
		cartProducts = JSON.parse(localStorage.getItem('cart') || '[]') || [];
		cart.update((cart) => {
			cart = cartProducts;
			return cart;
		});
	});

	$: product = products.find((p) => p.id === selectedProduct);
</script>

<Shade bind:isOpen={addCartIsOpen}>
	<div class="animate-popup bg-slate-50 z-50 text-slate-900 p-4 w-1/4 flex flex-col">
		<h2 class="text-2xl font-bold mb-2">
			{product?.name} <span class="text-lg font-medium">| ${product?.price}</span>
		</h2>
		<div class="flex w-full justify-between mb-2">
			<button
				class="w-1/4 bg-slate-800 px-4 py-2 text-slate-50"
				on:click={() => {
					if (selectedQty > 0) selectedQty--;
				}}>-</button
			>
			<input
				class="text-center w-1/2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
				type="number"
				bind:value={selectedQty}
			/>
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

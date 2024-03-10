<script>
	import { cart } from '$lib/store/cart';
	import { onMount } from 'svelte';
	import Products from '$lib/data/products.json';
	import Shade from '$lib/components/Shade.svelte';

	/**
	 * @type {any[]}
	 */
	let cartProducts = [];
	/**
	 * @type {number[]}
	 */
	let readyToCheckout = [];
	let total = 0;
	let paymentIsOpen = false;
	cart.subscribe((value) => {
		cartProducts = value;
	});
	onMount(() => {
		cartProducts = JSON.parse(localStorage.getItem('cart') || '[]');
	});

	function checkoutPopup() {
		if (readyToCheckout.length > 0) {
			paymentIsOpen = true;
		}
	}

	function checkout() {
		cart.update((cart) => {
			cart = cart.filter((product) => !readyToCheckout.includes(product.id));
			return cart;
		});
		localStorage.setItem('cart', JSON.stringify(cartProducts));
		readyToCheckout = [];
		total = 0;
		paymentIsOpen = false;
	}
</script>

<Shade bind:isOpen={paymentIsOpen}>
	<div class="animate-popup bg-slate-50 z-50 text-slate-900 p-4 w-1/4 flex flex-col">
		<h2 class="text-2xl font-bold">Payment</h2>
		<div class="flex flex-col gap-4">
			<ul>
				{#each readyToCheckout as productID (productID)}
					<li class="flex items-center gap-4">
						<p>{Products.find((p) => p.id === productID)?.name}</p>
						<p>
							${(cartProducts.find((p) => p.id === productID)?.qty || 0) *
								(Products.find((p) => p.id === productID)?.price || 0)}
						</p>
					</li>
				{/each}
			</ul>
			<p>Total: ${total}</p>
			<button class="bg-slate-800 text-slate-50 px-4 py-2" on:click={checkout}>Pay</button>
		</div>
	</div>
</Shade>

<section class="px-4 pt-6 md:pt-12 pb-2 flex flex-col">
	{readyToCheckout.length} Selected
</section>
<section class="px-4 pb-6 md:pb-12 flex flex-col gap-4 min-h-[75vh]">
	{#each cartProducts as product (product.id)}
		<label>
			<div
				class="bg-gradient-to-b from-slate-800 to-slate-700 shadow-md shadow-slate-800 hover:shadow-lg hover:shadow-slate-950 duration-500 p-4 flex items-center gap-8"
			>
				<input
					type="checkbox"
					class="appearance-none w-4 h-4 border-2 border-slate-100 bg-slate-100 checked:bg-blue-400 rounded-full"
					on:change={() => {
						if (readyToCheckout.includes(product.id)) {
							readyToCheckout = readyToCheckout.filter((productId) => productId !== product.id);
							total -= (Products.find((p) => p.id === product.id)?.price || 0) * product.qty;
						} else {
							readyToCheckout = [...readyToCheckout, product.id];
							total += (Products.find((p) => p.id === product.id)?.price || 0) * product.qty;
						}
					}}
				/>
				<aside class="flex flex-col gap-2">
					<h2 class="text-lg font-semibold">{Products.find((p) => p.id === product.id)?.name}</h2>
					<p class="text-slate-200">
						{product.qty} x ${Products.find((p) => p.id === product.id)?.price}
					</p>
				</aside>
			</div>
		</label>
	{/each}
	<div class="flex items-center gap-4">
		<p>Total: ${total}</p>
		<button class="bg-slate-800 px-4 py-2 flex-grow" on:click={checkoutPopup}>Checkout</button>
	</div>
</section>

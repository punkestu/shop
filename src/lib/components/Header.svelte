<script>
	import { cart } from '$lib/store/cart';

	let cartEmpty = true;
	cart.subscribe((value) => {
		cartEmpty = value.length === 0;
	});
</script>

<header class="flex justify-between items-center py-4">
	<h1 class="font-bold text-2xl">Shopping🛍</h1>
	<nav>
		<ul class="flex gap-2 md:gap-4">
			<li><a class="hover:underline" href="/">Home</a></li>
			<li><a class="hover:underline" href="/product">Products</a></li>
			<li>
				<a class="hover:underline relative" href="/cart"
					>Cart{#if !cartEmpty}
						<span class="absolute w-3 h-3 rounded-full bg-blue-500 animate-pulse"></span>
					{/if}</a
				>
			</li>
		</ul>
	</nav>
</header>
<hr />

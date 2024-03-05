<script>
	import HeroImg from '$lib/images/hero.jpg';
	import Products from '$lib/products';
</script>

<section
	class="flex flex-col-reverse md:flex-row items-center gap-4 px-4 py-6 md:py-12 lg:py-24 min-h-screen"
>
	<aside class="md:w-1/3 lg:w-1/2">
		<h2 class="text-4xl font-semibold mb-2">Shopping🛍</h2>
		<p>
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti quibusdam mollitia unde
			nesciunt ipsum asperiores, possimus ea! Quam dicta voluptatum expedita voluptates quasi
			obcaecati, dolorum cum cumque, provident molestias ipsa!
		</p>
	</aside>
	<img class="md:w-2/3 lg:w-1/2 rounded-ss-full rounded-ee-full" src={HeroImg} alt="hero" />
</section>

<section class="px-4 py-6 md:py-12 lg:py-24">
	<h2 class="text-2xl font-semibold mb-2">Top Products🎁</h2>
	<p class="mb-4 text-justify">
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam officiis facilis consectetur,
		numquam ullam blanditiis minus minima cum neque rem eos? Unde, rem cum. Quas neque error
		inventore dolore? Ullam dolorum commodi numquam optio tempore, odit nam exercitationem. Impedit
		voluptatum alias obcaecati, maiores consequuntur consectetur repellat voluptas. Omnis, deleniti
		aliquid?
	</p>
	<div class="w-full flex gap-4">
		<a
			href="/"
			class="w-1/3 bg-gradient-to-b from-slate-800 to-slate-700 p-4 flex flex-col gap-2 shadow-md shadow-slate-800 hover:shadow-lg hover:shadow-slate-950 duration-500"
		>
			<img class="w-full h-96 object-cover" src={Products[1]} alt="product 1" />
			<h3 class="text-xl font-medium">Product 1</h3>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, reprehenderit?</p>
		</a>
		<a
			href="/"
			class="w-1/3 bg-gradient-to-b from-slate-800 to-slate-700 p-4 flex flex-col gap-2 shadow-md shadow-slate-800 hover:shadow-lg hover:shadow-slate-950 duration-500"
		>
			<img class="w-full h-96 object-cover" src={Products[0]} alt="product 1" />
			<h3 class="text-xl font-medium">Product 2</h3>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, reprehenderit?</p>
		</a>
		<a
			href="/"
			class="w-1/3 bg-gradient-to-b from-slate-800 to-slate-700 p-4 flex flex-col gap-2 shadow-md shadow-slate-800 hover:shadow-lg hover:shadow-slate-950 duration-500"
		>
			<img class="w-full h-96 object-cover" src={Products[2]} alt="product 1" />
			<h3 class="text-xl font-medium">Product 3</h3>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, reprehenderit?</p>
		</a>
	</div>
</section>

<section class="px-4 py-6 md:py-12 lg:py-24 flex gap-8 items-start">
	<div class="w-2/3 flex flex-col">
		<h2 class="text-2xl font-semibold mb-2">Collab with us🤝</h2>
		<p class="text-justify">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur illo magni quibusdam harum
			dolore et aperiam ullam, maxime optio est culpa magnam odit nostrum itaque illum sint ipsam
			officia a temporibus at exercitationem accusamus voluptatibus consequatur consequuntur. Ipsam
			porro eligendi aliquam, magnam molestias vitae rem ab accusamus dicta. Non tempore molestias
			iure consectetur distinctio architecto, similique aperiam eos provident modi?
		</p>
	</div>
	<form
		class="flex flex-col w-1/3 items-center justify-center gap-2 mt-2"
		on:submit={(e) => {
			e.preventDefault();
		}}
	>
		<div class="flex flex-col w-full">
			<label for="nama" class="w-full font-medium">Nama</label>
			<input
				type="text"
				id="nama"
				class="w-full px-3 py-1 text-slate-900 border-transparent focus:border-transparent focus:ring-0 outline-none"
				placeholder="e.g. Norman Osborn"
			/>
		</div>
		<div class="flex flex-col w-full">
			<label for="usaha" class="w-full font-medium">Usaha</label>
			<input
				type="text"
				id="usaha"
				class="w-full px-3 py-1 text-slate-900 border-transparent focus:border-transparent focus:ring-0 outline-none"
				placeholder="e.g. Oscorp"
			/>
		</div>
		<button type="submit" class="w-full py-2 bg-slate-800 mt-2 hover:bg-slate-900 duration-500"
			>Collab now</button
		>
	</form>
</section>

<script>
	import Calc from './Calc.svelte';
	import Footer from './Footer.svelte';
	import StoryRecon from './StoryRecon.svelte';
	import WIP from './WIP.svelte';

</script>

<svelte:head>
	<title>PCEPI Inflation Calculator</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<WIP />

<section>

	<Calc />

	<StoryRecon />

	<Footer />

</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	/* h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	} */
	
	:global(body) {
		background: whitesmoke;
	}
</style>

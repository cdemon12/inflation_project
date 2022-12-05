<script>
	let popup = true;
	let popdown = function() {
		popup = false;
	}
</script>
{#if popup == true}
<div>
	🚧 This project is a work in progress. Please do not share the URL. 🚧

	<p>Some elements to be added are:</p>
	   <ul>
			<li>tooltip style</li>
			<li>titles for graphs</li>
			<li>treemap for parts of each effect</li>
			<li>completed descriptions</li>
			<li>retrieving data directly from API</li>
			<li>making complete responsive</li>
		</ul>
	<p>Recommended view is on computer browser.</p>
	<p>All precomplied code is availiable <a href="https://github.com/cdemon12/inflation_project">here</a>. Thanks!</p>
	<button on:click={popdown}>Close popup</button>
</div>
{/if}

<style>
	div {
		position: fixed;
		z-index: 999999999;
		top: 0;
		left: 0;
		width: 100%;
		text-align: center;
		padding: 1.25em;
		background: var(--color-bg-1);
		color: black;
		font-family: monospace;
		font-size: 16px;
	}
</style>

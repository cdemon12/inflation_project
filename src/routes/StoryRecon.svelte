<script>
  import Scrolly from "./Scrolly.svelte";
  import Bar from "./Bar.svelte";
  let value = 0;
  const steps = [
    "<p>CPI is on average greater than the PCEPI<p>",
    "<p>Since 2000, CPI was 37 basis points higher than PCEPI</p>",
    "<p>The BLS keep track of the differences between the two indices and measures what accounts for the differences.</p>",
    "<h3>Formula effects</h3><p>The PCEPI and CPI are price indices but they use different formulas.CPI uses the Laspeyres Formula as base. PCE uses Fisher-Ideal formula as a base.</p>",
    "<h3>Scope effects less</h3>",
    "<h3>Scope effects plus</h3>",
    "<h3>Weight effects</h3><p>Part of creating a inflation gauge is creating a market basket of goods that is representative of consumer purchases. This is made by examining the purchases of consumers. The <strong class='pce'>PCE price index</strong> uses suveys of businesses to weight goods in its basket. Whereas, <strong class='cpi'>CPI</strong> uses the Consumer Expenditure Survey, which collects spending habits from consumers.</p>",
    "<h3>Other effects</h3>",
    "<p>It is often confusing to use two different numbers to indicate inflation. Some economists argue for a standard measurement, while other see both as useful for different practices.</p>"  
  ];

</script>

<section>
  <div class="section-container">
    <div class="steps-container">
      <Scrolly bind:value>
        {#each steps as text, i}
          <div class="step" class:active={value === i}>
            <div class="step-content">{@html text}</div>
          </div>
        {/each}
        <div class="spacer" />
        </Scrolly>
    </div>
    <div class="sticky">
      <Bar step = {value}/>
    </div>
  </div>
</section>

<style>
	:global(body) {
		overflow-x: hidden;
	}
	
	/* .hero {
		height: 60vh;
		display: flex;
		place-items: center;
		flex-direction: column;
		justify-content: center;
		text-align: center;
	}
	
	.hero h2 {
		margin-top: 0;
		font-weight: 200;
	} */
	
  .spacer {
    height: 40vh;
  }

  .sticky {
    position: sticky;
    top: 10%;
		flex: 1 1 60%;
    width: 60%;
  }

  .section-container {
    margin-top: 1em;
    text-align: center;
    transition: background 100ms;
    display: flex;
  }

  .step {
    height: 80vh;
    display: flex;
    place-items: center;
    justify-content: center;
  }

  .step-content {
    font-size: 1rem;
    background: whitesmoke;
    color: #ccc;
    border-radius: 5px;
    padding: .5rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: background 500ms ease;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, .2);
    text-align: left;
		width: 75%;
		margin: auto;
		max-width: 500px;
  }

	.step.active .step-content {
		background: white;
		color: black;
	}
	
  .steps-container,
  .sticky {
    height: 100%;
  }

  .steps-container {
    flex: 1 1 40%;
    z-index: 10;
  }
	
/* Comment out the following line to always make it 'text-on-top' */
  @media screen and (max-width: 768px) {
    .section-container {
      flex-direction: column-reverse;
    }
    .sticky {
      width: 95%;
			margin: auto;
    }
  }
</style>

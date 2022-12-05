<script>
  import Scrolly from "./Scrolly.svelte";
  import Line from "./Line.svelte";
  let value = 0;
  const steps = [
		 "<p>This is a graph of the percent (<strong class='pce'>PCEPI</strong>) inflation from one year ago. Let's break down what this means. Inflation is measured in change from a year ago to adjust for seasonal differences.</p>",
    "<p>You may assume based on the popularity of the <strong class='cpi'>Consumer Price Index</strong> that it is the gold standard for measuring inflation. But the truth is that we don't have a perfect way to measure inflation and both <strong class='cpi'>CPI</strong> and <strong class='pce'>PCEPI</strong> have pros and cons.</p>",
    "<h3>Who creates them?</h3> PCE price index is created by the Bureau of Economic Analysis.</p><p>CPI is created by the Bureau of Labor Statistics.</p><p>Because they are created by different organization they also have different inputs.",
    "<h3>What are they used for?<h3><p>The CPI is primary tool for measuring inflation by the federal government and PCE is primarily used by the Federal Bank.</p>",
    "<h3>Core vs headline</h3><p>Both method provide a headline and core inflation index. Headline inflation includes all consumer expenditure while core inflation leaves out food and energy due their volatility.</p><p>They are both important measurements of inflation.</p>",
    "<h3>Raw inflation</h3><p>Another important thing to note is that all of these numbers are measured in percent change from a year ago. This is important because prices fluctuate a lot seasonally. So, this corrects for that. It is important to remember that a 5% inflation does not mean that prices are 5% higher than last month but that prices are 5% higher than the same month last year.</p>",
    "<h3>PCE without price index</h3><p>For the PCE is also important to cognizant when examining inflation that PCE and PCE Price Index are different. PCE is not price index and will only tell you the total amount of spent by all people in the U.S. and doesn’t use any weights to create a market basket.</p>"
  ];

  export let new_date = new Date();
  export let old_date = new Date();

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
      <Line {value} {new_date} {old_date}/>
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

<script>
	import { each } from 'svelte/internal';
    import { tweened } from 'svelte/motion';
    import {range} from './range.js';
    import Story from './Story.svelte';
    import data from './data.js';

    let dollars = 19.99;
    let year_1 = 2022;
    let year_2 = 1960;
    let month_1 = 7;
    let month_2 = 0;

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    let old = 63;
    let neww = 63;

    $: index_1 = ((year_1 - 1960)*12)+(month_1+1)
    $: index_2 = ((year_2 - 1960)*12)+(month_2+1)


    $: if (index_1 < index_2) {
        old = data[index_1].pcepi_raw;
    } else {
        old = data[index_2].pcepi_raw;
    }
    $: if (index_1 < index_2) {
        neww = data[index_2].pcepi_raw;
    } else {
        neww = data[index_1].pcepi_raw;
    }
    $: PCE = (neww- old)/old;
    $: real_dollars = dollars + PCE * dollars;
    $: dollars = dollars;

    const displayed_dollars = tweened(0);
    $: displayed_dollars.set(real_dollars);

    let begin = 1960;
    let end = 2023;
    let step = 1;

    let new_date = new Date();
    let old_date = new Date();

    $: {if (index_1 > index_2) {
            new_date = new Date(year_1 + "-" + (month_1 + 1) + "-01");
            old_date = new Date(year_2 + "-" + (month_2 + 1) + "-01");

        } else if (index_1 < index_2) {
            new_date = new Date(year_2 + "-" + (month_2 + 1) + "-01");
            old_date = new Date(year_1 + "-" + (month_1 + 1) + "-01");
        } else {
            new_date = new Date("1900-01-01");
            old_date = new Date("1900-01-01");
        }
    }

</script>
<div class="hero">
<h1>PCE inflation calculator since 1960</h1>

<p><strong>By Cole Schnell</strong></p>

<p><strong>Updated: 12/05/2022</strong></p>

<p>The Federal Reserve Bank prefers Personal Consumption Expenditure Price Index - percent change from a year ago to measure inflation. Despite this, Consumer Price Index is way more prevalent. In fact, I wasn't able to find a single inflation calculator using PCE. So, I made one.</p>
    
<p>Hint: try to put in your birth month and year and see how much $20 then could buy today.</p>

</div>

<div class="calc">
    
    <div class ="old calc_element">
        <p>$</p>
        <input type="number" bind:value={dollars} style= "width: {50 + Math.log(dollars) * 3.6}px; min-width:50px;">

        <p>in</p>
        <select class="month" bind:value={month_2}>
            {#if year_2 == 2022}
                {#each months.slice(0,8) as m, i}
                <option value={i}>{m}</option>
                {/each}
            {:else}
                {#each months as m, i}
                <option value={i}>{m}</option>
                {/each}
            {/if}
        </select>
        <select class="year" bind:value={year_2}>
            {#each range(begin,end,step) as i}
            <option>{i}</option>
            {/each}
        </select>
    </div>
    <p class= "equal calc_element">has the same buying power as</p>

    <div class = "new calc_element">
        <p class = "result">$<strong>{$displayed_dollars.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong></p>
        <p>in</p>
        <select class="month" bind:value={month_1}>
            {#if year_1 == 2022}
                {#each months.slice(0,8) as m, i}
                <option value={i}>{m}</option>
                {/each}
            {:else}
                {#each months as m, i}
                <option value={i}>{m}</option>
                {/each}
            {/if}
        </select>
        <select class="year" bind:value={year_1}>
            {#each range(begin,end,step) as i}
            <option>{i}</option>
            {/each}
        </select>
    </div>
    <p class="source">Citation: U.S. Bureau of Economic Analysis, Personal Consumption Expenditures: Chain-type Price Index [PCEPI], retrieved from FRED, Federal Reserve Bank of St. Louis; <a href="https://fred.stlouisfed.org/series/PCEPI">https://fred.stlouisfed.org/series/PCEPI</a>, November 17, 2022.</p>
</div>
<Story {old_date} {new_date}/>

<style>

    .hero {
		height: fit-content;
		place-items: center;
		flex-direction: column;
		justify-content: center;
		text-align: center;
	}

    .hero p {
        margin: 10px;
    }

    .hero h1 {
        margin: 10px;
    }

    p {
        margin: 0;
        padding: 0;
        margin: 0;
    }

    input, select {
        height: 30px;
        margin: 0 10px 0 10px;
        padding: 0;
        border: 2px;
        border-style: none;
        background-color: white;
        box-sizing: border-box;
        border-radius: 5px;
    }


    input {
        padding-left: 5px;
        margin-left: 3px;

    }

    .calc {
        display: grid;
        width: min-content;
        justify-content: center;
        place-items: center;
    }


    .calc_element {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        height: 30px;
        padding:0;
        margin: 10px 0 10px 0;
        justify-content: center;
        place-content: center;
    }

    .equal {
        display: flex;
    }

    .result {
        padding: 0 10px 0 10px;

    }
    
    .month {
        padding: 0 2px 0 2px;
        width: 100px;
    }

    .source {
        margin-top: 20px;
        font-size: 10px;
    }

</style>
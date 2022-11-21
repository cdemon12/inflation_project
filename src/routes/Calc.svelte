<script>
	import { each } from 'svelte/internal';
    import { tweened } from 'svelte/motion';
    import {range} from './range.js';
    import data from './pce.json';

    let dollars = 20;
    let year_1 = 2022;
    let year_2 = 1959;
    let month_1 = 7;
    let month_2 = 0;

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    let old = 63;
    let neww = 63;

    $: index_1 = ((year_1 - 1959)*12)+(month_1+1)
    $: index_2 = ((year_2 - 1959)*12)+(month_2+1)


    $: if (index_1 < index_2) {
        old = data.observations[index_1].value;
    } else {
        old = data.observations[index_2].value;
    }
    $: if (index_1 < index_2) {
        neww = data.observations[index_2].value;
    } else {
        neww = data.observations[index_1].value;
    }
    $: PCE = (neww- old)/old;
    $: real_dollars = dollars + PCE * dollars;
    $: dollars = dollars;

    const displayed_dollars = tweened(0);
    $: displayed_dollars.set(real_dollars);

    let begin = 1959;
    let end = 2023;
    let step = 1;

</script>

<h1>Inflation PCE Calculator</h1>

<div class="calc">
    
    <div class ="old calc_element">
        <p>$</p>
        <input type="number" bind:value={dollars} style= "width: {20 + Math.log(dollars) * 5}px; min-width:50px;">

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
    <p class= "equal calc_element">has the same buying power as</p>

    <div class = "new calc_element">
        <p class = "result">$<strong>{$displayed_dollars.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong></p>
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
</div>

<p class="source">Citation: U.S. Bureau of Economic Analysis, Personal Consumption Expenditures: Chain-type Price Index [PCEPI], retrieved from FRED, Federal Reserve Bank of St. Louis; <a href="https://fred.stlouisfed.org/series/PCEPI">https://fred.stlouisfed.org/series/PCEPI</a>, November 17, 2022.</p>

<style>

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
        width: 400px;
    }

</style>
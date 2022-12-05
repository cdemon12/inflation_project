<script>
    import { scaleLinear, scaleTime } from "d3-scale";
    import { line, curveBasis }  from 'd3-shape';
    import { axisBottom, axisLeft } from 'd3-axis';
    import { select, interpolateArray } from 'd3';
    import { bisector, map } from "d3-array";
	import { tweened } from "svelte/motion";
    import { expoInOut as easing } from 'svelte/easing'
    import data from './data.js';

    export let value = 0;
    export let new_date = new Date("2300-01-01");
    export let old_date = new Date("1900-01-01");

    let animatedLine1 = tweened(0, {
        interpolate: interpolateArray,
        duration: 2000,
        easing: easing
    });

    let animatedLine2 = tweened(0, {
        interpolate: interpolateArray,
        duration: 2000,
        easing: easing
    });

// Create size of graph
    let svg_height = 340;
    let svg_width = 440;
    let margin = 60;
    let height = svg_height - margin * 2;
    let width = svg_width - margin * 2;


// Create xScale - non-reactive
    let xScale = scaleTime()
        .domain([new Date("1960-01-01"), new Date("2023-01-01")])
        .range([0, width]);

// Create reactive elements
    let yScale = scaleLinear()
        .domain([-5, 15])
        .range([height, 0]);
    
    let pathLine = line()
        .x(d => xScale(d[0]))
        .y(d => yScale(d[1]))
        .curve(curveBasis);

    let yScale_raw = scaleLinear()
        .domain([0,250])
        .range([height, 0]);

    let yScale_pce = scaleLinear()
        .domain([0,25000])
        .range([height, 0]);
    
    let pinXAxis, pinYAxis, pinYAxis_raw, pinYAxis_pce;

    let class2 = "cpi";

     $: {

        select(pinXAxis).call(axisBottom(xScale).ticks(5));
        select(pinYAxis).call(axisLeft(yScale).ticks(10));
        select(pinYAxis_raw).call(axisLeft(yScale_raw).ticks(10));
        select(pinYAxis_pce).call(axisLeft(yScale_pce).ticks(10));

        if (value == 0 || value == undefined) {             
            animatedLine1.set(data.map(x => [x.date,x.pcepi_pc]));
            animatedLine2.set(data.map(x => [x.date,x.big]));
        } else if (value == 1) {  
            animatedLine2.set(data.map(x => [x.date,x.cpi_pc]));
            blinders_left.set(xScale(new Date("1900-01-01")));
            blinders_right.set(xScale(new Date("2300-01-01")));
        } else if (value == 3) {
            animatedLine2.set(data.map(x => [x.date,x.cpi_pc]));
            class2 = "cpi";
        } else if (value == 4) {
            animatedLine1.set(data.map(x => [x.date,x.pcepi_pc]));
            animatedLine2.set(data.map(x => [x.date,x.pcepi_core]));
            class2 = "core";
        } else if (value == 5) {
            class2 = "cpi";
            animatedLine2.set(data.map(x => [x.date,((x.cpi)*20/250)-5]));
            animatedLine1.set(data.map(x => [x.date,((x.pcepi_raw)*20/250)-5]));
        } else if (value == 6) {
            animatedLine2.set(data.map(x => [x.date,x.small]));
            animatedLine1.set(data.map(x => [x.date,(((x.pce)-5)*20/25000)]));
        };
        
    }

    let blinders_left = tweened(0, {
        duration: 1000
    });
    let blinders_right = tweened(0,{
        duration: 1000
    });

    $: blinders_left.set(xScale(old_date));
    $: blinders_right.set(xScale(new_date));


    // Tool tip

    let m = { x: 0, y: 0 };
    let point = data[0];
    let tooltip = false;

    var bisect = bisector((d) => d[0]).center;

    function handleMousemove(event) {
        m.x = event.offsetX - margin;
        m.y = event.offsetY - margin;
        let i = bisect(data.map(x => [x.date,x.pcepi_pc]), xScale.invert(m.x));
        if (i < data.length && i > 0) {
            point = data[i];
        }
        if (m.x > 0 && m.x < width && m.y > 0 && m.y < height) {
            tooltip = true;
        } else {
            tooltip = false;
        };
    };

    $: cy = yScale(point.pcepi_pc) + margin;    
    $: cx = xScale(point.date) + margin;
    $: date = (point.date.getMonth() + 1) + "-" + (point.date.getYear() + 1900);
    $: percent = (Math.round(point.pcepi_pc*100)/100) + "%";
</script>

<svg width={svg_width} height={svg_height} on:mousemove={handleMousemove}>

    {#if (tooltip == true && value == 0)}
    <text class = "tooltip" x="{cx - 25}" y="{cy -10}">{date}, {percent}</text>

    <circle cx="{cx}" cy="{cy}" r="3" />
    {/if}
    
    {#if (old_date >= new Date("1960-02-01"))}
    <line x1="{margin + $blinders_left}" x2="{margin +  $blinders_left}" y1="{margin}" y2="{height + margin}" stroke="black"/>
    
    <rect class="blinder"  x="{margin}" y="{margin}" width="{$blinders_left}" height="{height}" />
    {/if}

    {#if (new_date < new Date("2022-08-01"))}
    <line x1="{margin + $blinders_right}" x2="{margin +  $blinders_right}" y1="{margin}" y2="{height + margin}" stroke="black"/>

    <rect class="blinder"  x="{margin + $blinders_right}" y="{margin}" width="{width - $blinders_right}" height="{height}" />
    {/if}

    <path 
        class="pce"
        d={pathLine($animatedLine1)}
        transform ="translate({margin},{margin})"
    />
    
    <path 
        class="{class2}"
        d={pathLine($animatedLine2)}
        transform ="translate({margin},{margin})"
    />


    <g 
        class="xAxis"
        bind:this={pinXAxis}
        transform="translate({margin},{margin + height})"
     />

     {#if (value < 5 || value == undefined)}
     <g 
        class="yAxis"
        bind:this={pinYAxis}
        transform="translate({margin},{margin})"

     />
     <text
        class="axis-label"
        y={30}
        x={-300}
        transform="rotate(270)"
        ><tspan>PCE Price Index,</tspan> <tspan>pecent change from a year ago</tspan>
    </text>
     {/if}
     {#if (value == 5)}
     <g 
        class="yAxis"
        bind:this={pinYAxis_raw}
        transform="translate({margin},{margin})"

     />
     <text
        class="axis-label"
        y={25}
        x={-230}
        transform="rotate(270)"
        >PCE Price Index
    </text>
     {/if}
     {#if (value >= 6)}
     <g 
        class="yAxis"
        bind:this={pinYAxis_pce}
        transform="translate({margin},{margin})"

     />
     <text
        class="axis-label"
        y={15}
        x={-200}
        transform="rotate(270)"
        >PCE
    </text>
     {/if}

     <text
        class="axis-label"
        y={svg_height - 25}
        x={(svg_width - margin) / 2}
        >Year
    </text>

</svg>

<style>

    path {
        stroke-width: 2;
        fill: none;
    }

    .axis-label {
        font-size: 0.8rem;
    }

    .blinder {
        fill: black;
        opacity: 20%;
    }

    .tooltip {
        font-size: 0.8rem;
    }

    .core {
        stroke: darkcyan;
        color: darkcyan;
        opacity: 50%;
    }
</style>
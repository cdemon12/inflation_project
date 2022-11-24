<script>
    import { scaleLinear, scaleTime } from "d3-scale";
    import { line, curveBasis }  from 'd3-shape';
    import { axisBottom, axisLeft } from 'd3-axis';
    import { select, interpolateArray } from 'd3';
    import { bisector } from "d3-array";
	import { tweened } from "svelte/motion";
    import { expoInOut as easing } from 'svelte/easing'
    import data from './pce.js';

    export let value = 0;
    export let new_date = new Date("2300-01-01");
    export let old_date = new Date("1900-01-01");

    let animatedLine = tweened(0, {
        interpolate: interpolateArray,
        duration: 2000,
        easing: easing
    });

// Create size of graph
    let svg_height = 300;
    let svg_width = 400;
    let margin = 40;
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
        .domain([0,130])
        .range([height, 0]);
    
    let pinXAxis, pinYAxis, pinYAxis_raw;

     $: {

        select(pinXAxis).call(axisBottom(xScale).ticks(5));
        select(pinYAxis).call(axisLeft(yScale).ticks(10));
        select(pinYAxis_raw).call(axisLeft(yScale_raw).ticks(10));

        if (value == 0) {             
            animatedLine.set(data.map(x => [x[0],x[1]]))
        };
        
        if (value == 1){ 
            animatedLine.set(data.map(x => [x[0],x[3]]))
        };
    }

    let blinders_left = tweened(0);
    let blinders_right = tweened(0);

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
        let i = bisect(data.map(x => [x[0],x[1]]), xScale.invert(m.x));
        if (i < data.length && i > 0) {
            point = data[i];
        }
        if (m.x > 0 && m.x < width && m.y > 0 && m.y < height) {
            tooltip = true;
        } else {
            tooltip = false;
        };
    };

    $: cy = yScale(point[1]) + margin;    
    $: cx = xScale(point[0]) + margin;
    $: date = (point[0].getMonth() + 1) + "-" + (point[0].getYear() + 1900);
    $: percent = (Math.round(point[1]*100)/100) + "%";
</script>

<svg width={svg_width} height={svg_height} on:mousemove={handleMousemove}>

    {#if (tooltip == true && value == 0)}
    <text class = "tooltip" x="{cx - 25}" y="{cy -10}">{date}, {percent}</text>

    <circle cx="{cx}" cy="{cy}" r="3" />
    {/if}

    {#if (value == 0)}
    <line x1="{margin + $blinders_left}" x2="{margin +  $blinders_left}" y1="{margin}" y2="{height + margin}" stroke="black"/>
    
    <rect class="blinder"  x="{margin}" y="{margin}" width="{$blinders_left}" height="{height}" />

    {#if (new_date < new Date("2022-08-01"))}
    <line x1="{margin + $blinders_right}" x2="{margin +  $blinders_right}" y1="{margin}" y2="{height + margin}" stroke="black"/>

    <rect class="blinder"  x="{margin + $blinders_right}" y="{margin}" width="{width - $blinders_right}" height="{height}" />
    {/if}
    {/if}

    <path 
        d={pathLine($animatedLine)}
        transform ="translate({margin},{margin})"
    />

    <g 
        class="xAxis"
        bind:this={pinXAxis}
        transform="translate({margin},{margin + height})"
     />

     {#if (value == 0)}
     <g 
        class="yAxis"
        bind:this={pinYAxis}
        transform="translate({margin},{margin})"

     />
     {/if}
     {#if (value == 1)}
     <g 
        class="yAxis"
        bind:this={pinYAxis_raw}
        transform="translate({margin},{margin})"

     />
     {/if}

     <text
        class="axis-label"
        y={svg_height - 10}
        x={(svg_width - margin) / 2}
        >Year
    </text>

    <text
        class="axis-label"
        y={15}
        x={-(svg_height + margin) / 2}
        transform="rotate(270)"
        >PCE 
    </text>

</svg>

<style>

    path {
        stroke: purple;
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
</style>
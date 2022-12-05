<script>
    // Step 1: load data
    import data from './recon.js';

    export let step = 0;

    let points = [
        {index: "PCEPI", mean: data.main.pce},
        {index: "CPI", mean: data.main.cpi}
    ]

    const difference = data.main.cpi - data.main.pce;

    const percents = {
        formula: data.formula.total / difference,
        weight: data.weight.total / difference,
        scope_plus: data.scope_plus.total / difference,
        scope_less: data.scope_less.total / difference,
        other: data.other.total / difference,
    };

    // Step 2: define constants
    let svg = {
        height: 300,
        width: 400,
        margin: 20,
    }

    let graph = {
        height: svg.height - svg.margin * 2,
        width: svg.width - svg.margin * 2,
        xTicks: ["PCE", "CPI"],
        yTicks: [0, 1, 2],
        yTicks2: ["Formula", "Other", "Scope Plus", "Scope Less", "Weight"]
    }

    import { scaleLinear } from "d3-scale";
	import { tweened } from 'svelte/motion';

    let scale = {
        x: scaleLinear()
        .domain([0, graph.xTicks.length])
        .range([svg.margin, graph.width]),
        y: scaleLinear()
        .domain([0, graph.yTicks.length])
        .range([graph.height, 0]),
        y2: scaleLinear()
        .domain([0, graph.yTicks2.length])
        .range([graph.height, 0])
    }

    let barWidth = (graph.width - 40*points.length)/2 - 30;


    // Step 3: define reactive variables

    const x1 = tweened(scale.x(0) + 40);
    const x2 = tweened(scale.x(1) + 40);
    const fill = tweened(1);
    const h2 = tweened(graph.height - scale.y(points[1].mean));
    const y2 = tweened(scale.y(points[1].mean));
    const fill2 = tweened(1);

    const formula = tweened(
        {
            x:0,
            y:0,
            h:0,
            w:0,
            fill:0
        }
    );
    const other = tweened(
        {
            x:0,
            y:0,
            h:0,
            w:0,
            fill:0
        }
    );
    const scope_less = tweened(
        {
            x:0,
            y:0,
            h:0,
            w:0,
            fill:0
        }
    );
    const scope_plus = tweened(
        {
            x:0,
            y:0,
            h:0,
            w:0,
            fill:0
        }
    );
    const weight = tweened(
        {
            x:0,
            y:0,
            h:0,
            w:0,
            fill:0
        }
    );
    
    const effects = [formula, other, weight, scope_less, scope_plus];

    let diff = scale.y(points[0].mean) - scale.y(points[1].mean);
    
    let yVerticalBar = scale.y(points[1].mean);

    let lineX = svg.width/2;

    let view = tweened({
        x: 0,
        y: 0,
        w: svg.width,
        h: svg.height
    });

    $: {
        if (step == 0) {
            x1.set(scale.x(0) + 40);
            x2.set(scale.x(1) + 40);
            fill.set(1);
            h2.set(graph.height - scale.y(points[1].mean));
            y2.set(scale.y(points[1].mean))
            formula.set({
                x:lineX,
                y:yVerticalBar,
                h:diff,
                w:barWidth/5,
                fill: 0
            });
            weight.set({
                x:lineX + barWidth/5,
                y:yVerticalBar,
                h:diff,
                w:barWidth/5,
                fill: 0
            });
            scope_less.set({
                x:lineX + 2*barWidth/5,
                y:yVerticalBar,
                h:diff,
                w:barWidth/5,
                fill: 0
            });
            scope_plus.set({
                x:lineX + 3*barWidth/5,
                y:yVerticalBar,
                h:diff,
                w:barWidth/5,
                fill: 0
            });
            other.set({
                x:lineX + 4*barWidth/5,
                y:yVerticalBar,
                h:diff,
                w:barWidth/5,
                fill:0
            });
            fill2.set(1);
        } else if (step == 1) {
            y2.set(scale.y(points[1].mean))
            formula.set({
                x:lineX,
                y:yVerticalBar,
                h:diff,
                w:barWidth/5,
                fill: 0
            });
            weight.set({
                x:lineX + barWidth/5,
                y:yVerticalBar,
                h:diff,
                w:barWidth/5,
                fill: 0
            });
            scope_less.set({
                x:lineX + 2*barWidth/5,
                y:yVerticalBar,
                h:diff,
                w:barWidth/5,
                fill: 0
            });
            scope_plus.set({
                x:lineX + 3*barWidth/5,
                y:yVerticalBar,
                h:diff,
                w:barWidth/5,
                fill: 0
            });
            other.set({
                x:lineX + 4*barWidth/5,
                y:yVerticalBar,
                h:diff,
                w:barWidth/5,
                fill:0
            });
            fill2.set(1);
            x1.set(scale.x(0.5) + 40);
            x2.set(scale.x(0.5) + 40);
            // delay 1
            fill.set(0, {
                delay: 500
            });
            h2.set(diff, {
                delay: 500
            });
        } else if (step == 2) {
            x2.set(svg.width/2);
        // delay 1
            formula.set({
                x:lineX,
                y:yVerticalBar,
                h:diff,
                w:barWidth/5,
                fill: 1
            }, {
                duration: 1,
                delay: 250
            });
            weight.set({
                x:lineX + barWidth/5,
                y:yVerticalBar,
                h:diff,
                w:barWidth/5,
                fill: 1
            }, {
                duration: 1,
                delay: 250
            });
            scope_less.set({
                x:lineX + 2*barWidth/5,
                y:yVerticalBar,
                h:diff,
                w:barWidth/5,
                fill: 1
            }, {
                duration: 1,
                delay: 250
            });
            scope_plus.set({
                x:lineX + 3*barWidth/5,
                y:yVerticalBar,
                h:diff,
                w:barWidth/5,
                fill: 1
            }, {
                duration: 1,
                delay: 250
            });
            other.set({
                x:lineX + 4*barWidth/5,
                y:yVerticalBar,
                h:diff,
                w:barWidth/5,
                fill: 1
            }, {
                duration: 1,
                delay: 250
            });
            // delay 1
            fill2.set(0, {
                delay: 250,
                duration: 1
            });
            formula.set({
                x:lineX,
                y:yVerticalBar,
                h:diff,
                w:barWidth/5,
                fill: 1
            }, {
                delay: 750
            });
            weight.set({
                x:lineX + barWidth/5,
                y:yVerticalBar,
                h:diff,
                w:barWidth/5,
                fill: 1
            }, {
                delay: 750
            });
            scope_less.set({
                x:lineX + 2*barWidth/5,
                y:yVerticalBar,
                h:diff,
                w:barWidth/5,
                fill: 1
            }, {
                delay: 750
            });
            scope_plus.set({
                x:lineX + 3*barWidth/5,
                y:yVerticalBar,
                h:diff,
                w:barWidth/5,
                fill: 1
            }, {
                delay: 750
            });
            other.set({
                x:lineX + 4*barWidth/5,
                y:yVerticalBar,
                h:diff,
                w:barWidth/5,
                fill: 1
            }, {
                delay: 750
            });
            formula.set({
                x:lineX - (barWidth * -percents.formula),
                y:yVerticalBar,
                h:diff,
                w:barWidth * -percents.formula,
                fill: 1
            }, {
                delay: 750
            });
            weight.set({
                x:lineX - (barWidth * -percents.weight),
                y:yVerticalBar + diff + 10,
                h:diff,
                w:barWidth * -percents.weight,
                fill: 1
            }, {
                delay: 750
            });
            scope_less.set({
                x:lineX,
                y:yVerticalBar + (diff + 10)*2,
                h:diff,
                w:barWidth * percents.scope_less,
                fill: 1
            }, {
                delay: 750
            });
            scope_plus.set({
                x:lineX,
                y:yVerticalBar + (diff + 10)*3,
                h:diff,
                w:barWidth * percents.scope_plus,
                fill: 1
            }, {
                delay: 750
            });
            other.set({
                x:lineX - (barWidth * -percents.other),
                y:yVerticalBar + (diff + 10)*4,
                h:diff,
                w:barWidth * -percents.other,
                fill: 1
            }, {
                delay: 750
            });
            view.set({
                x: 0,
                y: 0, 
                w: svg.width,
                h: svg.height
            })
        } else if (step == 3){ 
            view.set({
                x: 160,
                y: 37, 
                w: 30,
                h: 40
            })
        } else if (step == 4){
            view.set({
                x: 10,
                y: 80, 
                w: 195,
                h: 30
            })
        } else if (step == 5){
            view.set({
                x: 190,
                y: 127, 
                w: 195,
                h: 30
            })
        } else if (step == 6){
            view.set({
                x: 195,
                y: 180, 
                w: 75,
                h: 10
            })
        } else if (step ==7){
            view.set({
                x: 190,
                y: 208, 
                w: 20,
                h: 40
            })
        } else if (step == 8){
            view.set({
                x: 0,
                y: 0, 
                w: svg.width,
                h: svg.height
            })
        };
    }

</script>

<div class="chart">

<svg width={svg.width} height={svg.height} viewBox="{$view.x} {$view.y} {$view.w} {$view.h}">
    {#if step <= 1}
        <!--y axis-->
        <g class="axis y-axis">
            {#each graph.yTicks as tick}
                <g class="tick tick-{tick}" transform="translate(0, {scale.y(tick)})">
                    <line x2="100%"/>
                    <text y="-4">{tick}</text>
                </g>
            {/each}
        </g>

        <!--x axis-->
        <g class="axis x-axis">
            {#each points as point, i}
                <g class="tick" transform="translate({scale.x(i)},{graph.height + 20})">
                    <text x="{40 + barWidth/2}" y="-4">{point.index}</text>
                </g>
            {/each}
        </g>
    {:else if (step > 1)}

        <!--x axis-->
        <g class="axis x-axis">
            <line y1="30" y2="250" x1="{svg.width/2}" x2="{svg.width/2}" stroke="black"/>
        </g>
    {/if}
    <!--bars-->

    <g class='bars'>
                <rect
                    fill-opacity = "{$fill}"
                    x="{$x1}"
                    y="{scale.y(points[0].mean)}"
                    width="{barWidth}"
                    height="{graph.height - scale.y(points[0].mean)}"
                />
                <rect
                    fill-opacity="{$fill2}"
                    x="{$x2}"
                    y="{$y2}"
                    width="{barWidth}"
                    height="{$h2}"
                />
                <rect 
                    fill-opacity = "{$formula.fill}"
                    x="{$formula.x}"
                    y="{$formula.y}"
                    width="{$formula.w}"
                    height="{$formula.h}"
                />
                <rect 
                    fill-opacity = "{$other.fill}"
                    x="{$other.x}"
                    y="{$other.y}"
                    width="{$other.w}"
                    height="{$other.h}"
                />
                <rect 
                    fill-opacity = "{$weight.fill}"
                    x="{$weight.x}"
                    y="{$weight.y}"
                    width="{$weight.w}"
                    height="{$weight.h}"
                />
                <rect 
                    fill-opacity = "{$scope_less.fill}"
                    x="{$scope_less.x}"
                    y="{$scope_less.y}"
                    width="{$scope_less.w}"
                    height="{$scope_less.h}"
                />
                <rect    
                    fill-opacity = "{$scope_plus.fill}"
                    x="{$scope_plus.x}"
                    y="{$scope_plus.y}"
                    width="{$scope_plus.w}"
                    height="{$scope_plus.h}"
                />
    </g>
</svg>
</div>

<style>

	.chart {
		width: 100%;
		max-width: 400px;
		margin: 0 auto;
	}

	svg {
		position: relative;

	}

	.tick {
		font-family: Helvetica, Arial;
		font-size: .725em;
		font-weight: 200;
	}

	.tick line {
		stroke: #e2e2e2;
		stroke-dasharray: 2;
	}

	.tick text {
		fill: #ccc;
		text-anchor: start;
	}

	.tick.tick-0 line {
		stroke-dasharray: 0;
	}

	.x-axis .tick text {
		text-anchor: middle;
	}

	.bars rect {
		fill: #a11;
		stroke: none;
		opacity: 0.65;
	}




</style>
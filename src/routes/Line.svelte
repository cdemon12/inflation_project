<script>
    import { scaleLinear, scaleTime } from "d3-scale";
    import { line, curveBasis }  from 'd3-shape';
    
    export let data;

    let xScale = scaleTime()
        .domain([new Date("1959-01-01"), new Date("2022-01-08")])
        .range([0, 100]);

    let yScale = scaleLinear()
        .domain([0, 130])
        .range([100, 0]);

    const pathLine = line()
        .x(d => xScale(d[1]))
        .y(d => yScale(d[0]))
        .curve(curveBasis);

</script>

<svg viewBox='0 0 100 100'>
    <g>

    <path d={pathLine(data)} />

    <line />

    </g>
</svg>


<style>
    path {
        stroke: purple;
        stroke-width: 0.5;
        fill: none;
    }
</style>
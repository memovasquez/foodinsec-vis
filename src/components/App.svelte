<script>
    //@ts-nocheck
    import * as d3 from 'd3';
    import {onMount} from 'svelte';

    let fao_dataset_path = 'https://raw.githubusercontent.com/memovasquez/data/main/FAO_DatasetAbridged.csv';
    let fao_data = [];
    console.log("Outside onmount method");
    onMount(async () => {
        
        d3.csv(fao_dataset_path).then((d) => {
            fao_data = d;
            console.log("Got data", d);
        });

        console.log("After then block");

	});

</script>

<main>
    <h1>App component</h1>
    {#if fao_data.length >0 }
    <p>{fao_data[0]}</p>
    {/if}
</main>




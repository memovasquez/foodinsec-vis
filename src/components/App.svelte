<script>
    // @ts-nocheck
    import MainScroll from './MainScroll.svelte';
    import * as d3 from 'd3';
    import { onMount } from 'svelte';

    let fao_dataset_path = 'https://raw.githubusercontent.com/memovasquez/data/main/FAO_DatasetAbridged.csv';
    let wfp_dataset_path = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTYmcthdA2QHcxz-7LyWtPwFCw6EcrxqdbKk7ABJNdcDGEb4u5AyoU1Gg3716krw3_HmqaH7tzGBd17/pub?output=csv";
    let wfp_data = [];
    let fao_data = [];


    onMount(async () => {
        //fetch the data here once and for all
        d3.csv(wfp_dataset_path).then((d) => {
                wfp_data = d;
        });

        d3.csv(fao_dataset_path).then((d) => {
            fao_data = d;
        });

	});

    $: {
        wfp_data = wfp_data;
        fao_data = fao_data;
    }


</script>

<main>
    {#if wfp_data.length > 0 && fao_data.length > 0}
    <MainScroll bind:wfp_data={wfp_data} bind:fao_data={fao_data}/>
    {/if}
</main>
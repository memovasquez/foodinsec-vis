<script>
// @ts-nocheck


    import {onMount} from 'svelte';
    import * as d3 from 'd3';
    import Scroller from '@sveltejs/svelte-scroller';
    
    // properties for data to be passed in
    export let wfp_data = [];
    export let fao_data = [];

    let count;
	let index;
	let offset;
	let progress;
    let width;
	let top = 0.1;
	let threshold = 0.5;
	let bottom = 0.9;


</script>

<main>
    <Scroller
        top={0.0}
        bottom={1}
        threshold={0.5}
        bind:count
        bind:index
        bind:offset
        bind:progress
    >

    <!-- Progress Bars -->
    <!-- Toogle visibility on/off in css -->
    <div class="progress-bars" slot="background">
      <p>current section: <strong>{index + 1}/{count}</strong></p>
      <progress value={count ? (index + 1) / count : 0} />

      <p>offset in current section</p>
      <progress value={offset || 0} />

      <p>total progress</p>
      <progress value={progress || 0} />
    </div>


  <div class="foreground" slot="foreground">
      <section class="panel" style="background-color: #eed4bc;">
        <p>One</p>
        <!-- <Profile/> -->
      </section>  
     
      <section class="panel" style="background-color: #eed4bc;">
          <!-- <Info /> -->
        </section>
      <section class="panel" style="background-color: #eed4bc;">
            <!-- <Nutrition /> -->
      </section>
      <section class="panel" style="display:block; margin:auto" align="center">
            <!-- <Dots /> -->
      </section>
      <section class="panel" style="background-color: #eed4bc;">
          <!-- {#if fao_data.length !== 0}
          <CountryFoodInsecurity bind:fao_data={fao_data}/>
          {/if} -->
      </section>
  </div>
    </Scroller>



</main>

<style>
    main {
        text-align: center;
        font-family: "Nunito", sans-serif;
        font-weight: 300;
        line-height: 2;
        font-size: 24px;
        color: var(--color-text);

    }

    .panel {
		height: 100vh;
		width: 100%;
	}

	.panel.green {
		margin-bottom: 400px
	}

    #pinContainer {
        width: 100%;
		height: 100%;
		overflow: hidden;
		-webkit-perspective: 1000;
		        perspective: 1000;
    }

    #slideContainer {
		width: 400%; /* to contain 4 panels, each with 100% of window width */
		height: 100%;
	}

    .background {
    width: 100%;
    height: 100vh;
    position: relative;
    /* outline: green solid 3px; */
    }
    .foreground {
        width: 100%;
        margin: 0 auto;
        height: auto;
        position: relative;
        /* outline: red solid 3px; */
    }
    .progress-bars {
        position: absolute;
        background: rgba(170, 51, 120, 0.2) /*  40% opaque */;
        visibility: hidden;
    }



</style>



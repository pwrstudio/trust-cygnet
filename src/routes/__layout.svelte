<script>
  import { onMount } from "svelte"
  import MenuBar from "$lib/components/MenuBar.svelte"
  import Footer from "$lib/components/Footer.svelte"
  import Login from "$lib/components/Login.svelte"
  import Background from "$lib/components/Background.svelte"
  import LoadingIndicator from "$lib/components/LoadingIndicator.svelte"
  import {
    configureAuthClient,
    handleRedirectCallback,
    setProfile,
    isAuthenticated,
    profileMeta,
  } from "$lib/authentication.js"
  import {
    cycles,
    getData,
    listenForPhaseChanges,
    listenForProposalChanges,
  } from "$lib/data.js"
  import {
    setDefaultCycle,
    setAvailableCycles,
    getCycleFromCookie,
    changeCycle,
    availableCycles,
  } from "$lib/cycles.js"

  // DEBUG ==>
  // $: console.log("$currentCycle", $currentCycle)
  // $: console.log("$availableCycles", $availableCycles)
  // $: console.log("$general", $general)
  // $: console.log("$voteAllocation", $voteAllocation)

  let authenticationInProgress = true

  onMount(async () => {
    console.log("__ Starting app...")
    console.time("init")
    await configureAuthClient()
    console.log("____ Auth client configured")
    const query = window.location.search
    if (query.includes("code=") && query.includes("state=")) {
      await handleRedirectCallback()
    }
    if (isAuthenticated) setProfile()
    await getData()
    console.log("____ Data received")
    setAvailableCycles($profileMeta, $cycles)
    console.log("____ Available cycles:", $availableCycles)
    const cookieCycleId = getCycleFromCookie()
    console.log("____ Cycle cookie read:", cookieCycleId)
    if (cookieCycleId && $cycles.find(c => c._id === cookieCycleId)) {
      changeCycle($cycles.find(c => c._id === cookieCycleId))
    } else {
    setDefaultCycle($profileMeta, $cycles)
    }
    listenForPhaseChanges()
    listenForProposalChanges()
    authenticationInProgress = false
    console.timeEnd("init")
    console.log("__ App started")
  })
</script>

<!-- MAIN -->
{#if authenticationInProgress}
  <LoadingIndicator />
{:else if isAuthenticated}
  <MenuBar />
  <main>
    <slot />
  </main>
  <Footer />
{:else}
  <Login />
{/if}

<Background />

<style lang="scss" global>
  @import "../variables.scss";

  * {
    box-sizing: border-box;
    line-height: 1.4em;
  }

  body,
  html {
    font-family: $primary-font;
    -webkit-overflow-scrolling: unset;
  }

  main {
    width: calc(100% - 40px);
    margin-left: auto;
    margin-right: auto;
    max-width: 1240px;
    margin-top: 100px;
    min-height: 100vh;
    position: relative;
    z-index: 100;

    @include screen-size("small") {
      margin-top: 70px;
    }
  }
</style>

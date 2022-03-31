<div class="logo-animation" />

<style lang="scss">
  @import "../../variables.scss";

  .logo-animation {
    display: block;
    height: 5.75em;
    width: 10em;
    background-image: url(/assets/image/logo-sprite.png);
    background-position: 0 0;
    background-size: 1000%;
    font-size: 20px;
    animation-name: run-x, run-y;
    animation-duration: 0.5s, 5s;
    animation-iteration-count: infinite;
    animation-timing-function: steps(10), steps(10);
  }

  @keyframes run-x {
    0% {
      background-position-x: 0;
    }
    to {
      background-position-x: -100em;
    }
  }

  @keyframes run-y {
    0% {
      background-position-y: 0;
    }
    to {
      background-position-y: -57.5em;
    }
  }
</style>

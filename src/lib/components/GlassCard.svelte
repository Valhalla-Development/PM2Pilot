<script lang="ts">
export let maxWidth = '500px';
export let padding = 'p-6 sm:p-8 md:p-10';
</script>

<div class="card card--glass" style="max-width: {maxWidth};">
  <div class="card__content {padding}">
    <slot />
  </div>
</div>

<style>
  :root {
    --primary500: hsl(292, 71%, 60%);
    --primary600: hsl(var(--hue-primary), 90%, 60%);
    --white0: hsla(0, 0%, 100%, 0);
    --white50: hsla(0, 0%, 100%, 0.25);
    --white200: hsla(0, 0%, 100%, 0.4);
    --white: hsl(217, 90%, 37%);
  }

  .card {
    --blur: 12px;
    background-image: linear-gradient(90deg, var(--primary600), var(--primary500));
    border-radius: 1em;
    box-shadow: 0 0.25em 0.375em hsla(0, 0%, 0%, 0.1);
    position: relative;
    width: 100%;
    margin: 0 auto;
    z-index: 1;
  }

  .card--glass {
    backdrop-filter: blur(var(--blur));
    -webkit-backdrop-filter: blur(var(--blur));
    background-image: linear-gradient(90deg, 
      rgba(255, 255, 255, 0.4),
      rgba(255, 255, 255, 0.25)
    );
    color: inherit;
  }

  :global(.dark) .card--glass {
    background-image: linear-gradient(90deg, 
      rgba(26, 26, 26, 0.4),
      rgba(26, 26, 26, 0.25)
    );
  }

  .card--glass:before,
  .card--glass:after {
    border-radius: inherit;
    content: "";
    display: block;
    position: absolute;
    inset: 0;
    pointer-events: none;
    border-width: 8px;
  }

  .card--glass:before {
    border: 8px solid var(--white);
    mask-image: linear-gradient(135deg, var(--white), var(--white0) 50%);
  }

  .card--glass:after {
    border: 8px solid var(--primary500);
    mask-image: linear-gradient(135deg, var(--white0) 50%, var(--white));
  }

  .card__content {
    position: relative;
    z-index: 1;
    border-radius: inherit;
    width: 100%;
    height: 100%;
    background: none;
  }
</style> 
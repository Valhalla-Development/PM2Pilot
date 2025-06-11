<script lang="ts">
export let className = '';
export let style = '';
</script>

<svg style="display: none">
  <filter
    id="glass-distortion"
    x="0%"
    y="0%"
    width="100%"
    height="100%"
    filterUnits="objectBoundingBox"
  >
    <feTurbulence
      type="fractalNoise"
      baseFrequency="0.01 0.01"
      numOctaves="1"
      seed="5"
      result="turbulence"
    />

    <feComponentTransfer in="turbulence" result="mapped">
      <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
      <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
      <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
    </feComponentTransfer>

    <feGaussianBlur in="turbulence" stdDeviation="2" result="softMap" />

    <feSpecularLighting
      in="softMap"
      surfaceScale="5"
      specularConstant="1"
      specularExponent="100"
      lighting-color="white"
      result="specLight"
    >
      <fePointLight x="-200" y="-200" z="300" />
    </feSpecularLighting>

    <feComposite
      in="specLight"
      operator="arithmetic"
      k1="0"
      k2="1"
      k3="1"
      k4="0"
      result="litImage"
    />

    <feDisplacementMap
      in="SourceGraphic"
      in2="softMap"
      scale="100"
      xChannelSelector="R"
      yChannelSelector="G"
    />
  </filter>
</svg>

<!-- Main liquid glass wrapper -->
<div class="liquidGlass-wrapper {className}" {style}>
  <!-- Backdrop effect layer with distortion -->
  <div class="liquidGlass-effect"></div>
  
  <!-- Tint overlay -->
  <div class="liquidGlass-tint"></div>
  
  <!-- Shine effect -->
  <div class="liquidGlass-shine"></div>
  
  <!-- Content layer -->
  <div class="liquidGlass-text">
    <slot></slot>
  </div>
</div>

<style>
  .liquidGlass-wrapper {
    position: relative;
    display: flex;
    overflow: hidden;
    cursor: default;
    box-shadow: 0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
    padding: 2rem;
    border-radius: 1.5rem;
  }

  .liquidGlass-effect {
    position: absolute;
    z-index: 0;
    inset: 0;
    backdrop-filter: blur(3px);
    filter: url(#glass-distortion);
    overflow: hidden;
    isolation: isolate;
    border-radius: 1.5rem;
  }

  .liquidGlass-tint {
    z-index: 1;
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.25);
    border-radius: 1.5rem;
  }

  .liquidGlass-shine {
    position: absolute;
    inset: 0;
    z-index: 2;
    overflow: hidden;
    border-radius: 1.5rem;
    box-shadow: inset 2px 2px 1px 0 rgba(255, 255, 255, 0.5),
      inset -1px -1px 1px 1px rgba(255, 255, 255, 0.5);
  }

  .liquidGlass-text {
    z-index: 3;
    position: relative;
    width: 100%;
  }
</style> 
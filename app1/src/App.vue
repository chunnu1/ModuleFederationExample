<template>
  <div class="mt-10 text-3xl mx-auto max-w-6xl">
    <div>Name: app1</div>
    <div>Framework: vue3</div>
    <div>Language: JavaScript</div>
    <div>CSS: Tailwind</div>
    <click-counter/>
  </div>
</template>
<script>
import ClickCounter from './ClickCounter.vue';
export default {
  components: { ClickCounter },
  
}
</script>

<template>
  <div class="p-5 rounded border border-blue-500 border-opacity-100">
        <p>Count: <span>{{count}}</span></p>
        <button @click="count++" class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">add 1</button>
        <button @click="count = 0" class="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded">reset</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            count: 0
        };
    },
}
</script>
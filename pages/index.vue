<script setup lang="ts">
import request from '../api/request';
const { greeting, fetchGreeting } = useGreeting();
onMounted(() => {
  fetchGreeting('xjh');
});

const request_click = async () => {
  let a = await request({
    url: '/song/url',
    params: { id: "2607303573,2124385868", br: 320000 }
  })
  console.log(a);
};

</script>


<template>
  <div>
    <a> {{ greeting }}</a>
    <button class="bg-teal-700" @click="request_click"> request </button>
  </div>
</template>
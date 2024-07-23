<script setup lang="ts">
import request from '../api/request';
const { greeting, fetchGreeting } = useGreeting();
onMounted(() => {
  fetchGreeting('xjh');
});

const request_click = async () => {
  let a = await request({
    url: '/top/list',
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
<script setup lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import request from '~/api/request';

interface Track {
    name: string;
    id: number;
}

interface Playlist {
    id: number;
    name: string;
    coverImgUrl: string;
    tracks: Track[];
}

const ranks = ref<Playlist[]>([]);
const loading = ref(true);
const selectedRank = ref<Playlist | null>(null);

onMounted(async () => {
    try {
        let data: any[] = [];
        for (let index = 0; index < 5; index++) {
            let ran_list = await request({
                url: '/top/list',
                params: {
                    idx: index
                }
            })
            data.push(ran_list.data.playlist);
        }
        ranks.value = data;
    } catch (error) {
        console.error('Failed to fetch rank data:', error);
    } finally {
        loading.value = false;
    }
});

const selectRank = (rank: Playlist) => {
    selectedRank.value = rank;
};

const goBack = () => {
    selectedRank.value = null;
};
</script>

<template>
    <div class="rank-page p-4 bg-gray-900 text-white min-h-screen">
        <h1 class="text-2xl font-bold mb-4">Music Rank</h1>
        <div v-if="loading" class="text-center">Loading...</div>
        <div v-else>
            <div v-if="!selectedRank" class="flex flex-wrap">
                <div v-for="rank in ranks" :key="rank.id"
                    class="rank-item flex flex-col items-center mb-6 cursor-pointer mx-4" @click="selectRank(rank)">
                    <img :src="rank.coverImgUrl" alt="Cover Image" class="w-32 h-32 object-cover mb-2">
                    <h2 class="text-xl font-semibold">{{ rank.name }}</h2>
                </div>
            </div>
            <div v-else>
                <button @click="goBack" class="mb-4 px-4 py-2 bg-blue-500 text-white rounded">Back</button>
                <h2 class="text-xl font-semibold mb-4">{{ selectedRank.name }}</h2>
                <div class="flex flex-wrap">
                    <div v-for="track in selectedRank.tracks" :key="track.id" class="track-item mb-2 mr-4">
                        {{ track.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

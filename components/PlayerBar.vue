<script setup lang="ts">


const playerStore = usePlayerStore();

const { currentSong, fetchCurrentSong } = playerStore;

const audioPlayer = ref<HTMLAudioElement | null>(null);
const currentTime = ref('');
const duration = ref('');
const isPlaying = ref(false);

const togglePlay = () => {
    if (audioPlayer.value) {
        if (audioPlayer.value.paused) {
            audioPlayer.value.play().catch(error => {
                console.error('Error playing audio:', error);
            });
            isPlaying.value = true;
        } else {
            audioPlayer.value.pause();
            isPlaying.value = false;
        }
    }
};



const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const updateTime = () => {
    if (audioPlayer.value) {
        currentTime.value = formatTime(audioPlayer.value.currentTime);
    }
};

const updateDuration = () => {
    if (audioPlayer.value) {
        duration.value = formatTime(audioPlayer.value.duration);
    }
};


</script>

<template>
    <div class="player-bar bg-gray-100 p-5 rounded-lg text-center">
        <audio ref="audioPlayer" :src="currentSong.url" @timeupdate="updateTime"
            @durationchange="updateDuration"></audio>
        <button @click="togglePlay" class="m-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            {{ isPlaying ? 'Pause' : 'Play' }}
        </button>
        <div class="my-2">Current Time: {{ currentTime }}</div>
        <div class="my-2">Duration: {{ duration }}</div>
    </div>
</template>
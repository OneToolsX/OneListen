<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { usePlayerStore } from '@/composables/Player';
import { Howl } from 'howler';

const playerStore = usePlayerStore();

const currentTime = ref('');
const duration = ref('');
const isPlaying = ref(false);
let howlInstance: Howl | null = null;
const showPlaylist = ref(false);

const initializeHowl = () => {
    if (howlInstance) {
        howlInstance.unload();
    }
    isPlaying.value = false;
    if (playerStore.currentSong) {
        howlInstance = new Howl({
            src: [playerStore.currentSong.url],
            html5: true,
            onplay: () => {
                isPlaying.value = true;
                updateDuration();
            },
            onpause: () => {
                isPlaying.value = false;
            },
            onend: () => {
                isPlaying.value = false;
            },
            onload: () => {
                updateDuration();
            },
            onloaderror: (_: any, err: any) => {
                console.error('Load error', err);
            },
            onplayerror: (_: any, err: any) => {
                console.error('Play error', err);
            }
        });
    }
};

const togglePlay = () => {
    if (howlInstance) {
        if (howlInstance.playing()) {
            howlInstance.pause();
        } else {
            howlInstance.play();
        }
    }
};

const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const updateTime = () => {
    if (howlInstance) {
        currentTime.value = formatTime(howlInstance.seek() as number);
    }
};

const updateDuration = () => {
    if (howlInstance) {
        duration.value = formatTime(howlInstance.duration());
    }
};

watch(() => playerStore.currentSong, initializeHowl);

onMounted(() => {
    initializeHowl();
    setInterval(updateTime, 1000); // Update current time every second
});

onUnmounted(() => {
    if (howlInstance) {
        howlInstance.unload();
    }
});

</script>


<template>
    <div class="player-bar bg-gray-800 p-5 rounded-lg text-center text-gray-200 flex items-center justify-between">
        <!-- Left: Control Buttons -->
        <div class="player-controls flex items-center space-x-4">
            <button @click="playerStore.prevSong" class="p-2 bg-gray-700 text-white rounded hover:bg-gray-600">
                Prev
            </button>
            <button @click="togglePlay" class="p-2 bg-blue-700 text-white rounded hover:bg-blue-600">
                {{ isPlaying ? 'Pause' : 'Play' }}
            </button>
            <button @click="playerStore.nextSong" class="p-2 bg-gray-700 text-white rounded hover:bg-gray-600">
                Next
            </button>
        </div>

        <!-- Middle: Progress Bar -->
        <div class="flex-1 mx-4">
            <div class="text-gray-400 mb-1">Current Time: {{ currentTime }} / Duration: {{ duration }}</div>
            <!-- TODO add the progress bar -->
            <!-- <input type="range" min="0" :max="duration" v-model="currentTime" class="w-full"> -->
        </div>

        <!-- Right: Playlist Toggle Button -->
        <div class="relative">
            <button @click="showPlaylist = !showPlaylist" class="p-2 bg-gray-700 text-white rounded hover:bg-gray-600">
                List
            </button>
            <div v-if="showPlaylist"
                class="absolute bottom-full right-0 mb-2 w-64 bg-gray-800 rounded-lg shadow-lg z-50">
                <h3 class="text-lg font-bold mb-3 text-gray-100 p-3">Player List</h3>
                <ul>
                    <li v-for="(song, index) in playerStore.playlist" :key="index" class="mb-2">
                        <button @click="() => playerStore.setCurrentSong(song)"
                            :class="{ 'bg-blue-900': playerStore.currentSong === song, 'bg-gray-600': playerStore.currentSong !== song }"
                            class="w-full text-left px-4 py-2 rounded hover:bg-gray-500">
                            {{ song.name }}
                        </button>
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

interface Song {
    id: number;
    name: string;
    url: string;
}

export const usePlayerStore = defineStore('player', () => {
    const playlist = ref<Song[]>([
    ]);

    const currentSongIndex = ref(0);

    const currentSong = computed(() => {
        return playlist.value.length > 0 ? playlist.value[currentSongIndex.value] : null;
    });

    const nextSong = () => {
        if (currentSongIndex.value < playlist.value.length - 1) {
            currentSongIndex.value++;
        }
    };

    const prevSong = () => {
        if (currentSongIndex.value > 0) {
            currentSongIndex.value--;
        }
    };

    const addSongToList = (song: Song) => {
        playlist.value.push(song);
    };

    const setCurrentSong = (song: Song) => {
        const index = playlist.value.findIndex(s => s.id === song.id);
        
        if (index !== -1) {
            currentSongIndex.value = index;
        }
    }

    return {
        playlist,
        currentSong,
        nextSong,
        prevSong,
        addSongToList,
        setCurrentSong
    };
});
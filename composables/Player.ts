import { defineStore } from 'pinia';
import { ref } from 'vue';

interface Song {
    name: string;
    url: string;
}

export const usePlayerStore = defineStore('player', () => {
 
    const currentSong = ref<Song>({
        name: 'Sample Song',
        url: "http://m701.music.126.net/20240724180317/3aa1e26745f57c2ee3ea786c903bcac8/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/44501262716/a566/4fac/20e4/ecfd871c2271273129b170925396e237.mp3"
    });
 
    return {
        currentSong,
    };
});
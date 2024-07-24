interface Song {
    name: string;
    url: string;
}
import { fetch } from "@tauri-apps/api/http";
export const usePlayerStore = defineStore('player', () => {
 
    const currentSong = ref<Song>({
        name: 'Sample Song',
        url: "http://m801.music.126.net/20240724204030/92c291f506cdee5ae8a82a50033e3331/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/44501262716/a566/4fac/20e4/ecfd871c2271273129b170925396e237.mp3"
    });

    // here we use tauri's fetch API to fetch the current song, download it replace the url to the local file path
    // and then play it
    const fetchCurrentSong = async () => {
        const response = await fetch(currentSong.value.url) as any;
        const blob = await response.blob();
        const file = new File([blob], currentSong.value.name, { type: blob.type });
        const localUrl = URL.createObjectURL(file);
        currentSong.value.url = localUrl;
    }
 
    return {
        currentSong,
        fetchCurrentSong
    };
});
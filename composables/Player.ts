import { ref, onMounted, onUnmounted } from 'vue';

export function usePlayer() {
    const audio = ref<HTMLAudioElement | null>(null);
    const currentSong = ref({
        name: 'Sample Song',
        url: "http://m701.music.126.net/20240724164802/c2841f1d5f96764c89247e98e4725e24/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/44501262716/a566/4fac/20e4/ecfd871c2271273129b170925396e237.mp3"
    });

    const play = () => {
        if (audio.value) {
            audio.value.play();
        }
    };

    const pause = () => {
        if (audio.value) {
            audio.value.pause();
        }
    };

    const stop = () => {
        if (audio.value) {
            audio.value.pause();
            audio.value.currentTime = 0;
        }
    };



    return {
        audio,
        currentSong,
        play,
        pause,
        stop,
    };
}
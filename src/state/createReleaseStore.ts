import { create } from "zustand";


const singleRelease1 = {
    email: "",
    release_type: "",
    song_title: "",
    artist_name: "",
    explicitLyrics: "",
    language: "",
    primary_genre: "",
    secondary_genre: "",
    releaseDate: "",
    listenerTimezone: true,
    generalTimezone: true,
    release_time: "",
    soldWorldwide: "",
    label_name: "",
    recording_location: "",
    upc_ean: "",
};


const singleRelease2 = {
    email: '',
    release_type: '',
    store: '',
    social_platform: "",

    mp3_file: '',
    song_writer: [],

    songArtistsCreativeRole: [],

    copyright_ownership: '',
    copyright_ownership_permissions: '',

    isrc_number: '',
    language_lyrics: '',
    lyrics: '',
    tikTokClipStartTime: '',
    cover_photo: ''
}


type _typeInterface_ = {
    singleRelease1: typeof singleRelease1;
    singleRelease2: typeof singleRelease2;

    _setSingleRelease1: (release: typeof singleRelease1) => void;
    _setSingleRelease2: (release: typeof singleRelease2) => void;

    // updatePlayerAsync: () => Promise<void>;
};
  


export const createReleaseStore = create<_typeInterface_>((set) => ({
    singleRelease1: singleRelease1,
    singleRelease2: singleRelease2,
  
    _setSingleRelease1: (release) => {
        // setLocalStorage("user", user);

        set((_state) => {
            return {
                singleRelease1: release,
            };
        });
    },
  
    _setSingleRelease2: (release) => {
        // setLocalStorage("user", user);

        set((_state) => {
            return {
                singleRelease2: release,
            };
        });
    },
}));
  
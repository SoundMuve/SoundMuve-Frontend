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
    listenerTimeZone: true,
    generalTimeZone: true,
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

const albumReleaseDetails = {
    email: '',
    release_type: '',
    song_title: '',
    artist_name: '',
    explicitLyrics: '',
    language: '',
    primary_genre: '',
    secondary_genre: '',
    releaseDate: '',
    release_time: '',
    listenerTimeZone: true,
    generalTimeZone: true
}

const albumReleaseAdvanceFeatures = {
    email: '',
    release_type: '',
    label_name: '',
    recording_location: '',
    soldWorldwide: '',
    upc_ean: '',
}

const albumReleaseStores = {
    email: '',
    release_type: '',
    stores: '',
    socialPlatforms: '',
}


interface creativeType {
    creativeName: string,
    creativeRole: string,
}
const albumReleaseSongUpload = {
    email: '',
    mp3_file: <any> '',
    songAudioPreview: <any> '',
    song_title: '',
    song_writer: <string[]> [],
    songArtistsCreativeRole: <creativeType[]> [],
    copyright_ownership: '',
    copyright_ownership_permissions: '',
    isrc_number: '',
    language_lyrics: '',
    lyrics: '',
    tikTokClipStartTime: '',
}

type _typeInterface_ = {
    singleRelease1: typeof singleRelease1;
    singleRelease2: typeof singleRelease2;

    albumReleaseDetails: typeof albumReleaseDetails;
    albumReleaseAdvanceFeatures: typeof albumReleaseAdvanceFeatures;
    albumReleaseStores: typeof albumReleaseStores;
    albumReleaseSongUpload: typeof albumReleaseSongUpload[];

    _setAlbumReleaseDetails : (details: typeof albumReleaseDetails) => void;
    _setAlbumReleaseAdvanceFeatures: (details: typeof albumReleaseAdvanceFeatures) => void;
    _setAlbumReleaseStores: (details: typeof albumReleaseStores) => void;
    _setAlbumReleaseSongUpload: (details: typeof albumReleaseSongUpload) => void;
    _removeAlbumReleaseSongUpload: (index: number) => void;

    _setSingleRelease1: (release: typeof singleRelease1) => void;
    _setSingleRelease2: (release: typeof singleRelease2) => void;

    _setCreateAlbum_details: (release: typeof singleRelease2) => void;

    // updatePlayerAsync: () => Promise<void>;
};
  


export const createReleaseStore = create<_typeInterface_>((set) => ({
    singleRelease1: singleRelease1,
    singleRelease2: singleRelease2,

    albumReleaseDetails,
    albumReleaseAdvanceFeatures,
    albumReleaseStores,
    albumReleaseSongUpload: [],
  
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
  
    _setCreateAlbum_details: (release) => {
        // setLocalStorage("user", user);

        set((_state) => {
            return {
                singleRelease2: release,
            };
        });
    },
  
    _setAlbumReleaseDetails: (details) => {
        set((_state) => {
            return {
                albumReleaseDetails: details,
            };
        });
    },
  
    _setAlbumReleaseAdvanceFeatures: (details) => {
        set((_state) => {
            return {
                albumReleaseAdvanceFeatures: details,
            };
        });
    },
  
    _setAlbumReleaseStores: (details) => {
        set((_state) => {
            return {
                albumReleaseStores: details,
            };
        });
    },
  
    _setAlbumReleaseSongUpload: (details) => {
        set((state) => {
            return {
                albumReleaseSongUpload: [ ...state.albumReleaseSongUpload, details ],
            };
        });
    },
  
    _removeAlbumReleaseSongUpload: (index) => {
        set((state) => {
            // const remainingFruits = state.albumReleaseSongUpload.filter((_, i) => i !== index).concat([]);

            const result = state.albumReleaseSongUpload.filter((_, i) => i !== index);

            return {
                albumReleaseSongUpload: result,
            };
        });
    },



}));
  
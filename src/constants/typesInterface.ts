export type userInterface = {
    _id: string;
    ArtistName?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    balance: number;
    country?: string;
    gender?: string;
    phoneNumber?: string;
    recordLabelName?: string;
    logoUrl?: string;
    teamType: string;
    created_at: string;
}


export type flutterwavePaymentDetailsInterface = {
    bank: string;
    accountNumber: string;
    accountName: string;
    currency: string;
    verificationNumber: string;
    countryCode: string;
}


export type albumInterface = {
    _id: string,
    email: string,
    album_title: string,
    artist_name: string,
    language: string,
    primary_genre: string,
    secondary_genre: string,
    release_date: string,
    release_time: string,
    listenerTimeZone: string,
    otherTimeZone: string,
    label_name: string,
    soldWorldwide: string,
    recording_location: string,
    upc_ean: string,
    store: string,
    social_platform: string,
    status: string,
    song_cover_url: any,
    created_at: string,
    songs: songsInterface[]
}


export type songsInterface = {
    song_mp3: string,
    song_title: string,
    song_writer: string[],
    creatives: creativesInterface[],
    copyright_ownership: string,
    isrc_number: string,
    language_of_lyrics: string,
    lyrics: string,
    ticktokClipStartTime: string
}

export type creativesInterface = {
    creative_name: string,
    creative_role: string
}


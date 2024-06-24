import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
// import axios from 'axios';
import WaveSurfer from 'wavesurfer.js'

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';

import AccountWrapper from '@/components/AccountWrapper';
import { useSettingStore } from '@/state/settingStore';
import { useUserStore } from '@/state/userStore';

import cloudUploadIconImg from "@/assets/images/cloudUploadIcon.png";
import axios from 'axios';
import { apiEndpoint } from '@/util/resources';
import { languages } from '@/util/languages';


const formSchema = yup.object({
    artistCreativeName: yup.string().trim().label("Artist/Creative Name"),
    songArtistsCreativeRole: yup.string().trim().label("Artist/Creative Role"),
    ISRC_Number: yup.string().trim().label("ISRC Number"),
    songWriter: yup.string().trim().label("Song Writer"),
    store: yup.string().trim().label("Store"),
    socialPlatform: yup.string().trim().label("Social Platform"),

    copyrightOwnership: yup.string().trim().label("Copyright Ownership"),
    copyrightOwnershipPermission: yup.string().trim().label("Copyright Ownership Permission"),

    songLyrics: yup.string().trim(),
    lyricsLanguage: yup.string().trim().label("Lyrics Language"),
    tikTokClipStartTime_Minutes: yup.string().trim().label("TikTok Clip Start Time"),
    tikTokClipStartTime_Seconds: yup.string().trim().label("TikTok Clip Start Time"),
});


const minutes = [...Array(60).keys()].map((num) => num.toString().padStart(2, '0'));
const seconds = [...Array(60).keys()].map((num) => num.toString().padStart(2, '0'));

const songArtistsCreativesRoles = [
    "Main artist", 'Featured', 'Producer',' 12 string guitar', 'acoustic guitar', 'actor', 'alto saxophone', 'alto solo', 'arranger', 
    'background vocals', 'banjo', 'baritone saxophone', 'baritone solo', 'bass clarinet', 'bass guitar', 'bass trombone', 
    'bassoon', 'bongos', 'cajon', 'cello', 'chair', 'choir master', 'chorus', 'clarinet', 'classical guitar', 'clavier', 
    'composer', 'conductor', 'congas', 'cornet', 'piano', 'vocal engineer', 'vocal solo', 'mixing engineer',  'music director', 
    'lead guitar'
];

const socialPlatformStores = [
    "All", "TikTok", "Instagram", "Youtube", "Facebook"
];

const musicStores = [
    "All", "Apple Music", "Spotify", "SoundCloud", "AudioMack",
];

interface creativeType {
    creativeName: string,
    creativeRole: string,
}

let wavesurferInstance: WaveSurfer;

function CreateSingleRelease2() {
    const navigate = useNavigate();
    const darkTheme = useSettingStore((state) => state.darkTheme);
    const userData = useUserStore((state) => state.userData);
    const accessToken = useUserStore((state) => state.accessToken);
    const _setToastNotification = useSettingStore((state) => state._setToastNotification);
    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });
    const waveformRef = useRef();
    
    const [copyrightOwnership, setCopyrightOwnership] = useState('');
    const [copyrightOwnershipPermission, setCopyrightOwnershipPermission] = useState('');
    const [songWriters, setSongWriters] = useState<string[]>([]);
    const [songArtists_Creatives, setSongArtists_Creatives] = useState<creativeType[]>([]);
    const [image, setImage] = useState();
    const [imagePreview, setImagePreview] = useState();
    const [songAudio, setSongAudio] = useState();
    const [songAudioPreview, setSongAudioPreview] = useState<any>();
    const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

    useEffect(() => {
        if(waveformRef.current && songAudioPreview) {
            wavesurferInstance = WaveSurfer.create({
                container: waveformRef.current,
                waveColor: '#666666',
                progressColor: '#644986',
                normalize: true,
                cursorColor: "#fff",
                url: `${songAudioPreview}`,
                height: 80,
                barWidth: 10,
                // barGap: 5
            });
        }

        return () => {
            if(songAudioPreview) {
                wavesurferInstance.destroy();
            }
        }
    }, [songAudioPreview]);


    const { 
        handleSubmit, register, getValues, setError, setValue, resetField, formState: { errors, isValid, isSubmitting } 
    } = useForm({ 
        resolver: yupResolver(formSchema),
        mode: 'onBlur', reValidateMode: 'onChange', 
        defaultValues: { 
            store: "All",
            socialPlatform: "All",
            lyricsLanguage: "English",
            tikTokClipStartTime_Minutes: "00",
            tikTokClipStartTime_Seconds: "00",
        } 
    });

            
        
    const handleAudioFileUpload = async (e: any) => {
        const file = e.target.files[0]; 
        setSongAudio(file);

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            setSongAudioPreview(fileReader.result);
        }
        
        e.target.value = "";
    }
        
    const handleFileUpload = async (e: any) => {
        const file = e.target.files[0]; 
        setImage(file);

        const base64: any = await convertToBase64(file);
        setImagePreview(base64);
    
        e.target.value = "";
    }

    const convertToBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            if (!file) {
                // setToastNotification({
                //     display: true,
                //     message: "Please select an image!",
                //     status: "info"
                // })
            } else {
                fileReader.readAsDataURL(file);
                fileReader.onload = () => {
                    resolve(fileReader.result);
                }
            }

            fileReader.onerror = (error) => {
                reject(error);
            }
        });
    }

    const onSubmit = async (formData: typeof formSchema.__outputType) => {
        console.log(formData);

        setApiResponse({
            display: false,
            status: true,
            message: ""
        });


        if (formData.songWriter) {
            const newWritter = [ ...songWriters, formData.songWriter ];
            setSongWriters(newWritter);
            resetField("songWriter");
        }

        if (formData.artistCreativeName) {
            const newData = {
                creativeName: formData.artistCreativeName,
                creativeRole: formData.songArtistsCreativeRole || '',
            };

            const newCreatives = [ ...songArtists_Creatives, newData ];
            setSongArtists_Creatives(newCreatives);
            resetField("artistCreativeName");
            resetField("songArtistsCreativeRole");
        }

        if (!copyrightOwnership) {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Copyright Ownership::: Select if this song is a cover version of another song?"
            })

            setError("copyrightOwnership", {message: "Select if this song is a cover version of another song?"})
            return;
        }

        if (copyrightOwnership == "Yes" && !copyrightOwnershipPermission) {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Copyright Ownership Permission::: Select if this song is a cover version of another song?"
            })

            setError("copyrightOwnershipPermission", {message: "Please confirm if you've the permission to distribute a cover song"});
            return;
        }


        if (!songAudio) {
            setApiResponse({
                display: true,
                status: false,
                message: "Please upload the song."
            });

            _setToastNotification({
                display: true,
                status: "error",
                message: "Please upload the song."
            })

            return;
        }


        if (!image) {
            setApiResponse({
                display: true,
                status: false,
                message: "Please upload song cover."
            });

            _setToastNotification({
                display: true,
                status: "error",
                message: "Please upload song cover."
            })

            return;
        }


        // const data2bg = {
        //     email: userData.email,
        //     release_type: 'Single',
        //     store: 'All',
        //     social_platform: "All",

        //     mp3_file: songAudio,
        //     song_writer: songWriters,
        
        //     songArtistsCreativeRole: songArtists_Creatives,
        
        //     copyright_ownership: copyrightOwnership,
        //     copyright_ownership_permissions: copyrightOwnershipPermission,
        
        //     isrc_number: formData.ISRC_Number,
        //     language_lyrics: formData.lyricsLanguage,
        //     lyrics: formData.songLyrics,
        //     tikTokClipStartTime: `${ formData.tikTokClipStartTime_Minutes }:${ formData.tikTokClipStartTime_Seconds }`,
        //     cover_photo: image
        // }



        const data2db = new FormData();
        data2db.append('email', userData.email);
        data2db.append('release_type', "Single");
        data2db.append('store', 'All');
        data2db.append('social_platform', 'All');
        data2db.append('song', '');
        data2db.append('mp3_file', songAudio);
        data2db.append('song_writer', songWriters.toString());
        data2db.append('songArtistsCreativeRole', songArtists_Creatives.toString());
        data2db.append('copyright_ownership', copyrightOwnership);
        data2db.append('copyright_ownership_permissions', copyrightOwnershipPermission);
        data2db.append('isrc_number', formData.ISRC_Number || '');
        data2db.append('language_lyrics', formData.lyricsLanguage || '');
        data2db.append('lyrics', formData.songLyrics || '');
        data2db.append('tikTokClipStartTime', `${ formData.tikTokClipStartTime_Minutes }:${ formData.tikTokClipStartTime_Seconds }`);
        data2db.append('cover_photo', image);

        console.log(data2db);

        try {
            const response = (await axios.patch(
                `${apiEndpoint}/Release/update-release`,
                data2db,  
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${accessToken}`
                    },
                }
            )).data;
            console.log(response);

            
            setApiResponse({
                display: true,
                status: true,
                message: response.message
            });
            _setToastNotification({
                display: true,
                status: "success",
                message: response.message
            });

            // navigate("/auth/login", {replace: true});
        } catch (error: any) {
            const err = error.response.data;
            console.log(err);

            setApiResponse({
                display: true,
                status: false,
                message: err.message || "Oooops, failed to update details. please try again."
            });
        }

    }

    return (
        <AccountWrapper>
            <Box sx={{px: {xs: 2, md: 5, lg: 12}, pb: 5, position: "relative", zIndex: 10, mt: {xs: 5, md: 10} }}>
                <Box>
                    <IconButton 
                        onClick={() => navigate(-1)}
                        sx={{
                            color: darkTheme ? "#fff" : "#000", 
                            mb: 2,
                            display: {xs: "none", md: "block"}
                        }}
                    >
                        <ChevronLeftIcon />
                    </IconButton>

                    <Typography 
                        sx={{
                            fontWeight: "900",
                            fontSize: {xs: "24.74px", md: "60px"},
                            lineHeight: {xs: "26.31px", md: "63.8px"},
                            letterSpacing: {xs: "-0.55px", md: "-1.34px"},
                        }}
                    >
                        Create a Single
                    </Typography>
                </Box>

                <form noValidate onSubmit={ handleSubmit(onSubmit) } >   
                    <Stack sx={{mt: "35px", color: darkTheme ? "inherit" : "#fff"}} spacing={"35px"} alignItems={"center"}>
                        <Box
                            sx={{
                                maxWidth: {xs: "330px", md: "892px"},
                                border: {xs: "0.45px solid #FFFFFF", md: "1px solid #FFFFFF"},
                                borderRadius: {xs: "5.42px", md: "12px"},
                                overflow: "hidden",
                                width: "100%"
                            }}
                        >
                            <Box
                                sx={{
                                    height: {xs: "32.53px", md: "72px"},
                                    bgcolor: "#272727",
                                    borderBottom: {xs: "0.45px solid #FFFFFF", md: "1px solid #FFFFFF"},
                                    px: {xs: "10px", md: "25px"},
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: "20px",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: {xs: "15px", md: "20px"},
                                        lineHeight: {xs: "20px", md: "40px"},
                                        letterSpacing: {xs: "-0.06px", md: "-0.13px"}
                                    }}
                                >Details</Typography>

                                <Typography
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: {xs: "15px", md: "20px"},
                                        lineHeight: {xs: "20px", md: "40px"},
                                        letterSpacing: {xs: "-0.06px", md: "-0.13px"}
                                    }}
                                >Edit</Typography>
                            </Box>

                            <Box
                                sx={{
                                    p: {xs: "10px", md: "25px"},
                                    bgcolor: darkTheme ? "#000" : "#797979",
                                    mt: {xs: "15px", md: "0px"}
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: '900',
                                        fontSize: {xs: "15px", md: "33px"},
                                        lineHeight: {xs: "10.84px", md: "24px"},
                                        letterSpacing: {xs: "-0.61px", md: "-1.34px"},
                                    }}
                                >Good God: Joseph solomon</Typography>

                                <Box sx={{ mt: {xs: "15px", md: "30px"} }}>
                                    <Stack direction="row" spacing={"auto"} justifyContent="space-between" alignItems="center">
                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "13px", md: "15px"},
                                                lineHeight: {xs: "25px", md: "40px"},
                                                letterSpacing: "-0.13px"
                                            }}
                                        >Release date</Typography>

                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "13px", md: "15px"},
                                                lineHeight: {xs: "25px", md: "40px"},
                                                letterSpacing: "-0.13px"
                                            }}
                                        >20-May-2024</Typography>
                                    </Stack>
                                    
                                    <Stack direction="row" spacing={"auto"} justifyContent="space-between" alignItems="center">
                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "13px", md: "15px"},
                                                lineHeight: {xs: "25px", md: "40px"},
                                                letterSpacing: "-0.13px"
                                            }}
                                        >Label</Typography>

                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "13px", md: "15px"},
                                                lineHeight: {xs: "25px", md: "40px"},
                                                letterSpacing: "-0.13px"
                                            }}
                                        >Joseph solomon</Typography>
                                    </Stack>

                                    <Stack direction="row" spacing={"auto"} justifyContent="space-between" alignItems="center">
                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "13px", md: "15px"},
                                                lineHeight: {xs: "25px", md: "40px"},
                                                letterSpacing: "-0.13px"
                                            }}
                                        >ISRC</Typography>

                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "13px", md: "15px"},
                                                lineHeight: {xs: "25px", md: "40px"},
                                                letterSpacing: "-0.13px"
                                            }}
                                        >TCAIH2403832</Typography>
                                    </Stack>

                                    <Stack direction="row" spacing={"auto"} justifyContent="space-between" alignItems="center">
                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "13px", md: "15px"},
                                                lineHeight: {xs: "25px", md: "40px"},
                                                letterSpacing: "-0.13px"
                                            }}
                                        >UPC</Typography>

                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "13px", md: "15px"},
                                                lineHeight: {xs: "25px", md: "40px"},
                                                letterSpacing: "-0.13px"
                                            }}
                                        >859788645275</Typography>
                                    </Stack>

                                    <Stack direction="row" spacing={"auto"} justifyContent="space-between" alignItems="center">
                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "13px", md: "15px"},
                                                lineHeight: {xs: "25px", md: "40px"},
                                                letterSpacing: "-0.13px"
                                            }}
                                        >Primary Genre</Typography>

                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "13px", md: "15px"},
                                                lineHeight: {xs: "25px", md: "40px"},
                                                letterSpacing: "-0.13px"
                                            }}
                                        >Alternative</Typography>
                                    </Stack>

                                    <Stack direction="row" spacing={"auto"} justifyContent="space-between" alignItems="center">
                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "13px", md: "15px"},
                                                lineHeight: {xs: "25px", md: "40px"},
                                                letterSpacing: "-0.13px"
                                            }}
                                        >Secondary Genre</Typography>

                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "13px", md: "15px"},
                                                lineHeight: {xs: "25px", md: "40px"},
                                                letterSpacing: "-0.13px"
                                            }}
                                        >Alternative</Typography>
                                    </Stack>

                                    <Stack direction="row" spacing={"auto"} justifyContent="space-between" alignItems="center">
                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "13px", md: "15px"},
                                                lineHeight: {xs: "25px", md: "40px"},
                                                letterSpacing: "-0.13px"
                                            }}
                                        >Language</Typography>

                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "13px", md: "15px"},
                                                lineHeight: {xs: "25px", md: "40px"},
                                                letterSpacing: "-0.13px"
                                            }}
                                        >English</Typography>
                                    </Stack>
                                </Box>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                maxWidth: {xs: "330px", md: "892px"},
                                border: {xs: "0.45px solid #FFFFFF", md: "1px solid #FFFFFF"},
                                borderRadius: {xs: "5.42px", md: "12px"},
                                overflow: "hidden",
                                width: "100%"
                            }}
                        >
                            <Box
                                sx={{
                                    height: {xs: "32.53px", md: "72px"},
                                    bgcolor: "#272727",
                                    borderBottom: {xs: "0.45px solid #FFFFFF", md: "1px solid #FFFFFF"},
                                    px: {xs: "10px", md: "25px"},
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: "20px",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: {xs: "15px", md: "20px"},
                                        lineHeight: {xs: "20px", md: "40px"},
                                        letterSpacing: {xs: "-0.06px", md: "-0.13px"}
                                    }}
                                >Select Store</Typography>
                                
                                <Box></Box>
                            </Box>

                            <Box
                                sx={{
                                    p: {xs: "10px", md: "25px"},
                                    bgcolor: darkTheme ? "#000" : "#797979",

                                    display: "flex",
                                    justifyItems: "center",
                                    alignItems: "center"
                                }}
                            >
                                <FormControl fullWidth sx={{ mx: "auto", my: {xs: "20px", md: "50px"}, maxWidth: {xs: "200px", md: "391px"} }}>
                                    <Select
                                        labelId="Store"
                                        id="Store-select"
                                        label=""
                                        defaultValue="Select"
                                        placeholder='Select'

                                        sx={{
                                            color: darkTheme ? "#000" : "#000",
                                            borderRadius: {xs: "7.19px", md: "16px"},
                                            bgcolor: darkTheme ? "#fff" : "#fff",
                                            
                                            '.MuiOutlinedInput-notchedOutline': {
                                                borderColor: darkTheme ? '#fff' : "#fff",
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: darkTheme ? '#fff' : "#fff",
                                            },
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: darkTheme ? '#fff' : "#fff",
                                            },
                                            '.MuiSvgIcon-root ': {
                                                // fill: "#797979 !important",
                                                fill: darkTheme ? "#797979" : "#797979",
                                            }
                                        }}
                                        
                                        error={ errors.store ? true : false }
                                        { ...register('store') }
                                    >
                                        <MenuItem value="Select" disabled selected>
                                            Select
                                        </MenuItem>

                                        { musicStores.map((item: any, index) => (
                                            <MenuItem key={index} value={item}>
                                                {item}
                                            </MenuItem>
                                        )) }
                                    </Select>
                                </FormControl>

                                { errors.store && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.store?.message }</Box> }
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                maxWidth: {xs: "330px", md: "892px"},
                                border: {xs: "0.45px solid #FFFFFF", md: "1px solid #FFFFFF"},
                                borderRadius: {xs: "5.42px", md: "12px"},
                                overflow: "hidden"
                            }}
                        >
                            <Box
                                sx={{
                                    height: {xs: "32.53px", md: "72px"},
                                    bgcolor: "#272727",
                                    borderBottom: {xs: "0.45px solid #FFFFFF", md: "1px solid #FFFFFF"},
                                    px: {xs: "10px", md: "25px"},
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: {xs: "10px", md: "20px"},
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: {xs: "14px", md: "20px"},
                                        lineHeight: {xs: "20px", md: "40px"},
                                        letterSpacing: {xs: "-0.06px", md: "-0.13px"}
                                    }}
                                >Social Platforms - Automatically Selected</Typography>

                                <Box></Box>
                            </Box>

                            <Box
                                sx={{
                                    p: {xs: "10px", md: "25px"},
                                    bgcolor: darkTheme ? "#000" : "#797979",

                                    display: "flex",
                                    flexDirection: "column",
                                    justifyItems: "center",
                                    alignItems: "center"
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: {xs: "15px", md: "20px"},
                                        lineHeight: {xs: "25px", md: "40px"},
                                        letterSpacing: "-0.13px"
                                    }}
                                >
                                    You keep 80% of social platform revenue. Please review monetization eligibility requirements for. &#32;
                                    <span style={{textDecoration: "underline"}}>YouTube Content ID </span> &#32; and &#32;
                                    <span style={{textDecoration: "underline"}}>Facebook/Instagram/Reels.</span> &#32;
                                    Delivering ineligible content can result in account suspension. 
                                    <b> Click 'Edit' to remove a social platform. </b>
                                </Typography>

                                <FormControl fullWidth sx={{ mx: "auto", my: {xs: "15px", md: "30px"}, maxWidth: "391px" }}>
                                    <Select
                                        labelId="socialPlatform"
                                        id="socialPlatform-select"
                                        label=""
                                        defaultValue="Select"
                                        placeholder='Select'

                                        sx={{
                                            color: darkTheme ? "#000" : "#000",
                                            borderRadius: "16px",
                                            bgcolor: darkTheme ? "#fff" : "#fff",
                                            
                                            '.MuiOutlinedInput-notchedOutline': {
                                                borderColor: darkTheme ? '#fff' : "#fff",
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: darkTheme ? '#fff' : "#fff",
                                            },
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: darkTheme ? '#fff' : "#fff",
                                            },
                                            '.MuiSvgIcon-root ': {
                                                // fill: "#797979 !important",
                                                fill: darkTheme ? "#797979" : "#797979",
                                            }
                                        }}
                                        
                                        error={ errors.socialPlatform ? true : false }
                                        { ...register('socialPlatform') }
                                    >
                                        <MenuItem value="Select" disabled selected>
                                            Select
                                        </MenuItem>

                                        { socialPlatformStores.map((langItem: any, index) => (
                                            <MenuItem key={index} value={langItem}>
                                                {langItem}
                                            </MenuItem>
                                        )) }
                                    </Select>
                                </FormControl>

                                { errors.socialPlatform && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.socialPlatform?.message }</Box> }
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                maxWidth: {xs: "330px", md: "892px"},
                                border: {xs: "0.45px solid #FFFFFF", md: "1px solid #FFFFFF"},
                                borderRadius: {xs: "5.42px", md: "12px"},
                                overflow: "hidden"
                            }}
                        >
                            <Box
                                sx={{
                                    height: {xs: "32.53px", md: "72px"},
                                    bgcolor: "#272727",
                                    borderBottom: {xs: "0.45px solid #FFFFFF", md: "1px solid #FFFFFF"},
                                    px: {xs: "10px", md: "25px"},
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: "20px",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: {xs: "15px", md: "20px"},
                                        lineHeight: {xs: "20px", md: "40px"},
                                        letterSpacing: {xs: "-0.06px", md: "-0.13px"}
                                    }}
                                >Song</Typography>

                                <Box></Box>
                            </Box>

                            <Box
                                sx={{
                                    p: {xs: "10px", md: "25px"},
                                    bgcolor: darkTheme ? "#000" : "#797979",

                                    display: "flex",
                                    flexDirection: "column",
                                    justifyItems: "center",
                                    alignItems: "center"
                                }}
                            >

                                <Typography
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: {xs: "15px", md: "20px"},
                                        lineHeight: {xs: "25px", md: "40px"},
                                        letterSpacing: "-0.13px"
                                    }}
                                >
                                    Before you upload your song, please make sure that files are in an accepted format.
                                    Stereo wav files in 24 bit (sample size) with 192 kHz (sample rate) are recommended, 
                                    but 16 bit (sample size) with 44.1 kHz (sample rate) files are also accepted.
                                </Typography>


                                <Stack direction="row" justifyContent="space-between" alignItems="center"
                                    sx={{
                                        p: {xs: "", md: "10px 25px"},
                                        borderRadius: '16px',
                                        width: "459px",
                                        bgcolor: "#fff",
                                        color: "#000",
                                        my: 3,
                                        cursor: "pointer"
                                    }}

                                    onClick={() => {
                                        document.getElementById("songAudioUpload")?.click();
                                    }}

                                >
                                    <Typography
                                        sx={{
                                            fontWeight: "900",
                                            fontSize: "23px",
                                            lineHeight: "24px",
                                            letterSpacing: "-1.34px"
                                        }}
                                    >Upload Music</Typography>

                                    <CloudUploadOutlinedIcon sx={{pr: "14px", fontSize: "40px"}} />
                                </Stack>

                                {
                                    songAudioPreview && (
                                        <Box
                                            sx={{
                                                height: "185px",
                                                borderRadius: "11px",
                                                bgcolor: "#272727",
                                                width: "100%",
                                                my: 3
                                            }}
                                        >
                                            <Stack 
                                                direction="row" alignItems="center" justifyContent="space-between"
                                                p="15px" bgcolor="#666666" borderRadius="11px"
                                            >
                                                <Typography
                                                    sx={{
                                                        fontWeight: "900",
                                                        fontSize: "24px",
                                                        lineHeight: "40px",
                                                        letterSpacing: "-0.13px"
                                                    }}
                                                >Audio</Typography>

                                                <DeleteForeverOutlinedIcon sx={{ color: "#313131", ":hover": { color: "#de2341" } }}
                                                    onClick={() => {
                                                        setSongAudio(undefined);
                                                        setSongAudioPreview(undefined);
                                                        wavesurferInstance.destroy();
                                                    }} 
                                                />
                                            </Stack>


                                            <Stack 
                                                direction="row" alignItems="center" justifyContent="space-between" 
                                                spacing="15px" p="15px" 
                                            >
                                                <Box height="90px" width="100%" overflow="hidden">
                                                    <Box ref={waveformRef}></Box>
                                                </Box>

                                                <Box px={4}>
                                                    {
                                                        isAudioPlaying ? (
                                                            <StopCircleOutlinedIcon sx={{ color: "#fff", fontSize: "40px" }}  
                                                                onClick={() => {wavesurferInstance.stop(); setIsAudioPlaying(false) }}
                                                            />
                                                        ) : (
                                                            <PlayArrowIcon sx={{ color: "#fff", fontSize: "40px" }}  
                                                                onClick={() => {wavesurferInstance.play(); setIsAudioPlaying(true); }}
                                                            />
                                                        )
                                                    }
                                                </Box>

                                            </Stack>

                                        </Box>
                                    )
                                }

                                <Stack spacing={{xs: "20px", md: "35px"}} sx={{width: "100%"}}>
                                    <Box
                                        sx={{
                                            bgcolor: "#272727",
                                            p: {xs: "10px", md: "25px"},
                                            borderRadius: "12px"
                                        }}
                                    >
                                        <Typography component={"h3"} variant='h3'
                                            sx={{
                                                fontWeight: "900",
                                                fontSize: {xs: "15px", md: "20px"},
                                                lineHeight: {xs: "25px", md: "40px"},
                                                letterSpacing: "-0.13px",
                                                mb: 1
                                            }}
                                        >Song Writer</Typography>

                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "15px", md: "20px"},
                                                lineHeight: {xs: "25px", md: "40px"},
                                                letterSpacing: "-0.13px"
                                            }}
                                        >
                                            At least one songwriter is required for this song. 
                                            A songwriter is the person or persons who wrote the lyrics and/or music. 
                                            Each songwriter should be credited. One songwriter per line. 
                                            LEGAL NAMES are required in order to be paid the applicable royalties for publishing.
                                        </Typography>


                                        <Box 
                                            sx={{
                                                mt: {xs: 2, m: 3},
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                gap: "10px",
                                                flexWrap: "wrap"
                                            }}
                                        >
                                            {
                                                songWriters.map((writerName, i) => (
                                                    <Stack key={i} direction="row" alignItems="center" spacing="5px"
                                                        sx={{
                                                            p: "10px",
                                                            bgcolor: "#644986",
                                                            width: "fit-content",
                                                            borderRadius: "10px"
                                                        }}
                                                    >
                                                        <CancelIcon 
                                                            sx={{ 
                                                                color: "#fff",
                                                                ":hover": { color: "#de2341" },
                                                                fontSize: {xs: "15px", md: "18px"}
                                                            }} 
                                                            onClick={() => {
                                                                const newWritter = songWriters.filter(item => item != writerName);
                                                                setSongWriters(newWritter);
                                                                document.getElementById("songWriter")?.focus();
                                                            }}
                                                        />

                                                        <Typography
                                                            sx={{
                                                                fontWeight: "400",
                                                                fontSize: {xs: "13px", md: "15px"},
                                                            }}
                                                        > { writerName } </Typography>
                                                    </Stack>
                                                ))
                                            }

                                        </Box>

                                        <Box sx={{my: "20px"}}>
                                            <TextField 
                                                variant="outlined" 
                                                fullWidth 
                                                id='songWriter'
                                                type='text'
                                                label=''
                                                inputMode='text'
                                                defaultValue=""
                                                placeholder='E.g Joseph Solomon'
                                                InputLabelProps={{
                                                    style: { color: '#c1c1c1', fontWeight: "400" },
                                                }}
                                                InputProps={{
                                                    sx: {
                                                        borderRadius: "16px",
                                                        color: darkTheme ? '#fff' : '#fff', // Change to your desired text color
                                                    },
                                                }}
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        '& fieldset.MuiOutlinedInput-notchedOutline': {
                                                            borderColor: darkTheme ? '#fff' : '#fff',
                                                        },
                                                        // '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        //     borderColor: darkTheme ? '#fff' : '#000',
                                                        // },
                                                        // "&.Mui-focused fieldset": {
                                                        //     borderColor: darkTheme ? '#fff' : '#000',
                                                        // },
                                                        // "& ::placeholder": {
                                                        //     color: "gray"
                                                        // },
                                                    },
                                                }}
                                                error={ errors.songWriter ? true : false }
                                                { ...register('songWriter') }
                                                onKeyUp={(e: any) => {
                                                    if ((e.which === 13 || e.keyCode === 13) && e.target.value) {
                                                        const newWritter = [ ...songWriters, e.target.value ];
                                                        setSongWriters(newWritter);
                                                        resetField("songWriter");
                                                        document.getElementById("songWriter")?.focus();
                                                    }
                                                }}
                                            />
                                        </Box>

                                        <Box 
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                gap: "5px",
                                                width: "fit-content",
                                                cursor: "pointer"
                                            }}
                                            onClick={() => {
                                                const writerName = getValues("songWriter");
                                                if (writerName) {
                                                    const newWritter = [ ...songWriters, writerName ];
                                                    setSongWriters(newWritter);
                                                    resetField("songWriter");
                                                    document.getElementById("songWriter")?.focus();
                                                }
                                            }}
                                        >
                                            <AddIcon />

                                            <Typography
                                                sx={{
                                                    fontWeight: "900",
                                                    fontSize: {xs: "15px", md: "20px"},
                                                    lineHeight: {xs: "25px", md: "40px"},
                                                    letterSpacing: "-0.13px"
                                                }}
                                            > Add more song writers </Typography>
                                        </Box>
                                    </Box>

                                    <Box
                                        sx={{
                                            bgcolor: "#272727",
                                            p: {xs: "10px", md: "25px"},
                                            borderRadius: "12px"
                                        }}
                                    >
                                        <Typography component={"h3"} variant='h3'
                                            sx={{
                                                fontWeight: "900",
                                                fontSize: {xs: "15px", md: "20px"},
                                                lineHeight: {xs: "25px", md: "40px"},
                                                letterSpacing: "-0.13px",
                                                mb: 1
                                            }}
                                        >Song Artists & Creatives</Typography>

                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "15px", md: "20px"},
                                                lineHeight: {xs: "25px", md: "40px"},
                                                letterSpacing: "-0.13px"
                                            }}
                                        >
                                            List all artists that appear on this song. You may select multiple roles for each artist. 
                                            You can select from our list of roles, such as Main Artist, Featured, Producer etc. 
                                        </Typography>

                                        <Box 
                                            sx={{
                                                mt: {xs: 2, m: 3},
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                gap: "10px",
                                                flexWrap: "wrap"
                                            }}
                                        >
                                            {
                                                songArtists_Creatives.map(( creative, i) => (
                                                    <Stack key={i} direction="row" alignItems="center" spacing="10px"
                                                        sx={{
                                                            p: "10px",
                                                            bgcolor: "#644986",
                                                            width: "fit-content",
                                                            borderRadius: "10px"
                                                        }}
                                                    >
                                                        <CancelIcon 
                                                            sx={{ 
                                                                color: "#fff",
                                                                ":hover": { color: "#de2341" },
                                                                fontSize: {xs: "15px", md: "18px"}
                                                            }} 
                                                            onClick={() => {
                                                                const newCreative = songArtists_Creatives.filter(item => item.creativeName != creative.creativeName );
                                                                setSongArtists_Creatives(newCreative);
                                                                document.getElementById("artistCreativeName")?.focus();
                                                            }}
                                                        />

                                                        <Box>
                                                            <Typography
                                                                sx={{
                                                                    fontWeight: "700",
                                                                    fontSize: {xs: "13px", md: "15px"},
                                                                }}
                                                            > { creative.creativeRole } </Typography>

                                                            <Typography
                                                                sx={{
                                                                    fontWeight: "400",
                                                                    fontSize: {xs: "13px", md: "15px"},
                                                                }}
                                                            > { creative.creativeName } </Typography>
                                                        </Box>
                                                    </Stack>
                                                ))
                                            }
                                        </Box>

                                        <Box sx={{my: "20px"}}>
                                            <Typography
                                                sx={{
                                                    fontWeight: "900",
                                                    fontSize: {xs: "15px", md: "20px"},
                                                    lineHeight: {xs: "25px", md: "40px"},
                                                    letterSpacing: "-0.13px",
                                                    mb: 0.5
                                                }}
                                            >Artist / Creative Name</Typography>

                                            <TextField 
                                                variant="outlined" 
                                                fullWidth 
                                                id='artistCreativeName'
                                                type='text'
                                                label=''
                                                inputMode='text'
                                                defaultValue=""
                                                placeholder='E.g Joseph Solomon'
                                                InputLabelProps={{
                                                    style: { color: '#c1c1c1', fontWeight: "400" },
                                                }}
                                                InputProps={{
                                                    sx: {
                                                        borderRadius: "16px",
                                                        color: darkTheme ? '#fff' : '#fff', // Change to your desired text color
                                                    },
                                                }}
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        '& fieldset.MuiOutlinedInput-notchedOutline': {
                                                            borderColor: darkTheme ? '#fff' : '#fff',
                                                        },
                                                        // '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        //     borderColor: darkTheme ? '#fff' : '#000',
                                                        // },
                                                        // "&.Mui-focused fieldset": {
                                                        //     borderColor: darkTheme ? '#fff' : '#000',
                                                        // },
                                                        // "& ::placeholder": {
                                                        //     color: "gray"
                                                        // },
                                                    },
                                                }}
                                                error={ errors.artistCreativeName ? true : false }
                                                { ...register('artistCreativeName') }
                                            />
                                        </Box>

                                        <Box sx={{my: "20px"}}>
                                            <Typography component={"h3"} variant='h3'
                                                sx={{
                                                    fontWeight: "900",
                                                    fontSize: {xs: "15px", md: "20px"},
                                                    lineHeight: {xs: "25px", md: "40px"},
                                                    letterSpacing: "-0.13px",
                                                    mb: 0.5
                                                }}
                                            >Role</Typography>

                                            <FormControl fullWidth sx={{ maxWidth: "391px" }}>
                                                <Select
                                                    labelId="songArtistsCreativeRole-label"
                                                    id="songArtistsCreativeRole"
                                                    label=""
                                                    defaultValue="Choose Roles"
                                                    placeholder='Choose Roles'

                                                    sx={{
                                                        color: darkTheme ? "#000" : "#000",
                                                        borderRadius: "16px",
                                                        bgcolor: darkTheme ? "#fff" : "#fff",
                                                        
                                                        '.MuiOutlinedInput-notchedOutline': {
                                                            borderColor: darkTheme ? '#fff' : "#fff",
                                                        },
                                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: darkTheme ? '#fff' : "#fff",
                                                        },
                                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: darkTheme ? '#fff' : "#fff",
                                                        },
                                                        '.MuiSvgIcon-root ': {
                                                            // fill: "#797979 !important",
                                                            fill: darkTheme ? "#797979" : "#797979",
                                                        }
                                                    }}
                                                    
                                                    error={ errors.songArtistsCreativeRole ? true : false }
                                                    { ...register('songArtistsCreativeRole') }
                                                >
                                                    <MenuItem value="Choose Roles" disabled selected>
                                                        Choose Roles
                                                    </MenuItem>

                                                    { songArtistsCreativesRoles.map((roleItem: any, index) => (
                                                        <MenuItem key={index} value={roleItem}>
                                                            {roleItem}
                                                        </MenuItem>
                                                    )) }
                                                </Select>
                                            </FormControl>
                                        </Box>

                                        <Box 
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                gap: "5px",
                                                width: "fit-content",
                                                cursor: "pointer"
                                            }}
                                            onClick={() => {
                                                const creativeName = getValues("artistCreativeName");
                                                const creativeRole = getValues("songArtistsCreativeRole");
                                                if (!creativeName) return;
                                                    
                                                if (!creativeRole || creativeRole == 'Choose Roles') {
                                                    _setToastNotification({
                                                        display: true,
                                                        status: "warning",
                                                        message: `Please select ${ creativeName } Role in creating this song.`
                                                    })
                                                    return;
                                                }

                                                const newCreatives = [ ...songArtists_Creatives, { creativeName, creativeRole } ];
                                                setSongArtists_Creatives(newCreatives);
                                                resetField("artistCreativeName");
                                                resetField("songArtistsCreativeRole");
                                                document.getElementById("artistCreativeName")?.focus();
                                            }}
                                        >
                                            <AddIcon />

                                            <Typography
                                                sx={{
                                                    fontWeight: "900",
                                                    fontSize: {xs: "15px", md: "20px"},
                                                    lineHeight: {xs: "25px", md: "40px"},
                                                    letterSpacing: "-0.13px"
                                                }}
                                            >
                                                Add more Creatives
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box
                                        sx={{
                                            bgcolor: "#272727",
                                            p: {xs: "10px", md: "25px"},
                                            borderRadius: "12px"
                                        }}
                                    >
                                        <Box>
                                            <Typography component={"h3"} variant='h3'
                                                sx={{
                                                    fontWeight: "900",
                                                    fontSize: {xs: "15px", md: "20px"},
                                                    lineHeight: {xs: "25px", md: "40px"},
                                                    letterSpacing: "-0.13px"
                                                }}
                                            >Copyright Ownership</Typography>

                                            <Typography
                                                sx={{
                                                    fontWeight: "400",
                                                    fontSize: {xs: "15px", md: "20px"},
                                                    lineHeight: {xs: "25px", md: "40px"},
                                                    letterSpacing: "-0.13px"
                                                }}
                                            >
                                                Is this a cover version of another song?
                                            </Typography>

                                            <Stack direction={'row'} spacing={"15px"} sx={{my: "15px"}}>
                                                <Box 
                                                    sx={{
                                                        p: {xs: "10.18px 19.68px 10.18px 19.68px", md: "15px 29px 15px 29px"},
                                                        borderRadius: {xs: "8.14px", md: "12px"},
                                                        background: copyrightOwnership == "Yes" ? "#644986" : "#fff",
                                                        color: copyrightOwnership == "Yes" ? "#fff" : "#000",
                                                        cursor: "pointer",
                                                        display: "inline-block"
                                                    }}
                                                    onClick={() => { 
                                                        setCopyrightOwnership("Yes"); 
                                                        setValue("copyrightOwnership", "Yes", {shouldValidate: true, shouldDirty: true, shouldTouch: true}) 
                                                    }}
                                                >
                                                    <Typography 
                                                        sx={{
                                                            fontWeight: '900',
                                                            fontSize: {xs: "10.18px", md: "15px"},
                                                            lineHeight: {xs: "8.82px", md: "13px"},
                                                            letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                                            textAlign: 'center',
                                                        }}
                                                    > Yes </Typography>
                                                </Box>

                                                <Box 
                                                    sx={{
                                                        p: {xs: "10.18px 19.68px 10.18px 19.68px", md: "15px 29px 15px 29px"},
                                                        borderRadius: {xs: "8.14px", md: "12px"},
                                                        background: copyrightOwnership == "No" ? "#644986" : "#fff",
                                                        color: copyrightOwnership == "No" ? "#fff" : "#000",
                                                        cursor: "pointer",
                                                        display: "inline-block"
                                                    }}
                                                    onClick={() => { 
                                                        setCopyrightOwnership("No"); 
                                                        setValue("copyrightOwnership", "No", {shouldValidate: true, shouldDirty: true, shouldTouch: true}) 

                                                    }}
                                                >
                                                    <Typography 
                                                        sx={{
                                                            fontWeight: '900',
                                                            fontSize: {xs: "10.18px", md: "15px"},
                                                            lineHeight: {xs: "8.82px", md: "13px"},
                                                            letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                                            textAlign: 'center',
                                                        }}
                                                    > No </Typography>
                                                </Box>
                                            </Stack>

                                            { errors.copyrightOwnership && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.copyrightOwnership?.message }</Box> }
                                        </Box>

                                        {
                                            copyrightOwnership == "Yes" && (
                                                <Box>
                                                    <Typography
                                                        sx={{
                                                            fontWeight: "400",
                                                            fontSize: {xs: "15px", md: "20px"},
                                                            lineHeight: {xs: "25px", md: "40px"},
                                                            letterSpacing: "-0.13px"
                                                        }}
                                                    >
                                                        In order to distribute a cover song, you may be required to obtain certain rights or permissions. 
                                                        Please confirm:
                                                    </Typography>

                                                    <Stack direction={'row'} spacing={"15px"} sx={{mt: "15px"}}>
                                                        <Box 
                                                            sx={{
                                                                p: {xs: "10.18px 19.68px 10.18px 19.68px", md: "15px 29px 15px 29px"},
                                                                borderRadius: {xs: "8.14px", md: "12px"},
                                                                background: copyrightOwnershipPermission == "Yes" ? "#644986" : "#fff" ,
                                                                color: copyrightOwnershipPermission == "Yes" ? "#fff" : "#000",
                                                                cursor: "pointer",
                                                                display: "inline-block"
                                                            }}
                                                            onClick={() => { 
                                                                setCopyrightOwnershipPermission("Yes"); 
                                                                setValue("copyrightOwnershipPermission", "Yes", {shouldValidate: true, shouldDirty: true, shouldTouch: true}) 
                                                            }}
                                                        >
                                                            <Typography 
                                                                sx={{
                                                                    fontWeight: '900',
                                                                    fontSize: {xs: "10.18px", md: "15px"},
                                                                    lineHeight: {xs: "8.82px", md: "13px"},
                                                                    letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                                                    textAlign: 'center',
                                                                }}
                                                            > Yes </Typography>
                                                        </Box>

                                                        <Box 
                                                            sx={{
                                                                p: {xs: "10.18px 19.68px 10.18px 19.68px", md: "15px 29px 15px 29px"},
                                                                borderRadius: {xs: "8.14px", md: "12px"},
                                                                background: copyrightOwnershipPermission == "No" ? "#644986" : "#fff",
                                                                color: copyrightOwnershipPermission == "No" ? "#fff" : "#000",
                                                                cursor: "pointer",
                                                                display: "inline-block"
                                                            }}
                                                            onClick={() => {
                                                                setCopyrightOwnershipPermission("No");
                                                                setValue("copyrightOwnershipPermission", "No", {shouldValidate: true, shouldDirty: true, shouldTouch: true}) 
                                                            }}
                                                        >
                                                            <Typography 
                                                                sx={{
                                                                    fontWeight: '900',
                                                                    fontSize: {xs: "10.18px", md: "15px"},
                                                                    lineHeight: {xs: "8.82px", md: "13px"},
                                                                    letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                                                    textAlign: 'center',
                                                                }}
                                                            > No </Typography>
                                                        </Box>
                                                    </Stack>

                                                    { errors.copyrightOwnershipPermission && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.copyrightOwnershipPermission?.message }</Box> }
                                                </Box>
                                            ) 
                                        }

                                    </Box>

                                    <Box
                                        sx={{
                                            bgcolor: "#272727",
                                            p: {xs: "10px", md: "25px"},
                                            borderRadius: "12px"
                                        }}
                                    >
                                        <Typography component={"h3"} variant='h3'
                                            sx={{
                                                fontWeight: "900",
                                                fontSize: {xs: "15px", md: "20px"},
                                                lineHeight: {xs: "25px", md: "40px"},
                                                letterSpacing: "-0.13px"
                                            }}
                                        >Additional Information</Typography>

                                        <Box sx={{my: "20px"}}>
                                            <Typography
                                                sx={{
                                                    fontWeight: "900",
                                                    fontSize: {xs: "15px", md: "20px"},
                                                    lineHeight: {xs: "25px", md: "40px"},
                                                    letterSpacing: "-0.13px",
                                                    mb: '10px'
                                                }}
                                            >ISRC Number</Typography>

                                            <TextField 
                                                variant="outlined" 
                                                fullWidth 
                                                id='songWriter'
                                                type='text'
                                                label=''
                                                inputMode='text'
                                                defaultValue=""
                                                placeholder='E.g TCAII2406427'
                                                InputLabelProps={{
                                                    style: { color: '#c1c1c1', fontWeight: "400" },
                                                }}
                                                InputProps={{
                                                    sx: {
                                                        borderRadius: "16px",
                                                        color: '#fff', // Change to your desired text color
                                                        maxWidth: {xs: "337px", md: "100%"},
                                                    },
                                                }}
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        '& fieldset.MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#fff',
                                                        },
                                                        // '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        //     borderColor: darkTheme ? '#fff' : '#000',
                                                        // },
                                                        // "&.Mui-focused fieldset": {
                                                        //     borderColor: darkTheme ? '#fff' : '#000',
                                                        // },
                                                        // "& ::placeholder": {
                                                        //     color: "gray"
                                                        // },
                                                    },

                                            
                                                }}
                                                error={ errors.ISRC_Number ? true : false }
                                                { ...register('ISRC_Number') }
                                            />
                                        </Box>

                                        <Box sx={{my: "30px"}}>
                                            <Typography component={"h3"} variant='h3'
                                                sx={{
                                                    fontWeight: "900",
                                                    fontSize: {xs: "15px", md: "20px"},
                                                    lineHeight: {xs: "25px", md: "40px"},
                                                    letterSpacing: "-0.13px",
                                                    mb: '10px'
                                                }}
                                            >Language of Lyrics</Typography>

                                            <FormControl fullWidth sx={{ maxWidth: "391px" }}>
                                                <Select
                                                    labelId="lyricsLanguage"
                                                    id="lyricsLanguage-select"
                                                    label=""
                                                    defaultValue="English"
                                                    placeholder='English'

                                                    sx={{
                                                        color: "#000",
                                                        borderRadius: "16px",
                                                        bgcolor: "#fff",
                                                        
                                                        '.MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#fff',
                                                        },
                                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#fff',
                                                        },
                                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#fff',
                                                        },
                                                        '.MuiSvgIcon-root ': {
                                                            // fill: "#797979 !important",
                                                            fill: "#797979",
                                                        }
                                                    }}
                                                    
                                                    error={ errors.lyricsLanguage ? true : false }
                                                    { ...register('lyricsLanguage') }
                                                >
                                                    <MenuItem value="English" disabled selected>
                                                        English
                                                    </MenuItem>

                                                    { languages.map((langItem: any, index) => (
                                                        <MenuItem key={index} value={langItem.englishName}>
                                                            {langItem.englishName}
                                                        </MenuItem>
                                                    )) }
                                                </Select>
                                            </FormControl>
                                        </Box>

                                        <Box sx={{my: "20px"}}>
                                            <Typography
                                                sx={{
                                                    fontWeight: "900",
                                                    fontSize: {xs: "15px", md: "20px"},
                                                    lineHeight: {xs: "25px", md: "40px"},
                                                    letterSpacing: "-0.13px",
                                                    mb: '10px'
                                                }}
                                            >Lyrics(Optional)</Typography>

                                            <TextField 
                                                variant="outlined" 
                                                fullWidth 
                                                id='songLyrics'
                                                type='text'
                                                label=''
                                                inputMode='text'
                                                defaultValue=""
                                                multiline
                                                rows={6}
                                                InputLabelProps={{
                                                    style: { color: '#c1c1c1', fontWeight: "400" },
                                                }}
                                                InputProps={{
                                                    sx: {
                                                        borderRadius: "16px",
                                                        color: '#fff', // Change to your desired text color
                                                        maxWidth: {xs: "337px", md: "100%"},
                                                    },
                                                }}
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        '& fieldset.MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#fff',
                                                        },
                                                        // '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        //     borderColor: darkTheme ? '#fff' : '#000',
                                                        // },
                                                        // "&.Mui-focused fieldset": {
                                                        //     borderColor: darkTheme ? '#fff' : '#000',
                                                        // },
                                                        // "& ::placeholder": {
                                                        //     color: "gray"
                                                        // },
                                                    },
                                                }}
                                                error={ errors.songLyrics ? true : false }
                                                { ...register('songLyrics') }
                                            />

                                        </Box>
                                    </Box>

                                    <Box
                                        sx={{
                                            bgcolor: "#272727",
                                            p: {xs: "10px", md: "25px"},
                                            borderRadius: "12px"
                                        }}
                                    >
                                        <Typography component={"h3"} variant='h3'
                                            sx={{
                                                fontWeight: "900",
                                                fontSize: {xs: "15px", md: "20px"},
                                                lineHeight: {xs: "25px", md: "40px"},
                                                letterSpacing: "-0.13px"
                                            }}
                                        >TikTok Clip Start Time (Optional)</Typography>

                                        <Stack direction={"row"} spacing={"20px"} sx={{my: {xs: "10px", md: "20px"} }}>
                                            <FormControl fullWidth sx={{maxWidth: {xs: "fit-content", md: "110px"},}}>
                                                <Typography
                                                    sx={{
                                                        fontWeight: "400",
                                                        fontSize: "15px",
                                                        lineHeight: "40px",
                                                        letterSpacing: "-0.13px",
                                                        textAlign: "center"
                                                    }}
                                                > Minutes </Typography>

                                                <Select
                                                    labelId="tikTokClipStartTime_Minutes"
                                                    id="tikTokClipStartTime_Minutes-select"
                                                    label=""
                                                    defaultValue="00"
                                                    placeholder='00'

                                                    sx={{
                                                        color: "#000",
                                                        borderRadius: "16px",
                                                        bgcolor: "#fff",
                                                        // textAlign: "center",

                                                        '.MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#fff',
                                                        },
                                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#fff',
                                                        },
                                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#fff',
                                                        },
                                                        '.MuiSvgIcon-root ': {
                                                            fill: "#797979",
                                                        }
                                                    }}
                                                    
                                                    error={ errors.tikTokClipStartTime_Minutes ? true : false }
                                                    { ...register('tikTokClipStartTime_Minutes') }
                                                >
                                                    { minutes.map((minItem: any, index) => (
                                                        <MenuItem key={index} value={minItem} selected={minItem == "00" ? true : false}>
                                                            {minItem}
                                                        </MenuItem>
                                                    )) }
                                                </Select>
                                            </FormControl>

                                            <FormControl fullWidth sx={{maxWidth: {xs: "fit-content", md: "110px"} }}>
                                                <Typography
                                                    sx={{
                                                        fontWeight: "400",
                                                        fontSize: "15px",
                                                        lineHeight: "40px",
                                                        letterSpacing: "-0.13px",
                                                        textAlign: "center"
                                                    }}
                                                > Seconds </Typography>
                                                
                                                <Select
                                                    labelId="tikTokClipStartTime_Seconds"
                                                    id="tikTokClipStartTime_Seconds-select"
                                                    label=""
                                                    defaultValue="00"
                                                    placeholder='00'

                                                    sx={{
                                                        color: "#000",
                                                        borderRadius: "16px",
                                                        bgcolor: "#fff",
                                                        // textAlign: "center",

                                                        '.MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#fff',
                                                        },
                                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#fff',
                                                        },
                                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#fff',
                                                        },
                                                        '.MuiSvgIcon-root ': {
                                                            fill: "#797979",
                                                        }
                                                    }}
                                                    
                                                    error={ errors.tikTokClipStartTime_Seconds ? true : false }
                                                    { ...register('tikTokClipStartTime_Seconds') }
                                                >
                                                    { seconds.map((secondsItem: any, index) => (
                                                        <MenuItem key={index} value={secondsItem} selected={secondsItem == "00" ? true : false}>
                                                            {secondsItem}
                                                        </MenuItem>
                                                    )) }
                                                </Select>
                                            </FormControl>
                                        </Stack>
                                    </Box>

                                    <Box
                                        sx={{
                                            p: {xs: "10px", md: "25px"},
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}
                                    >
                                        <Typography component={"h3"} variant='h3'
                                            sx={{
                                                fontWeight: "900",
                                                fontSize: {xs: "15px", md: "20px"},
                                                lineHeight: {xs: "25px", md: "40px"},
                                                letterSpacing: "-0.13px"
                                            }}
                                        >Upload Song Cover</Typography>

                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "end",
                                                alignItems: "center",
                                                bgcolor: "#272727",
                                                borderRadius: "12px",
                                                height: {xs: "146.55px", md: "326px"},
                                                width: {xs: "128.45px", md: "347px"},
                                                my: {xs: "10px", md: "20px"},
                                                p: {xs: "5px 5px 10px 5px", md: "5px 5px 25px 5px"}
                                            }}
                                        >
                                            { imagePreview ? (
                                                <Box sx={{ overflow: "hidden", borderRadius: "12px" }}>
                                                    <img 
                                                        src={imagePreview} alt='uploaded image'
                                                        style={{
                                                            width: "100%",
                                                            // height: "100%",
                                                            objectFit: "contain",
                                                        }}
                                                    />
                                                </Box>
                                            ) : (
                                                <Box
                                                    sx={{
                                                        maxWidth: {xs: "71.29px", md: "160px"},
                                                        maxHeight: {xs: "71.93px", md: "160px"},
                                                        p: {xs: "10px", md: "25px"}
                                                    }}
                                                >
                                                    <img 
                                                        src={cloudUploadIconImg} alt='cloud upload icon image'
                                                        style={{
                                                            width: "100%",
                                                            objectFit: "contain",
                                                        }}
                                                    />
                                                </Box>
                                            )}

                                            <Box 
                                                sx={{
                                                    p: {xs: "10.18px 19.68px 10.18px 19.68px", md: "15px 29px 15px 29px"},
                                                    borderRadius: {xs: "8.14px", md: "12px"},
                                                    background: "#fff",
                                                    color: "#000",
                                                    cursor: "pointer",
                                                    display: "inline-block",
                                                    mt: {xs: "7px", md: "15px"}
                                                }}
                                                onClick={() => {
                                                    document.getElementById("uploadSongCoverImage")?.click();
                                                }}
                                            >
                                                <Typography 
                                                    sx={{
                                                        fontWeight: '900',
                                                        fontSize: {xs: "10.18px", md: "15px"},
                                                        lineHeight: {xs: "8.82px", md: "13px"},
                                                        letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                                        textAlign: 'center',
                                                    }}
                                                > { imagePreview ? "Choose an Image" : "Upload" } </Typography>
                                            </Box>

                                        </Box>


                                    </Box>
                                </Stack>
                            </Box>

                        </Box>
                    </Stack>

                    {
                        apiResponse.display && (
                            <Stack sx={{ width: '100%', mt: 5, mb: 2 }}>
                                <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                            </Stack>
                        )
                    }

                    <Stack justifyContent={"center"} alignItems={"center"} sx={{mt: "20px"}}>
                        <Button variant="contained" 
                            fullWidth type="submit" 
                            disabled={ !isValid || isSubmitting } 
                            sx={{ 
                                bgcolor: darkTheme ? "#fff" : "#000",
                                maxWidth: "312px",
                                "&.Mui-disabled": {
                                    background: "#9c9c9c",
                                    color: "#797979"
                                },
                                "&:hover": {
                                    bgcolor: darkTheme ? "#fff" : "#000",
                                },
                                "&:active": {
                                    bgcolor: darkTheme ? "#fff" : "#000",
                                },
                                "&:focus": {
                                    bgcolor: darkTheme ? "#fff" : "#000",
                                },
                                color: darkTheme ? "#000" : "#fff",
                                borderRadius: "12px",
                                my: 3, py: 1.5,
                                fontSize: {md: "15.38px"},
                                fontWeight: "900",
                                letterSpacing: "-0.12px",
                                textTransform: "none"
                            }}
                        >
                            <span style={{ display: isSubmitting ? "none" : "initial" }}>Save Release</span>
                            <CircularProgress size={25} sx={{ display: isSubmitting ? "initial" : "none", color: "#8638E5", fontWeight: "bold" }} />
                        </Button>
                    </Stack>
                </form>

            </Box>

                   
            <input 
                type="file" 
                id='songAudioUpload' 
                name="songAudioUpload" 
                accept='audio/*' 
                onChange={handleAudioFileUpload}
                style={{display: "none"}}
            />
                   
            <input 
                type="file" 
                id='uploadSongCoverImage' 
                name="uploadSongCoverImage" 
                accept='image/*' 
                onChange={handleFileUpload}
                style={{display: "none"}}
            />
        </AccountWrapper>
    )
}

export default CreateSingleRelease2
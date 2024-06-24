import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
// import axios from 'axios';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider, Theme, useTheme } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';

import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { useUserStore } from '@/state/userStore';
import { useSettingStore } from '@/state/settingStore';
import { createReleaseStore } from '@/state/createReleaseStore';
import { languages } from '@/util/languages';
import { apiEndpoint } from '@/util/resources';

import AccountWrapper from '@/components/AccountWrapper';
import albumSampleArt from "@/assets/images/albumSampleArt.png"
import SearchArtistModalComponent from '@/components/account/SearchArtistModal';
import AppleSportifyCheckmark from '@/components/AppleSportifyCheckmark';

const formSchema = yup.object({
    songTitle: yup.string().required().trim().label("Song Title"),
    artistName: yup.string().trim().label("Artist Name"),
    explicitSongLyrics: yup.string().trim(),
    language: yup.string().required().trim().label("Language"),
    primaryGenre: yup.string().required().trim().label("Primary Genre"),
    secondaryGenre: yup.string().required().trim().label("Secondary Genre"),
    releaseDate: yup.string().trim().label("Release Date"),
    
    releaseTimeHours: yup.string().trim().label("Hours"),
    releaseTimeMinutes: yup.string().trim().label("Minutes"),
    releaseTimeHourFormat: yup.string().trim().label("Time Format"),
    
    listenerTimezone: yup.boolean().label("Listener's Timezone"),
    generalTimezone: yup.boolean().label("General Timezone"),

    labelName: yup.string().trim().label("Label Name"),
    recordingLocation: yup.string().trim().label("Recording Location"),
    soldWorldwide: yup.string().trim(),
    UPC_EANcode: yup.string().trim().label("UPC/EAN Code"),
});

const customTheme = (outerTheme: Theme, darkTheme: boolean) =>
    createTheme({
        palette: {
            mode: outerTheme.palette.mode,
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '--TextField-brandBorderColor': darkTheme ? '#fff' : '#000',
                        '--TextField-brandBorderHoverColor': '#B2BAC2',
                        '--TextField-brandBorderFocusedColor': '#6F7E8C',
                        '& label.Mui-focused': {
                            color: 'var(--TextField-brandBorderFocusedColor)',
                        },
                        '& .MuiInputBase-input': { // Target input text
                            color: darkTheme ? '#fff' : '#000', // Change to your desired text color
                        },
                        '& .MuiInputBase-placeholder': { // Target placeholder text
                            color: 'gray', // Change to your desired placeholder color
                        },
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    notchedOutline: {
                        borderColor: 'var(--TextField-brandBorderColor)',
                    },
                    root: {
                        [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: 'var(--TextField-brandBorderHoverColor)',
                        },
                        [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: 'var(--TextField-brandBorderFocusedColor)',
                        },
                    },
                },
            },
            MuiFilledInput: {
                styleOverrides: {
                    root: {
                        '&::before, &::after': {
                            borderBottom: '2px solid var(--TextField-brandBorderColor)',
                        },
                        '&:hover:not(.Mui-disabled, .Mui-error):before': {
                            borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
                        },
                        '&.Mui-focused:after': {
                            borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
                        },
                    },
                },
            },
            MuiInput: {
                styleOverrides: {
                    root: {
                        '&::before': {
                            borderBottom: '2px solid var(--TextField-brandBorderColor)',
                        },
                        '&:hover:not(.Mui-disabled, .Mui-error):before': {
                            borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
                        },
                        '&.Mui-focused:after': {
                            borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
                        },
                    },
                },
            },
        },
    });
  

const hours = [...Array(13).keys()].map((num) => num.toString().padStart(2, '0'));
const minutes = [...Array(60).keys()].map((num) => num.toString().padStart(2, '0'));

const primaryGenre = [
    'African', 'Alternative', 'Ambient', 'Americana', 'Big Band', 'Blues', 'Brazilian', "Children's Music",
    'Christian/Gospel', 'Classical Crossover', 'Comedy', 'Country', 'Dance', 'Electronic', 'Fitness & Workout',
    'Folk', 'French Pop', 'German Folk', 'German Pop', 'Heavy Metal', 'Indian', 'Instrumental',
    'J Pop', 'Jazz', 'K Pop', 'Karaoke', 'Latin', 'New Age', 'Pop', "R&B/Soul", 'Reggae',
    'Hip Hop/Rap', 'Holiday', 'Rock', 'Singer/Songwriter', 'Soundtrack', 'Spoken Word', 'Vocal', 'World'
];

const secondaryGenre = [
    'African', 'Afro house', 'Afro-fusion', 'Afro-soul', 'Afrobeats', 'Afropop', 'Amapiano', 'Bongo Flava',
    'Highlife', 'Maskandi', 'Alternative', 'Ambient', 'Americana', 'Big Band', 'Blues', 'Brazilian', "Children's Music",
    'Christian/Gospel', 'Classical Crossover', 'Comedy', 'Country', 'Dance', 'Electronic', 'Fitness & Workout', 'Folk',
    'French Pop', 'German Folk', 'German Pop', 'Heavy Metal', 'Hip Hop/Rap', 'Holiday', 'Indian', 'Instrumental', 'J Pop',
    'Jazz', 'K Pop', 'Karaoke', 'Latin', 'New Age', 'Pop', 'R&B/Soul', 'Reggae', 'Rock', "Singer/Songwriter", 'Soundtrack',
    'Spoken Word', 'Vocal', 'World', 'Axé', 'Baile Funk', 'Bossa Nova', 'Chorinho', 'Forró', 'v Frevo', 'MPB', 'Pagode',
    'Samba', 'Sertanejo'
];


function CreateSingleRelease() {
    const navigate = useNavigate();
    const outerTheme = useTheme();
    const darkTheme = useSettingStore((state) => state.darkTheme);
    const [explicitLyrics, setExplicitLyrics] = useState("No");
    const [soldWorldwide, setSoldWorldwide] = useState("Yes");
    const userData = useUserStore((state) => state.userData);
    const accessToken = useUserStore((state) => state.accessToken);
    const _setSingleRelease1 = createReleaseStore((state) => state._setSingleRelease1);
    const _setToastNotification = useSettingStore((state) => state._setToastNotification);

    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });

    const [openSearchArtistModal, setOpenSearchArtistModal] = useState(false);
    const [selectArtistName, setSelectArtistName] = useState<any>();


    const { 
        handleSubmit, register, setValue, getValues, setError, formState: { errors, isValid, isSubmitting } 
    } = useForm({ 
        resolver: yupResolver(formSchema),
        mode: 'onBlur',
        defaultValues: { 
            soldWorldwide: soldWorldwide,
            explicitSongLyrics: explicitLyrics,
            // releaseTimeHours: "00",
            releaseTimeMinutes: "00",
            releaseTimeHourFormat: "AM",
            // language: "English",
            listenerTimezone: true,
            generalTimezone: true,
        } 
    });

    const handleSetArtistName = (details: any) => {
        // console.log(details);
        setSelectArtistName(details);
        setValue("artistName", details.spotify.name || details.apple.name );
    }

            
    const onSubmit = async (formData: typeof formSchema.__outputType) => {
        // console.log(formData);

        setApiResponse({
            display: false,
            status: true,
            message: ""
        });


        // if (!formData.artistName) {
        //     _setToastNotification({
        //         display: true,
        //         status: "error",
        //         message: "Please choose if this song has explicit lyrics."
        //     })

        //     setError("explicitSongLyrics", {message: "Please choose if this song has explicit lyrics."})
        //     return;
        // }

        if (!explicitLyrics) {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Please choose if this song has explicit lyrics."
            })

            setError("explicitSongLyrics", {message: "Please choose if this song has explicit lyrics."})
            return;
        }

        if (formData.language == "Select Language") {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Please select a language."
            })

            setError("language", {message: "Please select a language."}, {shouldFocus: true});
            return;
        }

        if (formData.primaryGenre == "Select Primary Genre") {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Please select primary genre."
            })

            setError("primaryGenre", {message: "Please select primary genre."}, {shouldFocus: true});
            return;
        }

        if (formData.secondaryGenre == "Select Secondary Genre") {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Please select secondary genre."
            })

            setError("secondaryGenre", {message: "Please select secondary genre."}, {shouldFocus: true});
            return;
        }

        if (!formData.releaseDate) {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Please select a release date."
            })

            setError("releaseDate", { message: "Please select a release date." }, {shouldFocus: true});

            // document.getElementById("releaseDate")?.focus();
            return;
        }

        const data2db = {
            email: userData.email,
            release_type: "Single",
        
            song_title: formData.songTitle,
            artist_name: formData.artistName || '',
        
            explicitLyrics: explicitLyrics,
        
            language: formData.language,
            primary_genre: formData.primaryGenre,
            secondary_genre: formData.secondaryGenre,
        
            releaseDate: formData.releaseDate,
            release_time: `${ formData.releaseTimeHours } : ${ formData.releaseTimeMinutes } ${ formData.releaseTimeHourFormat }`,

            listenerTimezone: formData.listenerTimezone || true,
            generalTimezone: formData.generalTimezone || true,
        
            label_name: formData.labelName || '',
            recording_location: formData.recordingLocation || '',
            soldWorldwide: formData.soldWorldwide || '',
            upc_ean: formData.UPC_EANcode || '',
        };

        console.log(data2db);

        try {
            const response = (await axios.post(
                `${apiEndpoint}/Release/create-release`,
                data2db,  
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    },
                }
            )).data;
            console.log(response);

            _setSingleRelease1(data2db);

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

            navigate("/account/artist/create-single-release-continue");
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
            <Box sx={{px: {xs: 2, md: 5, lg: 12}, pb: 5, position: "relative", zIndex: 10, mt: {xs: 5, md: 10}  }}>
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

                <Box sx={{my: 3}}>
                    <ThemeProvider theme={customTheme(outerTheme, darkTheme)}>
                        <form noValidate onSubmit={ handleSubmit(onSubmit) } 
                            style={{
                                width: "100%",
                                maxWidth: "916px",
                                // textAlign: "lef"
                            }}
                        >
                            
                            <Grid container spacing="20px" sx={{my: "31px"}}>
                                <Grid item xs={12} md={4}
                                    sx={{ alignSelf: "center"}}
                                >
                                    <Typography sx={{
                                        fontWeight: {xs: "700", md: "900"},
                                        fontSize: {xs: "13.12px", md: "25px"},
                                        lineHeight: {xs: "21px", md: "40px"},
                                        letterSpacing: {xs: "-0.07px", md: "-0.13px"}
                                    }}>
                                        Single Title
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={8}
                                    sx={{ alignSelf: "center" }}
                                >
                                    <TextField 
                                        variant="outlined" 
                                        fullWidth 
                                        id='songTitle'
                                        type='text'
                                        label=''
                                        inputMode='text'
                                        defaultValue=""
                                        InputLabelProps={{
                                            style: { color: '#c1c1c1', fontWeight: "400" },
                                        }}
                                        InputProps={{
                                            sx: {
                                                borderRadius: "16px",
                                                maxWidth: {xs: "337px", md: "100%"}
                                            },
                                        }}
                                        error={ errors.songTitle ? true : false }
                                        { ...register('songTitle') }
                                    />
                                    { errors.songTitle && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.songTitle?.message }</Box> }
                                </Grid>
                            </Grid>

                            <Grid container spacing="20px" sx={{my: "31px"}}>
                                <Grid item xs={12} md={4}>
                                    <Typography sx={{
                                        fontWeight: {xs: "900", md: "900"},
                                        fontSize: {xs: "13.12px", md: "25px"},
                                        lineHeight: {xs: "21px", md: "40px"},
                                        letterSpacing: {xs: "-0.07px", md: "-0.13px"}
                                    }}>
                                        Main Artist Name
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={8}>
                                    <Box>
                                        <Box 
                                            sx={{
                                                p: {xs: "11.25px 21.75px 11.25px 21.75px", md: "15px 29px 15px 29px"},
                                                borderRadius: {xs: "9px", md: "12px"},
                                                background: darkTheme ? "#fff" : "#272727",
                                                color: "#000000",
                                                cursor: "pointer",
                                                display: "inline-block"
                                            }}
                                            onClick={() => setOpenSearchArtistModal(true) }
                                        >
                                            <Typography 
                                                sx={{
                                                    fontWeight: '900',
                                                    fontSize: {xs: "11.25px", md: "15px"},
                                                    lineHeight: {xs: "9.75px", md: "13px"},
                                                    letterSpacing: {xs: "-0.1px", md: "-0.13px"},
                                                    textAlign: 'center',
                                                    color: darkTheme ? "#000" : "#fff",
                                                }}
                                            > Add&nbsp;Artist </Typography>
                                        </Box>

                                        {
                                            selectArtistName ? (
                                                <Box
                                                    sx={{
                                                        height: {xs: "82px", md: "82.92px"}, 
                                                        borderRadius: "8.65px",
                                                        // border: "0.07px solid #FFFFFF",

                                                        bgcolor: "#6449868F",
                                                        py: {xs: "6.02px",md: "6.5px"},
                                                        px: "7.2px",
                                                        maxWidth: {xs: "337px", md: "100%"},

                                                        display: "flex",
                                                        flexDirection: "row",
                                                        alignItems: "center",
                                                        gap: "8.65px",
                                                        my: 2
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            width: "70.67px",
                                                            height: "69.94px",
                                                            borderRadius: "5.77px",
                                                            overflow: "hidden"
                                                        }}
                                                    >
                                                        <img 
                                                            src={albumSampleArt} alt="album Art"
                                                            style={{ width: "100%", objectFit: "contain" }}
                                                        />
                                                    </Box>

                                                    <Box>
                                                        <Box 
                                                            sx={{
                                                                display: "flex",
                                                                flexDirection: "row",
                                                                gap: "5px",
                                                                alignItems: "center"
                                                            }}
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    fontWeight: "700",
                                                                    fontSize: "25px",
                                                                    lineHeight: "20px",
                                                                    letterSpacing: "-0.13px",
                                                                    color: "#fff"
                                                                }}
                                                            > 
                                                                { selectArtistName.apple ? selectArtistName.apple.name : selectArtistName.spotify ? selectArtistName.spotify.name : '' } 
                                                            </Typography>
                                                        </Box>

                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                flexDirection: "row",
                                                                alignItems: "center",
                                                                gap: "10px",
                                                                mt:  "7.2px",
                                                            }}
                                                        >
                                                            { selectArtistName.apple ? <AppleSportifyCheckmark dspName="Apple" bgColor='#D9D9D9' /> : <></> }
                                                            { selectArtistName.spotify ? <AppleSportifyCheckmark dspName="Spotify" bgColor='#D9D9D9' /> : <></> }
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            ) : <></>
                                        }

                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "16.96px", md: "25px"},
                                                lineHeight: {xs: "27.14px", md: "40px"},
                                                letterSpacing: {xs: "-0.09px", md: "-0.13px"}
                                            }}
                                        >
                                            Does this song have explicit lyrics? &#32;
                                            <span
                                                // onClick={() => { }}
                                                style={{
                                                    color: "#C8F452",
                                                    cursor: "pointer"
                                                }}
                                            >
                                                Read More
                                            </span>
                                        </Typography>

                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                gap: "15px",
                                                mt: "21px",
                                            }}
                                        >
                                            <Box 
                                                sx={{
                                                    p: {xs: "10.18px 19.68px 10.18px 19.68px", md: "15px 29px 15px 29px"},
                                                    borderRadius: {xs: "8.14px", md: "12px"},
                                                    background: getValues("explicitSongLyrics") == "Yes" ? "#644986" : darkTheme ? "#fff" : "#272727",
                                                    color: getValues("explicitSongLyrics") == "Yes" ? "#fff" : darkTheme ? "#000" : "#fff",
                                                    cursor: "pointer",
                                                    display: "inline-block"
                                                }}
                                                onClick={() => {
                                                    setValue("explicitSongLyrics", "Yes");
                                                    setExplicitLyrics("Yes");
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
                                                    background: getValues("explicitSongLyrics") == "No" ? "#644986" : darkTheme ? "#fff" : "#272727",
                                                    color: getValues("explicitSongLyrics") == "No" ? "#fff" : darkTheme ? "#000" : "#fff",
                                                    cursor: "pointer",
                                                    display: "inline-block"
                                                }}
                                                onClick={() => {
                                                    setValue("explicitSongLyrics", "No");
                                                    setExplicitLyrics("No");
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
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>

                            <Grid container spacing="20px" sx={{my: "31px"}}>
                                <Grid item xs={12} md={4}>
                                    <Typography sx={{
                                        fontWeight: "900",
                                        fontSize: {xs: "13.12px", md: "25px"},
                                        lineHeight: {xs: "21px", md: "40px"},
                                        letterSpacing: {xs: "-0.07px", md: "-0.13px"}
                                    }}>
                                        Language
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={8}
                                    sx={{maxWidth: {xs: "320px", md: "284px"}}}
                                >
                                    <Box>
                                        <FormControl fullWidth>
                                            <Select
                                                labelId="language"
                                                id="language-select"
                                                label=""
                                                defaultValue="Select Language"
                                                placeholder='Select Language'

                                                sx={{
                                                    color: darkTheme ? "#000" : "#fff",
                                                    borderRadius: "16px",
                                                    bgcolor: darkTheme ? "#fff" : "#272727",
                                                    '.MuiOutlinedInput-notchedOutline': {
                                                        borderColor: darkTheme ? '#fff' : "#000",
                                                    },
                                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: 'rgba(228, 219, 233, 0.25)',
                                                    },
                                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: 'var(--TextField-brandBorderHoverColor)', // 'rgba(228, 219, 233, 0.25)',
                                                    },
                                                    '.MuiSvgIcon-root ': {
                                                        fill: darkTheme ? "#797979" : "#fff",
                                                    }
                                                }}
                                                
                                                error={ errors.language ? true : false }
                                                { ...register('language') }
                                            >
                                                <MenuItem value="Select Language" disabled selected>
                                                    Select Language
                                                </MenuItem>
                                                { languages.map((langItem: any, index) => (
                                                    <MenuItem key={index} value={langItem.englishName}>
                                                        {langItem.englishName}
                                                    </MenuItem>
                                                )) }
                                            </Select>
                                        </FormControl>

                                        { errors.language && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.language?.message }</Box> }
                                    </Box>
                                </Grid>
                            </Grid>

                            <Grid container spacing="20px" sx={{my: "31px"}}>
                                <Grid item xs={12} md={4}>
                                    <Typography sx={{
                                        fontWeight: "900",
                                        fontSize: {xs: "13.12px", md: "25px"},
                                        lineHeight: {xs: "21px", md: "40px"},
                                        letterSpacing: {xs: "-0.07px", md: "-0.13px"}
                                    }}>
                                        Primary Genre
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={8}
                                    sx={{maxWidth: {xs: "320px", md: "284px"}}}
                                >
                                    <Box>
                                        <FormControl fullWidth>
                                            <Select
                                                labelId="primaryGenre"
                                                id="primaryGenre-select"
                                                label=""
                                                defaultValue="Select Primary Genre"
                                                placeholder='Select Primary Genre'

                                                sx={{
                                                    color: darkTheme ? "#000" : "#fff",
                                                    borderRadius: "16px",
                                                    bgcolor: darkTheme ? "#fff" : "#272727",
                                                    '.MuiOutlinedInput-notchedOutline': {
                                                        borderColor: darkTheme ? '#fff' : "#000",
                                                    },
                                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: 'rgba(228, 219, 233, 0.25)',
                                                    },
                                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: 'var(--TextField-brandBorderHoverColor)', // 'rgba(228, 219, 233, 0.25)',
                                                    },
                                                    '.MuiSvgIcon-root ': {
                                                        // fill: "#797979 !important",
                                                        fill: darkTheme ? "#797979" : "#fff",
                                                    }
                                                }}
                                                
                                                error={ errors.primaryGenre ? true : false }
                                                { ...register('primaryGenre') }
                                            >
                                                <MenuItem value="Select Primary Genre" disabled selected>
                                                    Select Primary Genre
                                                </MenuItem>
                                                { primaryGenre.map((item: any, index) => (
                                                    <MenuItem key={index} value={item}>
                                                        {item}
                                                    </MenuItem>
                                                )) }
                                            </Select>
                                        </FormControl>

                                        { errors.primaryGenre && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.primaryGenre?.message }</Box> }
                                    </Box>
                                </Grid>
                            </Grid>

                            <Grid container spacing="20px" sx={{my: "31px"}}>
                                <Grid item xs={12} md={4}>
                                    <Typography sx={{
                                        fontWeight: "900",
                                        fontSize: {xs: "13.12px", md: "25px"},
                                        lineHeight: {xs: "21px", md: "40px"},
                                        letterSpacing: {xs: "-0.07px", md: "-0.13px"}
                                    }}>
                                        Secondary Genre
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={8}
                                    sx={{maxWidth: {xs: "320px", md: "284px"}}}
                                >
                                    <Box>
                                        <FormControl fullWidth>
                                            <Select
                                                labelId="secondaryGenre"
                                                id="secondaryGenre-select"
                                                label=""
                                                defaultValue="Select Secondary Genre"
                                                placeholder='Select Secondary Genre'

                                                sx={{
                                                    color: darkTheme ? "#000" : "#fff",
                                                    borderRadius: "16px",
                                                    bgcolor: darkTheme ? "#fff" : "#272727",
                                                    '.MuiOutlinedInput-notchedOutline': {
                                                        borderColor: darkTheme ? '#fff' : "#000",
                                                    },
                                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: 'rgba(228, 219, 233, 0.25)',
                                                    },
                                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: 'var(--TextField-brandBorderHoverColor)', // 'rgba(228, 219, 233, 0.25)',
                                                    },
                                                    '.MuiSvgIcon-root ': {
                                                        // fill: "#797979 !important",
                                                        fill: darkTheme ? "#797979" : "#fff",
                                                    }
                                                }}
                                                
                                                error={ errors.secondaryGenre ? true : false }
                                                { ...register('secondaryGenre') }
                                            >
                                                <MenuItem value="Select Secondary Genre" disabled selected>
                                                    Select Secondary Genre
                                                </MenuItem>
                                                { secondaryGenre.map((item: any, index) => (
                                                    <MenuItem key={index} value={item}>
                                                        {item}
                                                    </MenuItem>
                                                )) }
                                            </Select>
                                        </FormControl>

                                        { errors.secondaryGenre && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.secondaryGenre?.message }</Box> }
                                    </Box>
                                </Grid>
                            </Grid>

                            <Grid container spacing="20px" sx={{my: "31px"}}>
                                <Grid item xs={12} md={4}>
                                    <Typography sx={{
                                        fontWeight: "900",
                                        fontSize: {xs: "13.12px", md: "25px"},
                                        lineHeight: {xs: "21px", md: "40px"},
                                        letterSpacing: {xs: "-0.07px", md: "-0.13px"}
                                    }}>
                                        Release Date
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={8}
                                    sx={{maxWidth: {xs: "320px", md: "284px"}}}
                                >
                                    <Box id='releaseDate'>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer 
                                                components={['DatePicker', 'DatePicker']}
                                            >
                                                <DatePicker 
                                                    label="" 
                                                    // defaultValue={dayjs('2022-04-17')} 
                                                    name='releaseDate'
                                                    
                                                    sx={{
                                                        width: "100%",
                                                        // bgcolor: "yellow",
                                                        color: "yellow !important",
                                                        ".MuiSvgIcon-root": {
                                                            // color: "green",
                                                            color: darkTheme ? "#797979 !important" : "#fff !important",
                                                        },   

                                                        "& .MuiInputBase-input": {
                                                            color: darkTheme ? "#000" : "#fff",
                                                        },

                                                    }}
                                                    slotProps={{
                                                        textField: {
                                                            InputProps: {
                                                                sx: {
                                                                    borderRadius: "16px",
                                                                    bgcolor: darkTheme ? "#fff" : "#272727",
                                                                    color: "green !important",

                                                                }
                                                            },
                                                        },
                                                        day: {
                                                            sx: {
                                                                // "&.MuiPickersDay-root.Mui-selected": {
                                                                //     backgroundColor: "#644986",
                                                                // },

                                                                // "& .MuiPickersYear-yearButton.Mui-selected": {
                                                                //     backgroundColor: "#644986",
                                                                // }
                                                            },
                                                        },
                                                    }}
                                                    format='DD/MM/YYYY'
                                                    onChange={(newValue) => {
                                                        const value = dayjs(newValue).format('DD/MM/YYYY');
                                                        setValue("releaseDate", value, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
                                                    }}
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>

                                        { errors.releaseDate && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.releaseDate?.message }</Box> }
                                    </Box>
                                </Grid>
                            </Grid>

                            <Grid container spacing="20px" sx={{my: "31px"}}>
                                <Grid item xs={12} md={4} sx={{ display: {xs: "none", md: "initial"}}}></Grid>

                                <Grid item xs={12} md={8} sx={{maxWidth: {xs: "337px", md: "100%"}}}>
                                    <Box
                                        sx={{
                                            bgcolor: darkTheme ? "#CACACA40" : "#272727",
                                            color: "#fff",
                                            p: "25px 20px",
                                            borderRadius: "12px"
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "10.52px", md: "15px"},
                                                lineHeight: {xs: "12.92px", md: "24px"},
                                                letterSpacing: {xs: "-0.07px", md: "-0.13px"}
                                            }}
                                        >
                                            TIP: Set your release date 4 weeks from today to give stores time to review your release
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>

                            <Grid container spacing="20px" sx={{my: "31px"}}>
                                <Grid item xs={12} md={4}>
                                    <Typography sx={{
                                        fontWeight: "900",
                                        fontSize: {xs: "11px", md: "25px"},
                                        lineHeight: {xs: "17.6px", md: "40px"},
                                        letterSpacing: {xs: "-0.06px", md: "-0.13px"}
                                    }}>
                                        Release Time (Spotify Only)
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={8}>
                                    <Box>
                                            
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                                // justifyContent: "space-between",
                                                alignItems: "center",
                                                gap: "20px"
                                            }}
                                        >
                                            <FormControl fullWidth sx={{maxWidth: {sx: "119.43px", md: "145px"},}}>
                                                <Select
                                                    labelId="releaseTimeHours"
                                                    id="releaseTimeHours-select"
                                                    label=""
                                                    defaultValue="12"
                                                    placeholder='12'

                                                    sx={{
                                                        color: darkTheme ? "#fff" : "#000",
                                                        borderRadius: "16px",
                                                        '.MuiOutlinedInput-notchedOutline': {
                                                            borderColor: darkTheme ? '#fff' : "#000",
                                                        },
                                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: darkTheme ? '#fff' : "#000",
                                                        },
                                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: darkTheme ? '#fff' : "#000",
                                                        },
                                                        '.MuiSvgIcon-root ': {
                                                            display: "none",
                                                        }
                                                    }}
                                                    
                                                    error={ errors.releaseTimeHours ? true : false }
                                                    { ...register('releaseTimeHours') }
                                                >
                                                    { hours.map((hourItem: any, index) => (
                                                        <MenuItem key={index} value={hourItem} selected={hourItem == "12" ? true : false}>
                                                            {hourItem}
                                                        </MenuItem>
                                                    )) }
                                                </Select>
                                            </FormControl>

                                            <FormControl fullWidth sx={{maxWidth: {sx: "119.43px", md: "145px"},}}>
                                                <Select
                                                    labelId="releaseTimeMinutes"
                                                    id="releaseTimeMinutes-select"
                                                    label=""
                                                    defaultValue="00"
                                                    placeholder='00'

                                                    sx={{
                                                        color: darkTheme ? "#fff" : "#000",
                                                        borderRadius: "16px",
                                                        '.MuiOutlinedInput-notchedOutline': {
                                                            borderColor: darkTheme ? '#fff' : "#000",
                                                        },
                                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: darkTheme ? '#fff' : "#000",
                                                        },
                                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: darkTheme ? '#fff' : "#000",
                                                        },
                                                        '.MuiSvgIcon-root ': {
                                                            display: "none",
                                                        }
                                                    }}
                                                    
                                                    error={ errors.releaseTimeMinutes ? true : false }
                                                    { ...register('releaseTimeMinutes') }
                                                >
                                                    { minutes.map((minItem: any, index) => (
                                                        <MenuItem key={index} value={minItem} selected={minItem == "00" ? true : false}>
                                                            {minItem}
                                                        </MenuItem>
                                                    )) }
                                                </Select>
                                            </FormControl>

                                            <FormControl fullWidth sx={{maxWidth: {sx: "119.43px", md: "145px"},}}>
                                                <Select
                                                    labelId="releaseTimeHourFormat"
                                                    id="releaseTimeHourFormat-select"
                                                    label=""
                                                    defaultValue="AM"
                                                    placeholder='AM'

                                                    sx={{
                                                        color: darkTheme ? "#fff" : "#000",
                                                        borderRadius: "16px",
                                                        // bgcolor: darkTheme ? "#fff" : "#272727",
                                                        '.MuiOutlinedInput-notchedOutline': {
                                                            borderColor: darkTheme ? '#fff' : "#000",
                                                        },
                                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                            // borderColor: 'rgba(228, 219, 233, 0.25)',
                                                            borderColor: darkTheme ? '#fff' : "#000",
                                                        },
                                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: darkTheme ? '#fff' : "#000",
                                                            // borderColor: 'var(--TextField-brandBorderHoverColor)', // 'rgba(228, 219, 233, 0.25)',
                                                        },
                                                        '.MuiSvgIcon-root ': {
                                                            display: "none",
                                                        }
                                                    }}
                                                    
                                                    error={ errors.releaseTimeHourFormat ? true : false }
                                                    { ...register('releaseTimeHourFormat') }
                                                >
                                                    <MenuItem value="AM" selected>
                                                        AM
                                                    </MenuItem>

                                                    <MenuItem value="PM">
                                                        PM
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>

                                        <Typography
                                            sx={{
                                                fontWeight: "300",
                                                fontSize: {xs: "11.37px", md: "18px"},
                                                lineHeight: {xs: "25.27px", md: "40px"},
                                                letterSpacing: {xs: "-0.08px", md: "-0.13px"},
                                                my: {xs: "16px", md: "25px"}
                                            }}
                                        >
                                            Set the time you'd like your release to go live on Spotify.
                                        </Typography>

                                        <FormGroup>
                                            <FormControlLabel 
                                                control={<Checkbox 
                                                    defaultChecked 
                                                    sx={{
                                                        color: darkTheme ? "#fff" : "#797979",
                                                        '&.Mui-checked': {
                                                            color: darkTheme ? "#fff" : "#797979",
                                                        },
                                                        marginTop: -1,
                                                    }}
                                                />} 
                                                // label="Label" 
                                                label={<Box 
                                                    sx={{
                                                        lineHeight: {xs: "25.27px", md: "40px"}, 
                                                        letterSpacing: {xs: "-0.08px", md: "-0.13px"}, 
                                                        fontSize: {xs: "11.37px", md: "18px"},
                                                    }}>
                                                    <Typography sx={{ fontWeight: "700" }}>
                                                        12:00 AM in the listener's timezone
                                                    </Typography>

                                                    <Typography sx={{ fontWeight: "300" }}>
                                                        Example: 12:00 AM in NYC, 12:00 AM in London
                                                    </Typography>
                                                </Box>}
                                                sx={{ mb: 2, alignItems: 'flex-start' }}
                                                onChange={(event) => {
                                                    const eValue: any = event.target;
                                                    // console.log(eValue.checked);
                                                    setValue("listenerTimezone", eValue.checked, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
                                                }}
                                            />

                                            <FormControlLabel 
                                                control={<Checkbox 
                                                    defaultChecked 
                                                    // checked={tnc}
                                                    sx={{
                                                        color: darkTheme ? "#fff" : "#797979",
                                                        '&.Mui-checked': {
                                                            color: darkTheme ? "#fff" : "#797979",
                                                        },
                                                        marginTop: -1,
                                                    }}
                                                />} 
                                                // label="Label" 
                                                label={<Box sx={{lineHeight: "40px", letterSpacing: "-0.13px", fontSize: "18px",}}>
                                                    <Typography sx={{ fontWeight: "700" }}>
                                                        12:00 AM EST / NYC and at the same time across all countries/territories regardless of timezone
                                                    </Typography>

                                                    <Typography sx={{ fontWeight: "300" }}>
                                                        Example: 12:00 AM in NYC, 12:00 AM in London
                                                    </Typography>
                                                </Box>}
                                                sx={{ alignItems: 'flex-start' }}
                                                onChange={(event) => {
                                                    const eValue: any = event.target;
                                                    // console.log(eValue.checked);
                                                    setValue("generalTimezone", eValue.checked, {shouldDirty: true, shouldTouch: true, shouldValidate: true} );
                                                }}
                                            />
                                        </FormGroup>
                                    </Box>
                                </Grid>
                            </Grid>

                            <Box sx={{
                                border: "0.1px solid #FFFFFF",
                                position: "absolute",
                                width: "100%",
                                left: 0,
                            }}></Box>
                            <Box sx={{my: 10}}></Box>

                            <Box>
                                <Typography
                                    sx={{
                                        fontWeight: "900",
                                        fontSize: {xs: "16.69px", md: "35px"},
                                        lineHeight: {xs: "19.07px", md: "40px"},
                                        letterSpacing: {xs: "-0.06px", md: "-0.13px"},
                                    }}
                                > Advanced Distribution Features </Typography>


                                <Grid container spacing="20px" sx={{my: "31px"}}>
                                    <Grid item
                                        xs={12} md={4}
                                        sx={{ alignSelf: "center"}}
                                    >
                                        <Typography sx={{
                                            fontWeight: "900",
                                            fontSize: {xs: "19.28px", md: "25px"},
                                            lineHeight: {xs: "15.42px", md: "20px"},
                                            letterSpacing: {xs: "-0.1px", md: "-0.13px"}
                                        }}>
                                            Label Name
                                        </Typography>

                                        <Typography sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: "13.88px", md: "18px"},
                                            lineHeight: {xs: "9.25px", md: "12px"},
                                            letterSpacing: {xs: "-0.1px", md: "-0.13px"},
                                            mt: "9px"
                                        }}>
                                            Optional
                                        </Typography>
                                    </Grid>

                                    <Grid item
                                        xs={12} md={8}
                                        sx={{ alignSelf: "center" }}
                                    >
                                        <TextField 
                                            variant="outlined" 
                                            fullWidth 
                                            id='labelName'
                                            type='text'
                                            label=''
                                            inputMode='text'
                                            defaultValue=""
                                            InputLabelProps={{
                                                style: { color: '#c1c1c1', fontWeight: "400" },
                                            }}
                                            InputProps={{
                                                sx: {
                                                    borderRadius: "16px",
                                                    maxWidth: {xs: "337px", md: "100%"}
                                                },
                                            }}
                                            
                                            error={ errors.labelName ? true : false }
                                            { ...register('labelName') }
                                        />
                                        { errors.labelName && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.labelName?.message }</Box> }
                                    </Grid>
                                </Grid>

                                <Grid container spacing="20px" sx={{my: "31px"}}>
                                    <Grid item
                                        xs={12} md={4}
                                        sx={{ alignSelf: "center"}}
                                    >
                                        <Typography sx={{
                                            fontWeight: "900",
                                            fontSize: {xs: "19.28px", md: "25px"},
                                            lineHeight: {xs: "15.42px", md: "20px"},
                                            letterSpacing: {xs: "-0.1px", md: "-0.13px"}
                                        }}>
                                            Recording Location
                                        </Typography>

                                        <Typography sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: "13.88px", md: "18px"},
                                            lineHeight: {xs: "9.25px", md: "12px"},
                                            letterSpacing: {xs: "-0.1px", md: "-0.13px"},
                                            mt: "9px"
                                        }}>
                                            Optional
                                        </Typography>
                                    </Grid>

                                    <Grid item
                                        xs={12} md={8}
                                        sx={{ alignSelf: "center" }}
                                    >
                                        <TextField 
                                            variant="outlined" 
                                            fullWidth 
                                            id='recordingLocation'
                                            type='text'
                                            label=''
                                            inputMode='text'
                                            defaultValue=""
                                            InputLabelProps={{
                                                style: { color: '#c1c1c1', fontWeight: "400" },
                                            }}
                                            InputProps={{
                                                sx: {
                                                    borderRadius: "16px",
                                                    maxWidth: {xs: "337px", md: "100%"}
                                                },
                                            }}
                                            
                                            error={ errors.recordingLocation ? true : false }
                                            { ...register('recordingLocation') }
                                        />
                                        { errors.recordingLocation && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.recordingLocation?.message }</Box> }
                                    </Grid>
                                </Grid>

                                <Grid container spacing="20px" sx={{my: "31px"}}>
                                    <Grid item xs={12} md={4} sx={{display: {xs: "none", md: "initial"}}}></Grid>

                                    <Grid item xs={12} md={8}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                // justifyContent: "center",
                                                alignItems: {xs: "center", sm: "initial"}
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: "900",
                                                    fontSize: {xs: "12.4px", md: "26px"},
                                                    lineHeight: {xs: "19.07px", md: "40px"},
                                                    letterSpacing: {xs: "-0.06px", md: "-0.13px"}
                                                }}
                                            >
                                                Can this release be sold worldwide?
                                            </Typography>

                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    gap: "15px",
                                                    mt: "21px",
                                                }}
                                            >
                                                <Box 
                                                    sx={{
                                                        p: {xs: "10.18px 19.68px 10.18px 19.68px", md: "15px 29px 15px 29px"},
                                                        borderRadius: {xs: "8.14px", md: "12px"},

                                                        background: getValues("soldWorldwide") == "Yes" ? "#644986" : darkTheme ? "#fff" : "#272727",
                                                        color: getValues("soldWorldwide") == "Yes" ? "#fff" : darkTheme ? "#000" : "#fff",

                                                        cursor: "pointer",
                                                        display: "inline-block"
                                                    }}
                                                    onClick={() => {
                                                        setValue("soldWorldwide", "Yes");
                                                        setSoldWorldwide("Yes");
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

                                                        background: getValues("soldWorldwide") == "No" ? "#644986" : darkTheme ? "#fff" : "#272727",
                                                        color: getValues("soldWorldwide") == "No" ? "#fff" : darkTheme ? "#000" : "#fff",

                                                        cursor: "pointer",
                                                        display: "inline-block"
                                                    }}
                                                    onClick={() => {
                                                        setValue("soldWorldwide", "No");
                                                        setSoldWorldwide("No");
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
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>

                                <Grid container spacing="20px" sx={{my: "31px"}}>
                                    <Grid item xs={12} md={4} >
                                        <Typography sx={{
                                            fontWeight: "900",
                                            fontSize: {xs: "19.28px", md: "25px"},
                                            lineHeight: {xs: "15.42px", md: "20px"},
                                            letterSpacing: {xs: "-0.1px", md: "-0.13px"}
                                        }}>
                                            UPC/EAN Code
                                        </Typography>

                                        <Typography sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: "13.88px", md: "18px"},
                                            lineHeight: {xs: "9.25px", md: "12px"},
                                            letterSpacing: {xs: "-0.1px", md: "-0.13px"},
                                            mt: "9px"
                                        }}>
                                            Optional
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} md={8}>
                                        <TextField 
                                            variant="outlined" 
                                            fullWidth 
                                            id='UPC_EANcode'
                                            type='text'
                                            label=''
                                            inputMode='text'
                                            defaultValue=""
                                            InputLabelProps={{
                                                style: { color: '#c1c1c1', fontWeight: "400" },
                                            }}
                                            InputProps={{
                                                sx: {
                                                    borderRadius: "16px",
                                                    maxWidth: {xs: "337px", md: "100%"}
                                                },
                                            }}
                                            
                                            error={ errors.UPC_EANcode ? true : false }
                                            { ...register('UPC_EANcode') }
                                        />
                                        <Typography
                                            sx={{
                                                fontWeight: "300",
                                                fontSize: {xs: "11.44px", md: "16px"},
                                                lineHeight: {xs: "11.58px", md: "16px"},
                                                letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                                color: "#fff",
                                                my: 1
                                            }}
                                        >
                                            If you have one, please enter it above. Otherwise, we will generate one for you
                                        </Typography>
                                        { errors.UPC_EANcode && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.UPC_EANcode?.message }</Box> }
                                    </Grid>
                                </Grid>
                            </Box>


                            {
                                apiResponse.display && (
                                    <Stack sx={{ width: '100%', mt: 5, mb: 2 }}>
                                        <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                                    </Stack>
                                )
                            }

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
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
                                    <span style={{ display: isSubmitting ? "none" : "initial" }}>Continue</span>
                                    <CircularProgress size={25} sx={{ display: isSubmitting ? "initial" : "none", color: "#8638E5", fontWeight: "bold" }} />
                                </Button>
                            </Box>

                        </form>
                    </ThemeProvider>
                </Box>
            </Box>


            <SearchArtistModalComponent 
                openSearchArtistModal={openSearchArtistModal}
                closeSearchArtistModal={() => setOpenSearchArtistModal(false) }
                onSaveSelection={handleSetArtistName}
            />

        </AccountWrapper>
    )
}

export default CreateSingleRelease;
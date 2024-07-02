import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SideNav from './SideNav';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { useUserStore } from '@/state/userStore';
import { useSettingStore } from '@/state/settingStore';
// import { createReleaseStore } from '@/state/createReleaseStore';

import AccountWrapper from '@/components/AccountWrapper';

import recordLabelImage from "@/assets/images/recordLabelSignup.jpg";
import testAudio from "@/assets/testAudio.mp3";
import SongPreviewComponent from '@/components/account/SongPreview';


function CreateAlbumReleaseOverview() {
    const navigate = useNavigate();
    const darkTheme = useSettingStore((state) => state.darkTheme);
    const userData = useUserStore((state) => state.userData);
    // const accessToken = useUserStore((state) => state.accessToken);
    const _setToastNotification = useSettingStore((state) => state._setToastNotification);
    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });

    const [image, setImage] = useState();
    const [imagePreview, setImagePreview] = useState();


    const [ audioSongs, setAudioSongs] = useState([
        {
            title: "Good God",
            audio: testAudio,
        },
        {
            title: "Good God",
            audio: testAudio,
        },
        {
            title: "Good God",
            audio: testAudio,
        },
        {
            title: "Good God",
            audio: testAudio,
        }
    ]);

    
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

    const onSubmit = () => {
        console.log(imagePreview);

        setApiResponse({
            display: false,
            status: true,
            message: ""
        });

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


        const data2db = new FormData();
        data2db.append('email', userData.email);
        data2db.append('release_type', "Single");

        data2db.append('cover_photo', image);

        console.log(data2db);

        navigate("/account/artist/create-single-release-continue");

    }



    return (
        <AccountWrapper>
            <Box sx={{ position: "relative", zIndex: 10 }}>

                <Box sx={{ display: {xs: 'initial', sm: 'flex'}, height: "100%" }}>
                    <SideNav activePageNumber={6} />

                    <Box component="main" sx={{ flexGrow: 1, px: 3,  }}>
                        <Box sx={{ display: {xs: 'none', sm: "initial"} }}>
                            <Toolbar />

                            <Stack direction="row" spacing="20px" alignItems="center">
                                <IconButton 
                                    onClick={() => navigate(-1)}
                                    sx={{
                                        color: darkTheme ? "#fff" : "#000", 
                                        mb: 2,
                                        display: {xs: "none", sm: "block"}
                                    }}
                                >
                                    <ChevronLeftIcon />
                                </IconButton>

                                <Typography 
                                    sx={{
                                        fontWeight: "900",
                                        fontSize: {xs: "24.74px", sm: "30px"},
                                        lineHeight: {xs: "26.31px", sm: "50.77px"},
                                        letterSpacing: {xs: "-0.55px", sm: "-1.07px"},
                                    }}
                                >
                                    Overview
                                </Typography>
                            </Stack>
                        </Box>


                        <Box sx={{my: 3, mx: "auto", width: "100%", maxWidth: "892px"}}>

                            <Box
                                sx={{
                                    maxWidth: {xs: "330px", sm: "892px"},
                                    border: {xs: "0.45px solid #FFFFFF", sm: "1px solid #FFFFFF"},
                                    borderRadius: {xs: "5.42px", sm: "12px"},
                                    overflow: "hidden",
                                    width: "100%",
                                    mx: "auto"
                                }}
                            >
                                <Box
                                    sx={{
                                        height: {xs: "32.53px", sm: "72px"},
                                        bgcolor: "#272727",
                                        borderBottom: {xs: "0.45px solid #FFFFFF", sm: "1px solid #FFFFFF"},
                                        px: {xs: "10px", sm: "25px"},
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
                                            fontSize: {xs: "15px", sm: "20px"},
                                            lineHeight: {xs: "20px", sm: "40px"},
                                            letterSpacing: {xs: "-0.06px", sm: "-0.13px"}
                                        }}
                                    >Details</Typography>

                                    <Typography
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: "15px", sm: "20px"},
                                            lineHeight: {xs: "20px", sm: "40px"},
                                            letterSpacing: {xs: "-0.06px", sm: "-0.13px"}
                                        }}
                                    >Edit</Typography>
                                </Box>

                                <Box
                                    sx={{
                                        p: {xs: "10px", sm: "25px"},
                                        bgcolor: darkTheme ? "#000" : "#797979",
                                        mt: {xs: "15px", sm: "0px"}
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: '900',
                                            fontSize: {xs: "15px", sm: "33px"},
                                            lineHeight: {xs: "10.84px", sm: "24px"},
                                            letterSpacing: {xs: "-0.61px", sm: "-1.34px"},
                                        }}
                                    >Good God: Joseph solomon</Typography>

                                    <Box sx={{ mt: {xs: "15px", sm: "30px"} }}>
                                        <Stack direction="row" spacing={"auto"} justifyContent="space-between" alignItems="center">
                                            <Typography
                                                sx={{
                                                    fontWeight: "400",
                                                    fontSize: {xs: "13px", sm: "15px"},
                                                    lineHeight: {xs: "25px", sm: "40px"},
                                                    letterSpacing: "-0.13px"
                                                }}
                                            >Release date</Typography>

                                            <Typography
                                                sx={{
                                                    fontWeight: "400",
                                                    fontSize: {xs: "13px", sm: "15px"},
                                                    lineHeight: {xs: "25px", sm: "40px"},
                                                    letterSpacing: "-0.13px"
                                                }}
                                            >20-May-2024</Typography>
                                        </Stack>
                                        
                                        <Stack direction="row" spacing={"auto"} justifyContent="space-between" alignItems="center">
                                            <Typography
                                                sx={{
                                                    fontWeight: "400",
                                                    fontSize: {xs: "13px", sm: "15px"},
                                                    lineHeight: {xs: "25px", sm: "40px"},
                                                    letterSpacing: "-0.13px"
                                                }}
                                            >Label</Typography>

                                            <Typography
                                                sx={{
                                                    fontWeight: "400",
                                                    fontSize: {xs: "13px", sm: "15px"},
                                                    lineHeight: {xs: "25px", sm: "40px"},
                                                    letterSpacing: "-0.13px"
                                                }}
                                            >Joseph solomon</Typography>
                                        </Stack>

                                        <Stack direction="row" spacing={"auto"} justifyContent="space-between" alignItems="center">
                                            <Typography
                                                sx={{
                                                    fontWeight: "400",
                                                    fontSize: {xs: "13px", sm: "15px"},
                                                    lineHeight: {xs: "25px", sm: "40px"},
                                                    letterSpacing: "-0.13px"
                                                }}
                                            >ISRC</Typography>

                                            <Typography
                                                sx={{
                                                    fontWeight: "400",
                                                    fontSize: {xs: "13px", sm: "15px"},
                                                    lineHeight: {xs: "25px", sm: "40px"},
                                                    letterSpacing: "-0.13px"
                                                }}
                                            >TCAIH2403832</Typography>
                                        </Stack>

                                        <Stack direction="row" spacing={"auto"} justifyContent="space-between" alignItems="center">
                                            <Typography
                                                sx={{
                                                    fontWeight: "400",
                                                    fontSize: {xs: "13px", sm: "15px"},
                                                    lineHeight: {xs: "25px", sm: "40px"},
                                                    letterSpacing: "-0.13px"
                                                }}
                                            >UPC</Typography>

                                            <Typography
                                                sx={{
                                                    fontWeight: "400",
                                                    fontSize: {xs: "13px", sm: "15px"},
                                                    lineHeight: {xs: "25px", sm: "40px"},
                                                    letterSpacing: "-0.13px"
                                                }}
                                            >859788645275</Typography>
                                        </Stack>

                                        <Stack direction="row" spacing={"auto"} justifyContent="space-between" alignItems="center">
                                            <Typography
                                                sx={{
                                                    fontWeight: "400",
                                                    fontSize: {xs: "13px", sm: "15px"},
                                                    lineHeight: {xs: "25px", sm: "40px"},
                                                    letterSpacing: "-0.13px"
                                                }}
                                            >Primary Genre</Typography>

                                            <Typography
                                                sx={{
                                                    fontWeight: "400",
                                                    fontSize: {xs: "13px", sm: "15px"},
                                                    lineHeight: {xs: "25px", sm: "40px"},
                                                    letterSpacing: "-0.13px"
                                                }}
                                            >Alternative</Typography>
                                        </Stack>

                                        <Stack direction="row" spacing={"auto"} justifyContent="space-between" alignItems="center">
                                            <Typography
                                                sx={{
                                                    fontWeight: "400",
                                                    fontSize: {xs: "13px", sm: "15px"},
                                                    lineHeight: {xs: "25px", sm: "40px"},
                                                    letterSpacing: "-0.13px"
                                                }}
                                            >Secondary Genre</Typography>

                                            <Typography
                                                sx={{
                                                    fontWeight: "400",
                                                    fontSize: {xs: "13px", sm: "15px"},
                                                    lineHeight: {xs: "25px", sm: "40px"},
                                                    letterSpacing: "-0.13px"
                                                }}
                                            >Alternative</Typography>
                                        </Stack>

                                        <Stack direction="row" spacing={"auto"} justifyContent="space-between" alignItems="center">
                                            <Typography
                                                sx={{
                                                    fontWeight: "400",
                                                    fontSize: {xs: "13px", sm: "15px"},
                                                    lineHeight: {xs: "25px", sm: "40px"},
                                                    letterSpacing: "-0.13px"
                                                }}
                                            >Language</Typography>

                                            <Typography
                                                sx={{
                                                    fontWeight: "400",
                                                    fontSize: {xs: "13px", sm: "15px"},
                                                    lineHeight: {xs: "25px", sm: "40px"},
                                                    letterSpacing: "-0.13px"
                                                }}
                                            >English</Typography>
                                        </Stack>
                                    </Box>
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    maxWidth: {xs: "330px", sm: "892px"},
                                    border: {xs: "0.45px solid #FFFFFF", sm: "1px solid #FFFFFF"},
                                    borderRadius: {xs: "5.42px", sm: "12px"},
                                    overflow: "hidden",
                                    width: "100%",
                                    mt: "25px",
                                    mx: "auto",
                                }}
                            >
                                <Box
                                    sx={{
                                        height: {xs: "32.53px", sm: "72px"},
                                        bgcolor: "#272727",
                                        borderBottom: {xs: "0.45px solid #FFFFFF", sm: "1px solid #FFFFFF"},
                                        px: {xs: "10px", sm: "25px"},
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
                                            fontSize: {xs: "15px", sm: "20px"},
                                            lineHeight: {xs: "20px", sm: "40px"},
                                            letterSpacing: {xs: "-0.06px", sm: "-0.13px"}
                                        }}
                                    >Selected Stores</Typography>
                                    
                                    <Typography
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: "15px", sm: "20px"},
                                            lineHeight: {xs: "20px", sm: "40px"},
                                            letterSpacing: {xs: "-0.06px", sm: "-0.13px"},
                                            cursor: "pointer"
                                        }}
                                    >Edit</Typography>
                                </Box>

                                <Box
                                    sx={{
                                        p: {xs: "10px", sm: "25px"},
                                        bgcolor: darkTheme ? "#000" : "#797979",

                                        display: "flex",
                                        justifyItems: "center",
                                        alignItems: "center"
                                    }}
                                >
                                    

                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    maxWidth: {xs: "330px", sm: "892px"},
                                    border: {xs: "0.45px solid #FFFFFF", sm: "1px solid #FFFFFF"},
                                    borderRadius: {xs: "5.42px", sm: "12px"},
                                    overflow: "hidden",
                                    mt: "25px",
                                    mx: "auto",
                                }}
                            >
                                <Box
                                    sx={{
                                        height: {xs: "32.53px", sm: "72px"},
                                        bgcolor: "#272727",
                                        borderBottom: {xs: "0.45px solid #FFFFFF", sm: "1px solid #FFFFFF"},
                                        px: {xs: "10px", sm: "25px"},
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: {xs: "10px", sm: "20px"},
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: "14px", sm: "20px"},
                                            lineHeight: {xs: "20px", sm: "40px"},
                                            letterSpacing: {xs: "-0.06px", sm: "-0.13px"}
                                        }}
                                    >Social Platforms - Automatically Selected</Typography>

                                     
                                    <Typography
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: "15px", sm: "20px"},
                                            lineHeight: {xs: "20px", sm: "40px"},
                                            letterSpacing: {xs: "-0.06px", sm: "-0.13px"},
                                            cursor: "pointer"
                                        }}
                                    >Edit</Typography>
                                </Box>

                                <Box
                                    sx={{
                                        p: {xs: "10px", sm: "25px"},
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
                                            fontSize: {xs: "15px", sm: "20px"},
                                            lineHeight: {xs: "25px", sm: "40px"},
                                            letterSpacing: "-0.13px"
                                        }}
                                    >
                                        You keep 80% of social platform revenue. Please review monetization eligibility requirements for. &#32;
                                        <span style={{textDecoration: "underline"}}>YouTube Content ID </span> &#32; and &#32;
                                        <span style={{textDecoration: "underline"}}>Facebook/Instagram/Reels.</span> &#32;
                                        Delivering ineligible content can result in account suspension. 
                                        <b> Click 'Edit' to remove a social platform. </b>
                                    </Typography>


                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    maxWidth: {xs: "330px", sm: "892px"},
                                    border: {xs: "0.45px solid #FFFFFF", sm: "1px solid #FFFFFF"},
                                    borderRadius: {xs: "5.42px", sm: "12px"},
                                    overflow: "hidden",
                                    mt: "25px",
                                    mx: "auto",
                                }}
                            >
                                <Box
                                    sx={{
                                        height: {xs: "32.53px", sm: "72px"},
                                        bgcolor: "#272727",
                                        borderBottom: {xs: "0.45px solid #FFFFFF", sm: "1px solid #FFFFFF"},
                                        px: {xs: "10px", sm: "25px"},
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: {xs: "10px", sm: "20px"},
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: "14px", sm: "20px"},
                                            lineHeight: {xs: "20px", sm: "40px"},
                                            letterSpacing: {xs: "-0.06px", sm: "-0.13px"}
                                        }}
                                    > Song </Typography>
                                     
                                    <Typography
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: "15px", sm: "20px"},
                                            lineHeight: {xs: "20px", sm: "40px"},
                                            letterSpacing: {xs: "-0.06px", sm: "-0.13px"},
                                            cursor: "pointer"
                                        }}
                                    > Edit </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        p: {xs: "10px", sm: "25px"},
                                        bgcolor: darkTheme ? "#000" : "#797979",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyItems: "center",
                                        alignItems: "center"
                                    }}
                                >
                                    {
                                        audioSongs.map((item, i) => (
                                            <Box key={i} width="100%">
                                                {
                                                    item.audio ? (
                                                        <SongPreviewComponent 
                                                            songAudio={item.audio} 
                                                            songTitle={item.title}
                                                            deleteSong={() => {
                                                                const result = audioSongs.map((_item, index) => {
                                                                    if (index == i) return({ title: '', audio: '' });
                                                                    return _item;
                                                                });
                                                                
                                                                // const result = audioSongs.filter((_item, index) => index != i);
                                                                setAudioSongs(result);
                                                            }} 
                                                        />

                                                    ) : <></>
                                                }
                                            </Box>
                                        ))
                                    }
                                </Box>
                            </Box>


                            <Stack direction="column" justifyContent="center" alignItems="center"
                                sx={{ p: {xs: "10px", sm: "25px"} }}
                            >
                                <Box sx={{ width: {xs: "90%", sm: "347px"}, maxWidth: {xs: "330px", sm: "892px"} }}>
                                    <Typography component={"h3"} variant='h3'
                                        sx={{
                                            fontWeight: "900",
                                            fontSize: {xs: "13px", sm: "16px"},
                                            lineHeight: {xs: "25px", sm: "32px"},
                                            letterSpacing: "-0.13px",
                                            // bgcolor: "green",
                                            alignSelf: "start"
                                        }}
                                    > Album art </Typography>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "end",
                                            alignItems: "center",
                                            bgcolor: "#272727",
                                            borderRadius: "12px",
                                            height: {xs: "146.55px", sm: "326px"},
                                            // width: {xs: "128.45px", sm: "347px"},
                                            // width: "100%",
                                            my: {xs: "10px", sm: "20px"},
                                            p: {xs: "5px 5px 10px 5px", sm: "5px 5px 25px 5px"},

                                            backgroundImage: `url(${recordLabelImage})`, // Replace with your image URL
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                        }}
                                    >
                                        <Box></Box>

                                        <Box 
                                            sx={{
                                                p: {xs: "10.18px 19.68px", sm: "15px 29px"},
                                                borderRadius: {xs: "8.14px", sm: "12px"},
                                                // background: "#FFFFFF80",
                                                background: "#c4c4c480",

                                                color: "#000",
                                                cursor: "pointer",
                                                display: "inline-block",
                                                mt: {xs: "7px", sm: "15px"},
                                                position: "",
                                                // bottom: 0
                                            }}
                                            onClick={() => {
                                                document.getElementById("uploadSongCoverImage")?.click();
                                            }}
                                        >
                                            <Typography 
                                                sx={{
                                                    fontWeight: '900',
                                                    fontSize: {xs: "10.18px", sm: "15px"},
                                                    lineHeight: {xs: "8.82px", sm: "13px"},
                                                    letterSpacing: {xs: "-0.09px", sm: "-0.13px"},
                                                    textAlign: 'center',
                                                }}
                                            > Edit </Typography>
                                        </Box>
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

                            <Stack justifyContent="center" alignItems="center">

                                <Button variant="contained" fullWidth
                                    onClick={() => onSubmit()}
                                    // disabled={ !isValid || isSubmitting } 
                                    sx={{ 
                                        bgcolor: "#fff",
                                        maxWidth: "312px",
                                        "&.Mui-disabled": {
                                            background: "#9c9c9c",
                                            color: "#797979"
                                        },
                                        "&:hover": {
                                            bgcolor: "#fff",
                                        },
                                        "&:active": {
                                            bgcolor: "#fff",
                                        },
                                        "&:focus": {
                                            bgcolor: "#fff",
                                        },
                                        color: "#000",
                                        borderRadius: "12px",
                                        my: 3, py: 1.5,
                                        fontSize: {sm: "15.38px"},
                                        fontWeight: "900",
                                        letterSpacing: "-0.12px",
                                        textTransform: "none"
                                    }}
                                > Save Release </Button>
                            </Stack>
                        </Box>
                    </Box>
                </Box>

            </Box>


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

export default CreateAlbumReleaseOverview;
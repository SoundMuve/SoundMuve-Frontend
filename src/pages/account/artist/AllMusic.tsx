import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import albumImage from '@/assets/images/album.png';

import AccountWrapper from '@/components/AccountWrapper';
import { useSettingStore } from '@/state/settingStore';


const albumSongs = [
    {
        musicImg: albumImage,
        songTitle: "Good God",
        artistName: "Joseph solomon",
        status: "Complete"
    },
    {
        musicImg: albumImage,
        songTitle: "Good God",
        artistName: "Joseph solomon",
        status: "Complete"
    },
    {
        musicImg: albumImage,
        songTitle: "Good God",
        artistName: "Joseph solomon",
        status: "Incomplete"
    },
    {
        musicImg: albumImage,
        songTitle: "Good God",
        artistName: "Joseph solomon",
        status: "Complete"
    },
    {
        musicImg: albumImage,
        songTitle: "Good God",
        artistName: "Joseph solomon",
        status: "Complete"
    },
    {
        musicImg: albumImage,
        songTitle: "Good God",
        artistName: "Joseph solomon",
        status: "Complete"
    },
    {
        musicImg: albumImage,
        songTitle: "Good God",
        artistName: "Joseph solomon",
        status: "Error"
    },
    {
        musicImg: albumImage,
        songTitle: "Good God",
        artistName: "Joseph solomon",
        status: "Complete"
    },
    {
        musicImg: albumImage,
        songTitle: "Good God",
        artistName: "Joseph solomon",
        status: "Complete"
    },
    {
        musicImg: albumImage,
        songTitle: "Good God",
        artistName: "Joseph solomon",
        status: "Complete"
    },
    {
        musicImg: albumImage,
        songTitle: "Good God",
        artistName: "Joseph solomon",
        status: "Error"
    },
    {
        musicImg: albumImage,
        songTitle: "Good God",
        artistName: "Joseph solomon",
        status: "Error"
    },
];


function AllMusic() {
    const navigate = useNavigate();
    const [albumType, setAlbumType] = useState<"Single" | "Album">("Single");
    const darkTheme = useSettingStore((state) => state.darkTheme);


    return (
        <AccountWrapper>
            <Box sx={{px: {xs: 2, md: 5, lg: 12}, pb: 5, position: "relative", zIndex: 10, mt: {xs: 5, md: 10}  }}>

                <Stack direction={"row"} spacing={"20px"} justifyContent={"space-between"} alignItems={"center"}>
                    <IconButton 
                        onClick={() => navigate(-1)}
                        sx={{
                            color: darkTheme ? "#fff" : "#000", 
                            mb: 2,
                        }}
                    >
                        <ChevronLeftIcon />
                    </IconButton>


                    <Box></Box>
                </Stack>


                <Typography 
                    sx={{
                        fontWeight: "900",
                        // fontSize: {xs: "39.96px", md: "60px"},
                        fontSize: {xs: "35px", md: "60px"},
                        lineHeight: {xs: "24px", md: "24px"},
                        letterSpacing: {xs: "-0.89px", md: "-1.34px"},
                        my: {xs: "50px", md: "100px"},
                    }}
                >
                    Your Releases
                </Typography>


                <Box 
                    sx={{ 
                        width: "100%",
                        maxWidth: {xs: "401.95px", md: "518px"},
                        height: {xs: "39px", md: "50.26px"},
                        borderRadius: {xs: "7.55px", md: "9.73px"},
                        bgcolor: "#D9D9D9",

                        border: {xs: "0.63px solid #000000", md: "0.81px solid #000000"},
                        my: {xs: 2, md: 4},
                        mx: "auto",
                        px: "2px",

                        display: "flex",
                        alignItems: "center",
                    }} 
                >
                    <Box onClick={() => setAlbumType('Single') }
                        sx={ albumType === "Single" ? {
                            width: "100%",
                            maxWidth: {xs: "200.03px", md: "257.78px"},
                            height: {xs: "34.6px", md: "44.59px"},
                            bgcolor: "#000000",
                            border: {xs: "0.63px solid #FFFFFF", md: "0.81px solid #FFFFFF" },
                            borderRadius: {xs: "7.55px", md: "9.73px"},
                            color: "#CACACA",

                            display: "flex",
                            alignItems: "center",
                        } : {
                            width: "100%",
                            maxWidth: {xs: "200.03px", md: "257.78px"},
                            height: {xs: "34.6px", md: "44.59px"},
                            color: "#666666",

                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer"
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: "900",
                                fontSize: {xs: "22.02px", md: "28.37px"},
                                lineHeight: {xs: "15.1px", md: "19.46px"},
                                letterSpacing: {xs: "-0.84px", md: "-1.09px"},
                                mx: 'auto'
                            }}
                        > Single </Typography>
                    </Box>

                    <Box onClick={() => setAlbumType('Album') }
                        sx={ albumType === "Single" ? {
                            width: "100%",
                            maxWidth: {xs: "200.03px", md: "257.78px"},
                            height: {xs: "34.6px", md: "44.59px"},
                            color: "#666666",

                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer"
                        } : {
                            width: "100%",
                            maxWidth: {xs: "200.03px", md: "257.78px"},
                            height: {xs: "34.6px", md: "44.59px"},
                            bgcolor: "#000000",
                            border: {xs: "0.63px solid #FFFFFF", md: "0.81px solid #FFFFFF" },
                            borderRadius: {xs: "7.55px", md: "9.73px"},
                            color: "#CACACA",

                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: "900",
                                fontSize: {xs: "22.02px", md: "28.37px"},
                                lineHeight: {xs: "15.1px", md: "19.46px"},
                                letterSpacing: {xs: "-0.84px", md: "-1.09px"},
                                m: 'auto'
                            }}
                        > Album </Typography>
                    </Box>
                </Box>

                <Grid container spacing="20px">
                    {
                        albumSongs.map((song, index) => (
                            <Grid item xs={6} md={4} key={index}>
                                <Box 
                                    sx={{ 
                                        width: "95%",
                                        // mx: "auto"
                                    }}
                                >
                                    <Box
                                        sx={{
                                            height: {xs: "152.99px", md: "268px"},
                                            borderRadius: {xs: "6.85px", md: "12px"},
                                            bgcolor: "#343434",
                                            textAlign: "center",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}
                                    >
                                        <Box 
                                            sx={{
                                                width: {xs: "124.48px", md: "218.06px"},
                                                height: {xs: "124.48px", md: "218.06px"}
                                            }}
                                        >
                                            <img
                                                src={song.musicImg} alt='album image'
                                                style={{
                                                    width: "100%",
                                                    objectFit: "contain"
                                                }}
                                            />
                                        </Box>
                                    </Box>

                                    <Typography
                                        sx={{
                                            fontWeight: "900",
                                            fontSize: {xs: "10.85px", md: "19px"},
                                            lineHeight: {xs: "13.7px", md: "24px"},
                                            letterSpacing: {xs: "-0.77px", md: "-1.34px"},
                                            // color: "#fff",
                                            my: {xs: "8px 0 0 0", md: "8px 0 8px 0"}
                                        }}
                                    > { song.songTitle } </Typography>


                                    <Typography
                                        sx={{
                                            display: albumType == "Album" ? "block" : "none",
                                            fontWeight: "400",
                                            fontSize: {xs: "8.02px", md: "15px"},
                                            lineHeight: {xs: "12.83px", md: "24px"},
                                            // letterSpacing: {xs: "-0.77px", md: "-1.34px"},
                                            color: "#979797",
                                            mb: {md: 1}
                                        }}
                                    > Album </Typography>


                                    <Box
                                        sx={{
                                            // bgcolor: "#B4D28A",
                                            bgcolor: song.status == 'Complete' ? "#B4D28A" : song.status == 'Incomplete' ? "#D3AA5A" : song.status == 'Error' ? "#ffc9d9" : "#c4c4c4",

                                            p: {xs: "0px 11.99px 0px 11.99px", md: "0px 21px 0px 21px"},
                                            borderRadius: {xs: "15.98px", md: "28px"},
                                            display: "inline-block"
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: song.status == 'Complete' ? "#33500B" : song.status == 'Incomplete' ? "#7F580C" : song.status == 'Error' ? "#de2341" : "#343434",
                                                fontSize: {xs: "6.28px", md: "11px"},
                                                lineHeight: {xs: "13.7px", md: "24px"},
                                                letterSpacing: {xs: "0.06px", md: "0.1px"}
                                            }}
                                        > { song.status } </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        ))
                    }
                </Grid>

            </Box>


        </AccountWrapper>
    )
}

export default AllMusic;

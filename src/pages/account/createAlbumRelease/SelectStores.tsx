import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import SideNav from './SideNav';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { ThemeProvider, useTheme } from '@mui/material/styles';

import { useUserStore } from '@/state/userStore';
import { useSettingStore } from '@/state/settingStore';
import { createReleaseStore } from '@/state/createReleaseStore';

import AccountWrapper from '@/components/AccountWrapper';
import { customTextFieldTheme } from '@/util/mui';
import { musicStores, socialPlatformStores } from '@/util/resources';

const formSchema = yup.object({
    store: yup.string().trim().label("Store"),
    socialPlatform: yup.string().trim().label("Social Platform"),
});


function CreateAlbumReleaseSelectStores() {
    const navigate = useNavigate();
    const outerTheme = useTheme();
    const darkTheme = useSettingStore((state) => state.darkTheme);
    const userData = useUserStore((state) => state.userData);
    const _setToastNotification = useSettingStore((state) => state._setToastNotification);
    const _setAlbumReleaseStores = createReleaseStore((state) => state._setAlbumReleaseStores);

    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });

    const { 
        handleSubmit, register, setError, formState: { errors, isValid, isSubmitting } 
    } = useForm({ 
        resolver: yupResolver(formSchema),
        mode: 'onBlur',
    });

            
    const onSubmit = async (formData: typeof formSchema.__outputType) => {

        setApiResponse({
            display: false,
            status: true,
            message: ""
        });

        if (formData.store && formData.store == "Select" ) {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Select stores to distribute your music to."
            })

            setError("store", {message: "Select stores to distribute your music to."})
            return;
        }

        if (formData.socialPlatform && formData.socialPlatform == "Select" ) {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Select social platforms to distribute your music to."
            })

            setError("socialPlatform", { message: "Select social platforms to distribute your music to." })
            return;
        }
        

        const data2db = {
            email: userData.email,
            release_type: "Album",

            stores: formData.store || "All",
            socialPlatforms: formData.socialPlatform || "All",
        };

        // console.log(data2db);
        _setAlbumReleaseStores(data2db);
        navigate("/account/artist/create-album-release-song-upload");

        return;
    }



    return (
        <AccountWrapper>
            <Box sx={{ position: "relative", zIndex: 10 }}>

                <Box sx={{ display: {xs: 'initial', sm: 'flex'}, height: "100%" }}>
                    <SideNav activePageNumber={3} />

                    <Box component="main" sx={{ flexGrow: 1, px: 3,  }}>
                        <Box sx={{ display: {xs: 'none', sm: "initial"} }}>
                            <Toolbar />
                        </Box>


                        <Box sx={{my: 3}}>
                            <ThemeProvider theme={customTextFieldTheme(outerTheme, darkTheme)}>
                                <form noValidate onSubmit={ handleSubmit(onSubmit) } 
                                    style={{ width: "100%", maxWidth: "916px" }}
                                >
                                                
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
                                            >Select Stores</Typography>
                                            
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

                                                { errors.store && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.store?.message }</Box> }
                                            </FormControl>

                                        </Box>
                                    </Box>

                                    <Box
                                        sx={{
                                            maxWidth: {xs: "330px", md: "892px"},
                                            border: {xs: "0.45px solid #FFFFFF", md: "1px solid #FFFFFF"},
                                            borderRadius: {xs: "5.42px", md: "12px"},
                                            overflow: "hidden",
                                            mt: "25px"
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

                                                { errors.socialPlatform && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.socialPlatform?.message }</Box> }
                                            </FormControl>

                                        </Box>
                                    </Box>



                                    {
                                        apiResponse.display && (
                                            <Stack sx={{ width: '100%', mt: 5, mb: 2 }}>
                                                <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                                            </Stack>
                                        )
                                    }

                                    <Box mt="100px">
                                        <Stack direction="row" justifyContent="space-between" spacing="20px" alignItems="center">
                                            <Button variant="contained" 
                                                fullWidth type='button'
                                                onClick={() => navigate("/account/artist/create-album-release-advance-features")}
                                                sx={{ 
                                                    bgcolor: darkTheme ? "#4C4C4C57" : "#9c9c9c",
                                                    maxWidth: "312px",
                                                    "&.Mui-disabled": {
                                                        background: "#9c9c9c",
                                                        color: "#797979"
                                                    },
                                                    "&:hover": {
                                                        bgcolor: darkTheme ? "#4C4C4C57" : "#9c9c9c",
                                                    },
                                                    "&:active": {
                                                        bgcolor: darkTheme ? "#4C4C4C57" : "#9c9c9c",
                                                    },
                                                    "&:focus": {
                                                        bgcolor: darkTheme ? "#4C4C4C57" : "#9c9c9c",
                                                    },
                                                    color: "#fff",
                                                    borderRadius: "12px",
                                                    my: 3, py: 1.5,
                                                    fontSize: {md: "15.38px"},
                                                    fontWeight: "900",
                                                    letterSpacing: "-0.12px",
                                                    textTransform: "none"
                                                }}
                                            > Previous step </Button>

                                            <Button variant="contained" 
                                                fullWidth type="submit" 
                                                disabled={ !isValid || isSubmitting } 
                                                sx={{ 
                                                    bgcolor: "#644986",
                                                    maxWidth: "312px",
                                                    "&.Mui-disabled": {
                                                        background: "#9c9c9c",
                                                        color: "#797979"
                                                    },
                                                    "&:hover": {
                                                        bgcolor: "#644986",
                                                    },
                                                    "&:active": {
                                                        bgcolor: "#644986",
                                                    },
                                                    "&:focus": {
                                                        bgcolor: "#644986",
                                                    },
                                                    color: "#fff",
                                                    borderRadius: "12px",
                                                    my: 3, py: 1.5,
                                                    fontSize: {md: "15.38px"},
                                                    fontWeight: "900",
                                                    letterSpacing: "-0.12px",
                                                    textTransform: "none"
                                                }}
                                            >
                                                <span style={{ display: isSubmitting ? "none" : "initial" }}>Next</span>
                                                <CircularProgress size={25} sx={{ display: isSubmitting ? "initial" : "none", color: "#8638E5", fontWeight: "bold" }} />
                                            </Button>
                                        </Stack>
                                    </Box>

                                </form>
                            </ThemeProvider>
                        </Box>
                    </Box>
                </Box>

            </Box>
        </AccountWrapper>
    )
}

export default CreateAlbumReleaseSelectStores;
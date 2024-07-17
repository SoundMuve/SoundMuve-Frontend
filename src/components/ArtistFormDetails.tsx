import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
// import axios from 'axios';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { getCountries, getUserLocation } from '@/util/location';
// import { apiEndpoint } from '@/util/resources';
import { useUserStore } from '@/state/userStore';
import { restCountries } from '@/util/countries';
import { useSettingStore } from '@/state/settingStore';
import { MuiTextFieldStyle } from '@/util/mui';


const formSchema = yup.object({
    artistName: yup.string().required().min(2).trim().label("First Name"),

    email: yup.string().required()
    .email("Please enter a valid email address.")
    .matches(/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)*|\"([^\\]\\\"]|\\.)*\")@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
    , "Please enter a valid email address.")
    .trim().label("Email Address"),

    phoneNumber: yup.string().required().min(7, "Incorrect phone number").max(15, "Incorrect phone number").trim().label("Phone Number"),
    country: yup.string().required().min(2).trim().label("Country"),
    gender: yup.string().required().min(2).trim().label("Gender"),
});

  
function ArtistFormDetailsComponent() {
    // const navigate = useNavigate();
    const [countries, setCountries] = useState(restCountries);
    const [userCountry, setUserCountry] = useState("");
    const userData = useUserStore((state) => state.userData);
    const darkTheme = useSettingStore((state) => state.darkTheme);
             
    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });
    // const _setToastNotification = useSettingStore((state) => state._setToastNotification);
    
    
    const { 
        handleSubmit, register, setValue, formState: { errors, isValid, isSubmitting } 
    } = useForm({ resolver: yupResolver(formSchema), mode: 'onBlur', reValidateMode: 'onChange' });

    useEffect(() => {
        const sortedCountries = countries.sort((a: any, b: any) => {
            if (a.name.common < b.name.common) return -1;
            if (a.name.common > b.name.common) return 1;
            return 0;
        });
        setCountries(sortedCountries);

        getCountries().then((countryRes) => {
            setCountries(countryRes);
    
            getUserLocation().then((res) => {
                setValue("country", res.country);

                setTimeout(() => {
                    
                    setUserCountry(res.country);
                }, 500);
            })
        });
    }, []);
    
        
    const onSubmit = async (formData: typeof formSchema.__outputType) => {
        setApiResponse({
            display: false,
            status: true,
            message: ""
        });
        
        const data2db = {
            email: userData.email,
            teamType: "Artist",
            ArtistName: formData.artistName,
            country: formData.country,
            phoneNumber: formData.phoneNumber,
            gender: formData.gender,
        };
        console.log(data2db);

        // try {
        //     const response = (await axios.patch(`${apiEndpoint}/auth/updateTeam-details`, data2db )).data;
        //     // console.log(response);

        //     _signUpUser(response.singleUser);
            
        //     setApiResponse({
        //         display: true,
        //         status: true,
        //         message: response.message
        //     });
        //     _setToastNotification({
        //         display: true,
        //         status: "success",
        //         message: response.message
        //     });

        //     navigate("/auth/login", {replace: true});
        // } catch (error: any) {
        //     const err = error.response.data;
        //     console.log(err);

        //     setApiResponse({
        //         display: true,
        //         status: false,
        //         message: err.message || "Oooops, failed to update details. please try again."
        //     });
        // }
    }


    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <form noValidate onSubmit={ handleSubmit(onSubmit) } 
                style={{
                    width: "100%",
                    maxWidth: "734px",
                }}
            >
                <Typography sx={{
                    fontWeight: "900",
                    fontSize: {xs: 45, md: 60},
                    lineHeight: {xs: "53px", md: "73.79px"},
                    letterSpacing: "-1.34px",
                    textAlign: 'center'
                }}>Add Artist</Typography>

                <Box sx={{ my: 3 }}>
                    <Typography sx={{
                        fontWeight: "400",
                        fontSize: "15.38px",
                        lineHeight: "38.44px",
                        letterSpacing: "-0.12px"
                    }}>
                        Artist Name
                    </Typography>

                    <TextField 
                        variant="outlined" 
                        fullWidth 
                        id='artistName'
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
                            },
                        }}
                        sx={MuiTextFieldStyle(darkTheme)}
                        
                        error={ errors.artistName ? true : false }
                        { ...register('artistName') }
                    />
                    { errors.artistName && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.artistName?.message }</Box> }
                </Box>

                <Box sx={{ my: 3 }}>
                    <Typography sx={{
                        fontWeight: "400",
                        fontSize: "15.38px",
                        lineHeight: "38.44px",
                        letterSpacing: "-0.12px"
                    }}> Email </Typography>

                    <TextField 
                        variant="outlined" 
                        fullWidth 
                        id='email'
                        type='email'
                        inputMode='email'
                        label=''
                        defaultValue=""
                        InputLabelProps={{
                            style: { color: '#c1c1c1', fontWeight: "400" },
                        }}
                        InputProps={{
                            sx: {
                                borderRadius: "16px",
                            },
                        }}
                        sx={MuiTextFieldStyle(darkTheme)}
                        
                        error={ errors.email ? true : false }
                        { ...register('email') }
                    />
                    { errors.email && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.email?.message }</Box> }
                </Box>

                <Box sx={{ my: 3 }}>
                    <Typography sx={{
                        fontWeight: "400",
                        fontSize: "15.38px",
                        lineHeight: "38.44px",
                        letterSpacing: "-0.12px"
                    }}>
                        Phone number
                    </Typography>

                    <TextField 
                        variant="outlined" 
                        fullWidth 
                        id='phoneNumber'
                        type='tel'
                        inputMode='tel'
                        label=''
                        defaultValue=""
                        InputLabelProps={{
                            style: { color: '#c1c1c1', fontWeight: "400" },
                        }}
                        InputProps={{
                            sx: {
                                borderRadius: "16px",
                            },
                        }}
                        sx={MuiTextFieldStyle(darkTheme)}
                        
                        error={ errors.phoneNumber ? true : false }
                        { ...register('phoneNumber') }
                    />
                    { errors.phoneNumber && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.phoneNumber?.message }</Box> }

                </Box>

                <Box sx={{ my: 3 }}>
                    <Typography sx={{
                        fontWeight: "400",
                        fontSize: "15.38px",
                        lineHeight: "38.44px",
                        letterSpacing: "-0.12px",
                        textAlign: "left"
                    }}>Country</Typography>

                    <FormControl fullWidth>
                        <Select
                            labelId="country"
                            id="country-select"
                            label=""
                            defaultValue=""
                            // value={userCountry}

                            sx={{
                                color: darkTheme ? "white" : '#272727',
                                borderRadius: "13.79px",
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: darkTheme ? 'gray' : 'gray',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: darkTheme ? '#fff' : '#272727', // '#434e5e',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: darkTheme ? '#fff' : '#272727', // 'var(--TextField-brandBorderHoverColor)',
                                },
                                '.MuiSvgIcon-root ': {
                                    fill: `${darkTheme ? '#ccc' : 'black'} !important`,
                                }
                            }}
                            
                            error={ errors.country ? true : false }
                            { ...register('country') }
                        >
                            { countries.map((country: any, index) => (
                                <MenuItem key={index} value={country.name.common} selected={userCountry == country.name.common ? true : false}>
                                    <img src={country.flags.png} alt={country.flags.alt}
                                        style={{
                                            maxWidth: "20px",
                                            marginRight: "10px"
                                        }}
                                    />
                                    {country.name.common}
                                </MenuItem>
                            )) }
                        </Select>
                    </FormControl>

                    { errors.country && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.country?.message }</Box> }

                </Box>

                <Box sx={{ my: 3 }}>
                    <Typography sx={{
                        fontWeight: "400",
                        fontSize: "15.38px",
                        lineHeight: "38.44px",
                        letterSpacing: "-0.12px",
                        textAlign: "left"
                    }}>
                        Gender
                    </Typography>

                    <FormControl fullWidth>
                        <Select
                            labelId="gender"
                            id="gender-select"
                            label=""
                            defaultValue=""

                            sx={{
                                color: darkTheme ? "white" : '#272727',
                                borderRadius: "13.79px",
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: darkTheme ? 'gray' : 'gray',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: darkTheme ? '#fff' : '#272727', // '#434e5e',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: darkTheme ? '#fff' : '#272727', // 'var(--TextField-brandBorderHoverColor)',
                                },
                                '.MuiSvgIcon-root ': {
                                    fill: `${darkTheme ? '#ccc' : 'black'} !important`,
                                }
                            }}
                            
                            error={ errors.gender ? true : false }
                            { ...register('gender') }

                        >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Others">Others</MenuItem>
                        </Select>
                    </FormControl>

                    { errors.gender && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.gender?.message }</Box> }

                </Box>


                {
                    apiResponse.display && (
                        <Stack sx={{ width: '100%', mt: 5, mb: 2 }}>
                            <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                        </Stack>
                    )
                }

                <Button variant="contained" 
                    fullWidth type="submit" 
                    disabled={ !isValid || isSubmitting } 
                    sx={{ 
                        bgcolor: darkTheme ? "#fff" : '#272727',
                        "&.Mui-disabled": {
                            background: "#9c9c9c",
                            color: "#797979"
                        },
                        "&:hover": {
                            bgcolor: darkTheme ? "#fff" : '#272727',
                        },
                        "&:active": {
                            bgcolor: darkTheme ? "#fff" : '#272727',
                        },
                        "&:focus": {
                            bgcolor: darkTheme ? "#fff" : '#272727',
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

            </form>
        </Box>
    )
}

export default ArtistFormDetailsComponent;

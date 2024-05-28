import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider, Theme, useTheme } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';

import AuthHeaderComponent from '../../components/AuthHeader';
import style from '../pricingStyles.module.css';

import recordLabelImage from "./../../assets/images/recordLabelSignup.jpg";
import cloudUpload from "./../../assets/images/cloud_upload.png";

import { getCountries, getUserLocation } from '../../util/location';


const formSchema = yup.object({
    recordLabelName: yup.string().required().min(2).trim().label("First Name"),
    phoneNumber: yup.string().required().min(7, "Incorrect phone number").max(15, "Incorrect phone number").trim().label("Last Name"),
    country: yup.string().required().min(2).trim().label("Country"),
    gender: yup.string().required().min(2).trim().label("Gender"),
});

const customTheme = (outerTheme: Theme) =>
    createTheme({
        palette: {
            mode: outerTheme.palette.mode,
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '--TextField-brandBorderColor': '#FFFFFF',
                        '--TextField-brandBorderHoverColor': '#B2BAC2',
                        '--TextField-brandBorderFocusedColor': '#6F7E8C',
                        '& label.Mui-focused': {
                            color: 'var(--TextField-brandBorderFocusedColor)',
                        },
                        '& .MuiInputBase-input': { // Target input text
                            color: '#fff', // Change to your desired text color
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
  
  
function RecordLabelDetails() {
    const navigate = useNavigate();
    const outerTheme = useTheme();
    const [countries, setCountries] = useState([]);
    const [userCountry, setUserCountry] = useState("");

    const { 
        handleSubmit, register, setValue, formState: { errors, isValid, isSubmitting } 
    } = useForm({ resolver: yupResolver(formSchema), mode: 'onBlur', reValidateMode: 'onChange' });

    useEffect(() => {
        getCountries().then((countryRes) => {
            setCountries(countryRes);
    
            getUserLocation().then((res) => {
                setUserCountry(res.country);

                setValue("country", res.country);
            })
        });

    }, []);
    
    const [image, setImage] = useState();
    const [imagePreview, setImagePreview] = useState();
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

        
    const onSubmit = (formData: typeof formSchema.__outputType) => {
        console.log(formData);

        if (image) {
            
        }


        navigate("/auth/signup-type");
        
    }




    return (
        <>
            <Box sx={{bgcolor: "#000", color: "#fff", minHeight: "100vh", position: "relative", overflow: "hidden"}}>
                <AuthHeaderComponent />

                <Box 
                    sx={{
                        width: '100%',
                        height: '221px',
                        backgroundImage: `url(${recordLabelImage})`, // Replace with your image URL
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        top: "-47px",
                        overflow: "hidden",
                        zIndex: 1
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(180.1deg, rgba(0, 0, 0, 0) 0.08%, #000000 109.84%)',
                        }}
                    />
                    <Typography sx={{
                        fontWeight: "900",
                        fontSize: {xs: 40, md: 60},
                        lineHeight: {xs: "50px", md: "73.79px"},
                        letterSpacing: {xs: '-0.73px', md: "-1.34px"},
                        position: "absolute",
                        mx: "auto",
                        bottom: 20,
                        // left: "40%"
                    }}>
                        Record Label Details
                    </Typography>
                </Box>

                <>
                    <Box sx={{display: { xs: 'none', md: 'block' }}}>
                        <div className={style.topGradient}></div>
                        <div className={style.leftGradient}></div>
                        <div className={style.leftBottomGradient}></div>
                        <div className={style.rightTopGradient}></div>
                        <div className={style.rightBottom2Gradient}></div>
                        <div className={style.btnCenteredGradient}></div>
                        <div className={style.leftBottom2Gradient}></div>
                    </Box>

                    <Box sx={{display: { xs: 'block', md: 'none' }}}>
                        <div className={style.mobileLeftGradient}></div>
                        <div className={style.mobileRightGradient}></div>
                        <div className={style.mobileCenteredGradient}></div>
                    </Box>
                </>


                <Container sx={{position: "relative", top: -47 }}>

                    <ThemeProvider theme={customTheme(outerTheme)}>
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <form noValidate onSubmit={ handleSubmit(onSubmit) } 
                                style={{
                                    width: "100%",
                                    maxWidth: "734px",
                                    // textAlign: "lef"
                                }}
                            >

                                <Box sx={{ my: 3 }}>
                                    <Typography sx={{
                                        fontWeight: "400",
                                        fontSize: "15.38px",
                                        lineHeight: "38.44px",
                                        letterSpacing: "-0.12px"
                                    }}>
                                        Record label name
                                    </Typography>

                                    <TextField 
                                        variant="outlined" 
                                        fullWidth 
                                        id='recordLabelName'
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
                                        
                                        error={ errors.recordLabelName ? true : false }
                                        { ...register('recordLabelName') }
                                    />
                                    { errors.recordLabelName && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.recordLabelName?.message }</Box> }
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
                                    }}>
                                        Country
                                    </Typography>

                                    <FormControl fullWidth>
                                        <Select
                                            labelId="country"
                                            id="country-select"
                                            label=""
                                            defaultValue=""
                                            // value={userCountry}

                                            sx={{
                                                color: "white",
                                                borderRadius: "16px",
                                                '.MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#fff',
                                                },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: 'rgba(228, 219, 233, 0.25)',
                                                },
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: 'var(--TextField-brandBorderHoverColor)', // 'rgba(228, 219, 233, 0.25)',
                                                },
                                                '.MuiSvgIcon-root ': {
                                                    fill: "white !important",
                                                }
                                            }}
                                            
                                            error={ errors.country ? true : false }
                                            { ...register('country') }
                                        >
                                            { countries.map((country: any, index) => (
                                                <MenuItem key={index} value={country.name.common} selected={userCountry == country.name.common ? true : false}>
                                                    <img src={country.flags.png} 
                                                        style={{
                                                            maxWidth: "20px",
                                                            marginRight: "10px"
                                                        }}
                                                        alt={country.flags.alt}
                                                    />
                                                    {country.name.common}
                                                </MenuItem>
                                            )) }
                                        </Select>
                                    </FormControl>

                                    { errors.country && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.country?.message }</Box> }

                                </Box>

                                <Box sx={{ my: 5, display: "flex", justifyContent: "center" }}>
                                    <Box 
                                        sx={{
                                            width: "340px",
                                            height: "292px",
                                            border: "2px solid #fff",
                                            borderRadius: "18px",
                                            display: "flex",
                                            alignItems: "center",
                                            overflow: "hidden",
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => {
                                            document.getElementById("recordLabellogoUpload")?.click();
                                        }}
                                    >
                                        { imagePreview ? (
                                            <Box>
                                                <img src={imagePreview} 
                                                    alt='record label logo image preview'
                                                    style={{
                                                        objectFit: "contain",
                                                        width: "100%",
                                                    }}
                                                />
                                            </Box>
                                        ) : (
                                            <Box sx={{
                                                textAlign: "center",
                                                m: "auto",
                                            }}>
                                                <Typography sx={{
                                                    fontWeight: "700",
                                                    fontSize: "20px",
                                                    lineHeight: "38.44px",
                                                    letterSpacing: "-0.12px",
                                                    mb: 3
                                                }}>
                                                    Upload logo
                                                </Typography>
                                                <img src={cloudUpload} alt='cloud Upload icon' />
                                            </Box>
                                        ) }
                                    </Box>
                                </Box>


                                <Button variant="contained" 
                                    fullWidth type="submit" 
                                    disabled={ !isValid || isSubmitting || !imagePreview } 
                                    sx={{ 
                                        bgcolor: "#fff",
                                        "&.Mui-disabled": {
                                            background: "#9c9c9c",
                                            color: "#797979"
                                        },
                                        "&:hover": {
                                            bgcolor: "#fff"
                                        },
                                        "&:active": {
                                            bgcolor: "#fff"
                                        },
                                        "&:focus": {
                                            bgcolor: "#fff"
                                        },
                                        color: "#000",
                                        borderRadius: "12px",
                                        my: 3, py: 1.5,
                                        fontSize: {md: "15.38px"},
                                        fontWeight: "900",
                                        letterSpacing: "-0.12px",
                                        textTransform: "none"
                                    }}
                                >
                                    <span style={{ display: isSubmitting ? "none" : "initial" }}>Continue</span>
                                    <CircularProgress size={25} sx={{ display: isSubmitting ? "initial" : "none", color: "#fff", fontWeight: "bold" }} />
                                </Button>
                            </form>
                        </Box>
                    </ThemeProvider>

                </Container>

                
                <input 
                    type="file" 
                    id='recordLabellogoUpload' 
                    name="recordLabellogoUpload" 
                    accept='image/*' 
                    onChange={handleFileUpload}
                    style={{display: "none"}}
                />
            </Box>
        </>
    )
}

export default RecordLabelDetails;

import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
// import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

import album1 from "@/assets/images/album/album1.jpeg";
import album2 from "@/assets/images/album/album2.jpg";
import album3 from "@/assets/images/album/album3.jpeg";
import album4 from "@/assets/images/album/album4.jpg";
import album5 from "@/assets/images/album/album5.jpg";

import { stringAvatar } from '@/util/resources';
import { useSettingStore } from '@/state/settingStore';



interface _Props {
    // darkTheme: boolean,
    // setSideNav: (state: boolean) => void;
}

interface _ArtistsListProps {
    artists: typeof albumPreview,
    darkTheme: boolean,

    // setSideNav: (state: boolean) => void;
}

const albumPreview = [
    {
        image: album1,
        name: 'David',
        subtitle: '5 Songs'
    },
    {
        image: album2,
        name: 'John',
        subtitle: '5 Songs'
    },
    {
        image: album3,
        name: 'Mavi',
        subtitle: '5 Songs'
    },
    {
        image: album4,
        name: 'Portable',
        subtitle: '5 Songs'
    },
    {
        image: album5,
        name: 'Limo',
        subtitle: '5 Songs'
    },
];

const ArtistListComponent: React.FC<_ArtistsListProps> = ({ artists, darkTheme }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                gap: 5,
                width: "100%",
                overflow: "scroll",
                p: 5,
                bgcolor: darkTheme ? "#1C1B1F" : '#EFEFEF',
                position: 'absolute',
                borderRadius: '8px',
                zIndex: 3
            }}
        >
            {
                artists.map((item, i) => (
                    <Box key={i} alignSelf="center" textAlign="center">
                        <Avatar
                            alt={`${item.name} icon`}
                            src={item.image}
                            // variant="rounded"
                            aria-label={item.name}
                            sx={{ 
                                boxShadow: "0px 4px 8px -1px rgba(0, 0, 0, 0.1)",
                                // bgcolor: stringToColor(project.title),
                                width: {xs: "70px", md: "110px"},
                                height: {xs: "70px", md: "110px"},
                                // mb: "0.5rem",
                                // p: 1
                            }}
                            children={<Typography sx={{
                                fontSize: {xs: "13px", md: "15px"},
                                fontWeight: "bold"
                            }}>{stringAvatar(item.name)}</Typography>}
                        />

                        <Typography variant='h4' component="h4"
                            sx={{
                                fontWeight: '900',
                                fontSize: {xs: "16px", md: '23.73px'},
                                lineHeight: '14.24px',
                                letterSpacing: '-0.59px',
                                mt: {xs: "13px", md: '26px'}
                            }}
                        >{item.name}</Typography>

                        <Typography variant='body2'
                            sx={{
                                fontWeight: "400",
                                fontSize: {xs: "12px", md: '14.24px'},
                                lineHeight: '10.68px',
                                letterSpacing: '-0.59px',
                                color: '#666666',
                                mt: {xs: "7px", md: '13px'}
                            }}
                        >{item.subtitle}</Typography>
                    </Box>
                ))
            }
        </Box>
    )
}

const RecordLabelSearchComponent: React.FC<_Props> = () => {
    const darkTheme = useSettingStore((state) => state.darkTheme);
    const [searchInputValue, setSearchInputValue] = useState('');
    const [searchResult, setSearchResult] = useState<any[]>([]);

    const handleSearchInputValue = (searchedWord: string) => {
        setSearchInputValue(searchedWord);
        if (!searchedWord ) {
            setSearchResult([]);
            return
        };

        const results = albumPreview.filter(obj => obj.name.toLowerCase().includes(searchedWord.toLowerCase()));
        
        if (results.length) {
            setSearchResult(results);
        } else {
            setSearchResult([]);
        }
    }
    

    return (
        <Box>
            <TextField 
                variant="outlined" 
                fullWidth 
                id='search'
                type='text'
                inputMode='search'
                placeholder='Search for artist'
                label=''
                value={searchInputValue}
                onChange={(e) => {
                    handleSearchInputValue(e.target.value)
                }}
                InputLabelProps={{
                    style: { color: '#c1c1c1', fontWeight: "400" },
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon sx={{ color: "gray"}} />
                        </InputAdornment>
                    ),
                    endAdornment: searchInputValue && (
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setSearchInputValue("")}
                        ><ClearIcon sx={{ color: "gray", fontSize: '16px'}} /></IconButton>
                    ),
                    sx: {
                        borderRadius: "16px",
                        color: 'gray'
                    },
                }}
                sx={{
                    '& label.Mui-focused': {
                        color: 'var(--TextField-brandBorderFocusedColor)',
                    },
                    '& .MuiInputBase-input': { // Target input text
                        color: darkTheme ? '#fff' : "#000", // Change to your desired text color
                    },
                    '& .MuiInputBase-placeholder': { // Target placeholder text
                        color: 'gray',
                    },

                    '& .MuiOutlinedInput-root': {
                        bgcolor: darkTheme ? '#1C1B1F' : '#EFEFEF',
                        borderRadius: '17.8px',
                        height: '42px',

                        '& fieldset': {
                            // borderColor: darkTheme ? "#c4c4c4" : "#272727", // '#E0E3E7',
                            border: 'none'
                        },
                        '&:hover fieldset': {
                            // borderColor: darkTheme ? "#fff" : "#272727", // '#B2BAC2',
                            border: 'none'
                        },
                        '&.Mui-focused fieldset': {
                            // borderColor: darkTheme ? '#fff' : '#272727', // '#6F7E8C',
                            // borderWidth: "2px",
                            border: 'none'
                        },
                    },
                    zIndex: 9

                }}
            />

            {
                searchResult.length ? 
                <Box
                    sx={{
                        borderRadius: '8px',
                        position: "relative",
                        top: "-20px",
                    }}
                >
                    <ArtistListComponent artists={searchResult} darkTheme={darkTheme} />
                </Box>
                : <></>
            }
        </Box>
    )
}

export default RecordLabelSearchComponent;
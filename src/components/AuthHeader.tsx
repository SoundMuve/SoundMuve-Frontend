import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import SoundMuve from "./../assets/images/SoundMuve.png";
import CssBaseline from '@mui/material/CssBaseline';

export default function AuthHeaderComponent() {
    const navigate = useNavigate();

    return (
        <Box sx={{bgcolor: "#000"}}>
            <CssBaseline />

            <AppBar component="nav" color='transparent' position='relative'>
                <Toolbar>
                    <Box sx={{flexGrow: 1}} onClick={() => navigate("/") }>
                        <img src={SoundMuve} alt="Logo" style={{width: 130}} />
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

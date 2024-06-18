import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import LanguageIcon from '@mui/icons-material/Language';
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';

import SoundMuve from "./../assets/images/SoundMuve.png";
import light_off from "./../assets/images/light_off.png";
import { useSettingStore } from '../state/settingStore';
import NewReleaseModalComponent from './account/NewReleaseModal';

const drawerWidth = 240;

export default function AccountHeaderComponent() {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    const [mobileOpen, setMobileOpen] = useState(false);
    const darkTheme = useSettingStore((state) => state.darkTheme);
    const _setTheme = useSettingStore((state) => state._setTheme);

    const [openReleaseModal, setOpenReleaseModal] = useState(false);
    const closeReleaseModal = () => { setOpenReleaseModal(false) }


    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const menuItems = [
        // {
        //     title: "Home",
        //     link: "/",
        //     active: pathname == '/' ? true : false,
        // },
        // {
        //     title: "About",
        //     link: "/about",
        //     active: pathname.startsWith('/about'),
        // },
        {
            title: "Contact",
            link: "/contact",
            active: pathname.startsWith('/contact'),
        },
        {
            title: "FAQ",
            link: "/faq",
            active: pathname.startsWith('/faq'),
        }
    ];

    const drawer = (
        <Box 
            // onClick={handleDrawerToggle} 
            sx={{ p: 2, color: "#fff", height: "100%", display: "flex", flexDirection: "column" }}
        >
            <Box>
                <Box sx={{width: "100%", textAlign: "right"}}>
                    <CloseIcon onClick={handleDrawerToggle} />
                </Box>

                <Typography variant="h6" sx={{ my: 2 }}>
                    <img src={SoundMuve} alt="SoundMuve Logo" style={{width: 130, cursor: 'pointer' }} />
                </Typography>

                <Divider color='#c1c1c1' />

                <List onClick={handleDrawerToggle}>
                    <Link to="/account/artist">
                        <ListItem disablePadding sx={{bgcolor: pathname.endsWith('/artist') ? "#141414" : ''}}>
                            <ListItemButton>
                                <ListItemText primary="Dashboard" />
                            </ListItemButton>
                        </ListItem>
                    </Link>

                    {menuItems.map((item) => (
                        <Link key={item.title} to={item.link}>
                            <ListItem disablePadding sx={{bgcolor: item.active ? "#141414" : ''}}>
                                <ListItemButton>
                                    <ListItemText primary={item.title} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </Box>

            <Box sx={{mt: "auto"}}>

                <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 10}}>
                    <Box onClick={handleDrawerToggle} sx={{
                        display: "flex", flexDirection: "row", gap: 0, color: "#FFF", 
                        border: "1px solid #fff",
                        p: 1, width: "90px",
                        borderRadius: 3,
                    }}>
                        <LanguageIcon />
                        <Typography sx={{color: "#FFF"}}>Eng</Typography>
                        <ArrowDropDownIcon />
                    </Box>


                    <IconButton 
                        onClick={() => _setTheme(!darkTheme)}
                        sx={{color: "#fff"}}
                    >
                        { darkTheme ? 
                            <img 
                                src={light_off} alt='light off icon'
                                style={{maxWidth: "24px"}}
                            />
                            :
                            <LightbulbOutlinedIcon />
                        }
                    </IconButton>
                </Box>

            </Box>
        </Box>
    );


    return (
        <Box 
            sx={{ 
                display: 'flex', 
                // background: darkTheme ? "#000" : "#343434",
            }}
        >
            <CssBaseline />
            <AppBar 
                component="nav" 
                position="fixed"
                sx={{ backgroundColor: darkTheme ? "#000" : "#343434" }} 
            >
                <Toolbar sx={{ px: {xs: 2, md: 5, lg: 12} }}>
                    <Box sx={{flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate("/") }>
                        <img src={SoundMuve} alt="SoundMuve logo" style={{width: 130}} />
                    </Box>

                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Box sx={{display: "flex", flexDirection: "row", gap: 2}}>
                            {menuItems.map((item) => (
                                <Link key={item.title} to={ item.link } style={{ 
                                    borderBottom: item.active ? "1px solid #fff" : "none",
                                    color: item.active ? "#fff" : "#c1c1c1",
                                }}>
                                    <Typography>
                                        {item.title}
                                    </Typography>
                                </Link>
                            ))}
                        </Box>
                    </Box>

                    <Box sx={{flexGrow: 1, display: "flex", justifyContent: 'flex-end', alignItems: "center"}}>
                        <Stack spacing={2} direction="row" alignItems="center" >
                            <Box sx={{ display: { xs: 'none', sm: 'block' }, alignSelf: "center" }}>
                                <IconButton 
                                    onClick={() => _setTheme(!darkTheme)}
                                    sx={{color: "#fff"}}
                                >
                                    { darkTheme ? 
                                        <img 
                                            src={light_off} alt='light off icon'
                                            style={{maxWidth: "24px"}}
                                        />
                                        :
                                        <LightbulbOutlinedIcon />
                                    }
                                </IconButton>
                            </Box>
                            

                            <Box
                                onClick={() => setOpenReleaseModal(true)}
                                sx={{
                                    color: "#000000",
                                    background: "#fff",
                                    padding: "10px",
                                    border: "none",
                                    borderRadius: "8px",
                                    fontWeight: "bolder",
                                    cursor: "pointer"
                                }}
                            >
                                <Typography sx={{
                                    fontWeight: '700',
                                    fontSize: "12.92px",
                                    lineHeight: "12px",
                                    letterSpacing: "-0.26px",
                                    textAlign: 'center',
                                    color: "#000",
                                    display: { xs: 'none', sm: 'block' }
                                }}>
                                    Add new release
                                </Typography>

                                <Typography sx={{
                                    fontWeight: '700',
                                    fontSize: "9.69px",
                                    lineHeight: "9px",
                                    letterSpacing: "-0.19px",
                                    textAlign: 'center',
                                    color: "#000",
                                    display: { xs: 'block', sm: 'none' }
                                }}>
                                    Add new Song
                                </Typography>
                            </Box>

                            <Box sx={{ display: { xs: 'none', sm: 'block' }, alignSelf: "center" }}>
                                <Box sx={{display: "flex", flexDirection: "row", gap: 0, color: "#FFF"}}>
                                    <LanguageIcon />
                                    <Typography sx={{color: "#FFF"}}>Eng</Typography>
                                    <ArrowDropDownIcon />
                                </Box>
                            </Box>

                            <Box sx={{ display: { xs: 'none', sm: 'block' }, alignSelf: "center" }}>
                                <IconButton sx={{color: "#fff"}}>
                                    <AccountCircleOutlined />
                                </IconButton>
                            </Box>
                        </Stack>


                        <Box sx={{ ml: 2, display: { sm: 'none' } }}>
                            <IconButton
                                aria-label="open drawer"
                                edge="end"
                                onClick={handleDrawerToggle}
                                sx={{color: "#fff"}}
                                // sx={{ ml: 2, display: { sm: 'none' } }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>
                    </Box>
                
                </Toolbar>
            </AppBar>

            <nav>
                <Drawer
                    variant="temporary"
                    anchor='right'
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, background: "#000" },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>


            <NewReleaseModalComponent 
                openReleaseModal={openReleaseModal}
                closeReleaseModal={closeReleaseModal}
            />
        </Box>
    );
}

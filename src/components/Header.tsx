import * as React from 'react';
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
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';

import SoundMuve from "./../assets/images/SoundMuve.png";

const drawerWidth = 240;

export default function HeaderComponent() {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    const [mobileOpen, setMobileOpen] = React.useState(false);


    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const menuItems = [
        {
            title: "Home",
            link: "/",
            active: pathname == '/' ? true : false,
        },
        {
            title: "About",
            link: "/about",
            active: pathname.startsWith('/about'),
        },
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
                    <img src={SoundMuve} alt="Logo" style={{width: 130}} />
                </Typography>

                <Divider color='#c1c1c1' />

                <List onClick={handleDrawerToggle}>
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
            </Box>
        </Box>
    );


    return (
        <Box sx={{ display: 'flex', background: "#000"}}>
            <CssBaseline />
            <AppBar component="nav" color='transparent' position="static">
                <Toolbar>
                    <Box sx={{flexGrow: 1}} onClick={() => navigate("/") }>
                        <img src={SoundMuve} alt="SoundMuve logo" style={{width: 130}} />
                    </Box>

                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Box sx={{display: "flex", flexDirection: "row", gap: 2}}>
                            {menuItems.map((item) => (
                                <Link key={item.title} to={ item.link } style={{ 
                                    borderBottom: item.active ? "1px solid #fff" : "none",
                                    // color: item.active ? "#644986" : "#fff",
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
                                <Box sx={{display: "flex", flexDirection: "row", gap: 0, color: "#FFF"}}>
                                    <LanguageIcon />
                                    <Typography sx={{color: "#FFF"}}>Eng</Typography>
                                    <ArrowDropDownIcon />
                                </Box>
                            </Box>
                            

                            <Link to="/auth/signup" style={{
                                textDecoration: "none",
                                color: "#fff",
                                fontSize: "15px",
                                fontWeight: "bolder"
                            }}>
                                Sign Up
                            </Link>

                            <Link to="/auth/login" style={{
                                textDecoration: "none",
                                color: "#000000",
                                fontSize: "15px",
                                background: "#fff",
                                padding: "5px 7px",
                                border: "none",
                                outline: "none",
                                borderRadius: "7px",
                                fontWeight: "bolder"
                            }}>
                                Login
                            </Link>
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

            {/* <Toolbar /> */}
        </Box>
    );
}

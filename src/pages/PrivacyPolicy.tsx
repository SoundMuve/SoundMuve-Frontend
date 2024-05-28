import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import HeaderComponent from '../components/Header';
import FooterComponent from '../components/Footer';
import style from './pricingStyles.module.css';



function PrivacyPolicy() {


    return (
        <>
            <HeaderComponent />

            <Box sx={{bgcolor: "#000", color: "#fff", pt: 5, position: "relative", overflow: "hidden"}}>
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


                <Box sx={{px: {xs: 2, md: 5, lg: 12}, pb: 5, position: "relative", zIndex: 10, mt: {xs: 5, md: 10} }}>
                    <Typography sx={{
                        fontWeight: "bold",
                        fontSize: {xs: 35, md: 60},
                        textAlign: "center"
                    }}>
                        PRIVACY POLICY
                    </Typography>

                    <Box sx={{
                        my: 4, 
                        textAlign: "justify",
                        fontSize: 20
                    }}>
                        <Typography sx={{pb: 4}}>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi voluptates sapiente beatae consectetur eos amet obcaecati est ad minus ea saepe, a, facilis deleniti odit, assumenda sequi aliquam itaque. Mollitia!
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque nisi odio non vel nesciunt ratione rerum architecto iusto, deserunt ea voluptatibus nostrum et voluptas atque ullam, optio magni. Iusto, similique?
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad quaerat saepe autem quos, similique beatae quae enim earum illum iure. Maxime quia esse rerum modi sunt optio nulla ullam sequi.
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi voluptates sapiente beatae consectetur eos amet obcaecati est ad minus ea saepe, a, facilis deleniti odit, assumenda sequi aliquam itaque. Mollitia!
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque nisi odio non vel nesciunt ratione rerum architecto iusto, deserunt ea voluptatibus nostrum et voluptas atque ullam, optio magni. Iusto, similique?
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad quaerat saepe autem quos, similique beatae quae enim earum illum iure. Maxime quia esse rerum modi sunt optio nulla ullam sequi.
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi voluptates sapiente beatae consectetur eos amet obcaecati est ad minus ea saepe, a, facilis deleniti odit, assumenda sequi aliquam itaque. Mollitia!
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque nisi odio non vel nesciunt ratione rerum architecto iusto, deserunt ea voluptatibus nostrum et voluptas atque ullam, optio magni. Iusto, similique?
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad quaerat saepe autem quos, similique beatae quae enim earum illum iure. Maxime quia esse rerum modi sunt optio nulla ullam sequi.
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi voluptates sapiente beatae consectetur eos amet obcaecati est ad minus ea saepe, a, facilis deleniti odit, assumenda sequi aliquam itaque. Mollitia!
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque nisi odio non vel nesciunt ratione rerum architecto iusto, deserunt ea voluptatibus nostrum et voluptas atque ullam, optio magni. Iusto, similique?
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad quaerat saepe autem quos, similique beatae quae enim earum illum iure. Maxime quia esse rerum modi sunt optio nulla ullam sequi.
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi voluptates sapiente beatae consectetur eos amet obcaecati est ad minus ea saepe, a, facilis deleniti odit, assumenda sequi aliquam itaque. Mollitia!
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque nisi odio non vel nesciunt ratione rerum architecto iusto, deserunt ea voluptatibus nostrum et voluptas atque ullam, optio magni. Iusto, similique?
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad quaerat saepe autem quos, similique beatae quae enim earum illum iure. Maxime quia esse rerum modi sunt optio nulla ullam sequi.
                        </Typography>
                        
                        <Typography sx={{pb: 4}}>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi voluptates sapiente beatae consectetur eos amet obcaecati est ad minus ea saepe, a, facilis deleniti odit, assumenda sequi aliquam itaque. Mollitia!
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque nisi odio non vel nesciunt ratione rerum architecto iusto, deserunt ea voluptatibus nostrum et voluptas atque ullam, optio magni. Iusto, similique?
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad quaerat saepe autem quos, similique beatae quae enim earum illum iure. Maxime quia esse rerum modi sunt optio nulla ullam sequi.
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi voluptates sapiente beatae consectetur eos amet obcaecati est ad minus ea saepe, a, facilis deleniti odit, assumenda sequi aliquam itaque. Mollitia!
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque nisi odio non vel nesciunt ratione rerum architecto iusto, deserunt ea voluptatibus nostrum et voluptas atque ullam, optio magni. Iusto, similique?
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad quaerat saepe autem quos, similique beatae quae enim earum illum iure. Maxime quia esse rerum modi sunt optio nulla ullam sequi.
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi voluptates sapiente beatae consectetur eos amet obcaecati est ad minus ea saepe, a, facilis deleniti odit, assumenda sequi aliquam itaque. Mollitia!
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque nisi odio non vel nesciunt ratione rerum architecto iusto, deserunt ea voluptatibus nostrum et voluptas atque ullam, optio magni. Iusto, similique?
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad quaerat saepe autem quos, similique beatae quae enim earum illum iure. Maxime quia esse rerum modi sunt optio nulla ullam sequi.
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi voluptates sapiente beatae consectetur eos amet obcaecati est ad minus ea saepe, a, facilis deleniti odit, assumenda sequi aliquam itaque. Mollitia!
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque nisi odio non vel nesciunt ratione rerum architecto iusto, deserunt ea voluptatibus nostrum et voluptas atque ullam, optio magni. Iusto, similique?
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad quaerat saepe autem quos, similique beatae quae enim earum illum iure. Maxime quia esse rerum modi sunt optio nulla ullam sequi.
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi voluptates sapiente beatae consectetur eos amet obcaecati est ad minus ea saepe, a, facilis deleniti odit, assumenda sequi aliquam itaque. Mollitia!
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque nisi odio non vel nesciunt ratione rerum architecto iusto, deserunt ea voluptatibus nostrum et voluptas atque ullam, optio magni. Iusto, similique?
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad quaerat saepe autem quos, similique beatae quae enim earum illum iure. Maxime quia esse rerum modi sunt optio nulla ullam sequi.
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <FooterComponent />
        </>
    )
}

export default PrivacyPolicy;

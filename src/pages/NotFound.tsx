import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../components/Header';
import FooterComponent from '../components/Footer';
import Container from '@mui/material/Container';

export default function NotFoundPage() {
    const navigate = useNavigate();

    // useEffect(() => {
    //     navigate("/");
    // }, []);
    

    return (
        <main>
            <HeaderComponent />

            <Container>
                

                <h1>Page Not Found!</h1>

            </Container>

            <FooterComponent />
        </main>
    )
}

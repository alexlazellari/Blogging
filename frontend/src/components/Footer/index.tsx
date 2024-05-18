import { styled } from '@mui/system';
import { Box, Container, Link, Typography } from '@mui/material';

const StyledFooter = styled(Box)`
    margin-top: 4rem;
    max-height: 4rem;
    height: 4rem;
    margin: auto;
    padding-right: 0.5rem;
    border-top: 1px solid rgba(75, 67, 67, 0.2);
`;

const CenteredTypography = styled(Typography)`
    text-align: right;
`;

export default function Footer() {
    return (
        <StyledFooter>
            <Container sx={{ maxWidth: 1444, pt: 2 }} maxWidth={false}>
                <CenteredTypography
                    variant="body1"
                    sx={{
                        fontSize: {
                            xs: '.875rem',
                            sm: '1rem',
                        },
                    }}
                >
                    <Link href="/privacy-policy">Privacy Policy</Link> {' | '}
                    <Link href="/terms-of-service">Terms of Service</Link>{' '}
                    {' | '}
                    <Link href="/contact-us">Contact Us</Link>
                </CenteredTypography>
                <CenteredTypography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        fontSize: {
                            xs: '.75rem',
                            sm: '.875rem',
                        },
                    }}
                >
                    © {new Date().getFullYear()} SnackNews. All rights
                    reserved.
                </CenteredTypography>
            </Container>
        </StyledFooter>
    );
}

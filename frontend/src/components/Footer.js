import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
const Footer = () => {
    return(
        <footer style={{marginTop:'80vh',textAlign:'center'}}>
            <Container>
                <Row>
                    <Col>
                        Copy &copy; Rajat Agarwal
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
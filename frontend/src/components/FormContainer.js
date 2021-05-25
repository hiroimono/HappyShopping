import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const FormContainer = ({ children }) => {
    const headerStyle = { minHeight: 'calc(100vh - 144px)' }
    return (
        <Container>
            <Row className="justify-content-md-center" style={headerStyle}>
                <Col xs={12} md={6}>
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

export default FormContainer

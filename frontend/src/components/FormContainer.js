import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'

const FormContainer = ({ children }) => {
    const headerStyle = { minHeight: 'calc(100vh - 144px)' }
    return (
        <Container className="px-0">
            <Row className="justify-content-md-center" style={headerStyle}>
                <Col xs={12} md={9} lg={8} xl={6}>
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

export default FormContainer

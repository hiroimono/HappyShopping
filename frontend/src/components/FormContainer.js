import React from 'react'
import { Row, Col } from 'react-bootstrap'

const FormContainer = ({ children }) => {
    const headerStyle = { minHeight: 'calc(100vh - 144px)' }
    return (
        <Row className="justify-content-md-center" style={headerStyle}>
            <Col xs={12} md={10} lg={8} xl={6}>
                {children}
            </Col>
        </Row>
    )
}

export default FormContainer

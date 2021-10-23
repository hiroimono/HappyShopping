import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

/** i18n */
import { useTranslation } from 'react-i18next'

const CheckoutSteps = ({ step1, step2, step3 }) => {

    const { t } = useTranslation();

    return (
        <Nav className="justify-content-center  align-items-center mb-4">
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to="/login">
                        <Nav.Link>
                            <h4 className='mb-0'>{t('login')}</h4>
                        </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>{t('login')}</Nav.Link>
                )}
            </Nav.Item>

            {step2 ? (
                <Nav.Item>
                    <strong><i className="fas fa-greater-than text-danger"></i><i className="fas fa-greater-than text-danger"></i></strong>
                </Nav.Item>
            ) : (
                <Nav.Item>
                    <i className="fas fa-greater-than text-secondary"></i>
                </Nav.Item>
            )}

            <Nav.Item>
                {step2 ? (
                    <LinkContainer to="/shipping">
                        <Nav.Link>
                            <h4 className='mb-0'>{t('shipping')}</h4>
                        </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>{t('shipping')}</Nav.Link>
                )}
            </Nav.Item>

            {/* {step3 ? (
                <Nav.Item>
                    <strong><i className="fas fa-greater-than text-danger"></i><i className="fas fa-greater-than text-danger"></i></strong>
                </Nav.Item>
            ) : (
                <Nav.Item>
                    <i className="fas fa-greater-than text-secondary"></i>
                </Nav.Item>
            )}

            <Nav.Item>
                {step3 ? (
                    <LinkContainer to="/payment-method">
                        <Nav.Link>
                            <h4 className='mb-0'>Payment</h4>
                        </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Payment</Nav.Link>
                )}
            </Nav.Item> */}

            {step3 ? (
                <Nav.Item>
                    <strong><i className="fas fa-greater-than text-danger"></i><i className="fas fa-greater-than text-danger"></i></strong>
                </Nav.Item>
            ) : (
                <Nav.Item>
                    <i className="fas fa-greater-than text-secondary"></i>
                </Nav.Item>
            )}

            <Nav.Item>
                {step3 ? (
                    <LinkContainer to="/placeorder">
                        <Nav.Link>
                            <h4 className='mb-0'>{t('place-order')}</h4>
                        </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>{t('place-order')}</Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutSteps

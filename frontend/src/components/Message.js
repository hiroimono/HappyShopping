import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, messageText }) => {
    return (
        <Alert variant={variant}>
            { messageText}
        </Alert>
    )
}

Message.defaultProps = {
    variant: 'info'
}

export default Message

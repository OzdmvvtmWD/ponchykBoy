import React, { Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const ActivateAccount = () => {

    const navigate = useNavigate()
    return(
        <div>
        <h2>Account successfully activated!</h2>
        <Button onClick={() => navigate('/login')} variant="primary">
            Go to Login
        </Button>
    </div>
    );
};

export default ActivateAccount;

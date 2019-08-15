import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import Form from 'components/UI/form/Form/Form';
import Input from 'components/UI/form/Input/Input';
import classes from './Login.scss';

const FORM_NAME = 'LoginForm';

const Login = () => {
    return (
        <Form
            form={ FORM_NAME }
            handleSubmit={ () => {} }
            className={ classes.Login }
        >
            <>
                <Row>
                    <Col className="text-center" md={ { size: 4, offset: 4 } }>
                        <h3>Login</h3>
                    </Col>
                </Row>
                <Row>
                    <Col md={ { size: 4, offset: 4 } }>
                        <Input
                            label="Username"
                            name="username"
                        />
                        <Input
                            label="Password"
                            name="password"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center" md={ { size: 4, offset: 4 } }>
                        <Button color="primary">Login</Button>
                    </Col>
                </Row>
            </>
        </Form>
    );
};

export default Login;
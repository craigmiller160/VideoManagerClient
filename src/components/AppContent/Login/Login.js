import React from 'react';
import { Button, Col, Row } from 'reactstrap';
import Form from 'components/UI/form/Form/Form';
import Input from 'components/UI/form/Input/Input';
import classes from './Login.scss';
import { isRequired } from '../../../utils/validations';

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
                            type="email"
                            validate={ [
                                isRequired
                            ] }
                        />
                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            validate={ [
                                isRequired
                            ] }
                        />
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center" md={ { size: 4, offset: 4 } }>
                        <Button
                            type="submit"
                            color="primary"
                        >
                            Login
                        </Button>
                    </Col>
                </Row>
            </>
        </Form>
    );
};

export default Login;
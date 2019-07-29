import React from 'react';
import { Row, Col } from 'reactstrap';
import Form from 'components/UI/form/Form/Form';
import Input from 'components/UI/form/Input/Input';

const FORM_NAME = 'LoginForm';

const Login = () => {
    return (
        <Form
            form={ FORM_NAME }
            handleSubmit={ () => {} }
        >
            <Row>
                <Col>
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
        </Form>
    );
};

export default Login;
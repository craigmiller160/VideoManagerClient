import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Button, Col, Row } from 'reactstrap';
import Form from 'components/UI/form/Form/Form';
import Input from 'components/UI/form/Input/Input';
import classes from './Login.scss';
import { isRequired, isValidEmail } from '../../../utils/validations';
import { login } from '../../../store/auth/auth.actions';
import { loginFormHasErrors } from '../../../store/auth/auth.selectors';
import Spinner from '../../UI/Spinner/Spinner';

export const LOGIN_FORM_NAME = 'LoginForm';

const Login = () => {
    const dispatch = useDispatch();
    const loginFormErrors = useSelector(loginFormHasErrors, shallowEqual);
    const loginLoading = useSelector((state) => state.auth.loginLoading, shallowEqual);

    return (
        <Form
            form={ LOGIN_FORM_NAME }
            onSubmit={ (values) => dispatch(login(values)) }
            className={ classes.Login }
        >
            {
                loginLoading &&
                    <Spinner />
            }
            {
                !loginLoading &&
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
                                name="userName"
                                type="email"
                                validate={ [
                                    isRequired,
                                    isValidEmail
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
                                disabled={ loginFormErrors }
                            >
                                Login
                            </Button>
                        </Col>
                    </Row>
                </>
            }
        </Form>
    );
};

export default Login;
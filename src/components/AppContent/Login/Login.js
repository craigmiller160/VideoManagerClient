/*
 *     VideoManagerClient
 *     Copyright (C) 2020 Craig Miller
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
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
    const loginLoading = useSelector((state) => state.auth?.loginLoading, shallowEqual);

    return (
        <Form
            form={ LOGIN_FORM_NAME }
            onSubmit={ (values) => dispatch(login(values)) }
            className={ classes.Login }
        >
            {
                loginLoading &&
                    <Spinner id="login-spinner" />
            }
            {
                !loginLoading &&
                <div>
                    <div className={ classes.title }>
                        <h3 id="login-title">Login</h3>
                    </div>
                    <Row>
                        <Col md={ { size: 4, offset: 4 } }>
                            <Input
                                id="username-field"
                                label="Username"
                                name="userName"
                                type="email"
                                validate={ [
                                    isRequired,
                                    isValidEmail
                                ] }
                                focusOnRender
                            />
                            <Input
                                id="password-field"
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
                                id="login-btn"
                                type="submit"
                                color="primary"
                                disabled={ loginFormErrors }
                            >
                                Login
                            </Button>
                        </Col>
                    </Row>
                </div>
            }
        </Form>
    );
};

export default Login;

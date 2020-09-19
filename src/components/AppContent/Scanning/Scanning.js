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

import React, { useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { checkIsScanning } from 'store/scanning/scanning.actions';
import Spinner from '../../UI/Spinner/Spinner';
import classes from './Scanning.scss';

const Scanning = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const intervalId = setInterval(() => {
            dispatch(checkIsScanning());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const colSize = {
        size: 8,
        offset: 2
    };

    return (
        <div className={ classes.Scanning }>
            <Row>
                <Col xs={ colSize }>
                    <h3>Scanning for videos, please wait. This may take a few minutes.</h3>
                </Col>
            </Row>
            <Row>
                <Col xs="12">
                    <Spinner id="scanning-spinner" />
                </Col>
            </Row>
        </div>
    );
};

export default Scanning;
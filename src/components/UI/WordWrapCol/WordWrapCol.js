import React from 'react';
import { Col } from 'reactstrap';

const style = {
    'word-wrap': 'break-word'
};

const WordWrapCol = (props) => (
    <Col style={ style } { ...props }>
        { props.children }
    </Col>
);

export default WordWrapCol;
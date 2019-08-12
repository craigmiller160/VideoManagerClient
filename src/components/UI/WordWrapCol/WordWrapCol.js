import React from 'react';
import { Col } from 'reactstrap';

const style = {
    wordWrap: 'break-word'
};

const WordWrapCol = (props) => (
    <Col style={ style } { ...props }>
        { props.children }
    </Col>
);

export default WordWrapCol;
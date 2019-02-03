import React from 'react';

const mockComponent = (compName, props) => (
    <mock-comp
        name={ compName }
        { ...props }
    >
        { props.children }
    </mock-comp>
);

export default mockComponent;
import styled from 'styled-components';

const StyledInput = styled.input`
    border: 1px solid lightgray;
    border-radius: 3px;
    display: block;
    width: 100%;
    font-size: 1rem;
    padding: 2px 8px;
    line-height: 1.5;
    font-weight: 400;
    height: calc(2.25rem + 2px);
`;
StyledInput.displayName = 'StyledInput';

export default StyledInput;
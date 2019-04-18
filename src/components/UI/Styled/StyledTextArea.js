import styled from 'styled-components';

const StyledTextArea = styled.textarea`
    resize: none;
    display: block;
    border: 1px solid lightgray;
    border-radius: 3px;
    width: 100%;
`;
StyledTextArea.displayName = 'StyledTextArea';

export default StyledTextArea;
import styled from 'styled-components';
import PropTypes from 'prop-types';

const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: ${(props) => props.justifyContent};
    align-items: ${(props) => props.alignItems};
`;
FlexRow.displayName = 'FlexRow';
FlexRow.propTypes = {
    justifyContent: PropTypes.string,
    alignItems: PropTypes.string
};

export default FlexRow;
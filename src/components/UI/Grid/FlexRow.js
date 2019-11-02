import styled from 'styled-components';
import PropTypes from 'prop-types';

const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: ${(props) => props.justifyContent};
    align-items: ${(props) => props.alignItems};
    width: 100%;
`;
FlexRow.displayName = 'FlexRow';
FlexRow.propTypes = {
    justifyContent: PropTypes.string,
    alignItems: PropTypes.string
};
FlexRow.defaultProps = {
    justifyContent: 'flex-start',
    alignItems: 'stretch'
};

export default FlexRow;

import PropTypes from 'prop-types';
import styled from 'styled-components';

const Section = styled.View`
  width: 100%;
  align-items: ${({ align }) =>
    ({ left: 'flex-start', right: 'flex-end' }[align] || 'center')};
  padding-horizontal: 20;
  padding-vertical: 20;
`;

Section.propTypes = {
  align: PropTypes.string
};

Section.defaultProps = {
  align: 'center'
};

export default Section;

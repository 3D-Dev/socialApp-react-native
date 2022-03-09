import React from 'react';
import PropTypes from 'prop-types';
import { Content as NBContent } from 'native-base';

const Content = ({ children, isScrollContent }) => {
  if (!isScrollContent) {
    return children;
  }
  return (
    <NBContent
      enableOnAndroid
      extraScrollHeight={150}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {children}
    </NBContent>
  );
};

Content.propTypes = {
  children: PropTypes.node.isRequired,
  isScrollContent: PropTypes.bool.isRequired
};

export default Content;

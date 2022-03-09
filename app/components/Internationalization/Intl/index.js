import React from 'react';
import PropTypes from 'prop-types';
import 'intl/locale-data/jsonp/en-ZA';
import { injectIntl as injectReactIntl } from 'react-intl';

export function getDisplayName(Component) {
  return Component.displayName || Component.name;
}

export const injectIntl = (WrappedComponent, test = false) => {
  class InjectIntl extends React.Component {
    static displayName = `InjectIntl(${getDisplayName(WrappedComponent)})`;

    static propTypes = {
      intl: PropTypes.shape({
        formatMessage: PropTypes.func.isRequired
      }).isRequired
    };

    // For now we only define formatMessage but will add others according to the requirements.
    formatMessage = (id, values) => {
      const { intl } = this.props;
      return intl.formatMessage({ id, defaultMessage: id }, values);
    };

    render() {
      return (
        <WrappedComponent {...this.props} formatMessage={this.formatMessage} />
      );
    }
  }
  return test ? InjectIntl : injectReactIntl(InjectIntl);
};

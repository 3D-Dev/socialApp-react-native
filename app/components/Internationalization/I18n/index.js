import 'intl';
import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, addLocaleData } from 'react-intl';
import { Text } from 'react-native';
import en from 'react-intl/locale-data/en';

import enUSTranslations from 'translations/en-US.json';

addLocaleData([...en]);

// Define user's language. It will be moved to redux later so that it can be modifed realtime
/* istanbul ignore next */
const language = 'en';

// Build the object containing all of the translations
const translations = {
  en: enUSTranslations
};

// Try full locale, try locale without region code, fallback to 'en'
const defaultMessages = translations[language] || translations.en;

const I18n = ({ locale, messages, children }) => (
  <IntlProvider
    locale={locale}
    messages={messages || translations[locale] || defaultMessages}
    textComponent={Text}
  >
    {children}
  </IntlProvider>
);

I18n.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.element.isRequired
};

I18n.defaultProps = {
  locale: language,
  messages: null
};

export default I18n;

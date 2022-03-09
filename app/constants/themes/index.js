import assignDeep from 'assign-deep';
import { cloneDeep } from 'lodash';

import common from './common';
import defaultTheme from './default';
import light from './light';
import stone from './stone';
import shadow from './shadow';
import darkbluegradient from './darkbluegradient';
import darkgreengradient from './darkgreengradient';
import whiteredgradient from './whilteredgradient';
import whitebluegradient from './whitebluegradient';

const allThemes = {
  default: defaultTheme,
  light,
  stone,
  shadow,
  darkbluegradient,
  darkgreengradient,
  whiteredgradient,
  whitebluegradient
};

Object.keys(allThemes).forEach(themeKey => {
  allThemes[themeKey] = assignDeep(cloneDeep(common), allThemes[themeKey]);
});

export default allThemes;

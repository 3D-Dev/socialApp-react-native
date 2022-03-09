import { combineReducers } from 'redux-immutable';

import ui from 'redux/ui/reducer';
import data from 'redux/data/reducer';
import app from 'redux/app/reducer';
import user from 'redux/user/reducer';
import constant from 'redux/constant/reducer';

// api
import auth from 'redux/auth/reducer';
import feedback from 'redux/feedback/reducer';
import network from 'redux/network/reducer';
import contact from 'redux/contact/reducer';
import reflection from 'redux/reflection/reducer';

const rootReducer = combineReducers({
  ui,
  data,
  app,
  user,
  constant,
  // api
  auth,
  feedback,
  network,
  contact,
  reflection
});

export default rootReducer;

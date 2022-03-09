import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Actions,
  Scene,
  Stack,
  Router as FluxRouter
} from 'react-native-router-flux';
import { compose, setDisplayName } from 'recompose';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { get as lodashGet } from 'lodash';

import pages from 'constants/pages';
import { withCommonContext, Sync } from 'components';
import { setSceneKey } from 'redux/ui/actions';

const RouterView = styled.View`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: white;
`;

class Router extends Component {
  static propTypes = {
    setSceneKey: PropTypes.func.isRequired
  };

  render() {
    const { setSceneKey } = this.props;
    const isOpened = lodashGet(global.localStorage, 'appSettings.isOpened');
    const initalKey = isOpened ? 'add' : 'welcome';

    return (
      <RouterView>
        <Sync />
        <FluxRouter onStateChange={() => setSceneKey(Actions.currentScene)}>
          <Stack key="root">
            {pages.map(page => (
              <Scene
                key={page.key}
                component={withCommonContext(page.component)}
                initial={page.key === initalKey}
                hideNavBar
              />
            ))}
          </Stack>
        </FluxRouter>
      </RouterView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setSceneKey: payload => dispatch(setSceneKey(payload))
});

export default compose(
  setDisplayName('Router'),
  connect(null, mapDispatchToProps)
)(Router);

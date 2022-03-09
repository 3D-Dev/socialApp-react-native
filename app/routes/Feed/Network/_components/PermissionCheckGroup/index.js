import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styled from 'styled-components';
import { Row, Col } from 'react-native-easy-grid';

import { H5, H6, CheckBox } from 'elements';
import { permissions as permissionKeys } from 'constants/mocha';

const CheckBoxWrapper = styled(Col)`
  align-items: flex-end;
  justify-content: center;
`;

const TextWrapper = styled(Col)`
  align-items: flex-start;
  justify-content: center;
  padding-left: 15px;
`;

class PermissionCheckGroup extends Component {
  static propTypes = {
    permissions: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    callback: PropTypes.func.isRequired
  };

  static contextTypes = {
    formatMessage: PropTypes.func,
    currentTheme: PropTypes.shape()
  };

  render() {
    const { formatMessage } = this.context;
    const { permissions, callback } = this.props;

    return (
      <View>
        <H5 align="left" mt={20} mb={5}>
          {formatMessage('feed.network.edit.viewpermission')}
        </H5>
        <H6 align="left" mb={20}>
          {formatMessage('feed.network.edit.viewpermission.displayText')}
        </H6>
        {permissionKeys.map(({ key, data }) => {
          return (
            <Row key={key}>
              <CheckBoxWrapper size={4}>
                <CheckBox
                  onClick={() => {
                    if (permissions.includes(key)) {
                      callback(permissions.filter(p => p !== key));
                    } else {
                      permissions.push(key);
                      callback(permissions);
                    }
                  }}
                  isChecked={permissions.includes(key)}
                />
              </CheckBoxWrapper>
              <TextWrapper size={6}>
                <H5>{data}</H5>
              </TextWrapper>
            </Row>
          );
        })}
      </View>
    );
  }
}

export default PermissionCheckGroup;

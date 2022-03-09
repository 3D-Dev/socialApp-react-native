import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, setDisplayName } from 'recompose';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { Actions } from 'react-native-router-flux';
import { pick } from 'lodash';
import { connect } from 'react-redux';

import { selectState } from 'redux/selectors';
import { updateProfile, readProfile } from 'redux/user/actions';
import { H4, HeaderTitle, HeaderRight, Section } from 'elements';
import { App } from 'components';
import { signupConfirm } from 'redux/auth/actions';

class SMSVerification extends Component {
  static propTypes = {
    signupConfirm: PropTypes.func.isRequired,
    tokenInfoRequesting: PropTypes.bool.isRequired,
    phone: PropTypes.string,
    updateProfile: PropTypes.func.isRequired,
    readProfile: PropTypes.func.isRequired
  };

  static contextTypes = {
    formatMessage: PropTypes.func,
    currentTheme: PropTypes.shape(),
    profileData: PropTypes.shape(),
    setProfileData: PropTypes.func,
    setReflection: PropTypes.func,
    listReflections: PropTypes.func
  };

  static defaultProps = {
    phone: ''
  };

  onFulfill = code => {
    const { signupConfirm, phone } = this.props;
    signupConfirm({
      phone,
      code,
      onSuccess: () => {
        this.syncProfile(() => {
          setTimeout(() => {
            Actions['auth.profile']();
          }, 300);
        });
        this.syncReflections();
      }
    });
  };

  syncReflections = () => {
    const { listReflections, setReflection } = this.context;
    listReflections({
      onSuccess: ({ reflections }) => setReflection(reflections)
    });
  };

  syncProfile = cb => {
    const { readProfile, updateProfile } = this.props;
    const { setProfileData, profileData } = this.context;

    readProfile({
      onSuccess: payload => {
        if (
          !profileData.updated ||
          new Date(payload.updated) > new Date(profileData.updated)
        ) {
          // If backend profile data is newer
          setProfileData(payload);
          cb();
        } else {
          // If frontend profile data is newer
          updateProfile({
            ...pick(profileData, ['name', 'avatar', 'user_id']),
            onSuccess: p => {
              setProfileData(p);
              cb();
            },
            onFailure: cb
          });
        }
      },
      onFailure: cb
    });
  };

  render() {
    const { formatMessage, currentTheme } = this.context;
    const { tokenInfoRequesting } = this.props;

    return (
      <App loading={tokenInfoRequesting}>
        <HeaderTitle />
        <HeaderRight />
        <Section>
          <H4 mb={15} mt={60}>
            {formatMessage('auth.sms.displayText')}
          </H4>
          <OTPInputView
            style={{ width: '80%', height: 200 }}
            pinCount={6}
            autoFocusOnLoad
            codeInputFieldStyle={{
              width: 30,
              height: 45,
              borderWidth: 0,
              borderBottomWidth: 1,
              color: currentTheme.COLORS.PRIMARY,
              borderColor: currentTheme.COLORS.BORDER
            }}
            codeInputHighlightStyle={{
              borderColor: currentTheme.COLORS.PRIMARY
            }}
            onCodeFilled={code => {
              this.onFulfill(code);
            }}
          />
        </Section>
      </App>
    );
  }
}

const mapStateToProps = state => ({
  ...selectState('auth', 'tokenInfo')(state)
});

const mapDispatchToProps = dispatch => ({
  signupConfirm: payload => dispatch(signupConfirm(payload)),
  readProfile: payload => dispatch(readProfile(payload)),
  updateProfile: payload => dispatch(updateProfile(payload))
});

export default compose(
  setDisplayName('SMSVerification'),
  connect(mapStateToProps, mapDispatchToProps)
)(SMSVerification);

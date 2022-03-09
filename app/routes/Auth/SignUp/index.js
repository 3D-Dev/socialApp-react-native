import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, setDisplayName } from 'recompose';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import styled from 'styled-components';
import PhoneInput from 'react-native-phone-input';
import { View } from 'react-native';

import {
  H4,
  H6,
  HeaderTitle,
  HeaderRight,
  Section,
  RoundButton,
  CountryPicker
} from 'elements';
import { App } from 'components';
import { signupRequest } from 'redux/auth/actions';
import { selectState } from 'redux/selectors';

const Container = styled.View`
  padding: 80px 30px;
`;

class SignUp extends Component {
  static propTypes = {
    signupRequest: PropTypes.func.isRequired,
    signupRequestRequesting: PropTypes.bool
  };

  static contextTypes = {
    currentTheme: PropTypes.shape(),
    formatMessage: PropTypes.func
  };

  static defaultProps = {
    signupRequestRequesting: false
  };

  state = {
    pickerData: null
  };

  componentDidMount() {
    this.onGetPickerData();
  }

  onGetPickerData = () => {
    if (this.phone) {
      this.setState({
        pickerData: this.phone.getPickerData()
      });
    } else {
      setTimeout(this.onGetPickerData, 500);
    }
  };

  onPressFlag = () => {
    this.myCountryPicker.open();
  };

  selectCountry = country => {
    this.phone.selectCountry(country.iso2);
  };

  render() {
    const { currentTheme, formatMessage } = this.context;
    const { signupRequest, signupRequestRequesting } = this.props;
    const { errText, pickerData } = this.state;

    return (
      <App loading={signupRequestRequesting}>
        <HeaderTitle theme={currentTheme}>
          {formatMessage('auth.signup.headerTitle')}
        </HeaderTitle>
        <HeaderRight />
        <Section>
          <Container>
            <H4 mb={30} mt={30}>
              {formatMessage('auth.signup.displayText')}
            </H4>

            <View>
              <PhoneInput
                textStyle={{
                  color: currentTheme.COLORS.PRIMARY
                }}
                textProps={{
                  placeholder: formatMessage(
                    'auth.signup.phoneNumber.placeHolder'
                  ),
                  placeholderTextColor: currentTheme.COLORS.PRIMARY,
                  style: {
                    color: currentTheme.COLORS.PRIMARY,
                    borderWidth: 1,
                    borderColor: currentTheme.COLORS.BORDER,
                    height: 40,
                    fontSize: 16,
                    borderRadius: 4,
                    paddingHorizontal: 5
                  }
                }}
                initialCountry="us"
                ref={ref => {
                  this.phone = ref;
                }}
                onPressFlag={this.onPressFlag}
              />

              <CountryPicker
                ref={ref => {
                  this.myCountryPicker = ref;
                }}
                data={pickerData}
                onChange={country => {
                  this.selectCountry(country);
                }}
                cancelText="Cancel"
              />
            </View>

            <H6 mt={5} mb={30}>
              {errText}
            </H6>

            <RoundButton
              onPress={() => {
                const isValid = this.phone.isValidNumber();
                if (isValid) {
                  const phone = this.phone.getValue();
                  signupRequest({
                    phone,
                    onSuccess: () => Actions['auth.sms']({ phone })
                  });
                  this.setState({ errText: '' });
                } else {
                  this.setState({
                    errText: formatMessage(
                      'auth.signup.phoneNumber.validationError'
                    )
                  });
                }
              }}
            >
              <H4>{formatMessage('auth.signup.buttonText')}</H4>
            </RoundButton>
          </Container>
        </Section>
      </App>
    );
  }
}

const mapStateToProps = state => ({
  ...selectState('auth', 'signupRequest')(state)
});

const mapDispatchToProps = dispatch => ({
  signupRequest: payload => dispatch(signupRequest(payload))
});

export default compose(
  setDisplayName('SignUp'),
  connect(mapStateToProps, mapDispatchToProps)
)(SignUp);

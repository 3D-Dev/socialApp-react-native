import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Modal } from 'react-native';

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.View`
  width: ${props => (props.width ? `${props.width}px` : '90%')};
  height: ${props => (props.height ? `${props.height}px` : 'auto')};
  background-color: ${({ theme }) => theme.COLORS.PRIMARY_BG};
  border-color: ${({ theme }) => theme.COLORS.BORDER};
  border-width: 1;
  border-radius: 10;
  padding-top: 20px;
  justify-content: center;
  align-items: center;
  max-height: 80%;
`;

class DisplayModal extends Component {
  static propTypes = {
    modalVisible: PropTypes.bool,
    children: PropTypes.node.isRequired,
    modalWidth: PropTypes.number,
    modalHeight: PropTypes.number
  };

  static defaultProps = {
    modalVisible: false,
    modalWidth: undefined,
    modalHeight: undefined
  };

  render() {
    const { modalVisible, children, modalWidth, modalHeight } = this.props;
    return (
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}
      >
        <Container style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <ModalContent width={modalWidth} height={modalHeight}>
            {children}
          </ModalContent>
        </Container>
      </Modal>
    );
  }
}

export default DisplayModal;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import { Row } from 'react-native-easy-grid';

import { Avatar, NoAvatar, H6, Text } from 'elements';
import styled from 'styled-components';

const Wrapper = styled.View`
  width: 100%;
`;

const ScrollViewWrapper = styled.ScrollView`
  padding: 5px;
  background-color: ${({ theme, isDropdown }) =>
    isDropdown ? theme.COLORS.PRIMARY_BG : 'transparent'};
`;

const DropdownOverlay = styled.TouchableOpacity`
  left: 0;
  top: 0;
  height: 10000px;
  width: 100%;
`;

const AvatarWrapper = styled.View`
  width: 80px;
  height: 80px;
`;

const TextContainer = styled.View`
  flex-direction: row;
  height: 55px;
  width: 100%;
`;

const TextArea = styled.View`
  margin-top: 17px;
  margin-left: 10px;
  background-color: transparent;
`;

const SearchTextInput = styled.TextInput`
  margin: 0px;
  margin-top: 10px;
  margin-left: -25px;
  padding: 5px;
  padding-left: 30px;
  height: 35px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.COLORS.BORDER};
  color: ${({ theme }) => theme.COLORS.PRIMARY};
  border-radius: 5px;
`;

const ListItem = styled.TouchableOpacity`
  padding: 7px;
  margin-bottom: 6px;
  background-color: ${({ theme }) => theme.COLORS.SECTION_BG};
  flex-direction: row;
  justify-content: space-between;
  border-radius: 5;
`;

const CenteredCol = styled.View`
  padding: 10px 15px;
  align-items: flex-start;
  justify-content: center;
  flex: 1;
`;

const IconWrapper = styled.View`
  padding: 10px 15px;
  align-items: center;
  justify-content: center;
`;

const CustomIcon = styled(Icon)`
  font-size: ${({ size }) => (size ? `${size}px` : '30px')};
  color: ${({ color }) => color || '#00a2dd'};
`;

class UserListMultiPicker extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape),
    search: PropTypes.bool,
    searchIconName: PropTypes.string,
    placeholder: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    scrollViewHeight: PropTypes.number,
    selectedIconName: PropTypes.string,
    unselectedIconName: PropTypes.string,
    selected: PropTypes.arrayOf(PropTypes.shape),
    multiple: PropTypes.bool,
    callback: PropTypes.func,
    isDropdown: PropTypes.bool
  };

  static defaultProps = {
    multiple: true,
    selected: [],
    data: [],
    search: true,
    searchIconName: 'ios-search',
    placeholder: 'Type your user name',
    placeholderTextColor: '#757575',
    scrollViewHeight: 130,
    selectedIconName: 'ios-checkmark-circle-outline',
    unselectedIconName: 'ios-add-circle-outline',
    isDropdown: false,
    callback: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      selected: props.selected,
      focused: false
    };
  }

  onSelect = item => {
    let { selected } = this.state;
    const { multiple, callback, isDropdown } = this.props;
    if (isDropdown) {
      selected = [item];
      this.setState({ selected });
    } else if (multiple) {
      const selectedIds = selected.map(i => i._id);
      if (selectedIds.indexOf(item._id) === -1) {
        selected.push(item);
        this.setState({ selected });
      } else {
        selected = selected.filter(i => i._id !== item._id);
        this.setState({ selected });
      }
    } else if (selected.indexOf(item) === -1) {
      selected = [item];
      this.setState({ selected });
    } else {
      selected = [];
      this.setState({ selected });
    }
    callback(selected);
  };

  onSearch = text => {
    this.setState({
      searchText: text.length > 0 ? text.toLowerCase() : null
    });
  };

  isSelected = item => {
    const { selected } = this.state;
    const selectedIds = selected.map(i => i._id);

    if (selectedIds.indexOf(item._id) === -1) {
      return false;
    }
    return true;
  };

  filterObjectByName = (array, filter) => {
    return array.filter(
      e => e.name && e.name.toLowerCase().includes((filter || '').toLowerCase())
    );
  };

  render() {
    const {
      data,
      search,
      searchIconName,
      placeholder,
      placeholderTextColor,
      scrollViewHeight,
      selectedIconName,
      unselectedIconName,
      isDropdown
    } = this.props;
    const { searchText, focused } = this.state;

    const list = this.filterObjectByName(data, searchText);
    return (
      <Wrapper isDropdown={isDropdown}>
        {search && (
          <TextContainer>
            <TextArea>
              <CustomIcon
                color={placeholderTextColor}
                size={20}
                name={searchIconName}
              />
            </TextArea>
            <SearchTextInput
              onChangeText={text => {
                this.onSearch(text);
              }}
              clearButtonMode="always"
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor}
              underlineColorAndroid="transparent"
              onFocus={() => this.setState({ focused: true })}
            />
          </TextContainer>
        )}
        {(!isDropdown || focused) && (
          <ScrollViewWrapper
            style={{ height: scrollViewHeight }}
            nestedScrollEnabled
            isDropdown={isDropdown}
          >
            {list.map((item, index) => {
              const itemKey = item._id;
              return (
                <ListItem
                  key={`${index}_${itemKey}`}
                  onPress={() => {
                    this.onSelect(item);
                    this.setState({ focused: false });
                  }}
                >
                  <Row>
                    <AvatarWrapper>
                      {item.avatar ? (
                        <Avatar source={item.avatar} size={80} />
                      ) : (
                        <NoAvatar size={80} />
                      )}
                    </AvatarWrapper>

                    <CenteredCol>
                      <H6>{item.name}</H6>
                      {item.info && <Text>{item.info}</Text>}
                    </CenteredCol>
                  </Row>
                  <IconWrapper>
                    {this.isSelected(item)
                      ? Boolean(selectedIconName) && (
                          <CustomIcon name={selectedIconName} color="white" />
                        )
                      : Boolean(unselectedIconName) && (
                          <CustomIcon name={unselectedIconName} />
                        )}
                  </IconWrapper>
                </ListItem>
              );
            })}
          </ScrollViewWrapper>
        )}
        {isDropdown && focused && (
          <DropdownOverlay onPress={() => this.setState({ focused: false })} />
        )}
      </Wrapper>
    );
  }
}

export default UserListMultiPicker;

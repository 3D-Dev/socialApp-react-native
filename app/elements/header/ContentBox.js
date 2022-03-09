import { Component } from 'react';
import PropTypes from 'prop-types';
import { startCase } from 'lodash';
import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';

import immutableToJS from 'utils/immutableToJS';
import * as uiActions from 'redux/ui/actions';
import { getSelector } from 'redux/selectors';

const ContentBox = ({
  name,
  contentKey,
  propName = 'children',
  noClear = false
}) => {
  const funcKey = `set${startCase(contentKey)}`.split(' ').join('');
  const list = [];

  class Box extends Component {
    static propTypes = (() => ({
      [propName]: PropTypes.any,
      [contentKey]: PropTypes.any,
      [funcKey]: PropTypes.func.isRequired
    }))();

    static defaultProps = (() => ({
      [propName]: null,
      [contentKey]: null
    }))();

    componentWillMount() {
      list.push(this);
      const { [funcKey]: func, [propName]: prop } = this.props;
      func(prop);
    }

    componentWillReceiveProps(nextProps) {
      const { [propName]: prop } = this.props;
      if (nextProps[propName] !== prop) {
        nextProps[funcKey](nextProps[propName]);
      }
    }

    componentWillUnmount() {
      if (noClear) return;
      const index = list.indexOf(this);
      list.splice(index, 1);
      const last = list[list.length - 1];
      const { [funcKey]: func } = this.props;
      if (last) {
        func(last.props[propName]);
      } else {
        func(null);
      }
    }

    render() {
      return null;
    }
  }

  const mapStateToProps = state => ({
    [contentKey]: getSelector('ui', contentKey)(state)
  });

  const mapDispatchToProps = dispatch => ({
    [funcKey]: node => dispatch(uiActions[funcKey](node))
  });

  return compose(
    setDisplayName(name),
    connect(mapStateToProps, mapDispatchToProps),
    immutableToJS
  )(Box);
};

export default ContentBox;

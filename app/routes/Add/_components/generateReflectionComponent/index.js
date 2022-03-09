import { Component } from 'react';
import PropTypes from 'prop-types';

const generateReflectionComponent = type => {
  class AddReflection extends Component {
    static contextTypes = {
      formatMessage: PropTypes.func,
      currentTheme: PropTypes.shape(),
      reflection: PropTypes.arrayOf(PropTypes.shape()),
      appSettings: PropTypes.shape(),
      addReflections: PropTypes.func,
      updateReflections: PropTypes.func,
      removeReflections: PropTypes.func,
      resetReflections: PropTypes.func,
      addReflection: PropTypes.func,
      updateReflectionByIndex: PropTypes.func,
      removeReflectionByIndex: PropTypes.func,
      reflectionRequesting: PropTypes.bool
    };

    onAddReflection = data => {
      const {
        addReflection,
        addReflections,
        resetReflections,
        appSettings
      } = this.context;
      if (appSettings.online) {
        addReflections({
          data: { [type.toLowerCase()]: [data] },
          onSuccess: ({ reflections }) => resetReflections(reflections, type),
          onFailure: () => addReflection(data, type)
        });
      } else {
        addReflection(data, type);
      }
    };

    onRemoveReflection = (_id, index) => {
      const {
        appSettings,
        removeReflections,
        resetReflections,
        removeReflectionByIndex
      } = this.context;
      if (appSettings.online && _id) {
        removeReflections({
          data: [_id],
          onSuccess: ({ reflections }) => resetReflections(reflections, type),
          onFailure: () => removeReflectionByIndex(index, type)
        });
      } else {
        removeReflectionByIndex(index, type);
      }
    };

    onUpdateReflection = (data, _id, index) => {
      const {
        reflection,
        appSettings,
        updateReflections,
        resetReflections,
        updateReflectionByIndex
      } = this.context;
      if (appSettings.online && _id) {
        const oldData = reflection.find(
          ({ _id: reflectionId }) => _id === reflectionId
        ).data;
        updateReflections({
          data: [{ _id, data: { ...oldData, ...data } }],
          onSuccess: ({ reflections }) => resetReflections(reflections, type),
          onFailure: () => updateReflectionByIndex(index, data, type)
        });
      } else {
        updateReflectionByIndex(index, data, type);
      }
    };

    render() {
      return null;
    }
  }
  return AddReflection;
};

export default generateReflectionComponent;

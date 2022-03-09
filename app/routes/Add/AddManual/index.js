import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { AntDesign } from '@expo/vector-icons';

import { Section, HeaderButton, HeaderTitle, HeaderRight } from 'elements';
import { App } from 'components';
import { generateReflectionComponent } from 'routes/Add/_components';

import { ManualSection } from './_components';

class AddManual extends generateReflectionComponent('Manual') {
  onInputManual = () => {
    Actions['add.manual.create']({ onAdd: this.onAddReflection });
  };

  render() {
    const {
      currentTheme,
      formatMessage,
      reflection,
      reflectionRequesting
    } = this.context;
    const manuals = reflection.filter(({ type }) => type === 'Manual');
    return (
      <App loading={reflectionRequesting}>
        <HeaderTitle>{formatMessage('add.manual.headerTitle')}</HeaderTitle>
        <HeaderRight>
          <HeaderButton onPress={this.onInputManual}>
            {formatMessage('add.addButton')}
          </HeaderButton>
        </HeaderRight>

        {manuals.map(
          (
            { _id, data: { title, text, image, tags, vulnerability }, removed },
            index
          ) =>
            removed ? null : (
              <Section key={`${index}-${text}`}>
                <ManualSection
                  title={title}
                  tags={tags}
                  vulnerability={vulnerability}
                  text={text}
                  image={image}
                  hasDelete
                  onUpdate={update => {
                    this.onUpdateReflection(update, _id, index);
                  }}
                  onDelete={() => this.onRemoveReflection(_id, index)}
                />
              </Section>
            )
        )}
        <Section align="left">
          <TouchableOpacity onPress={this.onInputManual}>
            <AntDesign
              name="plus"
              size={60}
              color={currentTheme.COLORS.PRIMARY}
            />
          </TouchableOpacity>
        </Section>
      </App>
    );
  }
}

export default AddManual;

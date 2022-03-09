import React from 'react';
import { capitalize } from 'lodash';

import { Section, HeaderTitle, HeaderRight } from 'elements';
import { App } from 'components';

import CreateIcon from './CreateIcon';
import ValueSection from './ValueSection';
import NeedSection from './NeedSection';
import EmotionSection from './EmotionSection';
import generateReflectionComponent from '../generateReflectionComponent';

const Sections = {
  value: ValueSection,
  need: NeedSection,
  emotion: EmotionSection
};

const generateSectionList = sectionType => {
  class SectionList extends generateReflectionComponent(sectionType) {
    render() {
      const { formatMessage, reflection, reflectionRequesting } = this.context;
      const values = reflection.filter(({ type }) => type === sectionType);
      return (
        <App loading={reflectionRequesting}>
          <HeaderTitle>
            {capitalize(
              formatMessage('section.list', {
                sectionType: sectionType.toLowerCase()
              })
            )}
          </HeaderTitle>
          <HeaderRight />
          {values.map(({ _id, data, removed }, index) => {
            if (removed) return null;
            const SectionComponent = Sections[sectionType.toLowerCase()];
            return (
              <SectionComponent
                key={index}
                data={data}
                hasDelete
                onUpdate={update => {
                  this.onUpdateReflection(update, _id, index);
                }}
                onDelete={() => {
                  this.onRemoveReflection(_id, index);
                }}
              />
            );
          })}

          <Section align="left">
            <CreateIcon
              sectionType={sectionType.toLowerCase()}
              onAdd={this.onAddReflection}
            />
          </Section>
        </App>
      );
    }
  }
  return SectionList;
};

export default generateSectionList;

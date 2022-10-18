import React, {useCallback} from 'react';
import {IdentifierGenerator, LabelCollection} from '../../../models';
import {Field, SectionTitle, TextInput} from 'akeneo-design-system';
import {IdentifierAttributeSelector} from '../IdentifierAttributeSelector';
import {Styled} from '../Styled';
import {LabelTranslations} from './LabelTranslations';
import {useTranslate} from '@akeneo-pim-community/shared';

type GeneralPropertiesProps = {
  generator: IdentifierGenerator;
  onGeneratorChange: (generator: IdentifierGenerator) => void;
};

const GeneralProperties: React.FC<GeneralPropertiesProps> = ({generator, onGeneratorChange}) => {
  const translate = useTranslate();

  const onLabelChange = useCallback(
    (labels: LabelCollection) => onGeneratorChange({...generator, labels}),
    [onGeneratorChange, generator]
  );

  return (
    <>
      <SectionTitle>
        <SectionTitle.Title>{translate('pim_identifier_generator.general.title')}</SectionTitle.Title>
      </SectionTitle>
      <Styled.FormContainer>
        <Field label={'pim_common.code'}>
          <TextInput value={generator.code} readOnly={true} />
        </Field>
        <IdentifierAttributeSelector code={generator.target || ''} />
      </Styled.FormContainer>
      <LabelTranslations labelCollection={generator.labels} onLabelsChange={onLabelChange} />
    </>
  );
};

export {GeneralProperties};

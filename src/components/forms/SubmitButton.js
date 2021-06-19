import React from 'react';
import { useFormikContext } from 'formik';
import { AppButtonFilled } from '../AppButtons';

function SubmitButton({ label, icon = 'check-bold' }) {
  const { handleSubmit } = useFormikContext();
  return (
    <AppButtonFilled
      label={label}
      onPress={handleSubmit}
      width='wide'
      bgColor='primary'
      textColor='white'
      icon={icon}
      addlStyle={{ marginBottom: 15 }}
    />
  );
}

export default SubmitButton;

import React from 'react';
import AppText from '../AppText';

function ErrorMessage({ error, visible }) {
  if (!visible || !error) return null;
  return <AppText variant='error'>{error}</AppText>;
}

export default ErrorMessage;

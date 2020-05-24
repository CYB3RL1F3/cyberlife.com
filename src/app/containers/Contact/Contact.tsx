import React, { FC, useCallback, MouseEvent, useState } from 'react';
import { captureException } from '@sentry/browser';
import { ContactForm } from 'app/components/organisms/ContactForm';
import { sendMail } from 'app/actions';
import { ContactSuccess } from 'app/components/organisms/ContactSuccess';

export const Contact: FC = () => {
  const [sent, setSent] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean>(false);
  const reset = useCallback((e: MouseEvent = null) => {
    if (e) e.preventDefault();
    setFailed(false);
    setSent(false);
  }, [setSent, setFailed]);

  const onSubmit = useCallback((values, { setSubmitting }) => {
    setSubmitting(true);
    reset();
    sendMail(values)
      .then(({ status }) => {
        if (status === 200) {
          setSent(true);
        }
      })
      .catch((error) => {
        setFailed(true);
        setSubmitting(false);
        captureException(error);
      });
  }, [setSent, setFailed]);

  return !sent ? (
      <ContactForm onSubmit={onSubmit} hasFailed={failed} />
    ) : (
      <ContactSuccess returnAction={reset} />
    );
}

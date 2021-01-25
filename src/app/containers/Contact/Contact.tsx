import React, { FC, Suspense, lazy, useCallback, MouseEvent, useState } from 'react';
import { captureException } from '@sentry/browser';
import { sendMail } from 'app/actions';
const ContactForm = lazy(() => import('app/components/organisms/ContactForm'));
const ContactSuccess = lazy(() => import('app/components/organisms/ContactSuccess'));

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
      <Suspense fallback={<div />}>
        <ContactForm onSubmit={onSubmit} hasFailed={failed} />
      </Suspense>
    ) : (
      <Suspense fallback={<div />}>
        <ContactSuccess returnAction={reset} />
      </Suspense>
    );
}

export default Contact;
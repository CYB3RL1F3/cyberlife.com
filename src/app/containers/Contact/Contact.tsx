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

/*

export class Contact extends React.Component<{}, ContactState> {
  state = {
    sent: false,
    failed: false
  };

  reset = (e: React.MouseEvent) => {
    e.preventDefault();
    this.setState({
      sent: false
    });
  };

  onSubmit = (values, { props = this.props, setSubmitting }) => {
    //process form submission here
    //done submitting, set submitting to false
    setSubmitting(true);
    this.setState({
      sent: false,
      failed: false
    });
    sendMail(values)
      .then((response) => {
        if (response.status === 200) {
          setSubmitting(false);
          this.setState({
            sent: true
          });
        }
      })
      .catch((error) => {
        setSubmitting(false);
        this.setState({
          failed: true
        });
        Sentry.captureException(error);
      });
    return;
  };

  render() {
    return !this.state.sent ? (
      <ContactForm onSubmit={this.onSubmit} hasFailed={this.state.failed} />
    ) : (
      <ContactSuccess returnAction={this.reset} />
    );
  }
}

*/
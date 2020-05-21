import React from 'react';
import * as Sentry from '@sentry/browser';
import { ContactForm } from 'app/components/organisms/ContactForm';
import { sendMail } from 'app/actions';
import { ContactSuccess } from 'app/components/organisms/ContactSuccess';

interface ContactState {
  sent: boolean;
  failed: boolean;
}

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

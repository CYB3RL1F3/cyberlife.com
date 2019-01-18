import * as React from 'react';
import { ContactForm } from 'app/components/organisms/ContactForm';
import { sendMail } from 'app/actions';
import { ContactSuccess } from 'app/components/organisms/ContactSuccess';

interface ContactState {
  sent: boolean;
}

export class Contact extends React.Component<{}, ContactState> {
  state = {
    sent: false
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
    sendMail(values).then((response) => {
      if (response.status === 200) {
        setSubmitting(false);
        this.setState({
          sent: true
        });
      }
    });
    return;
  };

  render() {
    return !this.state.sent ? (
      <ContactForm onSubmit={this.onSubmit} />
    ) : (
      <ContactSuccess returnAction={this.reset} />
    );
  }
}

import * as React from 'react';
import { Formik } from 'formik';
import {
  Form,
  Input,
  Textarea,
  SubmitWrapper,
  Submit,
  Loading,
  ErrorField,
  Bottom
} from './ContactForm.styled';
import { validate, initialValues } from './ContactForm.data';

interface ContactFormProps {
  onSubmit: any;
}

interface ContactFormState {
  vibrated: boolean;
}

export class ContactForm extends React.Component<
  ContactFormProps,
  ContactFormState
> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      vibrated: false
    };
  }

  vibrate = () => {
    if (navigator.vibrate && !this.state.vibrated) {
      navigator.vibrate(300);
      setTimeout(() => {
        this.setState({
          vibrated: true
        });
      }, 10);
    }
  };

  checkAndVibrate = (errors, touched) => {
    Object.keys(errors).forEach((error) => {
      if (errors[error] && touched[error]) {
        this.vibrate();
      }
    });
  };

  render() {
    const { onSubmit } = this.props;
    return (
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => {
          this.checkAndVibrate(errors, touched);
          return (
            <Form onSubmit={handleSubmit}>
              <Input
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                placeholder="name"
                haserror={errors.name && touched.name ? 'true' : 'false'}
                index={1}
              />
              <Input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="email"
                haserror={errors.email && touched.email ? 'true' : 'false'}
                index={2}
              />
              <Input
                type="text"
                name="subject"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.subject}
                placeholder="subject"
                haserror={errors.subject && touched.subject ? 'true' : 'false'}
                index={3}
              />
              <Textarea
                component="textarea"
                name="message"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.message}
                placeholder="message"
                index={4}
                haserror={errors.message && touched.message ? 'true' : 'false'}
              />
              <Bottom index={5}>
                <ErrorField>
                  {Object.keys(errors).map(
                    (error: string) =>
                      touched[error] && (
                        <React.Fragment key={error}>
                          {errors[error]} <br />
                        </React.Fragment>
                      )
                  )}
                </ErrorField>
                <SubmitWrapper>
                  <Submit type="submit" disabled={isSubmitting}>
                    {isSubmitting ? <Loading /> : 'Send'}
                  </Submit>
                </SubmitWrapper>
              </Bottom>
            </Form>
          );
        }}
      </Formik>
    );
  }
}

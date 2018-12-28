import * as React from 'react';
import { Formik } from 'formik';
import {
  Form,
  Input,
  Textarea,
  SubmitWrapper,
  Submit,
  Loading
} from './ContactForm.styled';
import { validate, initialValues } from './ContactForm.data';

interface ContactFormProps {
  onSubmit: any;
}

export class ContactForm extends React.Component<ContactFormProps, {}> {
  constructor(props, context) {
    super(props, context);
  }
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
        }) => (
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              placeholder="name"
              hasError={errors.name && touched.name}
            />
            <Input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder="email"
              hasError={errors.email && touched.email}
            />
            <Input
              type="text"
              name="subject"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.subject}
              placeholder="subject"
              hasError={errors.subject && touched.subject}
            />
            <Textarea
              component="textarea"
              name="message"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.message}
              placeholder="message"
              hasError={errors.message && touched.message}
            />

            <SubmitWrapper>
              <Submit type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Loading /> : 'Send'}
              </Submit>
            </SubmitWrapper>
          </Form>
        )}
      </Formik>
    );
  }
}

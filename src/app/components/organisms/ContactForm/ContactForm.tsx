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
              index={1}
            />
            <Input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder="email"
              hasError={errors.email && touched.email}
              index={2}
            />
            <Input
              type="text"
              name="subject"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.subject}
              placeholder="subject"
              hasError={errors.subject && touched.subject}
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
              hasError={errors.message && touched.message}
            />
            <Bottom index={5}>
              <ErrorField>
                {Object.keys(errors).map(
                  (error: string) =>
                    touched[error] && (
                      <>
                        {errors[error]} <br />
                      </>
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
        )}
      </Formik>
    );
  }
}

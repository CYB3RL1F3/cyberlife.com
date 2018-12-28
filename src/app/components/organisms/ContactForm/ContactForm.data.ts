interface Schema {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const initialValues: Schema = {
  name: '',
  email: '',
  subject: '',
  message: ''
};

const required = (value) =>
  value && value.trim() !== '' ? undefined : 'required';

const validateEmail = (email) => {
  let msg = undefined;
  if (!email) {
    msg = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    msg = 'Invalid email address';
  }
  return msg;
};

export const validate = (values) => {
  const errors: Schema = {};
  const email = validateEmail(values.email);
  const name = required(values.name);
  const subject = required(values.subject);
  const message = required(values.message);
  if (email) errors.email = email;
  if (name) errors.name = name;
  if (subject) errors.subject = subject;
  if (message) errors.message = message;
  console.log(errors);
  return errors;
};

import Email from '../models/email.model.mjs';
import {sendEmailFrom} from '../services/email.service.mjs'

export const createEmail = async (req, res) => {
  const { from, subject, message } = req.body;

  try {
    const email = new Email({
      to:'kouete678@gmail.com',
      from,
      subject,
      message,
    });

    await email.save();
    await sendEmailFrom(from, subject, message);

    res.status(201).send(email);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
    throw new Error(error)
  }
};
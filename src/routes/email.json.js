import Email from '../server/email'
import { messages } from '../strings';

export const post = (req, res, next) => {
  const { email, text } = req.body;
  Email.send({
    from: messages.EMAIL_SUPPORT,
    to: email,
    subject: 'dd',
    text
  })
    .then(s => {
      console.log(s, 'ot');
      res.status(200).json({ ok: true });
    })
    .catch(e => {
      console.log(e);
      res.status(500).end()
    })
}

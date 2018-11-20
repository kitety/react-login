import express from 'express'
import User from '../models/user.mjs'
import bcrypt from 'bcrypt'


let router = express.Router();
router.post('/', (req, res) => {
  const { identifier, password } = req.body

  User.query({
    where: { username: identifier },
    orWhere: { email: identifier }
  }).fetch().then(user => {
    console.log(res);
    if (user) {
      if (bcrypt.compareSync(password, user.get('password_digest'))) {
        //
      } else {
        res.status(401).json({ errors: { form: 'Invalid Credential' } })
      }
    } else {
      res.status(401).json({ errors: { form: 'Invalid Credential' } })
    }
  })
})
export default router;

import express from 'express';
import isEmpty from 'lodash/isEmpty'
import validator from 'validator'
import User from '../models/user.mjs'
import bcrypt from 'bcrypt'
import Promise from 'bluebird'

let router = express.Router()
const validataInput = (data, otherValiddations) => {
  let { errors } = otherValiddations(data);
  return Promise.all([
    User.where({ email: data.email }).fetch().then(user => {
      if (user) {
        errors.email = 'There is a such email'
      }
    }),
    User.where({ username: data.username }).fetch().then(user => {
      if (user) {
        errors.username = 'There is a such username'
      }
    })
  ]).then(() => {
    return {
      errors,
      isValid: isEmpty(errors)
    }
  })
}
// 基础验证
const commonValidataInput = (data) => {
  let errors = {}
  if (validator.isEmpty(data.username)) {
    errors.username = " The field is required."
  }
  if (validator.isEmpty(data.email)) {
    errors.email = " The field is required."
  }
  if (validator.isEmpty(data.password)) {
    errors.password = " The field is required."
  }
  if (validator.isEmpty(data.passwordConfirm)) {
    errors.passwordConfirm = " The field is required."
  }
  if (!validator.equals(data.password, data.passwordConfirm)) {
    errors.passwordConfirm = "Password must match."
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}
router.post('/', (req, res) => {
  validataInput(req.body, commonValidataInput).then(({ errors, isValid }) => {
    if (isValid) {
      const { username, password, email } = req.body;
      // 对密码十位hash加密
      const password_digest = bcrypt.hashSync(password, 10);
      // 存储,并且有时间戳
      User.forge({
        username, password_digest, email
      }, { hasTimestamps: true }).save()
        .then(() => { res.json({ success: true }) })
        .catch(err => { res.status(404).json(err) })
    } else {
      return res.status(404).json(errors)
    }
  })
})
export default router;

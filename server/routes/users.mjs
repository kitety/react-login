import express from 'express';
import isEmpty from 'lodash/isEmpty'
import validator from 'validator'
import User from '../models/user.mjs'
import bcrypt from 'bcrypt'
// import Promise from 'bluebird'

let router = express.Router()
const validataInput = (data, otherValiddations) => {
  let { errors } = otherValiddations(data);
  return User.query({
    where: { email: data.email },
    orWhere: { username: data.username }
  }).fetch().then(user => {
    if (user) {
      if (user.get('email') === data.email) {
        errors.email = 'There is an email with such email'
      }
      if (user.get('username') === data.username) {
        errors.username = 'There is a username with such username'
      }
    }
    return {
      errors,
      isValid: isEmpty(errors)
    }
  })

  // Promise 版本
  // return Promise.all([
  //   User.where({ email: data.email }).fetch().then(user => {
  //     if (user) {
  //       errors.email = 'There is an email with such email'
  //     }
  //   }),
  //   User.where({ username: data.username }).fetch().then(user => {
  //     if (user) {
  //       errors.username = 'There is a username with such username'
  //     }
  //   })
  // ]).then(() => {
  //   return {
  //     errors,
  //     isValid: isEmpty(errors)
  //   }
  // })
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
router.get('/username/:identifier', (req, res) => {
  User.query({
    select: ['username', 'email'],
    where: { username: req.params.identifier }
  }).fetch().then(user=>{
    res.json({user})
  })
})
router.get('/email/:identifier', (req, res) => {
  User.query({
    select: [ 'email'],
    where: { email: req.params.identifier },
  }).fetch().then(user=>{
    res.json({user})
  })
})
export default router;

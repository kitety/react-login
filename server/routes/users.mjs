import express from 'express';
import isEmpty from 'lodash/isEmpty'
import validator from 'validator'

let router = express.Router()
const validataInput = (data) => {
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
  const { errors, isValid } = validataInput(req.body)
  if (isValid) {
    res.json({success:true})
  } else {
    return res.status(404).json(errors)
  }
})
export default router;

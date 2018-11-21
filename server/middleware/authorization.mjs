import jwt from 'jsonwebtoken'
import config from '../config'
import User from '../models/user'

export default (req, res, next) => {
  // 取出头部信息
  const authorization = req.headers['authorization']

  let token;
  if (authorization) {
    // 取出token
    token = authorization.split(' ')[1];
  }
  if (token) {
    jwt.verify(token, config.jwtSerect, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: 'Failed to authorization' })
      } else {
        User.query({
          where: { id: decoded.id },
          select: ['username', 'email', 'id']
        }).fetch().then(user => {
          if (!user) {
            res.status(404).json({ error: 'No such user' })
          } else {
            req.currentUser = user;
            next()
          }
        })
      }
    })
  } else {
    res.status(403).json({ error: 'No token provide' })

  }
}

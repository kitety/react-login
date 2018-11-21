import express from 'express';
let router = express.Router();
import authorization from '../middleware/authorization.mjs'

// authorization 中间件
router.post('/', authorization, (req, res) => {
  res.status(203).json({ success: true,user:req.currentUser})
})
export default router

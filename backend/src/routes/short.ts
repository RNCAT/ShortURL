import { Router } from 'express'
import { createShortURL, getAllShortURL } from '../handlers/short'

const router: Router = Router()

router.get('/', getAllShortURL)
router.post('/', createShortURL)

export default router

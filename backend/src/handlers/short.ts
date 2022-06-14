import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import ShortUniqueId from 'short-unique-id'

const prisma = new PrismaClient()

export async function getShortURL(req: Request, res: Response) {
  try {
    const shortURL = req.params.short_url
    const URL = await prisma.short.findUnique({ where: { shortURL } })

    if (URL) {
      const addedCount = URL.count + 1

      await prisma.short.update({ data: { count: addedCount }, where: { id: URL.id } })

      res.redirect(URL.longURL)
    }
  } catch (error) {
    res.status(500).json({ status: 'error', message: error })
  }
}

export async function getAllShortURL(req: Request, res: Response) {
  try {
    const URLs = await prisma.short.findMany()

    res.status(200).json({ status: 'success', data: URLs })
  } catch (error) {
    res.status(500).json({ status: 'error', message: error })
  }
}

export async function createShortURL(req: Request, res: Response) {
  try {
    const longURL = req.body.long_url
    const uid = new ShortUniqueId({ length: 7 })
    const shortURL = uid()

    const URL = await prisma.short.create({
      data: { longURL, shortURL },
    })

    res.status(201).json({ status: 'success', data: URL })
  } catch (error) {
    res.status(500).json({ status: 'error', message: error })
  }
}

export default {
  getShortURL,
  getAllShortURL,
  createShortURL,
}

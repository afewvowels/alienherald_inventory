import nc from 'next-connect'
import db from '@db/firebase'

const handler = nc()

handler.get(async (req, res) => {
  await db
    .collection('palettes')
    .get()
    .then((palettes) => {
      let palettesArr = []
      palettes.forEach(palette => {
        palettesArr.push(palette.data())
      })
      res.status(201).json(palettesArr)
    })
    .catch((err) => res.status(401).send(`error getting palettes ${err.message}`))
})

export default handler
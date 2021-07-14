import nc from 'next-connect'
import db from '@db/firebase'

const handler = nc()

handler.get(async (req, res) => {
  const {
    query: { uuid }
  } = req

  await db
    .collection('palettes')
    .where('uuid', '==', uuid)
    .get()
    .then((palettes) => {
      let palettesArr = []
      palettes.forEach(palette => {
        palettesArr.push(palette.data())
      })
      res.status(201).json(palettesArr[0])
    })
    .catch((err) => res.status(401).send(`error getting palettes ${err.message}`))
})

export default handler
import nc from 'next-connect'
import db from '@db/firebase'

const handler = nc()

handler.get(async (req, res) => {
  await db
    .collection('categories')
    .orderBy('name')
    .get()
    .then((categories) => {
      let categoriesArr = []
      categories.forEach(category => {
        categoriesArr.push(category.data())
      })
      res.status(201).json(categoriesArr)
    })
    .catch((err) => res.status(401).send(`error getting categories ${err.message}`))
})

export default handler
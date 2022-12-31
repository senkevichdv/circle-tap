import {Realm, createRealmContext} from '@realm/react'

export interface IScore {
  _id: string
  score: number
  date: string
  isEndless: boolean
  gameTime: number
}

const ScoreSchema = {
  name: 'Score',
  properties: {
    _id: {type: 'objectId', default: () => new Realm.BSON.ObjectId()},
    score: 'int',
    date: 'string',
    isEndless: 'bool',
    gameTime: 'int',
  },
  primaryKey: '_id',
}

const {RealmProvider, useRealm, useQuery} = createRealmContext({
  schema: [ScoreSchema],
})

export {RealmProvider, useRealm, useQuery, ScoreSchema}

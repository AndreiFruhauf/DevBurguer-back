import Sequelize from 'sequelize'
import mongoose from 'mongoose'

import Product from '../app/models/Products'
import User from '../app/models/User'
import Category from '../app/models/Category'

import configDatabase from '../config/database'

const models = [User, Product, Category]

class Database {
  constructor() {
    this.init()
    this.mongo()
  }

  init() {
    this.connection = new Sequelize(
      'postgresql://postgres:COqwTqEUHyFrqJBYSwDfTGrdLruiChUl@monorail.proxy.rlwy.net:53833/railway',
    )
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models),
      )
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://mongo:JhXOjmAyJOhUrmcpbmHQdRHwaTCaUAJY@roundhouse.proxy.rlwy.net:21594',
    )
  }
}

export default new Database()

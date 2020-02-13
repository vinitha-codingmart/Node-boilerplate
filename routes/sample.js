const router = require('express').Router()


class sampleRoute {
  constructor(sampleContoller) {
    this.controller = sampleContoller
    this.init()
  }

  init() {
    router.use('/', async (req, res, next) => {
      next()
    })

    router.get('/sample1', async (req, res) => {
        try {
  
          const response = await this.controller.sample()
          res.json(response)
        } catch (err) {
          res.json({ code: 500, msg: 'getting Accesses Failed' })
        }
      })
    }
  
    // Get Router
    getRouter() {
      return router
    }
  }
  module.exports = controller => {
    return new sampleRoute(controller)
  }

const { Role } = require('../entities')

class roleController {
  async roleCreation (req, res) {
    const { value } = req.body
    const role = await Role.create({ value })
    return res.json(role)
  }
}

// eslint-disable-next-line new-cap
module.exports = new roleController()

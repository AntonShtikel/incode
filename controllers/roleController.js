const { Role } = require('../entities')

class roleController {
  async roleCreation (req, res) {
    const { value } = req.body
    const role = await Role.create({ value })
    return res.json(role)
  }
}

module.exports = new roleController()

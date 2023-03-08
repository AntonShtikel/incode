const { User} = require('../entities')

const bcrypt = require('bcryptjs')
class userController {
  async userCreate (req, res) {
    try {
      const { userName, password, referral, roleId } = req.body

      if (!userName || !password) {
        return res.json('UserName or password empty')
      }
      if (roleId === '2') {
        const admin = await User.findOne({ where: { roleId: '2' } })
        if (admin) {
          return res.json('Admin can be only one')
        }
      }

      const hashPassword = bcrypt.hashSync(password, 5)
      console.log(hashPassword)

      const candidate = await User.findOne({ where: { userName } })
      if (candidate) {
        return res.json('User  exists')
      }
      const refCheck = await User.findOne({ where: { referral } })
      if (!refCheck || refCheck.roleId === '1') {
        return res.json('Referral does not exist')
      }

      const user = await User.create({ userName, password: hashPassword, referral, roleId })
      return res.json('User created!')
    } catch (e) {
      res.json('registration error')
    }
  }

  async login (req, res) {
    const { userName, password } = req.body
    const user = await User.findOne({ where: { userName } })
    if (!user) {
      return res.json('False username')
    }
    const comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return res.json('False password:(')
    }
    return res.json('Logged in!')
  }

  async getUsers (req, res) {
    const { userName } = req.body
    const user = await User.findOne({ where: { userName } })
    if (!user) {
      return res.json('not authorized')
    }
    const userRole = user.roleId
    const ref = user.id
    let users
    if (userRole === 2) {
      users = await User.findAll()
    }
    if (userRole === 3) {
      users = await User.findAll({
        where: { referral: ref }
      }
      )
      users.unshift(user)
    }
    if (userRole === 1) {
      users = user
    }

    return res.json(users)
  }

  async updateUser (req, res) {
    const { userName, subordinateId, newRef } = req.body
    const newRefcheck = await User.findOne({ where: { id: newRef } })
    if (!newRefcheck) {
      return res.json('New Boss does not exist')
    }
    const bos = await User.findOne({ where: { userName } })
    if (!bos) {
      return res.json('Can`t authorize')
    }
    if (bos.roleId === 1) {
      return res.json('has no subordinates')
    }
    const subordinate = await User.findOne({ where: { id: subordinateId } })
    const changedSub = await subordinate.update({ referral: newRef })
    return res.json(changedSub)
  }
}

// eslint-disable-next-line new-cap
module.exports = new userController()

const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL, {logging: false});

const User = conn.define('user', {
  name: {
    type:conn.Sequelize.STRING
  }
})

User.belongsTo(User, {as: 'manager'})
User.hasMany(User, {as: 'employee', foreignKey: 'managerId' });

const sync = ()=> conn.sync({ force: true });


const seed = () => {
  const users = [ 'Larry', 'Moe', 'Curly'];
  return sync()
  .then(()=>{
    const promises = users.map( name => User.create({ name}))
    Promise.all(promises)
  })
}

module.exports = {
  seed,
  models: {
    User
  }
}

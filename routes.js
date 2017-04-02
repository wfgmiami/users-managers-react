const router = require('express').Router();
const models = require('./db').models;

router.get('/users',(req,res,next)=>{
  models.User.findAll(
    { order: 'name',
      include: [ {model: models.User, as: 'manager'}]
    }
  )
  .then( users => res.send(users))
  .catch(next);
})

router.get('/managers', (req,res,next)=>{
  models.User.findAll(
    {
      where:{ isManager: true },
      order: 'name',
      include: [{ model: models.User, as: 'employee'}]
    }
  )
  .then( managers => res.send(managers))
  .catch(next);
})

router.put('/users/:id', (req,res,next)=>{
  models.User.findById(req.params.id*1)
  .then( user => {
    user.managerId = req.body.managerId
    return user.save();
   })
  .then(() => models.User.findAll(
      { order: 'name',
        include: [ {model: models.User, as: 'manager'}]
      }
    )
  .then( users => res.send(users)))
  .catch(next);
})


module.exports = router;

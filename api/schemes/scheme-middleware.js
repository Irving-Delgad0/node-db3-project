const db = require('../../data/db-config')

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  const scheme = await db('schemes').where('scheme_id', req.params.scheme_id).first()
  if(scheme) {
    next()
  } else {
    next({message: `scheme with scheme_id ${req.params.scheme_id} not found`, status : 404})
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  if(!req.body.scheme_name === "" || typeof(req.body.scheme_name)!== "string"){
    next({message: 'invalid scheme_name', status: 400})
  } else {
    req.body.scheme_name = req.body.scheme_name.trim()
    next()
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  if((req.body.instructions === '' || typeof(req.body.instructions) != "string") 
  || (Number.isNaN(parseInt(req.body.step_number))) || req.body.step_number < 1) {
    next({message: 'invalid step', status: 400})
  } else {
    next()
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}

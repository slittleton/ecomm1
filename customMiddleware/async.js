/*
 * use with express-async-errors js
 * express-async-errors js (used in index.js root) will monkeypatch this 
 * function into async functions so that you don't have to use try catch
 * blocks in every async function which makes things look cleaner
 * 
 * this function works by taking in a middleware called handler
 * then it returns an async function with(req,res,next) which express will take
 * advantage of. Express will use this returned function to pass 
 * the req, res to the handler function while also calling that handler
 * within a try catch block. Meaning any handler this function is called on won't 
 * need its own try catch block in order to catch exceptions.
 */


module.exports = function asyncMiddleware(handler) {
  return async(req, res, next) => {
    try{
      await handler(req, res)
    }catch(ex){
      next(ex)
    }
  }
}
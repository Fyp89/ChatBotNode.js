// A global middleware function that will be executed for the all APIs
const globalMiddlewareFunction = (req, res, next) => {
    
    // Perform some operations or logic
    req.globalMessage = 'Global middleware executed!'

    // Check and set default values for limit and offset
    req.query.limit = parseInt(req.query.limit) || 10;
    req.query.offset = parseInt(req.query.offset) || 0;


    // Call the next middleware or route handler
    next()
}

// A local middleware function that will be executed for specific APIs
const localMiddlewareFunction = (req, res, next) => {
    
    // Perform some operations or logic
    req.localMessage = 'Local middleware executed!'

    // Call the next middleware or route handler
    next()
}

// Export the functions
module.exports = {
    globalMiddlewareFunction,
    localMiddlewareFunction
}
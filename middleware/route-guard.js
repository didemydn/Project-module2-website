// checks if the user is logged in when trying to access a specific page
const isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
      return res.redirect('/connect/home');
    }
    next();
  };
   
  // if an already logged in user tries to access the login page it
  // redirects the user to the home page
  const isLoggedOut = (req, res, next) => {
    if (req.session && req.session.currentUser && req.session.currentUser.email) {
      return res.redirect('/');
    }
    return next(); // Add a return statement here
  };


  module.exports = {
    isLoggedIn,
    isLoggedOut
  };
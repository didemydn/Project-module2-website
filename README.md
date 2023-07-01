# SHARING CLOTHES

## https://sharing-store.cyclic.app/

## Description

Cloth donation platform 


## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and donate and connect (signup and login)
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **all item list** - As a user I want to see all the items available so that I can choose which ones I want to offer
- **donate** - As a user I want to donate a cloth.

## Routes

/* GET User.route.js*/ 

/* GET/connect */ 
render- user/connect.hbs for sign-up and log-in forms
   
/* GET/connect/home */ 
render-index.hbs for homepage

/* GET/connect/profile */ 
render-user/profile.hbs for profile details 
render-user/edit-profile to edit profile details (username and email)

/* POST User.route.js*/

/* POST/connect FOR SIGNUP AND LOGIN*/ 

Action SIGNUP

req.body
        firstname,
        lastname, 
        gender,
        dateOfBirth,
        username,
        email,
        passwordHash: hashedPassword,
        country,
        city,
        address,
    
redirect: /connect/home

Action LOGIN    
email and password required
redirect: /connect/home

/* POST editting user profile*/

/profile/edit
req.body
{ email, username }  Update the user's profile details in the database
res.redirect('/connect/profile');
     
/* POST DELETE*/
Delete the user's profile from the database
/profile/delete 
res.redirect('/'); homepage

/* POST LOGOUT*/

connect/logout'
redirect('/'); homepage
   


## Technologies used

CSS, Javascript, Node, Express, Handlebars, Sessions & Cookies, etc.

## Models
USER MODEL
const userSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    gender: {
      type: String,
      enum: ["female", "male"],
      required: true,
    }, 
    dateOfBirth: Date,
    username: {
      type: String,
      trim: true,
      required: false,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required.']
    },
    country: {
      type: String,
      required: true},
    city: {
      type: String,
      required: true}, 
    address: {
      type: String,
      required: true},
    image: {String},
    items: [{
      type: Schema.Types.ObjectId,
      ref: 'Item',
    }],
    reviews: [{
      type: Schema.Types.ObjectId,
      ref: 'Review',
    }]
  },

  {timestamps: true}

);

ITEM MODEL

const itemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["man", "woman", "kids"],
        required: true,
    }, 
    type: {
        type: String,
        enum: ["T-shirt","Shirt", "Coats & Jackets", "Sweats", "Dress", "Skirt", "Pants", "Short", "Shoes", "Sleepwear", "Baby Clothes", "Batch", "Others"],
        required: true
    },
    size: {
        type: String,
        enum: ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL", "0-3 months", "3-6 months", "6-9 months", "9-12 months", "12-18 months", "18-24 months","24+ months"],
        required: true,
    },
    condition: {
        type: String,
        enum: ["Brand New", "Almost New", "Good", "Acceptable", "Repairable"],
        required: true,
    },
    description: String,
    image: String,
    UserId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

REVIEW MODEL

const reviewSchema = new Schema({
    comment: String,
    UserId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

## Links

## Collaborators

[Didem Aydin Cakir](https://github.com/didemydn)

[Carlos Baptista](https://github.com/carlosabbaptista)

### Project

[Repository Link](https://github.com/didemydn/Project-module2-website)

[Deploy Link](https://sharing-store.cyclic.app)


### Slides

[Slides Link](https://docs.google.com/presentation/d/1Xc_0FTz2WZDbRGwk8Y3OvI1ARTrm7eih7L9Q00MQbR4/edit?usp=sharing)

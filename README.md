# Amazon Product Tracking App V2

## Description

A fullstack web app to track the price of any Amazon product and store user's traces in one place<br>

## To contribute
[Learn more](https://github.com/yewyewXD/React-Amazon-Price-Tracker/blob/master/CONTRIBUTING.md)

## Build status

**Success:** [See Live](https://trackerbase.herokuapp.com/)

Started on: 13 Aug 2020 <br>
Completed on: 16 Aug 2020 <br>
Last modified on: 24 October 2020 <br>

## Screenshots (V2)

![Landing Page](https://github.com/yewyewXD/React-Amazon-Price-Tracker/blob/master/readme-images/landingPage.JPG?raw=true "Landing Page")

![Instruction](https://github.com/yewyewXD/React-Amazon-Price-Tracker/blob/master/readme-images/instruction.JPG?raw=true "Instruction")

![Dashboard](https://github.com/yewyewXD/React-Amazon-Price-Tracker/blob/master/readme-images/dashboard.JPG?raw=true "Dashboard")

![Track New Product](https://github.com/yewyewXD/React-Amazon-Price-Tracker/blob/master/readme-images/dashboardAddNew.JPG?raw=true "Track New Product")

![Edit Tracked Product](https://github.com/yewyewXD/React-Amazon-Price-Tracker/blob/master/readme-images/dashboardEdit.JPG?raw=true "Edit Tracked Product")

![Delete Tracked Product](https://github.com/yewyewXD/React-Amazon-Price-Tracker/blob/master/readme-images/dashboardDelete.JPG?raw=true "Delete Tracked Product")

## Tech/framework used

- MERN Stack (MongoDB, Express, React, Node)
- Bootstrap
- Sass

## Features

- Create an account
- Track any product's price on Amazon

## How to use it locally like it's yours (Not for contribution)

> Get your MongoDB connection string

Follow from Part 1 (Create an Atlas Account) to Part 5 (Connect to Your Cluster) in [this documentation](https://docs.atlas.mongodb.com/getting-started/). <br>

In [Part 5](https://docs.atlas.mongodb.com/tutorial/connect-to-your-cluster/), skip to [Connect to Your Atlas Cluster](https://docs.atlas.mongodb.com/tutorial/connect-to-your-cluster/#connect-to-your-atlas-cluster) and follow from Step 1 to Step 4 to get the connection string. <br>

Now, clone the repository, then:

> cd into the working directory and install dependencies in both server & client side:

```bash
cd React-Amazon-Price-Tracker
npm i
cd frontend
npm i
```

> Back to the root folder and create a ".env" file:

```bash
cd ..
cd ..
touch .env
```

> In ".env", enter your mongoDB connection string and JWT secret key:

- If you're using VS Code, you can use this command to start editing

```bash
code .
```

- Paste in the code, replace mongodb-connection-string with your MongoDB connection string, and edit yourJwtSecret (for better security, use a complex string).

```bash
NODE_ENV=development
MONGO_URI=mongodb-connection-string
JWT_SECRET=yourJwtSecret
```

> Install concurrently to run both server and client side in one terminal, and run the app:

```bash
npm i -D concurrently
npm run dev
```

## Future Update

- Email user when the product price is lower than the ideal price
- Secure token with httpOnly cookie
- Make user profile customizable
- Add more authentication methods
- Add password reset and email confirmation

## Credits

#### Project Inspiration:

[Video by Web Dev Simplified](https://www.youtube.com/watch?v=H5ObmDUjKV4&ab_channel=WebDevSimplified)

##### Design Inspiration:

[Landing Page](https://html.crumina.net/html-utouch/index.html) <br>
[Dashboard](https://dribbble.com/shots/3699047-dashX-Income) <br>
[Dashboard CRUD](https://dribbble.com/shots/8491396-Frappe-Accounting-Customers)<br>
[Popup Modal](https://dribbble.com/shots/8491396-Frappe-Accounting-Customers)<br>

##### Images:

[Flaticon](https://www.flaticon.com/home)

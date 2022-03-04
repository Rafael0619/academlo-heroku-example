const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const { Post } = require('./models/post.model');
const { User } = require('./models/user.model');
const { postRouter } = require('./routes/posts.routes');
const { usersRouter } = require('./routes/users.routes');
const { sequelize } = require('./util/database');

const app = express();

app.use(express.json());

app.use('/api/v1/posts',postRouter);
app.use('/api/v1/users' , usersRouter);

sequelize
.authenticate()
.then(() => console.log('database authenticated'))
.catch(err => console.log(err));

User.hasMany(Post);
Post.belongsTo(User);

sequelize
.sync()
.then(() => console.log('Database synced'))
.catch(err => console.log(err));

app.listen(4000, () => {
    console.log("App express running");
});
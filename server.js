const { app } = require("./app");
const { sequelize } = require("./util/database");
const { initModels } = require("./util/initModels");

sequelize
  .authenticate()
  .then(() => console.log("database authenticated"))
  .catch((err) => console.log(err));

initModels();

sequelize
  .sync()
  .then(() => console.log("Database synced"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("App express running");
});

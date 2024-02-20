const app = require("./app");
const connectDB = require("./src/configs/dbConnection");
require("dotenv").config();

connectDB();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running on port  ${port}`);
});

// const ans = () => {
//   const a = 55;
//   if (true) {
//   }
//   console.log(a);
// };
// ans();
// // console.log(b);

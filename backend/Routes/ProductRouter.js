const ensureAuthenticated = require("../Middlewares/Auth");

const router = require("express").Router();

router.get("/", ensureAuthenticated, (req, res) => {
  console.log("-----logged in user details----", req.user);
  res.status(200).json([
    {
      name: "bike",
      price: "5,00,000",
    },
    {
      name: "car",
      price: "25,00,000",
    },
  ]);
});

module.exports = router;

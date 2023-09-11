import express from "express";
const router = express.Router();

router.post("/foodData", (req, res) => {
  try {
    res.send([global.food_items, global.foodCategory]);
  } catch (err) {
    console.log(err.message);
    res.send("server error");
  }
});

export default router;

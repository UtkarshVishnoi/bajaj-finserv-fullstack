import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const FULL_NAME = "utkarsh_vishnoi";
const DOB = "29062004";
const EMAIL = "utkarsh.v8274@gmail.com";
const ROLL_NUMBER = "22BCE2058";

function processData(data) {
  let even = [];
  let odd = [];
  let alphabets = [];
  let specials = [];
  let sum = 0;
  let letters = [];

  data.forEach((item) => {
    if (/^-?\d+$/.test(item)) {
      let num = parseInt(item, 10);
      sum += num;
      if (num % 2 === 0) {
        even.push(item.toString());
      } else {
        odd.push(item.toString());
      }
    } else if (/^[a-zA-Z]+$/.test(item)) {
      alphabets.push(item.toUpperCase());
      letters.push(item);
    } else {
      specials.push(item);
    }
  });

  let concat = letters.join("");
  concat = concat
    .split("")
    .reverse()
    .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join("");

  return {
    is_success: true,
    user_id: `${FULL_NAME}_${DOB}`,
    email: EMAIL,
    roll_number: ROLL_NUMBER,
    odd_numbers: odd,
    even_numbers: even,
    alphabets,
    special_characters: specials,
    sum: sum.toString(),
    concat_string: concat,
  };
}

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;
    if (!Array.isArray(data)) {
      return res
        .status(400)
        .json({ is_success: false, message: "Invalid input" });
    }
    const result = processData(data);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ is_success: false, message: "Server error" });
  }
});

app.use((req, res) => {
  res.status(404).send("API endpoint not found");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

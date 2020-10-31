const express = require ("express");
const bodyParser = require('body-parser');
const pg = require('pg');
const pool = require("./db");


const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'));
app.use(express.json());


app.post("/articles", async (req,res) => {
  try {
  const { content } = req.body;
  const { title } = req.body;
  const newArticle = await pool.query(

      "INSERT INTO articles (title, content) VALUES($1, $2) RETURNING *",[title, content]

  );

  res.json(newArticle.rows[0]);
} catch (err) {
  console.error(err.message);
}
});

app.get("/articles", async (req,res) => {
    try {
        const allArticles = await pool.query(
            "SELECT * FROM articles"
        );

        res.json(allArticles.rows);
    } catch (err) {
        console.error(err.message);
    }
});
//
app.get("/articles/:title", async (req, res) => {
    try {
        const { title } = req.params;
        const article = await pool.query(
            "SELECT * FROM articles WHERE title = $1", [title]
        );

        res.json(article.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});
//
app.put("/articles/:title", async (req,res) => {
    try {
        const { content } = req.body;
        const { title } = req.params;
        const updateArticle = await pool.query(
            "UPDATE articles SET content=$2 WHERE title = $1", [title,content]
        );
        res.json("updated");



    } catch (err) {
        console.log(err.message);
    }
});

// app.patch("/articles/:title", async(req,res)=>{
//   try {
//
//     const { title } = req.params;
//     const { content } = req.body;
//     const patchArticle = await pool.query(
//         "UPDATE articles SET title=$2 WHERE content = $1", [content, title]
//     );
//     res.json("patched");
//
//   } catch (err) {
//     console.error();(err.message);
// }
// });



app.delete("/articles/:title", async (req,res) => {
    try {
        const {title} = req.params;
        const deleteArticle = await pool.query(
            "DELETE FROM articles WHERE title = $1", [title]
        );
        res.json("todo was deleted");
    } catch (err) {
        console.log(err.message);
    }
});


app.listen(3000, () => {
  console.log("port on 3000");
});

/// Core modules
const fs = require("fs");
const http = require("http");
const url = require("url");

/// 3rd party modules
const slugify = require("slugify");

/// Our modules
const replaceTemplate = require("./modules/replaceTemplates");

/////////////////////////////
// // SERVER

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(`${__dirname}/templates/card.html`, "utf-8");

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));

// req as request & res as response
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // Overviw page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PLACEHOLDER-CARDS%}", cardsHtml);

    res.end(output);

    // Product page
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj.find((el) => el.id == query.id);
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // API
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);

    // Not found
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "Hello world",
    });
    res.end("<h1>Page not found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening for requests in port 8000");
});

/////////////////////////////
// // FILES

// Blocking, synchronous way
// const textInp = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textInp);
// const textOut = `This is what we know about avocados: ${textInp}. \n Created on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);

// Non-blocking, asynchronous way
// fs.readFile("./txt/start.txt", "utf-8", (error, data1) => {
//   if (error) return console.error("ERROR");

//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (error, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (error, data3) => {
//       console.log(data3);

//       fs.writeFile(
//         "./txt/final.txt",
//         `${data2}\n${data3}\nText created on ${Date.now()}`,
//         "utf-8",
//         (error) => {
//           console.log("Your file has been written");
//         }
//       );
//     });
//   });
// });
// console.log("Fetching data");

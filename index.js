const fs = require("fs");
const server = require("http");
const url = require("url");
const slug = require("slugify");

const replaceTemplate = require("./modules/replaceTemp");

const tempOverview = fs.readFileSync(
  `${__dirname}/1-node-farm/starter/templates/overview.html`,
  "utf-8"
);

const tempProduct = fs.readFileSync(
  `${__dirname}/1-node-farm/starter/templates/product.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/1-node-farm/starter/templates/template_card.html`,
  "utf-8"
);

const data = fs.readFileSync(
  `${__dirname}/1-node-farm/starter/dev-data/data.json`,
  "utf-8"
);
const dataObj = JSON.parse(data);
const slugers = dataObj.map((elements) =>
  slug(elements.productName, { lower: true })
);

// Working on the server now
const serCreated = server.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // overview page
  if (pathname === "/" || pathname === "overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const cardsHTML = dataObj
      .map((items) => {
        return replaceTemplate(tempCard, items);
      })
      .join("");
    const output = tempOverview.replace("{%PRODUCTS_CARDS%}", cardsHTML);
    // console.log(output);
    res.end(output);
    // product page
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const prod = dataObj[query.id];
    const output = replaceTemplate(tempProduct, prod);
    // console.log(output);

    res.end(output);
    // the api
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    //  not found
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "This is an error",
    });
    res.end("<h1>This page can not be found</h1>");
  }
});

serCreated.listen(3000, "127.0.0.1", () => {
  console.log("Listening to request on port 3000");
});

// routing

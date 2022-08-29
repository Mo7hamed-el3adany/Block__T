const fs = require("fs");
const csvWriter = require("csv-writer");
const { parse } = require("csv-parse");
const path = require("path");
fs.createReadStream("./input_ex.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    console.log("done and data are "+ row);
  })
  .on("end", function () {
    console.log("finished");
  })
  .on("error", function (error) {
    console.log(error.message);
  });
const writer = csvWriter.createObjectCsvWriter({
  path: path.resolve(__dirname, "result.csv"),
  header: [
    {
      id: "id_num",
      area: "area_name",
      name: "name",
      quantity: "quantity_num",
      brand: "brand_name",
    },
    {
      id: "id_num",
      area: "area_name",
      name: "name",
      quantity: "quantity_num",
      brand: "brand_name",
    },
    {
      id: "id_num",
      area: "area_name",
      name: "name",
      quantity: "quantity_num",
      brand: "brand_name",
    },
    {
      id: "id_num",
      area: "area_name",
      name: "name",
      quantity: "quantity_num",
      brand: "brand_name",
    },
    {
      id: "id_num",
      area: "area_name",
      name: "name",
      quantity: "quantity_num",
      brand: "brand_name",
    },
  ],
});
const result_data = [
  {
    id: "id_num",
    area: "area_name",
    name: "name",
    quantity: "quantity_num",
    brand: "brand_name",
  },
  {
    id: "id_num",
    area: "area_name",
    name: "name",
    quantity: "quantity_num",
    brand: "brand_name",
  },
  {
    id: "id_num",
    area: "area_name",
    name: "name",
    quantity: "quantity_num",
    brand: "brand_name",
  },
];
writer.writeRecords(result_data).then(() => {
  console.log("Done!");
});

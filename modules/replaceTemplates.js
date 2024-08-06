module.exports = function (temp, product) {
  let output = temp.replaceAll("{%PRODUCT_NAME%}", product.productName);
  output = output.replaceAll("{%IMAGE%}", product.image);
  output = output.replaceAll("{%ID%}", product.id);
  output = output.replaceAll("{%QUANTITY%}", product.quantity);
  output = output.replaceAll("{%FROM%}", product.from);
  output = output.replaceAll("{%PRICE%}", product.price);
  output = output.replaceAll("{%NUTRIENTS%}", product.nutrients);
  output = output.replaceAll("{%DESCRIPTION%}", product.description);
  output = output.replace(
    /{%NON-ORGANIC%}/g,
    product.organic ? "" : "not-organic"
  );
  return output;
};

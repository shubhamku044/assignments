/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]
*/

function calculateTotalSpentByCategory(transactions) {
  const output = [];
  transactions.forEach((transaction) => {
    const categoryName = transaction.category;
    let objIdx = -1;
    for (let i = 0; i < output.length; i++) {
      if (categoryName === output[i].category) {
        objIdx = i;
        break;
      }
    }
    if (objIdx === -1) {
      output.push({
        category: categoryName,
        totalSpent: transaction.price,
      });
    } else {
      output[objIdx].totalSpent += transaction.price;
    }
  });
  return output;
}

module.exports = calculateTotalSpentByCategory;

/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
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

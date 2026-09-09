import { transactions } from "../data/mockData.js";

export function fetchTransactions() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(transactions), 600);
  });
}
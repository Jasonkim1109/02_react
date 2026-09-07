import { formatWon } from "../utils/format";

function TransactionRow({
	txType,
	amount,
	category,
	memo,
	counterparty,
	txDatetime,
}) {
	return (
		<article className="transaction-row">
			<div>
				<strong>{counterparty}</strong>
				<p>{memo}</p>
				<span className="muted">
					{category} · {txDatetime}
				</span>
			</div>
			<strong className={txType === "입금" ? "deposit" : "withdrawal"}>
				{txType === "입금" ? "+" : "-"}
				{formatWon(amount)}
			</strong>
		</article>
	);
}

export default TransactionRow;

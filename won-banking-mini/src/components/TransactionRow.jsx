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
		<div className="tx-row">
			<div>
				<strong>{counterparty}</strong>
				<br />
				<span className="muted">
					{category} · {memo}
				</span>
			</div>
			<div>
				<strong className={txType === "입금" ? "amount-in" : "amount-out"}>
					{txType === "입금" ? "+" : "-"}
					{formatWon(amount)}
				</strong>
				<br />
				<span className="muted">{txDatetime.slice(11, 16)}</span>
			</div>
		</div>
	);
}

export default TransactionRow;

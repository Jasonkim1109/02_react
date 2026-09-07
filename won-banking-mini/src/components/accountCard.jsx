// components/AccountCard.jsx
import StatusBadge from "./StatusBadge";
import { formatWonMasked, maskAccountNo } from "../utils/format";

function AccountCard({ accountNo, accountType, balance, status, showFullNo, showAmount, onDeposit }) {
  return (
    <div className="card">
      <div className="row">
        <span className="muted">{accountType}</span>
        <StatusBadge status={status} />
      </div>
      <p className="muted">{showFullNo ? accountNo : maskAccountNo(accountNo)}</p>
      <strong className="balance">{formatWonMasked(balance, !showAmount)}</strong>
      <button
        className="deposit-button"
        onClick={onDeposit}
        disabled={status !== "정상"}
      >
        1만원 입금
      </button>
    </div>
  );
}

export default AccountCard;
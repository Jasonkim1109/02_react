// components/AccountCard.jsx
import StatusBadge from "./StatusBadge";
import { formatWonMasked, maskAccountNo } from "../utils/format";
import { AccountProvider } from "../contexts/UserContext";
import { useUser } from "../hooks/useUser.js";

function AccountCard({ accountNo, accountType, balance, status, showFullNo, showAmount, onDeposit }) {
  const user = useUser();

  return (
    <AccountProvider status={status}>
      <div className="card">
        <p className="muted">{user.name}의 계좌</p>
        <div className="row">
          <span className="muted">{accountType}</span>
          <StatusBadge />
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
    </AccountProvider>
  );
}

export default AccountCard;
// 필요한 부품들을 불러옵니다.
import './App.css'
import Clock from './components/Clock.jsx'
import Panel from './components/panel.jsx'
import AccountCard from './components/accountCard.jsx'
import Header from './components/header.jsx'
import TransactionRow from './components/TransactionRow.jsx'
import { accounts as initialAccounts, transactions } from './data/mockData.js'
import { formatWonMasked } from './utils/format.js'
import { useState } from 'react'
// 02_html기초.html 안에 만들었던 계좌카드의 css를 가져와서
// 아래에 있는 카드를 좀더 그럴듯하게 꾸며보세요.
// 실제로 사용될 화면을 그립니다.
function App() {
  
  const [accounts, setAccounts] = useState(initialAccounts)
  const [showFullNo, setShowFullNo] = useState(false);
  const [showAmount, setShowAmount] = useState(false)
  const totalAssets = accounts.reduce((total, account) => total + account.balance, 0)

  function handleDeposit(accountId) {
    setAccounts((currentAccounts) => currentAccounts.map((account) => (
      account.accountId === accountId
        ? { ...account, balance: account.balance + 10000 }
        : account
    )))
  }

  return (
    <> 
    <Clock/>
    <Header/>
    <div className="controls">
      <button onClick={() => setShowFullNo(!showFullNo)}>
      {showFullNo ? "계좌번호 숨기기" : "계좌번호 보기"}
      </button>
      <button
        className="eye-button"
        onClick={() => setShowAmount(!showAmount)}
        aria-label={showAmount ? "금액 숨기기" : "금액 보이기"}
        title={showAmount ? "금액 숨기기" : "금액 보이기"}
      >
        👁
      </button>
    </div>

    <Panel title="총 자산">
      <strong className="total-assets">
        {formatWonMasked(totalAssets, !showAmount)}
      </strong>
    </Panel>
    
    <Panel title="내 계좌">
      {accounts.map((account) => (
        <AccountCard
          key={account.accountId}
          {...account}
          showFullNo={showFullNo}
          showAmount={showAmount}
          onDeposit={() => handleDeposit(account.accountId)}
        />
      ))}
    </Panel>
    <Panel title="최근 거래">
      {transactions.map((transaction, index) => (
        <TransactionRow
          key={`${transaction.txDatetime}-${index}`}
          {...transaction}
        />
      ))}
    </Panel>
    </>
  );
}

// 이 컴포넌트를 외부에서 import해서 쓸 수 있도록 선언
export default App
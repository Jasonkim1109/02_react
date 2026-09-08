import { Fragment, useState } from 'react'
import TransactionRow from './TransactionRow'
import { transactions } from '../data/mockData'
import { formatWon } from '../utils/format.js'

// 거래 종류 필터 옵션
const TYPE_OPTIONS = ["전체", "입금", "출금"]
// 카테고리 필터 옵션
const CATEGORY_OPTIONS = ["전체", "식비", "교통", "쇼핑", "급여", "이체", "의료", "통신"]


function TransactionList({ hideAmount = false }) {
    const [selectedType, setSelectedType] = useState("전체");
    const [selectedCategory, setSelectedCategory] = useState("전체");
    const visibleTransactions = transactions.filter((tx) => (
        (selectedType === "전체" || tx.txType === selectedType) &&
        (selectedCategory === "전체" || tx.category === selectedCategory)
    ));
    const visibleTotal = visibleTransactions.reduce((sum, tx) => sum + tx.amount, 0);
    const summaryLabel = selectedType === "전체" ? "전체" : selectedType;

    return (
        <>
            <div className="transaction-filters">
                <div className="category-filter" role="group" aria-label="거래 유형 필터">
                    {TYPE_OPTIONS.map((type) => (
                        <button
                            key={type}
                            type="button"
                            className={selectedType === type ? "active" : ""}
                            onClick={() => setSelectedType(type)}
                        >
                            {type}
                        </button>
                    ))}
                </div>
                <div className="category-filter" role="group" aria-label="거래 카테고리 필터">
                    {CATEGORY_OPTIONS.map((category) => (
                        <Fragment key={category}>
                            {category === "의료" && <span className="filter-break" aria-hidden="true" />}
                            <button
                                type="button"
                                className={selectedCategory === category ? "active" : ""}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                        </Fragment>
                    ))}
                </div>
            </div>
            <p className="transaction-summary">
                {summaryLabel} {visibleTransactions.length}건 · 합계 {formatWon(visibleTotal)}
            </p>
            {visibleTransactions.length > 0 ? (
                visibleTransactions.map((tx) => (
                    <TransactionRow key={tx.txId} {...tx} hideAmount={hideAmount} />
                ))
            ) : (
                <p className="transaction-empty">해당하는 거래가 없습니다</p>
            )}
        </>
    )
}

export default TransactionList

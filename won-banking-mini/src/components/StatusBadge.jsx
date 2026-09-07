// 계좌 상태에 따라 배지 색 바뀜

const colors = {
    "정상" : "#00FF00",
    "휴면" : "#858685",
    "지급정지" : "#FF0000",
    "해지" : "#1F1F1F"
}

// inline(코드 사이에 css를 입힐 때): style={{key: value}}형식으로 삽입
function StatusBadge({status}) {
    return (
        <span className="badge" style={{backgroundColor : colors[status]}}>
        {status}
        </span>
    )
}

export default StatusBadge;
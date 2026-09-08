// 제목이 있는 섹션(패널)을 구분하는 컴포넌트
// components/Panel.jsx
function Panel({ title, children, className = '' }) {
  return (
    <section className={`panel ${className}`.trim()}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default Panel;
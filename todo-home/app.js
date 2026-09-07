const initialTasks = [
  { id: 1, category: 'WON 뱅킹 미니', title: '거래내역 추가 기능 구현', done: false },
  { id: 2, category: 'WON 뱅킹 미니', title: '거래내역 정렬 기능 구현', done: false },
  { id: 3, category: 'WON 뱅킹 미니', title: '계좌번호 복사 버튼 추가', done: false },
  { id: 4, category: 'WON 뱅킹 미니', title: '반응형 화면 점검', done: false },
  { id: 5, category: 'WON 뱅킹 미니', title: '접근성 개선', done: false },
  { id: 6, category: 'WON 뱅킹 미니', title: '테스트 코드 작성', done: false },
  { id: 7, category: 'React 학습', title: 'useState 복습', done: false },
  { id: 8, category: 'React 학습', title: 'useEffect 복습', done: false },
  { id: 9, category: 'React 학습', title: '컴포넌트 재사용성 개선', done: false },
  { id: 10, category: 'React 학습', title: 'props와 state 차이 정리', done: false },
];

let tasks = [...initialTasks];
let currentFilter = 'all';
let searchQuery = '';
const categories = ['WON 뱅킹 미니', 'React 학습', '새 할 일'];
const taskGroups = document.querySelector('#task-groups');
const emptyState = document.querySelector('#empty-state');

function getVisibleTasks() {
  return tasks.filter((task) => {
    const matchesFilter = currentFilter === 'all'
      || (currentFilter === 'done' && task.done)
      || (currentFilter === 'active' && !task.done);
    return matchesFilter && task.title.toLowerCase().includes(searchQuery.toLowerCase());
  });
}

function render() {
  const completed = tasks.filter((task) => task.done).length;
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;
  document.querySelector('#completed-count').textContent = completed;
  document.querySelector('#remaining-count').textContent = tasks.length - completed;
  document.querySelector('#progress-value').innerHTML = `${progress}<small>%</small>`;
  document.querySelector('#progress-bar').style.width = `${progress}%`;
  document.querySelector('.progress-ring').style.setProperty('--progress', `${progress * 3.6}deg`);

  const visibleTasks = getVisibleTasks();
  taskGroups.innerHTML = categories.map((category) => {
    const categoryTasks = visibleTasks.filter((task) => task.category === category);
    if (!categoryTasks.length) return '';
    return `<section class="task-group">
      <div class="group-heading"><h2>${category}</h2><span>${categoryTasks.length} TASKS</span></div>
      <div class="task-list">${categoryTasks.map((task) => `<article class="task-item ${task.done ? 'done' : ''}">
        <button class="check-button" data-action="toggle" data-id="${task.id}" aria-label="${task.title} 완료 상태 변경">${task.done ? '✓' : ''}</button>
        <span class="task-title">${task.title}</span>
        <button class="remove-button" data-action="remove" data-id="${task.id}" aria-label="${task.title} 삭제">×</button>
      </article>`).join('')}</div>
    </section>`;
  }).join('');
  emptyState.hidden = visibleTasks.length > 0;
}

taskGroups.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  const id = Number(button.dataset.id);
  if (button.dataset.action === 'toggle') tasks = tasks.map((task) => task.id === id ? { ...task, done: !task.done } : task);
  if (button.dataset.action === 'remove') tasks = tasks.filter((task) => task.id !== id);
  render();
});

document.querySelector('.filter-tabs').addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  currentFilter = button.dataset.filter;
  document.querySelectorAll('.filter-tabs button').forEach((item) => item.classList.toggle('active', item === button));
  render();
});

document.querySelector('#search-input').addEventListener('input', (event) => {
  searchQuery = event.target.value.trim();
  render();
});

document.querySelector('#add-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const input = document.querySelector('#new-task');
  const title = input.value.trim();
  if (!title) return;
  tasks.push({ id: Date.now(), category: '새 할 일', title, done: false });
  input.value = '';
  currentFilter = 'all';
  document.querySelectorAll('.filter-tabs button').forEach((item) => item.classList.toggle('active', item.dataset.filter === 'all'));
  render();
});

render();



const card          = document.querySelector('[data-testid="test-todo-card"]');
const checkbox      = document.getElementById('complete-toggle');
const titleEl       = document.getElementById('todo-title');
const statusBadge   = document.getElementById('status-badge');
const priorityBadge = document.getElementById('priority-badge');
const timeRemaining = document.getElementById('time-remaining');



const PRIORITY = 'high'; 

function setPriority(level) {

  priorityBadge.classList.remove('badge-high', 'badge-medium', 'badge-low');

  if (level === 'high') {
    priorityBadge.textContent = ' High';
    priorityBadge.classList.add('badge-high');
    priorityBadge.setAttribute('aria-label', 'Priority: High');
  } else if (level === 'medium') {
    priorityBadge.textContent = ' Medium';
    priorityBadge.classList.add('badge-medium');
    priorityBadge.setAttribute('aria-label', 'Priority: Medium');
  } else {
    priorityBadge.textContent = ' Low';
    priorityBadge.classList.add('badge-low');
    priorityBadge.setAttribute('aria-label', 'Priority: Low');
  }
}

setPriority(PRIORITY);



let currentStatus = 'progress'; 

function setStatus(status) {
  
  statusBadge.classList.remove('status-pending', 'status-progress', 'status-done');

  if (status === 'pending') {
    statusBadge.textContent = ' Pending';
    statusBadge.classList.add('status-pending');
  } else if (status === 'progress') {
    statusBadge.textContent = ' In Progress';
    statusBadge.classList.add('status-progress');
  } else {
    statusBadge.textContent = ' Done';
    statusBadge.classList.add('status-done');
  }

  currentStatus = status;
}

setStatus(currentStatus);



const DUE_DATE = new Date('2026-04-16T18:00:00Z');

function calculateTimeRemaining() {
  const now = new Date();

  const diffMs = DUE_DATE - now;

 const diffSeconds = Math.floor(Math.abs(diffMs) / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours   = Math.floor(diffMinutes / 60);
  const diffDays    = Math.floor(diffHours / 24);

  timeRemaining.classList.remove('overdue', 'due-today');

  if (diffMs < 0) {
    
    timeRemaining.classList.add('overdue');

    if (diffHours < 1) {
      timeRemaining.textContent = `Overdue by ${diffMinutes} min`;
    } else if (diffHours < 24) {
      timeRemaining.textContent = `Overdue by ${diffHours}h`;
    } else {
      timeRemaining.textContent = `Overdue by ${diffDays}d`;
    }

  } else if (diffMs < 60000) {
        timeRemaining.classList.add('due-today');
    timeRemaining.textContent = 'Due now!';

  } else if (diffMs < 3600000) {
        timeRemaining.classList.add('due-today');
    timeRemaining.textContent = `Due in ${diffMinutes} min`;

  } else if (diffMs < 86400000) {
        timeRemaining.classList.add('due-today');
    timeRemaining.textContent = `Due in ${diffHours}h`;

  } else if (diffDays === 1) {
    timeRemaining.textContent = 'Due tomorrow';

  } else {
    timeRemaining.textContent = `Due in ${diffDays} days`;
  }
}

calculateTimeRemaining();

setInterval(calculateTimeRemaining, 60000);


checkbox.addEventListener('change', function () {
  if (checkbox.checked) {
    card.classList.add('done');

    setStatus('done');

    card.setAttribute('aria-label', 'Todo task card - completed');

  } else {
    card.classList.remove('done');

  
    setStatus('progress');

    card.setAttribute('aria-label', 'Todo task card');
  }
});


function handleEdit() {
  console.log('Edit button clicked');
  alert(' Edit mode coming soon!');
}

function handleDelete() {
  console.log('Delete button clicked');

 const confirmed = confirm('️ Are you sure you want to delete this task?');

  if (confirmed) {

    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    card.style.opacity = '0';
    card.style.transform = 'scale(0.95)';

    setTimeout(() => {
      card.remove();
    }, 400); // 400ms matches the transition duration above
  }
}

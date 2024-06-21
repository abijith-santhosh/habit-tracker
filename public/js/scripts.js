//Show or hide the list of dates associated with a habit
function toggleDates(habitId) {
    const datesList = document.getElementById(`dates-${habitId}`);
    if (datesList.style.display === 'none') {
      datesList.style.display = 'block';
    } else {
      datesList.style.display = 'none';
    }
  }
  
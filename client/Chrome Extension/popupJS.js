function showForm() {
  document.getElementById('hcc-report-btn').classList.add('hcc-hidden');
  document.getElementById('hcc-form').classList.remove('hcc-hidden');
}

document.getElementById('hcc-report-btn').onclick = showForm;

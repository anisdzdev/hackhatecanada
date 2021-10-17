var query = { active: true, currentWindow: true };

function showForm() {
  document.getElementById('hcc-report-btn').classList.add('hcc-hidden');
  document.getElementById('hcc-form').classList.remove('hcc-hidden');
}

function postExpression() {
  const value = document.getElementById('inp').value;
  let url;

  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    url = tabs[0].url;
  });

  chrome.tabs.executeScript(
    null,
    {
      code: `document.all[0].innerText`,
      allFrames: false, // this is the default
      runAt: 'document_start', // default is document_idle. See https://stackoverflow.com/q/42509273 for more details.
    },
    function (results) {
      var result = results[0];
      if (!result.includes(value)) {
        fetch('http://localhost:5000/ai/report', {
          method: 'POST',
          mode: 'no-cors',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: {
            url: url,
            words: [value],
          },
        })
          .then(function (response) {
            if (response.ok) {
              document.getElementById('hcc-form').classList.add('hcc-hidden');
              console.log('found match');
            } else {
              console.log('fail');
            }
          })
          .catch(function (reason) {
            console.log('reason', reason);
          });
      }
    }
  );
}

document.getElementById('hcc-report-btn').onclick = showForm;
document.getElementById('hcc-send-btn').onclick = postExpression;

const voteHost = "https://irma.amsterdam";
const irmaServer = 'https://irma.amsterdam';

console.log("OK");

document.addEventListener("DOMContentLoaded", () => {
  const votingResults = document.querySelector(".voting-results");
  poll(votingResults);
  voteSelect();
});

async function stem(event) {
  event.preventDefault();

  const voteInput = document.querySelector(".gardens input:checked");
  if (!voteInput) {
    console.log("No vote");
    return;
  }

  const request = {
    type: "disclosing",
    content: [
      {
        label: "Uw emailadres",
        attributes: ["pbdf.pbdf.email.email"]
      }
    ]
  };

  try {
    const irmaResponse = await fetch(`${voteHost}/getsession`, {
      mode: "cors"
    });

    const session = await irmaResponse.json();

    const { sessionPtr, token } = session;

    const result = await irma.handleSession(sessionPtr, {
      server: irmaServer,
      token,
      language: "nl"
    });

    console.log("IRMA result", result);

    const email = result.disclosed[0].value.nl;
    const vote = voteInput.value;

    console.log(`Post vote`);

    const response = await fetch(`${voteHost}/vote`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ email, vote }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const voteResult = await response.json();

    let message;
    if (voteResult.alreadyVoted) {
      message = "U heeft al eerder gestemd!";
    } else {
      message = `U heeft gestemd voor ${voteResult.vote}`;
    }

    document.querySelector(".status").textContent = message;

    console.log("result", voteResult);
  } catch (e) {
    console.log("Cancelled");
    throw new Error(e);
  }
}

async function poll(votingResults) {
  if (!votingResults) {
    return;
  }

  const voteServerStatsUrl = new URL(`${voteHost}/stats`);
  const items = ["community", "tech", "zen"];

  voteServerStatsUrl.searchParams.set("items", items);

  setInterval(fetchPoll, 2000);
  fetchPoll();

  async function fetchPoll() {
    const response = await fetch(voteServerStatsUrl, {
      mode: "cors"
    });
    let json = await response.json();

    let total = items.reduce((acc, item) => acc + (json.votes[item] || 0), 0);

    const html = items.forEach(item => {
      votingResults.style.setProperty(
        `--${item}`,
        `${total == 0 ? 0 : (100 * json.votes[item]) / total}px`
      );
      document.querySelector(`.${item} .perc`).textContent = `${Math.round(
        100 * (json.votes[item] || 0)
       / total)}%`;
    });
  }
}

function voteSelect() {
  const items = document.querySelectorAll(".voting-form .gardens li");
  if (!items) {
    return;
  }

  Array.from(items).forEach(item => {
    item.addEventListener("click", selectItem);
  });

  function selectItem(event) {
    const li = event.target.closest("li");
    const selected = document.querySelector(".selected");
    if (selected) {
      selected.classList.remove("selected");
    }
    li.classList.add("selected");

    const radio = li.querySelector(`input[type=radio]`);
    radio.checked = true;
  }
}

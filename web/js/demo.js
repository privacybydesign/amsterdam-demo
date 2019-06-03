const voteHost = "localhost:8000";
const voteServerPost = `http://${voteHost}/vote`;
const voteServerStats = `http://${voteHost}/stats`;

poll();

async function stem(event) {
  event.preventDefault();

  const voteInput = document.querySelector(".vote-list input:checked");
  if (!voteInput) {
    console.log("No vote");
    return;
  }

  const server = window.location.href.substr(
    0,
    window.location.href.length - 1
  );

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
    const irmaResponse = await fetch(`http://${voteHost}/getsession`, {
      mode: "cors"
    });

    const session = await irmaResponse.json();

    const { sessionPtr, token } = session;

    const result = await irma.handleSession(sessionPtr, { server, token });

    console.log("IRMA result", result);

    const email = result.disclosed[0].value.nl;
    const vote = voteInput.value;

    console.log(`Post to ${voteServerPost}`);

    const response = await fetch(voteServerPost, {
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

    document.querySelector("#result").textContent = message;

    console.log("result", voteResult);
  } catch (e) {
    console.log("Cancelled");
    throw new Error(e);
  }
}

async function poll() {
  const voteServerStatsUrl = new URL(voteServerStats);

  const items = Array.from(document.querySelectorAll(".vote-list input"))
    .map(el => el.value)
    .join(",");

  voteServerStatsUrl.searchParams.set("items", items);

  setInterval(fetchPoll, 2000);
  fetchPoll();

  async function fetchPoll() {
    const response = await fetch(voteServerStatsUrl, {
      mode: "cors"
    });
    let json = await response.json();

    const html = Object.entries(json.votes)
      .map(voteKv => `<p class="votes">${voteKv[0]}: ${voteKv[1]}</p>`)
      .join("");

    document.querySelector("#results").innerHTML = html;
  }
}

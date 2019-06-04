

const voteHost = "https://irma.amsterdam";

// const irmaServer = 'https://acc.fixxx10.amsterdam.nl';
const irmaServer = 'https://irma.amsterdam';


poll();

async function stem(event) {
  event.preventDefault();

  const voteInput = document.querySelector(".vote-list input:checked");
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

    const result = await irma.handleSession(sessionPtr, { server: irmaServer, token });

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

    document.querySelector("#result").textContent = message;

    console.log("result", voteResult);
  } catch (e) {
    console.log("Cancelled");
    throw new Error(e);
  }
}

async function poll() {
  const voteServerStatsUrl = new URL(`${voteHost}/stats`);

  const items = Array.from(document.querySelectorAll(".vote-list input"))
    .map(el => el.value)
    .join(",");

  voteServerStatsUrl.searchParams.set("items", items);

  setInterval(fetchPoll, 60000);
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

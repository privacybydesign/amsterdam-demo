let voteHost;
let irmaServer;

console.log("OK");

document.addEventListener("DOMContentLoaded", async () => {
  const config = await getConfig();

  console.log("config", config);

  voteHost = config.node;
  irmaServer = config.irma;

  const votingResults = document.querySelector(".voting-results");
  poll(votingResults);
});

async function stem(event) {
  event.preventDefault();
  event.stopPropagation();

  const voteInput = document.querySelector(".gardens input:checked");
  if (!voteInput) {
    console.log("No vote");
    openPopup("vote-no-selection");
    return;
  }

  try {
    const irmaResponse = await fetch(`${voteHost}/getsession`, {
      mode: "cors"
    });

    const session = await irmaResponse.json();

    const { sessionPtr, token } = session;

    openPopup("vote-qr");

    const result = await irma.handleSession(sessionPtr, {
      method: "canvas",
      element: "qr",
      showConnectedIcon: true,
      server: irmaServer,
      token,
      language: "nl"
    });

    dissmissPopup();

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
      await openPopup("vote-already-voted");
    } else {
      await openPopup("vote-success");
    }
    document.location = "/results.html";

    console.log("result", voteResult);
  } catch (e) {
    console.error("Cancelled", e);
    //await openPopup("vote-error");
    document.location.reload();
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
      document.querySelector(`.${item} .perc`).textContent = `${
        total == 0 ? 0 : Math.round((100 * (json.votes[item] || 0)) / total)
      }%`;
    });
  }
}

async function getConfig() {
  const response = await fetch("/config", {
    mode: "cors"
  });
  return await response.json();
}

function openPopup(popupId) {
  const popupElement = document.getElementById(popupId);
  const scrollTop = document.scrollingElement.scrollTop;
  document.body.classList.add("whitebox");
  document.body.style.setProperty("--top", scrollTop);

  popupElement.classList.add("visible");

  document.body.addEventListener("focusin", event => {
    if (!popupElement.contains(event.target)) {
      document.scrollingElement.scrollTop = scrollTop;
      const focusElement = popupElement.querySelector(
        "a, button, input, textarea"
      );
      if (focusElement) {
        focusElement.focus();
      }
    }
  });

  const closeButtons = Array.from(
    popupElement.querySelectorAll("[data-popup-close]")
  );

  return new Promise(resolve => {
    setTimeout(() => {
      window.addEventListener("click", desktop);
    }, 0);
    window.addEventListener("keyup", escape);

    closeButtons.forEach(element => {
      element.addEventListener("click", action);
    });

    function desktop(event) {
      if (!popupElement.contains(event.target)) {
        dismiss("escape");
      }
    }
    function escape(event) {
      if (event.code === "Escape") {
        dismiss("escape");
      }
    }

    function action(event) {
      dismiss(this.dataset.popupClose);
    }

    function dismiss(value) {
      window.removeEventListener("click", desktop);
      window.removeEventListener("keyup", escape);
      closeButtons.forEach(element => {
        element.removeEventListener("click", action);
      });

      document.body.classList.remove("whitebox");
      popupElement.classList.remove("visible");
      resolve(value);
    }
  });
}

function dissmissPopup() {
  const event = new KeyboardEvent("keyup", { code: "Escape" });
  window.dispatchEvent(event);
}

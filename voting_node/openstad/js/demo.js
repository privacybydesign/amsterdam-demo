let config;

document.addEventListener("DOMContentLoaded", async () => {
  config = await getConfig();

  console.log("config", config);

  init(config);

  const votingResults = document.querySelector(".voting-results");
  poll(votingResults);
  showDatabaseErrorMessage();
});

async function showDatabaseErrorMessage() {
  const dbError = await checkDbError();

  if (dbError) {
    document.querySelector(".no-database").removeAttribute("hidden");
  }
}

async function vote(event) {
  event.preventDefault();
  event.stopPropagation();

  if (!config) {
    config = await getConfig();
  }

  const voteInput = document.querySelector(".gardens input:checked");
  if (!voteInput) {
    console.log("No vote");
    openPopup("vote-no-selection");
    return;
  }

  try {
    const result = await irmaSession(config, "qr", irmaPopup);

    dissmissPopup();

    const identifier = result.disclosed[0].value.nl;
    const vote = voteInput.value;

    const voteResult = await sendVote(identifier, vote);

    console.log("voteResult", voteResult);

    if (voteResult.alreadyVoted) {
      await openPopup("vote-already-voted");
    } else {
      await openPopup("vote-success");
    }
    document.location = "/results.html";
  } catch (e) {
    console.error("Cancelled", e);
    document.location.reload();
  }
}

function irmaPopup() {
  openPopup("vote-qr").then(result => {
    if (result != "dismiss") {
      /* Workaround for not being able to cancel irma.handleSession() */
      throw new Error("IRMA session cancelled");
    }
  });
}

async function poll(votingResults) {
  if (!votingResults) {
    return;
  }

  setInterval(getPoll, 2000);
  getPoll();

  async function getPoll() {
    const result = await fetchPoll();

    console.log("result", result);

    config.voting_options.forEach(item => {
      votingResults.style.setProperty(
        `--${item}`,
        `${result.votes[item].perc}px`
      );
      document.querySelector(`.${item} .perc`).textContent = `${
        result.votes[item].perc
      }%`;
    });
  }
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
      if (event.code === "Escape" || event.code === "Dismiss") {
        dismiss(event.code.toLowerCase());
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
  const event = new KeyboardEvent("keyup", { code: "Dismiss" });
  window.dispatchEvent(event);
}

## irma-vote.js

The file `irma-vote.js` provides a list of functions to enable voting.

It calls a function in `irma.js` to set up a sessionand it also
makes REST calls to the `index.js` Node.js script on the server.  

When including `irma-vote.js`, the module variable `irmaVote` will be available with a number of function properties.

### getConfig

```javascript
config = await irmaVote.getConfig();
```

Get the contents of the configuration file.

### init

```javascript
irmaVote.init(config);
```

Initialize the irmaVote script.

### checkDbError

```javascript
 const dbError = await irmaVote.checkDbError();
```

Returns an error object when the database could not be reached.
Use this to check the database connection and give feedback to the user.

### sendVote

Send in a vote from the user. 

```javascript
const voteResult = await irmaVote.sendVote(identifier, voteValue);
```

The parameter `identifier` is part of the result from the `irmaSession` call.

```javascript
const identifier = result.disclosed[0].value.nl;
```

voteValue is a string and one of the `voting_options` from the
configuration file.

### fetchPoll

Fetch the current poll results.

```javascript
const result = await irmaVote.fetchPoll();
```

TODO: describe result contents.

### irmaSession

Create a new session with the IRMA server.

```javascript
const result = await irmaVote.irmaSession(config, "qr", irmaPopup);
```

This function requires three parameters:

config: the object received from `irmaVote.getConfig()`

"qr": the id of the canvas element the QR code can be drawn in to.

irmaPopup: a callback to a function showing the canvas element for the QR code.

The result contains the identifier for the session.

```javascript
const identifier = result.disclosed[0].value.nl;
```


# PokerGameAPI
Creating a poker game using NodeJS, non socket.io style-y.

## API DOC

DevOps Hooks Test to Automate

### Users

`/api/users`

| Argument      | Type    |
| ------------- |:-------:|
| Username      | String  |
| Password      | String  |
| email         | String  |


### Tester Functions
Want to test? You can access the test functions by using a POST request to the following route:

`http://localhost:3000/api/games/GAME_ID_HERE/test`
where GAME_ID_HERE is the id of the game you want to test.

When sending a post request, send the following data in the body: 

`{ "test" : "COMMAND" }`
And replace command with what you want to check.
Currently, there's only one command... but if you want more, just holla

| COMMAND       | What is does    |
| ------------- |:-------:|
| Deck      | Returns the current deck in the game  |

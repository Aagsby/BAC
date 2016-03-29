# Code Hot Swapping Comparison

This Repository contains Code which is used to compare the implementations of Hot Code Swapping in NodeJS and in Elixir.
It exists as the practical part to my Bachelors Thesis.

## TODO
* Proper README.md for the repository. To do, when the thesis is finished.
* README.md for subprojects containing information on how to start them and execute hot code swapping. 

## Notes

### Node
Run: node_plain -> node server.js
Change: server_modules/socket_handler.js Will be reloaded without error checking(!)

### Phoenix
Postgres starten. mix ecto.create mix phoenix.server
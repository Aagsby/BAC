# Hot Code Swapping - NodeJS Plain
This Server is supposed to allow Hot Code Swapping of Modules by watching the module file and reloading it when it changes.
It is layed out to allow existing WebSocket connections to stay alive and keep running the old code while new connections will build its Sockets using the updated Code.
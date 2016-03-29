# Hot Code Swapping - Elixir Phoenix/Exrm

## Setup
* Start postgres
* Change into directory "elixir_exrm"
* "mix deps.get"
* "npm install"
* "mix ecto.create"

## Swapping Code
### Build initial release
* Set Version number in mix.exs // Should allready be set to 0.0.5
* Add prod.secret.exs to config/
* "MIX_ENV=prod mix release"
* Copy Release to deploy Destination
..* (e.g. "mkdir -p deploy && cp rel/phoenix_exrm/releases/[Version Number]/phoenix_exrm.tar.gz deploy/")
* Unpack Release
..* (e.g. "tar -xf deploy/phoenix_exrm.tar.gz -C deploy/")
..* You can remove deploy/phoenix_exrm.tar.gz after this
* Start the Release
..* (e.g. "deploy/bin/phoenix_exrm start")
* Open the release at 127.0.0.1:8888 (localhost:8888 does not work due to the channels security check)

### Build upgrade Release
* Change code in web/channels/connection_channel.ex
* Increment Verions number in mix.exs
* "MIX_ENV=prod mix release"
* Copy Release to deploy Destination
..* (e.g. "mkdir -p deploy/releases/[Version Number]")
..* (e.g. "cp rel/phoenix_exrm/releases/[Version Number]/phoenix_exrm.tar.gz deploy/releases/[Version Number]")
* Trigger the Upgrade
..* (e.g. "deploy/bin/phoenix_exrm upgrade [Version Number]")
* Watch the magic happen

## Notes
* Built and tested using node 5.7.0
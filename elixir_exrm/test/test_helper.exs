ExUnit.start

Mix.Task.run "ecto.create", ~w(-r PhoenixExrm.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r PhoenixExrm.Repo --quiet)
Ecto.Adapters.SQL.begin_test_transaction(PhoenixExrm.Repo)


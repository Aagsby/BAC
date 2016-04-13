defmodule Counter do

  def start_link() do
    Agent.start_link(fn -> 0 end, name: :counter)
  end

  def click() do
    Agent.get_and_update(:counter, fn(n) -> {n + 1, n + 1} end)
  end

  def set(new_value) do
    Agent.update(:counter, fn(_n) -> new_value end)
  end

  def get() do
    Agent.get(:counter, fn(n) -> n end)
  end

end
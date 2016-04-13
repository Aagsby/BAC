defmodule PhoenixExrm.ConnectionChannel do
	use Phoenix.Channel
	require Logger

	def join("connection:lobby", _message, socket) do
		{:ok, socket}
	end

	def handle_in("test_ping", %{"time" => time}, socket) do
		broadcast! socket, "test_pong", %{time: time, counter: Counter.click}
		broadcast! socket, "color", %{c: randomColour()}
		{:noreply, socket}
	end

	def randomColour() do
		r = rem(round(:random.uniform() * 1000),256)
		g = rem(round(:random.uniform() * 1000),256)
		b = rem(round(:random.uniform() * 1000),256)
		"rgb(" <> to_string(r) <> "," <> to_string(g) <> "," <> to_string(b) <> ")"
	end

	def randomColourGrayScale() do
		ran = rem(round(:random.uniform() * 1000),256)
		"rgb(" <> to_string(ran) <> "," <> to_string(ran) <> "," <> to_string(ran) <> ")"
	end
end
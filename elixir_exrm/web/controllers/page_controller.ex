defmodule PhoenixExrm.PageController do
  use PhoenixExrm.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end

# Code Hot Swapping Comparison

This Repository contains Code which is used to compare the implementations of Code Hot Swapping in NodeJS and in Elixir.
It exists as the practical part to my Bachelors Thesis.

#### Insights
  Namespace erneuern wenn Codeänderung
  Watchen + Debouncen
  Cache leeren und Modul neu laden
  Fehler sind ein Problem! Davor testen, ob der Code funktioniert. Dann erst updaten (Automatisiert) // Allgemeines Problem. Auch bei Elixir

  Node sehr straight foreward
  Elixir benötigt mehr einlesen

  http://blog.emaillenin.com/category/elixir
  https://github.com/nickmcdowall/Erlang-Examples/wiki/Hot-Code-Swapping
  http://stackoverflow.com/questions/13223238/how-do-you-create-and-load-modules-dynamically-at-runtime-in-elixir-or-erlang
  Erlang behält 2 Versionen eines Moduls in Memory // Problem: Es sind wirklich nur 2 -> Wenn mehr wird gekilled
  Wenn ein Prozess darauf zugreift -> neueste Version // Hier liegt vll ein Problem oder eine großartige Möglichkeit. Leute in Spielen bekommen die Änderungen evt. sofort und nicht erst, wenn sie ein neues Spiel starten... 
  Alte Version stirbt mit ende der Prozesse

  exrm builds the whole projects including vm//deps etc

  https://www.youtube.com/watch?v=RoT8RnQHvgo
  Buch mit steps

#### TODO
  Cleanup wenn namespaces leer werden
  Auflisten wer sich im Namespace befindet
  Dependencies des neu geladeten Moduls beobachten und Module bei deren Change auch ändern.
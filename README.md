This is a very experimental, partial implementation of the
[Coquette][] micro-framework for JavaScript games in [Blockly][].

When opened, the Blockly workspace contains a rough equivalent of the
sample game at the top of Coquette's documentation, with the following
modifications:

* The code for `Person` is called `Entity` instead, and it's external
  to the generated code (so no way players can write their own display
  routines), though we could add [mutators][] to the entity constructor
  (like the little star button at the top-left of the "if" block) that
  allow more things to be configured on them, like height/width,
  maybe even an image instead of a colour, and so on.

* There is no Game object; we just hard-code a global called `c` that
  is a Coquette instance. This is separate from the generated code,
  though the downside right now is that there's no way to configure
  the game's dimensions or background color through the code.

* Blockly doesn't have a concept of classes, and I wanted it to be
  easy to attach the same update/collision handlers to multiple
  instances of the same object, without having to use classes, so
  methods like `update` and `collision` are done by directly assigning
  functions to properties. This may or may not be weird and impede learning.

Like all Blockly code, the generated JavaScript is intended to be
eminently readable. Click the "view source" button in the editor to see it.

<!-- Links -->

  [Coquette]: http://coquette.maryrosecook.com/
  [Blockly]: https://code.google.com/p/blockly/
  [mutators]: https://code.google.com/p/blockly/wiki/CreatingMutators

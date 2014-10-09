(function() {
  var EMPTY_OBJECT_LITERAL = '({})';

  Blockly.Blocks['create_entity'] = {
    init: function() {
      this.setOutput(true, 'Entity');
      this.setInputsInline(true);
      this.appendDummyInput().appendField('a new Entity');
      this.appendValueInput('X').setCheck('Number').appendField('at x');
      this.appendValueInput('Y').setCheck('Number').appendField('and y');
      this.appendValueInput('COLOUR').setCheck('Colour')
        .appendField('with color');
    }
  };

  Blockly.JavaScript['create_entity'] = function(block) {
    var x = Blockly.JavaScript.valueToCode(block, 'X',
      Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var y = Blockly.JavaScript.valueToCode(block, 'Y',
      Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var colour = Blockly.JavaScript.valueToCode(block, 'COLOUR',
      Blockly.JavaScript.ORDER_COMMA) || '\'#FFFFFF\'';

    return [
      'c.entities.create(Entity, {center: {x: ' + x + ', y: ' + y +
      '}, color: ' + colour + '})',
      Blockly.JavaScript.ORDER_ATOMIC
    ];
  };

  Blockly.Blocks['this_entity'] = {
    init: function() {
      this.setOutput(true, 'Entity');
      this.appendDummyInput().appendField('this Entity');
    }
  };

  Blockly.JavaScript['this_entity'] = function(block) {
    return [
      'this',
      Blockly.JavaScript.ORDER_ATOMIC
    ];
  };

  Blockly.Blocks['other_entity'] = {
    init: function() {
      this.setOutput(true, 'Entity');
      this.appendDummyInput().appendField('the other Entity');
    }
  };

  Blockly.JavaScript['other_entity'] = function(block) {
    return [
      'other',
      Blockly.JavaScript.ORDER_ATOMIC
    ];
  };

  Blockly.Blocks['inputter_pressed'] = {
    BUTTONS: [
      ['left mouse', 'LEFT_MOUSE'],
      ['right mouse', 'RIGHT_MOUSE'],
      ['up arrow', 'UP_ARROW'],
      ['down arrow', 'DOWN_ARROW'],
      ['left arrow', 'LEFT_ARROW'],
      ['right arrow', 'RIGHT_ARROW']
    ],
    init: function() {
      this.setOutput(true, 'Boolean');
      this.appendDummyInput().appendField('the')
        .appendField(new Blockly.FieldDropdown(this.BUTTONS), 'BUTTON')
        .appendField('is pressed')
    }
  };

  Blockly.JavaScript['inputter_pressed'] = function(block) {
    return [
      'c.inputter.isDown(c.inputter.' + block.getFieldValue('BUTTON') + ')',
      Blockly.JavaScript.ORDER_ATOMIC
    ];
  };

  Blockly.Blocks['get_entity_number_prop'] = {
    PROPERTIES: [
      ['x', 'center.x'],
      ['y', 'center.y']
    ],
    init: function() {
      this.setOutput(true, 'Number');
      this.setInputsInline(true);
      this.appendDummyInput().appendField('the')
        .appendField(new Blockly.FieldDropdown(this.PROPERTIES), 'PROPERTY')
      this.appendValueInput('TARGET').setCheck('Entity')
        .appendField('of');
    }
  };

  Blockly.JavaScript['get_entity_number_prop'] = function(block) {
    var target = Blockly.JavaScript.valueToCode(
      block, 'TARGET',
      Blockly.JavaScript.ORDER_ATOMIC
    ) || EMPTY_OBJECT_LITERAL;
    return [
      target + "." + block.getFieldValue('PROPERTY'),
      Blockly.JavaScript.ORDER_ATOMIC
    ];
  };

  Blockly.Blocks['set_entity_number_prop'] = {
    PROPERTIES: Blockly.Blocks['get_entity_number_prop'].PROPERTIES,
    init: function() {
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.appendDummyInput().appendField('set the')
        .appendField(new Blockly.FieldDropdown(this.PROPERTIES), 'PROPERTY')
      this.appendValueInput('TARGET').setCheck('Entity')
        .appendField('of');
      this.appendValueInput('VALUE').setCheck('Number')
        .appendField('to');
    }
  };

  Blockly.JavaScript['set_entity_number_prop'] = function(block) {
    var target = Blockly.JavaScript.valueToCode(
      block, 'TARGET',
      Blockly.JavaScript.ORDER_ATOMIC
    ) || EMPTY_OBJECT_LITERAL;
    var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    return target + "." + block.getFieldValue('PROPERTY') + ' = ' +
      argument0 + ';\n';
  };

  Blockly.Blocks['change_entity_number_prop'] = {
    PROPERTIES: Blockly.Blocks['get_entity_number_prop'].PROPERTIES,
    init: function() {
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.appendDummyInput().appendField('change the')
        .appendField(new Blockly.FieldDropdown(this.PROPERTIES), 'PROPERTY')
      this.appendValueInput('TARGET').setCheck('Entity')
        .appendField('of');
      this.appendValueInput('VALUE').setCheck('Number')
        .appendField('by');
    }
  };

  Blockly.JavaScript['change_entity_number_prop'] = function(block) {
    var target = Blockly.JavaScript.valueToCode(
      block, 'TARGET',
      Blockly.JavaScript.ORDER_ATOMIC
    ) || EMPTY_OBJECT_LITERAL;
    var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    return target + "." + block.getFieldValue('PROPERTY') + ' += ' +
      argument0 + ';\n';
  };

  Blockly.Blocks['handle_update'] = {
    init: function() {
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.appendValueInput('TARGET').setCheck('Entity')
        .appendField('when');
      this.appendStatementInput('STACK').appendField('updates');
    }
  };

  Blockly.JavaScript['handle_update'] = function(block) {
    var target = Blockly.JavaScript.valueToCode(
      block, 'TARGET',
      Blockly.JavaScript.ORDER_ATOMIC
    ) || EMPTY_OBJECT_LITERAL;
    var branch = Blockly.JavaScript.statementToCode(block, 'STACK');
    if (Blockly.JavaScript.STATEMENT_PREFIX) {
      branch = Blockly.JavaScript.prefixLines(
          Blockly.JavaScript.STATEMENT_PREFIX.replace(/%1/g,
          '\'' + block.id + '\''), Blockly.JavaScript.INDENT) + branch;
    }
    if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
      branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,
          '\'' + block.id + '\'') + branch;
    }
    return target + '.update = function() {\n' + branch + '};\n'
  };

  Blockly.Blocks['handle_collision'] = {
    init: function() {
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.appendValueInput('TARGET').setCheck('Entity')
        .appendField('when');
      this.appendStatementInput('STACK')
        .appendField('collides with another');
    }
  };

  Blockly.JavaScript['handle_collision'] = function(block) {
    var target = Blockly.JavaScript.valueToCode(
      block, 'TARGET',
      Blockly.JavaScript.ORDER_ATOMIC
    ) || EMPTY_OBJECT_LITERAL;
    var branch = Blockly.JavaScript.statementToCode(block, 'STACK');
    if (Blockly.JavaScript.STATEMENT_PREFIX) {
      branch = Blockly.JavaScript.prefixLines(
          Blockly.JavaScript.STATEMENT_PREFIX.replace(/%1/g,
          '\'' + block.id + '\''), Blockly.JavaScript.INDENT) + branch;
    }
    if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
      branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,
          '\'' + block.id + '\'') + branch;
    }
    return target + '.collision = function(other) {\n' + branch + '};\n'
  };
})();

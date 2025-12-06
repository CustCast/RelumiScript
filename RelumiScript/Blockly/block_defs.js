// Auto-generated Block Definitions
console.log('Loading static block definitions...');
var commandMap = {};
commandMap['_SET_WEATHER'] = { type: 'bdsp__set_weather', args: 1 };
Blockly.Blocks['bdsp__set_weather'] = {
  init: function() {
    this.appendDummyInput().appendField('_SET_WEATHER');
    this.appendValueInput('ARG_0').appendField('Weather');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Sets the weather.");
  }
};
Blockly.JavaScript['bdsp__set_weather'] = function(block) {
  var code = '_SET_WEATHER(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_FIRST_POKE_SELECT_PROC'] = { type: 'bdsp__first_poke_select_proc', args: 1 };
Blockly.Blocks['bdsp__first_poke_select_proc'] = {
  init: function() {
    this.appendDummyInput().appendField('_FIRST_POKE_SELECT_PROC');
    this.appendValueInput('ARG_0').appendField('Result');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Plays the starter selection scene, then adds the chosen starter to the party.");
  }
};
Blockly.JavaScript['bdsp__first_poke_select_proc'] = function(block) {
  var code = '_FIRST_POKE_SELECT_PROC(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_FIRST_POKE_NO_GET'] = { type: 'bdsp__first_poke_no_get', args: 1 };
Blockly.Blocks['bdsp__first_poke_no_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_FIRST_POKE_NO_GET');
    this.appendValueInput('ARG_0').appendField('Result');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Returns the player's starter selection. Possible values are 0, 1, and 2.");
  }
};
Blockly.JavaScript['bdsp__first_poke_no_get'] = function(block) {
  var code = '_FIRST_POKE_NO_GET(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_TEMOTI_FORMNO'] = { type: 'bdsp__temoti_formno', args: 2 };
Blockly.Blocks['bdsp__temoti_formno'] = {
  init: function() {
    this.appendDummyInput().appendField('_TEMOTI_FORMNO');
    this.appendValueInput('ARG_0').appendField('Index');
    this.appendValueInput('ARG_1').appendField('Result');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Returns the form id of the Pok\u00e9mon at the given index in the party.");
  }
};
Blockly.JavaScript['bdsp__temoti_formno'] = function(block) {
  var code = '_TEMOTI_FORMNO(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_TEMOTI_BOX_FORMNO'] = { type: 'bdsp__temoti_box_formno', args: 3 };
Blockly.Blocks['bdsp__temoti_box_formno'] = {
  init: function() {
    this.appendDummyInput().appendField('_TEMOTI_BOX_FORMNO');
    this.appendValueInput('ARG_0').appendField('Index');
    this.appendValueInput('ARG_1').appendField('TrayIndex');
    this.appendValueInput('ARG_2').appendField('Result');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Returns the form id of the Pok\u00e9mon at the given index and tray index.");
  }
};
Blockly.JavaScript['bdsp__temoti_box_formno'] = function(block) {
  var code = '_TEMOTI_BOX_FORMNO(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_GET_BOX_POKE_SEIKAKU'] = { type: 'bdsp__get_box_poke_seikaku', args: 3 };
Blockly.Blocks['bdsp__get_box_poke_seikaku'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_BOX_POKE_SEIKAKU');
    this.appendValueInput('ARG_0').appendField('Index');
    this.appendValueInput('ARG_1').appendField('TrayIndex');
    this.appendValueInput('ARG_2').appendField('Result');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Returns the nature id of the Pok\u00e9mon at the given index and tray index.");
  }
};
Blockly.JavaScript['bdsp__get_box_poke_seikaku'] = function(block) {
  var code = '_GET_BOX_POKE_SEIKAKU(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_RELEASE_BOX_POKE'] = { type: 'bdsp__release_box_poke', args: 2 };
Blockly.Blocks['bdsp__release_box_poke'] = {
  init: function() {
    this.appendDummyInput().appendField('_RELEASE_BOX_POKE');
    this.appendValueInput('ARG_0').appendField('Index');
    this.appendValueInput('ARG_1').appendField('TrayIndex');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Releases the Pok\u00e9mon at the given index and tray index.");
  }
};
Blockly.JavaScript['bdsp__release_box_poke'] = function(block) {
  var code = '_RELEASE_BOX_POKE(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_TOGGLE_COLLISION_BOX'] = { type: 'bdsp__toggle_collision_box', args: 2 };
Blockly.Blocks['bdsp__toggle_collision_box'] = {
  init: function() {
    this.appendDummyInput().appendField('_TOGGLE_COLLISION_BOX');
    this.appendValueInput('ARG_0').appendField('Name');
    this.appendValueInput('ARG_1').appendField('ToggleValue');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Toggles the collision box of a GameObject on the map");
  }
};
Blockly.JavaScript['bdsp__toggle_collision_box'] = function(block) {
  var code = '_TOGGLE_COLLISION_BOX(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_INSTALL_CHECK'] = { type: 'bdsp__install_check', args: 1 };
Blockly.Blocks['bdsp__install_check'] = {
  init: function() {
    this.appendDummyInput().appendField('_INSTALL_CHECK');
    this.appendValueInput('ARG_0').appendField('Name');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Sets provided work value to 69.");
  }
};
Blockly.JavaScript['bdsp__install_check'] = function(block) {
  var code = '_INSTALL_CHECK(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_SET_PLAYER_COLOR_INDEX'] = { type: 'bdsp__set_player_color_index', args: 1 };
Blockly.Blocks['bdsp__set_player_color_index'] = {
  init: function() {
    this.appendDummyInput().appendField('_SET_PLAYER_COLOR_INDEX');
    this.appendValueInput('ARG_0').appendField('Variation');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Sets the player's ColorVariation id.");
  }
};
Blockly.JavaScript['bdsp__set_player_color_index'] = function(block) {
  var code = '_SET_PLAYER_COLOR_INDEX(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_RIVAL_POKE_NO_GET'] = { type: 'bdsp__rival_poke_no_get', args: 1 };
Blockly.Blocks['bdsp__rival_poke_no_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_RIVAL_POKE_NO_GET');
    this.appendValueInput('ARG_0').appendField('Result');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Returns the rival's starter selection. Possible values are 0, 1, and 2.");
  }
};
Blockly.JavaScript['bdsp__rival_poke_no_get'] = function(block) {
  var code = '_RIVAL_POKE_NO_GET(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_SUPPORT_POKE_NO_GET'] = { type: 'bdsp__support_poke_no_get', args: 1 };
Blockly.Blocks['bdsp__support_poke_no_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_SUPPORT_POKE_NO_GET');
    this.appendValueInput('ARG_0').appendField('Result');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Returns the assistant's starter selection. Possible values are 0, 1, and 2.");
  }
};
Blockly.JavaScript['bdsp__support_poke_no_get'] = function(block) {
  var code = '_SUPPORT_POKE_NO_GET(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_FIRST_MONSNO_FORMNO'] = { type: 'bdsp__first_monsno_formno', args: 2 };
Blockly.Blocks['bdsp__first_monsno_formno'] = {
  init: function() {
    this.appendDummyInput().appendField('_FIRST_MONSNO_FORMNO');
    this.appendValueInput('ARG_0').appendField('Monsno');
    this.appendValueInput('ARG_1').appendField('Formno');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Returns the player's starter's species id and form id.");
  }
};
Blockly.JavaScript['bdsp__first_monsno_formno'] = function(block) {
  var code = '_FIRST_MONSNO_FORMNO(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_RIVAL_MONSNO_FORMNO'] = { type: 'bdsp__rival_monsno_formno', args: 2 };
Blockly.Blocks['bdsp__rival_monsno_formno'] = {
  init: function() {
    this.appendDummyInput().appendField('_RIVAL_MONSNO_FORMNO');
    this.appendValueInput('ARG_0').appendField('Monsno');
    this.appendValueInput('ARG_1').appendField('Formno');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Returns the rival's starter's species id and form id.");
  }
};
Blockly.JavaScript['bdsp__rival_monsno_formno'] = function(block) {
  var code = '_RIVAL_MONSNO_FORMNO(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_SUPPORT_MONSNO_FORMNO'] = { type: 'bdsp__support_monsno_formno', args: 2 };
Blockly.Blocks['bdsp__support_monsno_formno'] = {
  init: function() {
    this.appendDummyInput().appendField('_SUPPORT_MONSNO_FORMNO');
    this.appendValueInput('ARG_0').appendField('Monsno');
    this.appendValueInput('ARG_1').appendField('Formno');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Returns the assistant's starter's species id and form id.");
  }
};
Blockly.JavaScript['bdsp__support_monsno_formno'] = function(block) {
  var code = '_SUPPORT_MONSNO_FORMNO(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_CHANGE_FORMNO'] = { type: 'bdsp__change_formno', args: 3 };
Blockly.Blocks['bdsp__change_formno'] = {
  init: function() {
    this.appendDummyInput().appendField('_CHANGE_FORMNO');
    this.appendValueInput('ARG_0').appendField('Index');
    this.appendValueInput('ARG_1').appendField('TrayIndex');
    this.appendValueInput('ARG_2').appendField('Formno');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Sets the form of the Pok\u00e9mon at the given index and tray index.");
  }
};
Blockly.JavaScript['bdsp__change_formno'] = function(block) {
  var code = '_CHANGE_FORMNO(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_GET_COSTUME_GENDER'] = { type: 'bdsp__get_costume_gender', args: 2 };
Blockly.Blocks['bdsp__get_costume_gender'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_COSTUME_GENDER');
    this.appendValueInput('ARG_0').appendField('Index');
    this.appendValueInput('ARG_1').appendField('Result');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Gets the gender of the given outfit index.");
  }
};
Blockly.JavaScript['bdsp__get_costume_gender'] = function(block) {
  var code = '_GET_COSTUME_GENDER(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_CASE_CALL'] = { type: 'bdsp__case_call', args: 2 };
Blockly.Blocks['bdsp__case_call'] = {
  init: function() {
    this.appendDummyInput().appendField('_CASE_CALL');
    this.appendValueInput('ARG_0').appendField('Value');
    this.appendValueInput('ARG_1').appendField('Script');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Compares the value of the variable given to the last _SWITCH command ran to another value, then calls a script if they are equal.");
  }
};
Blockly.JavaScript['bdsp__case_call'] = function(block) {
  var code = '_CASE_CALL(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_ADD_POKEMON_UI_EXTRA'] = { type: 'bdsp__add_pokemon_ui_extra', args: 3 };
Blockly.Blocks['bdsp__add_pokemon_ui_extra'] = {
  init: function() {
    this.appendDummyInput().appendField('_ADD_POKEMON_UI_EXTRA');
    this.appendValueInput('ARG_0').appendField('Monsno');
    this.appendValueInput('ARG_1').appendField('Formno');
    this.appendValueInput('ARG_2').appendField('Level');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Gives a Pok\u00e9mon to the Player.");
  }
};
Blockly.JavaScript['bdsp__add_pokemon_ui_extra'] = function(block) {
  var code = '_ADD_POKEMON_UI_EXTRA(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_GET_COSTUME_GENDER'] = { type: 'bdsp__get_costume_gender', args: 4 };
Blockly.Blocks['bdsp__get_costume_gender'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_COSTUME_GENDER');
    this.appendValueInput('ARG_0').appendField('Index');
    this.appendValueInput('ARG_1').appendField('Item');
    this.appendValueInput('ARG_2').appendField('MaxIVs');
    this.appendValueInput('ARG_3').appendField('Ball');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Gets the gender of the given outfit index.");
  }
};
Blockly.JavaScript['bdsp__get_costume_gender'] = function(block) {
  var code = '_GET_COSTUME_GENDER(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_3', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_POKEMON_NAME_FORM'] = { type: 'bdsp__pokemon_name_form', args: 3 };
Blockly.Blocks['bdsp__pokemon_name_form'] = {
  init: function() {
    this.appendDummyInput().appendField('_POKEMON_NAME_FORM');
    this.appendValueInput('ARG_0').appendField('TagIndex');
    this.appendValueInput('ARG_1').appendField('Monsno');
    this.appendValueInput('ARG_2').appendField('Formno');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Inserts a string of the specified Pok\u00e9mon's form name into the supplied tagIndex.");
  }
};
Blockly.JavaScript['bdsp__pokemon_name_form'] = function(block) {
  var code = '_POKEMON_NAME_FORM(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_SET_AYOU_NAME'] = { type: 'bdsp__set_ayou_name', args: 0 };
Blockly.Blocks['bdsp__set_ayou_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_SET_AYOU_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Opens the keyboard to set the player's codename.");
  }
};
Blockly.JavaScript['bdsp__set_ayou_name'] = function(block) {
  var code = '_SET_AYOU_NAME(';
  code += ')\n';
  return code;
};
commandMap['_AYOU_NAME'] = { type: 'bdsp__ayou_name', args: 1 };
Blockly.Blocks['bdsp__ayou_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_AYOU_NAME');
    this.appendValueInput('ARG_0').appendField('TagIndex');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Inserts a string of the player's codename into the supplied tagIndex.");
  }
};
Blockly.JavaScript['bdsp__ayou_name'] = function(block) {
  var code = '_AYOU_NAME(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_GET_CAUGHT_LOCATION'] = { type: 'bdsp__get_caught_location', args: 3 };
Blockly.Blocks['bdsp__get_caught_location'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_CAUGHT_LOCATION');
    this.appendValueInput('ARG_0').appendField('Index');
    this.appendValueInput('ARG_1').appendField('TrayIndex');
    this.appendValueInput('ARG_2').appendField('Result');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Retrieves the place ID of the selected Pok\u00e9mon at the given index and tray index.");
  }
};
Blockly.JavaScript['bdsp__get_caught_location'] = function(block) {
  var code = '_GET_CAUGHT_LOCATION(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_CHECK_TUTOR_MOVE'] = { type: 'bdsp__check_tutor_move', args: 4 };
Blockly.Blocks['bdsp__check_tutor_move'] = {
  init: function() {
    this.appendDummyInput().appendField('_CHECK_TUTOR_MOVE');
    this.appendValueInput('ARG_0').appendField('Monsno');
    this.appendValueInput('ARG_1').appendField('Formno');
    this.appendValueInput('ARG_2').appendField('Move');
    this.appendValueInput('ARG_3').appendField('Result');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Checks if a specific species learns the specified move by tutor.");
  }
};
Blockly.JavaScript['bdsp__check_tutor_move'] = function(block) {
  var code = '_CHECK_TUTOR_MOVE(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_3', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_MOVE_TUTOR_UI'] = { type: 'bdsp__move_tutor_ui', args: 3 };
Blockly.Blocks['bdsp__move_tutor_ui'] = {
  init: function() {
    this.appendDummyInput().appendField('_MOVE_TUTOR_UI');
    this.appendValueInput('ARG_0').appendField('Result');
    this.appendValueInput('ARG_1').appendField('Index');
    this.appendValueInput('ARG_2').appendField('TrayIndex');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Opens a Move Tutor UI with the list of tables stored in memory using the same UI as the move relearner.");
  }
};
Blockly.JavaScript['bdsp__move_tutor_ui'] = function(block) {
  var code = '_MOVE_TUTOR_UI(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_GET_HIGHEST_RADAR_STREAK'] = { type: 'bdsp__get_highest_radar_streak', args: 1 };
Blockly.Blocks['bdsp__get_highest_radar_streak'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_HIGHEST_RADAR_STREAK');
    this.appendValueInput('ARG_0').appendField('Result');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Retrieves the value of the highest PokeRadar streak and sets it into a work.");
  }
};
Blockly.JavaScript['bdsp__get_highest_radar_streak'] = function(block) {
  var code = '_GET_HIGHEST_RADAR_STREAK(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_GET_TILE_ATTRIBUTE'] = { type: 'bdsp__get_tile_attribute', args: 4 };
Blockly.Blocks['bdsp__get_tile_attribute'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_TILE_ATTRIBUTE');
    this.appendValueInput('ARG_0').appendField('X');
    this.appendValueInput('ARG_1').appendField('Z');
    this.appendValueInput('ARG_2').appendField('Code');
    this.appendValueInput('ARG_3').appendField('Stop');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Gets the attribute data of a specified tile.");
  }
};
Blockly.JavaScript['bdsp__get_tile_attribute'] = function(block) {
  var code = '_GET_TILE_ATTRIBUTE(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_3', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_EVENT_ENTITY_CLIP_PLAY_BY_INDEX'] = { type: 'bdsp__event_entity_clip_play_by_index', args: 2 };
Blockly.Blocks['bdsp__event_entity_clip_play_by_index'] = {
  init: function() {
    this.appendDummyInput().appendField('_EVENT_ENTITY_CLIP_PLAY_BY_INDEX');
    this.appendValueInput('ARG_0').appendField('Entity');
    this.appendValueInput('ARG_1').appendField('Clip');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Plays an animation clip on a FieldEventEntity at the specified index.");
  }
};
Blockly.JavaScript['bdsp__event_entity_clip_play_by_index'] = function(block) {
  var code = '_EVENT_ENTITY_CLIP_PLAY_BY_INDEX(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_EVENT_ENTITY_CLIP_WAIT_BY_INDEX'] = { type: 'bdsp__event_entity_clip_wait_by_index', args: 1 };
Blockly.Blocks['bdsp__event_entity_clip_wait_by_index'] = {
  init: function() {
    this.appendDummyInput().appendField('_EVENT_ENTITY_CLIP_WAIT_BY_INDEX');
    this.appendValueInput('ARG_0').appendField('Entity');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Waits for an animation clip on a FieldEventEntity at the specified index to be finished.");
  }
};
Blockly.JavaScript['bdsp__event_entity_clip_wait_by_index'] = function(block) {
  var code = '_EVENT_ENTITY_CLIP_WAIT_BY_INDEX(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_ENTITY_MOVE'] = { type: 'bdsp__entity_move', args: 5 };
Blockly.Blocks['bdsp__entity_move'] = {
  init: function() {
    this.appendDummyInput().appendField('_ENTITY_MOVE');
    this.appendValueInput('ARG_0').appendField('Entity');
    this.appendValueInput('ARG_1').appendField('X');
    this.appendValueInput('ARG_2').appendField('Y');
    this.appendValueInput('ARG_3').appendField('Z');
    this.appendValueInput('ARG_4').appendField('Frames');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Moves an entity by an amount of tiles over an amount of frames.");
  }
};
Blockly.JavaScript['bdsp__entity_move'] = function(block) {
  var code = '_ENTITY_MOVE(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_3', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_4', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_MULT_WK'] = { type: 'bdsp__mult_wk', args: 2 };
Blockly.Blocks['bdsp__mult_wk'] = {
  init: function() {
    this.appendDummyInput().appendField('_MULT_WK');
    this.appendValueInput('ARG_0').appendField('Work');
    this.appendValueInput('ARG_1').appendField('Value');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Multiplies the given work by the given value.");
  }
};
Blockly.JavaScript['bdsp__mult_wk'] = function(block) {
  var code = '_MULT_WK(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_DIV_WK'] = { type: 'bdsp__div_wk', args: 2 };
Blockly.Blocks['bdsp__div_wk'] = {
  init: function() {
    this.appendDummyInput().appendField('_DIV_WK');
    this.appendValueInput('ARG_0').appendField('Work');
    this.appendValueInput('ARG_1').appendField('Value');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Divides the given work by the given value. If that value is 0, does nothing.");
  }
};
Blockly.JavaScript['bdsp__div_wk'] = function(block) {
  var code = '_DIV_WK(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_IFCOORDS_JUMP'] = { type: 'bdsp__ifcoords_jump', args: 4 };
Blockly.Blocks['bdsp__ifcoords_jump'] = {
  init: function() {
    this.appendDummyInput().appendField('_IFCOORDS_JUMP');
    this.appendValueInput('ARG_0').appendField('Entity');
    this.appendValueInput('ARG_1').appendField('X');
    this.appendValueInput('ARG_2').appendField('Z');
    this.appendValueInput('ARG_3').appendField('Script');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Compares an entity's XZ coordinates to the given XZ coordinates, then jumps to a script if they are equal.");
  }
};
Blockly.JavaScript['bdsp__ifcoords_jump'] = function(block) {
  var code = '_IFCOORDS_JUMP(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_3', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_IFCOORDS_CALL'] = { type: 'bdsp__ifcoords_call', args: 4 };
Blockly.Blocks['bdsp__ifcoords_call'] = {
  init: function() {
    this.appendDummyInput().appendField('_IFCOORDS_CALL');
    this.appendValueInput('ARG_0').appendField('Entity');
    this.appendValueInput('ARG_1').appendField('X');
    this.appendValueInput('ARG_2').appendField('Z');
    this.appendValueInput('ARG_3').appendField('Script');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Compares an entity's XZ coordinates to the given XZ coordinates, then calls a script if they are equal.");
  }
};
Blockly.JavaScript['bdsp__ifcoords_call'] = function(block) {
  var code = '_IFCOORDS_CALL(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_3', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_LOAD_MOVE_TUTOR_TABLE'] = { type: 'bdsp__load_move_tutor_table', args: 1 };
Blockly.Blocks['bdsp__load_move_tutor_table'] = {
  init: function() {
    this.appendDummyInput().appendField('_LOAD_MOVE_TUTOR_TABLE');
    this.appendValueInput('ARG_0').appendField('Table');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Adds the given Move Tutor table to the list in memory to later use when opening the Move Tutor UI.");
  }
};
Blockly.JavaScript['bdsp__load_move_tutor_table'] = function(block) {
  var code = '_LOAD_MOVE_TUTOR_TABLE(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_GET_DEX_STATUS'] = { type: 'bdsp__get_dex_status', args: 2 };
Blockly.Blocks['bdsp__get_dex_status'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_DEX_STATUS');
    this.appendValueInput('ARG_0').appendField('Monsno');
    this.appendValueInput('ARG_1').appendField('Result');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Retrieves the caught status of a specific Pok\u00e9mon species and sets it into a work.");
  }
};
Blockly.JavaScript['bdsp__get_dex_status'] = function(block) {
  var code = '_GET_DEX_STATUS(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_DEBUG_LOG'] = { type: 'bdsp__debug_log', args: 16 };
Blockly.Blocks['bdsp__debug_log'] = {
  init: function() {
    this.appendDummyInput().appendField('_DEBUG_LOG');
    this.appendValueInput('ARG_0').appendField('Arg1');
    this.appendValueInput('ARG_1').appendField('Arg2');
    this.appendValueInput('ARG_2').appendField('Arg3');
    this.appendValueInput('ARG_3').appendField('Arg4');
    this.appendValueInput('ARG_4').appendField('Arg5');
    this.appendValueInput('ARG_5').appendField('Arg6');
    this.appendValueInput('ARG_6').appendField('Arg7');
    this.appendValueInput('ARG_7').appendField('Arg8');
    this.appendValueInput('ARG_8').appendField('Arg9');
    this.appendValueInput('ARG_9').appendField('Arg10');
    this.appendValueInput('ARG_10').appendField('Arg11');
    this.appendValueInput('ARG_11').appendField('Arg12');
    this.appendValueInput('ARG_12').appendField('Arg13');
    this.appendValueInput('ARG_13').appendField('Arg14');
    this.appendValueInput('ARG_14').appendField('Arg15');
    this.appendValueInput('ARG_15').appendField('Arg16');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Logs the given arguments to the debug console.");
  }
};
Blockly.JavaScript['bdsp__debug_log'] = function(block) {
  var code = '_DEBUG_LOG(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_3', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_4', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_5', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_6', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_7', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_8', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_9', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_10', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_11', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_12', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_13', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_14', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_15', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_DOOR_EXIT_LABEL_SET'] = { type: 'bdsp__door_exit_label_set', args: 2 };
Blockly.Blocks['bdsp__door_exit_label_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_DOOR_EXIT_LABEL_SET');
    this.appendValueInput('ARG_0').appendField('Entity');
    this.appendValueInput('ARG_1').appendField('Label');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Sets the given door entity's Exit Label.");
  }
};
Blockly.JavaScript['bdsp__door_exit_label_set'] = function(block) {
  var code = '_DOOR_EXIT_LABEL_SET(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_GIVE_POFFIN'] = { type: 'bdsp__give_poffin', args: 8 };
Blockly.Blocks['bdsp__give_poffin'] = {
  init: function() {
    this.appendDummyInput().appendField('_GIVE_POFFIN');
    this.appendValueInput('ARG_0').appendField('NameID');
    this.appendValueInput('ARG_1').appendField('Level');
    this.appendValueInput('ARG_2').appendField('Spicy');
    this.appendValueInput('ARG_3').appendField('Dry');
    this.appendValueInput('ARG_4').appendField('Sweet');
    this.appendValueInput('ARG_5').appendField('Bitter');
    this.appendValueInput('ARG_6').appendField('Sour');
    this.appendValueInput('ARG_7').appendField('Smoothness');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Gives the player a poffin with the given stats.");
  }
};
Blockly.JavaScript['bdsp__give_poffin'] = function(block) {
  var code = '_GIVE_POFFIN(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_3', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_4', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_5', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_6', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_7', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_SELECT_POFFIN_UI'] = { type: 'bdsp__select_poffin_ui', args: 1 };
Blockly.Blocks['bdsp__select_poffin_ui'] = {
  init: function() {
    this.appendDummyInput().appendField('_SELECT_POFFIN_UI');
    this.appendValueInput('ARG_0').appendField('Result');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Opens the Poffin Case UI to select one of the player's poffins.");
  }
};
Blockly.JavaScript['bdsp__select_poffin_ui'] = function(block) {
  var code = '_SELECT_POFFIN_UI(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_GET_POFFIN_FLAVOR_NAME'] = { type: 'bdsp__get_poffin_flavor_name', args: 2 };
Blockly.Blocks['bdsp__get_poffin_flavor_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_POFFIN_FLAVOR_NAME');
    this.appendValueInput('ARG_0').appendField('Index');
    this.appendValueInput('ARG_1').appendField('Result');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Gets the flavor name ID of the poffin at the given index in the player's Poffin Case.");
  }
};
Blockly.JavaScript['bdsp__get_poffin_flavor_name'] = function(block) {
  var code = '_GET_POFFIN_FLAVOR_NAME(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_GET_POFFIN_FLAVOR'] = { type: 'bdsp__get_poffin_flavor', args: 3 };
Blockly.Blocks['bdsp__get_poffin_flavor'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_POFFIN_FLAVOR');
    this.appendValueInput('ARG_0').appendField('Index');
    this.appendValueInput('ARG_1').appendField('FlavorIndex');
    this.appendValueInput('ARG_2').appendField('Result');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Gets the value for a specific flavor of the poffin at the given index in the player's Poffin Case.");
  }
};
Blockly.JavaScript['bdsp__get_poffin_flavor'] = function(block) {
  var code = '_GET_POFFIN_FLAVOR(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_DEL_POFFIN'] = { type: 'bdsp__del_poffin', args: 2 };
Blockly.Blocks['bdsp__del_poffin'] = {
  init: function() {
    this.appendDummyInput().appendField('_DEL_POFFIN');
    this.appendValueInput('ARG_0').appendField('Index');
    this.appendValueInput('ARG_1').appendField('Result');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Deletes the poffin at the given index in the player's Poffin Case.");
  }
};
Blockly.JavaScript['bdsp__del_poffin'] = function(block) {
  var code = '_DEL_POFFIN(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_TRAINER_DEFEATED_COUNT'] = { type: 'bdsp__trainer_defeated_count', args: 1 };
Blockly.Blocks['bdsp__trainer_defeated_count'] = {
  init: function() {
    this.appendDummyInput().appendField('_TRAINER_DEFEATED_COUNT');
    this.appendValueInput('ARG_0').appendField('Result');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Gets the amount of trainers whose trainer flag has been set for the current mode.");
  }
};
Blockly.JavaScript['bdsp__trainer_defeated_count'] = function(block) {
  var code = '_TRAINER_DEFEATED_COUNT(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_ATTACH_TRANSFORM'] = { type: 'bdsp__attach_transform', args: 3 };
Blockly.Blocks['bdsp__attach_transform'] = {
  init: function() {
    this.appendDummyInput().appendField('_ATTACH_TRANSFORM');
    this.appendValueInput('ARG_0').appendField('Entity');
    this.appendValueInput('ARG_1').appendField('Parent');
    this.appendValueInput('ARG_2').appendField('KeepWorldPosition');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Attaches the given GameObject to the given parent transform.");
  }
};
Blockly.JavaScript['bdsp__attach_transform'] = function(block) {
  var code = '_ATTACH_TRANSFORM(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_GAMEOBJECT_ROTATE'] = { type: 'bdsp__gameobject_rotate', args: 5 };
Blockly.Blocks['bdsp__gameobject_rotate'] = {
  init: function() {
    this.appendDummyInput().appendField('_GAMEOBJECT_ROTATE');
    this.appendValueInput('ARG_0').appendField('GameObject');
    this.appendValueInput('ARG_1').appendField('X');
    this.appendValueInput('ARG_2').appendField('Y');
    this.appendValueInput('ARG_3').appendField('Z');
    this.appendValueInput('ARG_4').appendField('Frames');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Rotates a GameObject over an amount of frames.");
  }
};
Blockly.JavaScript['bdsp__gameobject_rotate'] = function(block) {
  var code = '_GAMEOBJECT_ROTATE(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_3', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_4', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_LEDGE_JUMP'] = { type: 'bdsp__ledge_jump', args: 4 };
Blockly.Blocks['bdsp__ledge_jump'] = {
  init: function() {
    this.appendDummyInput().appendField('_LEDGE_JUMP');
    this.appendValueInput('ARG_0').appendField('MoveDistance');
    this.appendValueInput('ARG_1').appendField('RelativeHeight');
    this.appendValueInput('ARG_2').appendField('RelativeLower');
    this.appendValueInput('ARG_3').appendField('Duration');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Makes the player ledge jump with the given parameters.");
  }
};
Blockly.JavaScript['bdsp__ledge_jump'] = function(block) {
  var code = '_LEDGE_JUMP(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_3', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_JUMP_AND_ROTATE'] = { type: 'bdsp__jump_and_rotate', args: 9 };
Blockly.Blocks['bdsp__jump_and_rotate'] = {
  init: function() {
    this.appendDummyInput().appendField('_JUMP_AND_ROTATE');
    this.appendValueInput('ARG_0').appendField('GameObject');
    this.appendValueInput('ARG_1').appendField('X');
    this.appendValueInput('ARG_2').appendField('Y');
    this.appendValueInput('ARG_3').appendField('Z');
    this.appendValueInput('ARG_4').appendField('Frames');
    this.appendValueInput('ARG_5').appendField('Pivot');
    this.appendValueInput('ARG_6').appendField('MoveDistance');
    this.appendValueInput('ARG_7').appendField('RelativeHeight');
    this.appendValueInput('ARG_8').appendField('RelativeLower');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Makes the player ledge jump with the given parameters, while rotating a given GameObject over an amount of frames.");
  }
};
Blockly.JavaScript['bdsp__jump_and_rotate'] = function(block) {
  var code = '_JUMP_AND_ROTATE(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_3', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_4', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_5', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_6', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_7', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_8', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['ACMD_END'] = { type: 'bdsp_acmd_end', args: 0 };
Blockly.Blocks['bdsp_acmd_end'] = {
  init: function() {
    this.appendDummyInput().appendField('ACMD_END');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Ends a movement script.");
  }
};
Blockly.JavaScript['bdsp_acmd_end'] = function(block) {
  var code = 'ACMD_END(';
  code += ')\n';
  return code;
};
commandMap['ACMD_NOT'] = { type: 'bdsp_acmd_not', args: 0 };
Blockly.Blocks['bdsp_acmd_not'] = {
  init: function() {
    this.appendDummyInput().appendField('ACMD_NOT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp_acmd_not'] = function(block) {
  var code = 'ACMD_NOT(';
  code += ')\n';
  return code;
};
commandMap['AC_ANIME_DURATION'] = { type: 'bdsp_ac_anime_duration', args: 1 };
Blockly.Blocks['bdsp_ac_anime_duration'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_ANIME_DURATION');
    this.appendValueInput('ARG_0').appendField('Time');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("(?) Sets the length of the next animation.");
  }
};
Blockly.JavaScript['bdsp_ac_anime_duration'] = function(block) {
  var code = 'AC_ANIME_DURATION(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['AC_ANM_PAUSE_OFF'] = { type: 'bdsp_ac_anm_pause_off', args: 0 };
Blockly.Blocks['bdsp_ac_anm_pause_off'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_ANM_PAUSE_OFF');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp_ac_anm_pause_off'] = function(block) {
  var code = 'AC_ANM_PAUSE_OFF(';
  code += ')\n';
  return code;
};
commandMap['AC_ANM_PAUSE_ON'] = { type: 'bdsp_ac_anm_pause_on', args: 0 };
Blockly.Blocks['bdsp_ac_anm_pause_on'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_ANM_PAUSE_ON');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp_ac_anm_pause_on'] = function(block) {
  var code = 'AC_ANM_PAUSE_ON(';
  code += ')\n';
  return code;
};
commandMap['AC_DIR_D'] = { type: 'bdsp_ac_dir_d', args: 2 };
Blockly.Blocks['bdsp_ac_dir_d'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_DIR_D');
    this.appendValueInput('ARG_0').appendField('Time');
    this.appendValueInput('ARG_1').appendField('Unknown');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Turns the affected actor down over an amount of frames.");
  }
};
Blockly.JavaScript['bdsp_ac_dir_d'] = function(block) {
  var code = 'AC_DIR_D(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['AC_DIR_DOWN_CENTER'] = { type: 'bdsp_ac_dir_down_center', args: 0 };
Blockly.Blocks['bdsp_ac_dir_down_center'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_DIR_DOWN_CENTER');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp_ac_dir_down_center'] = function(block) {
  var code = 'AC_DIR_DOWN_CENTER(';
  code += ')\n';
  return code;
};
commandMap['AC_DIR_L'] = { type: 'bdsp_ac_dir_l', args: 2 };
Blockly.Blocks['bdsp_ac_dir_l'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_DIR_L');
    this.appendValueInput('ARG_0').appendField('Time');
    this.appendValueInput('ARG_1').appendField('Unknown');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Turns the affected actor left over an amount of frames.");
  }
};
Blockly.JavaScript['bdsp_ac_dir_l'] = function(block) {
  var code = 'AC_DIR_L(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['AC_DIR_LEFT_CENTER'] = { type: 'bdsp_ac_dir_left_center', args: 2 };
Blockly.Blocks['bdsp_ac_dir_left_center'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_DIR_LEFT_CENTER');
    this.appendValueInput('ARG_0').appendField('Unknown1');
    this.appendValueInput('ARG_1').appendField('Unknown2');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("(?) Turns the affected actor left and centers it on the tile.");
  }
};
Blockly.JavaScript['bdsp_ac_dir_left_center'] = function(block) {
  var code = 'AC_DIR_LEFT_CENTER(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['AC_DIR_PAUSE_OFF'] = { type: 'bdsp_ac_dir_pause_off', args: 1 };
Blockly.Blocks['bdsp_ac_dir_pause_off'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_DIR_PAUSE_OFF');
    this.appendValueInput('ARG_0').appendField('Unknown');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unlocks the direction of the affected actor.");
  }
};
Blockly.JavaScript['bdsp_ac_dir_pause_off'] = function(block) {
  var code = 'AC_DIR_PAUSE_OFF(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['AC_DIR_PAUSE_ON'] = { type: 'bdsp_ac_dir_pause_on', args: 1 };
Blockly.Blocks['bdsp_ac_dir_pause_on'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_DIR_PAUSE_ON');
    this.appendValueInput('ARG_0').appendField('Unknown');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Locks the direction of the affected actor.");
  }
};
Blockly.JavaScript['bdsp_ac_dir_pause_on'] = function(block) {
  var code = 'AC_DIR_PAUSE_ON(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['AC_DIR_R'] = { type: 'bdsp_ac_dir_r', args: 2 };
Blockly.Blocks['bdsp_ac_dir_r'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_DIR_R');
    this.appendValueInput('ARG_0').appendField('Time');
    this.appendValueInput('ARG_1').appendField('Unknown');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Turns the affected actor right over an amount of frames.");
  }
};
Blockly.JavaScript['bdsp_ac_dir_r'] = function(block) {
  var code = 'AC_DIR_R(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['AC_DIR_RIGHT_CENTER'] = { type: 'bdsp_ac_dir_right_center', args: 2 };
Blockly.Blocks['bdsp_ac_dir_right_center'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_DIR_RIGHT_CENTER');
    this.appendValueInput('ARG_0').appendField('Unknown1');
    this.appendValueInput('ARG_1').appendField('Unknown2');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("(?) Turns the affected actor right and centers it on the tile.");
  }
};
Blockly.JavaScript['bdsp_ac_dir_right_center'] = function(block) {
  var code = 'AC_DIR_RIGHT_CENTER(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['AC_DIR_U'] = { type: 'bdsp_ac_dir_u', args: 2 };
Blockly.Blocks['bdsp_ac_dir_u'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_DIR_U');
    this.appendValueInput('ARG_0').appendField('Time');
    this.appendValueInput('ARG_1').appendField('Unknown');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Turns the affected actor up over an amount of frames.");
  }
};
Blockly.JavaScript['bdsp_ac_dir_u'] = function(block) {
  var code = 'AC_DIR_U(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['AC_DIR_UP_CENTER'] = { type: 'bdsp_ac_dir_up_center', args: 0 };
Blockly.Blocks['bdsp_ac_dir_up_center'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_DIR_UP_CENTER');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("(?) Turns the affected actor up and centers it on the tile.");
  }
};
Blockly.JavaScript['bdsp_ac_dir_up_center'] = function(block) {
  var code = 'AC_DIR_UP_CENTER(';
  code += ')\n';
  return code;
};
commandMap['AC_DIR_VAL'] = { type: 'bdsp_ac_dir_val', args: 2 };
Blockly.Blocks['bdsp_ac_dir_val'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_DIR_VAL');
    this.appendValueInput('ARG_0').appendField('Time');
    this.appendValueInput('ARG_1').appendField('Angle');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Turns the affected actor to a specific angle over an amount of frames.");
  }
};
Blockly.JavaScript['bdsp_ac_dir_val'] = function(block) {
  var code = 'AC_DIR_VAL(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['AC_DOWN'] = { type: 'bdsp_ac_down', args: 3 };
Blockly.Blocks['bdsp_ac_down'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_DOWN');
    this.appendValueInput('ARG_0').appendField('Tiles');
    this.appendValueInput('ARG_1').appendField('Time');
    this.appendValueInput('ARG_2').appendField('Unknown');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Moves the affected actor down an amount of tiles over an amount of frames.");
  }
};
Blockly.JavaScript['bdsp_ac_down'] = function(block) {
  var code = 'AC_DOWN(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['AC_DOWN_CENTER'] = { type: 'bdsp_ac_down_center', args: 2 };
Blockly.Blocks['bdsp_ac_down_center'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_DOWN_CENTER');
    this.appendValueInput('ARG_0').appendField('Tiles');
    this.appendValueInput('ARG_1').appendField('Time');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Moves the affected actor down an amount of tiles over an amount of frames. The actor ends on the center of the final tile.");
  }
};
Blockly.JavaScript['bdsp_ac_down_center'] = function(block) {
  var code = 'AC_DOWN_CENTER(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['AC_FACE_INDEX'] = { type: 'bdsp_ac_face_index', args: 1 };
Blockly.Blocks['bdsp_ac_face_index'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_FACE_INDEX');
    this.appendValueInput('ARG_0').appendField('Face');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Changes the face of the affected actor.");
  }
};
Blockly.JavaScript['bdsp_ac_face_index'] = function(block) {
  var code = 'AC_FACE_INDEX(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['AC_HERO_BANZAI'] = { type: 'bdsp_ac_hero_banzai', args: 0 };
Blockly.Blocks['bdsp_ac_hero_banzai'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_HERO_BANZAI');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp_ac_hero_banzai'] = function(block) {
  var code = 'AC_HERO_BANZAI(';
  code += ')\n';
  return code;
};
commandMap['AC_HERO_BANZAI_UKE'] = { type: 'bdsp_ac_hero_banzai_uke', args: 0 };
Blockly.Blocks['bdsp_ac_hero_banzai_uke'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_HERO_BANZAI_UKE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp_ac_hero_banzai_uke'] = function(block) {
  var code = 'AC_HERO_BANZAI_UKE(';
  code += ')\n';
  return code;
};
commandMap['AC_HERO_MATCH_X'] = { type: 'bdsp_ac_hero_match_x', args: 1 };
Blockly.Blocks['bdsp_ac_hero_match_x'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_HERO_MATCH_X');
    this.appendValueInput('ARG_0').appendField('Time');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Moves the affected actor up or down to match the X position of the player.");
  }
};
Blockly.JavaScript['bdsp_ac_hero_match_x'] = function(block) {
  var code = 'AC_HERO_MATCH_X(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['AC_HERO_MATCH_Z'] = { type: 'bdsp_ac_hero_match_z', args: 1 };
Blockly.Blocks['bdsp_ac_hero_match_z'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_HERO_MATCH_Z');
    this.appendValueInput('ARG_0').appendField('Time');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Moves the affected actor left or right to match the Z position of the player.");
  }
};
Blockly.JavaScript['bdsp_ac_hero_match_z'] = function(block) {
  var code = 'AC_HERO_MATCH_Z(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['AC_HIDE_PULLOFF'] = { type: 'bdsp_ac_hide_pulloff', args: 0 };
Blockly.Blocks['bdsp_ac_hide_pulloff'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_HIDE_PULLOFF');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp_ac_hide_pulloff'] = function(block) {
  var code = 'AC_HIDE_PULLOFF(';
  code += ')\n';
  return code;
};
commandMap['AC_INDEX_ANIME'] = { type: 'bdsp_ac_index_anime', args: 2 };
Blockly.Blocks['bdsp_ac_index_anime'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_INDEX_ANIME');
    this.appendValueInput('ARG_0').appendField('Animation');
    this.appendValueInput('ARG_1').appendField('Unknown');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Animates the affected actor with a specific animation.");
  }
};
Blockly.JavaScript['bdsp_ac_index_anime'] = function(block) {
  var code = 'AC_INDEX_ANIME(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['AC_INDEX_ANIME_WAIT'] = { type: 'bdsp_ac_index_anime_wait', args: 0 };
Blockly.Blocks['bdsp_ac_index_anime_wait'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_INDEX_ANIME_WAIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Waits for the currently playing animation from AC_INDEX_ANIME to end.");
  }
};
Blockly.JavaScript['bdsp_ac_index_anime_wait'] = function(block) {
  var code = 'AC_INDEX_ANIME_WAIT(';
  code += ')\n';
  return code;
};
commandMap['AC_INVISIBLE_OFF'] = { type: 'bdsp_ac_invisible_off', args: 0 };
Blockly.Blocks['bdsp_ac_invisible_off'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_INVISIBLE_OFF');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unhides the affected actor.");
  }
};
Blockly.JavaScript['bdsp_ac_invisible_off'] = function(block) {
  var code = 'AC_INVISIBLE_OFF(';
  code += ')\n';
  return code;
};
commandMap['AC_INVISIBLE_ON'] = { type: 'bdsp_ac_invisible_on', args: 0 };
Blockly.Blocks['bdsp_ac_invisible_on'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_INVISIBLE_ON');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Hides the affected actor.");
  }
};
Blockly.JavaScript['bdsp_ac_invisible_on'] = function(block) {
  var code = 'AC_INVISIBLE_ON(';
  code += ')\n';
  return code;
};
commandMap['AC_LEFT'] = { type: 'bdsp_ac_left', args: 3 };
Blockly.Blocks['bdsp_ac_left'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_LEFT');
    this.appendValueInput('ARG_0').appendField('Tiles');
    this.appendValueInput('ARG_1').appendField('Time');
    this.appendValueInput('ARG_2').appendField('Unknown');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Moves the affected actor left an amount of tiles over an amount of frames.");
  }
};
Blockly.JavaScript['bdsp_ac_left'] = function(block) {
  var code = 'AC_LEFT(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['AC_LEFT_CENTER'] = { type: 'bdsp_ac_left_center', args: 2 };
Blockly.Blocks['bdsp_ac_left_center'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_LEFT_CENTER');
    this.appendValueInput('ARG_0').appendField('Tiles');
    this.appendValueInput('ARG_1').appendField('Time');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Moves the affected actor left an amount of tiles over an amount of frames. The actor ends on the center of the final tile.");
  }
};
Blockly.JavaScript['bdsp_ac_left_center'] = function(block) {
  var code = 'AC_LEFT_CENTER(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['AC_LOOP'] = { type: 'bdsp_ac_loop', args: 0 };
Blockly.Blocks['bdsp_ac_loop'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_LOOP');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp_ac_loop'] = function(block) {
  var code = 'AC_LOOP(';
  code += ')\n';
  return code;
};
commandMap['AC_MARK_EMO'] = { type: 'bdsp_ac_mark_emo', args: 1 };
Blockly.Blocks['bdsp_ac_mark_emo'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_MARK_EMO');
    this.appendValueInput('ARG_0').appendField('Emotion');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Shows an emotion bubble above the affected actor.");
  }
};
Blockly.JavaScript['bdsp_ac_mark_emo'] = function(block) {
  var code = 'AC_MARK_EMO(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['AC_MARK_GYOE'] = { type: 'bdsp_ac_mark_gyoe', args: 1 };
Blockly.Blocks['bdsp_ac_mark_gyoe'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_MARK_GYOE');
    this.appendValueInput('ARG_0').appendField('Unknown');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Shows a [!] bubble above the affected actor.");
  }
};
Blockly.JavaScript['bdsp_ac_mark_gyoe'] = function(block) {
  var code = 'AC_MARK_GYOE(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['AC_MARK_SAISEN'] = { type: 'bdsp_ac_mark_saisen', args: 0 };
Blockly.Blocks['bdsp_ac_mark_saisen'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_MARK_SAISEN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp_ac_mark_saisen'] = function(block) {
  var code = 'AC_MARK_SAISEN(';
  code += ')\n';
  return code;
};
commandMap['AC_NECK_ROTATE'] = { type: 'bdsp_ac_neck_rotate', args: 4 };
Blockly.Blocks['bdsp_ac_neck_rotate'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_NECK_ROTATE');
    this.appendValueInput('ARG_0').appendField('Rotation1');
    this.appendValueInput('ARG_1').appendField('Rotation2');
    this.appendValueInput('ARG_2').appendField('Rotation3');
    this.appendValueInput('ARG_3').appendField('Time');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Rotates the head of the affected actor.");
  }
};
Blockly.JavaScript['bdsp_ac_neck_rotate'] = function(block) {
  var code = 'AC_NECK_ROTATE(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_3', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['AC_OFFSET'] = { type: 'bdsp_ac_offset', args: 0 };
Blockly.Blocks['bdsp_ac_offset'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_OFFSET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp_ac_offset'] = function(block) {
  var code = 'AC_OFFSET(';
  code += ')\n';
  return code;
};
commandMap['AC_PC_BOW'] = { type: 'bdsp_ac_pc_bow', args: 0 };
Blockly.Blocks['bdsp_ac_pc_bow'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_PC_BOW');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp_ac_pc_bow'] = function(block) {
  var code = 'AC_PC_BOW(';
  code += ')\n';
  return code;
};
commandMap['AC_RIGHT'] = { type: 'bdsp_ac_right', args: 3 };
Blockly.Blocks['bdsp_ac_right'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_RIGHT');
    this.appendValueInput('ARG_0').appendField('Tiles');
    this.appendValueInput('ARG_1').appendField('Time');
    this.appendValueInput('ARG_2').appendField('Unknown');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Moves the affected actor right an amount of tiles over an amount of frames.");
  }
};
Blockly.JavaScript['bdsp_ac_right'] = function(block) {
  var code = 'AC_RIGHT(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['AC_RIGHT_CENTER'] = { type: 'bdsp_ac_right_center', args: 2 };
Blockly.Blocks['bdsp_ac_right_center'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_RIGHT_CENTER');
    this.appendValueInput('ARG_0').appendField('Tiles');
    this.appendValueInput('ARG_1').appendField('Time');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Moves the affected actor right an amount of tiles over an amount of frames. The actor ends on the center of the final tile.");
  }
};
Blockly.JavaScript['bdsp_ac_right_center'] = function(block) {
  var code = 'AC_RIGHT_CENTER(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['AC_STOP_WALK_ANIME'] = { type: 'bdsp_ac_stop_walk_anime', args: 0 };
Blockly.Blocks['bdsp_ac_stop_walk_anime'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_STOP_WALK_ANIME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp_ac_stop_walk_anime'] = function(block) {
  var code = 'AC_STOP_WALK_ANIME(';
  code += ')\n';
  return code;
};
commandMap['AC_UP'] = { type: 'bdsp_ac_up', args: 3 };
Blockly.Blocks['bdsp_ac_up'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_UP');
    this.appendValueInput('ARG_0').appendField('Tiles');
    this.appendValueInput('ARG_1').appendField('Time');
    this.appendValueInput('ARG_2').appendField('Unknown');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Moves the affected actor up an amount of tiles over an amount of frames.");
  }
};
Blockly.JavaScript['bdsp_ac_up'] = function(block) {
  var code = 'AC_UP(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['AC_UP_CENTER'] = { type: 'bdsp_ac_up_center', args: 2 };
Blockly.Blocks['bdsp_ac_up_center'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_UP_CENTER');
    this.appendValueInput('ARG_0').appendField('Tiles');
    this.appendValueInput('ARG_1').appendField('Time');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Moves the affected actor up an amount of tiles over an amount of frames. The actor ends on the center of the final tile.");
  }
};
Blockly.JavaScript['bdsp_ac_up_center'] = function(block) {
  var code = 'AC_UP_CENTER(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['AC_VANISH_OFF'] = { type: 'bdsp_ac_vanish_off', args: 0 };
Blockly.Blocks['bdsp_ac_vanish_off'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_VANISH_OFF');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp_ac_vanish_off'] = function(block) {
  var code = 'AC_VANISH_OFF(';
  code += ')\n';
  return code;
};
commandMap['AC_VANISH_ON'] = { type: 'bdsp_ac_vanish_on', args: 0 };
Blockly.Blocks['bdsp_ac_vanish_on'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_VANISH_ON');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp_ac_vanish_on'] = function(block) {
  var code = 'AC_VANISH_ON(';
  code += ')\n';
  return code;
};
commandMap['AC_WAIT'] = { type: 'bdsp_ac_wait', args: 1 };
Blockly.Blocks['bdsp_ac_wait'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_WAIT');
    this.appendValueInput('ARG_0').appendField('Time');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Waits for the specified amount of frames before continuing the movement script.");
  }
};
Blockly.JavaScript['bdsp_ac_wait'] = function(block) {
  var code = 'AC_WAIT(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['AC_WORLD_X'] = { type: 'bdsp_ac_world_x', args: 0 };
Blockly.Blocks['bdsp_ac_world_x'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_WORLD_X');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp_ac_world_x'] = function(block) {
  var code = 'AC_WORLD_X(';
  code += ')\n';
  return code;
};
commandMap['AC_WORLD_Z'] = { type: 'bdsp_ac_world_z', args: 0 };
Blockly.Blocks['bdsp_ac_world_z'] = {
  init: function() {
    this.appendDummyInput().appendField('AC_WORLD_Z');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp_ac_world_z'] = function(block) {
  var code = 'AC_WORLD_Z(';
  code += ')\n';
  return code;
};
commandMap['CMD_NAME_END'] = { type: 'bdsp_cmd_name_end', args: 0 };
Blockly.Blocks['bdsp_cmd_name_end'] = {
  init: function() {
    this.appendDummyInput().appendField('CMD_NAME_END');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp_cmd_name_end'] = function(block) {
  var code = 'CMD_NAME_END(';
  code += ')\n';
  return code;
};
commandMap['_2VS2_BATTLE_CHECK'] = { type: 'bdsp__2vs2_battle_check', args: 0 };
Blockly.Blocks['bdsp__2vs2_battle_check'] = {
  init: function() {
    this.appendDummyInput().appendField('_2VS2_BATTLE_CHECK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__2vs2_battle_check'] = function(block) {
  var code = '_2VS2_BATTLE_CHECK(';
  code += ')\n';
  return code;
};
commandMap['_AB_KEYWAIT'] = { type: 'bdsp__ab_keywait', args: 0 };
Blockly.Blocks['bdsp__ab_keywait'] = {
  init: function() {
    this.appendDummyInput().appendField('_AB_KEYWAIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("(?) Some sort of key wait usually used before doing a screen fade-out.");
  }
};
Blockly.JavaScript['bdsp__ab_keywait'] = function(block) {
  var code = '_AB_KEYWAIT(';
  code += ')\n';
  return code;
};
commandMap['_AB_KEY_TIME_WAIT'] = { type: 'bdsp__ab_key_time_wait', args: 1 };
Blockly.Blocks['bdsp__ab_key_time_wait'] = {
  init: function() {
    this.appendDummyInput().appendField('_AB_KEY_TIME_WAIT');
    this.appendValueInput('ARG_0').appendField('Time');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("(?) Some sort of key wait with a timer. Only used in union room.");
  }
};
Blockly.JavaScript['bdsp__ab_key_time_wait'] = function(block) {
  var code = '_AB_KEY_TIME_WAIT(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_ACCE_NAME'] = { type: 'bdsp__acce_name', args: 0 };
Blockly.Blocks['bdsp__acce_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_ACCE_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__acce_name'] = function(block) {
  var code = '_ACCE_NAME(';
  code += ')\n';
  return code;
};
commandMap['_ACCE_SHOP_CALL'] = { type: 'bdsp__acce_shop_call', args: 0 };
Blockly.Blocks['bdsp__acce_shop_call'] = {
  init: function() {
    this.appendDummyInput().appendField('_ACCE_SHOP_CALL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__acce_shop_call'] = function(block) {
  var code = '_ACCE_SHOP_CALL(';
  code += ')\n';
  return code;
};
commandMap['_AC_ANIM_LOCK'] = { type: 'bdsp__ac_anim_lock', args: 0 };
Blockly.Blocks['bdsp__ac_anim_lock'] = {
  init: function() {
    this.appendDummyInput().appendField('_AC_ANIM_LOCK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__ac_anim_lock'] = function(block) {
  var code = '_AC_ANIM_LOCK(';
  code += ')\n';
  return code;
};
commandMap['_AC_ANIM_RELEASE'] = { type: 'bdsp__ac_anim_release', args: 0 };
Blockly.Blocks['bdsp__ac_anim_release'] = {
  init: function() {
    this.appendDummyInput().appendField('_AC_ANIM_RELEASE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__ac_anim_release'] = function(block) {
  var code = '_AC_ANIM_RELEASE(';
  code += ')\n';
  return code;
};
commandMap['_ADD_BOX_ITEM'] = { type: 'bdsp__add_box_item', args: 0 };
Blockly.Blocks['bdsp__add_box_item'] = {
  init: function() {
    this.appendDummyInput().appendField('_ADD_BOX_ITEM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__add_box_item'] = function(block) {
  var code = '_ADD_BOX_ITEM(';
  code += ')\n';
  return code;
};
commandMap['_ADD_COIN'] = { type: 'bdsp__add_coin', args: 0 };
Blockly.Blocks['bdsp__add_coin'] = {
  init: function() {
    this.appendDummyInput().appendField('_ADD_COIN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__add_coin'] = function(block) {
  var code = '_ADD_COIN(';
  code += ')\n';
  return code;
};
commandMap['_ADD_COIN_CHK'] = { type: 'bdsp__add_coin_chk', args: 0 };
Blockly.Blocks['bdsp__add_coin_chk'] = {
  init: function() {
    this.appendDummyInput().appendField('_ADD_COIN_CHK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__add_coin_chk'] = function(block) {
  var code = '_ADD_COIN_CHK(';
  code += ')\n';
  return code;
};
commandMap['_ADD_CUSTUM_WIN_LABEL'] = { type: 'bdsp__add_custum_win_label', args: 0 };
Blockly.Blocks['bdsp__add_custum_win_label'] = {
  init: function() {
    this.appendDummyInput().appendField('_ADD_CUSTUM_WIN_LABEL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__add_custum_win_label'] = function(block) {
  var code = '_ADD_CUSTUM_WIN_LABEL(';
  code += ')\n';
  return code;
};
commandMap['_ADD_CUSTUM_WIN_LABEL_TWO_WINDOW'] = { type: 'bdsp__add_custum_win_label_two_window', args: 0 };
Blockly.Blocks['bdsp__add_custum_win_label_two_window'] = {
  init: function() {
    this.appendDummyInput().appendField('_ADD_CUSTUM_WIN_LABEL_TWO_WINDOW');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__add_custum_win_label_two_window'] = function(block) {
  var code = '_ADD_CUSTUM_WIN_LABEL_TWO_WINDOW(';
  code += ')\n';
  return code;
};
commandMap['_ADD_CUSTUM_WIN_LABEL_WORD_SET'] = { type: 'bdsp__add_custum_win_label_word_set', args: 0 };
Blockly.Blocks['bdsp__add_custum_win_label_word_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_ADD_CUSTUM_WIN_LABEL_WORD_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__add_custum_win_label_word_set'] = function(block) {
  var code = '_ADD_CUSTUM_WIN_LABEL_WORD_SET(';
  code += ')\n';
  return code;
};
commandMap['_ADD_GOLD'] = { type: 'bdsp__add_gold', args: 1 };
Blockly.Blocks['bdsp__add_gold'] = {
  init: function() {
    this.appendDummyInput().appendField('_ADD_GOLD');
    this.appendValueInput('ARG_0').appendField('Amount');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Gives money to the player.");
  }
};
Blockly.JavaScript['bdsp__add_gold'] = function(block) {
  var code = '_ADD_GOLD(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_ADD_GOODS'] = { type: 'bdsp__add_goods', args: 3 };
Blockly.Blocks['bdsp__add_goods'] = {
  init: function() {
    this.appendDummyInput().appendField('_ADD_GOODS');
    this.appendValueInput('ARG_0').appendField('Good');
    this.appendValueInput('ARG_1').appendField('Amount');
    this.appendValueInput('ARG_2').appendField('Unknown');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Gives an amount of one good to the player. Only used in one unused common script.");
  }
};
Blockly.JavaScript['bdsp__add_goods'] = function(block) {
  var code = '_ADD_GOODS(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_ADD_GOODS_CHK'] = { type: 'bdsp__add_goods_chk', args: 0 };
Blockly.Blocks['bdsp__add_goods_chk'] = {
  init: function() {
    this.appendDummyInput().appendField('_ADD_GOODS_CHK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__add_goods_chk'] = function(block) {
  var code = '_ADD_GOODS_CHK(';
  code += ')\n';
  return code;
};
commandMap['_ADD_ITEM'] = { type: 'bdsp__add_item', args: 3 };
Blockly.Blocks['bdsp__add_item'] = {
  init: function() {
    this.appendDummyInput().appendField('_ADD_ITEM');
    this.appendValueInput('ARG_0').appendField('Item');
    this.appendValueInput('ARG_1').appendField('Amount');
    this.appendValueInput('ARG_2').appendField('Unknown');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Gives an amount of one item to the player.");
  }
};
Blockly.JavaScript['bdsp__add_item'] = function(block) {
  var code = '_ADD_ITEM(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_ADD_ITEM_CHK'] = { type: 'bdsp__add_item_chk', args: 3 };
Blockly.Blocks['bdsp__add_item_chk'] = {
  init: function() {
    this.appendDummyInput().appendField('_ADD_ITEM_CHK');
    this.appendValueInput('ARG_0').appendField('Item');
    this.appendValueInput('ARG_1').appendField('Amount');
    this.appendValueInput('ARG_2').appendField('Result');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Gives an amount of one item to the player after checking if they have enough bag space.");
  }
};
Blockly.JavaScript['bdsp__add_item_chk'] = function(block) {
  var code = '_ADD_ITEM_CHK(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_ADD_MAROYAKA_POFFIN'] = { type: 'bdsp__add_maroyaka_poffin', args: 0 };
Blockly.Blocks['bdsp__add_maroyaka_poffin'] = {
  init: function() {
    this.appendDummyInput().appendField('_ADD_MAROYAKA_POFFIN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__add_maroyaka_poffin'] = function(block) {
  var code = '_ADD_MAROYAKA_POFFIN(';
  code += ')\n';
  return code;
};
commandMap['_ADD_MOVE_POKE'] = { type: 'bdsp__add_move_poke', args: 0 };
Blockly.Blocks['bdsp__add_move_poke'] = {
  init: function() {
    this.appendDummyInput().appendField('_ADD_MOVE_POKE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__add_move_poke'] = function(block) {
  var code = '_ADD_MOVE_POKE(';
  code += ')\n';
  return code;
};
commandMap['_ADD_NATSUKI'] = { type: 'bdsp__add_natsuki', args: 0 };
Blockly.Blocks['bdsp__add_natsuki'] = {
  init: function() {
    this.appendDummyInput().appendField('_ADD_NATSUKI');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__add_natsuki'] = function(block) {
  var code = '_ADD_NATSUKI(';
  code += ')\n';
  return code;
};
commandMap['bdsp__add_pokemon'] = { type: 'bdsp__add_pokemon', args: 0 };
Blockly.Blocks['bdsp__add_pokemon'] = {
  init: function() {
    this.appendDummyInput().appendField('bdsp__add_pokemon');
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__add_pokemon'] = function(block) {
  var code = 'bdsp__add_pokemon(';
  code += ')\n';
  return code;
};
commandMap['_ADD_POKEMON_UI'] = { type: 'bdsp__add_pokemon_ui', args: 3 };
Blockly.Blocks['bdsp__add_pokemon_ui'] = {
  init: function() {
    this.appendDummyInput().appendField('_ADD_POKEMON_UI');
    this.appendValueInput('ARG_0').appendField('Sphere');
    this.appendValueInput('ARG_1').appendField('Amount');
    this.appendValueInput('ARG_2').appendField('Unknown');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__add_pokemon_ui'] = function(block) {
  var code = '_ADD_POKEMON_UI(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_ADD_SCORE'] = { type: 'bdsp__add_score', args: 0 };
Blockly.Blocks['bdsp__add_score'] = {
  init: function() {
    this.appendDummyInput().appendField('_ADD_SCORE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__add_score'] = function(block) {
  var code = '_ADD_SCORE(';
  code += ')\n';
  return code;
};
commandMap['_ADD_TAMA'] = { type: 'bdsp__add_tama', args: 3 };
Blockly.Blocks['bdsp__add_tama'] = {
  init: function() {
    this.appendDummyInput().appendField('_ADD_TAMA');
    this.appendValueInput('ARG_0').appendField('Sphere');
    this.appendValueInput('ARG_1').appendField('Amount');
    this.appendValueInput('ARG_2').appendField('Unknown');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Gives an amount of one sphere to the player.");
  }
};
Blockly.JavaScript['bdsp__add_tama'] = function(block) {
  var code = '_ADD_TAMA(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_ADD_TAMAGO'] = { type: 'bdsp__add_tamago', args: 2 };
Blockly.Blocks['bdsp__add_tamago'] = {
  init: function() {
    this.appendDummyInput().appendField('_ADD_TAMAGO');
    this.appendValueInput('ARG_0').appendField('Species');
    this.appendValueInput('ARG_1').appendField('Origin');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Gives an egg to the player.");
  }
};
Blockly.JavaScript['bdsp__add_tamago'] = function(block) {
  var code = '_ADD_TAMAGO(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_ADD_TAMA_CHK'] = { type: 'bdsp__add_tama_chk', args: 0 };
Blockly.Blocks['bdsp__add_tama_chk'] = {
  init: function() {
    this.appendDummyInput().appendField('_ADD_TAMA_CHK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__add_tama_chk'] = function(block) {
  var code = '_ADD_TAMA_CHK(';
  code += ')\n';
  return code;
};
commandMap['_ADD_TRAP'] = { type: 'bdsp__add_trap', args: 3 };
Blockly.Blocks['bdsp__add_trap'] = {
  init: function() {
    this.appendDummyInput().appendField('_ADD_TRAP');
    this.appendValueInput('ARG_0').appendField('Trap');
    this.appendValueInput('ARG_1').appendField('Amount');
    this.appendValueInput('ARG_2').appendField('Unknown');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Gives an amount of one trap to the player. Only used in one unused common script.");
  }
};
Blockly.JavaScript['bdsp__add_trap'] = function(block) {
  var code = '_ADD_TRAP(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_ADD_TRAP_CHK'] = { type: 'bdsp__add_trap_chk', args: 0 };
Blockly.Blocks['bdsp__add_trap_chk'] = {
  init: function() {
    this.appendDummyInput().appendField('_ADD_TRAP_CHK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__add_trap_chk'] = function(block) {
  var code = '_ADD_TRAP_CHK(';
  code += ')\n';
  return code;
};
commandMap['_ADD_TREASURE'] = { type: 'bdsp__add_treasure', args: 0 };
Blockly.Blocks['bdsp__add_treasure'] = {
  init: function() {
    this.appendDummyInput().appendField('_ADD_TREASURE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__add_treasure'] = function(block) {
  var code = '_ADD_TREASURE(';
  code += ')\n';
  return code;
};
commandMap['_ADD_TREASURE_CHK'] = { type: 'bdsp__add_treasure_chk', args: 0 };
Blockly.Blocks['bdsp__add_treasure_chk'] = {
  init: function() {
    this.appendDummyInput().appendField('_ADD_TREASURE_CHK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__add_treasure_chk'] = function(block) {
  var code = '_ADD_TREASURE_CHK(';
  code += ')\n';
  return code;
};
commandMap['_ADD_UG_ITEM'] = { type: 'bdsp__add_ug_item', args: 0 };
Blockly.Blocks['bdsp__add_ug_item'] = {
  init: function() {
    this.appendDummyInput().appendField('_ADD_UG_ITEM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__add_ug_item'] = function(block) {
  var code = '_ADD_UG_ITEM(';
  code += ')\n';
  return code;
};
commandMap['_ADD_UNIQUE_POKEMON_UI'] = { type: 'bdsp__add_unique_pokemon_ui', args: 0 };
Blockly.Blocks['bdsp__add_unique_pokemon_ui'] = {
  init: function() {
    this.appendDummyInput().appendField('_ADD_UNIQUE_POKEMON_UI');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__add_unique_pokemon_ui'] = function(block) {
  var code = '_ADD_UNIQUE_POKEMON_UI(';
  code += ')\n';
  return code;
};
commandMap['_ADD_WAITICON'] = { type: 'bdsp__add_waiticon', args: 0 };
Blockly.Blocks['bdsp__add_waiticon'] = {
  init: function() {
    this.appendDummyInput().appendField('_ADD_WAITICON');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unknown use.");
  }
};
Blockly.JavaScript['bdsp__add_waiticon'] = function(block) {
  var code = '_ADD_WAITICON(';
  code += ')\n';
  return code;
};
commandMap['_ADD_WAZA'] = { type: 'bdsp__add_waza', args: 0 };
Blockly.Blocks['bdsp__add_waza'] = {
  init: function() {
    this.appendDummyInput().appendField('_ADD_WAZA');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__add_waza'] = function(block) {
  var code = '_ADD_WAZA(';
  code += ')\n';
  return code;
};
commandMap['_ADD_WK'] = { type: 'bdsp__add_wk', args: 2 };
Blockly.Blocks['bdsp__add_wk'] = {
  init: function() {
    this.appendDummyInput().appendField('_ADD_WK');
    this.appendValueInput('ARG_0').appendField('Variable');
    this.appendValueInput('ARG_1').appendField('Value');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Add to the value of a variable.");
  }
};
Blockly.JavaScript['bdsp__add_wk'] = function(block) {
  var code = '_ADD_WK(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_AGB_CARTRIDGE_VER_GET'] = { type: 'bdsp__agb_cartridge_ver_get', args: 0 };
Blockly.Blocks['bdsp__agb_cartridge_ver_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_AGB_CARTRIDGE_VER_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__agb_cartridge_ver_get'] = function(block) {
  var code = '_AGB_CARTRIDGE_VER_GET(';
  code += ')\n';
  return code;
};
commandMap['_AG_TRANSITION_HOYUTA'] = { type: 'bdsp__ag_transition_hoyuta', args: 0 };
Blockly.Blocks['bdsp__ag_transition_hoyuta'] = {
  init: function() {
    this.appendDummyInput().appendField('_AG_TRANSITION_HOYUTA');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__ag_transition_hoyuta'] = function(block) {
  var code = '_AG_TRANSITION_HOYUTA(';
  code += ')\n';
  return code;
};
commandMap['_AIKOTOBA_KABEGAMI_SET'] = { type: 'bdsp__aikotoba_kabegami_set', args: 0 };
Blockly.Blocks['bdsp__aikotoba_kabegami_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_AIKOTOBA_KABEGAMI_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__aikotoba_kabegami_set'] = function(block) {
  var code = '_AIKOTOBA_KABEGAMI_SET(';
  code += ')\n';
  return code;
};
commandMap['_AIKOTOBA_OKURIMONO_CHK'] = { type: 'bdsp__aikotoba_okurimono_chk', args: 0 };
Blockly.Blocks['bdsp__aikotoba_okurimono_chk'] = {
  init: function() {
    this.appendDummyInput().appendField('_AIKOTOBA_OKURIMONO_CHK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__aikotoba_okurimono_chk'] = function(block) {
  var code = '_AIKOTOBA_OKURIMONO_CHK(';
  code += ')\n';
  return code;
};
commandMap['_AK_LISNER_POS'] = { type: 'bdsp__ak_lisner_pos', args: 0 };
Blockly.Blocks['bdsp__ak_lisner_pos'] = {
  init: function() {
    this.appendDummyInput().appendField('_AK_LISNER_POS');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__ak_lisner_pos'] = function(block) {
  var code = '_AK_LISNER_POS(';
  code += ')\n';
  return code;
};
commandMap['_AK_LISNER_ROT'] = { type: 'bdsp__ak_lisner_rot', args: 0 };
Blockly.Blocks['bdsp__ak_lisner_rot'] = {
  init: function() {
    this.appendDummyInput().appendField('_AK_LISNER_ROT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__ak_lisner_rot'] = function(block) {
  var code = '_AK_LISNER_ROT(';
  code += ')\n';
  return code;
};
commandMap['_AK_LISNER_TRA'] = { type: 'bdsp__ak_lisner_tra', args: 0 };
Blockly.Blocks['bdsp__ak_lisner_tra'] = {
  init: function() {
    this.appendDummyInput().appendField('_AK_LISNER_TRA');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__ak_lisner_tra'] = function(block) {
  var code = '_AK_LISNER_TRA(';
  code += ')\n';
  return code;
};
commandMap['_ALL_MONSNO'] = { type: 'bdsp__all_monsno', args: 0 };
Blockly.Blocks['bdsp__all_monsno'] = {
  init: function() {
    this.appendDummyInput().appendField('_ALL_MONSNO');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__all_monsno'] = function(block) {
  var code = '_ALL_MONSNO(';
  code += ')\n';
  return code;
};
commandMap['_ALL_MONS_OWN_CHK'] = { type: 'bdsp__all_mons_own_chk', args: 0 };
Blockly.Blocks['bdsp__all_mons_own_chk'] = {
  init: function() {
    this.appendDummyInput().appendField('_ALL_MONS_OWN_CHK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__all_mons_own_chk'] = function(block) {
  var code = '_ALL_MONS_OWN_CHK(';
  code += ')\n';
  return code;
};
commandMap['_AMAIKAORI'] = { type: 'bdsp__amaikaori', args: 0 };
Blockly.Blocks['bdsp__amaikaori'] = {
  init: function() {
    this.appendDummyInput().appendField('_AMAIKAORI');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__amaikaori'] = function(block) {
  var code = '_AMAIKAORI(';
  code += ')\n';
  return code;
};
commandMap['_AMAIMITU'] = { type: 'bdsp__amaimitu', args: 0 };
Blockly.Blocks['bdsp__amaimitu'] = {
  init: function() {
    this.appendDummyInput().appendField('_AMAIMITU');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__amaimitu'] = function(block) {
  var code = '_AMAIMITU(';
  code += ')\n';
  return code;
};
commandMap['_ANANUKENOHIMO'] = { type: 'bdsp__ananukenohimo', args: 0 };
Blockly.Blocks['bdsp__ananukenohimo'] = {
  init: function() {
    this.appendDummyInput().appendField('_ANANUKENOHIMO');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__ananukenohimo'] = function(block) {
  var code = '_ANANUKENOHIMO(';
  code += ')\n';
  return code;
};
commandMap['_ANAWOHORU'] = { type: 'bdsp__anawohoru', args: 0 };
Blockly.Blocks['bdsp__anawohoru'] = {
  init: function() {
    this.appendDummyInput().appendField('_ANAWOHORU');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__anawohoru'] = function(block) {
  var code = '_ANAWOHORU(';
  code += ')\n';
  return code;
};
commandMap['_ANIME_DATA'] = { type: 'bdsp__anime_data', args: 3 };
Blockly.Blocks['bdsp__anime_data'] = {
  init: function() {
    this.appendDummyInput().appendField('_ANIME_DATA');
    this.appendValueInput('ARG_0').appendField('Command');
    this.appendValueInput('ARG_1').appendField('Arg1');
    this.appendValueInput('ARG_2').appendField('Arg2');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("(?) Executes an animation command without needing a separate script.");
  }
};
Blockly.JavaScript['bdsp__anime_data'] = function(block) {
  var code = '_ANIME_DATA(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_ANIME_LABEL'] = { type: 'bdsp__anime_label', args: 0 };
Blockly.Blocks['bdsp__anime_label'] = {
  init: function() {
    this.appendDummyInput().appendField('_ANIME_LABEL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__anime_label'] = function(block) {
  var code = '_ANIME_LABEL(';
  code += ')\n';
  return code;
};
commandMap['_ANOON_SEE_NUM'] = { type: 'bdsp__anoon_see_num', args: 0 };
Blockly.Blocks['bdsp__anoon_see_num'] = {
  init: function() {
    this.appendDummyInput().appendField('_ANOON_SEE_NUM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__anoon_see_num'] = function(block) {
  var code = '_ANOON_SEE_NUM(';
  code += ')\n';
  return code;
};
commandMap['_APPROVE_POISON_DEAD'] = { type: 'bdsp__approve_poison_dead', args: 0 };
Blockly.Blocks['bdsp__approve_poison_dead'] = {
  init: function() {
    this.appendDummyInput().appendField('_APPROVE_POISON_DEAD');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unknown use. Only used once in unused poison scripts.");
  }
};
Blockly.JavaScript['bdsp__approve_poison_dead'] = function(block) {
  var code = '_APPROVE_POISON_DEAD(';
  code += ')\n';
  return code;
};
commandMap['_ARRIVE_FLAG_SET'] = { type: 'bdsp__arrive_flag_set', args: 1 };
Blockly.Blocks['bdsp__arrive_flag_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_ARRIVE_FLAG_SET');
    this.appendValueInput('ARG_0').appendField('Flag');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("(?) Sets location flag.");
  }
};
Blockly.JavaScript['bdsp__arrive_flag_set'] = function(block) {
  var code = '_ARRIVE_FLAG_SET(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_ASHIATO_CHK'] = { type: 'bdsp__ashiato_chk', args: 0 };
Blockly.Blocks['bdsp__ashiato_chk'] = {
  init: function() {
    this.appendDummyInput().appendField('_ASHIATO_CHK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__ashiato_chk'] = function(block) {
  var code = '_ASHIATO_CHK(';
  code += ')\n';
  return code;
};
commandMap['_AUSU_ITEM_CHECK'] = { type: 'bdsp__ausu_item_check', args: 0 };
Blockly.Blocks['bdsp__ausu_item_check'] = {
  init: function() {
    this.appendDummyInput().appendField('_AUSU_ITEM_CHECK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__ausu_item_check'] = function(block) {
  var code = '_AUSU_ITEM_CHECK(';
  code += ')\n';
  return code;
};
commandMap['_AUTO_MSG'] = { type: 'bdsp__auto_msg', args: 0 };
Blockly.Blocks['bdsp__auto_msg'] = {
  init: function() {
    this.appendDummyInput().appendField('_AUTO_MSG');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__auto_msg'] = function(block) {
  var code = '_AUTO_MSG(';
  code += ')\n';
  return code;
};
commandMap['_AUTO_MSG_STOP'] = { type: 'bdsp__auto_msg_stop', args: 0 };
Blockly.Blocks['bdsp__auto_msg_stop'] = {
  init: function() {
    this.appendDummyInput().appendField('_AUTO_MSG_STOP');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__auto_msg_stop'] = function(block) {
  var code = '_AUTO_MSG_STOP(';
  code += ')\n';
  return code;
};
commandMap['_AUTO_SAVE'] = { type: 'bdsp__auto_save', args: 0 };
Blockly.Blocks['bdsp__auto_save'] = {
  init: function() {
    this.appendDummyInput().appendField('_AUTO_SAVE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__auto_save'] = function(block) {
  var code = '_AUTO_SAVE(';
  code += ')\n';
  return code;
};
commandMap['_AUTO_SAVE_BACK_UP_ON'] = { type: 'bdsp__auto_save_back_up_on', args: 0 };
Blockly.Blocks['bdsp__auto_save_back_up_on'] = {
  init: function() {
    this.appendDummyInput().appendField('_AUTO_SAVE_BACK_UP_ON');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__auto_save_back_up_on'] = function(block) {
  var code = '_AUTO_SAVE_BACK_UP_ON(';
  code += ')\n';
  return code;
};
commandMap['_AUTO_TANKEN_SET'] = { type: 'bdsp__auto_tanken_set', args: 0 };
Blockly.Blocks['bdsp__auto_tanken_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_AUTO_TANKEN_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__auto_tanken_set'] = function(block) {
  var code = '_AUTO_TANKEN_SET(';
  code += ')\n';
  return code;
};
commandMap['_AUTO_TANKEN_SET_WAIT'] = { type: 'bdsp__auto_tanken_set_wait', args: 0 };
Blockly.Blocks['bdsp__auto_tanken_set_wait'] = {
  init: function() {
    this.appendDummyInput().appendField('_AUTO_TANKEN_SET_WAIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__auto_tanken_set_wait'] = function(block) {
  var code = '_AUTO_TANKEN_SET_WAIT(';
  code += ')\n';
  return code;
};
commandMap['_AZUKARIYA_DISCARD_EGG'] = { type: 'bdsp__azukariya_discard_egg', args: 0 };
Blockly.Blocks['bdsp__azukariya_discard_egg'] = {
  init: function() {
    this.appendDummyInput().appendField('_AZUKARIYA_DISCARD_EGG');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__azukariya_discard_egg'] = function(block) {
  var code = '_AZUKARIYA_DISCARD_EGG(';
  code += ')\n';
  return code;
};
commandMap['_AZUKARIYA_EXIST_EGG'] = { type: 'bdsp__azukariya_exist_egg', args: 0 };
Blockly.Blocks['bdsp__azukariya_exist_egg'] = {
  init: function() {
    this.appendDummyInput().appendField('_AZUKARIYA_EXIST_EGG');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__azukariya_exist_egg'] = function(block) {
  var code = '_AZUKARIYA_EXIST_EGG(';
  code += ')\n';
  return code;
};
commandMap['_AZUKARIYA_GET_EGG'] = { type: 'bdsp__azukariya_get_egg', args: 0 };
Blockly.Blocks['bdsp__azukariya_get_egg'] = {
  init: function() {
    this.appendDummyInput().appendField('_AZUKARIYA_GET_EGG');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__azukariya_get_egg'] = function(block) {
  var code = '_AZUKARIYA_GET_EGG(';
  code += ')\n';
  return code;
};
commandMap['_AZUKARIYA_GET_STORED_MONSNO'] = { type: 'bdsp__azukariya_get_stored_monsno', args: 0 };
Blockly.Blocks['bdsp__azukariya_get_stored_monsno'] = {
  init: function() {
    this.appendDummyInput().appendField('_AZUKARIYA_GET_STORED_MONSNO');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__azukariya_get_stored_monsno'] = function(block) {
  var code = '_AZUKARIYA_GET_STORED_MONSNO(';
  code += ')\n';
  return code;
};
commandMap['_AZUKARIYA_GET_STORED_SEX'] = { type: 'bdsp__azukariya_get_stored_sex', args: 0 };
Blockly.Blocks['bdsp__azukariya_get_stored_sex'] = {
  init: function() {
    this.appendDummyInput().appendField('_AZUKARIYA_GET_STORED_SEX');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__azukariya_get_stored_sex'] = function(block) {
  var code = '_AZUKARIYA_GET_STORED_SEX(';
  code += ')\n';
  return code;
};
commandMap['_AZUKARIYA_LOVE_LEVEL'] = { type: 'bdsp__azukariya_love_level', args: 0 };
Blockly.Blocks['bdsp__azukariya_love_level'] = {
  init: function() {
    this.appendDummyInput().appendField('_AZUKARIYA_LOVE_LEVEL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__azukariya_love_level'] = function(block) {
  var code = '_AZUKARIYA_LOVE_LEVEL(';
  code += ')\n';
  return code;
};
commandMap['_AZUKARIYA_OLDMAN_INIT'] = { type: 'bdsp__azukariya_oldman_init', args: 0 };
Blockly.Blocks['bdsp__azukariya_oldman_init'] = {
  init: function() {
    this.appendDummyInput().appendField('_AZUKARIYA_OLDMAN_INIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__azukariya_oldman_init'] = function(block) {
  var code = '_AZUKARIYA_OLDMAN_INIT(';
  code += ')\n';
  return code;
};
commandMap['_AZUKARIYA_RESTORE'] = { type: 'bdsp__azukariya_restore', args: 0 };
Blockly.Blocks['bdsp__azukariya_restore'] = {
  init: function() {
    this.appendDummyInput().appendField('_AZUKARIYA_RESTORE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__azukariya_restore'] = function(block) {
  var code = '_AZUKARIYA_RESTORE(';
  code += ')\n';
  return code;
};
commandMap['_AZUKARIYA_SET_STORED_INFO_STR'] = { type: 'bdsp__azukariya_set_stored_info_str', args: 0 };
Blockly.Blocks['bdsp__azukariya_set_stored_info_str'] = {
  init: function() {
    this.appendDummyInput().appendField('_AZUKARIYA_SET_STORED_INFO_STR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__azukariya_set_stored_info_str'] = function(block) {
  var code = '_AZUKARIYA_SET_STORED_INFO_STR(';
  code += ')\n';
  return code;
};
commandMap['_AZUKARIYA_SET_STORED_NAME'] = { type: 'bdsp__azukariya_set_stored_name', args: 0 };
Blockly.Blocks['bdsp__azukariya_set_stored_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_AZUKARIYA_SET_STORED_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__azukariya_set_stored_name'] = function(block) {
  var code = '_AZUKARIYA_SET_STORED_NAME(';
  code += ')\n';
  return code;
};
commandMap['_AZUKARIYA_STORE'] = { type: 'bdsp__azukariya_store', args: 0 };
Blockly.Blocks['bdsp__azukariya_store'] = {
  init: function() {
    this.appendDummyInput().appendField('_AZUKARIYA_STORE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__azukariya_store'] = function(block) {
  var code = '_AZUKARIYA_STORE(';
  code += ')\n';
  return code;
};
commandMap['_AZUKARIYA_STORED_COUNT'] = { type: 'bdsp__azukariya_stored_count', args: 0 };
Blockly.Blocks['bdsp__azukariya_stored_count'] = {
  init: function() {
    this.appendDummyInput().appendField('_AZUKARIYA_STORED_COUNT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__azukariya_stored_count'] = function(block) {
  var code = '_AZUKARIYA_STORED_COUNT(';
  code += ')\n';
  return code;
};
commandMap['_AZUKARIYA_STORE_UI'] = { type: 'bdsp__azukariya_store_ui', args: 0 };
Blockly.Blocks['bdsp__azukariya_store_ui'] = {
  init: function() {
    this.appendDummyInput().appendField('_AZUKARIYA_STORE_UI');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__azukariya_store_ui'] = function(block) {
  var code = '_AZUKARIYA_STORE_UI(';
  code += ')\n';
  return code;
};
commandMap['_AZUKARIYA_TAKE_OVER_POKE'] = { type: 'bdsp__azukariya_take_over_poke', args: 0 };
Blockly.Blocks['bdsp__azukariya_take_over_poke'] = {
  init: function() {
    this.appendDummyInput().appendField('_AZUKARIYA_TAKE_OVER_POKE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__azukariya_take_over_poke'] = function(block) {
  var code = '_AZUKARIYA_TAKE_OVER_POKE(';
  code += ')\n';
  return code;
};
commandMap['_BADGE_GET'] = { type: 'bdsp__badge_get', args: 0 };
Blockly.Blocks['bdsp__badge_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_BADGE_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__badge_get'] = function(block) {
  var code = '_BADGE_GET(';
  code += ')\n';
  return code;
};
commandMap['_BAG_GET_RESULT'] = { type: 'bdsp__bag_get_result', args: 1 };
Blockly.Blocks['bdsp__bag_get_result'] = {
  init: function() {
    this.appendDummyInput().appendField('_BAG_GET_RESULT');
    this.appendValueInput('ARG_0').appendField('Result');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Puts the chosen item in the bag into a variable.");
  }
};
Blockly.JavaScript['bdsp__bag_get_result'] = function(block) {
  var code = '_BAG_GET_RESULT(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_BAG_SET_PROC_KINOMI'] = { type: 'bdsp__bag_set_proc_kinomi', args: 0 };
Blockly.Blocks['bdsp__bag_set_proc_kinomi'] = {
  init: function() {
    this.appendDummyInput().appendField('_BAG_SET_PROC_KINOMI');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Opens the bag menu in Berry mode.");
  }
};
Blockly.JavaScript['bdsp__bag_set_proc_kinomi'] = function(block) {
  var code = '_BAG_SET_PROC_KINOMI(';
  code += ')\n';
  return code;
};
commandMap['_BAG_SET_PROC_NORMAL'] = { type: 'bdsp__bag_set_proc_normal', args: 0 };
Blockly.Blocks['bdsp__bag_set_proc_normal'] = {
  init: function() {
    this.appendDummyInput().appendField('_BAG_SET_PROC_NORMAL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__bag_set_proc_normal'] = function(block) {
  var code = '_BAG_SET_PROC_NORMAL(';
  code += ')\n';
  return code;
};
commandMap['_BGM_FADEIN'] = { type: 'bdsp__bgm_fadein', args: 1 };
Blockly.Blocks['bdsp__bgm_fadein'] = {
  init: function() {
    this.appendDummyInput().appendField('_BGM_FADEIN');
    this.appendValueInput('ARG_0').appendField('Unknown');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Only used once in an unused script.");
  }
};
Blockly.JavaScript['bdsp__bgm_fadein'] = function(block) {
  var code = '_BGM_FADEIN(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_BGM_FADEOUT'] = { type: 'bdsp__bgm_fadeout', args: 2 };
Blockly.Blocks['bdsp__bgm_fadeout'] = {
  init: function() {
    this.appendDummyInput().appendField('_BGM_FADEOUT');
    this.appendValueInput('ARG_0').appendField('Volume');
    this.appendValueInput('ARG_1').appendField('Unknown');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Fades the background music out to the specified volume.");
  }
};
Blockly.JavaScript['bdsp__bgm_fadeout'] = function(block) {
  var code = '_BGM_FADEOUT(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_BGM_FADEOUT_PLAY'] = { type: 'bdsp__bgm_fadeout_play', args: 0 };
Blockly.Blocks['bdsp__bgm_fadeout_play'] = {
  init: function() {
    this.appendDummyInput().appendField('_BGM_FADEOUT_PLAY');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__bgm_fadeout_play'] = function(block) {
  var code = '_BGM_FADEOUT_PLAY(';
  code += ')\n';
  return code;
};
commandMap['_BGM_NOW_MAP_PLAY'] = { type: 'bdsp__bgm_now_map_play', args: 0 };
Blockly.Blocks['bdsp__bgm_now_map_play'] = {
  init: function() {
    this.appendDummyInput().appendField('_BGM_NOW_MAP_PLAY');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Plays the background music associated with the current map.");
  }
};
Blockly.JavaScript['bdsp__bgm_now_map_play'] = function(block) {
  var code = '_BGM_NOW_MAP_PLAY(';
  code += ')\n';
  return code;
};
commandMap['_BGM_PLAY'] = { type: 'bdsp__bgm_play', args: 1 };
Blockly.Blocks['bdsp__bgm_play'] = {
  init: function() {
    this.appendDummyInput().appendField('_BGM_PLAY');
    this.appendValueInput('ARG_0').appendField('BGM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Overrides the background music completely until _BGM_NOW_MAP_PLAY is called.");
  }
};
Blockly.JavaScript['bdsp__bgm_play'] = function(block) {
  var code = '_BGM_PLAY(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_BGM_PLAYER_PAUSE'] = { type: 'bdsp__bgm_player_pause', args: 0 };
Blockly.Blocks['bdsp__bgm_player_pause'] = {
  init: function() {
    this.appendDummyInput().appendField('_BGM_PLAYER_PAUSE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__bgm_player_pause'] = function(block) {
  var code = '_BGM_PLAYER_PAUSE(';
  code += ')\n';
  return code;
};
commandMap['_BGM_PLAY_CHECK'] = { type: 'bdsp__bgm_play_check', args: 0 };
Blockly.Blocks['bdsp__bgm_play_check'] = {
  init: function() {
    this.appendDummyInput().appendField('_BGM_PLAY_CHECK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__bgm_play_check'] = function(block) {
  var code = '_BGM_PLAY_CHECK(';
  code += ')\n';
  return code;
};
commandMap['_BGM_SPECIAL_CLR'] = { type: 'bdsp__bgm_special_clr', args: 0 };
Blockly.Blocks['bdsp__bgm_special_clr'] = {
  init: function() {
    this.appendDummyInput().appendField('_BGM_SPECIAL_CLR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__bgm_special_clr'] = function(block) {
  var code = '_BGM_SPECIAL_CLR(';
  code += ')\n';
  return code;
};
commandMap['_BGM_SPECIAL_SET'] = { type: 'bdsp__bgm_special_set', args: 1 };
Blockly.Blocks['bdsp__bgm_special_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_BGM_SPECIAL_SET');
    this.appendValueInput('ARG_0').appendField('Unknown');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unknown use. Only used 4 times in the game.");
  }
};
Blockly.JavaScript['bdsp__bgm_special_set'] = function(block) {
  var code = '_BGM_SPECIAL_SET(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_BGM_STOP'] = { type: 'bdsp__bgm_stop', args: 0 };
Blockly.Blocks['bdsp__bgm_stop'] = {
  init: function() {
    this.appendDummyInput().appendField('_BGM_STOP');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused. Presumably stops the currently playing background music.");
  }
};
Blockly.JavaScript['bdsp__bgm_stop'] = function(block) {
  var code = '_BGM_STOP(';
  code += ')\n';
  return code;
};
commandMap['_BG_ID_JUMP'] = { type: 'bdsp__bg_id_jump', args: 0 };
Blockly.Blocks['bdsp__bg_id_jump'] = {
  init: function() {
    this.appendDummyInput().appendField('_BG_ID_JUMP');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__bg_id_jump'] = function(block) {
  var code = '_BG_ID_JUMP(';
  code += ')\n';
  return code;
};
commandMap['_BG_SCROLL'] = { type: 'bdsp__bg_scroll', args: 0 };
Blockly.Blocks['bdsp__bg_scroll'] = {
  init: function() {
    this.appendDummyInput().appendField('_BG_SCROLL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__bg_scroll'] = function(block) {
  var code = '_BG_SCROLL(';
  code += ')\n';
  return code;
};
commandMap['_BICYCLE_CHECK'] = { type: 'bdsp__bicycle_check', args: 0 };
Blockly.Blocks['bdsp__bicycle_check'] = {
  init: function() {
    this.appendDummyInput().appendField('_BICYCLE_CHECK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__bicycle_check'] = function(block) {
  var code = '_BICYCLE_CHECK(';
  code += ')\n';
  return code;
};
commandMap['_BICYCLE_COLOR_GET'] = { type: 'bdsp__bicycle_color_get', args: 0 };
Blockly.Blocks['bdsp__bicycle_color_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_BICYCLE_COLOR_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__bicycle_color_get'] = function(block) {
  var code = '_BICYCLE_COLOR_GET(';
  code += ')\n';
  return code;
};
commandMap['_BICYCLE_COLOR_SET'] = { type: 'bdsp__bicycle_color_set', args: 0 };
Blockly.Blocks['bdsp__bicycle_color_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_BICYCLE_COLOR_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__bicycle_color_set'] = function(block) {
  var code = '_BICYCLE_COLOR_SET(';
  code += ')\n';
  return code;
};
commandMap['_BICYCLE_REQ'] = { type: 'bdsp__bicycle_req', args: 0 };
Blockly.Blocks['bdsp__bicycle_req'] = {
  init: function() {
    this.appendDummyInput().appendField('_BICYCLE_REQ');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__bicycle_req'] = function(block) {
  var code = '_BICYCLE_REQ(';
  code += ')\n';
  return code;
};
commandMap['_BICYCLE_REQ_NON_BGM'] = { type: 'bdsp__bicycle_req_non_bgm', args: 0 };
Blockly.Blocks['bdsp__bicycle_req_non_bgm'] = {
  init: function() {
    this.appendDummyInput().appendField('_BICYCLE_REQ_NON_BGM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__bicycle_req_non_bgm'] = function(block) {
  var code = '_BICYCLE_REQ_NON_BGM(';
  code += ')\n';
  return code;
};
commandMap['_BIRTH_DAY_CHECK'] = { type: 'bdsp__birth_day_check', args: 0 };
Blockly.Blocks['bdsp__birth_day_check'] = {
  init: function() {
    this.appendDummyInput().appendField('_BIRTH_DAY_CHECK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__birth_day_check'] = function(block) {
  var code = '_BIRTH_DAY_CHECK(';
  code += ')\n';
  return code;
};
commandMap['_BIRTH_DAY_INPUT'] = { type: 'bdsp__birth_day_input', args: 0 };
Blockly.Blocks['bdsp__birth_day_input'] = {
  init: function() {
    this.appendDummyInput().appendField('_BIRTH_DAY_INPUT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__birth_day_input'] = function(block) {
  var code = '_BIRTH_DAY_INPUT(';
  code += ')\n';
  return code;
};
commandMap['_BIRTH_MOUNTH_INPUT'] = { type: 'bdsp__birth_mounth_input', args: 0 };
Blockly.Blocks['bdsp__birth_mounth_input'] = {
  init: function() {
    this.appendDummyInput().appendField('_BIRTH_MOUNTH_INPUT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__birth_mounth_input'] = function(block) {
  var code = '_BIRTH_MOUNTH_INPUT(';
  code += ')\n';
  return code;
};
commandMap['_BLACK_IN'] = { type: 'bdsp__black_in', args: 2 };
Blockly.Blocks['bdsp__black_in'] = {
  init: function() {
    this.appendDummyInput().appendField('_BLACK_IN');
    this.appendValueInput('ARG_0').appendField('Unknown1');
    this.appendValueInput('ARG_1').appendField('Unknown2');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Fades the screen back in from black.");
  }
};
Blockly.JavaScript['bdsp__black_in'] = function(block) {
  var code = '_BLACK_IN(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_BLACK_OUT'] = { type: 'bdsp__black_out', args: 2 };
Blockly.Blocks['bdsp__black_out'] = {
  init: function() {
    this.appendDummyInput().appendField('_BLACK_OUT');
    this.appendValueInput('ARG_0').appendField('Unknown1');
    this.appendValueInput('ARG_1').appendField('Unknown2');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Fades the screen into black.");
  }
};
Blockly.JavaScript['bdsp__black_out'] = function(block) {
  var code = '_BLACK_OUT(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_BMPLIST_INIT'] = { type: 'bdsp__bmplist_init', args: 5 };
Blockly.Blocks['bdsp__bmplist_init'] = {
  init: function() {
    this.appendDummyInput().appendField('_BMPLIST_INIT');
    this.appendValueInput('ARG_0').appendField('Unknown1');
    this.appendValueInput('ARG_1').appendField('Unknown2');
    this.appendValueInput('ARG_2').appendField('Unknown3');
    this.appendValueInput('ARG_3').appendField('Unknown4');
    this.appendValueInput('ARG_4').appendField('Unknown5');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("(?) Initializes an unused exchange menu.");
  }
};
Blockly.JavaScript['bdsp__bmplist_init'] = function(block) {
  var code = '_BMPLIST_INIT(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_3', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_4', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_BMPLIST_INIT_EX'] = { type: 'bdsp__bmplist_init_ex', args: 0 };
Blockly.Blocks['bdsp__bmplist_init_ex'] = {
  init: function() {
    this.appendDummyInput().appendField('_BMPLIST_INIT_EX');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__bmplist_init_ex'] = function(block) {
  var code = '_BMPLIST_INIT_EX(';
  code += ')\n';
  return code;
};
commandMap['_BMPLIST_MAKE_LIST'] = { type: 'bdsp__bmplist_make_list', args: 3 };
Blockly.Blocks['bdsp__bmplist_make_list'] = {
  init: function() {
    this.appendDummyInput().appendField('_BMPLIST_MAKE_LIST');
    this.appendValueInput('ARG_0').appendField('Option');
    this.appendValueInput('ARG_1').appendField('Unknown1');
    this.appendValueInput('ARG_2').appendField('Unknown2');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("(?) Adds an option to the unused choice menu previously initialized by _BMPLIST_INIT.");
  }
};
Blockly.JavaScript['bdsp__bmplist_make_list'] = function(block) {
  var code = '_BMPLIST_MAKE_LIST(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_BMPLIST_START'] = { type: 'bdsp__bmplist_start', args: 0 };
Blockly.Blocks['bdsp__bmplist_start'] = {
  init: function() {
    this.appendDummyInput().appendField('_BMPLIST_START');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("(?) Shows the unused choice menu previously initialized by _BMPLIST_INIT.");
  }
};
Blockly.JavaScript['bdsp__bmplist_start'] = function(block) {
  var code = '_BMPLIST_START(';
  code += ')\n';
  return code;
};
commandMap['_BMPMENU_HV_START'] = { type: 'bdsp__bmpmenu_hv_start', args: 0 };
Blockly.Blocks['bdsp__bmpmenu_hv_start'] = {
  init: function() {
    this.appendDummyInput().appendField('_BMPMENU_HV_START');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__bmpmenu_hv_start'] = function(block) {
  var code = '_BMPMENU_HV_START(';
  code += ')\n';
  return code;
};
commandMap['_BMPMENU_INIT'] = { type: 'bdsp__bmpmenu_init', args: 5 };
Blockly.Blocks['bdsp__bmpmenu_init'] = {
  init: function() {
    this.appendDummyInput().appendField('_BMPMENU_INIT');
    this.appendValueInput('ARG_0').appendField('Unknown1');
    this.appendValueInput('ARG_1').appendField('Unknown2');
    this.appendValueInput('ARG_2').appendField('Unknown3');
    this.appendValueInput('ARG_3').appendField('Unknown4');
    this.appendValueInput('ARG_4').appendField('Unknown5');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("(?) Initializes an unused choice menu.");
  }
};
Blockly.JavaScript['bdsp__bmpmenu_init'] = function(block) {
  var code = '_BMPMENU_INIT(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_3', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_4', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_BMPMENU_INIT_EX'] = { type: 'bdsp__bmpmenu_init_ex', args: 5 };
Blockly.Blocks['bdsp__bmpmenu_init_ex'] = {
  init: function() {
    this.appendDummyInput().appendField('_BMPMENU_INIT_EX');
    this.appendValueInput('ARG_0').appendField('Unknown1');
    this.appendValueInput('ARG_1').appendField('Unknown2');
    this.appendValueInput('ARG_2').appendField('Unknown3');
    this.appendValueInput('ARG_3').appendField('Unknown4');
    this.appendValueInput('ARG_4').appendField('Unknown5');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("(?) Initializes an unused choice menu.");
  }
};
Blockly.JavaScript['bdsp__bmpmenu_init_ex'] = function(block) {
  var code = '_BMPMENU_INIT_EX(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_3', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_4', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_BMPMENU_MAKE_LIST'] = { type: 'bdsp__bmpmenu_make_list', args: 1 };
Blockly.Blocks['bdsp__bmpmenu_make_list'] = {
  init: function() {
    this.appendDummyInput().appendField('_BMPMENU_MAKE_LIST');
    this.appendValueInput('ARG_0').appendField('Option');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("(?) Adds an option to the unused choice menu previously initialized by _BMPMENU_INIT or _BMPMENU_INIT_EX.");
  }
};
Blockly.JavaScript['bdsp__bmpmenu_make_list'] = function(block) {
  var code = '_BMPMENU_MAKE_LIST(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_BMPMENU_MAKE_LIST16'] = { type: 'bdsp__bmpmenu_make_list16', args: 0 };
Blockly.Blocks['bdsp__bmpmenu_make_list16'] = {
  init: function() {
    this.appendDummyInput().appendField('_BMPMENU_MAKE_LIST16');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__bmpmenu_make_list16'] = function(block) {
  var code = '_BMPMENU_MAKE_LIST16(';
  code += ')\n';
  return code;
};
commandMap['_BMPMENU_START'] = { type: 'bdsp__bmpmenu_start', args: 0 };
Blockly.Blocks['bdsp__bmpmenu_start'] = {
  init: function() {
    this.appendDummyInput().appendField('_BMPMENU_START');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("(?) Shows the unused choice menu previously initialized by _BMPMENU_INIT or _BMPMENU_INIT_EX.");
  }
};
Blockly.JavaScript['bdsp__bmpmenu_start'] = function(block) {
  var code = '_BMPMENU_START(';
  code += ')\n';
  return code;
};
commandMap['_BOARD_END_WAIT'] = { type: 'bdsp__board_end_wait', args: 1 };
Blockly.Blocks['bdsp__board_end_wait'] = {
  init: function() {
    this.appendDummyInput().appendField('_BOARD_END_WAIT');
    this.appendValueInput('ARG_0').appendField('Unknown');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("(?) Waits until the board is closed, then puts a value in a variable. Functionally the same as _BOARD_MSG.");
  }
};
Blockly.JavaScript['bdsp__board_end_wait'] = function(block) {
  var code = '_BOARD_END_WAIT(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_BOARD_MAKE'] = { type: 'bdsp__board_make', args: 0 };
Blockly.Blocks['bdsp__board_make'] = {
  init: function() {
    this.appendDummyInput().appendField('_BOARD_MAKE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__board_make'] = function(block) {
  var code = '_BOARD_MAKE(';
  code += ')\n';
  return code;
};
commandMap['_BOARD_MSG'] = { type: 'bdsp__board_msg', args: 0 };
Blockly.Blocks['bdsp__board_msg'] = {
  init: function() {
    this.appendDummyInput().appendField('_BOARD_MSG');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__board_msg'] = function(block) {
  var code = '_BOARD_MSG(';
  code += ')\n';
  return code;
};
commandMap['_BOARD_REQ'] = { type: 'bdsp__board_req', args: 1 };
Blockly.Blocks['bdsp__board_req'] = {
  init: function() {
    this.appendDummyInput().appendField('_BOARD_REQ');
    this.appendValueInput('ARG_0').appendField('Request');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("(?) Makes a board request.");
  }
};
Blockly.JavaScript['bdsp__board_req'] = function(block) {
  var code = '_BOARD_REQ(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_BOARD_REQ_WAIT'] = { type: 'bdsp__board_req_wait', args: 0 };
Blockly.Blocks['bdsp__board_req_wait'] = {
  init: function() {
    this.appendDummyInput().appendField('_BOARD_REQ_WAIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("(?) Waits on a board request made previously with command _BOARD_REQ.");
  }
};
Blockly.JavaScript['bdsp__board_req_wait'] = function(block) {
  var code = '_BOARD_REQ_WAIT(';
  code += ')\n';
  return code;
};
commandMap['_BOUKENNOOTO_TIPS_OPEN'] = { type: 'bdsp__boukennooto_tips_open', args: 0 };
Blockly.Blocks['bdsp__boukennooto_tips_open'] = {
  init: function() {
    this.appendDummyInput().appendField('_BOUKENNOOTO_TIPS_OPEN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__boukennooto_tips_open'] = function(block) {
  var code = '_BOUKENNOOTO_TIPS_OPEN(';
  code += ')\n';
  return code;
};
commandMap['_BOUKENNOOTO_TIPS_WAIT'] = { type: 'bdsp__boukennooto_tips_wait', args: 0 };
Blockly.Blocks['bdsp__boukennooto_tips_wait'] = {
  init: function() {
    this.appendDummyInput().appendField('_BOUKENNOOTO_TIPS_WAIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__boukennooto_tips_wait'] = function(block) {
  var code = '_BOUKENNOOTO_TIPS_WAIT(';
  code += ')\n';
  return code;
};
commandMap['_BOX_OPEN_NORMAL'] = { type: 'bdsp__box_open_normal', args: 0 };
Blockly.Blocks['bdsp__box_open_normal'] = {
  init: function() {
    this.appendDummyInput().appendField('_BOX_OPEN_NORMAL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__box_open_normal'] = function(block) {
  var code = '_BOX_OPEN_NORMAL(';
  code += ')\n';
  return code;
};
commandMap['_BOX_OPEN_SELECT'] = { type: 'bdsp__box_open_select', args: 0 };
Blockly.Blocks['bdsp__box_open_select'] = {
  init: function() {
    this.appendDummyInput().appendField('_BOX_OPEN_SELECT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__box_open_select'] = function(block) {
  var code = '_BOX_OPEN_SELECT(';
  code += ')\n';
  return code;
};
commandMap['_BOX_SEAL_UI_WAIT'] = { type: 'bdsp__box_seal_ui_wait', args: 0 };
Blockly.Blocks['bdsp__box_seal_ui_wait'] = {
  init: function() {
    this.appendDummyInput().appendField('_BOX_SEAL_UI_WAIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__box_seal_ui_wait'] = function(block) {
  var code = '_BOX_SEAL_UI_WAIT(';
  code += ')\n';
  return code;
};
commandMap['_BOX_SET_PROC'] = { type: 'bdsp__box_set_proc', args: 0 };
Blockly.Blocks['bdsp__box_set_proc'] = {
  init: function() {
    this.appendDummyInput().appendField('_BOX_SET_PROC');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Opens the boxes menu.");
  }
};
Blockly.JavaScript['bdsp__box_set_proc'] = function(block) {
  var code = '_BOX_SET_PROC(';
  code += ')\n';
  return code;
};
commandMap['_BTL_ENCSEQ_LOAD'] = { type: 'bdsp__btl_encseq_load', args: 0 };
Blockly.Blocks['bdsp__btl_encseq_load'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTL_ENCSEQ_LOAD');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btl_encseq_load'] = function(block) {
  var code = '_BTL_ENCSEQ_LOAD(';
  code += ')\n';
  return code;
};
commandMap['_BTL_POINT_ADD'] = { type: 'bdsp__btl_point_add', args: 0 };
Blockly.Blocks['bdsp__btl_point_add'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTL_POINT_ADD');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btl_point_add'] = function(block) {
  var code = '_BTL_POINT_ADD(';
  code += ')\n';
  return code;
};
commandMap['_BTL_POINT_SUB'] = { type: 'bdsp__btl_point_sub', args: 0 };
Blockly.Blocks['bdsp__btl_point_sub'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTL_POINT_SUB');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btl_point_sub'] = function(block) {
  var code = '_BTL_POINT_SUB(';
  code += ')\n';
  return code;
};
commandMap['_BTL_POINT_WIN_DEL'] = { type: 'bdsp__btl_point_win_del', args: 0 };
Blockly.Blocks['bdsp__btl_point_win_del'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTL_POINT_WIN_DEL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btl_point_win_del'] = function(block) {
  var code = '_BTL_POINT_WIN_DEL(';
  code += ')\n';
  return code;
};
commandMap['_BTL_POINT_WIN_WRITE'] = { type: 'bdsp__btl_point_win_write', args: 0 };
Blockly.Blocks['bdsp__btl_point_win_write'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTL_POINT_WIN_WRITE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btl_point_win_write'] = function(block) {
  var code = '_BTL_POINT_WIN_WRITE(';
  code += ')\n';
  return code;
};
commandMap['_BTL_POINT_WRITE'] = { type: 'bdsp__btl_point_write', args: 0 };
Blockly.Blocks['bdsp__btl_point_write'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTL_POINT_WRITE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btl_point_write'] = function(block) {
  var code = '_BTL_POINT_WRITE(';
  code += ')\n';
  return code;
};
commandMap['_BTL_SEARCHER_DIR_MV_SET'] = { type: 'bdsp__btl_searcher_dir_mv_set', args: 0 };
Blockly.Blocks['bdsp__btl_searcher_dir_mv_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTL_SEARCHER_DIR_MV_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unknown use. Something related to the VS Seeker.");
  }
};
Blockly.JavaScript['bdsp__btl_searcher_dir_mv_set'] = function(block) {
  var code = '_BTL_SEARCHER_DIR_MV_SET(';
  code += ')\n';
  return code;
};
commandMap['_BTL_SEARCHER_EVENT_CALL'] = { type: 'bdsp__btl_searcher_event_call', args: 2 };
Blockly.Blocks['bdsp__btl_searcher_event_call'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTL_SEARCHER_EVENT_CALL');
    this.appendValueInput('ARG_0').appendField('Result');
    this.appendValueInput('ARG_1').appendField('Battery');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Checks the battery of the VS Seeker.");
  }
};
Blockly.JavaScript['bdsp__btl_searcher_event_call'] = function(block) {
  var code = '_BTL_SEARCHER_EVENT_CALL(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_BTOWER_APP_CALL'] = { type: 'bdsp__btower_app_call', args: 0 };
Blockly.Blocks['bdsp__btower_app_call'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTOWER_APP_CALL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btower_app_call'] = function(block) {
  var code = '_BTOWER_APP_CALL(';
  code += ')\n';
  return code;
};
commandMap['_BTOWER_APP_WAIT'] = { type: 'bdsp__btower_app_wait', args: 0 };
Blockly.Blocks['bdsp__btower_app_wait'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTOWER_APP_WAIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btower_app_wait'] = function(block) {
  var code = '_BTOWER_APP_WAIT(';
  code += ')\n';
  return code;
};
commandMap['_BTOWER_GET_LEADER_ROOMID'] = { type: 'bdsp__btower_get_leader_roomid', args: 0 };
Blockly.Blocks['bdsp__btower_get_leader_roomid'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTOWER_GET_LEADER_ROOMID');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btower_get_leader_roomid'] = function(block) {
  var code = '_BTOWER_GET_LEADER_ROOMID(';
  code += ')\n';
  return code;
};
commandMap['_BTOWER_IS_LEADER_EXIST'] = { type: 'bdsp__btower_is_leader_exist', args: 0 };
Blockly.Blocks['bdsp__btower_is_leader_exist'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTOWER_IS_LEADER_EXIST');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btower_is_leader_exist'] = function(block) {
  var code = '_BTOWER_IS_LEADER_EXIST(';
  code += ')\n';
  return code;
};
commandMap['_BTOWER_PRIZEMAN_SET'] = { type: 'bdsp__btower_prizeman_set', args: 0 };
Blockly.Blocks['bdsp__btower_prizeman_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTOWER_PRIZEMAN_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btower_prizeman_set'] = function(block) {
  var code = '_BTOWER_PRIZEMAN_SET(';
  code += ')\n';
  return code;
};
commandMap['_BTOWER_PRIZE_GET'] = { type: 'bdsp__btower_prize_get', args: 0 };
Blockly.Blocks['bdsp__btower_prize_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTOWER_PRIZE_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btower_prize_get'] = function(block) {
  var code = '_BTOWER_PRIZE_GET(';
  code += ')\n';
  return code;
};
commandMap['_BTOWER_RECV_BUF'] = { type: 'bdsp__btower_recv_buf', args: 0 };
Blockly.Blocks['bdsp__btower_recv_buf'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTOWER_RECV_BUF');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btower_recv_buf'] = function(block) {
  var code = '_BTOWER_RECV_BUF(';
  code += ')\n';
  return code;
};
commandMap['_BTOWER_SEND_BUF'] = { type: 'bdsp__btower_send_buf', args: 0 };
Blockly.Blocks['bdsp__btower_send_buf'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTOWER_SEND_BUF');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btower_send_buf'] = function(block) {
  var code = '_BTOWER_SEND_BUF(';
  code += ')\n';
  return code;
};
commandMap['_BTOWER_SEVEN_POKE_GET'] = { type: 'bdsp__btower_seven_poke_get', args: 0 };
Blockly.Blocks['bdsp__btower_seven_poke_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTOWER_SEVEN_POKE_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btower_seven_poke_get'] = function(block) {
  var code = '_BTOWER_SEVEN_POKE_GET(';
  code += ')\n';
  return code;
};
commandMap['_BTOWER_TOOLS'] = { type: 'bdsp__btower_tools', args: 0 };
Blockly.Blocks['bdsp__btower_tools'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTOWER_TOOLS');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btower_tools'] = function(block) {
  var code = '_BTOWER_TOOLS(';
  code += ')\n';
  return code;
};
commandMap['_BTOWER_WORK_CLEAR'] = { type: 'bdsp__btower_work_clear', args: 0 };
Blockly.Blocks['bdsp__btower_work_clear'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTOWER_WORK_CLEAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btower_work_clear'] = function(block) {
  var code = '_BTOWER_WORK_CLEAR(';
  code += ')\n';
  return code;
};
commandMap['_BTOWER_WORK_INIT'] = { type: 'bdsp__btower_work_init', args: 0 };
Blockly.Blocks['bdsp__btower_work_init'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTOWER_WORK_INIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btower_work_init'] = function(block) {
  var code = '_BTOWER_WORK_INIT(';
  code += ')\n';
  return code;
};
commandMap['_BTOWER_WORK_RELEASE'] = { type: 'bdsp__btower_work_release', args: 0 };
Blockly.Blocks['bdsp__btower_work_release'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTOWER_WORK_RELEASE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btower_work_release'] = function(block) {
  var code = '_BTOWER_WORK_RELEASE(';
  code += ')\n';
  return code;
};
commandMap['_BTWR_DEB_IS_WORK_NULL'] = { type: 'bdsp__btwr_deb_is_work_null', args: 0 };
Blockly.Blocks['bdsp__btwr_deb_is_work_null'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTWR_DEB_IS_WORK_NULL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btwr_deb_is_work_null'] = function(block) {
  var code = '_BTWR_DEB_IS_WORK_NULL(';
  code += ')\n';
  return code;
};
commandMap['_BTWR_PLAYER_WIN_CHECK'] = { type: 'bdsp__btwr_player_win_check', args: 0 };
Blockly.Blocks['bdsp__btwr_player_win_check'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTWR_PLAYER_WIN_CHECK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btwr_player_win_check'] = function(block) {
  var code = '_BTWR_PLAYER_WIN_CHECK(';
  code += ')\n';
  return code;
};
commandMap['_BTWR_SUB_ADD_BATTLE_POINT'] = { type: 'bdsp__btwr_sub_add_battle_point', args: 0 };
Blockly.Blocks['bdsp__btwr_sub_add_battle_point'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTWR_SUB_ADD_BATTLE_POINT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btwr_sub_add_battle_point'] = function(block) {
  var code = '_BTWR_SUB_ADD_BATTLE_POINT(';
  code += ')\n';
  return code;
};
commandMap['_BTWR_SUB_ADD_BATTLE_POINT_MANUAL'] = { type: 'bdsp__btwr_sub_add_battle_point_manual', args: 0 };
Blockly.Blocks['bdsp__btwr_sub_add_battle_point_manual'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTWR_SUB_ADD_BATTLE_POINT_MANUAL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btwr_sub_add_battle_point_manual'] = function(block) {
  var code = '_BTWR_SUB_ADD_BATTLE_POINT_MANUAL(';
  code += ')\n';
  return code;
};
commandMap['_BTWR_SUB_ADD_LOSE'] = { type: 'bdsp__btwr_sub_add_lose', args: 0 };
Blockly.Blocks['bdsp__btwr_sub_add_lose'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTWR_SUB_ADD_LOSE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btwr_sub_add_lose'] = function(block) {
  var code = '_BTWR_SUB_ADD_LOSE(';
  code += ')\n';
  return code;
};
commandMap['_BTWR_SUB_BTL_TRAINER_SET'] = { type: 'bdsp__btwr_sub_btl_trainer_set', args: 0 };
Blockly.Blocks['bdsp__btwr_sub_btl_trainer_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTWR_SUB_BTL_TRAINER_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btwr_sub_btl_trainer_set'] = function(block) {
  var code = '_BTWR_SUB_BTL_TRAINER_SET(';
  code += ')\n';
  return code;
};
commandMap['_BTWR_SUB_CHK_ENTRY_POKE'] = { type: 'bdsp__btwr_sub_chk_entry_poke', args: 0 };
Blockly.Blocks['bdsp__btwr_sub_chk_entry_poke'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTWR_SUB_CHK_ENTRY_POKE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btwr_sub_chk_entry_poke'] = function(block) {
  var code = '_BTWR_SUB_CHK_ENTRY_POKE(';
  code += ')\n';
  return code;
};
commandMap['_BTWR_SUB_CHOICE_BTL_PARTNER'] = { type: 'bdsp__btwr_sub_choice_btl_partner', args: 0 };
Blockly.Blocks['bdsp__btwr_sub_choice_btl_partner'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTWR_SUB_CHOICE_BTL_PARTNER');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btwr_sub_choice_btl_partner'] = function(block) {
  var code = '_BTWR_SUB_CHOICE_BTL_PARTNER(';
  code += ')\n';
  return code;
};
commandMap['_BTWR_SUB_GET_ENTRY_POKE'] = { type: 'bdsp__btwr_sub_get_entry_poke', args: 0 };
Blockly.Blocks['bdsp__btwr_sub_get_entry_poke'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTWR_SUB_GET_ENTRY_POKE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btwr_sub_get_entry_poke'] = function(block) {
  var code = '_BTWR_SUB_GET_ENTRY_POKE(';
  code += ')\n';
  return code;
};
commandMap['_BTWR_SUB_GET_LEADER_CLEAR_FLAG'] = { type: 'bdsp__btwr_sub_get_leader_clear_flag', args: 0 };
Blockly.Blocks['bdsp__btwr_sub_get_leader_clear_flag'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTWR_SUB_GET_LEADER_CLEAR_FLAG');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btwr_sub_get_leader_clear_flag'] = function(block) {
  var code = '_BTWR_SUB_GET_LEADER_CLEAR_FLAG(';
  code += ')\n';
  return code;
};
commandMap['_BTWR_SUB_GET_MINE_OBJ'] = { type: 'bdsp__btwr_sub_get_mine_obj', args: 0 };
Blockly.Blocks['bdsp__btwr_sub_get_mine_obj'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTWR_SUB_GET_MINE_OBJ');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btwr_sub_get_mine_obj'] = function(block) {
  var code = '_BTWR_SUB_GET_MINE_OBJ(';
  code += ')\n';
  return code;
};
commandMap['_BTWR_SUB_GET_NOW_ROUND'] = { type: 'bdsp__btwr_sub_get_now_round', args: 0 };
Blockly.Blocks['bdsp__btwr_sub_get_now_round'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTWR_SUB_GET_NOW_ROUND');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btwr_sub_get_now_round'] = function(block) {
  var code = '_BTWR_SUB_GET_NOW_ROUND(';
  code += ')\n';
  return code;
};
commandMap['_BTWR_SUB_GET_PLAY_MODE'] = { type: 'bdsp__btwr_sub_get_play_mode', args: 0 };
Blockly.Blocks['bdsp__btwr_sub_get_play_mode'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTWR_SUB_GET_PLAY_MODE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btwr_sub_get_play_mode'] = function(block) {
  var code = '_BTWR_SUB_GET_PLAY_MODE(';
  code += ')\n';
  return code;
};
commandMap['_BTWR_SUB_GET_RANK'] = { type: 'bdsp__btwr_sub_get_rank', args: 0 };
Blockly.Blocks['bdsp__btwr_sub_get_rank'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTWR_SUB_GET_RANK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btwr_sub_get_rank'] = function(block) {
  var code = '_BTWR_SUB_GET_RANK(';
  code += ')\n';
  return code;
};
commandMap['_BTWR_SUB_GET_RENSHOU_CNT'] = { type: 'bdsp__btwr_sub_get_renshou_cnt', args: 0 };
Blockly.Blocks['bdsp__btwr_sub_get_renshou_cnt'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTWR_SUB_GET_RENSHOU_CNT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btwr_sub_get_renshou_cnt'] = function(block) {
  var code = '_BTWR_SUB_GET_RENSHOU_CNT(';
  code += ')\n';
  return code;
};
commandMap['_BTWR_SUB_INC_ROUND'] = { type: 'bdsp__btwr_sub_inc_round', args: 0 };
Blockly.Blocks['bdsp__btwr_sub_inc_round'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTWR_SUB_INC_ROUND');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btwr_sub_inc_round'] = function(block) {
  var code = '_BTWR_SUB_INC_ROUND(';
  code += ')\n';
  return code;
};
commandMap['_BTWR_SUB_IS_CLEAR'] = { type: 'bdsp__btwr_sub_is_clear', args: 0 };
Blockly.Blocks['bdsp__btwr_sub_is_clear'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTWR_SUB_IS_CLEAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btwr_sub_is_clear'] = function(block) {
  var code = '_BTWR_SUB_IS_CLEAR(';
  code += ')\n';
  return code;
};
commandMap['_BTWR_SUB_LOCAL_BTL_CALL'] = { type: 'bdsp__btwr_sub_local_btl_call', args: 0 };
Blockly.Blocks['bdsp__btwr_sub_local_btl_call'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTWR_SUB_LOCAL_BTL_CALL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btwr_sub_local_btl_call'] = function(block) {
  var code = '_BTWR_SUB_LOCAL_BTL_CALL(';
  code += ')\n';
  return code;
};
commandMap['_BTWR_SUB_RANK_DOWN_LOSE'] = { type: 'bdsp__btwr_sub_rank_down_lose', args: 0 };
Blockly.Blocks['bdsp__btwr_sub_rank_down_lose'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTWR_SUB_RANK_DOWN_LOSE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btwr_sub_rank_down_lose'] = function(block) {
  var code = '_BTWR_SUB_RANK_DOWN_LOSE(';
  code += ')\n';
  return code;
};
commandMap['_BTWR_SUB_RANK_DOWN_LOSE_RESET'] = { type: 'bdsp__btwr_sub_rank_down_lose_reset', args: 0 };
Blockly.Blocks['bdsp__btwr_sub_rank_down_lose_reset'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTWR_SUB_RANK_DOWN_LOSE_RESET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btwr_sub_rank_down_lose_reset'] = function(block) {
  var code = '_BTWR_SUB_RANK_DOWN_LOSE_RESET(';
  code += ')\n';
  return code;
};
commandMap['_BTWR_SUB_RENSHOU_RIBBON_SET'] = { type: 'bdsp__btwr_sub_renshou_ribbon_set', args: 0 };
Blockly.Blocks['bdsp__btwr_sub_renshou_ribbon_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTWR_SUB_RENSHOU_RIBBON_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btwr_sub_renshou_ribbon_set'] = function(block) {
  var code = '_BTWR_SUB_RENSHOU_RIBBON_SET(';
  code += ')\n';
  return code;
};
commandMap['_BTWR_SUB_SELECT_POKE'] = { type: 'bdsp__btwr_sub_select_poke', args: 0 };
Blockly.Blocks['bdsp__btwr_sub_select_poke'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTWR_SUB_SELECT_POKE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btwr_sub_select_poke'] = function(block) {
  var code = '_BTWR_SUB_SELECT_POKE(';
  code += ')\n';
  return code;
};
commandMap['_BTWR_SUB_SET_LEADER_CLEAR_FLAG'] = { type: 'bdsp__btwr_sub_set_leader_clear_flag', args: 0 };
Blockly.Blocks['bdsp__btwr_sub_set_leader_clear_flag'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTWR_SUB_SET_LEADER_CLEAR_FLAG');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btwr_sub_set_leader_clear_flag'] = function(block) {
  var code = '_BTWR_SUB_SET_LEADER_CLEAR_FLAG(';
  code += ')\n';
  return code;
};
commandMap['_BTWR_SUB_SET_SCORE'] = { type: 'bdsp__btwr_sub_set_score', args: 0 };
Blockly.Blocks['bdsp__btwr_sub_set_score'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTWR_SUB_SET_SCORE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btwr_sub_set_score'] = function(block) {
  var code = '_BTWR_SUB_SET_SCORE(';
  code += ')\n';
  return code;
};
commandMap['_BTWR_SUB_UPDATE_RANDOM'] = { type: 'bdsp__btwr_sub_update_random', args: 0 };
Blockly.Blocks['bdsp__btwr_sub_update_random'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTWR_SUB_UPDATE_RANDOM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btwr_sub_update_random'] = function(block) {
  var code = '_BTWR_SUB_UPDATE_RANDOM(';
  code += ')\n';
  return code;
};
commandMap['_BTWR_TOOL_CHK_ENTRY_POKE_NUM'] = { type: 'bdsp__btwr_tool_chk_entry_poke_num', args: 0 };
Blockly.Blocks['bdsp__btwr_tool_chk_entry_poke_num'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTWR_TOOL_CHK_ENTRY_POKE_NUM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btwr_tool_chk_entry_poke_num'] = function(block) {
  var code = '_BTWR_TOOL_CHK_ENTRY_POKE_NUM(';
  code += ')\n';
  return code;
};
commandMap['_BTWR_TOOL_CLEAR_PLAY_DATA'] = { type: 'bdsp__btwr_tool_clear_play_data', args: 0 };
Blockly.Blocks['bdsp__btwr_tool_clear_play_data'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTWR_TOOL_CLEAR_PLAY_DATA');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btwr_tool_clear_play_data'] = function(block) {
  var code = '_BTWR_TOOL_CLEAR_PLAY_DATA(';
  code += ')\n';
  return code;
};
commandMap['_BTWR_TOOL_GET_WIFI_RANK'] = { type: 'bdsp__btwr_tool_get_wifi_rank', args: 0 };
Blockly.Blocks['bdsp__btwr_tool_get_wifi_rank'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTWR_TOOL_GET_WIFI_RANK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btwr_tool_get_wifi_rank'] = function(block) {
  var code = '_BTWR_TOOL_GET_WIFI_RANK(';
  code += ')\n';
  return code;
};
commandMap['_BTWR_TOOL_POP_NOW_LOCATION'] = { type: 'bdsp__btwr_tool_pop_now_location', args: 0 };
Blockly.Blocks['bdsp__btwr_tool_pop_now_location'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTWR_TOOL_POP_NOW_LOCATION');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btwr_tool_pop_now_location'] = function(block) {
  var code = '_BTWR_TOOL_POP_NOW_LOCATION(';
  code += ')\n';
  return code;
};
commandMap['_BTWR_TOOL_PUSH_NOW_LOCATION'] = { type: 'bdsp__btwr_tool_push_now_location', args: 0 };
Blockly.Blocks['bdsp__btwr_tool_push_now_location'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTWR_TOOL_PUSH_NOW_LOCATION');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btwr_tool_push_now_location'] = function(block) {
  var code = '_BTWR_TOOL_PUSH_NOW_LOCATION(';
  code += ')\n';
  return code;
};
commandMap['_BTWR_TOOL_SET_NOW_WIN'] = { type: 'bdsp__btwr_tool_set_now_win', args: 0 };
Blockly.Blocks['bdsp__btwr_tool_set_now_win'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTWR_TOOL_SET_NOW_WIN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btwr_tool_set_now_win'] = function(block) {
  var code = '_BTWR_TOOL_SET_NOW_WIN(';
  code += ')\n';
  return code;
};
commandMap['_BTWR_TOOL_SET_PLAY_MODE'] = { type: 'bdsp__btwr_tool_set_play_mode', args: 0 };
Blockly.Blocks['bdsp__btwr_tool_set_play_mode'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTWR_TOOL_SET_PLAY_MODE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btwr_tool_set_play_mode'] = function(block) {
  var code = '_BTWR_TOOL_SET_PLAY_MODE(';
  code += ')\n';
  return code;
};
commandMap['_BTWR_TOOL_SET_RANK'] = { type: 'bdsp__btwr_tool_set_rank', args: 0 };
Blockly.Blocks['bdsp__btwr_tool_set_rank'] = {
  init: function() {
    this.appendDummyInput().appendField('_BTWR_TOOL_SET_RANK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__btwr_tool_set_rank'] = function(block) {
  var code = '_BTWR_TOOL_SET_RANK(';
  code += ')\n';
  return code;
};
commandMap['_C08R0801SCOPECAMERASET'] = { type: 'bdsp__c08r0801scopecameraset', args: 0 };
Blockly.Blocks['bdsp__c08r0801scopecameraset'] = {
  init: function() {
    this.appendDummyInput().appendField('_C08R0801SCOPECAMERASET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__c08r0801scopecameraset'] = function(block) {
  var code = '_C08R0801SCOPECAMERASET(';
  code += ')\n';
  return code;
};
commandMap['_C08R0801SCOPECAMERA_SEQUENCE'] = { type: 'bdsp__c08r0801scopecamera_sequence', args: 0 };
Blockly.Blocks['bdsp__c08r0801scopecamera_sequence'] = {
  init: function() {
    this.appendDummyInput().appendField('_C08R0801SCOPECAMERA_SEQUENCE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__c08r0801scopecamera_sequence'] = function(block) {
  var code = '_C08R0801SCOPECAMERA_SEQUENCE(';
  code += ')\n';
  return code;
};
commandMap['_CALL'] = { type: 'bdsp__call', args: 1 };
Blockly.Blocks['bdsp__call'] = {
  init: function() {
    this.appendDummyInput().appendField('_CALL');
    this.appendValueInput('ARG_0').appendField('Script');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Calls a script.");
  }
};
Blockly.JavaScript['bdsp__call'] = function(block) {
  var code = '_CALL(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_CALL_EFFECT'] = { type: 'bdsp__call_effect', args: 0 };
Blockly.Blocks['bdsp__call_effect'] = {
  init: function() {
    this.appendDummyInput().appendField('_CALL_EFFECT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__call_effect'] = function(block) {
  var code = '_CALL_EFFECT(';
  code += ')\n';
  return code;
};
commandMap['_CALL_EFFECT_OBJ'] = { type: 'bdsp__call_effect_obj', args: 0 };
Blockly.Blocks['bdsp__call_effect_obj'] = {
  init: function() {
    this.appendDummyInput().appendField('_CALL_EFFECT_OBJ');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__call_effect_obj'] = function(block) {
  var code = '_CALL_EFFECT_OBJ(';
  code += ')\n';
  return code;
};
commandMap['_CALL_SAFARI_SCOPE'] = { type: 'bdsp__call_safari_scope', args: 0 };
Blockly.Blocks['bdsp__call_safari_scope'] = {
  init: function() {
    this.appendDummyInput().appendField('_CALL_SAFARI_SCOPE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__call_safari_scope'] = function(block) {
  var code = '_CALL_SAFARI_SCOPE(';
  code += ')\n';
  return code;
};
commandMap['_CALL_SHIP_DEMO'] = { type: 'bdsp__call_ship_demo', args: 0 };
Blockly.Blocks['bdsp__call_ship_demo'] = {
  init: function() {
    this.appendDummyInput().appendField('_CALL_SHIP_DEMO');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__call_ship_demo'] = function(block) {
  var code = '_CALL_SHIP_DEMO(';
  code += ')\n';
  return code;
};
commandMap['_CALL_SHIP_DEMO_SEA_MAP'] = { type: 'bdsp__call_ship_demo_sea_map', args: 0 };
Blockly.Blocks['bdsp__call_ship_demo_sea_map'] = {
  init: function() {
    this.appendDummyInput().appendField('_CALL_SHIP_DEMO_SEA_MAP');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__call_ship_demo_sea_map'] = function(block) {
  var code = '_CALL_SHIP_DEMO_SEA_MAP(';
  code += ')\n';
  return code;
};
commandMap['_CALL_WAZA_OMOIDASHI_UI'] = { type: 'bdsp__call_waza_omoidashi_ui', args: 0 };
Blockly.Blocks['bdsp__call_waza_omoidashi_ui'] = {
  init: function() {
    this.appendDummyInput().appendField('_CALL_WAZA_OMOIDASHI_UI');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__call_waza_omoidashi_ui'] = function(block) {
  var code = '_CALL_WAZA_OMOIDASHI_UI(';
  code += ')\n';
  return code;
};
commandMap['_CALL_WAZA_OSHIE_UI'] = { type: 'bdsp__call_waza_oshie_ui', args: 0 };
Blockly.Blocks['bdsp__call_waza_oshie_ui'] = {
  init: function() {
    this.appendDummyInput().appendField('_CALL_WAZA_OSHIE_UI');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__call_waza_oshie_ui'] = function(block) {
  var code = '_CALL_WAZA_OSHIE_UI(';
  code += ')\n';
  return code;
};
commandMap['_CALL_WAZA_WASURE_UI'] = { type: 'bdsp__call_waza_wasure_ui', args: 0 };
Blockly.Blocks['bdsp__call_waza_wasure_ui'] = {
  init: function() {
    this.appendDummyInput().appendField('_CALL_WAZA_WASURE_UI');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__call_waza_wasure_ui'] = function(block) {
  var code = '_CALL_WAZA_WASURE_UI(';
  code += ')\n';
  return code;
};
commandMap['_CAMERA_CONTROLLER_END'] = { type: 'bdsp__camera_controller_end', args: 0 };
Blockly.Blocks['bdsp__camera_controller_end'] = {
  init: function() {
    this.appendDummyInput().appendField('_CAMERA_CONTROLLER_END');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__camera_controller_end'] = function(block) {
  var code = '_CAMERA_CONTROLLER_END(';
  code += ')\n';
  return code;
};
commandMap['_CAMERA_CONTROLLER_IS_NULL'] = { type: 'bdsp__camera_controller_is_null', args: 0 };
Blockly.Blocks['bdsp__camera_controller_is_null'] = {
  init: function() {
    this.appendDummyInput().appendField('_CAMERA_CONTROLLER_IS_NULL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__camera_controller_is_null'] = function(block) {
  var code = '_CAMERA_CONTROLLER_IS_NULL(';
  code += ')\n';
  return code;
};
commandMap['_CAMERA_CONTROLLER_PLAY'] = { type: 'bdsp__camera_controller_play', args: 0 };
Blockly.Blocks['bdsp__camera_controller_play'] = {
  init: function() {
    this.appendDummyInput().appendField('_CAMERA_CONTROLLER_PLAY');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__camera_controller_play'] = function(block) {
  var code = '_CAMERA_CONTROLLER_PLAY(';
  code += ')\n';
  return code;
};
commandMap['_CAMERA_CONTROLLER_WAIT'] = { type: 'bdsp__camera_controller_wait', args: 0 };
Blockly.Blocks['bdsp__camera_controller_wait'] = {
  init: function() {
    this.appendDummyInput().appendField('_CAMERA_CONTROLLER_WAIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__camera_controller_wait'] = function(block) {
  var code = '_CAMERA_CONTROLLER_WAIT(';
  code += ')\n';
  return code;
};
commandMap['_CAMERA_COS_ANGLE_WAIT'] = { type: 'bdsp__camera_cos_angle_wait', args: 0 };
Blockly.Blocks['bdsp__camera_cos_angle_wait'] = {
  init: function() {
    this.appendDummyInput().appendField('_CAMERA_COS_ANGLE_WAIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__camera_cos_angle_wait'] = function(block) {
  var code = '_CAMERA_COS_ANGLE_WAIT(';
  code += ')\n';
  return code;
};
commandMap['_CAMERA_SET_COS_ANGLE'] = { type: 'bdsp__camera_set_cos_angle', args: 0 };
Blockly.Blocks['bdsp__camera_set_cos_angle'] = {
  init: function() {
    this.appendDummyInput().appendField('_CAMERA_SET_COS_ANGLE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__camera_set_cos_angle'] = function(block) {
  var code = '_CAMERA_SET_COS_ANGLE(';
  code += ')\n';
  return code;
};
commandMap['_CAMERA_SHAKE'] = { type: 'bdsp__camera_shake', args: 0 };
Blockly.Blocks['bdsp__camera_shake'] = {
  init: function() {
    this.appendDummyInput().appendField('_CAMERA_SHAKE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__camera_shake'] = function(block) {
  var code = '_CAMERA_SHAKE(';
  code += ')\n';
  return code;
};
commandMap['_CAMERA_TARGET_DUMMY'] = { type: 'bdsp__camera_target_dummy', args: 0 };
Blockly.Blocks['bdsp__camera_target_dummy'] = {
  init: function() {
    this.appendDummyInput().appendField('_CAMERA_TARGET_DUMMY');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__camera_target_dummy'] = function(block) {
  var code = '_CAMERA_TARGET_DUMMY(';
  code += ')\n';
  return code;
};
commandMap['_CAMERA_TARGET_HERO'] = { type: 'bdsp__camera_target_hero', args: 0 };
Blockly.Blocks['bdsp__camera_target_hero'] = {
  init: function() {
    this.appendDummyInput().appendField('_CAMERA_TARGET_HERO');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__camera_target_hero'] = function(block) {
  var code = '_CAMERA_TARGET_HERO(';
  code += ')\n';
  return code;
};
commandMap['_CAPTURE_BTL_SET'] = { type: 'bdsp__capture_btl_set', args: 0 };
Blockly.Blocks['bdsp__capture_btl_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_CAPTURE_BTL_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__capture_btl_set'] = function(block) {
  var code = '_CAPTURE_BTL_SET(';
  code += ')\n';
  return code;
};
commandMap['_CASE_CANCEL'] = { type: 'bdsp__case_cancel', args: 1 };
Blockly.Blocks['bdsp__case_cancel'] = {
  init: function() {
    this.appendDummyInput().appendField('_CASE_CANCEL');
    this.appendValueInput('ARG_0').appendField('Script');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Compares the value of the variable given to the last _SWITCH command ran to the value of Cancel, then jumps to a script if they are equal.");
  }
};
Blockly.JavaScript['bdsp__case_cancel'] = function(block) {
  var code = '_CASE_CANCEL(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_CASE_JUMP'] = { type: 'bdsp__case_jump', args: 2 };
Blockly.Blocks['bdsp__case_jump'] = {
  init: function() {
    this.appendDummyInput().appendField('_CASE_JUMP');
    this.appendValueInput('ARG_0').appendField('Value');
    this.appendValueInput('ARG_1').appendField('Script');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Compares the value of the variable given to the last _SWITCH command ran to another value, then jumps to a script if they are equal.");
  }
};
Blockly.JavaScript['bdsp__case_jump'] = function(block) {
  var code = '_CASE_JUMP(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_CASSET_VERSION_GET'] = { type: 'bdsp__casset_version_get', args: 0 };
Blockly.Blocks['bdsp__casset_version_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_CASSET_VERSION_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__casset_version_get'] = function(block) {
  var code = '_CASSET_VERSION_GET(';
  code += ')\n';
  return code;
};
commandMap['_CB_ITEM_NUM_ADD'] = { type: 'bdsp__cb_item_num_add', args: 2 };
Blockly.Blocks['bdsp__cb_item_num_add'] = {
  init: function() {
    this.appendDummyInput().appendField('_CB_ITEM_NUM_ADD');
    this.appendValueInput('ARG_0').appendField('Seal');
    this.appendValueInput('ARG_1').appendField('Amount');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Gives an amount of one seal to the player.");
  }
};
Blockly.JavaScript['bdsp__cb_item_num_add'] = function(block) {
  var code = '_CB_ITEM_NUM_ADD(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_CB_ITEM_NUM_GET'] = { type: 'bdsp__cb_item_num_get', args: 2 };
Blockly.Blocks['bdsp__cb_item_num_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_CB_ITEM_NUM_GET');
    this.appendValueInput('ARG_0').appendField('Seal');
    this.appendValueInput('ARG_1').appendField('Result');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Checks how many of a seal the player has.");
  }
};
Blockly.JavaScript['bdsp__cb_item_num_get'] = function(block) {
  var code = '_CB_ITEM_NUM_GET(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_CB_SEAL_KIND_NUM_GET'] = { type: 'bdsp__cb_seal_kind_num_get', args: 0 };
Blockly.Blocks['bdsp__cb_seal_kind_num_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_CB_SEAL_KIND_NUM_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__cb_seal_kind_num_get'] = function(block) {
  var code = '_CB_SEAL_KIND_NUM_GET(';
  code += ')\n';
  return code;
};
commandMap['_CHANGE_FASHION_REQ'] = { type: 'bdsp__change_fashion_req', args: 0 };
Blockly.Blocks['bdsp__change_fashion_req'] = {
  init: function() {
    this.appendDummyInput().appendField('_CHANGE_FASHION_REQ');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__change_fashion_req'] = function(block) {
  var code = '_CHANGE_FASHION_REQ(';
  code += ')\n';
  return code;
};
commandMap['_CHARA_LOOK_LOCK'] = { type: 'bdsp__chara_look_lock', args: 0 };
Blockly.Blocks['bdsp__chara_look_lock'] = {
  init: function() {
    this.appendDummyInput().appendField('_CHARA_LOOK_LOCK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__chara_look_lock'] = function(block) {
  var code = '_CHARA_LOOK_LOCK(';
  code += ')\n';
  return code;
};
commandMap['_CHARA_LOOK_RELEASE'] = { type: 'bdsp__chara_look_release', args: 0 };
Blockly.Blocks['bdsp__chara_look_release'] = {
  init: function() {
    this.appendDummyInput().appendField('_CHARA_LOOK_RELEASE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__chara_look_release'] = function(block) {
  var code = '_CHARA_LOOK_RELEASE(';
  code += ')\n';
  return code;
};
commandMap['_CHECKMINOMUCHICOMP'] = { type: 'bdsp__checkminomuchicomp', args: 0 };
Blockly.Blocks['bdsp__checkminomuchicomp'] = {
  init: function() {
    this.appendDummyInput().appendField('_CHECKMINOMUCHICOMP');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__checkminomuchicomp'] = function(block) {
  var code = '_CHECKMINOMUCHICOMP(';
  code += ')\n';
  return code;
};
commandMap['_CHECK_CAN_SEED_WATER'] = { type: 'bdsp__check_can_seed_water', args: 0 };
Blockly.Blocks['bdsp__check_can_seed_water'] = {
  init: function() {
    this.appendDummyInput().appendField('_CHECK_CAN_SEED_WATER');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__check_can_seed_water'] = function(block) {
  var code = '_CHECK_CAN_SEED_WATER(';
  code += ')\n';
  return code;
};
commandMap['_CHECK_FLD_LIFT'] = { type: 'bdsp__check_fld_lift', args: 0 };
Blockly.Blocks['bdsp__check_fld_lift'] = {
  init: function() {
    this.appendDummyInput().appendField('_CHECK_FLD_LIFT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__check_fld_lift'] = function(block) {
  var code = '_CHECK_FLD_LIFT(';
  code += ')\n';
  return code;
};
commandMap['_CHECK_MY_GSID'] = { type: 'bdsp__check_my_gsid', args: 0 };
Blockly.Blocks['bdsp__check_my_gsid'] = {
  init: function() {
    this.appendDummyInput().appendField('_CHECK_MY_GSID');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__check_my_gsid'] = function(block) {
  var code = '_CHECK_MY_GSID(';
  code += ')\n';
  return code;
};
commandMap['_CHECK_ONLINE_ACCOUNT'] = { type: 'bdsp__check_online_account', args: 0 };
Blockly.Blocks['bdsp__check_online_account'] = {
  init: function() {
    this.appendDummyInput().appendField('_CHECK_ONLINE_ACCOUNT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__check_online_account'] = function(block) {
  var code = '_CHECK_ONLINE_ACCOUNT(';
  code += ')\n';
  return code;
};
commandMap['_CHECK_POCKET'] = { type: 'bdsp__check_pocket', args: 2 };
Blockly.Blocks['bdsp__check_pocket'] = {
  init: function() {
    this.appendDummyInput().appendField('_CHECK_POCKET');
    this.appendValueInput('ARG_0').appendField('Pocket');
    this.appendValueInput('ARG_1').appendField('Result');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Checks if any item is present in a given pocket.");
  }
};
Blockly.JavaScript['bdsp__check_pocket'] = function(block) {
  var code = '_CHECK_POCKET(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_CHECK_POFIN'] = { type: 'bdsp__check_pofin', args: 0 };
Blockly.Blocks['bdsp__check_pofin'] = {
  init: function() {
    this.appendDummyInput().appendField('_CHECK_POFIN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__check_pofin'] = function(block) {
  var code = '_CHECK_POFIN(';
  code += ')\n';
  return code;
};
commandMap['_CHECK_SAFARI_TRAIN'] = { type: 'bdsp__check_safari_train', args: 0 };
Blockly.Blocks['bdsp__check_safari_train'] = {
  init: function() {
    this.appendDummyInput().appendField('_CHECK_SAFARI_TRAIN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__check_safari_train'] = function(block) {
  var code = '_CHECK_SAFARI_TRAIN(';
  code += ')\n';
  return code;
};
commandMap['_CHECK_SECRET_BASE_EXPANTION'] = { type: 'bdsp__check_secret_base_expantion', args: 0 };
Blockly.Blocks['bdsp__check_secret_base_expantion'] = {
  init: function() {
    this.appendDummyInput().appendField('_CHECK_SECRET_BASE_EXPANTION');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__check_secret_base_expantion'] = function(block) {
  var code = '_CHECK_SECRET_BASE_EXPANTION(';
  code += ')\n';
  return code;
};
commandMap['_CHECK_WAZA_OSHIE'] = { type: 'bdsp__check_waza_oshie', args: 0 };
Blockly.Blocks['bdsp__check_waza_oshie'] = {
  init: function() {
    this.appendDummyInput().appendField('_CHECK_WAZA_OSHIE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__check_waza_oshie'] = function(block) {
  var code = '_CHECK_WAZA_OSHIE(';
  code += ')\n';
  return code;
};
commandMap['_CHECK_WAZA_OSHIE_ALL'] = { type: 'bdsp__check_waza_oshie_all', args: 0 };
Blockly.Blocks['bdsp__check_waza_oshie_all'] = {
  init: function() {
    this.appendDummyInput().appendField('_CHECK_WAZA_OSHIE_ALL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__check_waza_oshie_all'] = function(block) {
  var code = '_CHECK_WAZA_OSHIE_ALL(';
  code += ')\n';
  return code;
};
commandMap['_CHG_COMMON_SCR'] = { type: 'bdsp__chg_common_scr', args: 1 };
Blockly.Blocks['bdsp__chg_common_scr'] = {
  init: function() {
    this.appendDummyInput().appendField('_CHG_COMMON_SCR');
    this.appendValueInput('ARG_0').appendField('Script');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Calls a script.");
  }
};
Blockly.JavaScript['bdsp__chg_common_scr'] = function(block) {
  var code = '_CHG_COMMON_SCR(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_CHG_LOCAL_SCR'] = { type: 'bdsp__chg_local_scr', args: 0 };
Blockly.Blocks['bdsp__chg_local_scr'] = {
  init: function() {
    this.appendDummyInput().appendField('_CHG_LOCAL_SCR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Returns after a call.");
  }
};
Blockly.JavaScript['bdsp__chg_local_scr'] = function(block) {
  var code = '_CHG_LOCAL_SCR(';
  code += ')\n';
  return code;
};
commandMap['_CHG_POKE_WAZA'] = { type: 'bdsp__chg_poke_waza', args: 0 };
Blockly.Blocks['bdsp__chg_poke_waza'] = {
  init: function() {
    this.appendDummyInput().appendField('_CHG_POKE_WAZA');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__chg_poke_waza'] = function(block) {
  var code = '_CHG_POKE_WAZA(';
  code += ')\n';
  return code;
};
commandMap['_CHK_BOX_ITEM'] = { type: 'bdsp__chk_box_item', args: 0 };
Blockly.Blocks['bdsp__chk_box_item'] = {
  init: function() {
    this.appendDummyInput().appendField('_CHK_BOX_ITEM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__chk_box_item'] = function(block) {
  var code = '_CHK_BOX_ITEM(';
  code += ')\n';
  return code;
};
commandMap['_CHK_POKE_SEIKAKU_ALL'] = { type: 'bdsp__chk_poke_seikaku_all', args: 0 };
Blockly.Blocks['bdsp__chk_poke_seikaku_all'] = {
  init: function() {
    this.appendDummyInput().appendField('_CHK_POKE_SEIKAKU_ALL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__chk_poke_seikaku_all'] = function(block) {
  var code = '_CHK_POKE_SEIKAKU_ALL(';
  code += ')\n';
  return code;
};
commandMap['_CHK_POKE_WAZA'] = { type: 'bdsp__chk_poke_waza', args: 4 };
Blockly.Blocks['bdsp__chk_poke_waza'] = {
  init: function() {
    this.appendDummyInput().appendField('_CHK_POKE_WAZA');
    this.appendValueInput('ARG_0').appendField('Result');
    this.appendValueInput('ARG_1').appendField('Move');
    this.appendValueInput('ARG_2').appendField('Position');
    this.appendValueInput('ARG_3').appendField('Unknown');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Checks if a Pok\u00c3\u00a9mon in a specific position has a specific move.");
  }
};
Blockly.JavaScript['bdsp__chk_poke_waza'] = function(block) {
  var code = '_CHK_POKE_WAZA(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_3', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_CHK_POKE_WAZA_GROUP'] = { type: 'bdsp__chk_poke_waza_group', args: 0 };
Blockly.Blocks['bdsp__chk_poke_waza_group'] = {
  init: function() {
    this.appendDummyInput().appendField('_CHK_POKE_WAZA_GROUP');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__chk_poke_waza_group'] = function(block) {
  var code = '_CHK_POKE_WAZA_GROUP(';
  code += ')\n';
  return code;
};
commandMap['_CHK_PRMEXP'] = { type: 'bdsp__chk_prmexp', args: 0 };
Blockly.Blocks['bdsp__chk_prmexp'] = {
  init: function() {
    this.appendDummyInput().appendField('_CHK_PRMEXP');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__chk_prmexp'] = function(block) {
  var code = '_CHK_PRMEXP(';
  code += ')\n';
  return code;
};
commandMap['_CHK_RIBBON'] = { type: 'bdsp__chk_ribbon', args: 0 };
Blockly.Blocks['bdsp__chk_ribbon'] = {
  init: function() {
    this.appendDummyInput().appendField('_CHK_RIBBON');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__chk_ribbon'] = function(block) {
  var code = '_CHK_RIBBON(';
  code += ')\n';
  return code;
};
commandMap['_CHK_RIBBON_COUNT'] = { type: 'bdsp__chk_ribbon_count', args: 0 };
Blockly.Blocks['bdsp__chk_ribbon_count'] = {
  init: function() {
    this.appendDummyInput().appendField('_CHK_RIBBON_COUNT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__chk_ribbon_count'] = function(block) {
  var code = '_CHK_RIBBON_COUNT(';
  code += ')\n';
  return code;
};
commandMap['_CHK_RIBBON_COUNT_ALL'] = { type: 'bdsp__chk_ribbon_count_all', args: 0 };
Blockly.Blocks['bdsp__chk_ribbon_count_all'] = {
  init: function() {
    this.appendDummyInput().appendField('_CHK_RIBBON_COUNT_ALL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__chk_ribbon_count_all'] = function(block) {
  var code = '_CHK_RIBBON_COUNT_ALL(';
  code += ')\n';
  return code;
};
commandMap['_CHK_TEMOTI_POKERUS'] = { type: 'bdsp__chk_temoti_pokerus', args: 0 };
Blockly.Blocks['bdsp__chk_temoti_pokerus'] = {
  init: function() {
    this.appendDummyInput().appendField('_CHK_TEMOTI_POKERUS');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__chk_temoti_pokerus'] = function(block) {
  var code = '_CHK_TEMOTI_POKERUS(';
  code += ')\n';
  return code;
};
commandMap['_CHK_WEEK'] = { type: 'bdsp__chk_week', args: 0 };
Blockly.Blocks['bdsp__chk_week'] = {
  init: function() {
    this.appendDummyInput().appendField('_CHK_WEEK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__chk_week'] = function(block) {
  var code = '_CHK_WEEK(';
  code += ')\n';
  return code;
};
commandMap['_CHK_ZENKOKU_ZUKAN'] = { type: 'bdsp__chk_zenkoku_zukan', args: 0 };
Blockly.Blocks['bdsp__chk_zenkoku_zukan'] = {
  init: function() {
    this.appendDummyInput().appendField('_CHK_ZENKOKU_ZUKAN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__chk_zenkoku_zukan'] = function(block) {
  var code = '_CHK_ZENKOKU_ZUKAN(';
  code += ')\n';
  return code;
};
commandMap['_CHK_ZUKAN_TOUROKU'] = { type: 'bdsp__chk_zukan_touroku', args: 0 };
Blockly.Blocks['bdsp__chk_zukan_touroku'] = {
  init: function() {
    this.appendDummyInput().appendField('_CHK_ZUKAN_TOUROKU');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__chk_zukan_touroku'] = function(block) {
  var code = '_CHK_ZUKAN_TOUROKU(';
  code += ')\n';
  return code;
};
commandMap['_CLIMAX_DEMO'] = { type: 'bdsp__climax_demo', args: 0 };
Blockly.Blocks['bdsp__climax_demo'] = {
  init: function() {
    this.appendDummyInput().appendField('_CLIMAX_DEMO');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__climax_demo'] = function(block) {
  var code = '_CLIMAX_DEMO(';
  code += ')\n';
  return code;
};
commandMap['_CLIP_CONSAVEDATA_CHECK'] = { type: 'bdsp__clip_consavedata_check', args: 0 };
Blockly.Blocks['bdsp__clip_consavedata_check'] = {
  init: function() {
    this.appendDummyInput().appendField('_CLIP_CONSAVEDATA_CHECK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__clip_consavedata_check'] = function(block) {
  var code = '_CLIP_CONSAVEDATA_CHECK(';
  code += ')\n';
  return code;
};
commandMap['_CLIP_TVSAVEDATA_CHECK'] = { type: 'bdsp__clip_tvsavedata_check', args: 0 };
Blockly.Blocks['bdsp__clip_tvsavedata_check'] = {
  init: function() {
    this.appendDummyInput().appendField('_CLIP_TVSAVEDATA_CHECK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__clip_tvsavedata_check'] = function(block) {
  var code = '_CLIP_TVSAVEDATA_CHECK(';
  code += ')\n';
  return code;
};
commandMap['_CLIP_TV_TITLE_SAVE'] = { type: 'bdsp__clip_tv_title_save', args: 0 };
Blockly.Blocks['bdsp__clip_tv_title_save'] = {
  init: function() {
    this.appendDummyInput().appendField('_CLIP_TV_TITLE_SAVE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__clip_tv_title_save'] = function(block) {
  var code = '_CLIP_TV_TITLE_SAVE(';
  code += ')\n';
  return code;
};
commandMap['_CMPVAL'] = { type: 'bdsp__cmpval', args: 0 };
Blockly.Blocks['bdsp__cmpval'] = {
  init: function() {
    this.appendDummyInput().appendField('_CMPVAL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__cmpval'] = function(block) {
  var code = '_CMPVAL(';
  code += ')\n';
  return code;
};
commandMap['_CMPWK'] = { type: 'bdsp__cmpwk', args: 2 };
Blockly.Blocks['bdsp__cmpwk'] = {
  init: function() {
    this.appendDummyInput().appendField('_CMPWK');
    this.appendValueInput('ARG_0').appendField('Var1');
    this.appendValueInput('ARG_1').appendField('Var2');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Compares the value of a variable to the value of another variable. Used once in unused poison scripts.");
  }
};
Blockly.JavaScript['bdsp__cmpwk'] = function(block) {
  var code = '_CMPWK(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_COIN_WIN_DEL'] = { type: 'bdsp__coin_win_del', args: 0 };
Blockly.Blocks['bdsp__coin_win_del'] = {
  init: function() {
    this.appendDummyInput().appendField('_COIN_WIN_DEL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Removes the window showing the player's coins.");
  }
};
Blockly.JavaScript['bdsp__coin_win_del'] = function(block) {
  var code = '_COIN_WIN_DEL(';
  code += ')\n';
  return code;
};
commandMap['_COIN_WIN_WRITE'] = { type: 'bdsp__coin_win_write', args: 2 };
Blockly.Blocks['bdsp__coin_win_write'] = {
  init: function() {
    this.appendDummyInput().appendField('_COIN_WIN_WRITE');
    this.appendValueInput('ARG_0').appendField('X');
    this.appendValueInput('ARG_1').appendField('Y');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Shows a window with the player's coins.");
  }
};
Blockly.JavaScript['bdsp__coin_win_write'] = function(block) {
  var code = '_COIN_WIN_WRITE(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_COIN_WRITE'] = { type: 'bdsp__coin_write', args: 0 };
Blockly.Blocks['bdsp__coin_write'] = {
  init: function() {
    this.appendDummyInput().appendField('_COIN_WRITE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Updates the amount shown in the window showing the player's coins.");
  }
};
Blockly.JavaScript['bdsp__coin_write'] = function(block) {
  var code = '_COIN_WRITE(';
  code += ')\n';
  return code;
};
commandMap['_COLOSSEUM_MAP_CHANGE_IN'] = { type: 'bdsp__colosseum_map_change_in', args: 0 };
Blockly.Blocks['bdsp__colosseum_map_change_in'] = {
  init: function() {
    this.appendDummyInput().appendField('_COLOSSEUM_MAP_CHANGE_IN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__colosseum_map_change_in'] = function(block) {
  var code = '_COLOSSEUM_MAP_CHANGE_IN(';
  code += ')\n';
  return code;
};
commandMap['_COLOSSEUM_MAP_CHANGE_OUT'] = { type: 'bdsp__colosseum_map_change_out', args: 0 };
Blockly.Blocks['bdsp__colosseum_map_change_out'] = {
  init: function() {
    this.appendDummyInput().appendField('_COLOSSEUM_MAP_CHANGE_OUT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__colosseum_map_change_out'] = function(block) {
  var code = '_COLOSSEUM_MAP_CHANGE_OUT(';
  code += ')\n';
  return code;
};
commandMap['_COMM_DIRECT_END'] = { type: 'bdsp__comm_direct_end', args: 0 };
Blockly.Blocks['bdsp__comm_direct_end'] = {
  init: function() {
    this.appendDummyInput().appendField('_COMM_DIRECT_END');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__comm_direct_end'] = function(block) {
  var code = '_COMM_DIRECT_END(';
  code += ')\n';
  return code;
};
commandMap['_COMM_DIRECT_END_TIMING'] = { type: 'bdsp__comm_direct_end_timing', args: 0 };
Blockly.Blocks['bdsp__comm_direct_end_timing'] = {
  init: function() {
    this.appendDummyInput().appendField('_COMM_DIRECT_END_TIMING');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__comm_direct_end_timing'] = function(block) {
  var code = '_COMM_DIRECT_END_TIMING(';
  code += ')\n';
  return code;
};
commandMap['_COMM_DIRECT_ENTER_BTL_ROOM'] = { type: 'bdsp__comm_direct_enter_btl_room', args: 0 };
Blockly.Blocks['bdsp__comm_direct_enter_btl_room'] = {
  init: function() {
    this.appendDummyInput().appendField('_COMM_DIRECT_ENTER_BTL_ROOM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__comm_direct_enter_btl_room'] = function(block) {
  var code = '_COMM_DIRECT_ENTER_BTL_ROOM(';
  code += ')\n';
  return code;
};
commandMap['_COMM_GET_CURRENT_ID'] = { type: 'bdsp__comm_get_current_id', args: 1 };
Blockly.Blocks['bdsp__comm_get_current_id'] = {
  init: function() {
    this.appendDummyInput().appendField('_COMM_GET_CURRENT_ID');
    this.appendValueInput('ARG_0').appendField('Result');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Checks if this player is the host of the Battle Tower multi-battle group or if they joined.");
  }
};
Blockly.JavaScript['bdsp__comm_get_current_id'] = function(block) {
  var code = '_COMM_GET_CURRENT_ID(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_COMM_PLAYER_SET_DIR'] = { type: 'bdsp__comm_player_set_dir', args: 0 };
Blockly.Blocks['bdsp__comm_player_set_dir'] = {
  init: function() {
    this.appendDummyInput().appendField('_COMM_PLAYER_SET_DIR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__comm_player_set_dir'] = function(block) {
  var code = '_COMM_PLAYER_SET_DIR(';
  code += ')\n';
  return code;
};
commandMap['_COMM_RESET'] = { type: 'bdsp__comm_reset', args: 0 };
Blockly.Blocks['bdsp__comm_reset'] = {
  init: function() {
    this.appendDummyInput().appendField('_COMM_RESET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__comm_reset'] = function(block) {
  var code = '_COMM_RESET(';
  code += ')\n';
  return code;
};
commandMap['_COMM_SYNCHRONIZE'] = { type: 'bdsp__comm_synchronize', args: 0 };
Blockly.Blocks['bdsp__comm_synchronize'] = {
  init: function() {
    this.appendDummyInput().appendField('_COMM_SYNCHRONIZE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__comm_synchronize'] = function(block) {
  var code = '_COMM_SYNCHRONIZE(';
  code += ')\n';
  return code;
};
commandMap['_COMP_BTL_POINT'] = { type: 'bdsp__comp_btl_point', args: 0 };
Blockly.Blocks['bdsp__comp_btl_point'] = {
  init: function() {
    this.appendDummyInput().appendField('_COMP_BTL_POINT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__comp_btl_point'] = function(block) {
  var code = '_COMP_BTL_POINT(';
  code += ')\n';
  return code;
};
commandMap['_COMP_COIN'] = { type: 'bdsp__comp_coin', args: 0 };
Blockly.Blocks['bdsp__comp_coin'] = {
  init: function() {
    this.appendDummyInput().appendField('_COMP_COIN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__comp_coin'] = function(block) {
  var code = '_COMP_COIN(';
  code += ')\n';
  return code;
};
commandMap['_COMP_GOLD'] = { type: 'bdsp__comp_gold', args: 2 };
Blockly.Blocks['bdsp__comp_gold'] = {
  init: function() {
    this.appendDummyInput().appendField('_COMP_GOLD');
    this.appendValueInput('ARG_0').appendField('Result');
    this.appendValueInput('ARG_1').appendField('Amount');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Checks if the player has an amount of money.");
  }
};
Blockly.JavaScript['bdsp__comp_gold'] = function(block) {
  var code = '_COMP_GOLD(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_COMP_MY_GOLD'] = { type: 'bdsp__comp_my_gold', args: 0 };
Blockly.Blocks['bdsp__comp_my_gold'] = {
  init: function() {
    this.appendDummyInput().appendField('_COMP_MY_GOLD');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__comp_my_gold'] = function(block) {
  var code = '_COMP_MY_GOLD(';
  code += ')\n';
  return code;
};
commandMap['_COMP_WK_COIN'] = { type: 'bdsp__comp_wk_coin', args: 0 };
Blockly.Blocks['bdsp__comp_wk_coin'] = {
  init: function() {
    this.appendDummyInput().appendField('_COMP_WK_COIN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__comp_wk_coin'] = function(block) {
  var code = '_COMP_WK_COIN(';
  code += ')\n';
  return code;
};
commandMap['_CONSIO_TIMING_CHECK'] = { type: 'bdsp__consio_timing_check', args: 0 };
Blockly.Blocks['bdsp__consio_timing_check'] = {
  init: function() {
    this.appendDummyInput().appendField('_CONSIO_TIMING_CHECK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__consio_timing_check'] = function(block) {
  var code = '_CONSIO_TIMING_CHECK(';
  code += ')\n';
  return code;
};
commandMap['_CONSIO_TIMING_SEND'] = { type: 'bdsp__consio_timing_send', args: 0 };
Blockly.Blocks['bdsp__consio_timing_send'] = {
  init: function() {
    this.appendDummyInput().appendField('_CONSIO_TIMING_SEND');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__consio_timing_send'] = function(block) {
  var code = '_CONSIO_TIMING_SEND(';
  code += ')\n';
  return code;
};
commandMap['_CONTEST_PROC'] = { type: 'bdsp__contest_proc', args: 0 };
Blockly.Blocks['bdsp__contest_proc'] = {
  init: function() {
    this.appendDummyInput().appendField('_CONTEST_PROC');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__contest_proc'] = function(block) {
  var code = '_CONTEST_PROC(';
  code += ')\n';
  return code;
};
commandMap['_CON_ACCE_NO_GET'] = { type: 'bdsp__con_acce_no_get', args: 0 };
Blockly.Blocks['bdsp__con_acce_no_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_ACCE_NO_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_acce_no_get'] = function(block) {
  var code = '_CON_ACCE_NO_GET(';
  code += ')\n';
  return code;
};
commandMap['_CON_BEST_PERFORMER_CHECK'] = { type: 'bdsp__con_best_performer_check', args: 0 };
Blockly.Blocks['bdsp__con_best_performer_check'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_BEST_PERFORMER_CHECK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_best_performer_check'] = function(block) {
  var code = '_CON_BEST_PERFORMER_CHECK(';
  code += ')\n';
  return code;
};
commandMap['_CON_BREEDER_NAME_GET'] = { type: 'bdsp__con_breeder_name_get', args: 0 };
Blockly.Blocks['bdsp__con_breeder_name_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_BREEDER_NAME_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_breeder_name_get'] = function(block) {
  var code = '_CON_BREEDER_NAME_GET(';
  code += ')\n';
  return code;
};
commandMap['_CON_CAMERA_FLASH_CHECK'] = { type: 'bdsp__con_camera_flash_check', args: 0 };
Blockly.Blocks['bdsp__con_camera_flash_check'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_CAMERA_FLASH_CHECK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_camera_flash_check'] = function(block) {
  var code = '_CON_CAMERA_FLASH_CHECK(';
  code += ')\n';
  return code;
};
commandMap['_CON_CAMERA_FLASH_SET'] = { type: 'bdsp__con_camera_flash_set', args: 0 };
Blockly.Blocks['bdsp__con_camera_flash_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_CAMERA_FLASH_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_camera_flash_set'] = function(block) {
  var code = '_CON_CAMERA_FLASH_SET(';
  code += ')\n';
  return code;
};
commandMap['_CON_CATEGORY_AND_RANK_SET'] = { type: 'bdsp__con_category_and_rank_set', args: 0 };
Blockly.Blocks['bdsp__con_category_and_rank_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_CATEGORY_AND_RANK_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_category_and_rank_set'] = function(block) {
  var code = '_CON_CATEGORY_AND_RANK_SET(';
  code += ')\n';
  return code;
};
commandMap['_CON_CATEGORY_NAME'] = { type: 'bdsp__con_category_name', args: 0 };
Blockly.Blocks['bdsp__con_category_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_CATEGORY_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_category_name'] = function(block) {
  var code = '_CON_CATEGORY_NAME(';
  code += ')\n';
  return code;
};
commandMap['_CON_CATEGORY_RIBBON_NAME_SET'] = { type: 'bdsp__con_category_ribbon_name_set', args: 0 };
Blockly.Blocks['bdsp__con_category_ribbon_name_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_CATEGORY_RIBBON_NAME_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_category_ribbon_name_set'] = function(block) {
  var code = '_CON_CATEGORY_RIBBON_NAME_SET(';
  code += ')\n';
  return code;
};
commandMap['_CON_CHECK_ENTRY_POKE'] = { type: 'bdsp__con_check_entry_poke', args: 0 };
Blockly.Blocks['bdsp__con_check_entry_poke'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_CHECK_ENTRY_POKE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_check_entry_poke'] = function(block) {
  var code = '_CON_CHECK_ENTRY_POKE(';
  code += ')\n';
  return code;
};
commandMap['_CON_CONTEST_STAR_NAME_SET'] = { type: 'bdsp__con_contest_star_name_set', args: 0 };
Blockly.Blocks['bdsp__con_contest_star_name_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_CONTEST_STAR_NAME_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_contest_star_name_set'] = function(block) {
  var code = '_CON_CONTEST_STAR_NAME_SET(';
  code += ')\n';
  return code;
};
commandMap['_CON_DESK_MODE_GET'] = { type: 'bdsp__con_desk_mode_get', args: 0 };
Blockly.Blocks['bdsp__con_desk_mode_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_DESK_MODE_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_desk_mode_get'] = function(block) {
  var code = '_CON_DESK_MODE_GET(';
  code += ')\n';
  return code;
};
commandMap['_CON_ENDING_SKIP_CHECK'] = { type: 'bdsp__con_ending_skip_check', args: 0 };
Blockly.Blocks['bdsp__con_ending_skip_check'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_ENDING_SKIP_CHECK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_ending_skip_check'] = function(block) {
  var code = '_CON_ENDING_SKIP_CHECK(';
  code += ')\n';
  return code;
};
commandMap['_CON_ENTRY_PARAM_GET'] = { type: 'bdsp__con_entry_param_get', args: 0 };
Blockly.Blocks['bdsp__con_entry_param_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_ENTRY_PARAM_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_entry_param_get'] = function(block) {
  var code = '_CON_ENTRY_PARAM_GET(';
  code += ')\n';
  return code;
};
commandMap['_CON_HAVE_CONTEST_STAR_CHECK'] = { type: 'bdsp__con_have_contest_star_check', args: 0 };
Blockly.Blocks['bdsp__con_have_contest_star_check'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_HAVE_CONTEST_STAR_CHECK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_have_contest_star_check'] = function(block) {
  var code = '_CON_HAVE_CONTEST_STAR_CHECK(';
  code += ')\n';
  return code;
};
commandMap['_CON_HAVE_RIBBON_CHECK'] = { type: 'bdsp__con_have_ribbon_check', args: 0 };
Blockly.Blocks['bdsp__con_have_ribbon_check'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_HAVE_RIBBON_CHECK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_have_ribbon_check'] = function(block) {
  var code = '_CON_HAVE_RIBBON_CHECK(';
  code += ')\n';
  return code;
};
commandMap['_CON_HBLANK_START'] = { type: 'bdsp__con_hblank_start', args: 0 };
Blockly.Blocks['bdsp__con_hblank_start'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_HBLANK_START');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_hblank_start'] = function(block) {
  var code = '_CON_HBLANK_START(';
  code += ')\n';
  return code;
};
commandMap['_CON_HBLANK_STOP'] = { type: 'bdsp__con_hblank_stop', args: 0 };
Blockly.Blocks['bdsp__con_hblank_stop'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_HBLANK_STOP');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_hblank_stop'] = function(block) {
  var code = '_CON_HBLANK_STOP(';
  code += ')\n';
  return code;
};
commandMap['_CON_HERO_CHANGE'] = { type: 'bdsp__con_hero_change', args: 0 };
Blockly.Blocks['bdsp__con_hero_change'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_HERO_CHANGE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_hero_change'] = function(block) {
  var code = '_CON_HERO_CHANGE(';
  code += ')\n';
  return code;
};
commandMap['_CON_JUDGE_NAME_GET'] = { type: 'bdsp__con_judge_name_get', args: 0 };
Blockly.Blocks['bdsp__con_judge_name_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_JUDGE_NAME_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_judge_name_get'] = function(block) {
  var code = '_CON_JUDGE_NAME_GET(';
  code += ')\n';
  return code;
};
commandMap['_CON_MSGPRINT_FLAG_RESET'] = { type: 'bdsp__con_msgprint_flag_reset', args: 0 };
Blockly.Blocks['bdsp__con_msgprint_flag_reset'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_MSGPRINT_FLAG_RESET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_msgprint_flag_reset'] = function(block) {
  var code = '_CON_MSGPRINT_FLAG_RESET(';
  code += ')\n';
  return code;
};
commandMap['_CON_MSGPRINT_FLAG_SET'] = { type: 'bdsp__con_msgprint_flag_set', args: 0 };
Blockly.Blocks['bdsp__con_msgprint_flag_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_MSGPRINT_FLAG_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_msgprint_flag_set'] = function(block) {
  var code = '_CON_MSGPRINT_FLAG_SET(';
  code += ')\n';
  return code;
};
commandMap['_CON_MY_ENTRY_NO_GET'] = { type: 'bdsp__con_my_entry_no_get', args: 0 };
Blockly.Blocks['bdsp__con_my_entry_no_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_MY_ENTRY_NO_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_my_entry_no_get'] = function(block) {
  var code = '_CON_MY_ENTRY_NO_GET(';
  code += ')\n';
  return code;
};
commandMap['_CON_MY_ENTRY_NO_WORD_SET'] = { type: 'bdsp__con_my_entry_no_word_set', args: 0 };
Blockly.Blocks['bdsp__con_my_entry_no_word_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_MY_ENTRY_NO_WORD_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_my_entry_no_word_set'] = function(block) {
  var code = '_CON_MY_ENTRY_NO_WORD_SET(';
  code += ')\n';
  return code;
};
commandMap['_CON_NICK_NAME_GET'] = { type: 'bdsp__con_nick_name_get', args: 0 };
Blockly.Blocks['bdsp__con_nick_name_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_NICK_NAME_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_nick_name_get'] = function(block) {
  var code = '_CON_NICK_NAME_GET(';
  code += ')\n';
  return code;
};
commandMap['_CON_NUM_TAG_SET'] = { type: 'bdsp__con_num_tag_set', args: 0 };
Blockly.Blocks['bdsp__con_num_tag_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_NUM_TAG_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_num_tag_set'] = function(block) {
  var code = '_CON_NUM_TAG_SET(';
  code += ')\n';
  return code;
};
commandMap['_CON_OBJ_CODE_GET'] = { type: 'bdsp__con_obj_code_get', args: 0 };
Blockly.Blocks['bdsp__con_obj_code_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_OBJ_CODE_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_obj_code_get'] = function(block) {
  var code = '_CON_OBJ_CODE_GET(';
  code += ')\n';
  return code;
};
commandMap['_CON_OPEN_BOUTIQUE_SELECT_MENU'] = { type: 'bdsp__con_open_boutique_select_menu', args: 0 };
Blockly.Blocks['bdsp__con_open_boutique_select_menu'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_OPEN_BOUTIQUE_SELECT_MENU');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_open_boutique_select_menu'] = function(block) {
  var code = '_CON_OPEN_BOUTIQUE_SELECT_MENU(';
  code += ')\n';
  return code;
};
commandMap['_CON_OPEN_CAPSULE_SELECT_MENU'] = { type: 'bdsp__con_open_capsule_select_menu', args: 0 };
Blockly.Blocks['bdsp__con_open_capsule_select_menu'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_OPEN_CAPSULE_SELECT_MENU');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_open_capsule_select_menu'] = function(block) {
  var code = '_CON_OPEN_CAPSULE_SELECT_MENU(';
  code += ')\n';
  return code;
};
commandMap['_CON_OPEN_MATCHING_MENU'] = { type: 'bdsp__con_open_matching_menu', args: 0 };
Blockly.Blocks['bdsp__con_open_matching_menu'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_OPEN_MATCHING_MENU');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_open_matching_menu'] = function(block) {
  var code = '_CON_OPEN_MATCHING_MENU(';
  code += ')\n';
  return code;
};
commandMap['_CON_OPEN_POKE_SELECT_MENU'] = { type: 'bdsp__con_open_poke_select_menu', args: 0 };
Blockly.Blocks['bdsp__con_open_poke_select_menu'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_OPEN_POKE_SELECT_MENU');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_open_poke_select_menu'] = function(block) {
  var code = '_CON_OPEN_POKE_SELECT_MENU(';
  code += ')\n';
  return code;
};
commandMap['_CON_OPEN_RESUME_MATCHING_MENU'] = { type: 'bdsp__con_open_resume_matching_menu', args: 0 };
Blockly.Blocks['bdsp__con_open_resume_matching_menu'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_OPEN_RESUME_MATCHING_MENU');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_open_resume_matching_menu'] = function(block) {
  var code = '_CON_OPEN_RESUME_MATCHING_MENU(';
  code += ')\n';
  return code;
};
commandMap['_CON_POKELIST_GET_RESULT'] = { type: 'bdsp__con_pokelist_get_result', args: 0 };
Blockly.Blocks['bdsp__con_pokelist_get_result'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_POKELIST_GET_RESULT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__con_pokelist_get_result'] = function(block) {
  var code = '_CON_POKELIST_GET_RESULT(';
  code += ')\n';
  return code;
};
commandMap['_CON_POKELIST_SET_PROC'] = { type: 'bdsp__con_pokelist_set_proc', args: 0 };
Blockly.Blocks['bdsp__con_pokelist_set_proc'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_POKELIST_SET_PROC');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__con_pokelist_set_proc'] = function(block) {
  var code = '_CON_POKELIST_SET_PROC(';
  code += ')\n';
  return code;
};
commandMap['_CON_POKESTATUS_SET_PROC'] = { type: 'bdsp__con_pokestatus_set_proc', args: 0 };
Blockly.Blocks['bdsp__con_pokestatus_set_proc'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_POKESTATUS_SET_PROC');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__con_pokestatus_set_proc'] = function(block) {
  var code = '_CON_POKESTATUS_SET_PROC(';
  code += ')\n';
  return code;
};
commandMap['_CON_POPULARITY_GET'] = { type: 'bdsp__con_popularity_get', args: 0 };
Blockly.Blocks['bdsp__con_popularity_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_POPULARITY_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_popularity_get'] = function(block) {
  var code = '_CON_POPULARITY_GET(';
  code += ')\n';
  return code;
};
commandMap['_CON_RANKING_CHECK'] = { type: 'bdsp__con_ranking_check', args: 0 };
Blockly.Blocks['bdsp__con_ranking_check'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_RANKING_CHECK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_ranking_check'] = function(block) {
  var code = '_CON_RANKING_CHECK(';
  code += ')\n';
  return code;
};
commandMap['_CON_RANK_NAME'] = { type: 'bdsp__con_rank_name', args: 0 };
Blockly.Blocks['bdsp__con_rank_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_RANK_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_rank_name'] = function(block) {
  var code = '_CON_RANK_NAME(';
  code += ')\n';
  return code;
};
commandMap['_CON_RANK_NAME_GET'] = { type: 'bdsp__con_rank_name_get', args: 0 };
Blockly.Blocks['bdsp__con_rank_name_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_RANK_NAME_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_rank_name_get'] = function(block) {
  var code = '_CON_RANK_NAME_GET(';
  code += ')\n';
  return code;
};
commandMap['_CON_RANK_SET'] = { type: 'bdsp__con_rank_set', args: 0 };
Blockly.Blocks['bdsp__con_rank_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_RANK_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_rank_set'] = function(block) {
  var code = '_CON_RANK_SET(';
  code += ')\n';
  return code;
};
commandMap['_CON_RECORD_DISP'] = { type: 'bdsp__con_record_disp', args: 0 };
Blockly.Blocks['bdsp__con_record_disp'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_RECORD_DISP');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_record_disp'] = function(block) {
  var code = '_CON_RECORD_DISP(';
  code += ')\n';
  return code;
};
commandMap['_CON_RESET_PARAMETER'] = { type: 'bdsp__con_reset_parameter', args: 0 };
Blockly.Blocks['bdsp__con_reset_parameter'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_RESET_PARAMETER');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_reset_parameter'] = function(block) {
  var code = '_CON_RESET_PARAMETER(';
  code += ')\n';
  return code;
};
commandMap['_CON_REWARD_NAME_SET'] = { type: 'bdsp__con_reward_name_set', args: 0 };
Blockly.Blocks['bdsp__con_reward_name_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_REWARD_NAME_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_reward_name_set'] = function(block) {
  var code = '_CON_REWARD_NAME_SET(';
  code += ')\n';
  return code;
};
commandMap['_CON_REWARD_SHOWMASTER_NAME_SET'] = { type: 'bdsp__con_reward_showmaster_name_set', args: 0 };
Blockly.Blocks['bdsp__con_reward_showmaster_name_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_REWARD_SHOWMASTER_NAME_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_reward_showmaster_name_set'] = function(block) {
  var code = '_CON_REWARD_SHOWMASTER_NAME_SET(';
  code += ')\n';
  return code;
};
commandMap['_CON_RIBBON_NAME_GET'] = { type: 'bdsp__con_ribbon_name_get', args: 0 };
Blockly.Blocks['bdsp__con_ribbon_name_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_RIBBON_NAME_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_ribbon_name_get'] = function(block) {
  var code = '_CON_RIBBON_NAME_GET(';
  code += ')\n';
  return code;
};
commandMap['_CON_SELECT_MULTI_MODE'] = { type: 'bdsp__con_select_multi_mode', args: 0 };
Blockly.Blocks['bdsp__con_select_multi_mode'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_SELECT_MULTI_MODE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_select_multi_mode'] = function(block) {
  var code = '_CON_SELECT_MULTI_MODE(';
  code += ')\n';
  return code;
};
commandMap['_CON_SELECT_SINGLE_MODE'] = { type: 'bdsp__con_select_single_mode', args: 0 };
Blockly.Blocks['bdsp__con_select_single_mode'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_SELECT_SINGLE_MODE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_select_single_mode'] = function(block) {
  var code = '_CON_SELECT_SINGLE_MODE(';
  code += ')\n';
  return code;
};
commandMap['_CON_SIO_PARAM_INIT_SET'] = { type: 'bdsp__con_sio_param_init_set', args: 0 };
Blockly.Blocks['bdsp__con_sio_param_init_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_SIO_PARAM_INIT_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_sio_param_init_set'] = function(block) {
  var code = '_CON_SIO_PARAM_INIT_SET(';
  code += ')\n';
  return code;
};
commandMap['_CON_SYSTEM_CREATE'] = { type: 'bdsp__con_system_create', args: 0 };
Blockly.Blocks['bdsp__con_system_create'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_SYSTEM_CREATE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_system_create'] = function(block) {
  var code = '_CON_SYSTEM_CREATE(';
  code += ')\n';
  return code;
};
commandMap['_CON_SYSTEM_EXIT'] = { type: 'bdsp__con_system_exit', args: 0 };
Blockly.Blocks['bdsp__con_system_exit'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_SYSTEM_EXIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_system_exit'] = function(block) {
  var code = '_CON_SYSTEM_EXIT(';
  code += ')\n';
  return code;
};
commandMap['_CON_TWINKLE_STAR_NAME_SET'] = { type: 'bdsp__con_twinkle_star_name_set', args: 0 };
Blockly.Blocks['bdsp__con_twinkle_star_name_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_TWINKLE_STAR_NAME_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_twinkle_star_name_set'] = function(block) {
  var code = '_CON_TWINKLE_STAR_NAME_SET(';
  code += ')\n';
  return code;
};
commandMap['_CON_TYPE_NAME_GET'] = { type: 'bdsp__con_type_name_get', args: 0 };
Blockly.Blocks['bdsp__con_type_name_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_TYPE_NAME_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_type_name_get'] = function(block) {
  var code = '_CON_TYPE_NAME_GET(';
  code += ')\n';
  return code;
};
commandMap['_CON_VICTORY_BREEDER_NAME_GET'] = { type: 'bdsp__con_victory_breeder_name_get', args: 0 };
Blockly.Blocks['bdsp__con_victory_breeder_name_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_VICTORY_BREEDER_NAME_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_victory_breeder_name_get'] = function(block) {
  var code = '_CON_VICTORY_BREEDER_NAME_GET(';
  code += ')\n';
  return code;
};
commandMap['_CON_VICTORY_ENTRY_NO_GET'] = { type: 'bdsp__con_victory_entry_no_get', args: 0 };
Blockly.Blocks['bdsp__con_victory_entry_no_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_VICTORY_ENTRY_NO_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_victory_entry_no_get'] = function(block) {
  var code = '_CON_VICTORY_ENTRY_NO_GET(';
  code += ')\n';
  return code;
};
commandMap['_CON_VICTORY_ITEM_NO_GET'] = { type: 'bdsp__con_victory_item_no_get', args: 0 };
Blockly.Blocks['bdsp__con_victory_item_no_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_VICTORY_ITEM_NO_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_victory_item_no_get'] = function(block) {
  var code = '_CON_VICTORY_ITEM_NO_GET(';
  code += ')\n';
  return code;
};
commandMap['_CON_VICTORY_NICK_NAME_GET'] = { type: 'bdsp__con_victory_nick_name_get', args: 0 };
Blockly.Blocks['bdsp__con_victory_nick_name_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_VICTORY_NICK_NAME_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_victory_nick_name_get'] = function(block) {
  var code = '_CON_VICTORY_NICK_NAME_GET(';
  code += ')\n';
  return code;
};
commandMap['_CON_WAIT_CONTEST_MENU'] = { type: 'bdsp__con_wait_contest_menu', args: 0 };
Blockly.Blocks['bdsp__con_wait_contest_menu'] = {
  init: function() {
    this.appendDummyInput().appendField('_CON_WAIT_CONTEST_MENU');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__con_wait_contest_menu'] = function(block) {
  var code = '_CON_WAIT_CONTEST_MENU(';
  code += ')\n';
  return code;
};
commandMap['_COUNT_MONSBOX_SPACE'] = { type: 'bdsp__count_monsbox_space', args: 0 };
Blockly.Blocks['bdsp__count_monsbox_space'] = {
  init: function() {
    this.appendDummyInput().appendField('_COUNT_MONSBOX_SPACE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__count_monsbox_space'] = function(block) {
  var code = '_COUNT_MONSBOX_SPACE(';
  code += ')\n';
  return code;
};
commandMap['_CP_ADR_ADR'] = { type: 'bdsp__cp_adr_adr', args: 0 };
Blockly.Blocks['bdsp__cp_adr_adr'] = {
  init: function() {
    this.appendDummyInput().appendField('_CP_ADR_ADR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__cp_adr_adr'] = function(block) {
  var code = '_CP_ADR_ADR(';
  code += ')\n';
  return code;
};
commandMap['_CP_ADR_REG'] = { type: 'bdsp__cp_adr_reg', args: 0 };
Blockly.Blocks['bdsp__cp_adr_reg'] = {
  init: function() {
    this.appendDummyInput().appendField('_CP_ADR_REG');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__cp_adr_reg'] = function(block) {
  var code = '_CP_ADR_REG(';
  code += ')\n';
  return code;
};
commandMap['_CP_ADR_VAL'] = { type: 'bdsp__cp_adr_val', args: 0 };
Blockly.Blocks['bdsp__cp_adr_val'] = {
  init: function() {
    this.appendDummyInput().appendField('_CP_ADR_VAL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__cp_adr_val'] = function(block) {
  var code = '_CP_ADR_VAL(';
  code += ')\n';
  return code;
};
commandMap['_CP_REG_ADR'] = { type: 'bdsp__cp_reg_adr', args: 0 };
Blockly.Blocks['bdsp__cp_reg_adr'] = {
  init: function() {
    this.appendDummyInput().appendField('_CP_REG_ADR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__cp_reg_adr'] = function(block) {
  var code = '_CP_REG_ADR(';
  code += ')\n';
  return code;
};
commandMap['_CP_REG_REG'] = { type: 'bdsp__cp_reg_reg', args: 0 };
Blockly.Blocks['bdsp__cp_reg_reg'] = {
  init: function() {
    this.appendDummyInput().appendField('_CP_REG_REG');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__cp_reg_reg'] = function(block) {
  var code = '_CP_REG_REG(';
  code += ')\n';
  return code;
};
commandMap['_CP_REG_VAL'] = { type: 'bdsp__cp_reg_val', args: 0 };
Blockly.Blocks['bdsp__cp_reg_val'] = {
  init: function() {
    this.appendDummyInput().appendField('_CP_REG_VAL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__cp_reg_val'] = function(block) {
  var code = '_CP_REG_VAL(';
  code += ')\n';
  return code;
};
commandMap['_CREATE_HYOUTA'] = { type: 'bdsp__create_hyouta', args: 0 };
Blockly.Blocks['bdsp__create_hyouta'] = {
  init: function() {
    this.appendDummyInput().appendField('_CREATE_HYOUTA');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__create_hyouta'] = function(block) {
  var code = '_CREATE_HYOUTA(';
  code += ')\n';
  return code;
};
commandMap['_CTRL_BGM_FLAG_RESET'] = { type: 'bdsp__ctrl_bgm_flag_reset', args: 0 };
Blockly.Blocks['bdsp__ctrl_bgm_flag_reset'] = {
  init: function() {
    this.appendDummyInput().appendField('_CTRL_BGM_FLAG_RESET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unknown use. Only used once during the Spear Pillar cutscenes.");
  }
};
Blockly.JavaScript['bdsp__ctrl_bgm_flag_reset'] = function(block) {
  var code = '_CTRL_BGM_FLAG_RESET(';
  code += ')\n';
  return code;
};
commandMap['_CTRL_BGM_FLAG_SET'] = { type: 'bdsp__ctrl_bgm_flag_set', args: 0 };
Blockly.Blocks['bdsp__ctrl_bgm_flag_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_CTRL_BGM_FLAG_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__ctrl_bgm_flag_set'] = function(block) {
  var code = '_CTRL_BGM_FLAG_SET(';
  code += ')\n';
  return code;
};
commandMap['_CUSTOM_BALL_EVENT_CALL'] = { type: 'bdsp__custom_ball_event_call', args: 0 };
Blockly.Blocks['bdsp__custom_ball_event_call'] = {
  init: function() {
    this.appendDummyInput().appendField('_CUSTOM_BALL_EVENT_CALL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Opens the Ball Capsule menu.");
  }
};
Blockly.JavaScript['bdsp__custom_ball_event_call'] = function(block) {
  var code = '_CUSTOM_BALL_EVENT_CALL(';
  code += ')\n';
  return code;
};
commandMap['_CUSTOM_BALL_NUM_ADD'] = { type: 'bdsp__custom_ball_num_add', args: 0 };
Blockly.Blocks['bdsp__custom_ball_num_add'] = {
  init: function() {
    this.appendDummyInput().appendField('_CUSTOM_BALL_NUM_ADD');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__custom_ball_num_add'] = function(block) {
  var code = '_CUSTOM_BALL_NUM_ADD(';
  code += ')\n';
  return code;
};
commandMap['_CUSTOM_BALL_TRAINER_COPY_OPEN'] = { type: 'bdsp__custom_ball_trainer_copy_open', args: 0 };
Blockly.Blocks['bdsp__custom_ball_trainer_copy_open'] = {
  init: function() {
    this.appendDummyInput().appendField('_CUSTOM_BALL_TRAINER_COPY_OPEN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__custom_ball_trainer_copy_open'] = function(block) {
  var code = '_CUSTOM_BALL_TRAINER_COPY_OPEN(';
  code += ')\n';
  return code;
};
commandMap['_CUSTOM_BALL_TRAINER_PAGE'] = { type: 'bdsp__custom_ball_trainer_page', args: 0 };
Blockly.Blocks['bdsp__custom_ball_trainer_page'] = {
  init: function() {
    this.appendDummyInput().appendField('_CUSTOM_BALL_TRAINER_PAGE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__custom_ball_trainer_page'] = function(block) {
  var code = '_CUSTOM_BALL_TRAINER_PAGE(';
  code += ')\n';
  return code;
};
commandMap['_CUSTOM_BALL_TRAINER_PAGE_WAIT'] = { type: 'bdsp__custom_ball_trainer_page_wait', args: 0 };
Blockly.Blocks['bdsp__custom_ball_trainer_page_wait'] = {
  init: function() {
    this.appendDummyInput().appendField('_CUSTOM_BALL_TRAINER_PAGE_WAIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__custom_ball_trainer_page_wait'] = function(block) {
  var code = '_CUSTOM_BALL_TRAINER_PAGE_WAIT(';
  code += ')\n';
  return code;
};
commandMap['_CUTIN'] = { type: 'bdsp__cutin', args: 0 };
Blockly.Blocks['bdsp__cutin'] = {
  init: function() {
    this.appendDummyInput().appendField('_CUTIN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__cutin'] = function(block) {
  var code = '_CUTIN(';
  code += ')\n';
  return code;
};
commandMap['_CYCLING_ROAD_SET'] = { type: 'bdsp__cycling_road_set', args: 0 };
Blockly.Blocks['bdsp__cycling_road_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_CYCLING_ROAD_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__cycling_road_set'] = function(block) {
  var code = '_CYCLING_ROAD_SET(';
  code += ')\n';
  return code;
};
commandMap['_D17SYSTEM_MAP_SELECT'] = { type: 'bdsp__d17system_map_select', args: 0 };
Blockly.Blocks['bdsp__d17system_map_select'] = {
  init: function() {
    this.appendDummyInput().appendField('_D17SYSTEM_MAP_SELECT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__d17system_map_select'] = function(block) {
  var code = '_D17SYSTEM_MAP_SELECT(';
  code += ')\n';
  return code;
};
commandMap['_D20R0106_LEGEND_IS_UNSEAL'] = { type: 'bdsp__d20r0106_legend_is_unseal', args: 0 };
Blockly.Blocks['bdsp__d20r0106_legend_is_unseal'] = {
  init: function() {
    this.appendDummyInput().appendField('_D20R0106_LEGEND_IS_UNSEAL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__d20r0106_legend_is_unseal'] = function(block) {
  var code = '_D20R0106_LEGEND_IS_UNSEAL(';
  code += ')\n';
  return code;
};
commandMap['_DAME_TAMAGO_CHK_ALL'] = { type: 'bdsp__dame_tamago_chk_all', args: 0 };
Blockly.Blocks['bdsp__dame_tamago_chk_all'] = {
  init: function() {
    this.appendDummyInput().appendField('_DAME_TAMAGO_CHK_ALL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__dame_tamago_chk_all'] = function(block) {
  var code = '_DAME_TAMAGO_CHK_ALL(';
  code += ')\n';
  return code;
};
commandMap['_DARKNESS_TEMPORARILY_OFF'] = { type: 'bdsp__darkness_temporarily_off', args: 0 };
Blockly.Blocks['bdsp__darkness_temporarily_off'] = {
  init: function() {
    this.appendDummyInput().appendField('_DARKNESS_TEMPORARILY_OFF');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__darkness_temporarily_off'] = function(block) {
  var code = '_DARKNESS_TEMPORARILY_OFF(';
  code += ')\n';
  return code;
};
commandMap['_DARKNESS_TEMPORARILY_ON'] = { type: 'bdsp__darkness_temporarily_on', args: 0 };
Blockly.Blocks['bdsp__darkness_temporarily_on'] = {
  init: function() {
    this.appendDummyInput().appendField('_DARKNESS_TEMPORARILY_ON');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__darkness_temporarily_on'] = function(block) {
  var code = '_DARKNESS_TEMPORARILY_ON(';
  code += ')\n';
  return code;
};
commandMap['_DEBUG_BTL_SET'] = { type: 'bdsp__debug_btl_set', args: 0 };
Blockly.Blocks['bdsp__debug_btl_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_DEBUG_BTL_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__debug_btl_set'] = function(block) {
  var code = '_DEBUG_BTL_SET(';
  code += ')\n';
  return code;
};
commandMap['_DEBUG_CHILD_WIN'] = { type: 'bdsp__debug_child_win', args: 0 };
Blockly.Blocks['bdsp__debug_child_win'] = {
  init: function() {
    this.appendDummyInput().appendField('_DEBUG_CHILD_WIN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__debug_child_win'] = function(block) {
  var code = '_DEBUG_CHILD_WIN(';
  code += ')\n';
  return code;
};
commandMap['_DEBUG_PARENT_WIN'] = { type: 'bdsp__debug_parent_win', args: 0 };
Blockly.Blocks['bdsp__debug_parent_win'] = {
  init: function() {
    this.appendDummyInput().appendField('_DEBUG_PARENT_WIN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__debug_parent_win'] = function(block) {
  var code = '_DEBUG_PARENT_WIN(';
  code += ')\n';
  return code;
};
commandMap['_DEBUG_PRINT'] = { type: 'bdsp__debug_print', args: 0 };
Blockly.Blocks['bdsp__debug_print'] = {
  init: function() {
    this.appendDummyInput().appendField('_DEBUG_PRINT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__debug_print'] = function(block) {
  var code = '_DEBUG_PRINT(';
  code += ')\n';
  return code;
};
commandMap['_DEBUG_PRINT_FLAG'] = { type: 'bdsp__debug_print_flag', args: 0 };
Blockly.Blocks['bdsp__debug_print_flag'] = {
  init: function() {
    this.appendDummyInput().appendField('_DEBUG_PRINT_FLAG');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__debug_print_flag'] = function(block) {
  var code = '_DEBUG_PRINT_FLAG(';
  code += ')\n';
  return code;
};
commandMap['_DEBUG_PRINT_FLAG_STATIONED'] = { type: 'bdsp__debug_print_flag_stationed', args: 0 };
Blockly.Blocks['bdsp__debug_print_flag_stationed'] = {
  init: function() {
    this.appendDummyInput().appendField('_DEBUG_PRINT_FLAG_STATIONED');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__debug_print_flag_stationed'] = function(block) {
  var code = '_DEBUG_PRINT_FLAG_STATIONED(';
  code += ')\n';
  return code;
};
commandMap['_DEBUG_PRINT_WORK'] = { type: 'bdsp__debug_print_work', args: 0 };
Blockly.Blocks['bdsp__debug_print_work'] = {
  init: function() {
    this.appendDummyInput().appendField('_DEBUG_PRINT_WORK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__debug_print_work'] = function(block) {
  var code = '_DEBUG_PRINT_WORK(';
  code += ')\n';
  return code;
};
commandMap['_DEBUG_PRINT_WORK_STATIONED'] = { type: 'bdsp__debug_print_work_stationed', args: 0 };
Blockly.Blocks['bdsp__debug_print_work_stationed'] = {
  init: function() {
    this.appendDummyInput().appendField('_DEBUG_PRINT_WORK_STATIONED');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__debug_print_work_stationed'] = function(block) {
  var code = '_DEBUG_PRINT_WORK_STATIONED(';
  code += ')\n';
  return code;
};
commandMap['_DEBUG_RESET_WORK'] = { type: 'bdsp__debug_reset_work', args: 0 };
Blockly.Blocks['bdsp__debug_reset_work'] = {
  init: function() {
    this.appendDummyInput().appendField('_DEBUG_RESET_WORK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__debug_reset_work'] = function(block) {
  var code = '_DEBUG_RESET_WORK(';
  code += ')\n';
  return code;
};
commandMap['_DEBUG_SIO_CONTEST'] = { type: 'bdsp__debug_sio_contest', args: 0 };
Blockly.Blocks['bdsp__debug_sio_contest'] = {
  init: function() {
    this.appendDummyInput().appendField('_DEBUG_SIO_CONTEST');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__debug_sio_contest'] = function(block) {
  var code = '_DEBUG_SIO_CONTEST(';
  code += ')\n';
  return code;
};
commandMap['_DEBUG_SIO_ENCOUNT'] = { type: 'bdsp__debug_sio_encount', args: 0 };
Blockly.Blocks['bdsp__debug_sio_encount'] = {
  init: function() {
    this.appendDummyInput().appendField('_DEBUG_SIO_ENCOUNT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__debug_sio_encount'] = function(block) {
  var code = '_DEBUG_SIO_ENCOUNT(';
  code += ')\n';
  return code;
};
commandMap['_DEBUG_TRAINER_FLAG_ON_JUMP'] = { type: 'bdsp__debug_trainer_flag_on_jump', args: 0 };
Blockly.Blocks['bdsp__debug_trainer_flag_on_jump'] = {
  init: function() {
    this.appendDummyInput().appendField('_DEBUG_TRAINER_FLAG_ON_JUMP');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__debug_trainer_flag_on_jump'] = function(block) {
  var code = '_DEBUG_TRAINER_FLAG_ON_JUMP(';
  code += ')\n';
  return code;
};
commandMap['_DEBUG_TRAINER_FLAG_SET'] = { type: 'bdsp__debug_trainer_flag_set', args: 0 };
Blockly.Blocks['bdsp__debug_trainer_flag_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_DEBUG_TRAINER_FLAG_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__debug_trainer_flag_set'] = function(block) {
  var code = '_DEBUG_TRAINER_FLAG_SET(';
  code += ')\n';
  return code;
};
commandMap['_DEBUG_TR_TALK_BTL'] = { type: 'bdsp__debug_tr_talk_btl', args: 0 };
Blockly.Blocks['bdsp__debug_tr_talk_btl'] = {
  init: function() {
    this.appendDummyInput().appendField('_DEBUG_TR_TALK_BTL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__debug_tr_talk_btl'] = function(block) {
  var code = '_DEBUG_TR_TALK_BTL(';
  code += ')\n';
  return code;
};
commandMap['_DEBUG_WATCH_WORK'] = { type: 'bdsp__debug_watch_work', args: 1 };
Blockly.Blocks['bdsp__debug_watch_work'] = {
  init: function() {
    this.appendDummyInput().appendField('_DEBUG_WATCH_WORK');
    this.appendValueInput('ARG_0').appendField('Work');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unknown use.");
  }
};
Blockly.JavaScript['bdsp__debug_watch_work'] = function(block) {
  var code = '_DEBUG_WATCH_WORK(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_DEL_SODATEYA_EGG'] = { type: 'bdsp__del_sodateya_egg', args: 0 };
Blockly.Blocks['bdsp__del_sodateya_egg'] = {
  init: function() {
    this.appendDummyInput().appendField('_DEL_SODATEYA_EGG');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__del_sodateya_egg'] = function(block) {
  var code = '_DEL_SODATEYA_EGG(';
  code += ')\n';
  return code;
};
commandMap['_DEL_WAITICON'] = { type: 'bdsp__del_waiticon', args: 0 };
Blockly.Blocks['bdsp__del_waiticon'] = {
  init: function() {
    this.appendDummyInput().appendField('_DEL_WAITICON');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unknown use.");
  }
};
Blockly.JavaScript['bdsp__del_waiticon'] = function(block) {
  var code = '_DEL_WAITICON(';
  code += ')\n';
  return code;
};
commandMap['_DENDOU_BALL_ANM'] = { type: 'bdsp__dendou_ball_anm', args: 0 };
Blockly.Blocks['bdsp__dendou_ball_anm'] = {
  init: function() {
    this.appendDummyInput().appendField('_DENDOU_BALL_ANM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__dendou_ball_anm'] = function(block) {
  var code = '_DENDOU_BALL_ANM(';
  code += ')\n';
  return code;
};
commandMap['_DENDOU_NUM_GET'] = { type: 'bdsp__dendou_num_get', args: 1 };
Blockly.Blocks['bdsp__dendou_num_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_DENDOU_NUM_GET');
    this.appendValueInput('ARG_0').appendField('Work');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Gets the amount of times the player has entered the Hall of Fame.");
  }
};
Blockly.JavaScript['bdsp__dendou_num_get'] = function(block) {
  var code = '_DENDOU_NUM_GET(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_DENDOU_NUM_SET'] = { type: 'bdsp__dendou_num_set', args: 0 };
Blockly.Blocks['bdsp__dendou_num_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_DENDOU_NUM_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__dendou_num_set'] = function(block) {
  var code = '_DENDOU_NUM_SET(';
  code += ')\n';
  return code;
};
commandMap['_DENDOU_SET_PROC'] = { type: 'bdsp__dendou_set_proc', args: 0 };
Blockly.Blocks['bdsp__dendou_set_proc'] = {
  init: function() {
    this.appendDummyInput().appendField('_DENDOU_SET_PROC');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Adds an entry to Hall of Fame.");
  }
};
Blockly.JavaScript['bdsp__dendou_set_proc'] = function(block) {
  var code = '_DENDOU_SET_PROC(';
  code += ')\n';
  return code;
};
commandMap['_DISPLAY_MESSAGE'] = { type: 'bdsp__display_message', args: 0 };
Blockly.Blocks['bdsp__display_message'] = {
  init: function() {
    this.appendDummyInput().appendField('_DISPLAY_MESSAGE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__display_message'] = function(block) {
  var code = '_DISPLAY_MESSAGE(';
  code += ')\n';
  return code;
};
commandMap['_DISPLAY_MESSAGE_CLOSE'] = { type: 'bdsp__display_message_close', args: 0 };
Blockly.Blocks['bdsp__display_message_close'] = {
  init: function() {
    this.appendDummyInput().appendField('_DISPLAY_MESSAGE_CLOSE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__display_message_close'] = function(block) {
  var code = '_DISPLAY_MESSAGE_CLOSE(';
  code += ')\n';
  return code;
};
commandMap['_DOF_CHANGE_TARGET_POS'] = { type: 'bdsp__dof_change_target_pos', args: 0 };
Blockly.Blocks['bdsp__dof_change_target_pos'] = {
  init: function() {
    this.appendDummyInput().appendField('_DOF_CHANGE_TARGET_POS');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__dof_change_target_pos'] = function(block) {
  var code = '_DOF_CHANGE_TARGET_POS(';
  code += ')\n';
  return code;
};
commandMap['_DOF_FAR_DEPTH'] = { type: 'bdsp__dof_far_depth', args: 0 };
Blockly.Blocks['bdsp__dof_far_depth'] = {
  init: function() {
    this.appendDummyInput().appendField('_DOF_FAR_DEPTH');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__dof_far_depth'] = function(block) {
  var code = '_DOF_FAR_DEPTH(';
  code += ')\n';
  return code;
};
commandMap['_DOF_RESET_TARGET_POS'] = { type: 'bdsp__dof_reset_target_pos', args: 0 };
Blockly.Blocks['bdsp__dof_reset_target_pos'] = {
  init: function() {
    this.appendDummyInput().appendField('_DOF_RESET_TARGET_POS');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__dof_reset_target_pos'] = function(block) {
  var code = '_DOF_RESET_TARGET_POS(';
  code += ')\n';
  return code;
};
commandMap['_DOOR_ENABLE_SET'] = { type: 'bdsp__door_enable_set', args: 0 };
Blockly.Blocks['bdsp__door_enable_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_DOOR_ENABLE_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__door_enable_set'] = function(block) {
  var code = '_DOOR_ENABLE_SET(';
  code += ')\n';
  return code;
};
commandMap['_DOOR_FORCE_ANIME_END'] = { type: 'bdsp__door_force_anime_end', args: 0 };
Blockly.Blocks['bdsp__door_force_anime_end'] = {
  init: function() {
    this.appendDummyInput().appendField('_DOOR_FORCE_ANIME_END');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__door_force_anime_end'] = function(block) {
  var code = '_DOOR_FORCE_ANIME_END(';
  code += ')\n';
  return code;
};
commandMap['_DOOR_TRANSITION_ZONE_SET'] = { type: 'bdsp__door_transition_zone_set', args: 0 };
Blockly.Blocks['bdsp__door_transition_zone_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_DOOR_TRANSITION_ZONE_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__door_transition_zone_set'] = function(block) {
  var code = '_DOOR_TRANSITION_ZONE_SET(';
  code += ')\n';
  return code;
};
commandMap['_DPR_SHOP_OPEN'] = { type: 'bdsp__dpr_shop_open', args: 0 };
Blockly.Blocks['bdsp__dpr_shop_open'] = {
  init: function() {
    this.appendDummyInput().appendField('_DPR_SHOP_OPEN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__dpr_shop_open'] = function(block) {
  var code = '_DPR_SHOP_OPEN(';
  code += ')\n';
  return code;
};
commandMap['_DPR_SHOP_OPEN_WAIT'] = { type: 'bdsp__dpr_shop_open_wait', args: 0 };
Blockly.Blocks['bdsp__dpr_shop_open_wait'] = {
  init: function() {
    this.appendDummyInput().appendField('_DPR_SHOP_OPEN_WAIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__dpr_shop_open_wait'] = function(block) {
  var code = '_DPR_SHOP_OPEN_WAIT(';
  code += ')\n';
  return code;
};
commandMap['_DPW_INIT_PROC'] = { type: 'bdsp__dpw_init_proc', args: 0 };
Blockly.Blocks['bdsp__dpw_init_proc'] = {
  init: function() {
    this.appendDummyInput().appendField('_DPW_INIT_PROC');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__dpw_init_proc'] = function(block) {
  var code = '_DPW_INIT_PROC(';
  code += ')\n';
  return code;
};
commandMap['_DRESSING_IMC_ACCE_CHECK'] = { type: 'bdsp__dressing_imc_acce_check', args: 0 };
Blockly.Blocks['bdsp__dressing_imc_acce_check'] = {
  init: function() {
    this.appendDummyInput().appendField('_DRESSING_IMC_ACCE_CHECK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__dressing_imc_acce_check'] = function(block) {
  var code = '_DRESSING_IMC_ACCE_CHECK(';
  code += ')\n';
  return code;
};
commandMap['_DRESS_NAME'] = { type: 'bdsp__dress_name', args: 0 };
Blockly.Blocks['bdsp__dress_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_DRESS_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__dress_name'] = function(block) {
  var code = '_DRESS_NAME(';
  code += ')\n';
  return code;
};
commandMap['_DUMMY'] = { type: 'bdsp__dummy', args: 0 };
Blockly.Blocks['bdsp__dummy'] = {
  init: function() {
    this.appendDummyInput().appendField('_DUMMY');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused. Does nothing.");
  }
};
Blockly.JavaScript['bdsp__dummy'] = function(block) {
  var code = '_DUMMY(';
  code += ')\n';
  return code;
};
commandMap['_DUMMY_ANIME'] = { type: 'bdsp__dummy_anime', args: 0 };
Blockly.Blocks['bdsp__dummy_anime'] = {
  init: function() {
    this.appendDummyInput().appendField('_DUMMY_ANIME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__dummy_anime'] = function(block) {
  var code = '_DUMMY_ANIME(';
  code += ')\n';
  return code;
};
commandMap['_DUMMY_ANIME_WAIT'] = { type: 'bdsp__dummy_anime_wait', args: 0 };
Blockly.Blocks['bdsp__dummy_anime_wait'] = {
  init: function() {
    this.appendDummyInput().appendField('_DUMMY_ANIME_WAIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__dummy_anime_wait'] = function(block) {
  var code = '_DUMMY_ANIME_WAIT(';
  code += ')\n';
  return code;
};
commandMap['_DUMMY_SET_POS'] = { type: 'bdsp__dummy_set_pos', args: 0 };
Blockly.Blocks['bdsp__dummy_set_pos'] = {
  init: function() {
    this.appendDummyInput().appendField('_DUMMY_SET_POS');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__dummy_set_pos'] = function(block) {
  var code = '_DUMMY_SET_POS(';
  code += ')\n';
  return code;
};
commandMap['_DUMMY_SET_POS_HERO'] = { type: 'bdsp__dummy_set_pos_hero', args: 0 };
Blockly.Blocks['bdsp__dummy_set_pos_hero'] = {
  init: function() {
    this.appendDummyInput().appendField('_DUMMY_SET_POS_HERO');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__dummy_set_pos_hero'] = function(block) {
  var code = '_DUMMY_SET_POS_HERO(';
  code += ')\n';
  return code;
};
commandMap['_EASY_BOARD_MSG'] = { type: 'bdsp__easy_board_msg', args: 4 };
Blockly.Blocks['bdsp__easy_board_msg'] = {
  init: function() {
    this.appendDummyInput().appendField('_EASY_BOARD_MSG');
    this.appendValueInput('ARG_0').appendField('Message');
    this.appendValueInput('ARG_1').appendField('Type');
    this.appendValueInput('ARG_2').appendField('Unknown');
    this.appendValueInput('ARG_3').appendField('Arrow');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Shows a sign message.");
  }
};
Blockly.JavaScript['bdsp__easy_board_msg'] = function(block) {
  var code = '_EASY_BOARD_MSG(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_3', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_EASY_INFOBOARD_MSG'] = { type: 'bdsp__easy_infoboard_msg', args: 3 };
Blockly.Blocks['bdsp__easy_infoboard_msg'] = {
  init: function() {
    this.appendDummyInput().appendField('_EASY_INFOBOARD_MSG');
    this.appendValueInput('ARG_0').appendField('Message');
    this.appendValueInput('ARG_1').appendField('Type');
    this.appendValueInput('ARG_2').appendField('Unknown');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Shows an info sign message. Mostly used for Gym signs.");
  }
};
Blockly.JavaScript['bdsp__easy_infoboard_msg'] = function(block) {
  var code = '_EASY_INFOBOARD_MSG(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_EASY_MSG'] = { type: 'bdsp__easy_msg', args: 0 };
Blockly.Blocks['bdsp__easy_msg'] = {
  init: function() {
    this.appendDummyInput().appendField('_EASY_MSG');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__easy_msg'] = function(block) {
  var code = '_EASY_MSG(';
  code += ')\n';
  return code;
};
commandMap['_EASY_OBJ_MSG'] = { type: 'bdsp__easy_obj_msg', args: 1 };
Blockly.Blocks['bdsp__easy_obj_msg'] = {
  init: function() {
    this.appendDummyInput().appendField('_EASY_OBJ_MSG');
    this.appendValueInput('ARG_0').appendField('Message');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Combines the commands _TALK_OBJ_START, _TALKMSG, _TALK_CLOSE, and _TALK_OBJ_END to show a textbox.");
  }
};
Blockly.JavaScript['bdsp__easy_obj_msg'] = function(block) {
  var code = '_EASY_OBJ_MSG(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_EASY_VOICE_MSG'] = { type: 'bdsp__easy_voice_msg', args: 3 };
Blockly.Blocks['bdsp__easy_voice_msg'] = {
  init: function() {
    this.appendDummyInput().appendField('_EASY_VOICE_MSG');
    this.appendValueInput('ARG_0').appendField('Message');
    this.appendValueInput('ARG_1').appendField('PokÃ©mon');
    this.appendValueInput('ARG_2').appendField('Unknown');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Combines multiple commands to show a textbox and play a Pok\u00c3\u00a9mon cry.");
  }
};
Blockly.JavaScript['bdsp__easy_voice_msg'] = function(block) {
  var code = '_EASY_VOICE_MSG(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_EFF_SCALE'] = { type: 'bdsp__eff_scale', args: 0 };
Blockly.Blocks['bdsp__eff_scale'] = {
  init: function() {
    this.appendDummyInput().appendField('_EFF_SCALE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__eff_scale'] = function(block) {
  var code = '_EFF_SCALE(';
  code += ')\n';
  return code;
};
commandMap['_ELEVATOR_ANM'] = { type: 'bdsp__elevator_anm', args: 0 };
Blockly.Blocks['bdsp__elevator_anm'] = {
  init: function() {
    this.appendDummyInput().appendField('_ELEVATOR_ANM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__elevator_anm'] = function(block) {
  var code = '_ELEVATOR_ANM(';
  code += ')\n';
  return code;
};
commandMap['_ELEVATOR_FLOOR_GET'] = { type: 'bdsp__elevator_floor_get', args: 0 };
Blockly.Blocks['bdsp__elevator_floor_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_ELEVATOR_FLOOR_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__elevator_floor_get'] = function(block) {
  var code = '_ELEVATOR_FLOOR_GET(';
  code += ')\n';
  return code;
};
commandMap['_ELEVATOR_FLOOR_WRITE'] = { type: 'bdsp__elevator_floor_write', args: 0 };
Blockly.Blocks['bdsp__elevator_floor_write'] = {
  init: function() {
    this.appendDummyInput().appendField('_ELEVATOR_FLOOR_WRITE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__elevator_floor_write'] = function(block) {
  var code = '_ELEVATOR_FLOOR_WRITE(';
  code += ')\n';
  return code;
};
commandMap['_EMBANKMENT'] = { type: 'bdsp__embankment', args: 0 };
Blockly.Blocks['bdsp__embankment'] = {
  init: function() {
    this.appendDummyInput().appendField('_EMBANKMENT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__embankment'] = function(block) {
  var code = '_EMBANKMENT(';
  code += ')\n';
  return code;
};
commandMap['_END'] = { type: 'bdsp__end', args: 0 };
Blockly.Blocks['bdsp__end'] = {
  init: function() {
    this.appendDummyInput().appendField('End');
    this.setPreviousStatement(true, null);
    this.setColour(360);
    this.setTooltip("Ends the script.");
  }
};
Blockly.JavaScript['bdsp__end'] = function(block) {
  var code = '_END(';
  code += ')\n';
  return code;
};
commandMap['_ENDING_DEMO'] = { type: 'bdsp__ending_demo', args: 0 };
Blockly.Blocks['bdsp__ending_demo'] = {
  init: function() {
    this.appendDummyInput().appendField('_ENDING_DEMO');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__ending_demo'] = function(block) {
  var code = '_ENDING_DEMO(';
  code += ')\n';
  return code;
};
commandMap['_END_LIGHTINTENSITY'] = { type: 'bdsp__end_lightintensity', args: 0 };
Blockly.Blocks['bdsp__end_lightintensity'] = {
  init: function() {
    this.appendDummyInput().appendField('_END_LIGHTINTENSITY');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__end_lightintensity'] = function(block) {
  var code = '_END_LIGHTINTENSITY(';
  code += ')\n';
  return code;
};
commandMap['_END_LIGHTINTENSITY_CHARCTER'] = { type: 'bdsp__end_lightintensity_charcter', args: 0 };
Blockly.Blocks['bdsp__end_lightintensity_charcter'] = {
  init: function() {
    this.appendDummyInput().appendField('_END_LIGHTINTENSITY_CHARCTER');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__end_lightintensity_charcter'] = function(block) {
  var code = '_END_LIGHTINTENSITY_CHARCTER(';
  code += ')\n';
  return code;
};
commandMap['_END_LIGHTINTENSITY_POKE'] = { type: 'bdsp__end_lightintensity_poke', args: 0 };
Blockly.Blocks['bdsp__end_lightintensity_poke'] = {
  init: function() {
    this.appendDummyInput().appendField('_END_LIGHTINTENSITY_POKE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__end_lightintensity_poke'] = function(block) {
  var code = '_END_LIGHTINTENSITY_POKE(';
  code += ')\n';
  return code;
};
commandMap['_ENTRY_UWASA_ZUKAN'] = { type: 'bdsp__entry_uwasa_zukan', args: 0 };
Blockly.Blocks['bdsp__entry_uwasa_zukan'] = {
  init: function() {
    this.appendDummyInput().appendField('_ENTRY_UWASA_ZUKAN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__entry_uwasa_zukan'] = function(block) {
  var code = '_ENTRY_UWASA_ZUKAN(';
  code += ')\n';
  return code;
};
commandMap['_EVENT_CAMERA_END_WAIT'] = { type: 'bdsp__event_camera_end_wait', args: 0 };
Blockly.Blocks['bdsp__event_camera_end_wait'] = {
  init: function() {
    this.appendDummyInput().appendField('_EVENT_CAMERA_END_WAIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__event_camera_end_wait'] = function(block) {
  var code = '_EVENT_CAMERA_END_WAIT(';
  code += ')\n';
  return code;
};
commandMap['_EVENT_CAMERA_FRAME'] = { type: 'bdsp__event_camera_frame', args: 0 };
Blockly.Blocks['bdsp__event_camera_frame'] = {
  init: function() {
    this.appendDummyInput().appendField('_EVENT_CAMERA_FRAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__event_camera_frame'] = function(block) {
  var code = '_EVENT_CAMERA_FRAME(';
  code += ')\n';
  return code;
};
commandMap['_EVENT_CAMERA_INDEX'] = { type: 'bdsp__event_camera_index', args: 1 };
Blockly.Blocks['bdsp__event_camera_index'] = {
  init: function() {
    this.appendDummyInput().appendField('_EVENT_CAMERA_INDEX');
    this.appendValueInput('ARG_0').appendField('Camera');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Changes the camera used.");
  }
};
Blockly.JavaScript['bdsp__event_camera_index'] = function(block) {
  var code = '_EVENT_CAMERA_INDEX(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_EVENT_CAMERA_MODE'] = { type: 'bdsp__event_camera_mode', args: 0 };
Blockly.Blocks['bdsp__event_camera_mode'] = {
  init: function() {
    this.appendDummyInput().appendField('_EVENT_CAMERA_MODE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__event_camera_mode'] = function(block) {
  var code = '_EVENT_CAMERA_MODE(';
  code += ')\n';
  return code;
};
commandMap['_EVENT_CAMERA_WAIT'] = { type: 'bdsp__event_camera_wait', args: 0 };
Blockly.Blocks['bdsp__event_camera_wait'] = {
  init: function() {
    this.appendDummyInput().appendField('_EVENT_CAMERA_WAIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__event_camera_wait'] = function(block) {
  var code = '_EVENT_CAMERA_WAIT(';
  code += ')\n';
  return code;
};
commandMap['_EVENT_DATA'] = { type: 'bdsp__event_data', args: 1 };
Blockly.Blocks['bdsp__event_data'] = {
  init: function() {
    this.appendDummyInput().appendField('_EVENT_DATA');
    this.appendValueInput('ARG_0').appendField('Unknown');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unknown use. Only used in the Oreburgh Gym.");
  }
};
Blockly.JavaScript['bdsp__event_data'] = function(block) {
  var code = '_EVENT_DATA(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_EVENT_DATA_END'] = { type: 'bdsp__event_data_end', args: 0 };
Blockly.Blocks['bdsp__event_data_end'] = {
  init: function() {
    this.appendDummyInput().appendField('_EVENT_DATA_END');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unknown use. Only used once in Oreburgh Gym.");
  }
};
Blockly.JavaScript['bdsp__event_data_end'] = function(block) {
  var code = '_EVENT_DATA_END(';
  code += ')\n';
  return code;
};
commandMap['_EVENT_END'] = { type: 'bdsp__event_end', args: 0 };
Blockly.Blocks['bdsp__event_end'] = {
  init: function() {
    this.appendDummyInput().appendField('_EVENT_END');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Ends a cutscene event.");
  }
};
Blockly.JavaScript['bdsp__event_end'] = function(block) {
  var code = '_EVENT_END(';
  code += ')\n';
  return code;
};
commandMap['_EVENT_ENTITY_CLIP_ATTACH_PLAYER'] = { type: 'bdsp__event_entity_clip_attach_player', args: 0 };
Blockly.Blocks['bdsp__event_entity_clip_attach_player'] = {
  init: function() {
    this.appendDummyInput().appendField('_EVENT_ENTITY_CLIP_ATTACH_PLAYER');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__event_entity_clip_attach_player'] = function(block) {
  var code = '_EVENT_ENTITY_CLIP_ATTACH_PLAYER(';
  code += ')\n';
  return code;
};
commandMap['_EVENT_ENTITY_CLIP_PLAY'] = { type: 'bdsp__event_entity_clip_play', args: 0 };
Blockly.Blocks['bdsp__event_entity_clip_play'] = {
  init: function() {
    this.appendDummyInput().appendField('_EVENT_ENTITY_CLIP_PLAY');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__event_entity_clip_play'] = function(block) {
  var code = '_EVENT_ENTITY_CLIP_PLAY(';
  code += ')\n';
  return code;
};
commandMap['_EVENT_ENTITY_CLIP_WAIT'] = { type: 'bdsp__event_entity_clip_wait', args: 0 };
Blockly.Blocks['bdsp__event_entity_clip_wait'] = {
  init: function() {
    this.appendDummyInput().appendField('_EVENT_ENTITY_CLIP_WAIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__event_entity_clip_wait'] = function(block) {
  var code = '_EVENT_ENTITY_CLIP_WAIT(';
  code += ')\n';
  return code;
};
commandMap['_EVENT_ENTITY_VISIBLE'] = { type: 'bdsp__event_entity_visible', args: 0 };
Blockly.Blocks['bdsp__event_entity_visible'] = {
  init: function() {
    this.appendDummyInput().appendField('_EVENT_ENTITY_VISIBLE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__event_entity_visible'] = function(block) {
  var code = '_EVENT_ENTITY_VISIBLE(';
  code += ')\n';
  return code;
};
commandMap['_EVENT_GET_TEMOTI_POKE_CHK_GET_POS'] = { type: 'bdsp__event_get_temoti_poke_chk_get_pos', args: 0 };
Blockly.Blocks['bdsp__event_get_temoti_poke_chk_get_pos'] = {
  init: function() {
    this.appendDummyInput().appendField('_EVENT_GET_TEMOTI_POKE_CHK_GET_POS');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__event_get_temoti_poke_chk_get_pos'] = function(block) {
  var code = '_EVENT_GET_TEMOTI_POKE_CHK_GET_POS(';
  code += ')\n';
  return code;
};
commandMap['_EVENT_START'] = { type: 'bdsp__event_start', args: 0 };
Blockly.Blocks['bdsp__event_start'] = {
  init: function() {
    this.appendDummyInput().appendField('_EVENT_START');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Starts a cutscene event.");
  }
};
Blockly.JavaScript['bdsp__event_start'] = function(block) {
  var code = '_EVENT_START(';
  code += ')\n';
  return code;
};
commandMap['_EV_ENTITY_PLAYER_MOVE_END'] = { type: 'bdsp__ev_entity_player_move_end', args: 0 };
Blockly.Blocks['bdsp__ev_entity_player_move_end'] = {
  init: function() {
    this.appendDummyInput().appendField('_EV_ENTITY_PLAYER_MOVE_END');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__ev_entity_player_move_end'] = function(block) {
  var code = '_EV_ENTITY_PLAYER_MOVE_END(';
  code += ')\n';
  return code;
};
commandMap['_EV_ENTITY_PLAYER_MOVE_RESET'] = { type: 'bdsp__ev_entity_player_move_reset', args: 0 };
Blockly.Blocks['bdsp__ev_entity_player_move_reset'] = {
  init: function() {
    this.appendDummyInput().appendField('_EV_ENTITY_PLAYER_MOVE_RESET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__ev_entity_player_move_reset'] = function(block) {
  var code = '_EV_ENTITY_PLAYER_MOVE_RESET(';
  code += ')\n';
  return code;
};
commandMap['_EV_ENTITY_PLAYER_MOVE_START'] = { type: 'bdsp__ev_entity_player_move_start', args: 0 };
Blockly.Blocks['bdsp__ev_entity_player_move_start'] = {
  init: function() {
    this.appendDummyInput().appendField('_EV_ENTITY_PLAYER_MOVE_START');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__ev_entity_player_move_start'] = function(block) {
  var code = '_EV_ENTITY_PLAYER_MOVE_START(';
  code += ')\n';
  return code;
};
commandMap['_EYE_TRAINER_ID_GET'] = { type: 'bdsp__eye_trainer_id_get', args: 2 };
Blockly.Blocks['bdsp__eye_trainer_id_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_EYE_TRAINER_ID_GET');
    this.appendValueInput('ARG_0').appendField('Trainer');
    this.appendValueInput('ARG_1').appendField('Result');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Gets the ID of the trainer(s) that saw the player.");
  }
};
Blockly.JavaScript['bdsp__eye_trainer_id_get'] = function(block) {
  var code = '_EYE_TRAINER_ID_GET(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_EYE_TRAINER_MOVE_CHECK'] = { type: 'bdsp__eye_trainer_move_check', args: 2 };
Blockly.Blocks['bdsp__eye_trainer_move_check'] = {
  init: function() {
    this.appendDummyInput().appendField('_EYE_TRAINER_MOVE_CHECK');
    this.appendValueInput('ARG_0').appendField('Trainer');
    this.appendValueInput('ARG_1').appendField('Result');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Checks if the trainer that was just moved by _EYE_TRAINER_MOVE_SET is still moving.");
  }
};
Blockly.JavaScript['bdsp__eye_trainer_move_check'] = function(block) {
  var code = '_EYE_TRAINER_MOVE_CHECK(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_EYE_TRAINER_MOVE_SET'] = { type: 'bdsp__eye_trainer_move_set', args: 1 };
Blockly.Blocks['bdsp__eye_trainer_move_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_EYE_TRAINER_MOVE_SET');
    this.appendValueInput('ARG_0').appendField('Trainer');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Moves the trainer(s) that just saw the player.");
  }
};
Blockly.JavaScript['bdsp__eye_trainer_move_set'] = function(block) {
  var code = '_EYE_TRAINER_MOVE_SET(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_EYE_TRAINER_TYPE_GET'] = { type: 'bdsp__eye_trainer_type_get', args: 1 };
Blockly.Blocks['bdsp__eye_trainer_type_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_EYE_TRAINER_TYPE_GET');
    this.appendValueInput('ARG_0').appendField('Result');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Gets the type of fight that was started. (Single, double, two trainers)");
  }
};
Blockly.JavaScript['bdsp__eye_trainer_type_get'] = function(block) {
  var code = '_EYE_TRAINER_TYPE_GET(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_FACE_INDEX'] = { type: 'bdsp__face_index', args: 0 };
Blockly.Blocks['bdsp__face_index'] = {
  init: function() {
    this.appendDummyInput().appendField('_FACE_INDEX');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__face_index'] = function(block) {
  var code = '_FACE_INDEX(';
  code += ')\n';
  return code;
};
commandMap['_FADE_AREA_IN'] = { type: 'bdsp__fade_area_in', args: 0 };
Blockly.Blocks['bdsp__fade_area_in'] = {
  init: function() {
    this.appendDummyInput().appendField('_FADE_AREA_IN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__fade_area_in'] = function(block) {
  var code = '_FADE_AREA_IN(';
  code += ')\n';
  return code;
};
commandMap['_FADE_AREA_OUT'] = { type: 'bdsp__fade_area_out', args: 0 };
Blockly.Blocks['bdsp__fade_area_out'] = {
  init: function() {
    this.appendDummyInput().appendField('_FADE_AREA_OUT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__fade_area_out'] = function(block) {
  var code = '_FADE_AREA_OUT(';
  code += ')\n';
  return code;
};
commandMap['_FADE_BALL'] = { type: 'bdsp__fade_ball', args: 0 };
Blockly.Blocks['bdsp__fade_ball'] = {
  init: function() {
    this.appendDummyInput().appendField('_FADE_BALL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__fade_ball'] = function(block) {
  var code = '_FADE_BALL(';
  code += ')\n';
  return code;
};
commandMap['_FADE_BUILDING_IN'] = { type: 'bdsp__fade_building_in', args: 0 };
Blockly.Blocks['bdsp__fade_building_in'] = {
  init: function() {
    this.appendDummyInput().appendField('_FADE_BUILDING_IN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__fade_building_in'] = function(block) {
  var code = '_FADE_BUILDING_IN(';
  code += ')\n';
  return code;
};
commandMap['_FADE_BUILDING_OUT'] = { type: 'bdsp__fade_building_out', args: 0 };
Blockly.Blocks['bdsp__fade_building_out'] = {
  init: function() {
    this.appendDummyInput().appendField('_FADE_BUILDING_OUT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__fade_building_out'] = function(block) {
  var code = '_FADE_BUILDING_OUT(';
  code += ')\n';
  return code;
};
commandMap['_FADE_DEFAULT'] = { type: 'bdsp__fade_default', args: 0 };
Blockly.Blocks['bdsp__fade_default'] = {
  init: function() {
    this.appendDummyInput().appendField('_FADE_DEFAULT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__fade_default'] = function(block) {
  var code = '_FADE_DEFAULT(';
  code += ')\n';
  return code;
};
commandMap['_FADE_DUNGEON_IN'] = { type: 'bdsp__fade_dungeon_in', args: 0 };
Blockly.Blocks['bdsp__fade_dungeon_in'] = {
  init: function() {
    this.appendDummyInput().appendField('_FADE_DUNGEON_IN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__fade_dungeon_in'] = function(block) {
  var code = '_FADE_DUNGEON_IN(';
  code += ')\n';
  return code;
};
commandMap['_FADE_DUNGEON_OUT'] = { type: 'bdsp__fade_dungeon_out', args: 0 };
Blockly.Blocks['bdsp__fade_dungeon_out'] = {
  init: function() {
    this.appendDummyInput().appendField('_FADE_DUNGEON_OUT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__fade_dungeon_out'] = function(block) {
  var code = '_FADE_DUNGEON_OUT(';
  code += ')\n';
  return code;
};
commandMap['_FADE_SPEED'] = { type: 'bdsp__fade_speed', args: 1 };
Blockly.Blocks['bdsp__fade_speed'] = {
  init: function() {
    this.appendDummyInput().appendField('_FADE_SPEED');
    this.appendValueInput('ARG_0').appendField('Time');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Sets the speed of fade-ins and fade-outs.");
  }
};
Blockly.JavaScript['bdsp__fade_speed'] = function(block) {
  var code = '_FADE_SPEED(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_FADE_WAIT'] = { type: 'bdsp__fade_wait', args: 0 };
Blockly.Blocks['bdsp__fade_wait'] = {
  init: function() {
    this.appendDummyInput().appendField('_FADE_WAIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__fade_wait'] = function(block) {
  var code = '_FADE_WAIT(';
  code += ')\n';
  return code;
};
commandMap['_FIELDOBJ_BITSET_FELLOWHIT'] = { type: 'bdsp__fieldobj_bitset_fellowhit', args: 0 };
Blockly.Blocks['bdsp__fieldobj_bitset_fellowhit'] = {
  init: function() {
    this.appendDummyInput().appendField('_FIELDOBJ_BITSET_FELLOWHIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__fieldobj_bitset_fellowhit'] = function(block) {
  var code = '_FIELDOBJ_BITSET_FELLOWHIT(';
  code += ')\n';
  return code;
};
commandMap['_FIND_BG_DISABLE'] = { type: 'bdsp__find_bg_disable', args: 0 };
Blockly.Blocks['bdsp__find_bg_disable'] = {
  init: function() {
    this.appendDummyInput().appendField('_FIND_BG_DISABLE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__find_bg_disable'] = function(block) {
  var code = '_FIND_BG_DISABLE(';
  code += ')\n';
  return code;
};
commandMap['_FIND_BG_ENABLE'] = { type: 'bdsp__find_bg_enable', args: 0 };
Blockly.Blocks['bdsp__find_bg_enable'] = {
  init: function() {
    this.appendDummyInput().appendField('_FIND_BG_ENABLE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__find_bg_enable'] = function(block) {
  var code = '_FIND_BG_ENABLE(';
  code += ')\n';
  return code;
};
commandMap['_FINISH_MAP_PROC'] = { type: 'bdsp__finish_map_proc', args: 0 };
Blockly.Blocks['bdsp__finish_map_proc'] = {
  init: function() {
    this.appendDummyInput().appendField('_FINISH_MAP_PROC');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Finishes refreshing the map after closing the town map in a Pok\u00c3\u00a9mon Center.");
  }
};
Blockly.JavaScript['bdsp__finish_map_proc'] = function(block) {
  var code = '_FINISH_MAP_PROC(';
  code += ')\n';
  return code;
};
commandMap['_FIRST_BTL_SET'] = { type: 'bdsp__first_btl_set', args: 0 };
Blockly.Blocks['bdsp__first_btl_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_FIRST_BTL_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__first_btl_set'] = function(block) {
  var code = '_FIRST_BTL_SET(';
  code += ')\n';
  return code;
};
commandMap['_FIRST_POKEMON_NAME'] = { type: 'bdsp__first_pokemon_name', args: 0 };
Blockly.Blocks['bdsp__first_pokemon_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_FIRST_POKEMON_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__first_pokemon_name'] = function(block) {
  var code = '_FIRST_POKEMON_NAME(';
  code += ')\n';
  return code;
};
commandMap['_FIRST_POKE_NO_GET'] = { type: 'bdsp__first_poke_no_get', args: 0 };
Blockly.Blocks['bdsp__first_poke_no_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_FIRST_POKE_NO_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__first_poke_no_get'] = function(block) {
  var code = '_FIRST_POKE_NO_GET(';
  code += ')\n';
  return code;
};
commandMap['_FIRST_POKE_SELECT_PROC'] = { type: 'bdsp__first_poke_select_proc', args: 0 };
Blockly.Blocks['bdsp__first_poke_select_proc'] = {
  init: function() {
    this.appendDummyInput().appendField('_FIRST_POKE_SELECT_PROC');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Opens the starter choice menu.");
  }
};
Blockly.JavaScript['bdsp__first_poke_select_proc'] = function(block) {
  var code = '_FIRST_POKE_SELECT_PROC(';
  code += ')\n';
  return code;
};
commandMap['_FIRST_POKE_SELECT_SET_AND_DEL'] = { type: 'bdsp__first_poke_select_set_and_del', args: 0 };
Blockly.Blocks['bdsp__first_poke_select_set_and_del'] = {
  init: function() {
    this.appendDummyInput().appendField('_FIRST_POKE_SELECT_SET_AND_DEL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Sets the selected starter to some place in memory. Used right after _FIRST_POKE_SELECT_PROC.");
  }
};
Blockly.JavaScript['bdsp__first_poke_select_set_and_del'] = function(block) {
  var code = '_FIRST_POKE_SELECT_SET_AND_DEL(';
  code += ')\n';
  return code;
};
commandMap['_FIX_GOODS_CALL'] = { type: 'bdsp__fix_goods_call', args: 0 };
Blockly.Blocks['bdsp__fix_goods_call'] = {
  init: function() {
    this.appendDummyInput().appendField('_FIX_GOODS_CALL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__fix_goods_call'] = function(block) {
  var code = '_FIX_GOODS_CALL(';
  code += ')\n';
  return code;
};
commandMap['_FIX_SEAL_CALL'] = { type: 'bdsp__fix_seal_call', args: 0 };
Blockly.Blocks['bdsp__fix_seal_call'] = {
  init: function() {
    this.appendDummyInput().appendField('_FIX_SEAL_CALL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__fix_seal_call'] = function(block) {
  var code = '_FIX_SEAL_CALL(';
  code += ')\n';
  return code;
};
commandMap['_FIX_SHOP_CALL'] = { type: 'bdsp__fix_shop_call', args: 0 };
Blockly.Blocks['bdsp__fix_shop_call'] = {
  init: function() {
    this.appendDummyInput().appendField('_FIX_SHOP_CALL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__fix_shop_call'] = function(block) {
  var code = '_FIX_SHOP_CALL(';
  code += ')\n';
  return code;
};
commandMap['_FLAG_CHANGE_LABEL'] = { type: 'bdsp__flag_change_label', args: 1 };
Blockly.Blocks['bdsp__flag_change_label'] = {
  init: function() {
    this.appendDummyInput().appendField('_FLAG_CHANGE_LABEL');
    this.appendValueInput('ARG_0').appendField('Script');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Calls a script of the main script file.");
  }
};
Blockly.JavaScript['bdsp__flag_change_label'] = function(block) {
  var code = '_FLAG_CHANGE_LABEL(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_FLAG_CHECK'] = { type: 'bdsp__flag_check', args: 0 };
Blockly.Blocks['bdsp__flag_check'] = {
  init: function() {
    this.appendDummyInput().appendField('_FLAG_CHECK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__flag_check'] = function(block) {
  var code = '_FLAG_CHECK(';
  code += ')\n';
  return code;
};
commandMap['_FLAG_CHECK_WK'] = { type: 'bdsp__flag_check_wk', args: 0 };
Blockly.Blocks['bdsp__flag_check_wk'] = {
  init: function() {
    this.appendDummyInput().appendField('_FLAG_CHECK_WK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__flag_check_wk'] = function(block) {
  var code = '_FLAG_CHECK_WK(';
  code += ')\n';
  return code;
};
commandMap['_FLAG_RESET'] = { type: 'bdsp__flag_reset', args: 1 };
Blockly.Blocks['bdsp__flag_reset'] = {
  init: function() {
    this.appendDummyInput().appendField('_FLAG_RESET');
    this.appendValueInput('ARG_0').appendField('Flag');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Clears a flag.");
  }
};
Blockly.JavaScript['bdsp__flag_reset'] = function(block) {
  var code = '_FLAG_RESET(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_FLAG_SET'] = { type: 'bdsp__flag_set', args: 1 };
Blockly.Blocks['bdsp__flag_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_FLAG_SET');
    this.appendValueInput('ARG_0').appendField('Flag');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Sets a flag.");
  }
};
Blockly.JavaScript['bdsp__flag_set'] = function(block) {
  var code = '_FLAG_SET(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_FLAG_SET_WK'] = { type: 'bdsp__flag_set_wk', args: 1 };
Blockly.Blocks['bdsp__flag_set_wk'] = {
  init: function() {
    this.appendDummyInput().appendField('_FLAG_SET_WK');
    this.appendValueInput('ARG_0').appendField('Variable');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Sets the flag designated by the value of a variable.");
  }
};
Blockly.JavaScript['bdsp__flag_set_wk'] = function(block) {
  var code = '_FLAG_SET_WK(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_FLDOBJ_BLINK_ANM'] = { type: 'bdsp__fldobj_blink_anm', args: 0 };
Blockly.Blocks['bdsp__fldobj_blink_anm'] = {
  init: function() {
    this.appendDummyInput().appendField('_FLDOBJ_BLINK_ANM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__fldobj_blink_anm'] = function(block) {
  var code = '_FLDOBJ_BLINK_ANM(';
  code += ')\n';
  return code;
};
commandMap['_FLDOBJ_SHAKE_ANM'] = { type: 'bdsp__fldobj_shake_anm', args: 0 };
Blockly.Blocks['bdsp__fldobj_shake_anm'] = {
  init: function() {
    this.appendDummyInput().appendField('_FLDOBJ_SHAKE_ANM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__fldobj_shake_anm'] = function(block) {
  var code = '_FLDOBJ_SHAKE_ANM(';
  code += ')\n';
  return code;
};
commandMap['_FLD_ITEM_EVENT'] = { type: 'bdsp__fld_item_event', args: 2 };
Blockly.Blocks['bdsp__fld_item_event'] = {
  init: function() {
    this.appendDummyInput().appendField('_FLD_ITEM_EVENT');
    this.appendValueInput('ARG_0').appendField('Unknown1');
    this.appendValueInput('ARG_1').appendField('Unknown2');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Executes an item pickup event.");
  }
};
Blockly.JavaScript['bdsp__fld_item_event'] = function(block) {
  var code = '_FLD_ITEM_EVENT(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_FLD_SCOPE_MODE_OFF'] = { type: 'bdsp__fld_scope_mode_off', args: 0 };
Blockly.Blocks['bdsp__fld_scope_mode_off'] = {
  init: function() {
    this.appendDummyInput().appendField('_FLD_SCOPE_MODE_OFF');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__fld_scope_mode_off'] = function(block) {
  var code = '_FLD_SCOPE_MODE_OFF(';
  code += ')\n';
  return code;
};
commandMap['_FLD_SCOPE_MODE_ON'] = { type: 'bdsp__fld_scope_mode_on', args: 0 };
Blockly.Blocks['bdsp__fld_scope_mode_on'] = {
  init: function() {
    this.appendDummyInput().appendField('_FLD_SCOPE_MODE_ON');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__fld_scope_mode_on'] = function(block) {
  var code = '_FLD_SCOPE_MODE_ON(';
  code += ')\n';
  return code;
};
commandMap['_FLD_TRADE_ALLOC'] = { type: 'bdsp__fld_trade_alloc', args: 0 };
Blockly.Blocks['bdsp__fld_trade_alloc'] = {
  init: function() {
    this.appendDummyInput().appendField('_FLD_TRADE_ALLOC');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__fld_trade_alloc'] = function(block) {
  var code = '_FLD_TRADE_ALLOC(';
  code += ')\n';
  return code;
};
commandMap['_FLD_TRADE_CHG_MONSNO'] = { type: 'bdsp__fld_trade_chg_monsno', args: 0 };
Blockly.Blocks['bdsp__fld_trade_chg_monsno'] = {
  init: function() {
    this.appendDummyInput().appendField('_FLD_TRADE_CHG_MONSNO');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__fld_trade_chg_monsno'] = function(block) {
  var code = '_FLD_TRADE_CHG_MONSNO(';
  code += ')\n';
  return code;
};
commandMap['_FLD_TRADE_DEL'] = { type: 'bdsp__fld_trade_del', args: 0 };
Blockly.Blocks['bdsp__fld_trade_del'] = {
  init: function() {
    this.appendDummyInput().appendField('_FLD_TRADE_DEL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__fld_trade_del'] = function(block) {
  var code = '_FLD_TRADE_DEL(';
  code += ')\n';
  return code;
};
commandMap['_FLD_TRADE_EVENT'] = { type: 'bdsp__fld_trade_event', args: 0 };
Blockly.Blocks['bdsp__fld_trade_event'] = {
  init: function() {
    this.appendDummyInput().appendField('_FLD_TRADE_EVENT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__fld_trade_event'] = function(block) {
  var code = '_FLD_TRADE_EVENT(';
  code += ')\n';
  return code;
};
commandMap['_FLD_TRADE_MONSNO'] = { type: 'bdsp__fld_trade_monsno', args: 0 };
Blockly.Blocks['bdsp__fld_trade_monsno'] = {
  init: function() {
    this.appendDummyInput().appendField('_FLD_TRADE_MONSNO');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__fld_trade_monsno'] = function(block) {
  var code = '_FLD_TRADE_MONSNO(';
  code += ')\n';
  return code;
};
commandMap['_FLOOR_CLOSE'] = { type: 'bdsp__floor_close', args: 0 };
Blockly.Blocks['bdsp__floor_close'] = {
  init: function() {
    this.appendDummyInput().appendField('_FLOOR_CLOSE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__floor_close'] = function(block) {
  var code = '_FLOOR_CLOSE(';
  code += ')\n';
  return code;
};
commandMap['_FLOOR_OPEN'] = { type: 'bdsp__floor_open', args: 0 };
Blockly.Blocks['bdsp__floor_open'] = {
  init: function() {
    this.appendDummyInput().appendField('_FLOOR_OPEN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__floor_open'] = function(block) {
  var code = '_FLOOR_OPEN(';
  code += ')\n';
  return code;
};
commandMap['_FNOTE_DATA_MAKE'] = { type: 'bdsp__fnote_data_make', args: 0 };
Blockly.Blocks['bdsp__fnote_data_make'] = {
  init: function() {
    this.appendDummyInput().appendField('_FNOTE_DATA_MAKE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__fnote_data_make'] = function(block) {
  var code = '_FNOTE_DATA_MAKE(';
  code += ')\n';
  return code;
};
commandMap['_FNOTE_DATA_SAVE'] = { type: 'bdsp__fnote_data_save', args: 0 };
Blockly.Blocks['bdsp__fnote_data_save'] = {
  init: function() {
    this.appendDummyInput().appendField('_FNOTE_DATA_SAVE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__fnote_data_save'] = function(block) {
  var code = '_FNOTE_DATA_SAVE(';
  code += ')\n';
  return code;
};
commandMap['_FNOTE_START_SET'] = { type: 'bdsp__fnote_start_set', args: 0 };
Blockly.Blocks['bdsp__fnote_start_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_FNOTE_START_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__fnote_start_set'] = function(block) {
  var code = '_FNOTE_START_SET(';
  code += ')\n';
  return code;
};
commandMap['_FOV_OFFSET_RATE'] = { type: 'bdsp__fov_offset_rate', args: 0 };
Blockly.Blocks['bdsp__fov_offset_rate'] = {
  init: function() {
    this.appendDummyInput().appendField('_FOV_OFFSET_RATE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__fov_offset_rate'] = function(block) {
  var code = '_FOV_OFFSET_RATE(';
  code += ')\n';
  return code;
};
commandMap['_FREE_3D_ANIME'] = { type: 'bdsp__free_3d_anime', args: 0 };
Blockly.Blocks['bdsp__free_3d_anime'] = {
  init: function() {
    this.appendDummyInput().appendField('_FREE_3D_ANIME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__free_3d_anime'] = function(block) {
  var code = '_FREE_3D_ANIME(';
  code += ')\n';
  return code;
};
commandMap['_FRIEND_DATA_NUM'] = { type: 'bdsp__friend_data_num', args: 0 };
Blockly.Blocks['bdsp__friend_data_num'] = {
  init: function() {
    this.appendDummyInput().appendField('_FRIEND_DATA_NUM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__friend_data_num'] = function(block) {
  var code = '_FRIEND_DATA_NUM(';
  code += ')\n';
  return code;
};
commandMap['_FRONT_POKEMON'] = { type: 'bdsp__front_pokemon', args: 0 };
Blockly.Blocks['bdsp__front_pokemon'] = {
  init: function() {
    this.appendDummyInput().appendField('_FRONT_POKEMON');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__front_pokemon'] = function(block) {
  var code = '_FRONT_POKEMON(';
  code += ')\n';
  return code;
};
commandMap['_FUREAI_TALK_END'] = { type: 'bdsp__fureai_talk_end', args: 0 };
Blockly.Blocks['bdsp__fureai_talk_end'] = {
  init: function() {
    this.appendDummyInput().appendField('_FUREAI_TALK_END');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__fureai_talk_end'] = function(block) {
  var code = '_FUREAI_TALK_END(';
  code += ')\n';
  return code;
};
commandMap['_FUREAI_TALK_START'] = { type: 'bdsp__fureai_talk_start', args: 0 };
Blockly.Blocks['bdsp__fureai_talk_start'] = {
  init: function() {
    this.appendDummyInput().appendField('_FUREAI_TALK_START');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__fureai_talk_start'] = function(block) {
  var code = '_FUREAI_TALK_START(';
  code += ')\n';
  return code;
};
commandMap['_GAME_OVER_CALL'] = { type: 'bdsp__game_over_call', args: 0 };
Blockly.Blocks['bdsp__game_over_call'] = {
  init: function() {
    this.appendDummyInput().appendField('_GAME_OVER_CALL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__game_over_call'] = function(block) {
  var code = '_GAME_OVER_CALL(';
  code += ')\n';
  return code;
};
commandMap['_GENERATE_INFO_GET'] = { type: 'bdsp__generate_info_get', args: 0 };
Blockly.Blocks['bdsp__generate_info_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_GENERATE_INFO_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__generate_info_get'] = function(block) {
  var code = '_GENERATE_INFO_GET(';
  code += ')\n';
  return code;
};
commandMap['_GET_BEFORE_ZONE_ID'] = { type: 'bdsp__get_before_zone_id', args: 0 };
Blockly.Blocks['bdsp__get_before_zone_id'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_BEFORE_ZONE_ID');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_before_zone_id'] = function(block) {
  var code = '_GET_BEFORE_ZONE_ID(';
  code += ')\n';
  return code;
};
commandMap['_GET_BP'] = { type: 'bdsp__get_bp', args: 0 };
Blockly.Blocks['bdsp__get_bp'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_BP');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_bp'] = function(block) {
  var code = '_GET_BP(';
  code += ')\n';
  return code;
};
commandMap['_GET_BP_GIFT'] = { type: 'bdsp__get_bp_gift', args: 0 };
Blockly.Blocks['bdsp__get_bp_gift'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_BP_GIFT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_bp_gift'] = function(block) {
  var code = '_GET_BP_GIFT(';
  code += ')\n';
  return code;
};
commandMap['_GET_BTL_POINT'] = { type: 'bdsp__get_btl_point', args: 0 };
Blockly.Blocks['bdsp__get_btl_point'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_BTL_POINT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_btl_point'] = function(block) {
  var code = '_GET_BTL_POINT(';
  code += ')\n';
  return code;
};
commandMap['_GET_COIN_GIFT'] = { type: 'bdsp__get_coin_gift', args: 0 };
Blockly.Blocks['bdsp__get_coin_gift'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_COIN_GIFT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_coin_gift'] = function(block) {
  var code = '_GET_COIN_GIFT(';
  code += ')\n';
  return code;
};
commandMap['_GET_COIN_NUM'] = { type: 'bdsp__get_coin_num', args: 0 };
Blockly.Blocks['bdsp__get_coin_num'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_COIN_NUM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__get_coin_num'] = function(block) {
  var code = '_GET_COIN_NUM(';
  code += ')\n';
  return code;
};
commandMap['_GET_COSTUME'] = { type: 'bdsp__get_costume', args: 0 };
Blockly.Blocks['bdsp__get_costume'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_COSTUME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_costume'] = function(block) {
  var code = '_GET_COSTUME(';
  code += ')\n';
  return code;
};
commandMap['_GET_FORM'] = { type: 'bdsp__get_form', args: 0 };
Blockly.Blocks['bdsp__get_form'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_FORM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_form'] = function(block) {
  var code = '_GET_FORM(';
  code += ')\n';
  return code;
};
commandMap['_GET_FUREAI_SELECT_POKE_TEMOTI_NO'] = { type: 'bdsp__get_fureai_select_poke_temoti_no', args: 0 };
Blockly.Blocks['bdsp__get_fureai_select_poke_temoti_no'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_FUREAI_SELECT_POKE_TEMOTI_NO');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_fureai_select_poke_temoti_no'] = function(block) {
  var code = '_GET_FUREAI_SELECT_POKE_TEMOTI_NO(';
  code += ')\n';
  return code;
};
commandMap['_GET_GOLD'] = { type: 'bdsp__get_gold', args: 0 };
Blockly.Blocks['bdsp__get_gold'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_GOLD');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_gold'] = function(block) {
  var code = '_GET_GOLD(';
  code += ')\n';
  return code;
};
commandMap['_GET_HONEY_TREE_STATE'] = { type: 'bdsp__get_honey_tree_state', args: 0 };
Blockly.Blocks['bdsp__get_honey_tree_state'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_HONEY_TREE_STATE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_honey_tree_state'] = function(block) {
  var code = '_GET_HONEY_TREE_STATE(';
  code += ')\n';
  return code;
};
commandMap['_GET_HYOUKA_MSGID'] = { type: 'bdsp__get_hyouka_msgid', args: 0 };
Blockly.Blocks['bdsp__get_hyouka_msgid'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_HYOUKA_MSGID');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_hyouka_msgid'] = function(block) {
  var code = '_GET_HYOUKA_MSGID(';
  code += ')\n';
  return code;
};
commandMap['_GET_IS_HAVE_SECRETBASE'] = { type: 'bdsp__get_is_have_secretbase', args: 0 };
Blockly.Blocks['bdsp__get_is_have_secretbase'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_IS_HAVE_SECRETBASE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_is_have_secretbase'] = function(block) {
  var code = '_GET_IS_HAVE_SECRETBASE(';
  code += ')\n';
  return code;
};
commandMap['_GET_ITEM_COUNT'] = { type: 'bdsp__get_item_count', args: 0 };
Blockly.Blocks['bdsp__get_item_count'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_ITEM_COUNT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_item_count'] = function(block) {
  var code = '_GET_ITEM_COUNT(';
  code += ')\n';
  return code;
};
commandMap['_GET_KUJI_ATARI_NUM'] = { type: 'bdsp__get_kuji_atari_num', args: 0 };
Blockly.Blocks['bdsp__get_kuji_atari_num'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_KUJI_ATARI_NUM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_kuji_atari_num'] = function(block) {
  var code = '_GET_KUJI_ATARI_NUM(';
  code += ')\n';
  return code;
};
commandMap['_GET_LANGUAGE'] = { type: 'bdsp__get_language', args: 0 };
Blockly.Blocks['bdsp__get_language'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_LANGUAGE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_language'] = function(block) {
  var code = '_GET_LANGUAGE(';
  code += ')\n';
  return code;
};
commandMap['_GET_MAILBOX_DATANUM'] = { type: 'bdsp__get_mailbox_datanum', args: 0 };
Blockly.Blocks['bdsp__get_mailbox_datanum'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_MAILBOX_DATANUM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_mailbox_datanum'] = function(block) {
  var code = '_GET_MAILBOX_DATANUM(';
  code += ')\n';
  return code;
};
commandMap['_GET_MAP_POS'] = { type: 'bdsp__get_map_pos', args: 0 };
Blockly.Blocks['bdsp__get_map_pos'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_MAP_POS');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__get_map_pos'] = function(block) {
  var code = '_GET_MAP_POS(';
  code += ')\n';
  return code;
};
commandMap['_GET_MY_SEX'] = { type: 'bdsp__get_my_sex', args: 0 };
Blockly.Blocks['bdsp__get_my_sex'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_MY_SEX');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_my_sex'] = function(block) {
  var code = '_GET_MY_SEX(';
  code += ')\n';
  return code;
};
commandMap['_GET_NATSUKI'] = { type: 'bdsp__get_natsuki', args: 0 };
Blockly.Blocks['bdsp__get_natsuki'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_NATSUKI');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_natsuki'] = function(block) {
  var code = '_GET_NATSUKI(';
  code += ')\n';
  return code;
};
commandMap['_GET_NEWS_POKE_NO'] = { type: 'bdsp__get_news_poke_no', args: 0 };
Blockly.Blocks['bdsp__get_news_poke_no'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_NEWS_POKE_NO');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_news_poke_no'] = function(block) {
  var code = '_GET_NEWS_POKE_NO(';
  code += ')\n';
  return code;
};
commandMap['_GET_NOW_HOUR'] = { type: 'bdsp__get_now_hour', args: 0 };
Blockly.Blocks['bdsp__get_now_hour'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_NOW_HOUR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_now_hour'] = function(block) {
  var code = '_GET_NOW_HOUR(';
  code += ')\n';
  return code;
};
commandMap['_GET_NOW_ZONE_ID'] = { type: 'bdsp__get_now_zone_id', args: 0 };
Blockly.Blocks['bdsp__get_now_zone_id'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_NOW_ZONE_ID');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_now_zone_id'] = function(block) {
  var code = '_GET_NOW_ZONE_ID(';
  code += ')\n';
  return code;
};
commandMap['_GET_PLAYER_CAP'] = { type: 'bdsp__get_player_cap', args: 0 };
Blockly.Blocks['bdsp__get_player_cap'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_PLAYER_CAP');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_player_cap'] = function(block) {
  var code = '_GET_PLAYER_CAP(';
  code += ')\n';
  return code;
};
commandMap['_GET_POCKET_NO'] = { type: 'bdsp__get_pocket_no', args: 2 };
Blockly.Blocks['bdsp__get_pocket_no'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_POCKET_NO');
    this.appendValueInput('ARG_0').appendField('Item');
    this.appendValueInput('ARG_1').appendField('Result');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Gets which pocket an item goes in.");
  }
};
Blockly.JavaScript['bdsp__get_pocket_no'] = function(block) {
  var code = '_GET_POCKET_NO(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_GET_POKETCH'] = { type: 'bdsp__get_poketch', args: 0 };
Blockly.Blocks['bdsp__get_poketch'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_POKETCH');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_poketch'] = function(block) {
  var code = '_GET_POKETCH(';
  code += ')\n';
  return code;
};
commandMap['_GET_POKETCH_APP_ID'] = { type: 'bdsp__get_poketch_app_id', args: 0 };
Blockly.Blocks['bdsp__get_poketch_app_id'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_POKETCH_APP_ID');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_poketch_app_id'] = function(block) {
  var code = '_GET_POKETCH_APP_ID(';
  code += ')\n';
  return code;
};
commandMap['_GET_POKETCH_FLAG'] = { type: 'bdsp__get_poketch_flag', args: 0 };
Blockly.Blocks['bdsp__get_poketch_flag'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_POKETCH_FLAG');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_poketch_flag'] = function(block) {
  var code = '_GET_POKETCH_FLAG(';
  code += ')\n';
  return code;
};
commandMap['_GET_POKE_COUNT'] = { type: 'bdsp__get_poke_count', args: 0 };
Blockly.Blocks['bdsp__get_poke_count'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_POKE_COUNT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_poke_count'] = function(block) {
  var code = '_GET_POKE_COUNT(';
  code += ')\n';
  return code;
};
commandMap['_GET_POKE_COUNT2'] = { type: 'bdsp__get_poke_count2', args: 0 };
Blockly.Blocks['bdsp__get_poke_count2'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_POKE_COUNT2');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_poke_count2'] = function(block) {
  var code = '_GET_POKE_COUNT2(';
  code += ')\n';
  return code;
};
commandMap['_GET_POKE_COUNT3'] = { type: 'bdsp__get_poke_count3', args: 0 };
Blockly.Blocks['bdsp__get_poke_count3'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_POKE_COUNT3');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_poke_count3'] = function(block) {
  var code = '_GET_POKE_COUNT3(';
  code += ')\n';
  return code;
};
commandMap['_GET_POKE_COUNT4'] = { type: 'bdsp__get_poke_count4', args: 0 };
Blockly.Blocks['bdsp__get_poke_count4'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_POKE_COUNT4');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_poke_count4'] = function(block) {
  var code = '_GET_POKE_COUNT4(';
  code += ')\n';
  return code;
};
commandMap['_GET_POKE_COUNT5'] = { type: 'bdsp__get_poke_count5', args: 0 };
Blockly.Blocks['bdsp__get_poke_count5'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_POKE_COUNT5');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_poke_count5'] = function(block) {
  var code = '_GET_POKE_COUNT5(';
  code += ')\n';
  return code;
};
commandMap['_GET_POKE_SEIKAKU'] = { type: 'bdsp__get_poke_seikaku', args: 0 };
Blockly.Blocks['bdsp__get_poke_seikaku'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_POKE_SEIKAKU');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_poke_seikaku'] = function(block) {
  var code = '_GET_POKE_SEIKAKU(';
  code += ')\n';
  return code;
};
commandMap['_GET_RANDOM_HIT'] = { type: 'bdsp__get_random_hit', args: 0 };
Blockly.Blocks['bdsp__get_random_hit'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_RANDOM_HIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_random_hit'] = function(block) {
  var code = '_GET_RANDOM_HIT(';
  code += ')\n';
  return code;
};
commandMap['_GET_REL_POS_HERO'] = { type: 'bdsp__get_rel_pos_hero', args: 0 };
Blockly.Blocks['bdsp__get_rel_pos_hero'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_REL_POS_HERO');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_rel_pos_hero'] = function(block) {
  var code = '_GET_REL_POS_HERO(';
  code += ')\n';
  return code;
};
commandMap['_GET_RND'] = { type: 'bdsp__get_rnd', args: 0 };
Blockly.Blocks['bdsp__get_rnd'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_RND');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_rnd'] = function(block) {
  var code = '_GET_RND(';
  code += ')\n';
  return code;
};
commandMap['_GET_RND_NEXT'] = { type: 'bdsp__get_rnd_next', args: 0 };
Blockly.Blocks['bdsp__get_rnd_next'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_RND_NEXT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_rnd_next'] = function(block) {
  var code = '_GET_RND_NEXT(';
  code += ')\n';
  return code;
};
commandMap['_GET_SEED_COMPOST'] = { type: 'bdsp__get_seed_compost', args: 0 };
Blockly.Blocks['bdsp__get_seed_compost'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_SEED_COMPOST');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_seed_compost'] = function(block) {
  var code = '_GET_SEED_COMPOST(';
  code += ')\n';
  return code;
};
commandMap['_GET_SEED_COUNT'] = { type: 'bdsp__get_seed_count', args: 0 };
Blockly.Blocks['bdsp__get_seed_count'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_SEED_COUNT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_seed_count'] = function(block) {
  var code = '_GET_SEED_COUNT(';
  code += ')\n';
  return code;
};
commandMap['_GET_SEED_GROUND'] = { type: 'bdsp__get_seed_ground', args: 0 };
Blockly.Blocks['bdsp__get_seed_ground'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_SEED_GROUND');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_seed_ground'] = function(block) {
  var code = '_GET_SEED_GROUND(';
  code += ')\n';
  return code;
};
commandMap['_GET_SEED_STATUS'] = { type: 'bdsp__get_seed_status', args: 0 };
Blockly.Blocks['bdsp__get_seed_status'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_SEED_STATUS');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_seed_status'] = function(block) {
  var code = '_GET_SEED_STATUS(';
  code += ')\n';
  return code;
};
commandMap['_GET_SEED_TYPE'] = { type: 'bdsp__get_seed_type', args: 0 };
Blockly.Blocks['bdsp__get_seed_type'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_SEED_TYPE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_seed_type'] = function(block) {
  var code = '_GET_SEED_TYPE(';
  code += ')\n';
  return code;
};
commandMap['_GET_SODATEYA_AISHOU'] = { type: 'bdsp__get_sodateya_aishou', args: 0 };
Blockly.Blocks['bdsp__get_sodateya_aishou'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_SODATEYA_AISHOU');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_sodateya_aishou'] = function(block) {
  var code = '_GET_SODATEYA_AISHOU(';
  code += ')\n';
  return code;
};
commandMap['_GET_SODATEYA_EGG'] = { type: 'bdsp__get_sodateya_egg', args: 0 };
Blockly.Blocks['bdsp__get_sodateya_egg'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_SODATEYA_EGG');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_sodateya_egg'] = function(block) {
  var code = '_GET_SODATEYA_EGG(';
  code += ')\n';
  return code;
};
commandMap['_GET_SODATEYA_ZIISAN'] = { type: 'bdsp__get_sodateya_ziisan', args: 0 };
Blockly.Blocks['bdsp__get_sodateya_ziisan'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_SODATEYA_ZIISAN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_sodateya_ziisan'] = function(block) {
  var code = '_GET_SODATEYA_ZIISAN(';
  code += ')\n';
  return code;
};
commandMap['_GET_SODATE_NAME'] = { type: 'bdsp__get_sodate_name', args: 0 };
Blockly.Blocks['bdsp__get_sodate_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_SODATE_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_sodate_name'] = function(block) {
  var code = '_GET_SODATE_NAME(';
  code += ')\n';
  return code;
};
commandMap['_GET_STATUE_NUM'] = { type: 'bdsp__get_statue_num', args: 0 };
Blockly.Blocks['bdsp__get_statue_num'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_STATUE_NUM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_statue_num'] = function(block) {
  var code = '_GET_STATUE_NUM(';
  code += ')\n';
  return code;
};
commandMap['_GET_TAG_PATNER_ID'] = { type: 'bdsp__get_tag_patner_id', args: 0 };
Blockly.Blocks['bdsp__get_tag_patner_id'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_TAG_PATNER_ID');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_tag_patner_id'] = function(block) {
  var code = '_GET_TAG_PATNER_ID(';
  code += ')\n';
  return code;
};
commandMap['_GET_TAMAGO_COUNT'] = { type: 'bdsp__get_tamago_count', args: 0 };
Blockly.Blocks['bdsp__get_tamago_count'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_TAMAGO_COUNT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_tamago_count'] = function(block) {
  var code = '_GET_TAMAGO_COUNT(';
  code += ')\n';
  return code;
};
commandMap['_GET_TEMOTI_POKE_NUM'] = { type: 'bdsp__get_temoti_poke_num', args: 0 };
Blockly.Blocks['bdsp__get_temoti_poke_num'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_TEMOTI_POKE_NUM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__get_temoti_poke_num'] = function(block) {
  var code = '_GET_TEMOTI_POKE_NUM(';
  code += ')\n';
  return code;
};
commandMap['_GET_TIME_ZONE'] = { type: 'bdsp__get_time_zone', args: 0 };
Blockly.Blocks['bdsp__get_time_zone'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_TIME_ZONE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_time_zone'] = function(block) {
  var code = '_GET_TIME_ZONE(';
  code += ')\n';
  return code;
};
commandMap['_GET_TRCARD_RANK'] = { type: 'bdsp__get_trcard_rank', args: 0 };
Blockly.Blocks['bdsp__get_trcard_rank'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_TRCARD_RANK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_trcard_rank'] = function(block) {
  var code = '_GET_TRCARD_RANK(';
  code += ')\n';
  return code;
};
commandMap['_GET_UG_HATA_NUM'] = { type: 'bdsp__get_ug_hata_num', args: 0 };
Blockly.Blocks['bdsp__get_ug_hata_num'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_UG_HATA_NUM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_ug_hata_num'] = function(block) {
  var code = '_GET_UG_HATA_NUM(';
  code += ')\n';
  return code;
};
commandMap['_GET_UG_NPC_TALK_COUNT'] = { type: 'bdsp__get_ug_npc_talk_count', args: 0 };
Blockly.Blocks['bdsp__get_ug_npc_talk_count'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_UG_NPC_TALK_COUNT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_ug_npc_talk_count'] = function(block) {
  var code = '_GET_UG_NPC_TALK_COUNT(';
  code += ')\n';
  return code;
};
commandMap['_GET_URAYAMA_ENCOUNT_INDEX'] = { type: 'bdsp__get_urayama_encount_index', args: 0 };
Blockly.Blocks['bdsp__get_urayama_encount_index'] = {
  init: function() {
    this.appendDummyInput().appendField('_GET_URAYAMA_ENCOUNT_INDEX');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__get_urayama_encount_index'] = function(block) {
  var code = '_GET_URAYAMA_ENCOUNT_INDEX(';
  code += ')\n';
  return code;
};
commandMap['_GOLD_WIN_DEL'] = { type: 'bdsp__gold_win_del', args: 0 };
Blockly.Blocks['bdsp__gold_win_del'] = {
  init: function() {
    this.appendDummyInput().appendField('_GOLD_WIN_DEL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__gold_win_del'] = function(block) {
  var code = '_GOLD_WIN_DEL(';
  code += ')\n';
  return code;
};
commandMap['_GOLD_WIN_WRITE'] = { type: 'bdsp__gold_win_write', args: 2 };
Blockly.Blocks['bdsp__gold_win_write'] = {
  init: function() {
    this.appendDummyInput().appendField('_GOLD_WIN_WRITE');
    this.appendValueInput('ARG_0').appendField('X');
    this.appendValueInput('ARG_1').appendField('Y');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Shows a window with the player's money.");
  }
};
Blockly.JavaScript['bdsp__gold_win_write'] = function(block) {
  var code = '_GOLD_WIN_WRITE(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_GOLD_WRITE'] = { type: 'bdsp__gold_write', args: 0 };
Blockly.Blocks['bdsp__gold_write'] = {
  init: function() {
    this.appendDummyInput().appendField('_GOLD_WRITE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__gold_write'] = function(block) {
  var code = '_GOLD_WRITE(';
  code += ')\n';
  return code;
};
commandMap['_GOODS_CHK'] = { type: 'bdsp__goods_chk', args: 0 };
Blockly.Blocks['bdsp__goods_chk'] = {
  init: function() {
    this.appendDummyInput().appendField('_GOODS_CHK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__goods_chk'] = function(block) {
  var code = '_GOODS_CHK(';
  code += ')\n';
  return code;
};
commandMap['_GOODS_NAME'] = { type: 'bdsp__goods_name', args: 0 };
Blockly.Blocks['bdsp__goods_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_GOODS_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__goods_name'] = function(block) {
  var code = '_GOODS_NAME(';
  code += ')\n';
  return code;
};
commandMap['_GROUP_ENTRY'] = { type: 'bdsp__group_entry', args: 0 };
Blockly.Blocks['bdsp__group_entry'] = {
  init: function() {
    this.appendDummyInput().appendField('_GROUP_ENTRY');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__group_entry'] = function(block) {
  var code = '_GROUP_ENTRY(';
  code += ')\n';
  return code;
};
commandMap['_GROUP_ENTRY_CHECK'] = { type: 'bdsp__group_entry_check', args: 0 };
Blockly.Blocks['bdsp__group_entry_check'] = {
  init: function() {
    this.appendDummyInput().appendField('_GROUP_ENTRY_CHECK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__group_entry_check'] = function(block) {
  var code = '_GROUP_ENTRY_CHECK(';
  code += ')\n';
  return code;
};
commandMap['_GROUP_EXIST_CHECK'] = { type: 'bdsp__group_exist_check', args: 0 };
Blockly.Blocks['bdsp__group_exist_check'] = {
  init: function() {
    this.appendDummyInput().appendField('_GROUP_EXIST_CHECK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__group_exist_check'] = function(block) {
  var code = '_GROUP_EXIST_CHECK(';
  code += ')\n';
  return code;
};
commandMap['_GROUP_LEADER_NAME'] = { type: 'bdsp__group_leader_name', args: 0 };
Blockly.Blocks['bdsp__group_leader_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_GROUP_LEADER_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__group_leader_name'] = function(block) {
  var code = '_GROUP_LEADER_NAME(';
  code += ')\n';
  return code;
};
commandMap['_GROUP_MAKE'] = { type: 'bdsp__group_make', args: 0 };
Blockly.Blocks['bdsp__group_make'] = {
  init: function() {
    this.appendDummyInput().appendField('_GROUP_MAKE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__group_make'] = function(block) {
  var code = '_GROUP_MAKE(';
  code += ')\n';
  return code;
};
commandMap['_GROUP_NAME'] = { type: 'bdsp__group_name', args: 0 };
Blockly.Blocks['bdsp__group_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_GROUP_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__group_name'] = function(block) {
  var code = '_GROUP_NAME(';
  code += ')\n';
  return code;
};
commandMap['_GROUP_NAME_IN'] = { type: 'bdsp__group_name_in', args: 0 };
Blockly.Blocks['bdsp__group_name_in'] = {
  init: function() {
    this.appendDummyInput().appendField('_GROUP_NAME_IN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__group_name_in'] = function(block) {
  var code = '_GROUP_NAME_IN(';
  code += ')\n';
  return code;
};
commandMap['_GUINNESS_WIN'] = { type: 'bdsp__guinness_win', args: 0 };
Blockly.Blocks['bdsp__guinness_win'] = {
  init: function() {
    this.appendDummyInput().appendField('_GUINNESS_WIN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unknown use. Pretty much unused.");
  }
};
Blockly.JavaScript['bdsp__guinness_win'] = function(block) {
  var code = '_GUINNESS_WIN(';
  code += ')\n';
  return code;
};
commandMap['_HAIFU_POKE_RETRY_CHECK'] = { type: 'bdsp__haifu_poke_retry_check', args: 0 };
Blockly.Blocks['bdsp__haifu_poke_retry_check'] = {
  init: function() {
    this.appendDummyInput().appendField('_HAIFU_POKE_RETRY_CHECK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__haifu_poke_retry_check'] = function(block) {
  var code = '_HAIFU_POKE_RETRY_CHECK(';
  code += ')\n';
  return code;
};
commandMap['_HERO_MOVE_GRID_CENTER'] = { type: 'bdsp__hero_move_grid_center', args: 0 };
Blockly.Blocks['bdsp__hero_move_grid_center'] = {
  init: function() {
    this.appendDummyInput().appendField('_HERO_MOVE_GRID_CENTER');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__hero_move_grid_center'] = function(block) {
  var code = '_HERO_MOVE_GRID_CENTER(';
  code += ')\n';
  return code;
};
commandMap['_HERO_MOVE_GRID_CENTER_FRONT'] = { type: 'bdsp__hero_move_grid_center_front', args: 0 };
Blockly.Blocks['bdsp__hero_move_grid_center_front'] = {
  init: function() {
    this.appendDummyInput().appendField('_HERO_MOVE_GRID_CENTER_FRONT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__hero_move_grid_center_front'] = function(block) {
  var code = '_HERO_MOVE_GRID_CENTER_FRONT(';
  code += ')\n';
  return code;
};
commandMap['_HIDEMAP_STATE_CHG'] = { type: 'bdsp__hidemap_state_chg', args: 0 };
Blockly.Blocks['bdsp__hidemap_state_chg'] = {
  init: function() {
    this.appendDummyInput().appendField('_HIDEMAP_STATE_CHG');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__hidemap_state_chg'] = function(block) {
  var code = '_HIDEMAP_STATE_CHG(';
  code += ')\n';
  return code;
};
commandMap['_HIDENEFF_START'] = { type: 'bdsp__hideneff_start', args: 0 };
Blockly.Blocks['bdsp__hideneff_start'] = {
  init: function() {
    this.appendDummyInput().appendField('_HIDENEFF_START');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__hideneff_start'] = function(block) {
  var code = '_HIDENEFF_START(';
  code += ')\n';
  return code;
};
commandMap['_HIDENEFF_WAIT'] = { type: 'bdsp__hideneff_wait', args: 0 };
Blockly.Blocks['bdsp__hideneff_wait'] = {
  init: function() {
    this.appendDummyInput().appendField('_HIDENEFF_WAIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__hideneff_wait'] = function(block) {
  var code = '_HIDENEFF_WAIT(';
  code += ')\n';
  return code;
};
commandMap['_HIDEN_FLASH'] = { type: 'bdsp__hiden_flash', args: 0 };
Blockly.Blocks['bdsp__hiden_flash'] = {
  init: function() {
    this.appendDummyInput().appendField('_HIDEN_FLASH');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__hiden_flash'] = function(block) {
  var code = '_HIDEN_FLASH(';
  code += ')\n';
  return code;
};
commandMap['_HIDEN_KIRIBARAI'] = { type: 'bdsp__hiden_kiribarai', args: 0 };
Blockly.Blocks['bdsp__hiden_kiribarai'] = {
  init: function() {
    this.appendDummyInput().appendField('_HIDEN_KIRIBARAI');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__hiden_kiribarai'] = function(block) {
  var code = '_HIDEN_KIRIBARAI(';
  code += ')\n';
  return code;
};
commandMap['_HIDE_ITEM_EVENT'] = { type: 'bdsp__hide_item_event', args: 0 };
Blockly.Blocks['bdsp__hide_item_event'] = {
  init: function() {
    this.appendDummyInput().appendField('_HIDE_ITEM_EVENT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__hide_item_event'] = function(block) {
  var code = '_HIDE_ITEM_EVENT(';
  code += ')\n';
  return code;
};
commandMap['_HIKITORI_LIST'] = { type: 'bdsp__hikitori_list', args: 0 };
Blockly.Blocks['bdsp__hikitori_list'] = {
  init: function() {
    this.appendDummyInput().appendField('_HIKITORI_LIST');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__hikitori_list'] = function(block) {
  var code = '_HIKITORI_LIST(';
  code += ')\n';
  return code;
};
commandMap['_HIKITORI_LIST_NAME_SET'] = { type: 'bdsp__hikitori_list_name_set', args: 0 };
Blockly.Blocks['bdsp__hikitori_list_name_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_HIKITORI_LIST_NAME_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__hikitori_list_name_set'] = function(block) {
  var code = '_HIKITORI_LIST_NAME_SET(';
  code += ')\n';
  return code;
};
commandMap['_HIKITORI_POKE'] = { type: 'bdsp__hikitori_poke', args: 0 };
Blockly.Blocks['bdsp__hikitori_poke'] = {
  init: function() {
    this.appendDummyInput().appendField('_HIKITORI_POKE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__hikitori_poke'] = function(block) {
  var code = '_HIKITORI_POKE(';
  code += ')\n';
  return code;
};
commandMap['_HIKITORI_RYOUKIN'] = { type: 'bdsp__hikitori_ryoukin', args: 0 };
Blockly.Blocks['bdsp__hikitori_ryoukin'] = {
  init: function() {
    this.appendDummyInput().appendField('_HIKITORI_RYOUKIN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__hikitori_ryoukin'] = function(block) {
  var code = '_HIKITORI_RYOUKIN(';
  code += ')\n';
  return code;
};
commandMap['_HIT_DOOR_ANIME'] = { type: 'bdsp__hit_door_anime', args: 0 };
Blockly.Blocks['bdsp__hit_door_anime'] = {
  init: function() {
    this.appendDummyInput().appendField('_HIT_DOOR_ANIME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__hit_door_anime'] = function(block) {
  var code = '_HIT_DOOR_ANIME(';
  code += ')\n';
  return code;
};
commandMap['_HIT_DOOR_ANIME_WAIT'] = { type: 'bdsp__hit_door_anime_wait', args: 0 };
Blockly.Blocks['bdsp__hit_door_anime_wait'] = {
  init: function() {
    this.appendDummyInput().appendField('_HIT_DOOR_ANIME_WAIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__hit_door_anime_wait'] = function(block) {
  var code = '_HIT_DOOR_ANIME_WAIT(';
  code += ')\n';
  return code;
};
commandMap['_HONEY_TREE'] = { type: 'bdsp__honey_tree', args: 0 };
Blockly.Blocks['bdsp__honey_tree'] = {
  init: function() {
    this.appendDummyInput().appendField('_HONEY_TREE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__honey_tree'] = function(block) {
  var code = '_HONEY_TREE(';
  code += ')\n';
  return code;
};
commandMap['_HONEY_TREE_AFTER_SET'] = { type: 'bdsp__honey_tree_after_set', args: 0 };
Blockly.Blocks['bdsp__honey_tree_after_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_HONEY_TREE_AFTER_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__honey_tree_after_set'] = function(block) {
  var code = '_HONEY_TREE_AFTER_SET(';
  code += ')\n';
  return code;
};
commandMap['_HONEY_TREE_BTL_SET'] = { type: 'bdsp__honey_tree_btl_set', args: 0 };
Blockly.Blocks['bdsp__honey_tree_btl_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_HONEY_TREE_BTL_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__honey_tree_btl_set'] = function(block) {
  var code = '_HONEY_TREE_BTL_SET(';
  code += ')\n';
  return code;
};
commandMap['_IFVAL_CALL'] = { type: 'bdsp__ifval_call', args: 4 };
Blockly.Blocks['bdsp__ifval_call'] = {
  init: function() {
    this.appendDummyInput().appendField('_IFVAL_CALL');
    this.appendValueInput('ARG_0').appendField('Value1');
    this.appendValueInput('ARG_1').appendField('Condition');
    this.appendValueInput('ARG_2').appendField('Value2');
    this.appendValueInput('ARG_3').appendField('Script');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Compares two values, then calls a script if true.");
  }
};
Blockly.JavaScript['bdsp__ifval_call'] = function(block) {
  var code = '_IFVAL_CALL(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_3', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_IFVAL_JUMP'] = { type: 'bdsp__ifval_jump', args: 4 };
Blockly.Blocks['bdsp__ifval_jump'] = {
  init: function() {
    this.appendDummyInput().appendField('_IFVAL_JUMP');
    this.appendValueInput('ARG_0').appendField('Value1');
    this.appendValueInput('ARG_1').appendField('Condition');
    this.appendValueInput('ARG_2').appendField('Value2');
    this.appendValueInput('ARG_3').appendField('Script');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Compares two values, then jumps to a script if true.");
  }
};
Blockly.JavaScript['bdsp__ifval_jump'] = function(block) {
  var code = '_IFVAL_JUMP(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_3', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_IFWK_CALL'] = { type: 'bdsp__ifwk_call', args: 0 };
Blockly.Blocks['bdsp__ifwk_call'] = {
  init: function() {
    this.appendDummyInput().appendField('_IFWK_CALL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__ifwk_call'] = function(block) {
  var code = '_IFWK_CALL(';
  code += ')\n';
  return code;
};
commandMap['_IFWK_JUMP'] = { type: 'bdsp__ifwk_jump', args: 4 };
Blockly.Blocks['bdsp__ifwk_jump'] = {
  init: function() {
    this.appendDummyInput().appendField('_IFWK_JUMP');
    this.appendValueInput('ARG_0').appendField('Variable');
    this.appendValueInput('ARG_1').appendField('Condition');
    this.appendValueInput('ARG_2').appendField('Value');
    this.appendValueInput('ARG_3').appendField('Script');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Compares the value of a variable to a value, then jumps to a script if true.");
  }
};
Blockly.JavaScript['bdsp__ifwk_jump'] = function(block) {
  var code = '_IFWK_JUMP(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_3', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_IF_CALL'] = { type: 'bdsp__if_call', args: 0 };
Blockly.Blocks['bdsp__if_call'] = {
  init: function() {
    this.appendDummyInput().appendField('_IF_CALL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__if_call'] = function(block) {
  var code = '_IF_CALL(';
  code += ')\n';
  return code;
};
commandMap['_IF_FLAGOFF_CALL'] = { type: 'bdsp__if_flagoff_call', args: 2 };
Blockly.Blocks['bdsp__if_flagoff_call'] = {
  init: function() {
    this.appendDummyInput().appendField('_IF_FLAGOFF_CALL');
    this.appendValueInput('ARG_0').appendField('Flag');
    this.appendValueInput('ARG_1').appendField('Script');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Checks a flag and if it isn't set, calls a script.");
  }
};
Blockly.JavaScript['bdsp__if_flagoff_call'] = function(block) {
  var code = '_IF_FLAGOFF_CALL(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_IF_FLAGOFF_JUMP'] = { type: 'bdsp__if_flagoff_jump', args: 2 };
Blockly.Blocks['bdsp__if_flagoff_jump'] = {
  init: function() {
    this.appendDummyInput().appendField('_IF_FLAGOFF_JUMP');
    this.appendValueInput('ARG_0').appendField('Flag');
    this.appendValueInput('ARG_1').appendField('Script');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Checks a flag and if it isn't set, jumps to a script.");
  }
};
Blockly.JavaScript['bdsp__if_flagoff_jump'] = function(block) {
  var code = '_IF_FLAGOFF_JUMP(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_IF_FLAGON_CALL'] = { type: 'bdsp__if_flagon_call', args: 2 };
Blockly.Blocks['bdsp__if_flagon_call'] = {
  init: function() {
    this.appendDummyInput().appendField('_IF_FLAGON_CALL');
    this.appendValueInput('ARG_0').appendField('Flag');
    this.appendValueInput('ARG_1').appendField('Script');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Checks a flag and if it is set, calls a script.");
  }
};
Blockly.JavaScript['bdsp__if_flagon_call'] = function(block) {
  var code = '_IF_FLAGON_CALL(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_IF_FLAGON_JUMP'] = { type: 'bdsp__if_flagon_jump', args: 2 };
Blockly.Blocks['bdsp__if_flagon_jump'] = {
  init: function() {
    this.appendDummyInput().appendField('_IF_FLAGON_JUMP');
    this.appendValueInput('ARG_0').appendField('Flag');
    this.appendValueInput('ARG_1').appendField('Script');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Checks a flag and if it is set, jumps to a script.");
  }
};
Blockly.JavaScript['bdsp__if_flagon_jump'] = function(block) {
  var code = '_IF_FLAGON_JUMP(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_IF_JUMP'] = { type: 'bdsp__if_jump', args: 2 };
Blockly.Blocks['bdsp__if_jump'] = {
  init: function() {
    this.appendDummyInput().appendField('_IF_JUMP');
    this.appendValueInput('ARG_0').appendField('Condition');
    this.appendValueInput('ARG_1').appendField('Script');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Used after _CMPWK. Used once in unused poison scripts.");
  }
};
Blockly.JavaScript['bdsp__if_jump'] = function(block) {
  var code = '_IF_JUMP(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_IF_TR_FLAGOFF_CALL'] = { type: 'bdsp__if_tr_flagoff_call', args: 2 };
Blockly.Blocks['bdsp__if_tr_flagoff_call'] = {
  init: function() {
    this.appendDummyInput().appendField('_IF_TR_FLAGOFF_CALL');
    this.appendValueInput('ARG_0').appendField('Flag');
    this.appendValueInput('ARG_1').appendField('Script');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused. Checks a trainer flag. If it isn't set, calls a script.");
  }
};
Blockly.JavaScript['bdsp__if_tr_flagoff_call'] = function(block) {
  var code = '_IF_TR_FLAGOFF_CALL(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_IF_TR_FLAGOFF_JUMP'] = { type: 'bdsp__if_tr_flagoff_jump', args: 2 };
Blockly.Blocks['bdsp__if_tr_flagoff_jump'] = {
  init: function() {
    this.appendDummyInput().appendField('_IF_TR_FLAGOFF_JUMP');
    this.appendValueInput('ARG_0').appendField('Flag');
    this.appendValueInput('ARG_1').appendField('Script');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused. Checks a trainer flag. If it isn't set, jumps to a script.");
  }
};
Blockly.JavaScript['bdsp__if_tr_flagoff_jump'] = function(block) {
  var code = '_IF_TR_FLAGOFF_JUMP(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_IF_TR_FLAGON_CALL'] = { type: 'bdsp__if_tr_flagon_call', args: 2 };
Blockly.Blocks['bdsp__if_tr_flagon_call'] = {
  init: function() {
    this.appendDummyInput().appendField('_IF_TR_FLAGON_CALL');
    this.appendValueInput('ARG_0').appendField('Flag');
    this.appendValueInput('ARG_1').appendField('Script');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused. Checks a trainer flag. If it is set, calls a script.");
  }
};
Blockly.JavaScript['bdsp__if_tr_flagon_call'] = function(block) {
  var code = '_IF_TR_FLAGON_CALL(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_IF_TR_FLAGON_JUMP'] = { type: 'bdsp__if_tr_flagon_jump', args: 2 };
Blockly.Blocks['bdsp__if_tr_flagon_jump'] = {
  init: function() {
    this.appendDummyInput().appendField('_IF_TR_FLAGON_JUMP');
    this.appendValueInput('ARG_0').appendField('Flag');
    this.appendValueInput('ARG_1').appendField('Script');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Checks a trainer flag. If it is set, jumps to a script.");
  }
};
Blockly.JavaScript['bdsp__if_tr_flagon_jump'] = function(block) {
  var code = '_IF_TR_FLAGON_JUMP(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_IMAGE_CLIP_SET_PROC'] = { type: 'bdsp__image_clip_set_proc', args: 0 };
Blockly.Blocks['bdsp__image_clip_set_proc'] = {
  init: function() {
    this.appendDummyInput().appendField('_IMAGE_CLIP_SET_PROC');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__image_clip_set_proc'] = function(block) {
  var code = '_IMAGE_CLIP_SET_PROC(';
  code += ')\n';
  return code;
};
commandMap['_IMAGE_CLIP_VIEW_CON_CHECK_PROC'] = { type: 'bdsp__image_clip_view_con_check_proc', args: 2 };
Blockly.Blocks['bdsp__image_clip_view_con_check_proc'] = {
  init: function() {
    this.appendDummyInput().appendField('_IMAGE_CLIP_VIEW_CON_CHECK_PROC');
    this.appendValueInput('ARG_0').appendField('Unknown1');
    this.appendValueInput('ARG_1').appendField('Unknown2');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unknown use. Something related to contests.");
  }
};
Blockly.JavaScript['bdsp__image_clip_view_con_check_proc'] = function(block) {
  var code = '_IMAGE_CLIP_VIEW_CON_CHECK_PROC(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_IMAGE_CLIP_VIEW_CON_SET_PROC'] = { type: 'bdsp__image_clip_view_con_set_proc', args: 1 };
Blockly.Blocks['bdsp__image_clip_view_con_set_proc'] = {
  init: function() {
    this.appendDummyInput().appendField('_IMAGE_CLIP_VIEW_CON_SET_PROC');
    this.appendValueInput('ARG_0').appendField('Unknown');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unknown use. Something related to contests.");
  }
};
Blockly.JavaScript['bdsp__image_clip_view_con_set_proc'] = function(block) {
  var code = '_IMAGE_CLIP_VIEW_CON_SET_PROC(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_IMAGE_CLIP_VIEW_TV_SET_PROC'] = { type: 'bdsp__image_clip_view_tv_set_proc', args: 0 };
Blockly.Blocks['bdsp__image_clip_view_tv_set_proc'] = {
  init: function() {
    this.appendDummyInput().appendField('_IMAGE_CLIP_VIEW_TV_SET_PROC');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__image_clip_view_tv_set_proc'] = function(block) {
  var code = '_IMAGE_CLIP_VIEW_TV_SET_PROC(';
  code += ')\n';
  return code;
};
commandMap['_IMC_ACCE_ADD_ITEM'] = { type: 'bdsp__imc_acce_add_item', args: 0 };
Blockly.Blocks['bdsp__imc_acce_add_item'] = {
  init: function() {
    this.appendDummyInput().appendField('_IMC_ACCE_ADD_ITEM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__imc_acce_add_item'] = function(block) {
  var code = '_IMC_ACCE_ADD_ITEM(';
  code += ')\n';
  return code;
};
commandMap['_IMC_ACCE_ADD_ITEM_CHK'] = { type: 'bdsp__imc_acce_add_item_chk', args: 0 };
Blockly.Blocks['bdsp__imc_acce_add_item_chk'] = {
  init: function() {
    this.appendDummyInput().appendField('_IMC_ACCE_ADD_ITEM_CHK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__imc_acce_add_item_chk'] = function(block) {
  var code = '_IMC_ACCE_ADD_ITEM_CHK(';
  code += ')\n';
  return code;
};
commandMap['_IMC_ACCE_ITEM_CHK'] = { type: 'bdsp__imc_acce_item_chk', args: 0 };
Blockly.Blocks['bdsp__imc_acce_item_chk'] = {
  init: function() {
    this.appendDummyInput().appendField('_IMC_ACCE_ITEM_CHK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__imc_acce_item_chk'] = function(block) {
  var code = '_IMC_ACCE_ITEM_CHK(';
  code += ')\n';
  return code;
};
commandMap['_IMC_ACCE_SUB_ITEM'] = { type: 'bdsp__imc_acce_sub_item', args: 0 };
Blockly.Blocks['bdsp__imc_acce_sub_item'] = {
  init: function() {
    this.appendDummyInput().appendField('_IMC_ACCE_SUB_ITEM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__imc_acce_sub_item'] = function(block) {
  var code = '_IMC_ACCE_SUB_ITEM(';
  code += ')\n';
  return code;
};
commandMap['_IMC_BG_ADD_ITEM'] = { type: 'bdsp__imc_bg_add_item', args: 0 };
Blockly.Blocks['bdsp__imc_bg_add_item'] = {
  init: function() {
    this.appendDummyInput().appendField('_IMC_BG_ADD_ITEM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__imc_bg_add_item'] = function(block) {
  var code = '_IMC_BG_ADD_ITEM(';
  code += ')\n';
  return code;
};
commandMap['_IMC_BG_ITEM_CHK'] = { type: 'bdsp__imc_bg_item_chk', args: 0 };
Blockly.Blocks['bdsp__imc_bg_item_chk'] = {
  init: function() {
    this.appendDummyInput().appendField('_IMC_BG_ITEM_CHK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__imc_bg_item_chk'] = function(block) {
  var code = '_IMC_BG_ITEM_CHK(';
  code += ')\n';
  return code;
};
commandMap['_IMC_BG_NAME'] = { type: 'bdsp__imc_bg_name', args: 0 };
Blockly.Blocks['bdsp__imc_bg_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_IMC_BG_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__imc_bg_name'] = function(block) {
  var code = '_IMC_BG_NAME(';
  code += ')\n';
  return code;
};
commandMap['_INFOBOARD_MAKE'] = { type: 'bdsp__infoboard_make', args: 0 };
Blockly.Blocks['bdsp__infoboard_make'] = {
  init: function() {
    this.appendDummyInput().appendField('_INFOBOARD_MAKE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__infoboard_make'] = function(block) {
  var code = '_INFOBOARD_MAKE(';
  code += ')\n';
  return code;
};
commandMap['_INIT_CHANGE_LABEL'] = { type: 'bdsp__init_change_label', args: 0 };
Blockly.Blocks['bdsp__init_change_label'] = {
  init: function() {
    this.appendDummyInput().appendField('_INIT_CHANGE_LABEL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__init_change_label'] = function(block) {
  var code = '_INIT_CHANGE_LABEL(';
  code += ')\n';
  return code;
};
commandMap['_INIT_COMBAT_GYM'] = { type: 'bdsp__init_combat_gym', args: 0 };
Blockly.Blocks['bdsp__init_combat_gym'] = {
  init: function() {
    this.appendDummyInput().appendField('_INIT_COMBAT_GYM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__init_combat_gym'] = function(block) {
  var code = '_INIT_COMBAT_GYM(';
  code += ')\n';
  return code;
};
commandMap['_INIT_ELEC_GYM'] = { type: 'bdsp__init_elec_gym', args: 0 };
Blockly.Blocks['bdsp__init_elec_gym'] = {
  init: function() {
    this.appendDummyInput().appendField('_INIT_ELEC_GYM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__init_elec_gym'] = function(block) {
  var code = '_INIT_ELEC_GYM(';
  code += ')\n';
  return code;
};
commandMap['_INIT_FLD_LIFT'] = { type: 'bdsp__init_fld_lift', args: 0 };
Blockly.Blocks['bdsp__init_fld_lift'] = {
  init: function() {
    this.appendDummyInput().appendField('_INIT_FLD_LIFT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__init_fld_lift'] = function(block) {
  var code = '_INIT_FLD_LIFT(';
  code += ')\n';
  return code;
};
commandMap['_INIT_GHOST_GYM'] = { type: 'bdsp__init_ghost_gym', args: 0 };
Blockly.Blocks['bdsp__init_ghost_gym'] = {
  init: function() {
    this.appendDummyInput().appendField('_INIT_GHOST_GYM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__init_ghost_gym'] = function(block) {
  var code = '_INIT_GHOST_GYM(';
  code += ')\n';
  return code;
};
commandMap['_INIT_SAFARI_TRAIN'] = { type: 'bdsp__init_safari_train', args: 0 };
Blockly.Blocks['bdsp__init_safari_train'] = {
  init: function() {
    this.appendDummyInput().appendField('_INIT_SAFARI_TRAIN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__init_safari_train'] = function(block) {
  var code = '_INIT_SAFARI_TRAIN(';
  code += ')\n';
  return code;
};
commandMap['_INIT_STEEL_GYM'] = { type: 'bdsp__init_steel_gym', args: 0 };
Blockly.Blocks['bdsp__init_steel_gym'] = {
  init: function() {
    this.appendDummyInput().appendField('_INIT_STEEL_GYM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__init_steel_gym'] = function(block) {
  var code = '_INIT_STEEL_GYM(';
  code += ')\n';
  return code;
};
commandMap['_INIT_WATER_GYM'] = { type: 'bdsp__init_water_gym', args: 0 };
Blockly.Blocks['bdsp__init_water_gym'] = {
  init: function() {
    this.appendDummyInput().appendField('_INIT_WATER_GYM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__init_water_gym'] = function(block) {
  var code = '_INIT_WATER_GYM(';
  code += ')\n';
  return code;
};
commandMap['_INIT_WEATHER'] = { type: 'bdsp__init_weather', args: 0 };
Blockly.Blocks['bdsp__init_weather'] = {
  init: function() {
    this.appendDummyInput().appendField('_INIT_WEATHER');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__init_weather'] = function(block) {
  var code = '_INIT_WEATHER(';
  code += ')\n';
  return code;
};
commandMap['_INPUT_JUMP'] = { type: 'bdsp__input_jump', args: 0 };
Blockly.Blocks['bdsp__input_jump'] = {
  init: function() {
    this.appendDummyInput().appendField('_INPUT_JUMP');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__input_jump'] = function(block) {
  var code = '_INPUT_JUMP(';
  code += ')\n';
  return code;
};
commandMap['_INVISIBLE_OBJ_PROP'] = { type: 'bdsp__invisible_obj_prop', args: 0 };
Blockly.Blocks['bdsp__invisible_obj_prop'] = {
  init: function() {
    this.appendDummyInput().appendField('_INVISIBLE_OBJ_PROP');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__invisible_obj_prop'] = function(block) {
  var code = '_INVISIBLE_OBJ_PROP(';
  code += ')\n';
  return code;
};
commandMap['_IS_HAIHU_EVENT_ENABLE'] = { type: 'bdsp__is_haihu_event_enable', args: 0 };
Blockly.Blocks['bdsp__is_haihu_event_enable'] = {
  init: function() {
    this.appendDummyInput().appendField('_IS_HAIHU_EVENT_ENABLE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__is_haihu_event_enable'] = function(block) {
  var code = '_IS_HAIHU_EVENT_ENABLE(';
  code += ')\n';
  return code;
};
commandMap['_ITEMLIST_GET_RESULT'] = { type: 'bdsp__itemlist_get_result', args: 0 };
Blockly.Blocks['bdsp__itemlist_get_result'] = {
  init: function() {
    this.appendDummyInput().appendField('_ITEMLIST_GET_RESULT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__itemlist_get_result'] = function(block) {
  var code = '_ITEMLIST_GET_RESULT(';
  code += ')\n';
  return code;
};
commandMap['_ITEMLIST_SET_PROC'] = { type: 'bdsp__itemlist_set_proc', args: 0 };
Blockly.Blocks['bdsp__itemlist_set_proc'] = {
  init: function() {
    this.appendDummyInput().appendField('_ITEMLIST_SET_PROC');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__itemlist_set_proc'] = function(block) {
  var code = '_ITEMLIST_SET_PROC(';
  code += ')\n';
  return code;
};
commandMap['_ITEMNO_TO_MONSNO'] = { type: 'bdsp__itemno_to_monsno', args: 0 };
Blockly.Blocks['bdsp__itemno_to_monsno'] = {
  init: function() {
    this.appendDummyInput().appendField('_ITEMNO_TO_MONSNO');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__itemno_to_monsno'] = function(block) {
  var code = '_ITEMNO_TO_MONSNO(';
  code += ')\n';
  return code;
};
commandMap['_ITEM_CHK'] = { type: 'bdsp__item_chk', args: 3 };
Blockly.Blocks['bdsp__item_chk'] = {
  init: function() {
    this.appendDummyInput().appendField('_ITEM_CHK');
    this.appendValueInput('ARG_0').appendField('Item');
    this.appendValueInput('ARG_1').appendField('Amount');
    this.appendValueInput('ARG_2').appendField('Result');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Checks if the player has an amount of an item.");
  }
};
Blockly.JavaScript['bdsp__item_chk'] = function(block) {
  var code = '_ITEM_CHK(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_ITEM_NAME'] = { type: 'bdsp__item_name', args: 3 };
Blockly.Blocks['bdsp__item_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_ITEM_NAME');
    this.appendValueInput('ARG_0').appendField('Buffer');
    this.appendValueInput('ARG_1').appendField('Item');
    this.appendValueInput('ARG_2').appendField('Amount');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Puts the name of the given item into a buffer.");
  }
};
Blockly.JavaScript['bdsp__item_name'] = function(block) {
  var code = '_ITEM_NAME(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_ITEM_WAZA_NAME'] = { type: 'bdsp__item_waza_name', args: 0 };
Blockly.Blocks['bdsp__item_waza_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_ITEM_WAZA_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__item_waza_name'] = function(block) {
  var code = '_ITEM_WAZA_NAME(';
  code += ')\n';
  return code;
};
commandMap['_JUMP'] = { type: 'bdsp__jump', args: 1 };
Blockly.Blocks['bdsp__jump'] = {
  init: function() {
    this.appendDummyInput().appendField('_JUMP');
    this.appendValueInput('ARG_0').appendField('Script');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Jumps to a script.");
  }
};
Blockly.JavaScript['bdsp__jump'] = function(block) {
  var code = '_JUMP(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_KABENOBORI'] = { type: 'bdsp__kabenobori', args: 0 };
Blockly.Blocks['bdsp__kabenobori'] = {
  init: function() {
    this.appendDummyInput().appendField('_KABENOBORI');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__kabenobori'] = function(block) {
  var code = '_KABENOBORI(';
  code += ')\n';
  return code;
};
commandMap['_KABENOBORI_CHECK'] = { type: 'bdsp__kabenobori_check', args: 0 };
Blockly.Blocks['bdsp__kabenobori_check'] = {
  init: function() {
    this.appendDummyInput().appendField('_KABENOBORI_CHECK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__kabenobori_check'] = function(block) {
  var code = '_KABENOBORI_CHECK(';
  code += ')\n';
  return code;
};
commandMap['_KASEKI_COUNT'] = { type: 'bdsp__kaseki_count', args: 0 };
Blockly.Blocks['bdsp__kaseki_count'] = {
  init: function() {
    this.appendDummyInput().appendField('_KASEKI_COUNT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__kaseki_count'] = function(block) {
  var code = '_KASEKI_COUNT(';
  code += ')\n';
  return code;
};
commandMap['_KASEKI_ITEMNO'] = { type: 'bdsp__kaseki_itemno', args: 0 };
Blockly.Blocks['bdsp__kaseki_itemno'] = {
  init: function() {
    this.appendDummyInput().appendField('_KASEKI_ITEMNO');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__kaseki_itemno'] = function(block) {
  var code = '_KASEKI_ITEMNO(';
  code += ')\n';
  return code;
};
commandMap['_KUJI_ATARI_CHK'] = { type: 'bdsp__kuji_atari_chk', args: 0 };
Blockly.Blocks['bdsp__kuji_atari_chk'] = {
  init: function() {
    this.appendDummyInput().appendField('_KUJI_ATARI_CHK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__kuji_atari_chk'] = function(block) {
  var code = '_KUJI_ATARI_CHK(';
  code += ')\n';
  return code;
};
commandMap['_KUJI_ATARI_INIT'] = { type: 'bdsp__kuji_atari_init', args: 0 };
Blockly.Blocks['bdsp__kuji_atari_init'] = {
  init: function() {
    this.appendDummyInput().appendField('_KUJI_ATARI_INIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__kuji_atari_init'] = function(block) {
  var code = '_KUJI_ATARI_INIT(';
  code += ')\n';
  return code;
};
commandMap['_LAST_KEYWAIT'] = { type: 'bdsp__last_keywait', args: 0 };
Blockly.Blocks['bdsp__last_keywait'] = {
  init: function() {
    this.appendDummyInput().appendField('_LAST_KEYWAIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Waits for a key press.");
  }
};
Blockly.JavaScript['bdsp__last_keywait'] = function(block) {
  var code = '_LAST_KEYWAIT(';
  code += ')\n';
  return code;
};
commandMap['_LDVAL'] = { type: 'bdsp__ldval', args: 2 };
Blockly.Blocks['bdsp__ldval'] = {
  init: function() {
    this.appendDummyInput().appendField('_LDVAL');
    this.appendValueInput('ARG_0').appendField('Variable');
    this.appendValueInput('ARG_1').appendField('Value');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Set a variable to a value.");
  }
};
Blockly.JavaScript['bdsp__ldval'] = function(block) {
  var code = '_LDVAL(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_LDVAL_SEX'] = { type: 'bdsp__ldval_sex', args: 0 };
Blockly.Blocks['bdsp__ldval_sex'] = {
  init: function() {
    this.appendDummyInput().appendField('_LDVAL_SEX');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__ldval_sex'] = function(block) {
  var code = '_LDVAL_SEX(';
  code += ')\n';
  return code;
};
commandMap['_LDVAL_VERSION'] = { type: 'bdsp__ldval_version', args: 0 };
Blockly.Blocks['bdsp__ldval_version'] = {
  init: function() {
    this.appendDummyInput().appendField('_LDVAL_VERSION');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__ldval_version'] = function(block) {
  var code = '_LDVAL_VERSION(';
  code += ')\n';
  return code;
};
commandMap['_LDWK'] = { type: 'bdsp__ldwk', args: 2 };
Blockly.Blocks['bdsp__ldwk'] = {
  init: function() {
    this.appendDummyInput().appendField('_LDWK');
    this.appendValueInput('ARG_0').appendField('Variable');
    this.appendValueInput('ARG_1').appendField('Value');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Set a variable to a value.");
  }
};
Blockly.JavaScript['bdsp__ldwk'] = function(block) {
  var code = '_LDWK(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_LDWKVAL'] = { type: 'bdsp__ldwkval', args: 0 };
Blockly.Blocks['bdsp__ldwkval'] = {
  init: function() {
    this.appendDummyInput().appendField('_LDWKVAL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__ldwkval'] = function(block) {
  var code = '_LDWKVAL(';
  code += ')\n';
  return code;
};
commandMap['_LD_ADR_ADR'] = { type: 'bdsp__ld_adr_adr', args: 0 };
Blockly.Blocks['bdsp__ld_adr_adr'] = {
  init: function() {
    this.appendDummyInput().appendField('_LD_ADR_ADR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__ld_adr_adr'] = function(block) {
  var code = '_LD_ADR_ADR(';
  code += ')\n';
  return code;
};
commandMap['_LD_ADR_REG'] = { type: 'bdsp__ld_adr_reg', args: 0 };
Blockly.Blocks['bdsp__ld_adr_reg'] = {
  init: function() {
    this.appendDummyInput().appendField('_LD_ADR_REG');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__ld_adr_reg'] = function(block) {
  var code = '_LD_ADR_REG(';
  code += ')\n';
  return code;
};
commandMap['_LD_ADR_VAL'] = { type: 'bdsp__ld_adr_val', args: 0 };
Blockly.Blocks['bdsp__ld_adr_val'] = {
  init: function() {
    this.appendDummyInput().appendField('_LD_ADR_VAL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__ld_adr_val'] = function(block) {
  var code = '_LD_ADR_VAL(';
  code += ')\n';
  return code;
};
commandMap['_LD_REG_ADR'] = { type: 'bdsp__ld_reg_adr', args: 0 };
Blockly.Blocks['bdsp__ld_reg_adr'] = {
  init: function() {
    this.appendDummyInput().appendField('_LD_REG_ADR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__ld_reg_adr'] = function(block) {
  var code = '_LD_REG_ADR(';
  code += ')\n';
  return code;
};
commandMap['_LD_REG_REG'] = { type: 'bdsp__ld_reg_reg', args: 0 };
Blockly.Blocks['bdsp__ld_reg_reg'] = {
  init: function() {
    this.appendDummyInput().appendField('_LD_REG_REG');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__ld_reg_reg'] = function(block) {
  var code = '_LD_REG_REG(';
  code += ')\n';
  return code;
};
commandMap['_LD_REG_VAL'] = { type: 'bdsp__ld_reg_val', args: 0 };
Blockly.Blocks['bdsp__ld_reg_val'] = {
  init: function() {
    this.appendDummyInput().appendField('_LD_REG_VAL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__ld_reg_val'] = function(block) {
  var code = '_LD_REG_VAL(';
  code += ')\n';
  return code;
};
commandMap['_LD_REG_WDATA'] = { type: 'bdsp__ld_reg_wdata', args: 0 };
Blockly.Blocks['bdsp__ld_reg_wdata'] = {
  init: function() {
    this.appendDummyInput().appendField('_LD_REG_WDATA');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__ld_reg_wdata'] = function(block) {
  var code = '_LD_REG_WDATA(';
  code += ')\n';
  return code;
};
commandMap['_LEVEL_JIJII_INIT'] = { type: 'bdsp__level_jijii_init', args: 0 };
Blockly.Blocks['bdsp__level_jijii_init'] = {
  init: function() {
    this.appendDummyInput().appendField('_LEVEL_JIJII_INIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__level_jijii_init'] = function(block) {
  var code = '_LEVEL_JIJII_INIT(';
  code += ')\n';
  return code;
};
commandMap['_LEVEL_JIJII_NO'] = { type: 'bdsp__level_jijii_no', args: 0 };
Blockly.Blocks['bdsp__level_jijii_no'] = {
  init: function() {
    this.appendDummyInput().appendField('_LEVEL_JIJII_NO');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__level_jijii_no'] = function(block) {
  var code = '_LEVEL_JIJII_NO(';
  code += ')\n';
  return code;
};
commandMap['_LOAD_CAMERA_CONTROLLER'] = { type: 'bdsp__load_camera_controller', args: 0 };
Blockly.Blocks['bdsp__load_camera_controller'] = {
  init: function() {
    this.appendDummyInput().appendField('_LOAD_CAMERA_CONTROLLER');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__load_camera_controller'] = function(block) {
  var code = '_LOAD_CAMERA_CONTROLLER(';
  code += ')\n';
  return code;
};
commandMap['_LOAD_UMA_ANIME'] = { type: 'bdsp__load_uma_anime', args: 0 };
Blockly.Blocks['bdsp__load_uma_anime'] = {
  init: function() {
    this.appendDummyInput().appendField('_LOAD_UMA_ANIME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__load_uma_anime'] = function(block) {
  var code = '_LOAD_UMA_ANIME(';
  code += ')\n';
  return code;
};
commandMap['_LOAD_UMA_ANIME_WAIT'] = { type: 'bdsp__load_uma_anime_wait', args: 0 };
Blockly.Blocks['bdsp__load_uma_anime_wait'] = {
  init: function() {
    this.appendDummyInput().appendField('_LOAD_UMA_ANIME_WAIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__load_uma_anime_wait'] = function(block) {
  var code = '_LOAD_UMA_ANIME_WAIT(';
  code += ')\n';
  return code;
};
commandMap['_LOAD_WAIT_CAMERA_CONTROLLER'] = { type: 'bdsp__load_wait_camera_controller', args: 0 };
Blockly.Blocks['bdsp__load_wait_camera_controller'] = {
  init: function() {
    this.appendDummyInput().appendField('_LOAD_WAIT_CAMERA_CONTROLLER');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__load_wait_camera_controller'] = function(block) {
  var code = '_LOAD_WAIT_CAMERA_CONTROLLER(';
  code += ')\n';
  return code;
};
commandMap['_LOCALKOUKAN_APPLY'] = { type: 'bdsp__localkoukan_apply', args: 0 };
Blockly.Blocks['bdsp__localkoukan_apply'] = {
  init: function() {
    this.appendDummyInput().appendField('_LOCALKOUKAN_APPLY');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__localkoukan_apply'] = function(block) {
  var code = '_LOCALKOUKAN_APPLY(';
  code += ')\n';
  return code;
};
commandMap['_LOSE_CHECK'] = { type: 'bdsp__lose_check', args: 0 };
Blockly.Blocks['bdsp__lose_check'] = {
  init: function() {
    this.appendDummyInput().appendField('_LOSE_CHECK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__lose_check'] = function(block) {
  var code = '_LOSE_CHECK(';
  code += ')\n';
  return code;
};
commandMap['_MAILBOX'] = { type: 'bdsp__mailbox', args: 0 };
Blockly.Blocks['bdsp__mailbox'] = {
  init: function() {
    this.appendDummyInput().appendField('_MAILBOX');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__mailbox'] = function(block) {
  var code = '_MAILBOX(';
  code += ')\n';
  return code;
};
commandMap['_MAP_CHANGE'] = { type: 'bdsp__map_change', args: 5 };
Blockly.Blocks['bdsp__map_change'] = {
  init: function() {
    this.appendDummyInput().appendField('_MAP_CHANGE');
    this.appendValueInput('ARG_0').appendField('Map');
    this.appendValueInput('ARG_1').appendField('Warp');
    this.appendValueInput('ARG_2').appendField('X');
    this.appendValueInput('ARG_3').appendField('Z');
    this.appendValueInput('ARG_4').appendField('Y');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Warps the player to a map.");
  }
};
Blockly.JavaScript['bdsp__map_change'] = function(block) {
  var code = '_MAP_CHANGE(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_3', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_4', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_MAP_CHANGE_NONE_FADE'] = { type: 'bdsp__map_change_none_fade', args: 5 };
Blockly.Blocks['bdsp__map_change_none_fade'] = {
  init: function() {
    this.appendDummyInput().appendField('_MAP_CHANGE_NONE_FADE');
    this.appendValueInput('ARG_0').appendField('Map');
    this.appendValueInput('ARG_1').appendField('Warp');
    this.appendValueInput('ARG_2').appendField('X');
    this.appendValueInput('ARG_3').appendField('Z');
    this.appendValueInput('ARG_4').appendField('Y');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Warps the player to a map without fading.");
  }
};
Blockly.JavaScript['bdsp__map_change_none_fade'] = function(block) {
  var code = '_MAP_CHANGE_NONE_FADE(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_3', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_4', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_MENU_REQ'] = { type: 'bdsp__menu_req', args: 0 };
Blockly.Blocks['bdsp__menu_req'] = {
  init: function() {
    this.appendDummyInput().appendField('_MENU_REQ');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("(?) Menu request. Presumably opens the menu?");
  }
};
Blockly.JavaScript['bdsp__menu_req'] = function(block) {
  var code = '_MENU_REQ(';
  code += ')\n';
  return code;
};
commandMap['_ME_PLAY'] = { type: 'bdsp__me_play', args: 1 };
Blockly.Blocks['bdsp__me_play'] = {
  init: function() {
    this.appendDummyInput().appendField('_ME_PLAY');
    this.appendValueInput('ARG_0').appendField('Fanfare');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Plays a fanfare. Functionally the same as _SE_PLAY.");
  }
};
Blockly.JavaScript['bdsp__me_play'] = function(block) {
  var code = '_ME_PLAY(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_ME_WAIT'] = { type: 'bdsp__me_wait', args: 0 };
Blockly.Blocks['bdsp__me_wait'] = {
  init: function() {
    this.appendDummyInput().appendField('_ME_WAIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Waits for a playing fanfare to finish.");
  }
};
Blockly.JavaScript['bdsp__me_wait'] = function(block) {
  var code = '_ME_WAIT(';
  code += ')\n';
  return code;
};
commandMap['_MONEY_CLOSE'] = { type: 'bdsp__money_close', args: 0 };
Blockly.Blocks['bdsp__money_close'] = {
  init: function() {
    this.appendDummyInput().appendField('_MONEY_CLOSE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__money_close'] = function(block) {
  var code = '_MONEY_CLOSE(';
  code += ')\n';
  return code;
};
commandMap['_MONEY_OPEN'] = { type: 'bdsp__money_open', args: 0 };
Blockly.Blocks['bdsp__money_open'] = {
  init: function() {
    this.appendDummyInput().appendField('_MONEY_OPEN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__money_open'] = function(block) {
  var code = '_MONEY_OPEN(';
  code += ')\n';
  return code;
};
commandMap['_MONS_OWN_CHK'] = { type: 'bdsp__mons_own_chk', args: 0 };
Blockly.Blocks['bdsp__mons_own_chk'] = {
  init: function() {
    this.appendDummyInput().appendField('_MONS_OWN_CHK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__mons_own_chk'] = function(block) {
  var code = '_MONS_OWN_CHK(';
  code += ')\n';
  return code;
};
commandMap['_MONUMENT_NAME'] = { type: 'bdsp__monument_name', args: 0 };
Blockly.Blocks['bdsp__monument_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_MONUMENT_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__monument_name'] = function(block) {
  var code = '_MONUMENT_NAME(';
  code += ')\n';
  return code;
};
commandMap['_MOVE_CODE_CHANGE'] = { type: 'bdsp__move_code_change', args: 2 };
Blockly.Blocks['bdsp__move_code_change'] = {
  init: function() {
    this.appendDummyInput().appendField('_MOVE_CODE_CHANGE');
    this.appendValueInput('ARG_0').appendField('Actor');
    this.appendValueInput('ARG_1').appendField('Movement');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("(?) Changes the movement associated with an actor.");
  }
};
Blockly.JavaScript['bdsp__move_code_change'] = function(block) {
  var code = '_MOVE_CODE_CHANGE(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_MOVE_CODE_GET'] = { type: 'bdsp__move_code_get', args: 0 };
Blockly.Blocks['bdsp__move_code_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_MOVE_CODE_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__move_code_get'] = function(block) {
  var code = '_MOVE_CODE_GET(';
  code += ')\n';
  return code;
};
commandMap['_MOVE_COMBAT_GYM_WALL'] = { type: 'bdsp__move_combat_gym_wall', args: 0 };
Blockly.Blocks['bdsp__move_combat_gym_wall'] = {
  init: function() {
    this.appendDummyInput().appendField('_MOVE_COMBAT_GYM_WALL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__move_combat_gym_wall'] = function(block) {
  var code = '_MOVE_COMBAT_GYM_WALL(';
  code += ')\n';
  return code;
};
commandMap['_MOVE_FLD_LIFT'] = { type: 'bdsp__move_fld_lift', args: 0 };
Blockly.Blocks['bdsp__move_fld_lift'] = {
  init: function() {
    this.appendDummyInput().appendField('_MOVE_FLD_LIFT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__move_fld_lift'] = function(block) {
  var code = '_MOVE_FLD_LIFT(';
  code += ')\n';
  return code;
};
commandMap['_MOVE_GHOST_GYM_LIFT'] = { type: 'bdsp__move_ghost_gym_lift', args: 0 };
Blockly.Blocks['bdsp__move_ghost_gym_lift'] = {
  init: function() {
    this.appendDummyInput().appendField('_MOVE_GHOST_GYM_LIFT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__move_ghost_gym_lift'] = function(block) {
  var code = '_MOVE_GHOST_GYM_LIFT(';
  code += ')\n';
  return code;
};
commandMap['_MOVE_SAFARI_TRAIN'] = { type: 'bdsp__move_safari_train', args: 0 };
Blockly.Blocks['bdsp__move_safari_train'] = {
  init: function() {
    this.appendDummyInput().appendField('_MOVE_SAFARI_TRAIN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__move_safari_train'] = function(block) {
  var code = '_MOVE_SAFARI_TRAIN(';
  code += ')\n';
  return code;
};
commandMap['_MSGEXPANDBUF'] = { type: 'bdsp__msgexpandbuf', args: 0 };
Blockly.Blocks['bdsp__msgexpandbuf'] = {
  init: function() {
    this.appendDummyInput().appendField('_MSGEXPANDBUF');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__msgexpandbuf'] = function(block) {
  var code = '_MSGEXPANDBUF(';
  code += ')\n';
  return code;
};
commandMap['_MSG_AZUKE_SET'] = { type: 'bdsp__msg_azuke_set', args: 0 };
Blockly.Blocks['bdsp__msg_azuke_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_MSG_AZUKE_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__msg_azuke_set'] = function(block) {
  var code = '_MSG_AZUKE_SET(';
  code += ')\n';
  return code;
};
commandMap['_MSG_BOY_EVENT'] = { type: 'bdsp__msg_boy_event', args: 0 };
Blockly.Blocks['bdsp__msg_boy_event'] = {
  init: function() {
    this.appendDummyInput().appendField('_MSG_BOY_EVENT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__msg_boy_event'] = function(block) {
  var code = '_MSG_BOY_EVENT(';
  code += ')\n';
  return code;
};
commandMap['_MSG_SODATEYA_AISHOU'] = { type: 'bdsp__msg_sodateya_aishou', args: 0 };
Blockly.Blocks['bdsp__msg_sodateya_aishou'] = {
  init: function() {
    this.appendDummyInput().appendField('_MSG_SODATEYA_AISHOU');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__msg_sodateya_aishou'] = function(block) {
  var code = '_MSG_SODATEYA_AISHOU(';
  code += ')\n';
  return code;
};
commandMap['_MYSTERY_DISABLE_MSG'] = { type: 'bdsp__mystery_disable_msg', args: 0 };
Blockly.Blocks['bdsp__mystery_disable_msg'] = {
  init: function() {
    this.appendDummyInput().appendField('_MYSTERY_DISABLE_MSG');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__mystery_disable_msg'] = function(block) {
  var code = '_MYSTERY_DISABLE_MSG(';
  code += ')\n';
  return code;
};
commandMap['_MYSTERY_ENABLE_MSG'] = { type: 'bdsp__mystery_enable_msg', args: 0 };
Blockly.Blocks['bdsp__mystery_enable_msg'] = {
  init: function() {
    this.appendDummyInput().appendField('_MYSTERY_ENABLE_MSG');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__mystery_enable_msg'] = function(block) {
  var code = '_MYSTERY_ENABLE_MSG(';
  code += ')\n';
  return code;
};
commandMap['_MYSTERY_GET_PRESENT_ID'] = { type: 'bdsp__mystery_get_present_id', args: 0 };
Blockly.Blocks['bdsp__mystery_get_present_id'] = {
  init: function() {
    this.appendDummyInput().appendField('_MYSTERY_GET_PRESENT_ID');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__mystery_get_present_id'] = function(block) {
  var code = '_MYSTERY_GET_PRESENT_ID(';
  code += ')\n';
  return code;
};
commandMap['_MYSTERY_POSTMAN_END'] = { type: 'bdsp__mystery_postman_end', args: 0 };
Blockly.Blocks['bdsp__mystery_postman_end'] = {
  init: function() {
    this.appendDummyInput().appendField('_MYSTERY_POSTMAN_END');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__mystery_postman_end'] = function(block) {
  var code = '_MYSTERY_POSTMAN_END(';
  code += ')\n';
  return code;
};
commandMap['_MYSTERY_POSTMAN_INIT'] = { type: 'bdsp__mystery_postman_init', args: 0 };
Blockly.Blocks['bdsp__mystery_postman_init'] = {
  init: function() {
    this.appendDummyInput().appendField('_MYSTERY_POSTMAN_INIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__mystery_postman_init'] = function(block) {
  var code = '_MYSTERY_POSTMAN_INIT(';
  code += ')\n';
  return code;
};
commandMap['_MYSTERY_POSTMAN_SAVE_END'] = { type: 'bdsp__mystery_postman_save_end', args: 0 };
Blockly.Blocks['bdsp__mystery_postman_save_end'] = {
  init: function() {
    this.appendDummyInput().appendField('_MYSTERY_POSTMAN_SAVE_END');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__mystery_postman_save_end'] = function(block) {
  var code = '_MYSTERY_POSTMAN_SAVE_END(';
  code += ')\n';
  return code;
};
commandMap['_MYSTERY_PRESENT_CHECK'] = { type: 'bdsp__mystery_present_check', args: 0 };
Blockly.Blocks['bdsp__mystery_present_check'] = {
  init: function() {
    this.appendDummyInput().appendField('_MYSTERY_PRESENT_CHECK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__mystery_present_check'] = function(block) {
  var code = '_MYSTERY_PRESENT_CHECK(';
  code += ')\n';
  return code;
};
commandMap['_MYSTERY_RECEIVE_CHECK'] = { type: 'bdsp__mystery_receive_check', args: 0 };
Blockly.Blocks['bdsp__mystery_receive_check'] = {
  init: function() {
    this.appendDummyInput().appendField('_MYSTERY_RECEIVE_CHECK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__mystery_receive_check'] = function(block) {
  var code = '_MYSTERY_RECEIVE_CHECK(';
  code += ')\n';
  return code;
};
commandMap['_MYSTERY_RECEIVE_PRESENT'] = { type: 'bdsp__mystery_receive_present', args: 0 };
Blockly.Blocks['bdsp__mystery_receive_present'] = {
  init: function() {
    this.appendDummyInput().appendField('_MYSTERY_RECEIVE_PRESENT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__mystery_receive_present'] = function(block) {
  var code = '_MYSTERY_RECEIVE_PRESENT(';
  code += ')\n';
  return code;
};
commandMap['_MY_TR_TYPE_NAME'] = { type: 'bdsp__my_tr_type_name', args: 0 };
Blockly.Blocks['bdsp__my_tr_type_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_MY_TR_TYPE_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__my_tr_type_name'] = function(block) {
  var code = '_MY_TR_TYPE_NAME(';
  code += ')\n';
  return code;
};
commandMap['_NAMEIN'] = { type: 'bdsp__namein', args: 0 };
Blockly.Blocks['bdsp__namein'] = {
  init: function() {
    this.appendDummyInput().appendField('_NAMEIN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__namein'] = function(block) {
  var code = '_NAMEIN(';
  code += ')\n';
  return code;
};
commandMap['_NAMEIN_MONUMENT'] = { type: 'bdsp__namein_monument', args: 0 };
Blockly.Blocks['bdsp__namein_monument'] = {
  init: function() {
    this.appendDummyInput().appendField('_NAMEIN_MONUMENT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__namein_monument'] = function(block) {
  var code = '_NAMEIN_MONUMENT(';
  code += ')\n';
  return code;
};
commandMap['_NAMEIN_POKE'] = { type: 'bdsp__namein_poke', args: 3 };
Blockly.Blocks['bdsp__namein_poke'] = {
  init: function() {
    this.appendDummyInput().appendField('_NAMEIN_POKE');
    this.appendValueInput('ARG_0').appendField('PokÃ©mon1');
    this.appendValueInput('ARG_1').appendField('PokÃ©mon2');
    this.appendValueInput('ARG_2').appendField('Result');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Renames the given Pok\u00c3\u00a9mon.");
  }
};
Blockly.JavaScript['bdsp__namein_poke'] = function(block) {
  var code = '_NAMEIN_POKE(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_NAMINORI'] = { type: 'bdsp__naminori', args: 0 };
Blockly.Blocks['bdsp__naminori'] = {
  init: function() {
    this.appendDummyInput().appendField('_NAMINORI');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__naminori'] = function(block) {
  var code = '_NAMINORI(';
  code += ')\n';
  return code;
};
commandMap['_NAMINORI_END'] = { type: 'bdsp__naminori_end', args: 0 };
Blockly.Blocks['bdsp__naminori_end'] = {
  init: function() {
    this.appendDummyInput().appendField('_NAMINORI_END');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__naminori_end'] = function(block) {
  var code = '_NAMINORI_END(';
  code += ')\n';
  return code;
};
commandMap['_NATURAL_PARK_ACCESSORY_NO_GET'] = { type: 'bdsp__natural_park_accessory_no_get', args: 0 };
Blockly.Blocks['bdsp__natural_park_accessory_no_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_NATURAL_PARK_ACCESSORY_NO_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__natural_park_accessory_no_get'] = function(block) {
  var code = '_NATURAL_PARK_ACCESSORY_NO_GET(';
  code += ')\n';
  return code;
};
commandMap['_NATURAL_PARK_GET_MONOHIROI_ITEM_NO'] = { type: 'bdsp__natural_park_get_monohiroi_item_no', args: 0 };
Blockly.Blocks['bdsp__natural_park_get_monohiroi_item_no'] = {
  init: function() {
    this.appendDummyInput().appendField('_NATURAL_PARK_GET_MONOHIROI_ITEM_NO');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__natural_park_get_monohiroi_item_no'] = function(block) {
  var code = '_NATURAL_PARK_GET_MONOHIROI_ITEM_NO(';
  code += ')\n';
  return code;
};
commandMap['_NATURAL_PARK_POKE_CREATE'] = { type: 'bdsp__natural_park_poke_create', args: 0 };
Blockly.Blocks['bdsp__natural_park_poke_create'] = {
  init: function() {
    this.appendDummyInput().appendField('_NATURAL_PARK_POKE_CREATE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__natural_park_poke_create'] = function(block) {
  var code = '_NATURAL_PARK_POKE_CREATE(';
  code += ')\n';
  return code;
};
commandMap['_NATURAL_PARK_POKE_KAISAN'] = { type: 'bdsp__natural_park_poke_kaisan', args: 0 };
Blockly.Blocks['bdsp__natural_park_poke_kaisan'] = {
  init: function() {
    this.appendDummyInput().appendField('_NATURAL_PARK_POKE_KAISAN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__natural_park_poke_kaisan'] = function(block) {
  var code = '_NATURAL_PARK_POKE_KAISAN(';
  code += ')\n';
  return code;
};
commandMap['_NATURAL_PARK_POKE_SELECT_MENU'] = { type: 'bdsp__natural_park_poke_select_menu', args: 0 };
Blockly.Blocks['bdsp__natural_park_poke_select_menu'] = {
  init: function() {
    this.appendDummyInput().appendField('_NATURAL_PARK_POKE_SELECT_MENU');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__natural_park_poke_select_menu'] = function(block) {
  var code = '_NATURAL_PARK_POKE_SELECT_MENU(';
  code += ')\n';
  return code;
};
commandMap['_NATURAL_PARK_POKE_SYUUGOU'] = { type: 'bdsp__natural_park_poke_syuugou', args: 0 };
Blockly.Blocks['bdsp__natural_park_poke_syuugou'] = {
  init: function() {
    this.appendDummyInput().appendField('_NATURAL_PARK_POKE_SYUUGOU');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__natural_park_poke_syuugou'] = function(block) {
  var code = '_NATURAL_PARK_POKE_SYUUGOU(';
  code += ')\n';
  return code;
};
commandMap['_NATURAL_PARK_WALK_COUNT_CLEAR'] = { type: 'bdsp__natural_park_walk_count_clear', args: 0 };
Blockly.Blocks['bdsp__natural_park_walk_count_clear'] = {
  init: function() {
    this.appendDummyInput().appendField('_NATURAL_PARK_WALK_COUNT_CLEAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__natural_park_walk_count_clear'] = function(block) {
  var code = '_NATURAL_PARK_WALK_COUNT_CLEAR(';
  code += ')\n';
  return code;
};
commandMap['_NATURAL_PARK_WALK_COUNT_GET'] = { type: 'bdsp__natural_park_walk_count_get', args: 0 };
Blockly.Blocks['bdsp__natural_park_walk_count_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_NATURAL_PARK_WALK_COUNT_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__natural_park_walk_count_get'] = function(block) {
  var code = '_NATURAL_PARK_WALK_COUNT_GET(';
  code += ')\n';
  return code;
};
commandMap['_NEWS_COUNT_CHK'] = { type: 'bdsp__news_count_chk', args: 0 };
Blockly.Blocks['bdsp__news_count_chk'] = {
  init: function() {
    this.appendDummyInput().appendField('_NEWS_COUNT_CHK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__news_count_chk'] = function(block) {
  var code = '_NEWS_COUNT_CHK(';
  code += ')\n';
  return code;
};
commandMap['_NEWS_COUNT_SET'] = { type: 'bdsp__news_count_set', args: 0 };
Blockly.Blocks['bdsp__news_count_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_NEWS_COUNT_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__news_count_set'] = function(block) {
  var code = '_NEWS_COUNT_SET(';
  code += ')\n';
  return code;
};
commandMap['_NEW_NANKAI_WORD_COMPLETE_CHECK'] = { type: 'bdsp__new_nankai_word_complete_check', args: 0 };
Blockly.Blocks['bdsp__new_nankai_word_complete_check'] = {
  init: function() {
    this.appendDummyInput().appendField('_NEW_NANKAI_WORD_COMPLETE_CHECK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__new_nankai_word_complete_check'] = function(block) {
  var code = '_NEW_NANKAI_WORD_COMPLETE_CHECK(';
  code += ')\n';
  return code;
};
commandMap['_NEW_NANKAI_WORD_SET'] = { type: 'bdsp__new_nankai_word_set', args: 0 };
Blockly.Blocks['bdsp__new_nankai_word_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_NEW_NANKAI_WORD_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__new_nankai_word_set'] = function(block) {
  var code = '_NEW_NANKAI_WORD_SET(';
  code += ')\n';
  return code;
};
commandMap['_NEXT_ANM_LAST_KEYWAIT'] = { type: 'bdsp__next_anm_last_keywait', args: 0 };
Blockly.Blocks['bdsp__next_anm_last_keywait'] = {
  init: function() {
    this.appendDummyInput().appendField('_NEXT_ANM_LAST_KEYWAIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__next_anm_last_keywait'] = function(block) {
  var code = '_NEXT_ANM_LAST_KEYWAIT(';
  code += ')\n';
  return code;
};
commandMap['_NICKNAME_PLACEMENT'] = { type: 'bdsp__nickname_placement', args: 0 };
Blockly.Blocks['bdsp__nickname_placement'] = {
  init: function() {
    this.appendDummyInput().appendField('_NICKNAME_PLACEMENT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__nickname_placement'] = function(block) {
  var code = '_NICKNAME_PLACEMENT(';
  code += ')\n';
  return code;
};
commandMap['_NICK_NAME'] = { type: 'bdsp__nick_name', args: 0 };
Blockly.Blocks['bdsp__nick_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_NICK_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__nick_name'] = function(block) {
  var code = '_NICK_NAME(';
  code += ')\n';
  return code;
};
commandMap['_NICK_NAME_ALL'] = { type: 'bdsp__nick_name_all', args: 0 };
Blockly.Blocks['bdsp__nick_name_all'] = {
  init: function() {
    this.appendDummyInput().appendField('_NICK_NAME_ALL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__nick_name_all'] = function(block) {
  var code = '_NICK_NAME_ALL(';
  code += ')\n';
  return code;
};
commandMap['_NICK_NAME_PC'] = { type: 'bdsp__nick_name_pc', args: 0 };
Blockly.Blocks['bdsp__nick_name_pc'] = {
  init: function() {
    this.appendDummyInput().appendField('_NICK_NAME_PC');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__nick_name_pc'] = function(block) {
  var code = '_NICK_NAME_PC(';
  code += ')\n';
  return code;
};
commandMap['_NONE_USE_NUMBER'] = { type: 'bdsp__none_use_number', args: 0 };
Blockly.Blocks['bdsp__none_use_number'] = {
  init: function() {
    this.appendDummyInput().appendField('_NONE_USE_NUMBER');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__none_use_number'] = function(block) {
  var code = '_NONE_USE_NUMBER(';
  code += ')\n';
  return code;
};
commandMap['_NOP'] = { type: 'bdsp__nop', args: 0 };
Blockly.Blocks['bdsp__nop'] = {
  init: function() {
    this.appendDummyInput().appendField('_NOP');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused. Ends the script. Functionally the same as _END.");
  }
};
Blockly.JavaScript['bdsp__nop'] = function(block) {
  var code = '_NOP(';
  code += ')\n';
  return code;
};
commandMap['_NORMAL_LOSE'] = { type: 'bdsp__normal_lose', args: 0 };
Blockly.Blocks['bdsp__normal_lose'] = {
  init: function() {
    this.appendDummyInput().appendField('_NORMAL_LOSE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__normal_lose'] = function(block) {
  var code = '_NORMAL_LOSE(';
  code += ')\n';
  return code;
};
commandMap['_NORMAL_WAZALIST_GET_RESULT'] = { type: 'bdsp__normal_wazalist_get_result', args: 0 };
Blockly.Blocks['bdsp__normal_wazalist_get_result'] = {
  init: function() {
    this.appendDummyInput().appendField('_NORMAL_WAZALIST_GET_RESULT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__normal_wazalist_get_result'] = function(block) {
  var code = '_NORMAL_WAZALIST_GET_RESULT(';
  code += ')\n';
  return code;
};
commandMap['_NORMAL_WAZALIST_SET_PROC'] = { type: 'bdsp__normal_wazalist_set_proc', args: 0 };
Blockly.Blocks['bdsp__normal_wazalist_set_proc'] = {
  init: function() {
    this.appendDummyInput().appendField('_NORMAL_WAZALIST_SET_PROC');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__normal_wazalist_set_proc'] = function(block) {
  var code = '_NORMAL_WAZALIST_SET_PROC(';
  code += ')\n';
  return code;
};
commandMap['_NOT_ZONE_DEL_SET'] = { type: 'bdsp__not_zone_del_set', args: 2 };
Blockly.Blocks['bdsp__not_zone_del_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_NOT_ZONE_DEL_SET');
    this.appendValueInput('ARG_0').appendField('Actor');
    this.appendValueInput('ARG_1').appendField('Unknown');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unknown use. Used in relation to partner trainers (Barry, Cheryl, etc.).");
  }
};
Blockly.JavaScript['bdsp__not_zone_del_set'] = function(block) {
  var code = '_NOT_ZONE_DEL_SET(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_NPC_TRADE_POKELIST_SET_PROC'] = { type: 'bdsp__npc_trade_pokelist_set_proc', args: 0 };
Blockly.Blocks['bdsp__npc_trade_pokelist_set_proc'] = {
  init: function() {
    this.appendDummyInput().appendField('_NPC_TRADE_POKELIST_SET_PROC');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__npc_trade_pokelist_set_proc'] = function(block) {
  var code = '_NPC_TRADE_POKELIST_SET_PROC(';
  code += ')\n';
  return code;
};
commandMap['_NUMBER_NAME'] = { type: 'bdsp__number_name', args: 0 };
Blockly.Blocks['bdsp__number_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_NUMBER_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__number_name'] = function(block) {
  var code = '_NUMBER_NAME(';
  code += ')\n';
  return code;
};
commandMap['_NUMBER_NAME_EX'] = { type: 'bdsp__number_name_ex', args: 0 };
Blockly.Blocks['bdsp__number_name_ex'] = {
  init: function() {
    this.appendDummyInput().appendField('_NUMBER_NAME_EX');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__number_name_ex'] = function(block) {
  var code = '_NUMBER_NAME_EX(';
  code += ')\n';
  return code;
};
commandMap['_NUTMIXER_CALL'] = { type: 'bdsp__nutmixer_call', args: 0 };
Blockly.Blocks['bdsp__nutmixer_call'] = {
  init: function() {
    this.appendDummyInput().appendField('_NUTMIXER_CALL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__nutmixer_call'] = function(block) {
  var code = '_NUTMIXER_CALL(';
  code += ')\n';
  return code;
};
commandMap['_NUTMIXER_PLAY_CHECK'] = { type: 'bdsp__nutmixer_play_check', args: 0 };
Blockly.Blocks['bdsp__nutmixer_play_check'] = {
  init: function() {
    this.appendDummyInput().appendField('_NUTMIXER_PLAY_CHECK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__nutmixer_play_check'] = function(block) {
  var code = '_NUTMIXER_PLAY_CHECK(';
  code += ')\n';
  return code;
};
commandMap['_NUTS_NAME'] = { type: 'bdsp__nuts_name', args: 0 };
Blockly.Blocks['bdsp__nuts_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_NUTS_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__nuts_name'] = function(block) {
  var code = '_NUTS_NAME(';
  code += ')\n';
  return code;
};
commandMap['_OBJ_ADD'] = { type: 'bdsp__obj_add', args: 1 };
Blockly.Blocks['bdsp__obj_add'] = {
  init: function() {
    this.appendDummyInput().appendField('_OBJ_ADD');
    this.appendValueInput('ARG_0').appendField('Actor');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Shows an actor.");
  }
};
Blockly.JavaScript['bdsp__obj_add'] = function(block) {
  var code = '_OBJ_ADD(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_OBJ_ANIME'] = { type: 'bdsp__obj_anime', args: 3 };
Blockly.Blocks['bdsp__obj_anime'] = {
  init: function() {
    this.appendDummyInput().appendField('_OBJ_ANIME');
    this.appendValueInput('ARG_0').appendField('Actor');
    this.appendValueInput('ARG_1').appendField('Script');
    this.appendValueInput('ARG_2').appendField('Unknown');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Animates an actor based on a given animation script.");
  }
};
Blockly.JavaScript['bdsp__obj_anime'] = function(block) {
  var code = '_OBJ_ANIME(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_OBJ_ANIME_FUREAI'] = { type: 'bdsp__obj_anime_fureai', args: 0 };
Blockly.Blocks['bdsp__obj_anime_fureai'] = {
  init: function() {
    this.appendDummyInput().appendField('_OBJ_ANIME_FUREAI');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__obj_anime_fureai'] = function(block) {
  var code = '_OBJ_ANIME_FUREAI(';
  code += ')\n';
  return code;
};
commandMap['_OBJ_ANIME_POS'] = { type: 'bdsp__obj_anime_pos', args: 0 };
Blockly.Blocks['bdsp__obj_anime_pos'] = {
  init: function() {
    this.appendDummyInput().appendField('_OBJ_ANIME_POS');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__obj_anime_pos'] = function(block) {
  var code = '_OBJ_ANIME_POS(';
  code += ')\n';
  return code;
};
commandMap['_OBJ_ANIME_SPEED'] = { type: 'bdsp__obj_anime_speed', args: 0 };
Blockly.Blocks['bdsp__obj_anime_speed'] = {
  init: function() {
    this.appendDummyInput().appendField('_OBJ_ANIME_SPEED');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__obj_anime_speed'] = function(block) {
  var code = '_OBJ_ANIME_SPEED(';
  code += ')\n';
  return code;
};
commandMap['_OBJ_ANIME_WAIT'] = { type: 'bdsp__obj_anime_wait', args: 0 };
Blockly.Blocks['bdsp__obj_anime_wait'] = {
  init: function() {
    this.appendDummyInput().appendField('_OBJ_ANIME_WAIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Waits for the current actor animations to finish before resuming execution.");
  }
};
Blockly.JavaScript['bdsp__obj_anime_wait'] = function(block) {
  var code = '_OBJ_ANIME_WAIT(';
  code += ')\n';
  return code;
};
commandMap['_OBJ_CHANGE_LABEL'] = { type: 'bdsp__obj_change_label', args: 1 };
Blockly.Blocks['bdsp__obj_change_label'] = {
  init: function() {
    this.appendDummyInput().appendField('_OBJ_CHANGE_LABEL');
    this.appendValueInput('ARG_0').appendField('Script');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Calls a script of the main script file.");
  }
};
Blockly.JavaScript['bdsp__obj_change_label'] = function(block) {
  var code = '_OBJ_CHANGE_LABEL(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_OBJ_DEL'] = { type: 'bdsp__obj_del', args: 1 };
Blockly.Blocks['bdsp__obj_del'] = {
  init: function() {
    this.appendDummyInput().appendField('_OBJ_DEL');
    this.appendValueInput('ARG_0').appendField('Actor');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Hides an actor.");
  }
};
Blockly.JavaScript['bdsp__obj_del'] = function(block) {
  var code = '_OBJ_DEL(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_OBJ_DIR_CHANGE'] = { type: 'bdsp__obj_dir_change', args: 0 };
Blockly.Blocks['bdsp__obj_dir_change'] = {
  init: function() {
    this.appendDummyInput().appendField('_OBJ_DIR_CHANGE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__obj_dir_change'] = function(block) {
  var code = '_OBJ_DIR_CHANGE(';
  code += ')\n';
  return code;
};
commandMap['_OBJ_DIR_CHANGE_WORLD'] = { type: 'bdsp__obj_dir_change_world', args: 0 };
Blockly.Blocks['bdsp__obj_dir_change_world'] = {
  init: function() {
    this.appendDummyInput().appendField('_OBJ_DIR_CHANGE_WORLD');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__obj_dir_change_world'] = function(block) {
  var code = '_OBJ_DIR_CHANGE_WORLD(';
  code += ')\n';
  return code;
};
commandMap['_OBJ_ID_JUMP'] = { type: 'bdsp__obj_id_jump', args: 0 };
Blockly.Blocks['bdsp__obj_id_jump'] = {
  init: function() {
    this.appendDummyInput().appendField('_OBJ_ID_JUMP');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__obj_id_jump'] = function(block) {
  var code = '_OBJ_ID_JUMP(';
  code += ')\n';
  return code;
};
commandMap['_OBJ_INVISIBLE'] = { type: 'bdsp__obj_invisible', args: 0 };
Blockly.Blocks['bdsp__obj_invisible'] = {
  init: function() {
    this.appendDummyInput().appendField('_OBJ_INVISIBLE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__obj_invisible'] = function(block) {
  var code = '_OBJ_INVISIBLE(';
  code += ')\n';
  return code;
};
commandMap['_OBJ_PAUSE'] = { type: 'bdsp__obj_pause', args: 1 };
Blockly.Blocks['bdsp__obj_pause'] = {
  init: function() {
    this.appendDummyInput().appendField('_OBJ_PAUSE');
    this.appendValueInput('ARG_0').appendField('Actor');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Pauses the movement of an actor.");
  }
};
Blockly.JavaScript['bdsp__obj_pause'] = function(block) {
  var code = '_OBJ_PAUSE(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_OBJ_PAUSE_ALL'] = { type: 'bdsp__obj_pause_all', args: 0 };
Blockly.Blocks['bdsp__obj_pause_all'] = {
  init: function() {
    this.appendDummyInput().appendField('_OBJ_PAUSE_ALL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Pauses the movement of all actors.");
  }
};
Blockly.JavaScript['bdsp__obj_pause_all'] = function(block) {
  var code = '_OBJ_PAUSE_ALL(';
  code += ')\n';
  return code;
};
commandMap['_OBJ_PAUSE_CLEAR'] = { type: 'bdsp__obj_pause_clear', args: 1 };
Blockly.Blocks['bdsp__obj_pause_clear'] = {
  init: function() {
    this.appendDummyInput().appendField('_OBJ_PAUSE_CLEAR');
    this.appendValueInput('ARG_0').appendField('Actor');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unpauses the movement of an actor.");
  }
};
Blockly.JavaScript['bdsp__obj_pause_clear'] = function(block) {
  var code = '_OBJ_PAUSE_CLEAR(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_OBJ_PAUSE_CLEAR_ALL'] = { type: 'bdsp__obj_pause_clear_all', args: 0 };
Blockly.Blocks['bdsp__obj_pause_clear_all'] = {
  init: function() {
    this.appendDummyInput().appendField('_OBJ_PAUSE_CLEAR_ALL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unpauses the movement of all actors.");
  }
};
Blockly.JavaScript['bdsp__obj_pause_clear_all'] = function(block) {
  var code = '_OBJ_PAUSE_CLEAR_ALL(';
  code += ')\n';
  return code;
};
commandMap['_OBJ_POS_CHANGE'] = { type: 'bdsp__obj_pos_change', args: 0 };
Blockly.Blocks['bdsp__obj_pos_change'] = {
  init: function() {
    this.appendDummyInput().appendField('_OBJ_POS_CHANGE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__obj_pos_change'] = function(block) {
  var code = '_OBJ_POS_CHANGE(';
  code += ')\n';
  return code;
};
commandMap['_OBJ_POS_CHANGE_WORLD'] = { type: 'bdsp__obj_pos_change_world', args: 0 };
Blockly.Blocks['bdsp__obj_pos_change_world'] = {
  init: function() {
    this.appendDummyInput().appendField('_OBJ_POS_CHANGE_WORLD');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__obj_pos_change_world'] = function(block) {
  var code = '_OBJ_POS_CHANGE_WORLD(';
  code += ')\n';
  return code;
};
commandMap['_OBJ_POS_CHANGE_WORLD_FIND'] = { type: 'bdsp__obj_pos_change_world_find', args: 0 };
Blockly.Blocks['bdsp__obj_pos_change_world_find'] = {
  init: function() {
    this.appendDummyInput().appendField('_OBJ_POS_CHANGE_WORLD_FIND');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__obj_pos_change_world_find'] = function(block) {
  var code = '_OBJ_POS_CHANGE_WORLD_FIND(';
  code += ')\n';
  return code;
};
commandMap['_OBJ_POS_GET'] = { type: 'bdsp__obj_pos_get', args: 0 };
Blockly.Blocks['bdsp__obj_pos_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_OBJ_POS_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused. Presumably gets the position of the actor the player is interacting with.");
  }
};
Blockly.JavaScript['bdsp__obj_pos_get'] = function(block) {
  var code = '_OBJ_POS_GET(';
  code += ')\n';
  return code;
};
commandMap['_OBJ_SCALE'] = { type: 'bdsp__obj_scale', args: 0 };
Blockly.Blocks['bdsp__obj_scale'] = {
  init: function() {
    this.appendDummyInput().appendField('_OBJ_SCALE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__obj_scale'] = function(block) {
  var code = '_OBJ_SCALE(';
  code += ')\n';
  return code;
};
commandMap['_OBJ_VISIBLE'] = { type: 'bdsp__obj_visible', args: 0 };
Blockly.Blocks['bdsp__obj_visible'] = {
  init: function() {
    this.appendDummyInput().appendField('_OBJ_VISIBLE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__obj_visible'] = function(block) {
  var code = '_OBJ_VISIBLE(';
  code += ')\n';
  return code;
};
commandMap['_OEKAKI_BOARD_SET_PROC'] = { type: 'bdsp__oekaki_board_set_proc', args: 0 };
Blockly.Blocks['bdsp__oekaki_board_set_proc'] = {
  init: function() {
    this.appendDummyInput().appendField('_OEKAKI_BOARD_SET_PROC');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("(?) Shows a menu related to the Union Room.");
  }
};
Blockly.JavaScript['bdsp__oekaki_board_set_proc'] = function(block) {
  var code = '_OEKAKI_BOARD_SET_PROC(';
  code += ')\n';
  return code;
};
commandMap['_OFFSET_WAIT'] = { type: 'bdsp__offset_wait', args: 0 };
Blockly.Blocks['bdsp__offset_wait'] = {
  init: function() {
    this.appendDummyInput().appendField('_OFFSET_WAIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__offset_wait'] = function(block) {
  var code = '_OFFSET_WAIT(';
  code += ')\n';
  return code;
};
commandMap['_OJIGI'] = { type: 'bdsp__ojigi', args: 0 };
Blockly.Blocks['bdsp__ojigi'] = {
  init: function() {
    this.appendDummyInput().appendField('_OJIGI');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__ojigi'] = function(block) {
  var code = '_OJIGI(';
  code += ')\n';
  return code;
};
commandMap['_OOKISA_KIROKU_SET_BUF'] = { type: 'bdsp__ookisa_kiroku_set_buf', args: 0 };
Blockly.Blocks['bdsp__ookisa_kiroku_set_buf'] = {
  init: function() {
    this.appendDummyInput().appendField('_OOKISA_KIROKU_SET_BUF');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__ookisa_kiroku_set_buf'] = function(block) {
  var code = '_OOKISA_KIROKU_SET_BUF(';
  code += ')\n';
  return code;
};
commandMap['_OOKISA_KURABE_INIT'] = { type: 'bdsp__ookisa_kurabe_init', args: 0 };
Blockly.Blocks['bdsp__ookisa_kurabe_init'] = {
  init: function() {
    this.appendDummyInput().appendField('_OOKISA_KURABE_INIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__ookisa_kurabe_init'] = function(block) {
  var code = '_OOKISA_KURABE_INIT(';
  code += ')\n';
  return code;
};
commandMap['_OOKISA_RECORD_CHK'] = { type: 'bdsp__ookisa_record_chk', args: 0 };
Blockly.Blocks['bdsp__ookisa_record_chk'] = {
  init: function() {
    this.appendDummyInput().appendField('_OOKISA_RECORD_CHK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__ookisa_record_chk'] = function(block) {
  var code = '_OOKISA_RECORD_CHK(';
  code += ')\n';
  return code;
};
commandMap['_OOKISA_RECORD_SET'] = { type: 'bdsp__ookisa_record_set', args: 0 };
Blockly.Blocks['bdsp__ookisa_record_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_OOKISA_RECORD_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__ookisa_record_set'] = function(block) {
  var code = '_OOKISA_RECORD_SET(';
  code += ')\n';
  return code;
};
commandMap['_OOKISA_TEMOTI_SET_BUF'] = { type: 'bdsp__ookisa_temoti_set_buf', args: 0 };
Blockly.Blocks['bdsp__ookisa_temoti_set_buf'] = {
  init: function() {
    this.appendDummyInput().appendField('_OOKISA_TEMOTI_SET_BUF');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__ookisa_temoti_set_buf'] = function(block) {
  var code = '_OOKISA_TEMOTI_SET_BUF(';
  code += ')\n';
  return code;
};
commandMap['_OOKISA_VALUE_SET_BUF'] = { type: 'bdsp__ookisa_value_set_buf', args: 0 };
Blockly.Blocks['bdsp__ookisa_value_set_buf'] = {
  init: function() {
    this.appendDummyInput().appendField('_OOKISA_VALUE_SET_BUF');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__ookisa_value_set_buf'] = function(block) {
  var code = '_OOKISA_VALUE_SET_BUF(';
  code += ')\n';
  return code;
};
commandMap['_OPEN_BATTLE_WIN'] = { type: 'bdsp__open_battle_win', args: 0 };
Blockly.Blocks['bdsp__open_battle_win'] = {
  init: function() {
    this.appendDummyInput().appendField('_OPEN_BATTLE_WIN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__open_battle_win'] = function(block) {
  var code = '_OPEN_BATTLE_WIN(';
  code += ')\n';
  return code;
};
commandMap['_OPEN_CUSTUM_WIN'] = { type: 'bdsp__open_custum_win', args: 0 };
Blockly.Blocks['bdsp__open_custum_win'] = {
  init: function() {
    this.appendDummyInput().appendField('_OPEN_CUSTUM_WIN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__open_custum_win'] = function(block) {
  var code = '_OPEN_CUSTUM_WIN(';
  code += ')\n';
  return code;
};
commandMap['_OPEN_CUSTUM_WIN_FIXED'] = { type: 'bdsp__open_custum_win_fixed', args: 0 };
Blockly.Blocks['bdsp__open_custum_win_fixed'] = {
  init: function() {
    this.appendDummyInput().appendField('_OPEN_CUSTUM_WIN_FIXED');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__open_custum_win_fixed'] = function(block) {
  var code = '_OPEN_CUSTUM_WIN_FIXED(';
  code += ')\n';
  return code;
};
commandMap['_OPEN_CUSTUM_WIN_WORD_SET'] = { type: 'bdsp__open_custum_win_word_set', args: 0 };
Blockly.Blocks['bdsp__open_custum_win_word_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_OPEN_CUSTUM_WIN_WORD_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__open_custum_win_word_set'] = function(block) {
  var code = '_OPEN_CUSTUM_WIN_WORD_SET(';
  code += ')\n';
  return code;
};
commandMap['_OPEN_PASSWORD_SWKEYBOARD'] = { type: 'bdsp__open_password_swkeyboard', args: 0 };
Blockly.Blocks['bdsp__open_password_swkeyboard'] = {
  init: function() {
    this.appendDummyInput().appendField('_OPEN_PASSWORD_SWKEYBOARD');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__open_password_swkeyboard'] = function(block) {
  var code = '_OPEN_PASSWORD_SWKEYBOARD(';
  code += ')\n';
  return code;
};
commandMap['_OPEN_SPECIAL_WIN_LABEL'] = { type: 'bdsp__open_special_win_label', args: 0 };
Blockly.Blocks['bdsp__open_special_win_label'] = {
  init: function() {
    this.appendDummyInput().appendField('_OPEN_SPECIAL_WIN_LABEL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__open_special_win_label'] = function(block) {
  var code = '_OPEN_SPECIAL_WIN_LABEL(';
  code += ')\n';
  return code;
};
commandMap['_OSHIE_WAZALIST_GET_RESULT'] = { type: 'bdsp__oshie_wazalist_get_result', args: 0 };
Blockly.Blocks['bdsp__oshie_wazalist_get_result'] = {
  init: function() {
    this.appendDummyInput().appendField('_OSHIE_WAZALIST_GET_RESULT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__oshie_wazalist_get_result'] = function(block) {
  var code = '_OSHIE_WAZALIST_GET_RESULT(';
  code += ')\n';
  return code;
};
commandMap['_OSHIE_WAZALIST_SET_PROC'] = { type: 'bdsp__oshie_wazalist_set_proc', args: 0 };
Blockly.Blocks['bdsp__oshie_wazalist_set_proc'] = {
  init: function() {
    this.appendDummyInput().appendField('_OSHIE_WAZALIST_SET_PROC');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__oshie_wazalist_set_proc'] = function(block) {
  var code = '_OSHIE_WAZALIST_SET_PROC(';
  code += ')\n';
  return code;
};
commandMap['_OSHIE_WAZA_COUNT'] = { type: 'bdsp__oshie_waza_count', args: 0 };
Blockly.Blocks['bdsp__oshie_waza_count'] = {
  init: function() {
    this.appendDummyInput().appendField('_OSHIE_WAZA_COUNT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__oshie_waza_count'] = function(block) {
  var code = '_OSHIE_WAZA_COUNT(';
  code += ')\n';
  return code;
};
commandMap['_PAIR_OBJID_SET'] = { type: 'bdsp__pair_objid_set', args: 1 };
Blockly.Blocks['bdsp__pair_objid_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_PAIR_OBJID_SET');
    this.appendValueInput('ARG_0').appendField('Actor');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Sets an actor as the partner trainer following the player.");
  }
};
Blockly.JavaScript['bdsp__pair_objid_set'] = function(block) {
  var code = '_PAIR_OBJID_SET(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_PAPERPLANE_SET'] = { type: 'bdsp__paperplane_set', args: 0 };
Blockly.Blocks['bdsp__paperplane_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_PAPERPLANE_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__paperplane_set'] = function(block) {
  var code = '_PAPERPLANE_SET(';
  code += ')\n';
  return code;
};
commandMap['_PARK_ITEM_NAME'] = { type: 'bdsp__park_item_name', args: 0 };
Blockly.Blocks['bdsp__park_item_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_PARK_ITEM_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__park_item_name'] = function(block) {
  var code = '_PARK_ITEM_NAME(';
  code += ')\n';
  return code;
};
commandMap['_PARTNER_NAME_SET'] = { type: 'bdsp__partner_name_set', args: 0 };
Blockly.Blocks['bdsp__partner_name_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_PARTNER_NAME_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__partner_name_set'] = function(block) {
  var code = '_PARTNER_NAME_SET(';
  code += ')\n';
  return code;
};
commandMap['_PARTY_DEOKISISUFORM_CHANGE'] = { type: 'bdsp__party_deokisisuform_change', args: 0 };
Blockly.Blocks['bdsp__party_deokisisuform_change'] = {
  init: function() {
    this.appendDummyInput().appendField('_PARTY_DEOKISISUFORM_CHANGE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__party_deokisisuform_change'] = function(block) {
  var code = '_PARTY_DEOKISISUFORM_CHANGE(';
  code += ')\n';
  return code;
};
commandMap['_PARTY_MONSNO_CHECK'] = { type: 'bdsp__party_monsno_check', args: 0 };
Blockly.Blocks['bdsp__party_monsno_check'] = {
  init: function() {
    this.appendDummyInput().appendField('_PARTY_MONSNO_CHECK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__party_monsno_check'] = function(block) {
  var code = '_PARTY_MONSNO_CHECK(';
  code += ')\n';
  return code;
};
commandMap['_PC_DENDOU_SET_PROC'] = { type: 'bdsp__pc_dendou_set_proc', args: 0 };
Blockly.Blocks['bdsp__pc_dendou_set_proc'] = {
  init: function() {
    this.appendDummyInput().appendField('_PC_DENDOU_SET_PROC');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Opens the Hall of Fame records menu.");
  }
};
Blockly.JavaScript['bdsp__pc_dendou_set_proc'] = function(block) {
  var code = '_PC_DENDOU_SET_PROC(';
  code += ')\n';
  return code;
};
commandMap['_PC_DENDOU_SET_PROC_OPEN_WAIT'] = { type: 'bdsp__pc_dendou_set_proc_open_wait', args: 0 };
Blockly.Blocks['bdsp__pc_dendou_set_proc_open_wait'] = {
  init: function() {
    this.appendDummyInput().appendField('_PC_DENDOU_SET_PROC_OPEN_WAIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__pc_dendou_set_proc_open_wait'] = function(block) {
  var code = '_PC_DENDOU_SET_PROC_OPEN_WAIT(';
  code += ')\n';
  return code;
};
commandMap['_PC_KAIFUKU'] = { type: 'bdsp__pc_kaifuku', args: 0 };
Blockly.Blocks['bdsp__pc_kaifuku'] = {
  init: function() {
    this.appendDummyInput().appendField('_PC_KAIFUKU');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__pc_kaifuku'] = function(block) {
  var code = '_PC_KAIFUKU(';
  code += ')\n';
  return code;
};
commandMap['_PC_RECOVER_ANM'] = { type: 'bdsp__pc_recover_anm', args: 0 };
Blockly.Blocks['bdsp__pc_recover_anm'] = {
  init: function() {
    this.appendDummyInput().appendField('_PC_RECOVER_ANM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__pc_recover_anm'] = function(block) {
  var code = '_PC_RECOVER_ANM(';
  code += ')\n';
  return code;
};
commandMap['_PERAP_DATA_CHECK'] = { type: 'bdsp__perap_data_check', args: 1 };
Blockly.Blocks['bdsp__perap_data_check'] = {
  init: function() {
    this.appendDummyInput().appendField('_PERAP_DATA_CHECK');
    this.appendValueInput('ARG_0').appendField('Result');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused. Checks if there is Chatot cry data and put the result in a variable.");
  }
};
Blockly.JavaScript['bdsp__perap_data_check'] = function(block) {
  var code = '_PERAP_DATA_CHECK(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_PERAP_REC_START'] = { type: 'bdsp__perap_rec_start', args: 1 };
Blockly.Blocks['bdsp__perap_rec_start'] = {
  init: function() {
    this.appendDummyInput().appendField('_PERAP_REC_START');
    this.appendValueInput('ARG_0').appendField('Unknown');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused. Start recording the Chatot cry.");
  }
};
Blockly.JavaScript['bdsp__perap_rec_start'] = function(block) {
  var code = '_PERAP_REC_START(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_PERAP_REC_STOP'] = { type: 'bdsp__perap_rec_stop', args: 0 };
Blockly.Blocks['bdsp__perap_rec_stop'] = {
  init: function() {
    this.appendDummyInput().appendField('_PERAP_REC_STOP');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused. Stop recording the Chatot cry.");
  }
};
Blockly.JavaScript['bdsp__perap_rec_stop'] = function(block) {
  var code = '_PERAP_REC_STOP(';
  code += ')\n';
  return code;
};
commandMap['_PERAP_SAVE'] = { type: 'bdsp__perap_save', args: 0 };
Blockly.Blocks['bdsp__perap_save'] = {
  init: function() {
    this.appendDummyInput().appendField('_PERAP_SAVE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused. Save the recorded Chatot cry.");
  }
};
Blockly.JavaScript['bdsp__perap_save'] = function(block) {
  var code = '_PERAP_SAVE(';
  code += ')\n';
  return code;
};
commandMap['_PLAYER_DIR_GET'] = { type: 'bdsp__player_dir_get', args: 1 };
Blockly.Blocks['bdsp__player_dir_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_PLAYER_DIR_GET');
    this.appendValueInput('ARG_0').appendField('Direction');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Gets the direction the player is facing.");
  }
};
Blockly.JavaScript['bdsp__player_dir_get'] = function(block) {
  var code = '_PLAYER_DIR_GET(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_PLAYER_DIR_JUMP'] = { type: 'bdsp__player_dir_jump', args: 0 };
Blockly.Blocks['bdsp__player_dir_jump'] = {
  init: function() {
    this.appendDummyInput().appendField('_PLAYER_DIR_JUMP');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__player_dir_jump'] = function(block) {
  var code = '_PLAYER_DIR_JUMP(';
  code += ')\n';
  return code;
};
commandMap['_PLAYER_FIELD_DEMO_BGM_PLAY'] = { type: 'bdsp__player_field_demo_bgm_play', args: 1 };
Blockly.Blocks['bdsp__player_field_demo_bgm_play'] = {
  init: function() {
    this.appendDummyInput().appendField('_PLAYER_FIELD_DEMO_BGM_PLAY');
    this.appendValueInput('ARG_0').appendField('BGM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Plays the specified background music. Used for Dawn/Lucas, Rival, and getting shown around.");
  }
};
Blockly.JavaScript['bdsp__player_field_demo_bgm_play'] = function(block) {
  var code = '_PLAYER_FIELD_DEMO_BGM_PLAY(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_PLAYER_FORM_GET'] = { type: 'bdsp__player_form_get', args: 0 };
Blockly.Blocks['bdsp__player_form_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_PLAYER_FORM_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__player_form_get'] = function(block) {
  var code = '_PLAYER_FORM_GET(';
  code += ')\n';
  return code;
};
commandMap['_PLAYER_HEGIHT_VALID'] = { type: 'bdsp__player_hegiht_valid', args: 0 };
Blockly.Blocks['bdsp__player_hegiht_valid'] = {
  init: function() {
    this.appendDummyInput().appendField('_PLAYER_HEGIHT_VALID');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__player_hegiht_valid'] = function(block) {
  var code = '_PLAYER_HEGIHT_VALID(';
  code += ')\n';
  return code;
};
commandMap['_PLAYER_NAME'] = { type: 'bdsp__player_name', args: 0 };
Blockly.Blocks['bdsp__player_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_PLAYER_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__player_name'] = function(block) {
  var code = '_PLAYER_NAME(';
  code += ')\n';
  return code;
};
commandMap['_PLAYER_POS_GET'] = { type: 'bdsp__player_pos_get', args: 2 };
Blockly.Blocks['bdsp__player_pos_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_PLAYER_POS_GET');
    this.appendValueInput('ARG_0').appendField('X');
    this.appendValueInput('ARG_1').appendField('Z');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Gets the player's current XZ position and puts it into two variables.");
  }
};
Blockly.JavaScript['bdsp__player_pos_get'] = function(block) {
  var code = '_PLAYER_POS_GET(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_PLAYER_POS_OFFSET_SET'] = { type: 'bdsp__player_pos_offset_set', args: 3 };
Blockly.Blocks['bdsp__player_pos_offset_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_PLAYER_POS_OFFSET_SET');
    this.appendValueInput('ARG_0').appendField('X');
    this.appendValueInput('ARG_1').appendField('Y');
    this.appendValueInput('ARG_2').appendField('Z');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("(?) Sets the player's position to specific coordinates. Only used in Battle Tower.");
  }
};
Blockly.JavaScript['bdsp__player_pos_offset_set'] = function(block) {
  var code = '_PLAYER_POS_OFFSET_SET(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_PLAYER_REPORT_DRAW_DEL'] = { type: 'bdsp__player_report_draw_del', args: 0 };
Blockly.Blocks['bdsp__player_report_draw_del'] = {
  init: function() {
    this.appendDummyInput().appendField('_PLAYER_REPORT_DRAW_DEL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__player_report_draw_del'] = function(block) {
  var code = '_PLAYER_REPORT_DRAW_DEL(';
  code += ')\n';
  return code;
};
commandMap['_PLAYER_REPORT_DRAW_SET'] = { type: 'bdsp__player_report_draw_set', args: 0 };
Blockly.Blocks['bdsp__player_report_draw_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_PLAYER_REPORT_DRAW_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__player_report_draw_set'] = function(block) {
  var code = '_PLAYER_REPORT_DRAW_SET(';
  code += ')\n';
  return code;
};
commandMap['_PLAYER_REQ_BIT_ON'] = { type: 'bdsp__player_req_bit_on', args: 0 };
Blockly.Blocks['bdsp__player_req_bit_on'] = {
  init: function() {
    this.appendDummyInput().appendField('_PLAYER_REQ_BIT_ON');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__player_req_bit_on'] = function(block) {
  var code = '_PLAYER_REQ_BIT_ON(';
  code += ')\n';
  return code;
};
commandMap['_PLAYER_REQ_START'] = { type: 'bdsp__player_req_start', args: 0 };
Blockly.Blocks['bdsp__player_req_start'] = {
  init: function() {
    this.appendDummyInput().appendField('_PLAYER_REQ_START');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__player_req_start'] = function(block) {
  var code = '_PLAYER_REQ_START(';
  code += ')\n';
  return code;
};
commandMap['_PLAY_EMO_SE'] = { type: 'bdsp__play_emo_se', args: 0 };
Blockly.Blocks['bdsp__play_emo_se'] = {
  init: function() {
    this.appendDummyInput().appendField('_PLAY_EMO_SE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__play_emo_se'] = function(block) {
  var code = '_PLAY_EMO_SE(';
  code += ')\n';
  return code;
};
commandMap['_PLAY_FUREAI_VOICE_NAKAYOSHIRANK'] = { type: 'bdsp__play_fureai_voice_nakayoshirank', args: 0 };
Blockly.Blocks['bdsp__play_fureai_voice_nakayoshirank'] = {
  init: function() {
    this.appendDummyInput().appendField('_PLAY_FUREAI_VOICE_NAKAYOSHIRANK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__play_fureai_voice_nakayoshirank'] = function(block) {
  var code = '_PLAY_FUREAI_VOICE_NAKAYOSHIRANK(';
  code += ')\n';
  return code;
};
commandMap['_PLAY_REPORT_BTLTOWER_WIN'] = { type: 'bdsp__play_report_btltower_win', args: 0 };
Blockly.Blocks['bdsp__play_report_btltower_win'] = {
  init: function() {
    this.appendDummyInput().appendField('_PLAY_REPORT_BTLTOWER_WIN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__play_report_btltower_win'] = function(block) {
  var code = '_PLAY_REPORT_BTLTOWER_WIN(';
  code += ')\n';
  return code;
};
commandMap['_PLAY_REPORT_TRAINING'] = { type: 'bdsp__play_report_training', args: 0 };
Blockly.Blocks['bdsp__play_report_training'] = {
  init: function() {
    this.appendDummyInput().appendField('_PLAY_REPORT_TRAINING');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__play_report_training'] = function(block) {
  var code = '_PLAY_REPORT_TRAINING(';
  code += ')\n';
  return code;
};
commandMap['_PMS_BUF'] = { type: 'bdsp__pms_buf', args: 0 };
Blockly.Blocks['bdsp__pms_buf'] = {
  init: function() {
    this.appendDummyInput().appendField('_PMS_BUF');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__pms_buf'] = function(block) {
  var code = '_PMS_BUF(';
  code += ')\n';
  return code;
};
commandMap['_PMS_INPUT_DOUBLE'] = { type: 'bdsp__pms_input_double', args: 0 };
Blockly.Blocks['bdsp__pms_input_double'] = {
  init: function() {
    this.appendDummyInput().appendField('_PMS_INPUT_DOUBLE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__pms_input_double'] = function(block) {
  var code = '_PMS_INPUT_DOUBLE(';
  code += ')\n';
  return code;
};
commandMap['_PMS_INPUT_SINGLE'] = { type: 'bdsp__pms_input_single', args: 0 };
Blockly.Blocks['bdsp__pms_input_single'] = {
  init: function() {
    this.appendDummyInput().appendField('_PMS_INPUT_SINGLE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__pms_input_single'] = function(block) {
  var code = '_PMS_INPUT_SINGLE(';
  code += ')\n';
  return code;
};
commandMap['_PM_VERSION_GET'] = { type: 'bdsp__pm_version_get', args: 0 };
Blockly.Blocks['bdsp__pm_version_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_PM_VERSION_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__pm_version_get'] = function(block) {
  var code = '_PM_VERSION_GET(';
  code += ')\n';
  return code;
};
commandMap['_POCKET_NAME'] = { type: 'bdsp__pocket_name', args: 0 };
Blockly.Blocks['bdsp__pocket_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_POCKET_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__pocket_name'] = function(block) {
  var code = '_POCKET_NAME(';
  code += ')\n';
  return code;
};
commandMap['_POFFIN_NAME'] = { type: 'bdsp__poffin_name', args: 0 };
Blockly.Blocks['bdsp__poffin_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_POFFIN_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__poffin_name'] = function(block) {
  var code = '_POFFIN_NAME(';
  code += ')\n';
  return code;
};
commandMap['_POFIN_ADD'] = { type: 'bdsp__pofin_add', args: 0 };
Blockly.Blocks['bdsp__pofin_add'] = {
  init: function() {
    this.appendDummyInput().appendField('_POFIN_ADD');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__pofin_add'] = function(block) {
  var code = '_POFIN_ADD(';
  code += ')\n';
  return code;
};
commandMap['_POFIN_ADD_CHK'] = { type: 'bdsp__pofin_add_chk', args: 0 };
Blockly.Blocks['bdsp__pofin_add_chk'] = {
  init: function() {
    this.appendDummyInput().appendField('_POFIN_ADD_CHK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__pofin_add_chk'] = function(block) {
  var code = '_POFIN_ADD_CHK(';
  code += ')\n';
  return code;
};
commandMap['_POKECEN_CLEAR_BALL'] = { type: 'bdsp__pokecen_clear_ball', args: 0 };
Blockly.Blocks['bdsp__pokecen_clear_ball'] = {
  init: function() {
    this.appendDummyInput().appendField('_POKECEN_CLEAR_BALL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__pokecen_clear_ball'] = function(block) {
  var code = '_POKECEN_CLEAR_BALL(';
  code += ')\n';
  return code;
};
commandMap['_POKECEN_PUT_BALL'] = { type: 'bdsp__pokecen_put_ball', args: 0 };
Blockly.Blocks['bdsp__pokecen_put_ball'] = {
  init: function() {
    this.appendDummyInput().appendField('_POKECEN_PUT_BALL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__pokecen_put_ball'] = function(block) {
  var code = '_POKECEN_PUT_BALL(';
  code += ')\n';
  return code;
};
commandMap['_POKELIST_FORM_CHANGE_GET_RESULT'] = { type: 'bdsp__pokelist_form_change_get_result', args: 0 };
Blockly.Blocks['bdsp__pokelist_form_change_get_result'] = {
  init: function() {
    this.appendDummyInput().appendField('_POKELIST_FORM_CHANGE_GET_RESULT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__pokelist_form_change_get_result'] = function(block) {
  var code = '_POKELIST_FORM_CHANGE_GET_RESULT(';
  code += ')\n';
  return code;
};
commandMap['_POKELIST_FORM_CHANGE_SET_PROC'] = { type: 'bdsp__pokelist_form_change_set_proc', args: 0 };
Blockly.Blocks['bdsp__pokelist_form_change_set_proc'] = {
  init: function() {
    this.appendDummyInput().appendField('_POKELIST_FORM_CHANGE_SET_PROC');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__pokelist_form_change_set_proc'] = function(block) {
  var code = '_POKELIST_FORM_CHANGE_SET_PROC(';
  code += ')\n';
  return code;
};
commandMap['_POKELIST_GET_RESULT'] = { type: 'bdsp__pokelist_get_result', args: 2 };
Blockly.Blocks['bdsp__pokelist_get_result'] = {
  init: function() {
    this.appendDummyInput().appendField('_POKELIST_GET_RESULT');
    this.appendValueInput('ARG_0').appendField('PokÃ©mon1');
    this.appendValueInput('ARG_1').appendField('PokÃ©mon2');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Returns the chosen Pok\u00c3\u00a9mon in the previous Pok\u00c3\u00a9mon selection menu.");
  }
};
Blockly.JavaScript['bdsp__pokelist_get_result'] = function(block) {
  var code = '_POKELIST_GET_RESULT(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_POKELIST_SET_PROC'] = { type: 'bdsp__pokelist_set_proc', args: 1 };
Blockly.Blocks['bdsp__pokelist_set_proc'] = {
  init: function() {
    this.appendDummyInput().appendField('_POKELIST_SET_PROC');
    this.appendValueInput('ARG_0').appendField('Procedure');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Opens the Pok\u00c3\u00a9mon selection menu.");
  }
};
Blockly.JavaScript['bdsp__pokelist_set_proc'] = function(block) {
  var code = '_POKELIST_SET_PROC(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_POKEMON_NAME'] = { type: 'bdsp__pokemon_name', args: 0 };
Blockly.Blocks['bdsp__pokemon_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_POKEMON_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__pokemon_name'] = function(block) {
  var code = '_POKEMON_NAME(';
  code += ')\n';
  return code;
};
commandMap['_POKEMON_NAME_EXTRA'] = { type: 'bdsp__pokemon_name_extra', args: 0 };
Blockly.Blocks['bdsp__pokemon_name_extra'] = {
  init: function() {
    this.appendDummyInput().appendField('_POKEMON_NAME_EXTRA');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__pokemon_name_extra'] = function(block) {
  var code = '_POKEMON_NAME_EXTRA(';
  code += ')\n';
  return code;
};
commandMap['_POKEPARK_CONTROL'] = { type: 'bdsp__pokepark_control', args: 0 };
Blockly.Blocks['bdsp__pokepark_control'] = {
  init: function() {
    this.appendDummyInput().appendField('_POKEPARK_CONTROL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__pokepark_control'] = function(block) {
  var code = '_POKEPARK_CONTROL(';
  code += ')\n';
  return code;
};
commandMap['_POKEPARK_DEPOSIT_COUNT'] = { type: 'bdsp__pokepark_deposit_count', args: 0 };
Blockly.Blocks['bdsp__pokepark_deposit_count'] = {
  init: function() {
    this.appendDummyInput().appendField('_POKEPARK_DEPOSIT_COUNT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__pokepark_deposit_count'] = function(block) {
  var code = '_POKEPARK_DEPOSIT_COUNT(';
  code += ')\n';
  return code;
};
commandMap['_POKEPARK_GET_SCORE'] = { type: 'bdsp__pokepark_get_score', args: 0 };
Blockly.Blocks['bdsp__pokepark_get_score'] = {
  init: function() {
    this.appendDummyInput().appendField('_POKEPARK_GET_SCORE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__pokepark_get_score'] = function(block) {
  var code = '_POKEPARK_GET_SCORE(';
  code += ')\n';
  return code;
};
commandMap['_POKEPARK_TRANS_MONS'] = { type: 'bdsp__pokepark_trans_mons', args: 0 };
Blockly.Blocks['bdsp__pokepark_trans_mons'] = {
  init: function() {
    this.appendDummyInput().appendField('_POKEPARK_TRANS_MONS');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__pokepark_trans_mons'] = function(block) {
  var code = '_POKEPARK_TRANS_MONS(';
  code += ')\n';
  return code;
};
commandMap['_POKESTATUS_GET_RESULT'] = { type: 'bdsp__pokestatus_get_result', args: 0 };
Blockly.Blocks['bdsp__pokestatus_get_result'] = {
  init: function() {
    this.appendDummyInput().appendField('_POKESTATUS_GET_RESULT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__pokestatus_get_result'] = function(block) {
  var code = '_POKESTATUS_GET_RESULT(';
  code += ')\n';
  return code;
};
commandMap['_POKETCH_ADD'] = { type: 'bdsp__poketch_add', args: 0 };
Blockly.Blocks['bdsp__poketch_add'] = {
  init: function() {
    this.appendDummyInput().appendField('_POKETCH_ADD');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__poketch_add'] = function(block) {
  var code = '_POKETCH_ADD(';
  code += ')\n';
  return code;
};
commandMap['_POKETCH_CHECK'] = { type: 'bdsp__poketch_check', args: 0 };
Blockly.Blocks['bdsp__poketch_check'] = {
  init: function() {
    this.appendDummyInput().appendField('_POKETCH_CHECK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__poketch_check'] = function(block) {
  var code = '_POKETCH_CHECK(';
  code += ')\n';
  return code;
};
commandMap['_POKETCH_HOOK_RESET'] = { type: 'bdsp__poketch_hook_reset', args: 0 };
Blockly.Blocks['bdsp__poketch_hook_reset'] = {
  init: function() {
    this.appendDummyInput().appendField('_POKETCH_HOOK_RESET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__poketch_hook_reset'] = function(block) {
  var code = '_POKETCH_HOOK_RESET(';
  code += ')\n';
  return code;
};
commandMap['_POKETCH_HOOK_SET'] = { type: 'bdsp__poketch_hook_set', args: 0 };
Blockly.Blocks['bdsp__poketch_hook_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_POKETCH_HOOK_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__poketch_hook_set'] = function(block) {
  var code = '_POKETCH_HOOK_SET(';
  code += ')\n';
  return code;
};
commandMap['_POKETCH_NAME'] = { type: 'bdsp__poketch_name', args: 0 };
Blockly.Blocks['bdsp__poketch_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_POKETCH_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__poketch_name'] = function(block) {
  var code = '_POKETCH_NAME(';
  code += ')\n';
  return code;
};
commandMap['_POKETORE_GET_CHARGE'] = { type: 'bdsp__poketore_get_charge', args: 0 };
Blockly.Blocks['bdsp__poketore_get_charge'] = {
  init: function() {
    this.appendDummyInput().appendField('_POKETORE_GET_CHARGE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__poketore_get_charge'] = function(block) {
  var code = '_POKETORE_GET_CHARGE(';
  code += ')\n';
  return code;
};
commandMap['_POKETORE_START'] = { type: 'bdsp__poketore_start', args: 0 };
Blockly.Blocks['bdsp__poketore_start'] = {
  init: function() {
    this.appendDummyInput().appendField('_POKETORE_START');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__poketore_start'] = function(block) {
  var code = '_POKETORE_START(';
  code += ')\n';
  return code;
};
commandMap['_POKE_LEVEL_CHK'] = { type: 'bdsp__poke_level_chk', args: 0 };
Blockly.Blocks['bdsp__poke_level_chk'] = {
  init: function() {
    this.appendDummyInput().appendField('_POKE_LEVEL_CHK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__poke_level_chk'] = function(block) {
  var code = '_POKE_LEVEL_CHK(';
  code += ')\n';
  return code;
};
commandMap['_POKE_LEVEL_GET'] = { type: 'bdsp__poke_level_get', args: 0 };
Blockly.Blocks['bdsp__poke_level_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_POKE_LEVEL_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__poke_level_get'] = function(block) {
  var code = '_POKE_LEVEL_GET(';
  code += ')\n';
  return code;
};
commandMap['_POKE_LEVEL_GET_ALL'] = { type: 'bdsp__poke_level_get_all', args: 0 };
Blockly.Blocks['bdsp__poke_level_get_all'] = {
  init: function() {
    this.appendDummyInput().appendField('_POKE_LEVEL_GET_ALL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__poke_level_get_all'] = function(block) {
  var code = '_POKE_LEVEL_GET_ALL(';
  code += ')\n';
  return code;
};
commandMap['_POKE_LVUP_HOW_MANY'] = { type: 'bdsp__poke_lvup_how_many', args: 0 };
Blockly.Blocks['bdsp__poke_lvup_how_many'] = {
  init: function() {
    this.appendDummyInput().appendField('_POKE_LVUP_HOW_MANY');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__poke_lvup_how_many'] = function(block) {
  var code = '_POKE_LVUP_HOW_MANY(';
  code += ')\n';
  return code;
};
commandMap['_POKE_MAIL_CHK'] = { type: 'bdsp__poke_mail_chk', args: 0 };
Blockly.Blocks['bdsp__poke_mail_chk'] = {
  init: function() {
    this.appendDummyInput().appendField('_POKE_MAIL_CHK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__poke_mail_chk'] = function(block) {
  var code = '_POKE_MAIL_CHK(';
  code += ')\n';
  return code;
};
commandMap['_POKE_MAIL_DEL'] = { type: 'bdsp__poke_mail_del', args: 0 };
Blockly.Blocks['bdsp__poke_mail_del'] = {
  init: function() {
    this.appendDummyInput().appendField('_POKE_MAIL_DEL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__poke_mail_del'] = function(block) {
  var code = '_POKE_MAIL_DEL(';
  code += ')\n';
  return code;
};
commandMap['_POKE_TARENT_POW_MAX'] = { type: 'bdsp__poke_tarent_pow_max', args: 0 };
Blockly.Blocks['bdsp__poke_tarent_pow_max'] = {
  init: function() {
    this.appendDummyInput().appendField('_POKE_TARENT_POW_MAX');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__poke_tarent_pow_max'] = function(block) {
  var code = '_POKE_TARENT_POW_MAX(';
  code += ')\n';
  return code;
};
commandMap['_POKE_TYPE_NAME'] = { type: 'bdsp__poke_type_name', args: 0 };
Blockly.Blocks['bdsp__poke_type_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_POKE_TYPE_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__poke_type_name'] = function(block) {
  var code = '_POKE_TYPE_NAME(';
  code += ')\n';
  return code;
};
commandMap['_POKE_WINDOW_ANM'] = { type: 'bdsp__poke_window_anm', args: 0 };
Blockly.Blocks['bdsp__poke_window_anm'] = {
  init: function() {
    this.appendDummyInput().appendField('_POKE_WINDOW_ANM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Animates the Pok\u00c3\u00a9mon shown in a window.");
  }
};
Blockly.JavaScript['bdsp__poke_window_anm'] = function(block) {
  var code = '_POKE_WINDOW_ANM(';
  code += ')\n';
  return code;
};
commandMap['_POKE_WINDOW_ANM_WAIT'] = { type: 'bdsp__poke_window_anm_wait', args: 1 };
Blockly.Blocks['bdsp__poke_window_anm_wait'] = {
  init: function() {
    this.appendDummyInput().appendField('_POKE_WINDOW_ANM_WAIT');
    this.appendValueInput('ARG_0').appendField('Unknown');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Waits for the animation of the Pok\u00c3\u00a9mon shown in a window to end.");
  }
};
Blockly.JavaScript['bdsp__poke_window_anm_wait'] = function(block) {
  var code = '_POKE_WINDOW_ANM_WAIT(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_POKE_WINDOW_DEL'] = { type: 'bdsp__poke_window_del', args: 0 };
Blockly.Blocks['bdsp__poke_window_del'] = {
  init: function() {
    this.appendDummyInput().appendField('_POKE_WINDOW_DEL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Closes a window showing a Pok\u00c3\u00a9mon.");
  }
};
Blockly.JavaScript['bdsp__poke_window_del'] = function(block) {
  var code = '_POKE_WINDOW_DEL(';
  code += ')\n';
  return code;
};
commandMap['_POKE_WINDOW_PUT'] = { type: 'bdsp__poke_window_put', args: 1 };
Blockly.Blocks['bdsp__poke_window_put'] = {
  init: function() {
    this.appendDummyInput().appendField('_POKE_WINDOW_PUT');
    this.appendValueInput('ARG_0').appendField('Species');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Opens a window showing a Pok\u00c3\u00a9mon.");
  }
};
Blockly.JavaScript['bdsp__poke_window_put'] = function(block) {
  var code = '_POKE_WINDOW_PUT(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_POKE_WINDOW_PUT_PP'] = { type: 'bdsp__poke_window_put_pp', args: 1 };
Blockly.Blocks['bdsp__poke_window_put_pp'] = {
  init: function() {
    this.appendDummyInput().appendField('_POKE_WINDOW_PUT_PP');
    this.appendValueInput('ARG_0').appendField('Species');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Opens a window showing a Pok\u00c3\u00a9mon. Only used in Chatot scripts.");
  }
};
Blockly.JavaScript['bdsp__poke_window_put_pp'] = function(block) {
  var code = '_POKE_WINDOW_PUT_PP(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_PUSH_WATER_GYM_BUTTON'] = { type: 'bdsp__push_water_gym_button', args: 0 };
Blockly.Blocks['bdsp__push_water_gym_button'] = {
  init: function() {
    this.appendDummyInput().appendField('_PUSH_WATER_GYM_BUTTON');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__push_water_gym_button'] = function(block) {
  var code = '_PUSH_WATER_GYM_BUTTON(';
  code += ')\n';
  return code;
};
commandMap['_RANKING_VIEW'] = { type: 'bdsp__ranking_view', args: 0 };
Blockly.Blocks['bdsp__ranking_view'] = {
  init: function() {
    this.appendDummyInput().appendField('_RANKING_VIEW');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__ranking_view'] = function(block) {
  var code = '_RANKING_VIEW(';
  code += ')\n';
  return code;
};
commandMap['_RECONGNIZE_OPEN_WAIT'] = { type: 'bdsp__recongnize_open_wait', args: 0 };
Blockly.Blocks['bdsp__recongnize_open_wait'] = {
  init: function() {
    this.appendDummyInput().appendField('_RECONGNIZE_OPEN_WAIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__recongnize_open_wait'] = function(block) {
  var code = '_RECONGNIZE_OPEN_WAIT(';
  code += ')\n';
  return code;
};
commandMap['_RECONGNIZE_TOKIKAKE'] = { type: 'bdsp__recongnize_tokikake', args: 0 };
Blockly.Blocks['bdsp__recongnize_tokikake'] = {
  init: function() {
    this.appendDummyInput().appendField('_RECONGNIZE_TOKIKAKE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__recongnize_tokikake'] = function(block) {
  var code = '_RECONGNIZE_TOKIKAKE(';
  code += ')\n';
  return code;
};
commandMap['_RECORD_ADD'] = { type: 'bdsp__record_add', args: 0 };
Blockly.Blocks['bdsp__record_add'] = {
  init: function() {
    this.appendDummyInput().appendField('_RECORD_ADD');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__record_add'] = function(block) {
  var code = '_RECORD_ADD(';
  code += ')\n';
  return code;
};
commandMap['_RECORD_CORNER_SET_PROC'] = { type: 'bdsp__record_corner_set_proc', args: 0 };
Blockly.Blocks['bdsp__record_corner_set_proc'] = {
  init: function() {
    this.appendDummyInput().appendField('_RECORD_CORNER_SET_PROC');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Opens the Record Corner menu in Union Room.");
  }
};
Blockly.JavaScript['bdsp__record_corner_set_proc'] = function(block) {
  var code = '_RECORD_CORNER_SET_PROC(';
  code += ')\n';
  return code;
};
commandMap['_RECORD_GET'] = { type: 'bdsp__record_get', args: 0 };
Blockly.Blocks['bdsp__record_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_RECORD_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__record_get'] = function(block) {
  var code = '_RECORD_GET(';
  code += ')\n';
  return code;
};
commandMap['_RECORD_INC'] = { type: 'bdsp__record_inc', args: 0 };
Blockly.Blocks['bdsp__record_inc'] = {
  init: function() {
    this.appendDummyInput().appendField('_RECORD_INC');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__record_inc'] = function(block) {
  var code = '_RECORD_INC(';
  code += ')\n';
  return code;
};
commandMap['_RECORD_SET'] = { type: 'bdsp__record_set', args: 0 };
Blockly.Blocks['bdsp__record_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_RECORD_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__record_set'] = function(block) {
  var code = '_RECORD_SET(';
  code += ')\n';
  return code;
};
commandMap['_RECORD_SETIFLARGE'] = { type: 'bdsp__record_setiflarge', args: 0 };
Blockly.Blocks['bdsp__record_setiflarge'] = {
  init: function() {
    this.appendDummyInput().appendField('_RECORD_SETIFLARGE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__record_setiflarge'] = function(block) {
  var code = '_RECORD_SETIFLARGE(';
  code += ')\n';
  return code;
};
commandMap['_REGULAR_CHECK'] = { type: 'bdsp__regular_check', args: 0 };
Blockly.Blocks['bdsp__regular_check'] = {
  init: function() {
    this.appendDummyInput().appendField('_REGULAR_CHECK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__regular_check'] = function(block) {
  var code = '_REGULAR_CHECK(';
  code += ')\n';
  return code;
};
commandMap['_REGULATION_LIST_CALL'] = { type: 'bdsp__regulation_list_call', args: 0 };
Blockly.Blocks['bdsp__regulation_list_call'] = {
  init: function() {
    this.appendDummyInput().appendField('_REGULATION_LIST_CALL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__regulation_list_call'] = function(block) {
  var code = '_REGULATION_LIST_CALL(';
  code += ')\n';
  return code;
};
commandMap['_RELEASE_CAMERA_CONTROLLER'] = { type: 'bdsp__release_camera_controller', args: 0 };
Blockly.Blocks['bdsp__release_camera_controller'] = {
  init: function() {
    this.appendDummyInput().appendField('_RELEASE_CAMERA_CONTROLLER');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__release_camera_controller'] = function(block) {
  var code = '_RELEASE_CAMERA_CONTROLLER(';
  code += ')\n';
  return code;
};
commandMap['_RELEASE_EFFECT'] = { type: 'bdsp__release_effect', args: 0 };
Blockly.Blocks['bdsp__release_effect'] = {
  init: function() {
    this.appendDummyInput().appendField('_RELEASE_EFFECT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__release_effect'] = function(block) {
  var code = '_RELEASE_EFFECT(';
  code += ')\n';
  return code;
};
commandMap['_RELEASE_UMA_ANIME'] = { type: 'bdsp__release_uma_anime', args: 0 };
Blockly.Blocks['bdsp__release_uma_anime'] = {
  init: function() {
    this.appendDummyInput().appendField('_RELEASE_UMA_ANIME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__release_uma_anime'] = function(block) {
  var code = '_RELEASE_UMA_ANIME(';
  code += ')\n';
  return code;
};
commandMap['_REMAIND_WAZALIST_GET_RESULT'] = { type: 'bdsp__remaind_wazalist_get_result', args: 0 };
Blockly.Blocks['bdsp__remaind_wazalist_get_result'] = {
  init: function() {
    this.appendDummyInput().appendField('_REMAIND_WAZALIST_GET_RESULT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__remaind_wazalist_get_result'] = function(block) {
  var code = '_REMAIND_WAZALIST_GET_RESULT(';
  code += ')\n';
  return code;
};
commandMap['_REMAIND_WAZALIST_SET_PROC'] = { type: 'bdsp__remaind_wazalist_set_proc', args: 0 };
Blockly.Blocks['bdsp__remaind_wazalist_set_proc'] = {
  init: function() {
    this.appendDummyInput().appendField('_REMAIND_WAZALIST_SET_PROC');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__remaind_wazalist_set_proc'] = function(block) {
  var code = '_REMAIND_WAZALIST_SET_PROC(';
  code += ')\n';
  return code;
};
commandMap['_REMAIND_WAZA_COUNT'] = { type: 'bdsp__remaind_waza_count', args: 0 };
Blockly.Blocks['bdsp__remaind_waza_count'] = {
  init: function() {
    this.appendDummyInput().appendField('_REMAIND_WAZA_COUNT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__remaind_waza_count'] = function(block) {
  var code = '_REMAIND_WAZA_COUNT(';
  code += ')\n';
  return code;
};
commandMap['_REPORT_SAVE'] = { type: 'bdsp__report_save', args: 0 };
Blockly.Blocks['bdsp__report_save'] = {
  init: function() {
    this.appendDummyInput().appendField('_REPORT_SAVE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__report_save'] = function(block) {
  var code = '_REPORT_SAVE(';
  code += ')\n';
  return code;
};
commandMap['_REPORT_SAVE_CHECK'] = { type: 'bdsp__report_save_check', args: 0 };
Blockly.Blocks['bdsp__report_save_check'] = {
  init: function() {
    this.appendDummyInput().appendField('_REPORT_SAVE_CHECK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__report_save_check'] = function(block) {
  var code = '_REPORT_SAVE_CHECK(';
  code += ')\n';
  return code;
};
commandMap['_REPORT_WIN_CLOSE'] = { type: 'bdsp__report_win_close', args: 0 };
Blockly.Blocks['bdsp__report_win_close'] = {
  init: function() {
    this.appendDummyInput().appendField('_REPORT_WIN_CLOSE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__report_win_close'] = function(block) {
  var code = '_REPORT_WIN_CLOSE(';
  code += ')\n';
  return code;
};
commandMap['_REPORT_WIN_OPEN'] = { type: 'bdsp__report_win_open', args: 0 };
Blockly.Blocks['bdsp__report_win_open'] = {
  init: function() {
    this.appendDummyInput().appendField('_REPORT_WIN_OPEN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__report_win_open'] = function(block) {
  var code = '_REPORT_WIN_OPEN(';
  code += ')\n';
  return code;
};
commandMap['_RESET_SAVEBGM'] = { type: 'bdsp__reset_savebgm', args: 0 };
Blockly.Blocks['bdsp__reset_savebgm'] = {
  init: function() {
    this.appendDummyInput().appendField('_RESET_SAVEBGM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__reset_savebgm'] = function(block) {
  var code = '_RESET_SAVEBGM(';
  code += ')\n';
  return code;
};
commandMap['_RESET_STOP_EYE_ENCOUNT'] = { type: 'bdsp__reset_stop_eye_encount', args: 0 };
Blockly.Blocks['bdsp__reset_stop_eye_encount'] = {
  init: function() {
    this.appendDummyInput().appendField('_RESET_STOP_EYE_ENCOUNT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__reset_stop_eye_encount'] = function(block) {
  var code = '_RESET_STOP_EYE_ENCOUNT(';
  code += ')\n';
  return code;
};
commandMap['_RESET_SYS_FLAG'] = { type: 'bdsp__reset_sys_flag', args: 0 };
Blockly.Blocks['bdsp__reset_sys_flag'] = {
  init: function() {
    this.appendDummyInput().appendField('_RESET_SYS_FLAG');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__reset_sys_flag'] = function(block) {
  var code = '_RESET_SYS_FLAG(';
  code += ')\n';
  return code;
};
commandMap['_RESET_UG_NPC_TALK_COUNT'] = { type: 'bdsp__reset_ug_npc_talk_count', args: 0 };
Blockly.Blocks['bdsp__reset_ug_npc_talk_count'] = {
  init: function() {
    this.appendDummyInput().appendField('_RESET_UG_NPC_TALK_COUNT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__reset_ug_npc_talk_count'] = function(block) {
  var code = '_RESET_UG_NPC_TALK_COUNT(';
  code += ')\n';
  return code;
};
commandMap['_RET'] = { type: 'bdsp__ret', args: 0 };
Blockly.Blocks['bdsp__ret'] = {
  init: function() {
    this.appendDummyInput().appendField('_RET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Returns after a call.");
  }
};
Blockly.JavaScript['bdsp__ret'] = function(block) {
  var code = '_RET(';
  code += ')\n';
  return code;
};
commandMap['_RETURN_LOOP'] = { type: 'bdsp__return_loop', args: 0 };
Blockly.Blocks['bdsp__return_loop'] = {
  init: function() {
    this.appendDummyInput().appendField('_RETURN_LOOP');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__return_loop'] = function(block) {
  var code = '_RETURN_LOOP(';
  code += ')\n';
  return code;
};
commandMap['_RETURN_SCRIPT_WK_SET'] = { type: 'bdsp__return_script_wk_set', args: 0 };
Blockly.Blocks['bdsp__return_script_wk_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_RETURN_SCRIPT_WK_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__return_script_wk_set'] = function(block) {
  var code = '_RETURN_SCRIPT_WK_SET(';
  code += ')\n';
  return code;
};
commandMap['_REVENGE_TRAINER_SEARCH'] = { type: 'bdsp__revenge_trainer_search', args: 2 };
Blockly.Blocks['bdsp__revenge_trainer_search'] = {
  init: function() {
    this.appendDummyInput().appendField('_REVENGE_TRAINER_SEARCH');
    this.appendValueInput('ARG_0').appendField('Trainer');
    this.appendValueInput('ARG_1').appendField('Result');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Checks if a trainer is currently looking for a rematch.");
  }
};
Blockly.JavaScript['bdsp__revenge_trainer_search'] = function(block) {
  var code = '_REVENGE_TRAINER_SEARCH(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_REVENGE_TRAINER_TALK_TYPE_GET'] = { type: 'bdsp__revenge_trainer_talk_type_get', args: 0 };
Blockly.Blocks['bdsp__revenge_trainer_talk_type_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_REVENGE_TRAINER_TALK_TYPE_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__revenge_trainer_talk_type_get'] = function(block) {
  var code = '_REVENGE_TRAINER_TALK_TYPE_GET(';
  code += ')\n';
  return code;
};
commandMap['_RIBBON_NAME'] = { type: 'bdsp__ribbon_name', args: 0 };
Blockly.Blocks['bdsp__ribbon_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_RIBBON_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__ribbon_name'] = function(block) {
  var code = '_RIBBON_NAME(';
  code += ')\n';
  return code;
};
commandMap['_RIVAL_NAME'] = { type: 'bdsp__rival_name', args: 0 };
Blockly.Blocks['bdsp__rival_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_RIVAL_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__rival_name'] = function(block) {
  var code = '_RIVAL_NAME(';
  code += ')\n';
  return code;
};
commandMap['_RIVAL_POKEMON_NAME'] = { type: 'bdsp__rival_pokemon_name', args: 0 };
Blockly.Blocks['bdsp__rival_pokemon_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_RIVAL_POKEMON_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__rival_pokemon_name'] = function(block) {
  var code = '_RIVAL_POKEMON_NAME(';
  code += ')\n';
  return code;
};
commandMap['_ROTATE_ELEC_GYM_GEAR'] = { type: 'bdsp__rotate_elec_gym_gear', args: 0 };
Blockly.Blocks['bdsp__rotate_elec_gym_gear'] = {
  init: function() {
    this.appendDummyInput().appendField('_ROTATE_ELEC_GYM_GEAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__rotate_elec_gym_gear'] = function(block) {
  var code = '_ROTATE_ELEC_GYM_GEAR(';
  code += ')\n';
  return code;
};
commandMap['_ROTOMU_FORM_CHECK'] = { type: 'bdsp__rotomu_form_check', args: 0 };
Blockly.Blocks['bdsp__rotomu_form_check'] = {
  init: function() {
    this.appendDummyInput().appendField('_ROTOMU_FORM_CHECK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__rotomu_form_check'] = function(block) {
  var code = '_ROTOMU_FORM_CHECK(';
  code += ')\n';
  return code;
};
commandMap['_SAFARI_END'] = { type: 'bdsp__safari_end', args: 0 };
Blockly.Blocks['bdsp__safari_end'] = {
  init: function() {
    this.appendDummyInput().appendField('_SAFARI_END');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__safari_end'] = function(block) {
  var code = '_SAFARI_END(';
  code += ')\n';
  return code;
};
commandMap['_SAFARI_SCOPE_SEQUENCE'] = { type: 'bdsp__safari_scope_sequence', args: 0 };
Blockly.Blocks['bdsp__safari_scope_sequence'] = {
  init: function() {
    this.appendDummyInput().appendField('_SAFARI_SCOPE_SEQUENCE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__safari_scope_sequence'] = function(block) {
  var code = '_SAFARI_SCOPE_SEQUENCE(';
  code += ')\n';
  return code;
};
commandMap['_SAFARI_START'] = { type: 'bdsp__safari_start', args: 0 };
Blockly.Blocks['bdsp__safari_start'] = {
  init: function() {
    this.appendDummyInput().appendField('_SAFARI_START');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__safari_start'] = function(block) {
  var code = '_SAFARI_START(';
  code += ')\n';
  return code;
};
commandMap['_SAVE_FIELD_OBJ'] = { type: 'bdsp__save_field_obj', args: 0 };
Blockly.Blocks['bdsp__save_field_obj'] = {
  init: function() {
    this.appendDummyInput().appendField('_SAVE_FIELD_OBJ');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__save_field_obj'] = function(block) {
  var code = '_SAVE_FIELD_OBJ(';
  code += ')\n';
  return code;
};
commandMap['_SAVE_PLAYREPORT'] = { type: 'bdsp__save_playreport', args: 0 };
Blockly.Blocks['bdsp__save_playreport'] = {
  init: function() {
    this.appendDummyInput().appendField('_SAVE_PLAYREPORT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__save_playreport'] = function(block) {
  var code = '_SAVE_PLAYREPORT(';
  code += ')\n';
  return code;
};
commandMap['_SAVE_RENDOU_ENABLE'] = { type: 'bdsp__save_rendou_enable', args: 0 };
Blockly.Blocks['bdsp__save_rendou_enable'] = {
  init: function() {
    this.appendDummyInput().appendField('_SAVE_RENDOU_ENABLE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__save_rendou_enable'] = function(block) {
  var code = '_SAVE_RENDOU_ENABLE(';
  code += ')\n';
  return code;
};
commandMap['_SCENE_CHANGE_DATA'] = { type: 'bdsp__scene_change_data', args: 3 };
Blockly.Blocks['bdsp__scene_change_data'] = {
  init: function() {
    this.appendDummyInput().appendField('_SCENE_CHANGE_DATA');
    this.appendValueInput('ARG_0').appendField('Variable');
    this.appendValueInput('ARG_1').appendField('Value');
    this.appendValueInput('ARG_2').appendField('Script');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Calls a script of the main script file if the value of a variable matches a specific value.");
  }
};
Blockly.JavaScript['bdsp__scene_change_data'] = function(block) {
  var code = '_SCENE_CHANGE_DATA(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_SCENE_CHANGE_END'] = { type: 'bdsp__scene_change_end', args: 0 };
Blockly.Blocks['bdsp__scene_change_end'] = {
  init: function() {
    this.appendDummyInput().appendField('_SCENE_CHANGE_END');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Ends the script containing the map script commands.");
  }
};
Blockly.JavaScript['bdsp__scene_change_end'] = function(block) {
  var code = '_SCENE_CHANGE_END(';
  code += ')\n';
  return code;
};
commandMap['_SCENE_CHANGE_LABEL'] = { type: 'bdsp__scene_change_label', args: 1 };
Blockly.Blocks['bdsp__scene_change_label'] = {
  init: function() {
    this.appendDummyInput().appendField('_SCENE_CHANGE_LABEL');
    this.appendValueInput('ARG_0').appendField('Script');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Jumps to a script which contains map script commands.");
  }
};
Blockly.JavaScript['bdsp__scene_change_label'] = function(block) {
  var code = '_SCENE_CHANGE_LABEL(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_SEACRET_POKE_RETRY_CHECK'] = { type: 'bdsp__seacret_poke_retry_check', args: 0 };
Blockly.Blocks['bdsp__seacret_poke_retry_check'] = {
  init: function() {
    this.appendDummyInput().appendField('_SEACRET_POKE_RETRY_CHECK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__seacret_poke_retry_check'] = function(block) {
  var code = '_SEACRET_POKE_RETRY_CHECK(';
  code += ')\n';
  return code;
};
commandMap['_SEAL_NAME'] = { type: 'bdsp__seal_name', args: 0 };
Blockly.Blocks['bdsp__seal_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_SEAL_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__seal_name'] = function(block) {
  var code = '_SEAL_NAME(';
  code += ')\n';
  return code;
};
commandMap['_SEIKAKU_NAME'] = { type: 'bdsp__seikaku_name', args: 0 };
Blockly.Blocks['bdsp__seikaku_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_SEIKAKU_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__seikaku_name'] = function(block) {
  var code = '_SEIKAKU_NAME(';
  code += ')\n';
  return code;
};
commandMap['_SEL_CHILD_WIN'] = { type: 'bdsp__sel_child_win', args: 0 };
Blockly.Blocks['bdsp__sel_child_win'] = {
  init: function() {
    this.appendDummyInput().appendField('_SEL_CHILD_WIN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sel_child_win'] = function(block) {
  var code = '_SEL_CHILD_WIN(';
  code += ')\n';
  return code;
};
commandMap['_SEL_PARENT_WIN'] = { type: 'bdsp__sel_parent_win', args: 0 };
Blockly.Blocks['bdsp__sel_parent_win'] = {
  init: function() {
    this.appendDummyInput().appendField('_SEL_PARENT_WIN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sel_parent_win'] = function(block) {
  var code = '_SEL_PARENT_WIN(';
  code += ')\n';
  return code;
};
commandMap['_SEL_WIN_JUMP'] = { type: 'bdsp__sel_win_jump', args: 0 };
Blockly.Blocks['bdsp__sel_win_jump'] = {
  init: function() {
    this.appendDummyInput().appendField('_SEL_WIN_JUMP');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__sel_win_jump'] = function(block) {
  var code = '_SEL_WIN_JUMP(';
  code += ')\n';
  return code;
};
commandMap['_SEQ_CLOSE_DOOR'] = { type: 'bdsp__seq_close_door', args: 0 };
Blockly.Blocks['bdsp__seq_close_door'] = {
  init: function() {
    this.appendDummyInput().appendField('_SEQ_CLOSE_DOOR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__seq_close_door'] = function(block) {
  var code = '_SEQ_CLOSE_DOOR(';
  code += ')\n';
  return code;
};
commandMap['_SEQ_OPEN_DOOR'] = { type: 'bdsp__seq_open_door', args: 0 };
Blockly.Blocks['bdsp__seq_open_door'] = {
  init: function() {
    this.appendDummyInput().appendField('_SEQ_OPEN_DOOR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__seq_open_door'] = function(block) {
  var code = '_SEQ_OPEN_DOOR(';
  code += ')\n';
  return code;
};
commandMap['_SETUP_PASO_ANM'] = { type: 'bdsp__setup_paso_anm', args: 0 };
Blockly.Blocks['bdsp__setup_paso_anm'] = {
  init: function() {
    this.appendDummyInput().appendField('_SETUP_PASO_ANM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__setup_paso_anm'] = function(block) {
  var code = '_SETUP_PASO_ANM(';
  code += ')\n';
  return code;
};
commandMap['_SETUP_RAH_CYL'] = { type: 'bdsp__setup_rah_cyl', args: 0 };
Blockly.Blocks['bdsp__setup_rah_cyl'] = {
  init: function() {
    this.appendDummyInput().appendField('_SETUP_RAH_CYL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__setup_rah_cyl'] = function(block) {
  var code = '_SETUP_RAH_CYL(';
  code += ')\n';
  return code;
};
commandMap['_SETUP_SHIP'] = { type: 'bdsp__setup_ship', args: 0 };
Blockly.Blocks['bdsp__setup_ship'] = {
  init: function() {
    this.appendDummyInput().appendField('_SETUP_SHIP');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__setup_ship'] = function(block) {
  var code = '_SETUP_SHIP(';
  code += ')\n';
  return code;
};
commandMap['_SET_CUSTUM_WIN_MSBT'] = { type: 'bdsp__set_custum_win_msbt', args: 0 };
Blockly.Blocks['bdsp__set_custum_win_msbt'] = {
  init: function() {
    this.appendDummyInput().appendField('_SET_CUSTUM_WIN_MSBT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__set_custum_win_msbt'] = function(block) {
  var code = '_SET_CUSTUM_WIN_MSBT(';
  code += ')\n';
  return code;
};
commandMap['_SET_DOOR_OBJ'] = { type: 'bdsp__set_door_obj', args: 0 };
Blockly.Blocks['bdsp__set_door_obj'] = {
  init: function() {
    this.appendDummyInput().appendField('_SET_DOOR_OBJ');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__set_door_obj'] = function(block) {
  var code = '_SET_DOOR_OBJ(';
  code += ')\n';
  return code;
};
commandMap['_SET_ESCAPE_LOCATION'] = { type: 'bdsp__set_escape_location', args: 0 };
Blockly.Blocks['bdsp__set_escape_location'] = {
  init: function() {
    this.appendDummyInput().appendField('_SET_ESCAPE_LOCATION');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__set_escape_location'] = function(block) {
  var code = '_SET_ESCAPE_LOCATION(';
  code += ')\n';
  return code;
};
commandMap['_SET_EVENT_CAMERA_PARAM'] = { type: 'bdsp__set_event_camera_param', args: 0 };
Blockly.Blocks['bdsp__set_event_camera_param'] = {
  init: function() {
    this.appendDummyInput().appendField('_SET_EVENT_CAMERA_PARAM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__set_event_camera_param'] = function(block) {
  var code = '_SET_EVENT_CAMERA_PARAM(';
  code += ')\n';
  return code;
};
commandMap['_SET_FORCE_BLINK'] = { type: 'bdsp__set_force_blink', args: 0 };
Blockly.Blocks['bdsp__set_force_blink'] = {
  init: function() {
    this.appendDummyInput().appendField('_SET_FORCE_BLINK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__set_force_blink'] = function(block) {
  var code = '_SET_FORCE_BLINK(';
  code += ')\n';
  return code;
};
commandMap['_SET_GLOBALWATERFIELD'] = { type: 'bdsp__set_globalwaterfield', args: 0 };
Blockly.Blocks['bdsp__set_globalwaterfield'] = {
  init: function() {
    this.appendDummyInput().appendField('_SET_GLOBALWATERFIELD');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__set_globalwaterfield'] = function(block) {
  var code = '_SET_GLOBALWATERFIELD(';
  code += ')\n';
  return code;
};
commandMap['_SET_LIGHTINTENSITY'] = { type: 'bdsp__set_lightintensity', args: 0 };
Blockly.Blocks['bdsp__set_lightintensity'] = {
  init: function() {
    this.appendDummyInput().appendField('_SET_LIGHTINTENSITY');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__set_lightintensity'] = function(block) {
  var code = '_SET_LIGHTINTENSITY(';
  code += ')\n';
  return code;
};
commandMap['_SET_LIGHTINTENSITY_CHARCTER'] = { type: 'bdsp__set_lightintensity_charcter', args: 0 };
Blockly.Blocks['bdsp__set_lightintensity_charcter'] = {
  init: function() {
    this.appendDummyInput().appendField('_SET_LIGHTINTENSITY_CHARCTER');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__set_lightintensity_charcter'] = function(block) {
  var code = '_SET_LIGHTINTENSITY_CHARCTER(';
  code += ')\n';
  return code;
};
commandMap['_SET_LIGHTINTENSITY_POKE'] = { type: 'bdsp__set_lightintensity_poke', args: 0 };
Blockly.Blocks['bdsp__set_lightintensity_poke'] = {
  init: function() {
    this.appendDummyInput().appendField('_SET_LIGHTINTENSITY_POKE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__set_lightintensity_poke'] = function(block) {
  var code = '_SET_LIGHTINTENSITY_POKE(';
  code += ')\n';
  return code;
};
commandMap['_SET_MAP_PROC'] = { type: 'bdsp__set_map_proc', args: 0 };
Blockly.Blocks['bdsp__set_map_proc'] = {
  init: function() {
    this.appendDummyInput().appendField('_SET_MAP_PROC');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Refreshes the map after commands that load a new scene.");
  }
};
Blockly.JavaScript['bdsp__set_map_proc'] = function(block) {
  var code = '_SET_MAP_PROC(';
  code += ')\n';
  return code;
};
commandMap['_SET_MATCHING_GROUP'] = { type: 'bdsp__set_matching_group', args: 0 };
Blockly.Blocks['bdsp__set_matching_group'] = {
  init: function() {
    this.appendDummyInput().appendField('_SET_MATCHING_GROUP');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__set_matching_group'] = function(block) {
  var code = '_SET_MATCHING_GROUP(';
  code += ')\n';
  return code;
};
commandMap['_SET_OFFSET'] = { type: 'bdsp__set_offset', args: 0 };
Blockly.Blocks['bdsp__set_offset'] = {
  init: function() {
    this.appendDummyInput().appendField('_SET_OFFSET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__set_offset'] = function(block) {
  var code = '_SET_OFFSET(';
  code += ')\n';
  return code;
};
commandMap['_SET_POS_HERO_MATCH_X'] = { type: 'bdsp__set_pos_hero_match_x', args: 0 };
Blockly.Blocks['bdsp__set_pos_hero_match_x'] = {
  init: function() {
    this.appendDummyInput().appendField('_SET_POS_HERO_MATCH_X');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__set_pos_hero_match_x'] = function(block) {
  var code = '_SET_POS_HERO_MATCH_X(';
  code += ')\n';
  return code;
};
commandMap['_SET_POS_HERO_MATCH_Z'] = { type: 'bdsp__set_pos_hero_match_z', args: 0 };
Blockly.Blocks['bdsp__set_pos_hero_match_z'] = {
  init: function() {
    this.appendDummyInput().appendField('_SET_POS_HERO_MATCH_Z');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__set_pos_hero_match_z'] = function(block) {
  var code = '_SET_POS_HERO_MATCH_Z(';
  code += ')\n';
  return code;
};
commandMap['_SET_RIBBON'] = { type: 'bdsp__set_ribbon', args: 0 };
Blockly.Blocks['bdsp__set_ribbon'] = {
  init: function() {
    this.appendDummyInput().appendField('_SET_RIBBON');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__set_ribbon'] = function(block) {
  var code = '_SET_RIBBON(';
  code += ')\n';
  return code;
};
commandMap['_SET_SEED_COMPOST'] = { type: 'bdsp__set_seed_compost', args: 0 };
Blockly.Blocks['bdsp__set_seed_compost'] = {
  init: function() {
    this.appendDummyInput().appendField('_SET_SEED_COMPOST');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__set_seed_compost'] = function(block) {
  var code = '_SET_SEED_COMPOST(';
  code += ')\n';
  return code;
};
commandMap['_SET_SEED_NUTS'] = { type: 'bdsp__set_seed_nuts', args: 1 };
Blockly.Blocks['bdsp__set_seed_nuts'] = {
  init: function() {
    this.appendDummyInput().appendField('_SET_SEED_NUTS');
    this.appendValueInput('ARG_0').appendField('Berry');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Plants the given berry.");
  }
};
Blockly.JavaScript['bdsp__set_seed_nuts'] = function(block) {
  var code = '_SET_SEED_NUTS(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_SET_SEED_WATER'] = { type: 'bdsp__set_seed_water', args: 0 };
Blockly.Blocks['bdsp__set_seed_water'] = {
  init: function() {
    this.appendDummyInput().appendField('_SET_SEED_WATER');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__set_seed_water'] = function(block) {
  var code = '_SET_SEED_WATER(';
  code += ')\n';
  return code;
};
commandMap['_SET_SODATEYA_POKE'] = { type: 'bdsp__set_sodateya_poke', args: 0 };
Blockly.Blocks['bdsp__set_sodateya_poke'] = {
  init: function() {
    this.appendDummyInput().appendField('_SET_SODATEYA_POKE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__set_sodateya_poke'] = function(block) {
  var code = '_SET_SODATEYA_POKE(';
  code += ')\n';
  return code;
};
commandMap['_SET_STOP_EYE_ENCOUNT'] = { type: 'bdsp__set_stop_eye_encount', args: 0 };
Blockly.Blocks['bdsp__set_stop_eye_encount'] = {
  init: function() {
    this.appendDummyInput().appendField('_SET_STOP_EYE_ENCOUNT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__set_stop_eye_encount'] = function(block) {
  var code = '_SET_STOP_EYE_ENCOUNT(';
  code += ')\n';
  return code;
};
commandMap['_SET_SYS_FLAG'] = { type: 'bdsp__set_sys_flag', args: 0 };
Blockly.Blocks['bdsp__set_sys_flag'] = {
  init: function() {
    this.appendDummyInput().appendField('_SET_SYS_FLAG');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__set_sys_flag'] = function(block) {
  var code = '_SET_SYS_FLAG(';
  code += ')\n';
  return code;
};
commandMap['_SET_TELEPORT_ID'] = { type: 'bdsp__set_teleport_id', args: 0 };
Blockly.Blocks['bdsp__set_teleport_id'] = {
  init: function() {
    this.appendDummyInput().appendField('_SET_TELEPORT_ID');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__set_teleport_id'] = function(block) {
  var code = '_SET_TELEPORT_ID(';
  code += ')\n';
  return code;
};
commandMap['_SET_TURN_HERO_FRAME'] = { type: 'bdsp__set_turn_hero_frame', args: 0 };
Blockly.Blocks['bdsp__set_turn_hero_frame'] = {
  init: function() {
    this.appendDummyInput().appendField('_SET_TURN_HERO_FRAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__set_turn_hero_frame'] = function(block) {
  var code = '_SET_TURN_HERO_FRAME(';
  code += ')\n';
  return code;
};
commandMap['_SET_TURN_OBJ_FRAME'] = { type: 'bdsp__set_turn_obj_frame', args: 0 };
Blockly.Blocks['bdsp__set_turn_obj_frame'] = {
  init: function() {
    this.appendDummyInput().appendField('_SET_TURN_OBJ_FRAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__set_turn_obj_frame'] = function(block) {
  var code = '_SET_TURN_OBJ_FRAME(';
  code += ')\n';
  return code;
};
commandMap['_SET_TV_INT'] = { type: 'bdsp__set_tv_int', args: 0 };
Blockly.Blocks['bdsp__set_tv_int'] = {
  init: function() {
    this.appendDummyInput().appendField('_SET_TV_INT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__set_tv_int'] = function(block) {
  var code = '_SET_TV_INT(';
  code += ')\n';
  return code;
};
commandMap['_SET_TV_PLAYER_NAME'] = { type: 'bdsp__set_tv_player_name', args: 0 };
Blockly.Blocks['bdsp__set_tv_player_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_SET_TV_PLAYER_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__set_tv_player_name'] = function(block) {
  var code = '_SET_TV_PLAYER_NAME(';
  code += ')\n';
  return code;
};
commandMap['_SET_TV_POKE_NICK_NAME'] = { type: 'bdsp__set_tv_poke_nick_name', args: 0 };
Blockly.Blocks['bdsp__set_tv_poke_nick_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_SET_TV_POKE_NICK_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__set_tv_poke_nick_name'] = function(block) {
  var code = '_SET_TV_POKE_NICK_NAME(';
  code += ')\n';
  return code;
};
commandMap['_SET_UP_DOOR_ANIME'] = { type: 'bdsp__set_up_door_anime', args: 0 };
Blockly.Blocks['bdsp__set_up_door_anime'] = {
  init: function() {
    this.appendDummyInput().appendField('_SET_UP_DOOR_ANIME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__set_up_door_anime'] = function(block) {
  var code = '_SET_UP_DOOR_ANIME(';
  code += ')\n';
  return code;
};
commandMap['_SET_VISIBILITY'] = { type: 'bdsp__set_visibility', args: 0 };
Blockly.Blocks['bdsp__set_visibility'] = {
  init: function() {
    this.appendDummyInput().appendField('_SET_VISIBILITY');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__set_visibility'] = function(block) {
  var code = '_SET_VISIBILITY(';
  code += ')\n';
  return code;
};
commandMap['_SET_WARP_ID'] = { type: 'bdsp__set_warp_id', args: 0 };
Blockly.Blocks['bdsp__set_warp_id'] = {
  init: function() {
    this.appendDummyInput().appendField('_SET_WARP_ID');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__set_warp_id'] = function(block) {
  var code = '_SET_WARP_ID(';
  code += ')\n';
  return code;
};
commandMap['_SET_WEATHER'] = { type: 'bdsp__set_weather', args: 0 };
Blockly.Blocks['bdsp__set_weather'] = {
  init: function() {
    this.appendDummyInput().appendField('_SET_WEATHER');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__set_weather'] = function(block) {
  var code = '_SET_WEATHER(';
  code += ')\n';
  return code;
};
commandMap['_SE_PLAY'] = { type: 'bdsp__se_play', args: 3 };
Blockly.Blocks['bdsp__se_play'] = {
  init: function() {
    this.appendDummyInput().appendField('_SE_PLAY');
    this.appendValueInput('ARG_0').appendField('SoundEffect');
    this.appendValueInput('ARG_1').appendField('Unknown1');
    this.appendValueInput('ARG_2').appendField('Unknown2');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Plays a sound effect.");
  }
};
Blockly.JavaScript['bdsp__se_play'] = function(block) {
  var code = '_SE_PLAY(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_SE_STOP'] = { type: 'bdsp__se_stop', args: 1 };
Blockly.Blocks['bdsp__se_stop'] = {
  init: function() {
    this.appendDummyInput().appendField('_SE_STOP');
    this.appendValueInput('ARG_0').appendField('SoundEffect');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Stops a specific sound effect that is playing.");
  }
};
Blockly.JavaScript['bdsp__se_stop'] = function(block) {
  var code = '_SE_STOP(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_SE_WAIT'] = { type: 'bdsp__se_wait', args: 1 };
Blockly.Blocks['bdsp__se_wait'] = {
  init: function() {
    this.appendDummyInput().appendField('_SE_WAIT');
    this.appendValueInput('ARG_0').appendField('SoundEffect');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Waits for a playing sound effect to finish before continuing.");
  }
};
Blockly.JavaScript['bdsp__se_wait'] = function(block) {
  var code = '_SE_WAIT(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_SHINOU_ZUKAN_GET_NUM'] = { type: 'bdsp__shinou_zukan_get_num', args: 0 };
Blockly.Blocks['bdsp__shinou_zukan_get_num'] = {
  init: function() {
    this.appendDummyInput().appendField('_SHINOU_ZUKAN_GET_NUM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__shinou_zukan_get_num'] = function(block) {
  var code = '_SHINOU_ZUKAN_GET_NUM(';
  code += ')\n';
  return code;
};
commandMap['_SHINOU_ZUKAN_SEE_NUM'] = { type: 'bdsp__shinou_zukan_see_num', args: 0 };
Blockly.Blocks['bdsp__shinou_zukan_see_num'] = {
  init: function() {
    this.appendDummyInput().appendField('_SHINOU_ZUKAN_SEE_NUM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__shinou_zukan_see_num'] = function(block) {
  var code = '_SHINOU_ZUKAN_SEE_NUM(';
  code += ')\n';
  return code;
};
commandMap['_SHOP_CALL'] = { type: 'bdsp__shop_call', args: 0 };
Blockly.Blocks['bdsp__shop_call'] = {
  init: function() {
    this.appendDummyInput().appendField('_SHOP_CALL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__shop_call'] = function(block) {
  var code = '_SHOP_CALL(';
  code += ')\n';
  return code;
};
commandMap['_SHOP_OPEN_BATTLE'] = { type: 'bdsp__shop_open_battle', args: 0 };
Blockly.Blocks['bdsp__shop_open_battle'] = {
  init: function() {
    this.appendDummyInput().appendField('_SHOP_OPEN_BATTLE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__shop_open_battle'] = function(block) {
  var code = '_SHOP_OPEN_BATTLE(';
  code += ')\n';
  return code;
};
commandMap['_SHOP_OPEN_BOUTIQUE_BUY'] = { type: 'bdsp__shop_open_boutique_buy', args: 0 };
Blockly.Blocks['bdsp__shop_open_boutique_buy'] = {
  init: function() {
    this.appendDummyInput().appendField('_SHOP_OPEN_BOUTIQUE_BUY');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__shop_open_boutique_buy'] = function(block) {
  var code = '_SHOP_OPEN_BOUTIQUE_BUY(';
  code += ')\n';
  return code;
};
commandMap['_SHOP_OPEN_BOUTIQUE_CHANGE'] = { type: 'bdsp__shop_open_boutique_change', args: 0 };
Blockly.Blocks['bdsp__shop_open_boutique_change'] = {
  init: function() {
    this.appendDummyInput().appendField('_SHOP_OPEN_BOUTIQUE_CHANGE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__shop_open_boutique_change'] = function(block) {
  var code = '_SHOP_OPEN_BOUTIQUE_CHANGE(';
  code += ')\n';
  return code;
};
commandMap['_SHOP_OPEN_FIXED'] = { type: 'bdsp__shop_open_fixed', args: 0 };
Blockly.Blocks['bdsp__shop_open_fixed'] = {
  init: function() {
    this.appendDummyInput().appendField('_SHOP_OPEN_FIXED');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__shop_open_fixed'] = function(block) {
  var code = '_SHOP_OPEN_FIXED(';
  code += ')\n';
  return code;
};
commandMap['_SHOP_OPEN_FLOWER'] = { type: 'bdsp__shop_open_flower', args: 0 };
Blockly.Blocks['bdsp__shop_open_flower'] = {
  init: function() {
    this.appendDummyInput().appendField('_SHOP_OPEN_FLOWER');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__shop_open_flower'] = function(block) {
  var code = '_SHOP_OPEN_FLOWER(';
  code += ')\n';
  return code;
};
commandMap['_SHOP_OPEN_OTENKI'] = { type: 'bdsp__shop_open_otenki', args: 0 };
Blockly.Blocks['bdsp__shop_open_otenki'] = {
  init: function() {
    this.appendDummyInput().appendField('_SHOP_OPEN_OTENKI');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__shop_open_otenki'] = function(block) {
  var code = '_SHOP_OPEN_OTENKI(';
  code += ')\n';
  return code;
};
commandMap['_SHOP_OPEN_PALPARK'] = { type: 'bdsp__shop_open_palpark', args: 0 };
Blockly.Blocks['bdsp__shop_open_palpark'] = {
  init: function() {
    this.appendDummyInput().appendField('_SHOP_OPEN_PALPARK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__shop_open_palpark'] = function(block) {
  var code = '_SHOP_OPEN_PALPARK(';
  code += ')\n';
  return code;
};
commandMap['_SHOP_OPEN_SEAL'] = { type: 'bdsp__shop_open_seal', args: 0 };
Blockly.Blocks['bdsp__shop_open_seal'] = {
  init: function() {
    this.appendDummyInput().appendField('_SHOP_OPEN_SEAL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__shop_open_seal'] = function(block) {
  var code = '_SHOP_OPEN_SEAL(';
  code += ')\n';
  return code;
};
commandMap['_SHOP_OPEN_SELL'] = { type: 'bdsp__shop_open_sell', args: 0 };
Blockly.Blocks['bdsp__shop_open_sell'] = {
  init: function() {
    this.appendDummyInput().appendField('_SHOP_OPEN_SELL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__shop_open_sell'] = function(block) {
  var code = '_SHOP_OPEN_SELL(';
  code += ')\n';
  return code;
};
commandMap['_SLOT_MACHINE'] = { type: 'bdsp__slot_machine', args: 0 };
Blockly.Blocks['bdsp__slot_machine'] = {
  init: function() {
    this.appendDummyInput().appendField('_SLOT_MACHINE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__slot_machine'] = function(block) {
  var code = '_SLOT_MACHINE(';
  code += ')\n';
  return code;
};
commandMap['_SLOT_RENTYAN_CHK'] = { type: 'bdsp__slot_rentyan_chk', args: 0 };
Blockly.Blocks['bdsp__slot_rentyan_chk'] = {
  init: function() {
    this.appendDummyInput().appendField('_SLOT_RENTYAN_CHK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__slot_rentyan_chk'] = function(block) {
  var code = '_SLOT_RENTYAN_CHK(';
  code += ')\n';
  return code;
};
commandMap['_SND_CLIMAX_DATA_LOAD'] = { type: 'bdsp__snd_climax_data_load', args: 0 };
Blockly.Blocks['bdsp__snd_climax_data_load'] = {
  init: function() {
    this.appendDummyInput().appendField('_SND_CLIMAX_DATA_LOAD');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("(?) Loads extra sound data during the Spear Pillar cutscenes.");
  }
};
Blockly.JavaScript['bdsp__snd_climax_data_load'] = function(block) {
  var code = '_SND_CLIMAX_DATA_LOAD(';
  code += ')\n';
  return code;
};
commandMap['_SND_INITIAL_VOL_SET'] = { type: 'bdsp__snd_initial_vol_set', args: 2 };
Blockly.Blocks['bdsp__snd_initial_vol_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_SND_INITIAL_VOL_SET');
    this.appendValueInput('ARG_0').appendField('SoundEffect');
    this.appendValueInput('ARG_1').appendField('Volume');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("(?) Sets the volume of a sound effect. Only used once in the player's room during the intro.");
  }
};
Blockly.JavaScript['bdsp__snd_initial_vol_set'] = function(block) {
  var code = '_SND_INITIAL_VOL_SET(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_SODATEYA_POKELIST'] = { type: 'bdsp__sodateya_pokelist', args: 0 };
Blockly.Blocks['bdsp__sodateya_pokelist'] = {
  init: function() {
    this.appendDummyInput().appendField('_SODATEYA_POKELIST');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sodateya_pokelist'] = function(block) {
  var code = '_SODATEYA_POKELIST(';
  code += ')\n';
  return code;
};
commandMap['_SODATEYA_POKELIST_GET_RESULT'] = { type: 'bdsp__sodateya_pokelist_get_result', args: 0 };
Blockly.Blocks['bdsp__sodateya_pokelist_get_result'] = {
  init: function() {
    this.appendDummyInput().appendField('_SODATEYA_POKELIST_GET_RESULT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sodateya_pokelist_get_result'] = function(block) {
  var code = '_SODATEYA_POKELIST_GET_RESULT(';
  code += ')\n';
  return code;
};
commandMap['_SODATEYA_POKELIST_SET_PROC'] = { type: 'bdsp__sodateya_pokelist_set_proc', args: 0 };
Blockly.Blocks['bdsp__sodateya_pokelist_set_proc'] = {
  init: function() {
    this.appendDummyInput().appendField('_SODATEYA_POKELIST_SET_PROC');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sodateya_pokelist_set_proc'] = function(block) {
  var code = '_SODATEYA_POKELIST_SET_PROC(';
  code += ')\n';
  return code;
};
commandMap['_SODATEYA_TAMAGO_CHK'] = { type: 'bdsp__sodateya_tamago_chk', args: 0 };
Blockly.Blocks['bdsp__sodateya_tamago_chk'] = {
  init: function() {
    this.appendDummyInput().appendField('_SODATEYA_TAMAGO_CHK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sodateya_tamago_chk'] = function(block) {
  var code = '_SODATEYA_TAMAGO_CHK(';
  code += ')\n';
  return code;
};
commandMap['_SODATE_POKE_LEVEL_STR'] = { type: 'bdsp__sodate_poke_level_str', args: 0 };
Blockly.Blocks['bdsp__sodate_poke_level_str'] = {
  init: function() {
    this.appendDummyInput().appendField('_SODATE_POKE_LEVEL_STR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sodate_poke_level_str'] = function(block) {
  var code = '_SODATE_POKE_LEVEL_STR(';
  code += ')\n';
  return code;
};
commandMap['_SORAWOTOBU'] = { type: 'bdsp__sorawotobu', args: 0 };
Blockly.Blocks['bdsp__sorawotobu'] = {
  init: function() {
    this.appendDummyInput().appendField('_SORAWOTOBU');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sorawotobu'] = function(block) {
  var code = '_SORAWOTOBU(';
  code += ')\n';
  return code;
};
commandMap['_SORAWOTOBU_END'] = { type: 'bdsp__sorawotobu_end', args: 0 };
Blockly.Blocks['bdsp__sorawotobu_end'] = {
  init: function() {
    this.appendDummyInput().appendField('_SORAWOTOBU_END');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sorawotobu_end'] = function(block) {
  var code = '_SORAWOTOBU_END(';
  code += ')\n';
  return code;
};
commandMap['_SPEAKERS_NAME'] = { type: 'bdsp__speakers_name', args: 0 };
Blockly.Blocks['bdsp__speakers_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_SPEAKERS_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__speakers_name'] = function(block) {
  var code = '_SPEAKERS_NAME(';
  code += ')\n';
  return code;
};
commandMap['_SP_EVENT_DATA_END'] = { type: 'bdsp__sp_event_data_end', args: 0 };
Blockly.Blocks['bdsp__sp_event_data_end'] = {
  init: function() {
    this.appendDummyInput().appendField('_SP_EVENT_DATA_END');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Ends the map script.");
  }
};
Blockly.JavaScript['bdsp__sp_event_data_end'] = function(block) {
  var code = '_SP_EVENT_DATA_END(';
  code += ')\n';
  return code;
};
commandMap['_SP_LOCATION_SET'] = { type: 'bdsp__sp_location_set', args: 0 };
Blockly.Blocks['bdsp__sp_location_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_SP_LOCATION_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sp_location_set'] = function(block) {
  var code = '_SP_LOCATION_SET(';
  code += ')\n';
  return code;
};
commandMap['_SP_WILD_BTL_SET'] = { type: 'bdsp__sp_wild_btl_set', args: 0 };
Blockly.Blocks['bdsp__sp_wild_btl_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_SP_WILD_BTL_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sp_wild_btl_set'] = function(block) {
  var code = '_SP_WILD_BTL_SET(';
  code += ')\n';
  return code;
};
commandMap['_START_GENERATE'] = { type: 'bdsp__start_generate', args: 0 };
Blockly.Blocks['bdsp__start_generate'] = {
  init: function() {
    this.appendDummyInput().appendField('_START_GENERATE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__start_generate'] = function(block) {
  var code = '_START_GENERATE(';
  code += ')\n';
  return code;
};
commandMap['_START_PASO_OFF_ANM'] = { type: 'bdsp__start_paso_off_anm', args: 0 };
Blockly.Blocks['bdsp__start_paso_off_anm'] = {
  init: function() {
    this.appendDummyInput().appendField('_START_PASO_OFF_ANM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__start_paso_off_anm'] = function(block) {
  var code = '_START_PASO_OFF_ANM(';
  code += ')\n';
  return code;
};
commandMap['_START_PASO_ON_ANM'] = { type: 'bdsp__start_paso_on_anm', args: 0 };
Blockly.Blocks['bdsp__start_paso_on_anm'] = {
  init: function() {
    this.appendDummyInput().appendField('_START_PASO_ON_ANM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__start_paso_on_anm'] = function(block) {
  var code = '_START_PASO_ON_ANM(';
  code += ')\n';
  return code;
};
commandMap['_START_RAH_CYL'] = { type: 'bdsp__start_rah_cyl', args: 0 };
Blockly.Blocks['bdsp__start_rah_cyl'] = {
  init: function() {
    this.appendDummyInput().appendField('_START_RAH_CYL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__start_rah_cyl'] = function(block) {
  var code = '_START_RAH_CYL(';
  code += ')\n';
  return code;
};
commandMap['_STOP_EFFECT'] = { type: 'bdsp__stop_effect', args: 0 };
Blockly.Blocks['bdsp__stop_effect'] = {
  init: function() {
    this.appendDummyInput().appendField('_STOP_EFFECT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__stop_effect'] = function(block) {
  var code = '_STOP_EFFECT(';
  code += ')\n';
  return code;
};
commandMap['_SUB_COIN'] = { type: 'bdsp__sub_coin', args: 0 };
Blockly.Blocks['bdsp__sub_coin'] = {
  init: function() {
    this.appendDummyInput().appendField('_SUB_COIN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__sub_coin'] = function(block) {
  var code = '_SUB_COIN(';
  code += ')\n';
  return code;
};
commandMap['_SUB_GOLD'] = { type: 'bdsp__sub_gold', args: 1 };
Blockly.Blocks['bdsp__sub_gold'] = {
  init: function() {
    this.appendDummyInput().appendField('_SUB_GOLD');
    this.appendValueInput('ARG_0').appendField('Amount');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Takes money from the player.");
  }
};
Blockly.JavaScript['bdsp__sub_gold'] = function(block) {
  var code = '_SUB_GOLD(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_SUB_GOODS'] = { type: 'bdsp__sub_goods', args: 0 };
Blockly.Blocks['bdsp__sub_goods'] = {
  init: function() {
    this.appendDummyInput().appendField('_SUB_GOODS');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__sub_goods'] = function(block) {
  var code = '_SUB_GOODS(';
  code += ')\n';
  return code;
};
commandMap['_SUB_ITEM'] = { type: 'bdsp__sub_item', args: 3 };
Blockly.Blocks['bdsp__sub_item'] = {
  init: function() {
    this.appendDummyInput().appendField('_SUB_ITEM');
    this.appendValueInput('ARG_0').appendField('Item');
    this.appendValueInput('ARG_1').appendField('Amount');
    this.appendValueInput('ARG_2').appendField('Unknown');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Takes an amount of an item from the player.");
  }
};
Blockly.JavaScript['bdsp__sub_item'] = function(block) {
  var code = '_SUB_ITEM(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_SUB_MY_GOLD'] = { type: 'bdsp__sub_my_gold', args: 0 };
Blockly.Blocks['bdsp__sub_my_gold'] = {
  init: function() {
    this.appendDummyInput().appendField('_SUB_MY_GOLD');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sub_my_gold'] = function(block) {
  var code = '_SUB_MY_GOLD(';
  code += ')\n';
  return code;
};
commandMap['_SUB_NATSUKI'] = { type: 'bdsp__sub_natsuki', args: 0 };
Blockly.Blocks['bdsp__sub_natsuki'] = {
  init: function() {
    this.appendDummyInput().appendField('_SUB_NATSUKI');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sub_natsuki'] = function(block) {
  var code = '_SUB_NATSUKI(';
  code += ')\n';
  return code;
};
commandMap['_SUB_TAMA'] = { type: 'bdsp__sub_tama', args: 0 };
Blockly.Blocks['bdsp__sub_tama'] = {
  init: function() {
    this.appendDummyInput().appendField('_SUB_TAMA');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__sub_tama'] = function(block) {
  var code = '_SUB_TAMA(';
  code += ')\n';
  return code;
};
commandMap['_SUB_TRAP'] = { type: 'bdsp__sub_trap', args: 0 };
Blockly.Blocks['bdsp__sub_trap'] = {
  init: function() {
    this.appendDummyInput().appendField('_SUB_TRAP');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__sub_trap'] = function(block) {
  var code = '_SUB_TRAP(';
  code += ')\n';
  return code;
};
commandMap['_SUB_TREASURE'] = { type: 'bdsp__sub_treasure', args: 0 };
Blockly.Blocks['bdsp__sub_treasure'] = {
  init: function() {
    this.appendDummyInput().appendField('_SUB_TREASURE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__sub_treasure'] = function(block) {
  var code = '_SUB_TREASURE(';
  code += ')\n';
  return code;
};
commandMap['_SUB_WK'] = { type: 'bdsp__sub_wk', args: 2 };
Blockly.Blocks['bdsp__sub_wk'] = {
  init: function() {
    this.appendDummyInput().appendField('_SUB_WK');
    this.appendValueInput('ARG_0').appendField('Variable');
    this.appendValueInput('ARG_1').appendField('Value');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Subtract to the value of a variable.");
  }
};
Blockly.JavaScript['bdsp__sub_wk'] = function(block) {
  var code = '_SUB_WK(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_SUB_WK_COIN'] = { type: 'bdsp__sub_wk_coin', args: 0 };
Blockly.Blocks['bdsp__sub_wk_coin'] = {
  init: function() {
    this.appendDummyInput().appendField('_SUB_WK_COIN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sub_wk_coin'] = function(block) {
  var code = '_SUB_WK_COIN(';
  code += ')\n';
  return code;
};
commandMap['_SUPPORT_NAME'] = { type: 'bdsp__support_name', args: 0 };
Blockly.Blocks['bdsp__support_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_SUPPORT_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__support_name'] = function(block) {
  var code = '_SUPPORT_NAME(';
  code += ')\n';
  return code;
};
commandMap['_SUPPORT_POKEMON_NAME'] = { type: 'bdsp__support_pokemon_name', args: 0 };
Blockly.Blocks['bdsp__support_pokemon_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_SUPPORT_POKEMON_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__support_pokemon_name'] = function(block) {
  var code = '_SUPPORT_POKEMON_NAME(';
  code += ')\n';
  return code;
};
commandMap['_SWITCH'] = { type: 'bdsp__switch', args: 1 };
Blockly.Blocks['bdsp__switch'] = {
  init: function() {
    this.appendDummyInput().appendField('_SWITCH');
    this.appendValueInput('ARG_0').appendField('Variable');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Begins a switch statement based on the value of a variable.");
  }
};
Blockly.JavaScript['bdsp__switch'] = function(block) {
  var code = '_SWITCH(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_SXY_BG_POS_CHANGE'] = { type: 'bdsp__sxy_bg_pos_change', args: 0 };
Blockly.Blocks['bdsp__sxy_bg_pos_change'] = {
  init: function() {
    this.appendDummyInput().appendField('_SXY_BG_POS_CHANGE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sxy_bg_pos_change'] = function(block) {
  var code = '_SXY_BG_POS_CHANGE(';
  code += ')\n';
  return code;
};
commandMap['_SXY_DIR_CHANGE'] = { type: 'bdsp__sxy_dir_change', args: 0 };
Blockly.Blocks['bdsp__sxy_dir_change'] = {
  init: function() {
    this.appendDummyInput().appendField('_SXY_DIR_CHANGE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sxy_dir_change'] = function(block) {
  var code = '_SXY_DIR_CHANGE(';
  code += ')\n';
  return code;
};
commandMap['_SXY_EXIT_POS_CHANGE'] = { type: 'bdsp__sxy_exit_pos_change', args: 0 };
Blockly.Blocks['bdsp__sxy_exit_pos_change'] = {
  init: function() {
    this.appendDummyInput().appendField('_SXY_EXIT_POS_CHANGE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sxy_exit_pos_change'] = function(block) {
  var code = '_SXY_EXIT_POS_CHANGE(';
  code += ')\n';
  return code;
};
commandMap['_SXY_MV_CHANGE'] = { type: 'bdsp__sxy_mv_change', args: 0 };
Blockly.Blocks['bdsp__sxy_mv_change'] = {
  init: function() {
    this.appendDummyInput().appendField('_SXY_MV_CHANGE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sxy_mv_change'] = function(block) {
  var code = '_SXY_MV_CHANGE(';
  code += ')\n';
  return code;
};
commandMap['_SXY_POS_CHANGE'] = { type: 'bdsp__sxy_pos_change', args: 0 };
Blockly.Blocks['bdsp__sxy_pos_change'] = {
  init: function() {
    this.appendDummyInput().appendField('_SXY_POS_CHANGE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sxy_pos_change'] = function(block) {
  var code = '_SXY_POS_CHANGE(';
  code += ')\n';
  return code;
};
commandMap['_SYS_FLAG_BADGE_COUNT'] = { type: 'bdsp__sys_flag_badge_count', args: 0 };
Blockly.Blocks['bdsp__sys_flag_badge_count'] = {
  init: function() {
    this.appendDummyInput().appendField('_SYS_FLAG_BADGE_COUNT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sys_flag_badge_count'] = function(block) {
  var code = '_SYS_FLAG_BADGE_COUNT(';
  code += ')\n';
  return code;
};
commandMap['_SYS_FLAG_BADGE_GET'] = { type: 'bdsp__sys_flag_badge_get', args: 0 };
Blockly.Blocks['bdsp__sys_flag_badge_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_SYS_FLAG_BADGE_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sys_flag_badge_get'] = function(block) {
  var code = '_SYS_FLAG_BADGE_GET(';
  code += ')\n';
  return code;
};
commandMap['_SYS_FLAG_BADGE_SET'] = { type: 'bdsp__sys_flag_badge_set', args: 0 };
Blockly.Blocks['bdsp__sys_flag_badge_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_SYS_FLAG_BADGE_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sys_flag_badge_set'] = function(block) {
  var code = '_SYS_FLAG_BADGE_SET(';
  code += ')\n';
  return code;
};
commandMap['_SYS_FLAG_BAG_GET'] = { type: 'bdsp__sys_flag_bag_get', args: 0 };
Blockly.Blocks['bdsp__sys_flag_bag_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_SYS_FLAG_BAG_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sys_flag_bag_get'] = function(block) {
  var code = '_SYS_FLAG_BAG_GET(';
  code += ')\n';
  return code;
};
commandMap['_SYS_FLAG_BAG_SET'] = { type: 'bdsp__sys_flag_bag_set', args: 0 };
Blockly.Blocks['bdsp__sys_flag_bag_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_SYS_FLAG_BAG_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sys_flag_bag_set'] = function(block) {
  var code = '_SYS_FLAG_BAG_SET(';
  code += ')\n';
  return code;
};
commandMap['_SYS_FLAG_FLASH_GET'] = { type: 'bdsp__sys_flag_flash_get', args: 0 };
Blockly.Blocks['bdsp__sys_flag_flash_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_SYS_FLAG_FLASH_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sys_flag_flash_get'] = function(block) {
  var code = '_SYS_FLAG_FLASH_GET(';
  code += ')\n';
  return code;
};
commandMap['_SYS_FLAG_FLASH_RESET'] = { type: 'bdsp__sys_flag_flash_reset', args: 0 };
Blockly.Blocks['bdsp__sys_flag_flash_reset'] = {
  init: function() {
    this.appendDummyInput().appendField('_SYS_FLAG_FLASH_RESET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sys_flag_flash_reset'] = function(block) {
  var code = '_SYS_FLAG_FLASH_RESET(';
  code += ')\n';
  return code;
};
commandMap['_SYS_FLAG_FLASH_SET'] = { type: 'bdsp__sys_flag_flash_set', args: 0 };
Blockly.Blocks['bdsp__sys_flag_flash_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_SYS_FLAG_FLASH_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sys_flag_flash_set'] = function(block) {
  var code = '_SYS_FLAG_FLASH_SET(';
  code += ')\n';
  return code;
};
commandMap['_SYS_FLAG_GAME_CLEAR_GET'] = { type: 'bdsp__sys_flag_game_clear_get', args: 0 };
Blockly.Blocks['bdsp__sys_flag_game_clear_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_SYS_FLAG_GAME_CLEAR_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sys_flag_game_clear_get'] = function(block) {
  var code = '_SYS_FLAG_GAME_CLEAR_GET(';
  code += ')\n';
  return code;
};
commandMap['_SYS_FLAG_GAME_CLEAR_SET'] = { type: 'bdsp__sys_flag_game_clear_set', args: 0 };
Blockly.Blocks['bdsp__sys_flag_game_clear_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_SYS_FLAG_GAME_CLEAR_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sys_flag_game_clear_set'] = function(block) {
  var code = '_SYS_FLAG_GAME_CLEAR_SET(';
  code += ')\n';
  return code;
};
commandMap['_SYS_FLAG_KAIRIKI_GET'] = { type: 'bdsp__sys_flag_kairiki_get', args: 0 };
Blockly.Blocks['bdsp__sys_flag_kairiki_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_SYS_FLAG_KAIRIKI_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sys_flag_kairiki_get'] = function(block) {
  var code = '_SYS_FLAG_KAIRIKI_GET(';
  code += ')\n';
  return code;
};
commandMap['_SYS_FLAG_KAIRIKI_RESET'] = { type: 'bdsp__sys_flag_kairiki_reset', args: 0 };
Blockly.Blocks['bdsp__sys_flag_kairiki_reset'] = {
  init: function() {
    this.appendDummyInput().appendField('_SYS_FLAG_KAIRIKI_RESET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sys_flag_kairiki_reset'] = function(block) {
  var code = '_SYS_FLAG_KAIRIKI_RESET(';
  code += ')\n';
  return code;
};
commandMap['_SYS_FLAG_KAIRIKI_SET'] = { type: 'bdsp__sys_flag_kairiki_set', args: 0 };
Blockly.Blocks['bdsp__sys_flag_kairiki_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_SYS_FLAG_KAIRIKI_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sys_flag_kairiki_set'] = function(block) {
  var code = '_SYS_FLAG_KAIRIKI_SET(';
  code += ')\n';
  return code;
};
commandMap['_SYS_FLAG_KIRIBARAI_GET'] = { type: 'bdsp__sys_flag_kiribarai_get', args: 0 };
Blockly.Blocks['bdsp__sys_flag_kiribarai_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_SYS_FLAG_KIRIBARAI_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sys_flag_kiribarai_get'] = function(block) {
  var code = '_SYS_FLAG_KIRIBARAI_GET(';
  code += ')\n';
  return code;
};
commandMap['_SYS_FLAG_KIRIBARAI_RESET'] = { type: 'bdsp__sys_flag_kiribarai_reset', args: 0 };
Blockly.Blocks['bdsp__sys_flag_kiribarai_reset'] = {
  init: function() {
    this.appendDummyInput().appendField('_SYS_FLAG_KIRIBARAI_RESET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sys_flag_kiribarai_reset'] = function(block) {
  var code = '_SYS_FLAG_KIRIBARAI_RESET(';
  code += ')\n';
  return code;
};
commandMap['_SYS_FLAG_KIRIBARAI_SET'] = { type: 'bdsp__sys_flag_kiribarai_set', args: 0 };
Blockly.Blocks['bdsp__sys_flag_kiribarai_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_SYS_FLAG_KIRIBARAI_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sys_flag_kiribarai_set'] = function(block) {
  var code = '_SYS_FLAG_KIRIBARAI_SET(';
  code += ')\n';
  return code;
};
commandMap['_SYS_FLAG_ONE_STEP_GET'] = { type: 'bdsp__sys_flag_one_step_get', args: 0 };
Blockly.Blocks['bdsp__sys_flag_one_step_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_SYS_FLAG_ONE_STEP_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sys_flag_one_step_get'] = function(block) {
  var code = '_SYS_FLAG_ONE_STEP_GET(';
  code += ')\n';
  return code;
};
commandMap['_SYS_FLAG_ONE_STEP_RESET'] = { type: 'bdsp__sys_flag_one_step_reset', args: 0 };
Blockly.Blocks['bdsp__sys_flag_one_step_reset'] = {
  init: function() {
    this.appendDummyInput().appendField('_SYS_FLAG_ONE_STEP_RESET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sys_flag_one_step_reset'] = function(block) {
  var code = '_SYS_FLAG_ONE_STEP_RESET(';
  code += ')\n';
  return code;
};
commandMap['_SYS_FLAG_ONE_STEP_SET'] = { type: 'bdsp__sys_flag_one_step_set', args: 0 };
Blockly.Blocks['bdsp__sys_flag_one_step_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_SYS_FLAG_ONE_STEP_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sys_flag_one_step_set'] = function(block) {
  var code = '_SYS_FLAG_ONE_STEP_SET(';
  code += ')\n';
  return code;
};
commandMap['_SYS_FLAG_PAIR_GET'] = { type: 'bdsp__sys_flag_pair_get', args: 0 };
Blockly.Blocks['bdsp__sys_flag_pair_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_SYS_FLAG_PAIR_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sys_flag_pair_get'] = function(block) {
  var code = '_SYS_FLAG_PAIR_GET(';
  code += ')\n';
  return code;
};
commandMap['_SYS_FLAG_PAIR_RESET'] = { type: 'bdsp__sys_flag_pair_reset', args: 0 };
Blockly.Blocks['bdsp__sys_flag_pair_reset'] = {
  init: function() {
    this.appendDummyInput().appendField('_SYS_FLAG_PAIR_RESET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sys_flag_pair_reset'] = function(block) {
  var code = '_SYS_FLAG_PAIR_RESET(';
  code += ')\n';
  return code;
};
commandMap['_SYS_FLAG_PAIR_SET'] = { type: 'bdsp__sys_flag_pair_set', args: 0 };
Blockly.Blocks['bdsp__sys_flag_pair_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_SYS_FLAG_PAIR_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sys_flag_pair_set'] = function(block) {
  var code = '_SYS_FLAG_PAIR_SET(';
  code += ')\n';
  return code;
};
commandMap['_SYS_FLAG_SHOES_GET'] = { type: 'bdsp__sys_flag_shoes_get', args: 0 };
Blockly.Blocks['bdsp__sys_flag_shoes_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_SYS_FLAG_SHOES_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sys_flag_shoes_get'] = function(block) {
  var code = '_SYS_FLAG_SHOES_GET(';
  code += ')\n';
  return code;
};
commandMap['_SYS_FLAG_SHOES_SET'] = { type: 'bdsp__sys_flag_shoes_set', args: 0 };
Blockly.Blocks['bdsp__sys_flag_shoes_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_SYS_FLAG_SHOES_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sys_flag_shoes_set'] = function(block) {
  var code = '_SYS_FLAG_SHOES_SET(';
  code += ')\n';
  return code;
};
commandMap['_SYS_FLAG_ZUKAN_GET'] = { type: 'bdsp__sys_flag_zukan_get', args: 0 };
Blockly.Blocks['bdsp__sys_flag_zukan_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_SYS_FLAG_ZUKAN_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sys_flag_zukan_get'] = function(block) {
  var code = '_SYS_FLAG_ZUKAN_GET(';
  code += ')\n';
  return code;
};
commandMap['_SYS_FLAG_ZUKAN_SET'] = { type: 'bdsp__sys_flag_zukan_set', args: 0 };
Blockly.Blocks['bdsp__sys_flag_zukan_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_SYS_FLAG_ZUKAN_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__sys_flag_zukan_set'] = function(block) {
  var code = '_SYS_FLAG_ZUKAN_SET(';
  code += ')\n';
  return code;
};
commandMap['_TAKE_SEED'] = { type: 'bdsp__take_seed', args: 0 };
Blockly.Blocks['bdsp__take_seed'] = {
  init: function() {
    this.appendDummyInput().appendField('_TAKE_SEED');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__take_seed'] = function(block) {
  var code = '_TAKE_SEED(';
  code += ')\n';
  return code;
};
commandMap['_TAKIKUDARI'] = { type: 'bdsp__takikudari', args: 0 };
Blockly.Blocks['bdsp__takikudari'] = {
  init: function() {
    this.appendDummyInput().appendField('_TAKIKUDARI');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__takikudari'] = function(block) {
  var code = '_TAKIKUDARI(';
  code += ')\n';
  return code;
};
commandMap['_TAKINOBORI'] = { type: 'bdsp__takinobori', args: 0 };
Blockly.Blocks['bdsp__takinobori'] = {
  init: function() {
    this.appendDummyInput().appendField('_TAKINOBORI');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__takinobori'] = function(block) {
  var code = '_TAKINOBORI(';
  code += ')\n';
  return code;
};
commandMap['_TALKMSG'] = { type: 'bdsp__talkmsg', args: 1 };
Blockly.Blocks['bdsp__talkmsg'] = {
  init: function() {
    this.appendDummyInput().appendField('_TALKMSG');
    this.appendValueInput('ARG_0').appendField('Message');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Shows a textbox with the given message.");
  }
};
Blockly.JavaScript['bdsp__talkmsg'] = function(block) {
  var code = '_TALKMSG(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_TALKMSG_ALLPUT'] = { type: 'bdsp__talkmsg_allput', args: 1 };
Blockly.Blocks['bdsp__talkmsg_allput'] = {
  init: function() {
    this.appendDummyInput().appendField('_TALKMSG_ALLPUT');
    this.appendValueInput('ARG_0').appendField('Message');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Only used in unused Pal Park scripts.");
  }
};
Blockly.JavaScript['bdsp__talkmsg_allput'] = function(block) {
  var code = '_TALKMSG_ALLPUT(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_TALKMSG_ALLPUT_ARC'] = { type: 'bdsp__talkmsg_allput_arc', args: 0 };
Blockly.Blocks['bdsp__talkmsg_allput_arc'] = {
  init: function() {
    this.appendDummyInput().appendField('_TALKMSG_ALLPUT_ARC');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__talkmsg_allput_arc'] = function(block) {
  var code = '_TALKMSG_ALLPUT_ARC(';
  code += ')\n';
  return code;
};
commandMap['_TALKMSG_ALLPUT_PMS'] = { type: 'bdsp__talkmsg_allput_pms', args: 0 };
Blockly.Blocks['bdsp__talkmsg_allput_pms'] = {
  init: function() {
    this.appendDummyInput().appendField('_TALKMSG_ALLPUT_PMS');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__talkmsg_allput_pms'] = function(block) {
  var code = '_TALKMSG_ALLPUT_PMS(';
  code += ')\n';
  return code;
};
commandMap['_TALKMSG_ARC'] = { type: 'bdsp__talkmsg_arc', args: 2 };
Blockly.Blocks['bdsp__talkmsg_arc'] = {
  init: function() {
    this.appendDummyInput().appendField('_TALKMSG_ARC');
    this.appendValueInput('ARG_0').appendField('Unknown1');
    this.appendValueInput('ARG_1').appendField('Unknown2');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unknown use.");
  }
};
Blockly.JavaScript['bdsp__talkmsg_arc'] = function(block) {
  var code = '_TALKMSG_ARC(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_TALKMSG_AUTOGET'] = { type: 'bdsp__talkmsg_autoget', args: 0 };
Blockly.Blocks['bdsp__talkmsg_autoget'] = {
  init: function() {
    this.appendDummyInput().appendField('_TALKMSG_AUTOGET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Only used in one common script, unused otherwise.");
  }
};
Blockly.JavaScript['bdsp__talkmsg_autoget'] = function(block) {
  var code = '_TALKMSG_AUTOGET(';
  code += ')\n';
  return code;
};
commandMap['_TALKMSG_BTOWER_APPEAR'] = { type: 'bdsp__talkmsg_btower_appear', args: 1 };
Blockly.Blocks['bdsp__talkmsg_btower_appear'] = {
  init: function() {
    this.appendDummyInput().appendField('_TALKMSG_BTOWER_APPEAR');
    this.appendValueInput('ARG_0').appendField('Unknown');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("(?) Textboxes related to Battle Tower.");
  }
};
Blockly.JavaScript['bdsp__talkmsg_btower_appear'] = function(block) {
  var code = '_TALKMSG_BTOWER_APPEAR(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_TALKMSG_CON_SIO'] = { type: 'bdsp__talkmsg_con_sio', args: 0 };
Blockly.Blocks['bdsp__talkmsg_con_sio'] = {
  init: function() {
    this.appendDummyInput().appendField('_TALKMSG_CON_SIO');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__talkmsg_con_sio'] = function(block) {
  var code = '_TALKMSG_CON_SIO(';
  code += ')\n';
  return code;
};
commandMap['_TALKMSG_NG_POKE_NAME'] = { type: 'bdsp__talkmsg_ng_poke_name', args: 4 };
Blockly.Blocks['bdsp__talkmsg_ng_poke_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_TALKMSG_NG_POKE_NAME');
    this.appendValueInput('ARG_0').appendField('Message');
    this.appendValueInput('ARG_1').appendField('Unknown1');
    this.appendValueInput('ARG_2').appendField('Unknown2');
    this.appendValueInput('ARG_3').appendField('Unknown3');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Presumably is supposed to show a textbox with all Battle Tower illegal Pok\u00c3\u00a9mon.");
  }
};
Blockly.JavaScript['bdsp__talkmsg_ng_poke_name'] = function(block) {
  var code = '_TALKMSG_NG_POKE_NAME(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_3', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_TALKMSG_NOSKIP'] = { type: 'bdsp__talkmsg_noskip', args: 0 };
Blockly.Blocks['bdsp__talkmsg_noskip'] = {
  init: function() {
    this.appendDummyInput().appendField('_TALKMSG_NOSKIP');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__talkmsg_noskip'] = function(block) {
  var code = '_TALKMSG_NOSKIP(';
  code += ')\n';
  return code;
};
commandMap['_TALKMSG_PMS'] = { type: 'bdsp__talkmsg_pms', args: 0 };
Blockly.Blocks['bdsp__talkmsg_pms'] = {
  init: function() {
    this.appendDummyInput().appendField('_TALKMSG_PMS');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__talkmsg_pms'] = function(block) {
  var code = '_TALKMSG_PMS(';
  code += ')\n';
  return code;
};
commandMap['_TALKMSG_SP'] = { type: 'bdsp__talkmsg_sp', args: 1 };
Blockly.Blocks['bdsp__talkmsg_sp'] = {
  init: function() {
    this.appendDummyInput().appendField('_TALKMSG_SP');
    this.appendValueInput('ARG_0').appendField('Unknown');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("(?) Only used in union room. Presumably shows a textbox.");
  }
};
Blockly.JavaScript['bdsp__talkmsg_sp'] = function(block) {
  var code = '_TALKMSG_SP(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_TALKMSG_SP_AUTO'] = { type: 'bdsp__talkmsg_sp_auto', args: 1 };
Blockly.Blocks['bdsp__talkmsg_sp_auto'] = {
  init: function() {
    this.appendDummyInput().appendField('_TALKMSG_SP_AUTO');
    this.appendValueInput('ARG_0').appendField('Unknown');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Only used in union room.");
  }
};
Blockly.JavaScript['bdsp__talkmsg_sp_auto'] = function(block) {
  var code = '_TALKMSG_SP_AUTO(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_TALK_CLOSE'] = { type: 'bdsp__talk_close', args: 0 };
Blockly.Blocks['bdsp__talk_close'] = {
  init: function() {
    this.appendDummyInput().appendField('_TALK_CLOSE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Closes the currently open textbox.");
  }
};
Blockly.JavaScript['bdsp__talk_close'] = function(block) {
  var code = '_TALK_CLOSE(';
  code += ')\n';
  return code;
};
commandMap['_TALK_CLOSE_NO_CLEAR'] = { type: 'bdsp__talk_close_no_clear', args: 0 };
Blockly.Blocks['bdsp__talk_close_no_clear'] = {
  init: function() {
    this.appendDummyInput().appendField('_TALK_CLOSE_NO_CLEAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Closes the currently open textbox. Used before shop commands. Functionally the same as _TALK_CLOSE.");
  }
};
Blockly.JavaScript['bdsp__talk_close_no_clear'] = function(block) {
  var code = '_TALK_CLOSE_NO_CLEAR(';
  code += ')\n';
  return code;
};
commandMap['_TALK_COLISEUM_NPC'] = { type: 'bdsp__talk_coliseum_npc', args: 0 };
Blockly.Blocks['bdsp__talk_coliseum_npc'] = {
  init: function() {
    this.appendDummyInput().appendField('_TALK_COLISEUM_NPC');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__talk_coliseum_npc'] = function(block) {
  var code = '_TALK_COLISEUM_NPC(';
  code += ')\n';
  return code;
};
commandMap['_TALK_END'] = { type: 'bdsp__talk_end', args: 0 };
Blockly.Blocks['bdsp__talk_end'] = {
  init: function() {
    this.appendDummyInput().appendField('_TALK_END');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Ends the current talking event.");
  }
};
Blockly.JavaScript['bdsp__talk_end'] = function(block) {
  var code = '_TALK_END(';
  code += ')\n';
  return code;
};
commandMap['_TALK_KEYWAIT'] = { type: 'bdsp__talk_keywait', args: 1 };
Blockly.Blocks['bdsp__talk_keywait'] = {
  init: function() {
    this.appendDummyInput().appendField('_TALK_KEYWAIT');
    this.appendValueInput('ARG_0').appendField('Message');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Shows a textbox with the given message. Functionally the same as _TALKMSG.");
  }
};
Blockly.JavaScript['bdsp__talk_keywait'] = function(block) {
  var code = '_TALK_KEYWAIT(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_TALK_OBJ_END'] = { type: 'bdsp__talk_obj_end', args: 0 };
Blockly.Blocks['bdsp__talk_obj_end'] = {
  init: function() {
    this.appendDummyInput().appendField('_TALK_OBJ_END');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Ends an object event. Combination of _TALK_CLOSE and _TALK_END.");
  }
};
Blockly.JavaScript['bdsp__talk_obj_end'] = function(block) {
  var code = '_TALK_OBJ_END(';
  code += ')\n';
  return code;
};
commandMap['_TALK_OBJ_PAUSE_ALL'] = { type: 'bdsp__talk_obj_pause_all', args: 0 };
Blockly.Blocks['bdsp__talk_obj_pause_all'] = {
  init: function() {
    this.appendDummyInput().appendField('_TALK_OBJ_PAUSE_ALL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__talk_obj_pause_all'] = function(block) {
  var code = '_TALK_OBJ_PAUSE_ALL(';
  code += ')\n';
  return code;
};
commandMap['_TALK_OBJ_START'] = { type: 'bdsp__talk_obj_start', args: 0 };
Blockly.Blocks['bdsp__talk_obj_start'] = {
  init: function() {
    this.appendDummyInput().appendField('_TALK_OBJ_START');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Starts an object event with the actor turning to face the player. Combination of _TALK_START, _TALK_OPEN, and _TURN_HERO_SITE.");
  }
};
Blockly.JavaScript['bdsp__talk_obj_start'] = function(block) {
  var code = '_TALK_OBJ_START(';
  code += ')\n';
  return code;
};
commandMap['_TALK_OBJ_START_LOOK_NONE'] = { type: 'bdsp__talk_obj_start_look_none', args: 0 };
Blockly.Blocks['bdsp__talk_obj_start_look_none'] = {
  init: function() {
    this.appendDummyInput().appendField('_TALK_OBJ_START_LOOK_NONE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Starts an object event without the actor turning to face the player. Combination of _TALK_START and _TALK_OPEN.");
  }
};
Blockly.JavaScript['bdsp__talk_obj_start_look_none'] = function(block) {
  var code = '_TALK_OBJ_START_LOOK_NONE(';
  code += ')\n';
  return code;
};
commandMap['_TALK_OBJ_START_TURN_NOT'] = { type: 'bdsp__talk_obj_start_turn_not', args: 0 };
Blockly.Blocks['bdsp__talk_obj_start_turn_not'] = {
  init: function() {
    this.appendDummyInput().appendField('_TALK_OBJ_START_TURN_NOT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Starts an object event with the actor only turning their head to face the player. Combination of _TALK_START, _TALK_OPEN, and some third command.");
  }
};
Blockly.JavaScript['bdsp__talk_obj_start_turn_not'] = function(block) {
  var code = '_TALK_OBJ_START_TURN_NOT(';
  code += ')\n';
  return code;
};
commandMap['_TALK_OPEN'] = { type: 'bdsp__talk_open', args: 0 };
Blockly.Blocks['bdsp__talk_open'] = {
  init: function() {
    this.appendDummyInput().appendField('_TALK_OPEN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Opens an empty textbox.");
  }
};
Blockly.JavaScript['bdsp__talk_open'] = function(block) {
  var code = '_TALK_OPEN(';
  code += ')\n';
  return code;
};
commandMap['_TALK_POKE_GET_TEMOTI_INDEX'] = { type: 'bdsp__talk_poke_get_temoti_index', args: 0 };
Blockly.Blocks['bdsp__talk_poke_get_temoti_index'] = {
  init: function() {
    this.appendDummyInput().appendField('_TALK_POKE_GET_TEMOTI_INDEX');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__talk_poke_get_temoti_index'] = function(block) {
  var code = '_TALK_POKE_GET_TEMOTI_INDEX(';
  code += ')\n';
  return code;
};
commandMap['_TALK_START'] = { type: 'bdsp__talk_start', args: 0 };
Blockly.Blocks['bdsp__talk_start'] = {
  init: function() {
    this.appendDummyInput().appendField('_TALK_START');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Starts a talking event.");
  }
};
Blockly.JavaScript['bdsp__talk_start'] = function(block) {
  var code = '_TALK_START(';
  code += ')\n';
  return code;
};
commandMap['_TALK_UG_NPC'] = { type: 'bdsp__talk_ug_npc', args: 0 };
Blockly.Blocks['bdsp__talk_ug_npc'] = {
  init: function() {
    this.appendDummyInput().appendField('_TALK_UG_NPC');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__talk_ug_npc'] = function(block) {
  var code = '_TALK_UG_NPC(';
  code += ')\n';
  return code;
};
commandMap['_TALK_UNION_NPC'] = { type: 'bdsp__talk_union_npc', args: 0 };
Blockly.Blocks['bdsp__talk_union_npc'] = {
  init: function() {
    this.appendDummyInput().appendField('_TALK_UNION_NPC');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__talk_union_npc'] = function(block) {
  var code = '_TALK_UNION_NPC(';
  code += ')\n';
  return code;
};
commandMap['_TAMAGO_DEMO'] = { type: 'bdsp__tamago_demo', args: 0 };
Blockly.Blocks['bdsp__tamago_demo'] = {
  init: function() {
    this.appendDummyInput().appendField('_TAMAGO_DEMO');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__tamago_demo'] = function(block) {
  var code = '_TAMAGO_DEMO(';
  code += ')\n';
  return code;
};
commandMap['_TAMA_CHK'] = { type: 'bdsp__tama_chk', args: 0 };
Blockly.Blocks['bdsp__tama_chk'] = {
  init: function() {
    this.appendDummyInput().appendField('_TAMA_CHK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__tama_chk'] = function(block) {
  var code = '_TAMA_CHK(';
  code += ')\n';
  return code;
};
commandMap['_TAMA_NAME'] = { type: 'bdsp__tama_name', args: 0 };
Blockly.Blocks['bdsp__tama_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_TAMA_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__tama_name'] = function(block) {
  var code = '_TAMA_NAME(';
  code += ')\n';
  return code;
};
commandMap['_TELEPORT'] = { type: 'bdsp__teleport', args: 0 };
Blockly.Blocks['bdsp__teleport'] = {
  init: function() {
    this.appendDummyInput().appendField('_TELEPORT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__teleport'] = function(block) {
  var code = '_TELEPORT(';
  code += ')\n';
  return code;
};
commandMap['_TEMOTI_BALL_LOAD'] = { type: 'bdsp__temoti_ball_load', args: 0 };
Blockly.Blocks['bdsp__temoti_ball_load'] = {
  init: function() {
    this.appendDummyInput().appendField('_TEMOTI_BALL_LOAD');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__temoti_ball_load'] = function(block) {
  var code = '_TEMOTI_BALL_LOAD(';
  code += ')\n';
  return code;
};
commandMap['_TEMOTI_BALL_LOAD_WAIT'] = { type: 'bdsp__temoti_ball_load_wait', args: 0 };
Blockly.Blocks['bdsp__temoti_ball_load_wait'] = {
  init: function() {
    this.appendDummyInput().appendField('_TEMOTI_BALL_LOAD_WAIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__temoti_ball_load_wait'] = function(block) {
  var code = '_TEMOTI_BALL_LOAD_WAIT(';
  code += ')\n';
  return code;
};
commandMap['_TEMOTI_BOX_MONSNO'] = { type: 'bdsp__temoti_box_monsno', args: 0 };
Blockly.Blocks['bdsp__temoti_box_monsno'] = {
  init: function() {
    this.appendDummyInput().appendField('_TEMOTI_BOX_MONSNO');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__temoti_box_monsno'] = function(block) {
  var code = '_TEMOTI_BOX_MONSNO(';
  code += ')\n';
  return code;
};
commandMap['_TEMOTI_BOX_POKEMON_NAME'] = { type: 'bdsp__temoti_box_pokemon_name', args: 0 };
Blockly.Blocks['bdsp__temoti_box_pokemon_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_TEMOTI_BOX_POKEMON_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__temoti_box_pokemon_name'] = function(block) {
  var code = '_TEMOTI_BOX_POKEMON_NAME(';
  code += ')\n';
  return code;
};
commandMap['_TEMOTI_BOX_POKE_CHK'] = { type: 'bdsp__temoti_box_poke_chk', args: 0 };
Blockly.Blocks['bdsp__temoti_box_poke_chk'] = {
  init: function() {
    this.appendDummyInput().appendField('_TEMOTI_BOX_POKE_CHK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__temoti_box_poke_chk'] = function(block) {
  var code = '_TEMOTI_BOX_POKE_CHK(';
  code += ')\n';
  return code;
};
commandMap['_TEMOTI_MONSNO'] = { type: 'bdsp__temoti_monsno', args: 2 };
Blockly.Blocks['bdsp__temoti_monsno'] = {
  init: function() {
    this.appendDummyInput().appendField('_TEMOTI_MONSNO');
    this.appendValueInput('ARG_0').appendField('Slot');
    this.appendValueInput('ARG_1').appendField('Result');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Gets the NatDex Number of the Pok\u00c3\u00a9mon in slot #<Slot> of the player's party and returns it in <Result>.");
  }
};
Blockly.JavaScript['bdsp__temoti_monsno'] = function(block) {
  var code = '_TEMOTI_MONSNO(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_TEMOTI_POKE_CHK'] = { type: 'bdsp__temoti_poke_chk', args: 0 };
Blockly.Blocks['bdsp__temoti_poke_chk'] = {
  init: function() {
    this.appendDummyInput().appendField('_TEMOTI_POKE_CHK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__temoti_poke_chk'] = function(block) {
  var code = '_TEMOTI_POKE_CHK(';
  code += ')\n';
  return code;
};
commandMap['_TEMOTI_POKE_CHK_GET_POS'] = { type: 'bdsp__temoti_poke_chk_get_pos', args: 0 };
Blockly.Blocks['bdsp__temoti_poke_chk_get_pos'] = {
  init: function() {
    this.appendDummyInput().appendField('_TEMOTI_POKE_CHK_GET_POS');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__temoti_poke_chk_get_pos'] = function(block) {
  var code = '_TEMOTI_POKE_CHK_GET_POS(';
  code += ')\n';
  return code;
};
commandMap['_TEMOTI_POKE_CHK_NUM'] = { type: 'bdsp__temoti_poke_chk_num', args: 0 };
Blockly.Blocks['bdsp__temoti_poke_chk_num'] = {
  init: function() {
    this.appendDummyInput().appendField('_TEMOTI_POKE_CHK_NUM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__temoti_poke_chk_num'] = function(block) {
  var code = '_TEMOTI_POKE_CHK_NUM(';
  code += ')\n';
  return code;
};
commandMap['_TEMOTI_POKE_CONTEST_STATUS_GET'] = { type: 'bdsp__temoti_poke_contest_status_get', args: 0 };
Blockly.Blocks['bdsp__temoti_poke_contest_status_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_TEMOTI_POKE_CONTEST_STATUS_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__temoti_poke_contest_status_get'] = function(block) {
  var code = '_TEMOTI_POKE_CONTEST_STATUS_GET(';
  code += ')\n';
  return code;
};
commandMap['_TEMOTI_POKE_SEX_GET'] = { type: 'bdsp__temoti_poke_sex_get', args: 0 };
Blockly.Blocks['bdsp__temoti_poke_sex_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_TEMOTI_POKE_SEX_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__temoti_poke_sex_get'] = function(block) {
  var code = '_TEMOTI_POKE_SEX_GET(';
  code += ')\n';
  return code;
};
commandMap['_TEMOTI_POKE_TYPE'] = { type: 'bdsp__temoti_poke_type', args: 0 };
Blockly.Blocks['bdsp__temoti_poke_type'] = {
  init: function() {
    this.appendDummyInput().appendField('_TEMOTI_POKE_TYPE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__temoti_poke_type'] = function(block) {
  var code = '_TEMOTI_POKE_TYPE(';
  code += ')\n';
  return code;
};
commandMap['_TEMOTI_ROTOMU_FORM_CHG_CHECK'] = { type: 'bdsp__temoti_rotomu_form_chg_check', args: 0 };
Blockly.Blocks['bdsp__temoti_rotomu_form_chg_check'] = {
  init: function() {
    this.appendDummyInput().appendField('_TEMOTI_ROTOMU_FORM_CHG_CHECK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__temoti_rotomu_form_chg_check'] = function(block) {
  var code = '_TEMOTI_ROTOMU_FORM_CHG_CHECK(';
  code += ')\n';
  return code;
};
commandMap['_TEMOTI_ROTOMU_FORM_GET'] = { type: 'bdsp__temoti_rotomu_form_get', args: 0 };
Blockly.Blocks['bdsp__temoti_rotomu_form_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_TEMOTI_ROTOMU_FORM_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__temoti_rotomu_form_get'] = function(block) {
  var code = '_TEMOTI_ROTOMU_FORM_GET(';
  code += ')\n';
  return code;
};
commandMap['_TEMOTI_ROTOMU_FORM_WAZA_CHG'] = { type: 'bdsp__temoti_rotomu_form_waza_chg', args: 0 };
Blockly.Blocks['bdsp__temoti_rotomu_form_waza_chg'] = {
  init: function() {
    this.appendDummyInput().appendField('_TEMOTI_ROTOMU_FORM_WAZA_CHG');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__temoti_rotomu_form_waza_chg'] = function(block) {
  var code = '_TEMOTI_ROTOMU_FORM_WAZA_CHG(';
  code += ')\n';
  return code;
};
commandMap['_TEMOTI_WAZANO'] = { type: 'bdsp__temoti_wazano', args: 0 };
Blockly.Blocks['bdsp__temoti_wazano'] = {
  init: function() {
    this.appendDummyInput().appendField('_TEMOTI_WAZANO');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__temoti_wazano'] = function(block) {
  var code = '_TEMOTI_WAZANO(';
  code += ')\n';
  return code;
};
commandMap['_TEMOTI_WAZA_NAME'] = { type: 'bdsp__temoti_waza_name', args: 0 };
Blockly.Blocks['bdsp__temoti_waza_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_TEMOTI_WAZA_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__temoti_waza_name'] = function(block) {
  var code = '_TEMOTI_WAZA_NAME(';
  code += ')\n';
  return code;
};
commandMap['_TIME_WAIT'] = { type: 'bdsp__time_wait', args: 2 };
Blockly.Blocks['bdsp__time_wait'] = {
  init: function() {
    this.appendDummyInput().appendField('_TIME_WAIT');
    this.appendValueInput('ARG_0').appendField('Time');
    this.appendValueInput('ARG_1').appendField('Unknown');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Waits for the amount of frames provided, then continues execution.");
  }
};
Blockly.JavaScript['bdsp__time_wait'] = function(block) {
  var code = '_TIME_WAIT(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_TMAP_BG_SET_PROC'] = { type: 'bdsp__tmap_bg_set_proc', args: 0 };
Blockly.Blocks['bdsp__tmap_bg_set_proc'] = {
  init: function() {
    this.appendDummyInput().appendField('_TMAP_BG_SET_PROC');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Opens the Town Map from Pok\u00c3\u00a9mon Centers.");
  }
};
Blockly.JavaScript['bdsp__tmap_bg_set_proc'] = function(block) {
  var code = '_TMAP_BG_SET_PROC(';
  code += ')\n';
  return code;
};
commandMap['_TOBARI_4F_SHOP_OPEN'] = { type: 'bdsp__tobari_4f_shop_open', args: 0 };
Blockly.Blocks['bdsp__tobari_4f_shop_open'] = {
  init: function() {
    this.appendDummyInput().appendField('_TOBARI_4F_SHOP_OPEN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__tobari_4f_shop_open'] = function(block) {
  var code = '_TOBARI_4F_SHOP_OPEN(';
  code += ')\n';
  return code;
};
commandMap['_TRADE_LIST_SET_PROC'] = { type: 'bdsp__trade_list_set_proc', args: 0 };
Blockly.Blocks['bdsp__trade_list_set_proc'] = {
  init: function() {
    this.appendDummyInput().appendField('_TRADE_LIST_SET_PROC');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Opens the trade menu in Union Room.");
  }
};
Blockly.JavaScript['bdsp__trade_list_set_proc'] = function(block) {
  var code = '_TRADE_LIST_SET_PROC(';
  code += ')\n';
  return code;
};
commandMap['_TRAINER_BGM_SET'] = { type: 'bdsp__trainer_bgm_set', args: 0 };
Blockly.Blocks['bdsp__trainer_bgm_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_TRAINER_BGM_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__trainer_bgm_set'] = function(block) {
  var code = '_TRAINER_BGM_SET(';
  code += ')\n';
  return code;
};
commandMap['_TRAINER_BTL_SET'] = { type: 'bdsp__trainer_btl_set', args: 0 };
Blockly.Blocks['bdsp__trainer_btl_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_TRAINER_BTL_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__trainer_btl_set'] = function(block) {
  var code = '_TRAINER_BTL_SET(';
  code += ')\n';
  return code;
};
commandMap['_TRAINER_FLAG_CHECK'] = { type: 'bdsp__trainer_flag_check', args: 1 };
Blockly.Blocks['bdsp__trainer_flag_check'] = {
  init: function() {
    this.appendDummyInput().appendField('_TRAINER_FLAG_CHECK');
    this.appendValueInput('ARG_0').appendField('Flag');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Checks a trainer flag. Used in conjunction with _IF_TR_FLAGON_JUMP, _IF_TR_FLAGON_CALL, _IF_TR_FLAGOFF_JUMP, or _IF_TR_FLAGOFF_CALL.");
  }
};
Blockly.JavaScript['bdsp__trainer_flag_check'] = function(block) {
  var code = '_TRAINER_FLAG_CHECK(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_TRAINER_FLAG_RESET'] = { type: 'bdsp__trainer_flag_reset', args: 1 };
Blockly.Blocks['bdsp__trainer_flag_reset'] = {
  init: function() {
    this.appendDummyInput().appendField('_TRAINER_FLAG_RESET');
    this.appendValueInput('ARG_0').appendField('Flag');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Clears a trainer flag.");
  }
};
Blockly.JavaScript['bdsp__trainer_flag_reset'] = function(block) {
  var code = '_TRAINER_FLAG_RESET(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_TRAINER_FLAG_SET'] = { type: 'bdsp__trainer_flag_set', args: 1 };
Blockly.Blocks['bdsp__trainer_flag_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_TRAINER_FLAG_SET');
    this.appendValueInput('ARG_0').appendField('Flag');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Sets a trainer flag.");
  }
};
Blockly.JavaScript['bdsp__trainer_flag_set'] = function(block) {
  var code = '_TRAINER_FLAG_SET(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_TRAINER_ID_GET'] = { type: 'bdsp__trainer_id_get', args: 0 };
Blockly.Blocks['bdsp__trainer_id_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_TRAINER_ID_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__trainer_id_get'] = function(block) {
  var code = '_TRAINER_ID_GET(';
  code += ')\n';
  return code;
};
commandMap['_TRAINER_LOSE'] = { type: 'bdsp__trainer_lose', args: 0 };
Blockly.Blocks['bdsp__trainer_lose'] = {
  init: function() {
    this.appendDummyInput().appendField('_TRAINER_LOSE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__trainer_lose'] = function(block) {
  var code = '_TRAINER_LOSE(';
  code += ')\n';
  return code;
};
commandMap['_TRAINER_LOSE_CHECK'] = { type: 'bdsp__trainer_lose_check', args: 0 };
Blockly.Blocks['bdsp__trainer_lose_check'] = {
  init: function() {
    this.appendDummyInput().appendField('_TRAINER_LOSE_CHECK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__trainer_lose_check'] = function(block) {
  var code = '_TRAINER_LOSE_CHECK(';
  code += ')\n';
  return code;
};
commandMap['_TRAINER_MSG_SET'] = { type: 'bdsp__trainer_msg_set', args: 0 };
Blockly.Blocks['bdsp__trainer_msg_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_TRAINER_MSG_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__trainer_msg_set'] = function(block) {
  var code = '_TRAINER_MSG_SET(';
  code += ')\n';
  return code;
};
commandMap['_TRAINER_MULTI_BTL_SET'] = { type: 'bdsp__trainer_multi_btl_set', args: 0 };
Blockly.Blocks['bdsp__trainer_multi_btl_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_TRAINER_MULTI_BTL_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__trainer_multi_btl_set'] = function(block) {
  var code = '_TRAINER_MULTI_BTL_SET(';
  code += ')\n';
  return code;
};
commandMap['_TRAINER_TALK_TYPE_GET'] = { type: 'bdsp__trainer_talk_type_get', args: 0 };
Blockly.Blocks['bdsp__trainer_talk_type_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_TRAINER_TALK_TYPE_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__trainer_talk_type_get'] = function(block) {
  var code = '_TRAINER_TALK_TYPE_GET(';
  code += ')\n';
  return code;
};
commandMap['_TRAINER_TYPE_GET'] = { type: 'bdsp__trainer_type_get', args: 0 };
Blockly.Blocks['bdsp__trainer_type_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_TRAINER_TYPE_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__trainer_type_get'] = function(block) {
  var code = '_TRAINER_TYPE_GET(';
  code += ')\n';
  return code;
};
commandMap['_TRAINING_OPEN'] = { type: 'bdsp__training_open', args: 0 };
Blockly.Blocks['bdsp__training_open'] = {
  init: function() {
    this.appendDummyInput().appendField('_TRAINING_OPEN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__training_open'] = function(block) {
  var code = '_TRAINING_OPEN(';
  code += ')\n';
  return code;
};
commandMap['_TRAINING_OPEN_WAIT'] = { type: 'bdsp__training_open_wait', args: 0 };
Blockly.Blocks['bdsp__training_open_wait'] = {
  init: function() {
    this.appendDummyInput().appendField('_TRAINING_OPEN_WAIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__training_open_wait'] = function(block) {
  var code = '_TRAINING_OPEN_WAIT(';
  code += ')\n';
  return code;
};
commandMap['_TRAP_CHK'] = { type: 'bdsp__trap_chk', args: 0 };
Blockly.Blocks['bdsp__trap_chk'] = {
  init: function() {
    this.appendDummyInput().appendField('_TRAP_CHK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__trap_chk'] = function(block) {
  var code = '_TRAP_CHK(';
  code += ')\n';
  return code;
};
commandMap['_TRAP_NAME'] = { type: 'bdsp__trap_name', args: 0 };
Blockly.Blocks['bdsp__trap_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_TRAP_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__trap_name'] = function(block) {
  var code = '_TRAP_NAME(';
  code += ')\n';
  return code;
};
commandMap['_TREASURE_CHK'] = { type: 'bdsp__treasure_chk', args: 0 };
Blockly.Blocks['bdsp__treasure_chk'] = {
  init: function() {
    this.appendDummyInput().appendField('_TREASURE_CHK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__treasure_chk'] = function(block) {
  var code = '_TREASURE_CHK(';
  code += ')\n';
  return code;
};
commandMap['_TR_CARD_SET_PROC'] = { type: 'bdsp__tr_card_set_proc', args: 0 };
Blockly.Blocks['bdsp__tr_card_set_proc'] = {
  init: function() {
    this.appendDummyInput().appendField('_TR_CARD_SET_PROC');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Opens the trainer card of another player in Union Room.");
  }
};
Blockly.JavaScript['bdsp__tr_card_set_proc'] = function(block) {
  var code = '_TR_CARD_SET_PROC(';
  code += ')\n';
  return code;
};
commandMap['_TR_TYPE_NAME'] = { type: 'bdsp__tr_type_name', args: 0 };
Blockly.Blocks['bdsp__tr_type_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_TR_TYPE_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__tr_type_name'] = function(block) {
  var code = '_TR_TYPE_NAME(';
  code += ')\n';
  return code;
};
commandMap['_TSIGN_SET_PROC'] = { type: 'bdsp__tsign_set_proc', args: 0 };
Blockly.Blocks['bdsp__tsign_set_proc'] = {
  init: function() {
    this.appendDummyInput().appendField('_TSIGN_SET_PROC');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__tsign_set_proc'] = function(block) {
  var code = '_TSIGN_SET_PROC(';
  code += ')\n';
  return code;
};
commandMap['_TUREARUKI_ITEM_TIMER_SET'] = { type: 'bdsp__turearuki_item_timer_set', args: 0 };
Blockly.Blocks['bdsp__turearuki_item_timer_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_TUREARUKI_ITEM_TIMER_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__turearuki_item_timer_set'] = function(block) {
  var code = '_TUREARUKI_ITEM_TIMER_SET(';
  code += ')\n';
  return code;
};
commandMap['_TUREARUKI_POKEMON_INDEX'] = { type: 'bdsp__turearuki_pokemon_index', args: 0 };
Blockly.Blocks['bdsp__turearuki_pokemon_index'] = {
  init: function() {
    this.appendDummyInput().appendField('_TUREARUKI_POKEMON_INDEX');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__turearuki_pokemon_index'] = function(block) {
  var code = '_TUREARUKI_POKEMON_INDEX(';
  code += ')\n';
  return code;
};
commandMap['_TUREARUKI_POKEMON_TALK'] = { type: 'bdsp__turearuki_pokemon_talk', args: 0 };
Blockly.Blocks['bdsp__turearuki_pokemon_talk'] = {
  init: function() {
    this.appendDummyInput().appendField('_TUREARUKI_POKEMON_TALK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__turearuki_pokemon_talk'] = function(block) {
  var code = '_TUREARUKI_POKEMON_TALK(';
  code += ')\n';
  return code;
};
commandMap['_TUREARUKI_POKE_CREATE'] = { type: 'bdsp__turearuki_poke_create', args: 0 };
Blockly.Blocks['bdsp__turearuki_poke_create'] = {
  init: function() {
    this.appendDummyInput().appendField('_TUREARUKI_POKE_CREATE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__turearuki_poke_create'] = function(block) {
  var code = '_TUREARUKI_POKE_CREATE(';
  code += ')\n';
  return code;
};
commandMap['_TUREARUKI_POKE_DELETE'] = { type: 'bdsp__turearuki_poke_delete', args: 0 };
Blockly.Blocks['bdsp__turearuki_poke_delete'] = {
  init: function() {
    this.appendDummyInput().appendField('_TUREARUKI_POKE_DELETE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__turearuki_poke_delete'] = function(block) {
  var code = '_TUREARUKI_POKE_DELETE(';
  code += ')\n';
  return code;
};
commandMap['_TUREARUKI_TAKE_ITEM'] = { type: 'bdsp__turearuki_take_item', args: 0 };
Blockly.Blocks['bdsp__turearuki_take_item'] = {
  init: function() {
    this.appendDummyInput().appendField('_TUREARUKI_TAKE_ITEM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__turearuki_take_item'] = function(block) {
  var code = '_TUREARUKI_TAKE_ITEM(';
  code += ')\n';
  return code;
};
commandMap['_TURN_HERO_SITE'] = { type: 'bdsp__turn_hero_site', args: 0 };
Blockly.Blocks['bdsp__turn_hero_site'] = {
  init: function() {
    this.appendDummyInput().appendField('_TURN_HERO_SITE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Turns the actor to face the player.");
  }
};
Blockly.JavaScript['bdsp__turn_hero_site'] = function(block) {
  var code = '_TURN_HERO_SITE(';
  code += ')\n';
  return code;
};
commandMap['_TURN_HERO_TALK_OBJ'] = { type: 'bdsp__turn_hero_talk_obj', args: 0 };
Blockly.Blocks['bdsp__turn_hero_talk_obj'] = {
  init: function() {
    this.appendDummyInput().appendField('_TURN_HERO_TALK_OBJ');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Turns the player to face the actor.");
  }
};
Blockly.JavaScript['bdsp__turn_hero_talk_obj'] = function(block) {
  var code = '_TURN_HERO_TALK_OBJ(';
  code += ')\n';
  return code;
};
commandMap['_TV_END'] = { type: 'bdsp__tv_end', args: 0 };
Blockly.Blocks['bdsp__tv_end'] = {
  init: function() {
    this.appendDummyInput().appendField('_TV_END');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__tv_end'] = function(block) {
  var code = '_TV_END(';
  code += ')\n';
  return code;
};
commandMap['_TV_ENTRY_PARKINFO_ACCE'] = { type: 'bdsp__tv_entry_parkinfo_acce', args: 0 };
Blockly.Blocks['bdsp__tv_entry_parkinfo_acce'] = {
  init: function() {
    this.appendDummyInput().appendField('_TV_ENTRY_PARKINFO_ACCE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__tv_entry_parkinfo_acce'] = function(block) {
  var code = '_TV_ENTRY_PARKINFO_ACCE(';
  code += ')\n';
  return code;
};
commandMap['_TV_ENTRY_PARKINFO_INIT'] = { type: 'bdsp__tv_entry_parkinfo_init', args: 0 };
Blockly.Blocks['bdsp__tv_entry_parkinfo_init'] = {
  init: function() {
    this.appendDummyInput().appendField('_TV_ENTRY_PARKINFO_INIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__tv_entry_parkinfo_init'] = function(block) {
  var code = '_TV_ENTRY_PARKINFO_INIT(';
  code += ')\n';
  return code;
};
commandMap['_TV_ENTRY_PARKINFO_ITEM'] = { type: 'bdsp__tv_entry_parkinfo_item', args: 0 };
Blockly.Blocks['bdsp__tv_entry_parkinfo_item'] = {
  init: function() {
    this.appendDummyInput().appendField('_TV_ENTRY_PARKINFO_ITEM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__tv_entry_parkinfo_item'] = function(block) {
  var code = '_TV_ENTRY_PARKINFO_ITEM(';
  code += ')\n';
  return code;
};
commandMap['_TV_ENTRY_WATCH_CHANGE_NAME'] = { type: 'bdsp__tv_entry_watch_change_name', args: 0 };
Blockly.Blocks['bdsp__tv_entry_watch_change_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_TV_ENTRY_WATCH_CHANGE_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__tv_entry_watch_change_name'] = function(block) {
  var code = '_TV_ENTRY_WATCH_CHANGE_NAME(';
  code += ')\n';
  return code;
};
commandMap['_TV_ENTRY_WATCH_HIDE_ITEM'] = { type: 'bdsp__tv_entry_watch_hide_item', args: 0 };
Blockly.Blocks['bdsp__tv_entry_watch_hide_item'] = {
  init: function() {
    this.appendDummyInput().appendField('_TV_ENTRY_WATCH_HIDE_ITEM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__tv_entry_watch_hide_item'] = function(block) {
  var code = '_TV_ENTRY_WATCH_HIDE_ITEM(';
  code += ')\n';
  return code;
};
commandMap['_TV_GET_DATA_TOTAL'] = { type: 'bdsp__tv_get_data_total', args: 0 };
Blockly.Blocks['bdsp__tv_get_data_total'] = {
  init: function() {
    this.appendDummyInput().appendField('_TV_GET_DATA_TOTAL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__tv_get_data_total'] = function(block) {
  var code = '_TV_GET_DATA_TOTAL(';
  code += ')\n';
  return code;
};
commandMap['_TV_INTERVIEWER_CHECK'] = { type: 'bdsp__tv_interviewer_check', args: 0 };
Blockly.Blocks['bdsp__tv_interviewer_check'] = {
  init: function() {
    this.appendDummyInput().appendField('_TV_INTERVIEWER_CHECK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__tv_interviewer_check'] = function(block) {
  var code = '_TV_INTERVIEWER_CHECK(';
  code += ')\n';
  return code;
};
commandMap['_TV_INTERVIEW_ENTRY'] = { type: 'bdsp__tv_interview_entry', args: 0 };
Blockly.Blocks['bdsp__tv_interview_entry'] = {
  init: function() {
    this.appendDummyInput().appendField('_TV_INTERVIEW_ENTRY');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__tv_interview_entry'] = function(block) {
  var code = '_TV_INTERVIEW_ENTRY(';
  code += ')\n';
  return code;
};
commandMap['_TV_INTERVIEW_MSG'] = { type: 'bdsp__tv_interview_msg', args: 0 };
Blockly.Blocks['bdsp__tv_interview_msg'] = {
  init: function() {
    this.appendDummyInput().appendField('_TV_INTERVIEW_MSG');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__tv_interview_msg'] = function(block) {
  var code = '_TV_INTERVIEW_MSG(';
  code += ')\n';
  return code;
};
commandMap['_TV_INTERVIEW_STR_WORD_SET'] = { type: 'bdsp__tv_interview_str_word_set', args: 0 };
Blockly.Blocks['bdsp__tv_interview_str_word_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_TV_INTERVIEW_STR_WORD_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__tv_interview_str_word_set'] = function(block) {
  var code = '_TV_INTERVIEW_STR_WORD_SET(';
  code += ')\n';
  return code;
};
commandMap['_TV_MAKE_MSG'] = { type: 'bdsp__tv_make_msg', args: 0 };
Blockly.Blocks['bdsp__tv_make_msg'] = {
  init: function() {
    this.appendDummyInput().appendField('_TV_MAKE_MSG');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__tv_make_msg'] = function(block) {
  var code = '_TV_MAKE_MSG(';
  code += ')\n';
  return code;
};
commandMap['_TV_MONITOR_RESET'] = { type: 'bdsp__tv_monitor_reset', args: 0 };
Blockly.Blocks['bdsp__tv_monitor_reset'] = {
  init: function() {
    this.appendDummyInput().appendField('_TV_MONITOR_RESET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__tv_monitor_reset'] = function(block) {
  var code = '_TV_MONITOR_RESET(';
  code += ')\n';
  return code;
};
commandMap['_TV_MONITOR_SET'] = { type: 'bdsp__tv_monitor_set', args: 0 };
Blockly.Blocks['bdsp__tv_monitor_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_TV_MONITOR_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__tv_monitor_set'] = function(block) {
  var code = '_TV_MONITOR_SET(';
  code += ')\n';
  return code;
};
commandMap['_TV_RED_GYARADOS_OFF'] = { type: 'bdsp__tv_red_gyarados_off', args: 0 };
Blockly.Blocks['bdsp__tv_red_gyarados_off'] = {
  init: function() {
    this.appendDummyInput().appendField('_TV_RED_GYARADOS_OFF');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__tv_red_gyarados_off'] = function(block) {
  var code = '_TV_RED_GYARADOS_OFF(';
  code += ')\n';
  return code;
};
commandMap['_TV_RED_GYARADOS_ON'] = { type: 'bdsp__tv_red_gyarados_on', args: 0 };
Blockly.Blocks['bdsp__tv_red_gyarados_on'] = {
  init: function() {
    this.appendDummyInput().appendField('_TV_RED_GYARADOS_ON');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__tv_red_gyarados_on'] = function(block) {
  var code = '_TV_RED_GYARADOS_ON(';
  code += ')\n';
  return code;
};
commandMap['_TV_SET_ENDFLAG'] = { type: 'bdsp__tv_set_endflag', args: 0 };
Blockly.Blocks['bdsp__tv_set_endflag'] = {
  init: function() {
    this.appendDummyInput().appendField('_TV_SET_ENDFLAG');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__tv_set_endflag'] = function(block) {
  var code = '_TV_SET_ENDFLAG(';
  code += ')\n';
  return code;
};
commandMap['_TV_START'] = { type: 'bdsp__tv_start', args: 0 };
Blockly.Blocks['bdsp__tv_start'] = {
  init: function() {
    this.appendDummyInput().appendField('_TV_START');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__tv_start'] = function(block) {
  var code = '_TV_START(';
  code += ')\n';
  return code;
};
commandMap['_TV_START_NUMBER'] = { type: 'bdsp__tv_start_number', args: 0 };
Blockly.Blocks['bdsp__tv_start_number'] = {
  init: function() {
    this.appendDummyInput().appendField('_TV_START_NUMBER');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__tv_start_number'] = function(block) {
  var code = '_TV_START_NUMBER(';
  code += ')\n';
  return code;
};
commandMap['_TV_TOPIC_BRANCH_GET'] = { type: 'bdsp__tv_topic_branch_get', args: 0 };
Blockly.Blocks['bdsp__tv_topic_branch_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_TV_TOPIC_BRANCH_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__tv_topic_branch_get'] = function(block) {
  var code = '_TV_TOPIC_BRANCH_GET(';
  code += ')\n';
  return code;
};
commandMap['_TV_TOPIC_INT_GET'] = { type: 'bdsp__tv_topic_int_get', args: 0 };
Blockly.Blocks['bdsp__tv_topic_int_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_TV_TOPIC_INT_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__tv_topic_int_get'] = function(block) {
  var code = '_TV_TOPIC_INT_GET(';
  code += ')\n';
  return code;
};
commandMap['_TV_TOPIC_STR_GENDER_WORD_SET'] = { type: 'bdsp__tv_topic_str_gender_word_set', args: 0 };
Blockly.Blocks['bdsp__tv_topic_str_gender_word_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_TV_TOPIC_STR_GENDER_WORD_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__tv_topic_str_gender_word_set'] = function(block) {
  var code = '_TV_TOPIC_STR_GENDER_WORD_SET(';
  code += ')\n';
  return code;
};
commandMap['_TV_TOPIC_STR_WORD_SET'] = { type: 'bdsp__tv_topic_str_word_set', args: 0 };
Blockly.Blocks['bdsp__tv_topic_str_word_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_TV_TOPIC_STR_WORD_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__tv_topic_str_word_set'] = function(block) {
  var code = '_TV_TOPIC_STR_WORD_SET(';
  code += ')\n';
  return code;
};
commandMap['_TV_TPIC_BRANCH'] = { type: 'bdsp__tv_tpic_branch', args: 0 };
Blockly.Blocks['bdsp__tv_tpic_branch'] = {
  init: function() {
    this.appendDummyInput().appendField('_TV_TPIC_BRANCH');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__tv_tpic_branch'] = function(block) {
  var code = '_TV_TPIC_BRANCH(';
  code += ')\n';
  return code;
};
commandMap['_TV_TPIC_ENABLE'] = { type: 'bdsp__tv_tpic_enable', args: 0 };
Blockly.Blocks['bdsp__tv_tpic_enable'] = {
  init: function() {
    this.appendDummyInput().appendField('_TV_TPIC_ENABLE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__tv_tpic_enable'] = function(block) {
  var code = '_TV_TPIC_ENABLE(';
  code += ')\n';
  return code;
};
commandMap['_UG_BALLITEM_CHECK'] = { type: 'bdsp__ug_ballitem_check', args: 0 };
Blockly.Blocks['bdsp__ug_ballitem_check'] = {
  init: function() {
    this.appendDummyInput().appendField('_UG_BALLITEM_CHECK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__ug_ballitem_check'] = function(block) {
  var code = '_UG_BALLITEM_CHECK(';
  code += ')\n';
  return code;
};
commandMap['_UG_ITEM_NAME'] = { type: 'bdsp__ug_item_name', args: 0 };
Blockly.Blocks['bdsp__ug_item_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_UG_ITEM_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__ug_item_name'] = function(block) {
  var code = '_UG_ITEM_NAME(';
  code += ')\n';
  return code;
};
commandMap['_UG_LEAVE_HOYUTA'] = { type: 'bdsp__ug_leave_hoyuta', args: 0 };
Blockly.Blocks['bdsp__ug_leave_hoyuta'] = {
  init: function() {
    this.appendDummyInput().appendField('_UG_LEAVE_HOYUTA');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__ug_leave_hoyuta'] = function(block) {
  var code = '_UG_LEAVE_HOYUTA(';
  code += ')\n';
  return code;
};
commandMap['_UG_MAN_SHOP_NPC_RAND_PLACE'] = { type: 'bdsp__ug_man_shop_npc_rand_place', args: 0 };
Blockly.Blocks['bdsp__ug_man_shop_npc_rand_place'] = {
  init: function() {
    this.appendDummyInput().appendField('_UG_MAN_SHOP_NPC_RAND_PLACE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__ug_man_shop_npc_rand_place'] = function(block) {
  var code = '_UG_MAN_SHOP_NPC_RAND_PLACE(';
  code += ')\n';
  return code;
};
commandMap['_UG_SHOP_ITEM_NAME'] = { type: 'bdsp__ug_shop_item_name', args: 0 };
Blockly.Blocks['bdsp__ug_shop_item_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_UG_SHOP_ITEM_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__ug_shop_item_name'] = function(block) {
  var code = '_UG_SHOP_ITEM_NAME(';
  code += ')\n';
  return code;
};
commandMap['_UG_SHOP_MENU_INIT'] = { type: 'bdsp__ug_shop_menu_init', args: 0 };
Blockly.Blocks['bdsp__ug_shop_menu_init'] = {
  init: function() {
    this.appendDummyInput().appendField('_UG_SHOP_MENU_INIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__ug_shop_menu_init'] = function(block) {
  var code = '_UG_SHOP_MENU_INIT(';
  code += ')\n';
  return code;
};
commandMap['_UG_SHOP_TALK_END'] = { type: 'bdsp__ug_shop_talk_end', args: 0 };
Blockly.Blocks['bdsp__ug_shop_talk_end'] = {
  init: function() {
    this.appendDummyInput().appendField('_UG_SHOP_TALK_END');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__ug_shop_talk_end'] = function(block) {
  var code = '_UG_SHOP_TALK_END(';
  code += ')\n';
  return code;
};
commandMap['_UG_SHOP_TALK_START'] = { type: 'bdsp__ug_shop_talk_start', args: 0 };
Blockly.Blocks['bdsp__ug_shop_talk_start'] = {
  init: function() {
    this.appendDummyInput().appendField('_UG_SHOP_TALK_START');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__ug_shop_talk_start'] = function(block) {
  var code = '_UG_SHOP_TALK_START(';
  code += ')\n';
  return code;
};
commandMap['_UG_SHOP_TRAP_NAME'] = { type: 'bdsp__ug_shop_trap_name', args: 0 };
Blockly.Blocks['bdsp__ug_shop_trap_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_UG_SHOP_TRAP_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__ug_shop_trap_name'] = function(block) {
  var code = '_UG_SHOP_TRAP_NAME(';
  code += ')\n';
  return code;
};
commandMap['_UMA_ANIME_ATTACH'] = { type: 'bdsp__uma_anime_attach', args: 0 };
Blockly.Blocks['bdsp__uma_anime_attach'] = {
  init: function() {
    this.appendDummyInput().appendField('_UMA_ANIME_ATTACH');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__uma_anime_attach'] = function(block) {
  var code = '_UMA_ANIME_ATTACH(';
  code += ')\n';
  return code;
};
commandMap['_UMA_ANIME_PLAY'] = { type: 'bdsp__uma_anime_play', args: 0 };
Blockly.Blocks['bdsp__uma_anime_play'] = {
  init: function() {
    this.appendDummyInput().appendField('_UMA_ANIME_PLAY');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__uma_anime_play'] = function(block) {
  var code = '_UMA_ANIME_PLAY(';
  code += ')\n';
  return code;
};
commandMap['_UMA_IS_NULL'] = { type: 'bdsp__uma_is_null', args: 0 };
Blockly.Blocks['bdsp__uma_is_null'] = {
  init: function() {
    this.appendDummyInput().appendField('_UMA_IS_NULL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__uma_is_null'] = function(block) {
  var code = '_UMA_IS_NULL(';
  code += ')\n';
  return code;
};
commandMap['_UMA_PLAY_WAIT'] = { type: 'bdsp__uma_play_wait', args: 0 };
Blockly.Blocks['bdsp__uma_play_wait'] = {
  init: function() {
    this.appendDummyInput().appendField('_UMA_PLAY_WAIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__uma_play_wait'] = function(block) {
  var code = '_UMA_PLAY_WAIT(';
  code += ')\n';
  return code;
};
commandMap['_UNDERGROUND_KASEKI_DIG_COUNT'] = { type: 'bdsp__underground_kaseki_dig_count', args: 0 };
Blockly.Blocks['bdsp__underground_kaseki_dig_count'] = {
  init: function() {
    this.appendDummyInput().appendField('_UNDERGROUND_KASEKI_DIG_COUNT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__underground_kaseki_dig_count'] = function(block) {
  var code = '_UNDERGROUND_KASEKI_DIG_COUNT(';
  code += ')\n';
  return code;
};
commandMap['_UNDERGROUND_TALK_COUNT'] = { type: 'bdsp__underground_talk_count', args: 0 };
Blockly.Blocks['bdsp__underground_talk_count'] = {
  init: function() {
    this.appendDummyInput().appendField('_UNDERGROUND_TALK_COUNT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__underground_talk_count'] = function(block) {
  var code = '_UNDERGROUND_TALK_COUNT(';
  code += ')\n';
  return code;
};
commandMap['_UNDERGROUND_TALK_COUNT2'] = { type: 'bdsp__underground_talk_count2', args: 0 };
Blockly.Blocks['bdsp__underground_talk_count2'] = {
  init: function() {
    this.appendDummyInput().appendField('_UNDERGROUND_TALK_COUNT2');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__underground_talk_count2'] = function(block) {
  var code = '_UNDERGROUND_TALK_COUNT2(';
  code += ')\n';
  return code;
};
commandMap['_UNDERGROUND_TALK_COUNT_CLEAR'] = { type: 'bdsp__underground_talk_count_clear', args: 0 };
Blockly.Blocks['bdsp__underground_talk_count_clear'] = {
  init: function() {
    this.appendDummyInput().appendField('_UNDERGROUND_TALK_COUNT_CLEAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__underground_talk_count_clear'] = function(block) {
  var code = '_UNDERGROUND_TALK_COUNT_CLEAR(';
  code += ')\n';
  return code;
};
commandMap['_UNDERGROUND_TOOL_GIVE_COUNT'] = { type: 'bdsp__underground_tool_give_count', args: 0 };
Blockly.Blocks['bdsp__underground_tool_give_count'] = {
  init: function() {
    this.appendDummyInput().appendField('_UNDERGROUND_TOOL_GIVE_COUNT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__underground_tool_give_count'] = function(block) {
  var code = '_UNDERGROUND_TOOL_GIVE_COUNT(';
  code += ')\n';
  return code;
};
commandMap['_UNDERGROUND_TRAP_HIT_COUNT'] = { type: 'bdsp__underground_trap_hit_count', args: 0 };
Blockly.Blocks['bdsp__underground_trap_hit_count'] = {
  init: function() {
    this.appendDummyInput().appendField('_UNDERGROUND_TRAP_HIT_COUNT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__underground_trap_hit_count'] = function(block) {
  var code = '_UNDERGROUND_TRAP_HIT_COUNT(';
  code += ')\n';
  return code;
};
commandMap['_UNION_BATTLE_START_CHECK'] = { type: 'bdsp__union_battle_start_check', args: 0 };
Blockly.Blocks['bdsp__union_battle_start_check'] = {
  init: function() {
    this.appendDummyInput().appendField('_UNION_BATTLE_START_CHECK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__union_battle_start_check'] = function(block) {
  var code = '_UNION_BATTLE_START_CHECK(';
  code += ')\n';
  return code;
};
commandMap['_UNION_BEACON_CHANGE'] = { type: 'bdsp__union_beacon_change', args: 0 };
Blockly.Blocks['bdsp__union_beacon_change'] = {
  init: function() {
    this.appendDummyInput().appendField('_UNION_BEACON_CHANGE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__union_beacon_change'] = function(block) {
  var code = '_UNION_BEACON_CHANGE(';
  code += ')\n';
  return code;
};
commandMap['_UNION_BMPMENU_START'] = { type: 'bdsp__union_bmpmenu_start', args: 0 };
Blockly.Blocks['bdsp__union_bmpmenu_start'] = {
  init: function() {
    this.appendDummyInput().appendField('_UNION_BMPMENU_START');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__union_bmpmenu_start'] = function(block) {
  var code = '_UNION_BMPMENU_START(';
  code += ')\n';
  return code;
};
commandMap['_UNION_CHILD_SELECT_COMMAND_SET'] = { type: 'bdsp__union_child_select_command_set', args: 0 };
Blockly.Blocks['bdsp__union_child_select_command_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_UNION_CHILD_SELECT_COMMAND_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__union_child_select_command_set'] = function(block) {
  var code = '_UNION_CHILD_SELECT_COMMAND_SET(';
  code += ')\n';
  return code;
};
commandMap['_UNION_CONNECT_CUT_RESTART'] = { type: 'bdsp__union_connect_cut_restart', args: 0 };
Blockly.Blocks['bdsp__union_connect_cut_restart'] = {
  init: function() {
    this.appendDummyInput().appendField('_UNION_CONNECT_CUT_RESTART');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__union_connect_cut_restart'] = function(block) {
  var code = '_UNION_CONNECT_CUT_RESTART(';
  code += ')\n';
  return code;
};
commandMap['_UNION_CONNECT_START'] = { type: 'bdsp__union_connect_start', args: 0 };
Blockly.Blocks['bdsp__union_connect_start'] = {
  init: function() {
    this.appendDummyInput().appendField('_UNION_CONNECT_START');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__union_connect_start'] = function(block) {
  var code = '_UNION_CONNECT_START(';
  code += ')\n';
  return code;
};
commandMap['_UNION_CONNECT_TALK_DENIED'] = { type: 'bdsp__union_connect_talk_denied', args: 0 };
Blockly.Blocks['bdsp__union_connect_talk_denied'] = {
  init: function() {
    this.appendDummyInput().appendField('_UNION_CONNECT_TALK_DENIED');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__union_connect_talk_denied'] = function(block) {
  var code = '_UNION_CONNECT_TALK_DENIED(';
  code += ')\n';
  return code;
};
commandMap['_UNION_CONNECT_TALK_OK'] = { type: 'bdsp__union_connect_talk_ok', args: 0 };
Blockly.Blocks['bdsp__union_connect_talk_ok'] = {
  init: function() {
    this.appendDummyInput().appendField('_UNION_CONNECT_TALK_OK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__union_connect_talk_ok'] = function(block) {
  var code = '_UNION_CONNECT_TALK_OK(';
  code += ')\n';
  return code;
};
commandMap['_UNION_GET_CARD_TALK_NO'] = { type: 'bdsp__union_get_card_talk_no', args: 0 };
Blockly.Blocks['bdsp__union_get_card_talk_no'] = {
  init: function() {
    this.appendDummyInput().appendField('_UNION_GET_CARD_TALK_NO');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__union_get_card_talk_no'] = function(block) {
  var code = '_UNION_GET_CARD_TALK_NO(';
  code += ')\n';
  return code;
};
commandMap['_UNION_GET_INFO_TALK_NO'] = { type: 'bdsp__union_get_info_talk_no', args: 0 };
Blockly.Blocks['bdsp__union_get_info_talk_no'] = {
  init: function() {
    this.appendDummyInput().appendField('_UNION_GET_INFO_TALK_NO');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__union_get_info_talk_no'] = function(block) {
  var code = '_UNION_GET_INFO_TALK_NO(';
  code += ')\n';
  return code;
};
commandMap['_UNION_GET_TALK_NUMBER'] = { type: 'bdsp__union_get_talk_number', args: 0 };
Blockly.Blocks['bdsp__union_get_talk_number'] = {
  init: function() {
    this.appendDummyInput().appendField('_UNION_GET_TALK_NUMBER');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__union_get_talk_number'] = function(block) {
  var code = '_UNION_GET_TALK_NUMBER(';
  code += ')\n';
  return code;
};
commandMap['_UNION_ID_SET'] = { type: 'bdsp__union_id_set', args: 0 };
Blockly.Blocks['bdsp__union_id_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_UNION_ID_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__union_id_set'] = function(block) {
  var code = '_UNION_ID_SET(';
  code += ')\n';
  return code;
};
commandMap['_UNION_MAP_CHANGE'] = { type: 'bdsp__union_map_change', args: 0 };
Blockly.Blocks['bdsp__union_map_change'] = {
  init: function() {
    this.appendDummyInput().appendField('_UNION_MAP_CHANGE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__union_map_change'] = function(block) {
  var code = '_UNION_MAP_CHANGE(';
  code += ')\n';
  return code;
};
commandMap['_UNION_OBJ_ALL_VANISH'] = { type: 'bdsp__union_obj_all_vanish', args: 0 };
Blockly.Blocks['bdsp__union_obj_all_vanish'] = {
  init: function() {
    this.appendDummyInput().appendField('_UNION_OBJ_ALL_VANISH');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__union_obj_all_vanish'] = function(block) {
  var code = '_UNION_OBJ_ALL_VANISH(';
  code += ')\n';
  return code;
};
commandMap['_UNION_PARENT_CARD_TALK_NO'] = { type: 'bdsp__union_parent_card_talk_no', args: 0 };
Blockly.Blocks['bdsp__union_parent_card_talk_no'] = {
  init: function() {
    this.appendDummyInput().appendField('_UNION_PARENT_CARD_TALK_NO');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__union_parent_card_talk_no'] = function(block) {
  var code = '_UNION_PARENT_CARD_TALK_NO(';
  code += ')\n';
  return code;
};
commandMap['_UNION_PARENT_START_COMMAND_SET'] = { type: 'bdsp__union_parent_start_command_set', args: 0 };
Blockly.Blocks['bdsp__union_parent_start_command_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_UNION_PARENT_START_COMMAND_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__union_parent_start_command_set'] = function(block) {
  var code = '_UNION_PARENT_START_COMMAND_SET(';
  code += ')\n';
  return code;
};
commandMap['_UNION_POKELIST_SET_PROC'] = { type: 'bdsp__union_pokelist_set_proc', args: 0 };
Blockly.Blocks['bdsp__union_pokelist_set_proc'] = {
  init: function() {
    this.appendDummyInput().appendField('_UNION_POKELIST_SET_PROC');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("(?) Opens the party in Union Room.");
  }
};
Blockly.JavaScript['bdsp__union_pokelist_set_proc'] = function(block) {
  var code = '_UNION_POKELIST_SET_PROC(';
  code += ')\n';
  return code;
};
commandMap['_UNION_PROC'] = { type: 'bdsp__union_proc', args: 0 };
Blockly.Blocks['bdsp__union_proc'] = {
  init: function() {
    this.appendDummyInput().appendField('_UNION_PROC');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__union_proc'] = function(block) {
  var code = '_UNION_PROC(';
  code += ')\n';
  return code;
};
commandMap['_UNION_RESULT_GET'] = { type: 'bdsp__union_result_get', args: 0 };
Blockly.Blocks['bdsp__union_result_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_UNION_RESULT_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__union_result_get'] = function(block) {
  var code = '_UNION_RESULT_GET(';
  code += ')\n';
  return code;
};
commandMap['_UNION_RETURN_SETUP'] = { type: 'bdsp__union_return_setup', args: 0 };
Blockly.Blocks['bdsp__union_return_setup'] = {
  init: function() {
    this.appendDummyInput().appendField('_UNION_RETURN_SETUP');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__union_return_setup'] = function(block) {
  var code = '_UNION_RETURN_SETUP(';
  code += ')\n';
  return code;
};
commandMap['_UNION_SCRIPT_RESULT_SET'] = { type: 'bdsp__union_script_result_set', args: 0 };
Blockly.Blocks['bdsp__union_script_result_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_UNION_SCRIPT_RESULT_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__union_script_result_set'] = function(block) {
  var code = '_UNION_SCRIPT_RESULT_SET(';
  code += ')\n';
  return code;
};
commandMap['_UNION_TRAINER_NAME_REGIST'] = { type: 'bdsp__union_trainer_name_regist', args: 0 };
Blockly.Blocks['bdsp__union_trainer_name_regist'] = {
  init: function() {
    this.appendDummyInput().appendField('_UNION_TRAINER_NAME_REGIST');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__union_trainer_name_regist'] = function(block) {
  var code = '_UNION_TRAINER_NAME_REGIST(';
  code += ')\n';
  return code;
};
commandMap['_UNION_VIEW_MY_STATUS_SET'] = { type: 'bdsp__union_view_my_status_set', args: 0 };
Blockly.Blocks['bdsp__union_view_my_status_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_UNION_VIEW_MY_STATUS_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__union_view_my_status_set'] = function(block) {
  var code = '_UNION_VIEW_MY_STATUS_SET(';
  code += ')\n';
  return code;
};
commandMap['_UNION_VIEW_TR_SEL_SET'] = { type: 'bdsp__union_view_tr_sel_set', args: 0 };
Blockly.Blocks['bdsp__union_view_tr_sel_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_UNION_VIEW_TR_SEL_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__union_view_tr_sel_set'] = function(block) {
  var code = '_UNION_VIEW_TR_SEL_SET(';
  code += ')\n';
  return code;
};
commandMap['_UNION_VIEW_TR_TYPE_MSG_GET'] = { type: 'bdsp__union_view_tr_type_msg_get', args: 0 };
Blockly.Blocks['bdsp__union_view_tr_type_msg_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_UNION_VIEW_TR_TYPE_MSG_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__union_view_tr_type_msg_get'] = function(block) {
  var code = '_UNION_VIEW_TR_TYPE_MSG_GET(';
  code += ')\n';
  return code;
};
commandMap['_UNION_VIEW_TR_TYPE_NO_GET'] = { type: 'bdsp__union_view_tr_type_no_get', args: 0 };
Blockly.Blocks['bdsp__union_view_tr_type_no_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_UNION_VIEW_TR_TYPE_NO_GET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__union_view_tr_type_no_get'] = function(block) {
  var code = '_UNION_VIEW_TR_TYPE_NO_GET(';
  code += ')\n';
  return code;
};
commandMap['_UNIQUE_POKE_FIX'] = { type: 'bdsp__unique_poke_fix', args: 0 };
Blockly.Blocks['bdsp__unique_poke_fix'] = {
  init: function() {
    this.appendDummyInput().appendField('_UNIQUE_POKE_FIX');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__unique_poke_fix'] = function(block) {
  var code = '_UNIQUE_POKE_FIX(';
  code += ')\n';
  return code;
};
commandMap['_UNIQUE_POKE_TEMP'] = { type: 'bdsp__unique_poke_temp', args: 0 };
Blockly.Blocks['bdsp__unique_poke_temp'] = {
  init: function() {
    this.appendDummyInput().appendField('_UNIQUE_POKE_TEMP');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__unique_poke_temp'] = function(block) {
  var code = '_UNIQUE_POKE_TEMP(';
  code += ')\n';
  return code;
};
commandMap['_UNKNOWN_FORM_GET'] = { type: 'bdsp__unknown_form_get', args: 3 };
Blockly.Blocks['bdsp__unknown_form_get'] = {
  init: function() {
    this.appendDummyInput().appendField('_UNKNOWN_FORM_GET');
    this.appendValueInput('ARG_0').appendField('Position1');
    this.appendValueInput('ARG_1').appendField('Position2');
    this.appendValueInput('ARG_2').appendField('Result');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Gets the form of an Unown.");
  }
};
Blockly.JavaScript['bdsp__unknown_form_get'] = function(block) {
  var code = '_UNKNOWN_FORM_GET(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_UNKNOWN_MSG'] = { type: 'bdsp__unknown_msg', args: 0 };
Blockly.Blocks['bdsp__unknown_msg'] = {
  init: function() {
    this.appendDummyInput().appendField('_UNKNOWN_MSG');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__unknown_msg'] = function(block) {
  var code = '_UNKNOWN_MSG(';
  code += ')\n';
  return code;
};
commandMap['_UPDATE_WEATHER'] = { type: 'bdsp__update_weather', args: 0 };
Blockly.Blocks['bdsp__update_weather'] = {
  init: function() {
    this.appendDummyInput().appendField('_UPDATE_WEATHER');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__update_weather'] = function(block) {
  var code = '_UPDATE_WEATHER(';
  code += ')\n';
  return code;
};
commandMap['_URAYAMA_ENCOUNT_NO_CHK'] = { type: 'bdsp__urayama_encount_no_chk', args: 0 };
Blockly.Blocks['bdsp__urayama_encount_no_chk'] = {
  init: function() {
    this.appendDummyInput().appendField('_URAYAMA_ENCOUNT_NO_CHK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__urayama_encount_no_chk'] = function(block) {
  var code = '_URAYAMA_ENCOUNT_NO_CHK(';
  code += ')\n';
  return code;
};
commandMap['_URAYAMA_ENCOUNT_SET'] = { type: 'bdsp__urayama_encount_set', args: 0 };
Blockly.Blocks['bdsp__urayama_encount_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_URAYAMA_ENCOUNT_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__urayama_encount_set'] = function(block) {
  var code = '_URAYAMA_ENCOUNT_SET(';
  code += ')\n';
  return code;
};
commandMap['_USE_SPECIAL_ITEM'] = { type: 'bdsp__use_special_item', args: 0 };
Blockly.Blocks['bdsp__use_special_item'] = {
  init: function() {
    this.appendDummyInput().appendField('_USE_SPECIAL_ITEM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__use_special_item'] = function(block) {
  var code = '_USE_SPECIAL_ITEM(';
  code += ')\n';
  return code;
};
commandMap['_USE_SPRAY'] = { type: 'bdsp__use_spray', args: 0 };
Blockly.Blocks['bdsp__use_spray'] = {
  init: function() {
    this.appendDummyInput().appendField('_USE_SPRAY');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__use_spray'] = function(block) {
  var code = '_USE_SPRAY(';
  code += ')\n';
  return code;
};
commandMap['_USE_SUB_ATTRIBUTE'] = { type: 'bdsp__use_sub_attribute', args: 0 };
Blockly.Blocks['bdsp__use_sub_attribute'] = {
  init: function() {
    this.appendDummyInput().appendField('_USE_SUB_ATTRIBUTE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__use_sub_attribute'] = function(block) {
  var code = '_USE_SUB_ATTRIBUTE(';
  code += ')\n';
  return code;
};
commandMap['_USE_TANKENSET'] = { type: 'bdsp__use_tankenset', args: 0 };
Blockly.Blocks['bdsp__use_tankenset'] = {
  init: function() {
    this.appendDummyInput().appendField('_USE_TANKENSET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__use_tankenset'] = function(block) {
  var code = '_USE_TANKENSET(';
  code += ')\n';
  return code;
};
commandMap['_VANISH_DUMMY_OBJ_ADD'] = { type: 'bdsp__vanish_dummy_obj_add', args: 0 };
Blockly.Blocks['bdsp__vanish_dummy_obj_add'] = {
  init: function() {
    this.appendDummyInput().appendField('_VANISH_DUMMY_OBJ_ADD');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__vanish_dummy_obj_add'] = function(block) {
  var code = '_VANISH_DUMMY_OBJ_ADD(';
  code += ')\n';
  return code;
};
commandMap['_VANISH_DUMMY_OBJ_DEL'] = { type: 'bdsp__vanish_dummy_obj_del', args: 0 };
Blockly.Blocks['bdsp__vanish_dummy_obj_del'] = {
  init: function() {
    this.appendDummyInput().appendField('_VANISH_DUMMY_OBJ_DEL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unknown use. Only used once during the first Lake Verity visit.");
  }
};
Blockly.JavaScript['bdsp__vanish_dummy_obj_del'] = function(block) {
  var code = '_VANISH_DUMMY_OBJ_DEL(';
  code += ')\n';
  return code;
};
commandMap['_VISIBLE_OBJ_PROP'] = { type: 'bdsp__visible_obj_prop', args: 0 };
Blockly.Blocks['bdsp__visible_obj_prop'] = {
  init: function() {
    this.appendDummyInput().appendField('_VISIBLE_OBJ_PROP');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__visible_obj_prop'] = function(block) {
  var code = '_VISIBLE_OBJ_PROP(';
  code += ')\n';
  return code;
};
commandMap['_VM_ADD'] = { type: 'bdsp__vm_add', args: 0 };
Blockly.Blocks['bdsp__vm_add'] = {
  init: function() {
    this.appendDummyInput().appendField('_VM_ADD');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__vm_add'] = function(block) {
  var code = '_VM_ADD(';
  code += ')\n';
  return code;
};
commandMap['_VOICE_PLAY'] = { type: 'bdsp__voice_play', args: 3 };
Blockly.Blocks['bdsp__voice_play'] = {
  init: function() {
    this.appendDummyInput().appendField('_VOICE_PLAY');
    this.appendValueInput('ARG_0').appendField('PokÃ©mon');
    this.appendValueInput('ARG_1').appendField('Form');
    this.appendValueInput('ARG_2').appendField('VoiceType');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Plays a Pok\u00c3\u00a9mon cry.");
  }
};
Blockly.JavaScript['bdsp__voice_play'] = function(block) {
  var code = '_VOICE_PLAY(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_VOICE_WAIT'] = { type: 'bdsp__voice_wait', args: 0 };
Blockly.Blocks['bdsp__voice_wait'] = {
  init: function() {
    this.appendDummyInput().appendField('_VOICE_WAIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Waits for a playing Pok\u00c3\u00a9mon cry to finish before continuing.");
  }
};
Blockly.JavaScript['bdsp__voice_wait'] = function(block) {
  var code = '_VOICE_WAIT(';
  code += ')\n';
  return code;
};
commandMap['_WAIT_3D_ANIME'] = { type: 'bdsp__wait_3d_anime', args: 0 };
Blockly.Blocks['bdsp__wait_3d_anime'] = {
  init: function() {
    this.appendDummyInput().appendField('_WAIT_3D_ANIME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__wait_3d_anime'] = function(block) {
  var code = '_WAIT_3D_ANIME(';
  code += ')\n';
  return code;
};
commandMap['_WAIT_CHECK_ONLINE_ACCOUNT'] = { type: 'bdsp__wait_check_online_account', args: 0 };
Blockly.Blocks['bdsp__wait_check_online_account'] = {
  init: function() {
    this.appendDummyInput().appendField('_WAIT_CHECK_ONLINE_ACCOUNT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__wait_check_online_account'] = function(block) {
  var code = '_WAIT_CHECK_ONLINE_ACCOUNT(';
  code += ')\n';
  return code;
};
commandMap['_WAIT_SPECIAL_WIN_LABEL'] = { type: 'bdsp__wait_special_win_label', args: 0 };
Blockly.Blocks['bdsp__wait_special_win_label'] = {
  init: function() {
    this.appendDummyInput().appendField('_WAIT_SPECIAL_WIN_LABEL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__wait_special_win_label'] = function(block) {
  var code = '_WAIT_SPECIAL_WIN_LABEL(';
  code += ')\n';
  return code;
};
commandMap['_WARP_ENABLE_SET'] = { type: 'bdsp__warp_enable_set', args: 0 };
Blockly.Blocks['bdsp__warp_enable_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_WARP_ENABLE_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__warp_enable_set'] = function(block) {
  var code = '_WARP_ENABLE_SET(';
  code += ')\n';
  return code;
};
commandMap['_WARP_END_ANIMATION'] = { type: 'bdsp__warp_end_animation', args: 0 };
Blockly.Blocks['bdsp__warp_end_animation'] = {
  init: function() {
    this.appendDummyInput().appendField('_WARP_END_ANIMATION');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__warp_end_animation'] = function(block) {
  var code = '_WARP_END_ANIMATION(';
  code += ')\n';
  return code;
};
commandMap['_WARP_PANEL_END'] = { type: 'bdsp__warp_panel_end', args: 0 };
Blockly.Blocks['bdsp__warp_panel_end'] = {
  init: function() {
    this.appendDummyInput().appendField('_WARP_PANEL_END');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__warp_panel_end'] = function(block) {
  var code = '_WARP_PANEL_END(';
  code += ')\n';
  return code;
};
commandMap['_WARP_PANEL_START'] = { type: 'bdsp__warp_panel_start', args: 0 };
Blockly.Blocks['bdsp__warp_panel_start'] = {
  init: function() {
    this.appendDummyInput().appendField('_WARP_PANEL_START');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__warp_panel_start'] = function(block) {
  var code = '_WARP_PANEL_START(';
  code += ')\n';
  return code;
};
commandMap['_WARP_START_ANIMATION'] = { type: 'bdsp__warp_start_animation', args: 0 };
Blockly.Blocks['bdsp__warp_start_animation'] = {
  init: function() {
    this.appendDummyInput().appendField('_WARP_START_ANIMATION');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__warp_start_animation'] = function(block) {
  var code = '_WARP_START_ANIMATION(';
  code += ')\n';
  return code;
};
commandMap['_WAZALIST_GET_RESULT'] = { type: 'bdsp__wazalist_get_result', args: 0 };
Blockly.Blocks['bdsp__wazalist_get_result'] = {
  init: function() {
    this.appendDummyInput().appendField('_WAZALIST_GET_RESULT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__wazalist_get_result'] = function(block) {
  var code = '_WAZALIST_GET_RESULT(';
  code += ')\n';
  return code;
};
commandMap['_WAZALIST_SET_PROC'] = { type: 'bdsp__wazalist_set_proc', args: 0 };
Blockly.Blocks['bdsp__wazalist_set_proc'] = {
  init: function() {
    this.appendDummyInput().appendField('_WAZALIST_SET_PROC');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__wazalist_set_proc'] = function(block) {
  var code = '_WAZALIST_SET_PROC(';
  code += ')\n';
  return code;
};
commandMap['_WAZA_COUNT'] = { type: 'bdsp__waza_count', args: 0 };
Blockly.Blocks['bdsp__waza_count'] = {
  init: function() {
    this.appendDummyInput().appendField('_WAZA_COUNT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__waza_count'] = function(block) {
  var code = '_WAZA_COUNT(';
  code += ')\n';
  return code;
};
commandMap['_WAZA_DEL'] = { type: 'bdsp__waza_del', args: 0 };
Blockly.Blocks['bdsp__waza_del'] = {
  init: function() {
    this.appendDummyInput().appendField('_WAZA_DEL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__waza_del'] = function(block) {
  var code = '_WAZA_DEL(';
  code += ')\n';
  return code;
};
commandMap['_WAZA_ITEM_CHK'] = { type: 'bdsp__waza_item_chk', args: 2 };
Blockly.Blocks['bdsp__waza_item_chk'] = {
  init: function() {
    this.appendDummyInput().appendField('_WAZA_ITEM_CHK');
    this.appendValueInput('ARG_0').appendField('Item');
    this.appendValueInput('ARG_1').appendField('Result');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Checks if an item is a TM/HM.");
  }
};
Blockly.JavaScript['bdsp__waza_item_chk'] = function(block) {
  var code = '_WAZA_ITEM_CHK(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_WAZA_NAME'] = { type: 'bdsp__waza_name', args: 0 };
Blockly.Blocks['bdsp__waza_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_WAZA_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__waza_name'] = function(block) {
  var code = '_WAZA_NAME(';
  code += ')\n';
  return code;
};
commandMap['_WHITE_IN'] = { type: 'bdsp__white_in', args: 2 };
Blockly.Blocks['bdsp__white_in'] = {
  init: function() {
    this.appendDummyInput().appendField('_WHITE_IN');
    this.appendValueInput('ARG_0').appendField('Unknown1');
    this.appendValueInput('ARG_1').appendField('Unknown2');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Fades the screen back in from white.");
  }
};
Blockly.JavaScript['bdsp__white_in'] = function(block) {
  var code = '_WHITE_IN(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_WHITE_OUT'] = { type: 'bdsp__white_out', args: 2 };
Blockly.Blocks['bdsp__white_out'] = {
  init: function() {
    this.appendDummyInput().appendField('_WHITE_OUT');
    this.appendValueInput('ARG_0').appendField('Unknown1');
    this.appendValueInput('ARG_1').appendField('Unknown2');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Fades the screen into white.");
  }
};
Blockly.JavaScript['bdsp__white_out'] = function(block) {
  var code = '_WHITE_OUT(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_WIFI_AUTO_REG'] = { type: 'bdsp__wifi_auto_reg', args: 0 };
Blockly.Blocks['bdsp__wifi_auto_reg'] = {
  init: function() {
    this.appendDummyInput().appendField('_WIFI_AUTO_REG');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Registers a friend in the Pal Pad (DP). Likely does nothing.");
  }
};
Blockly.JavaScript['bdsp__wifi_auto_reg'] = function(block) {
  var code = '_WIFI_AUTO_REG(';
  code += ')\n';
  return code;
};
commandMap['_WIFI_EARTH_SET_PROC'] = { type: 'bdsp__wifi_earth_set_proc', args: 2 };
Blockly.Blocks['bdsp__wifi_earth_set_proc'] = {
  init: function() {
    this.appendDummyInput().appendField('_WIFI_EARTH_SET_PROC');
    this.appendValueInput('ARG_0').appendField('Unknown1');
    this.appendValueInput('ARG_1').appendField('Unknown2');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Opens the GWS menu.");
  }
};
Blockly.JavaScript['bdsp__wifi_earth_set_proc'] = function(block) {
  var code = '_WIFI_EARTH_SET_PROC(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_WIFI_HUSIGINAOKURIMONO_OPEN_FLAG_SET'] = { type: 'bdsp__wifi_husiginaokurimono_open_flag_set', args: 0 };
Blockly.Blocks['bdsp__wifi_husiginaokurimono_open_flag_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_WIFI_HUSIGINAOKURIMONO_OPEN_FLAG_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__wifi_husiginaokurimono_open_flag_set'] = function(block) {
  var code = '_WIFI_HUSIGINAOKURIMONO_OPEN_FLAG_SET(';
  code += ')\n';
  return code;
};
commandMap['_WIFI_P2P_MATCH_EVENT_CALL'] = { type: 'bdsp__wifi_p2p_match_event_call', args: 0 };
Blockly.Blocks['bdsp__wifi_p2p_match_event_call'] = {
  init: function() {
    this.appendDummyInput().appendField('_WIFI_P2P_MATCH_EVENT_CALL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__wifi_p2p_match_event_call'] = function(block) {
  var code = '_WIFI_P2P_MATCH_EVENT_CALL(';
  code += ')\n';
  return code;
};
commandMap['_WIFI_P2P_MATCH_SET_DEL'] = { type: 'bdsp__wifi_p2p_match_set_del', args: 0 };
Blockly.Blocks['bdsp__wifi_p2p_match_set_del'] = {
  init: function() {
    this.appendDummyInput().appendField('_WIFI_P2P_MATCH_SET_DEL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__wifi_p2p_match_set_del'] = function(block) {
  var code = '_WIFI_P2P_MATCH_SET_DEL(';
  code += ')\n';
  return code;
};
commandMap['_WILD_BTL_SET'] = { type: 'bdsp__wild_btl_set', args: 0 };
Blockly.Blocks['bdsp__wild_btl_set'] = {
  init: function() {
    this.appendDummyInput().appendField('_WILD_BTL_SET');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__wild_btl_set'] = function(block) {
  var code = '_WILD_BTL_SET(';
  code += ')\n';
  return code;
};
commandMap['_WIPE_FADE_END_CHECK'] = { type: 'bdsp__wipe_fade_end_check', args: 0 };
Blockly.Blocks['bdsp__wipe_fade_end_check'] = {
  init: function() {
    this.appendDummyInput().appendField('_WIPE_FADE_END_CHECK');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Waits for a fade-in or fade-out to end.");
  }
};
Blockly.JavaScript['bdsp__wipe_fade_end_check'] = function(block) {
  var code = '_WIPE_FADE_END_CHECK(';
  code += ')\n';
  return code;
};
commandMap['_WIPE_FADE_START'] = { type: 'bdsp__wipe_fade_start', args: 4 };
Blockly.Blocks['bdsp__wipe_fade_start'] = {
  init: function() {
    this.appendDummyInput().appendField('_WIPE_FADE_START');
    this.appendValueInput('ARG_0').appendField('Unknown1');
    this.appendValueInput('ARG_1').appendField('Unknown2');
    this.appendValueInput('ARG_2').appendField('Unknown3');
    this.appendValueInput('ARG_3').appendField('Unknown4');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unknown use. Only used in unused scripts.");
  }
};
Blockly.JavaScript['bdsp__wipe_fade_start'] = function(block) {
  var code = '_WIPE_FADE_START(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ', ';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_3', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_WIRELESS_ICON_EASY'] = { type: 'bdsp__wireless_icon_easy', args: 0 };
Blockly.Blocks['bdsp__wireless_icon_easy'] = {
  init: function() {
    this.appendDummyInput().appendField('_WIRELESS_ICON_EASY');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__wireless_icon_easy'] = function(block) {
  var code = '_WIRELESS_ICON_EASY(';
  code += ')\n';
  return code;
};
commandMap['_WIRELESS_ICON_EASY_END'] = { type: 'bdsp__wireless_icon_easy_end', args: 0 };
Blockly.Blocks['bdsp__wireless_icon_easy_end'] = {
  init: function() {
    this.appendDummyInput().appendField('_WIRELESS_ICON_EASY_END');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__wireless_icon_easy_end'] = function(block) {
  var code = '_WIRELESS_ICON_EASY_END(';
  code += ')\n';
  return code;
};
commandMap['_WORLDTRADE_SET_PROC'] = { type: 'bdsp__worldtrade_set_proc', args: 0 };
Blockly.Blocks['bdsp__worldtrade_set_proc'] = {
  init: function() {
    this.appendDummyInput().appendField('_WORLDTRADE_SET_PROC');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Unused.");
  }
};
Blockly.JavaScript['bdsp__worldtrade_set_proc'] = function(block) {
  var code = '_WORLDTRADE_SET_PROC(';
  code += ')\n';
  return code;
};
commandMap['_YES_NO_WIN'] = { type: 'bdsp__yes_no_win', args: 1 };
Blockly.Blocks['bdsp__yes_no_win'] = {
  init: function() {
    this.appendDummyInput().appendField('_YES_NO_WIN');
    this.appendValueInput('ARG_0').appendField('Result');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Opens a Yes/No choice window, then puts the result in a variable.");
  }
};
Blockly.JavaScript['bdsp__yes_no_win'] = function(block) {
  var code = '_YES_NO_WIN(';
  var val = Blockly.JavaScript.valueToCode(block, 'ARG_0', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  val = val.replace(/^'|'$/g, '');
  code += val;
  code += ')\n';
  return code;
};
commandMap['_ZENKOKU_ZUKAN_FLAG'] = { type: 'bdsp__zenkoku_zukan_flag', args: 0 };
Blockly.Blocks['bdsp__zenkoku_zukan_flag'] = {
  init: function() {
    this.appendDummyInput().appendField('_ZENKOKU_ZUKAN_FLAG');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__zenkoku_zukan_flag'] = function(block) {
  var code = '_ZENKOKU_ZUKAN_FLAG(';
  code += ')\n';
  return code;
};
commandMap['_ZENKOKU_ZUKAN_GET_NUM'] = { type: 'bdsp__zenkoku_zukan_get_num', args: 0 };
Blockly.Blocks['bdsp__zenkoku_zukan_get_num'] = {
  init: function() {
    this.appendDummyInput().appendField('_ZENKOKU_ZUKAN_GET_NUM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__zenkoku_zukan_get_num'] = function(block) {
  var code = '_ZENKOKU_ZUKAN_GET_NUM(';
  code += ')\n';
  return code;
};
commandMap['_ZENKOKU_ZUKAN_SEE_NUM'] = { type: 'bdsp__zenkoku_zukan_see_num', args: 0 };
Blockly.Blocks['bdsp__zenkoku_zukan_see_num'] = {
  init: function() {
    this.appendDummyInput().appendField('_ZENKOKU_ZUKAN_SEE_NUM');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__zenkoku_zukan_see_num'] = function(block) {
  var code = '_ZENKOKU_ZUKAN_SEE_NUM(';
  code += ')\n';
  return code;
};
commandMap['_ZISHIN'] = { type: 'bdsp__zishin', args: 0 };
Blockly.Blocks['bdsp__zishin'] = {
  init: function() {
    this.appendDummyInput().appendField('_ZISHIN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__zishin'] = function(block) {
  var code = '_ZISHIN(';
  code += ')\n';
  return code;
};
commandMap['_ZONE_NAME'] = { type: 'bdsp__zone_name', args: 0 };
Blockly.Blocks['bdsp__zone_name'] = {
  init: function() {
    this.appendDummyInput().appendField('_ZONE_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__zone_name'] = function(block) {
  var code = '_ZONE_NAME(';
  code += ')\n';
  return code;
};
commandMap['_ZONE_NAME2'] = { type: 'bdsp__zone_name2', args: 0 };
Blockly.Blocks['bdsp__zone_name2'] = {
  init: function() {
    this.appendDummyInput().appendField('_ZONE_NAME2');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__zone_name2'] = function(block) {
  var code = '_ZONE_NAME2(';
  code += ')\n';
  return code;
};
commandMap['_ZONE_NAME_LABEL'] = { type: 'bdsp__zone_name_label', args: 0 };
Blockly.Blocks['bdsp__zone_name_label'] = {
  init: function() {
    this.appendDummyInput().appendField('_ZONE_NAME_LABEL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__zone_name_label'] = function(block) {
  var code = '_ZONE_NAME_LABEL(';
  code += ')\n';
  return code;
};
commandMap['_ZUKAN_CHK_NATIONAL'] = { type: 'bdsp__zukan_chk_national', args: 0 };
Blockly.Blocks['bdsp__zukan_chk_national'] = {
  init: function() {
    this.appendDummyInput().appendField('_ZUKAN_CHK_NATIONAL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__zukan_chk_national'] = function(block) {
  var code = '_ZUKAN_CHK_NATIONAL(';
  code += ')\n';
  return code;
};
commandMap['_ZUKAN_CHK_SHINOU'] = { type: 'bdsp__zukan_chk_shinou', args: 0 };
Blockly.Blocks['bdsp__zukan_chk_shinou'] = {
  init: function() {
    this.appendDummyInput().appendField('_ZUKAN_CHK_SHINOU');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__zukan_chk_shinou'] = function(block) {
  var code = '_ZUKAN_CHK_SHINOU(';
  code += ')\n';
  return code;
};
commandMap['_ZUKAN_RECONGNIZE_NATIONAL'] = { type: 'bdsp__zukan_recongnize_national', args: 0 };
Blockly.Blocks['bdsp__zukan_recongnize_national'] = {
  init: function() {
    this.appendDummyInput().appendField('_ZUKAN_RECONGNIZE_NATIONAL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__zukan_recongnize_national'] = function(block) {
  var code = '_ZUKAN_RECONGNIZE_NATIONAL(';
  code += ')\n';
  return code;
};
commandMap['_ZUKAN_RECONGNIZE_SHINOU'] = { type: 'bdsp__zukan_recongnize_shinou', args: 0 };
Blockly.Blocks['bdsp__zukan_recongnize_shinou'] = {
  init: function() {
    this.appendDummyInput().appendField('_ZUKAN_RECONGNIZE_SHINOU');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__zukan_recongnize_shinou'] = function(block) {
  var code = '_ZUKAN_RECONGNIZE_SHINOU(';
  code += ')\n';
  return code;
};
commandMap['_ZUKAN_SEX_VER_UP'] = { type: 'bdsp__zukan_sex_ver_up', args: 0 };
Blockly.Blocks['bdsp__zukan_sex_ver_up'] = {
  init: function() {
    this.appendDummyInput().appendField('_ZUKAN_SEX_VER_UP');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__zukan_sex_ver_up'] = function(block) {
  var code = '_ZUKAN_SEX_VER_UP(';
  code += ')\n';
  return code;
};
commandMap['_ZUKAN_TEXT_VER_UP'] = { type: 'bdsp__zukan_text_ver_up', args: 0 };
Blockly.Blocks['bdsp__zukan_text_ver_up'] = {
  init: function() {
    this.appendDummyInput().appendField('_ZUKAN_TEXT_VER_UP');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__zukan_text_ver_up'] = function(block) {
  var code = '_ZUKAN_TEXT_VER_UP(';
  code += ')\n';
  return code;
};
commandMap['_ZUKAN_TOUROKU'] = { type: 'bdsp__zukan_touroku', args: 0 };
Blockly.Blocks['bdsp__zukan_touroku'] = {
  init: function() {
    this.appendDummyInput().appendField('_ZUKAN_TOUROKU');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__zukan_touroku'] = function(block) {
  var code = '_ZUKAN_TOUROKU(';
  code += ')\n';
  return code;
};
commandMap['_ZUKAN_TOUROKU_WAIT'] = { type: 'bdsp__zukan_touroku_wait', args: 0 };
Blockly.Blocks['bdsp__zukan_touroku_wait'] = {
  init: function() {
    this.appendDummyInput().appendField('_ZUKAN_TOUROKU_WAIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
  }
};
Blockly.JavaScript['bdsp__zukan_touroku_wait'] = function(block) {
  var code = '_ZUKAN_TOUROKU_WAIT(';
  code += ')\n';
  return code;
};
var TOOLBOX_XML = '<xml>';
TOOLBOX_XML += '<category name="Logic" colour="210">';
TOOLBOX_XML += '<block type="controls_if"></block>';
TOOLBOX_XML += '<block type="logic_compare"></block>';
TOOLBOX_XML += '<block type="math_number"></block>';
TOOLBOX_XML += '<block type="text"></block>';
TOOLBOX_XML += '</category>';
TOOLBOX_XML += '<category name="Commands" colour="230">';
TOOLBOX_XML += '<block type="bdsp__set_weather"></block>';
TOOLBOX_XML += '<block type="bdsp__first_poke_select_proc"></block>';
TOOLBOX_XML += '<block type="bdsp__first_poke_no_get"></block>';
TOOLBOX_XML += '<block type="bdsp__temoti_formno"></block>';
TOOLBOX_XML += '<block type="bdsp__temoti_box_formno"></block>';
TOOLBOX_XML += '<block type="bdsp__get_box_poke_seikaku"></block>';
TOOLBOX_XML += '<block type="bdsp__release_box_poke"></block>';
TOOLBOX_XML += '<block type="bdsp__toggle_collision_box"></block>';
TOOLBOX_XML += '<block type="bdsp__install_check"></block>';
TOOLBOX_XML += '<block type="bdsp__set_player_color_index"></block>';
TOOLBOX_XML += '<block type="bdsp__rival_poke_no_get"></block>';
TOOLBOX_XML += '<block type="bdsp__support_poke_no_get"></block>';
TOOLBOX_XML += '<block type="bdsp__first_monsno_formno"></block>';
TOOLBOX_XML += '<block type="bdsp__rival_monsno_formno"></block>';
TOOLBOX_XML += '<block type="bdsp__support_monsno_formno"></block>';
TOOLBOX_XML += '<block type="bdsp__change_formno"></block>';
TOOLBOX_XML += '<block type="bdsp__get_costume_gender"></block>';
TOOLBOX_XML += '<block type="bdsp__case_call"></block>';
TOOLBOX_XML += '<block type="bdsp__add_pokemon_ui_extra"></block>';
TOOLBOX_XML += '<block type="bdsp__get_costume_gender"></block>';
TOOLBOX_XML += '<block type="bdsp__pokemon_name_form"></block>';
TOOLBOX_XML += '<block type="bdsp__set_ayou_name"></block>';
TOOLBOX_XML += '<block type="bdsp__ayou_name"></block>';
TOOLBOX_XML += '<block type="bdsp__get_caught_location"></block>';
TOOLBOX_XML += '<block type="bdsp__check_tutor_move"></block>';
TOOLBOX_XML += '<block type="bdsp__move_tutor_ui"></block>';
TOOLBOX_XML += '<block type="bdsp__get_highest_radar_streak"></block>';
TOOLBOX_XML += '<block type="bdsp__get_tile_attribute"></block>';
TOOLBOX_XML += '<block type="bdsp__event_entity_clip_play_by_index"></block>';
TOOLBOX_XML += '<block type="bdsp__event_entity_clip_wait_by_index"></block>';
TOOLBOX_XML += '<block type="bdsp__entity_move"></block>';
TOOLBOX_XML += '<block type="bdsp__mult_wk"></block>';
TOOLBOX_XML += '<block type="bdsp__div_wk"></block>';
TOOLBOX_XML += '<block type="bdsp__ifcoords_jump"></block>';
TOOLBOX_XML += '<block type="bdsp__ifcoords_call"></block>';
TOOLBOX_XML += '<block type="bdsp__load_move_tutor_table"></block>';
TOOLBOX_XML += '<block type="bdsp__get_dex_status"></block>';
TOOLBOX_XML += '<block type="bdsp__debug_log"></block>';
TOOLBOX_XML += '<block type="bdsp__door_exit_label_set"></block>';
TOOLBOX_XML += '<block type="bdsp__give_poffin"></block>';
TOOLBOX_XML += '<block type="bdsp__select_poffin_ui"></block>';
TOOLBOX_XML += '<block type="bdsp__get_poffin_flavor_name"></block>';
TOOLBOX_XML += '<block type="bdsp__get_poffin_flavor"></block>';
TOOLBOX_XML += '<block type="bdsp__del_poffin"></block>';
TOOLBOX_XML += '<block type="bdsp__trainer_defeated_count"></block>';
TOOLBOX_XML += '<block type="bdsp__attach_transform"></block>';
TOOLBOX_XML += '<block type="bdsp__gameobject_rotate"></block>';
TOOLBOX_XML += '<block type="bdsp__ledge_jump"></block>';
TOOLBOX_XML += '<block type="bdsp__jump_and_rotate"></block>';
TOOLBOX_XML += '<block type="bdsp_acmd_end"></block>';
TOOLBOX_XML += '<block type="bdsp_acmd_not"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_anime_duration"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_anm_pause_off"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_anm_pause_on"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_dir_d"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_dir_down_center"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_dir_l"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_dir_left_center"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_dir_pause_off"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_dir_pause_on"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_dir_r"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_dir_right_center"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_dir_u"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_dir_up_center"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_dir_val"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_down"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_down_center"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_face_index"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_hero_banzai"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_hero_banzai_uke"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_hero_match_x"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_hero_match_z"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_hide_pulloff"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_index_anime"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_index_anime_wait"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_invisible_off"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_invisible_on"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_left"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_left_center"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_loop"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_mark_emo"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_mark_gyoe"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_mark_saisen"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_neck_rotate"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_offset"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_pc_bow"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_right"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_right_center"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_stop_walk_anime"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_up"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_up_center"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_vanish_off"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_vanish_on"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_wait"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_world_x"></block>';
TOOLBOX_XML += '<block type="bdsp_ac_world_z"></block>';
TOOLBOX_XML += '<block type="bdsp_cmd_name_end"></block>';
TOOLBOX_XML += '<block type="bdsp__2vs2_battle_check"></block>';
TOOLBOX_XML += '<block type="bdsp__ab_keywait"></block>';
TOOLBOX_XML += '<block type="bdsp__ab_key_time_wait"></block>';
TOOLBOX_XML += '<block type="bdsp__acce_name"></block>';
TOOLBOX_XML += '<block type="bdsp__acce_shop_call"></block>';
TOOLBOX_XML += '<block type="bdsp__ac_anim_lock"></block>';
TOOLBOX_XML += '<block type="bdsp__ac_anim_release"></block>';
TOOLBOX_XML += '<block type="bdsp__add_box_item"></block>';
TOOLBOX_XML += '<block type="bdsp__add_coin"></block>';
TOOLBOX_XML += '<block type="bdsp__add_coin_chk"></block>';
TOOLBOX_XML += '<block type="bdsp__add_custum_win_label"></block>';
TOOLBOX_XML += '<block type="bdsp__add_custum_win_label_two_window"></block>';
TOOLBOX_XML += '<block type="bdsp__add_custum_win_label_word_set"></block>';
TOOLBOX_XML += '<block type="bdsp__add_gold"></block>';
TOOLBOX_XML += '<block type="bdsp__add_goods"></block>';
TOOLBOX_XML += '<block type="bdsp__add_goods_chk"></block>';
TOOLBOX_XML += '<block type="bdsp__add_item"></block>';
TOOLBOX_XML += '<block type="bdsp__add_item_chk"></block>';
TOOLBOX_XML += '<block type="bdsp__add_maroyaka_poffin"></block>';
TOOLBOX_XML += '<block type="bdsp__add_move_poke"></block>';
TOOLBOX_XML += '<block type="bdsp__add_natsuki"></block>';
TOOLBOX_XML += '<block type="bdsp__add_pokemon"></block>';
TOOLBOX_XML += '<block type="bdsp__add_pokemon_ui"></block>';
TOOLBOX_XML += '<block type="bdsp__add_score"></block>';
TOOLBOX_XML += '<block type="bdsp__add_tama"></block>';
TOOLBOX_XML += '<block type="bdsp__add_tamago"></block>';
TOOLBOX_XML += '<block type="bdsp__add_tama_chk"></block>';
TOOLBOX_XML += '<block type="bdsp__add_trap"></block>';
TOOLBOX_XML += '<block type="bdsp__add_trap_chk"></block>';
TOOLBOX_XML += '<block type="bdsp__add_treasure"></block>';
TOOLBOX_XML += '<block type="bdsp__add_treasure_chk"></block>';
TOOLBOX_XML += '<block type="bdsp__add_ug_item"></block>';
TOOLBOX_XML += '<block type="bdsp__add_unique_pokemon_ui"></block>';
TOOLBOX_XML += '<block type="bdsp__add_waiticon"></block>';
TOOLBOX_XML += '<block type="bdsp__add_waza"></block>';
TOOLBOX_XML += '<block type="bdsp__add_wk"></block>';
TOOLBOX_XML += '<block type="bdsp__agb_cartridge_ver_get"></block>';
TOOLBOX_XML += '<block type="bdsp__ag_transition_hoyuta"></block>';
TOOLBOX_XML += '<block type="bdsp__aikotoba_kabegami_set"></block>';
TOOLBOX_XML += '<block type="bdsp__aikotoba_okurimono_chk"></block>';
TOOLBOX_XML += '<block type="bdsp__ak_lisner_pos"></block>';
TOOLBOX_XML += '<block type="bdsp__ak_lisner_rot"></block>';
TOOLBOX_XML += '<block type="bdsp__ak_lisner_tra"></block>';
TOOLBOX_XML += '<block type="bdsp__all_monsno"></block>';
TOOLBOX_XML += '<block type="bdsp__all_mons_own_chk"></block>';
TOOLBOX_XML += '<block type="bdsp__amaikaori"></block>';
TOOLBOX_XML += '<block type="bdsp__amaimitu"></block>';
TOOLBOX_XML += '<block type="bdsp__ananukenohimo"></block>';
TOOLBOX_XML += '<block type="bdsp__anawohoru"></block>';
TOOLBOX_XML += '<block type="bdsp__anime_data"></block>';
TOOLBOX_XML += '<block type="bdsp__anime_label"></block>';
TOOLBOX_XML += '<block type="bdsp__anoon_see_num"></block>';
TOOLBOX_XML += '<block type="bdsp__approve_poison_dead"></block>';
TOOLBOX_XML += '<block type="bdsp__arrive_flag_set"></block>';
TOOLBOX_XML += '<block type="bdsp__ashiato_chk"></block>';
TOOLBOX_XML += '<block type="bdsp__ausu_item_check"></block>';
TOOLBOX_XML += '<block type="bdsp__auto_msg"></block>';
TOOLBOX_XML += '<block type="bdsp__auto_msg_stop"></block>';
TOOLBOX_XML += '<block type="bdsp__auto_save"></block>';
TOOLBOX_XML += '<block type="bdsp__auto_save_back_up_on"></block>';
TOOLBOX_XML += '<block type="bdsp__auto_tanken_set"></block>';
TOOLBOX_XML += '<block type="bdsp__auto_tanken_set_wait"></block>';
TOOLBOX_XML += '<block type="bdsp__azukariya_discard_egg"></block>';
TOOLBOX_XML += '<block type="bdsp__azukariya_exist_egg"></block>';
TOOLBOX_XML += '<block type="bdsp__azukariya_get_egg"></block>';
TOOLBOX_XML += '<block type="bdsp__azukariya_get_stored_monsno"></block>';
TOOLBOX_XML += '<block type="bdsp__azukariya_get_stored_sex"></block>';
TOOLBOX_XML += '<block type="bdsp__azukariya_love_level"></block>';
TOOLBOX_XML += '<block type="bdsp__azukariya_oldman_init"></block>';
TOOLBOX_XML += '<block type="bdsp__azukariya_restore"></block>';
TOOLBOX_XML += '<block type="bdsp__azukariya_set_stored_info_str"></block>';
TOOLBOX_XML += '<block type="bdsp__azukariya_set_stored_name"></block>';
TOOLBOX_XML += '<block type="bdsp__azukariya_store"></block>';
TOOLBOX_XML += '<block type="bdsp__azukariya_stored_count"></block>';
TOOLBOX_XML += '<block type="bdsp__azukariya_store_ui"></block>';
TOOLBOX_XML += '<block type="bdsp__azukariya_take_over_poke"></block>';
TOOLBOX_XML += '<block type="bdsp__badge_get"></block>';
TOOLBOX_XML += '<block type="bdsp__bag_get_result"></block>';
TOOLBOX_XML += '<block type="bdsp__bag_set_proc_kinomi"></block>';
TOOLBOX_XML += '<block type="bdsp__bag_set_proc_normal"></block>';
TOOLBOX_XML += '<block type="bdsp__bgm_fadein"></block>';
TOOLBOX_XML += '<block type="bdsp__bgm_fadeout"></block>';
TOOLBOX_XML += '<block type="bdsp__bgm_fadeout_play"></block>';
TOOLBOX_XML += '<block type="bdsp__bgm_now_map_play"></block>';
TOOLBOX_XML += '<block type="bdsp__bgm_play"></block>';
TOOLBOX_XML += '<block type="bdsp__bgm_player_pause"></block>';
TOOLBOX_XML += '<block type="bdsp__bgm_play_check"></block>';
TOOLBOX_XML += '<block type="bdsp__bgm_special_clr"></block>';
TOOLBOX_XML += '<block type="bdsp__bgm_special_set"></block>';
TOOLBOX_XML += '<block type="bdsp__bgm_stop"></block>';
TOOLBOX_XML += '<block type="bdsp__bg_id_jump"></block>';
TOOLBOX_XML += '<block type="bdsp__bg_scroll"></block>';
TOOLBOX_XML += '<block type="bdsp__bicycle_check"></block>';
TOOLBOX_XML += '<block type="bdsp__bicycle_color_get"></block>';
TOOLBOX_XML += '<block type="bdsp__bicycle_color_set"></block>';
TOOLBOX_XML += '<block type="bdsp__bicycle_req"></block>';
TOOLBOX_XML += '<block type="bdsp__bicycle_req_non_bgm"></block>';
TOOLBOX_XML += '<block type="bdsp__birth_day_check"></block>';
TOOLBOX_XML += '<block type="bdsp__birth_day_input"></block>';
TOOLBOX_XML += '<block type="bdsp__birth_mounth_input"></block>';
TOOLBOX_XML += '<block type="bdsp__black_in"></block>';
TOOLBOX_XML += '<block type="bdsp__black_out"></block>';
TOOLBOX_XML += '<block type="bdsp__bmplist_init"></block>';
TOOLBOX_XML += '<block type="bdsp__bmplist_init_ex"></block>';
TOOLBOX_XML += '<block type="bdsp__bmplist_make_list"></block>';
TOOLBOX_XML += '<block type="bdsp__bmplist_start"></block>';
TOOLBOX_XML += '<block type="bdsp__bmpmenu_hv_start"></block>';
TOOLBOX_XML += '<block type="bdsp__bmpmenu_init"></block>';
TOOLBOX_XML += '<block type="bdsp__bmpmenu_init_ex"></block>';
TOOLBOX_XML += '<block type="bdsp__bmpmenu_make_list"></block>';
TOOLBOX_XML += '<block type="bdsp__bmpmenu_make_list16"></block>';
TOOLBOX_XML += '<block type="bdsp__bmpmenu_start"></block>';
TOOLBOX_XML += '<block type="bdsp__board_end_wait"></block>';
TOOLBOX_XML += '<block type="bdsp__board_make"></block>';
TOOLBOX_XML += '<block type="bdsp__board_msg"></block>';
TOOLBOX_XML += '<block type="bdsp__board_req"></block>';
TOOLBOX_XML += '<block type="bdsp__board_req_wait"></block>';
TOOLBOX_XML += '<block type="bdsp__boukennooto_tips_open"></block>';
TOOLBOX_XML += '<block type="bdsp__boukennooto_tips_wait"></block>';
TOOLBOX_XML += '<block type="bdsp__box_open_normal"></block>';
TOOLBOX_XML += '<block type="bdsp__box_open_select"></block>';
TOOLBOX_XML += '<block type="bdsp__box_seal_ui_wait"></block>';
TOOLBOX_XML += '<block type="bdsp__box_set_proc"></block>';
TOOLBOX_XML += '<block type="bdsp__btl_encseq_load"></block>';
TOOLBOX_XML += '<block type="bdsp__btl_point_add"></block>';
TOOLBOX_XML += '<block type="bdsp__btl_point_sub"></block>';
TOOLBOX_XML += '<block type="bdsp__btl_point_win_del"></block>';
TOOLBOX_XML += '<block type="bdsp__btl_point_win_write"></block>';
TOOLBOX_XML += '<block type="bdsp__btl_point_write"></block>';
TOOLBOX_XML += '<block type="bdsp__btl_searcher_dir_mv_set"></block>';
TOOLBOX_XML += '<block type="bdsp__btl_searcher_event_call"></block>';
TOOLBOX_XML += '<block type="bdsp__btower_app_call"></block>';
TOOLBOX_XML += '<block type="bdsp__btower_app_wait"></block>';
TOOLBOX_XML += '<block type="bdsp__btower_get_leader_roomid"></block>';
TOOLBOX_XML += '<block type="bdsp__btower_is_leader_exist"></block>';
TOOLBOX_XML += '<block type="bdsp__btower_prizeman_set"></block>';
TOOLBOX_XML += '<block type="bdsp__btower_prize_get"></block>';
TOOLBOX_XML += '<block type="bdsp__btower_recv_buf"></block>';
TOOLBOX_XML += '<block type="bdsp__btower_send_buf"></block>';
TOOLBOX_XML += '<block type="bdsp__btower_seven_poke_get"></block>';
TOOLBOX_XML += '<block type="bdsp__btower_tools"></block>';
TOOLBOX_XML += '<block type="bdsp__btower_work_clear"></block>';
TOOLBOX_XML += '<block type="bdsp__btower_work_init"></block>';
TOOLBOX_XML += '<block type="bdsp__btower_work_release"></block>';
TOOLBOX_XML += '<block type="bdsp__btwr_deb_is_work_null"></block>';
TOOLBOX_XML += '<block type="bdsp__btwr_player_win_check"></block>';
TOOLBOX_XML += '<block type="bdsp__btwr_sub_add_battle_point"></block>';
TOOLBOX_XML += '<block type="bdsp__btwr_sub_add_battle_point_manual"></block>';
TOOLBOX_XML += '<block type="bdsp__btwr_sub_add_lose"></block>';
TOOLBOX_XML += '<block type="bdsp__btwr_sub_btl_trainer_set"></block>';
TOOLBOX_XML += '<block type="bdsp__btwr_sub_chk_entry_poke"></block>';
TOOLBOX_XML += '<block type="bdsp__btwr_sub_choice_btl_partner"></block>';
TOOLBOX_XML += '<block type="bdsp__btwr_sub_get_entry_poke"></block>';
TOOLBOX_XML += '<block type="bdsp__btwr_sub_get_leader_clear_flag"></block>';
TOOLBOX_XML += '<block type="bdsp__btwr_sub_get_mine_obj"></block>';
TOOLBOX_XML += '<block type="bdsp__btwr_sub_get_now_round"></block>';
TOOLBOX_XML += '<block type="bdsp__btwr_sub_get_play_mode"></block>';
TOOLBOX_XML += '<block type="bdsp__btwr_sub_get_rank"></block>';
TOOLBOX_XML += '<block type="bdsp__btwr_sub_get_renshou_cnt"></block>';
TOOLBOX_XML += '<block type="bdsp__btwr_sub_inc_round"></block>';
TOOLBOX_XML += '<block type="bdsp__btwr_sub_is_clear"></block>';
TOOLBOX_XML += '<block type="bdsp__btwr_sub_local_btl_call"></block>';
TOOLBOX_XML += '<block type="bdsp__btwr_sub_rank_down_lose"></block>';
TOOLBOX_XML += '<block type="bdsp__btwr_sub_rank_down_lose_reset"></block>';
TOOLBOX_XML += '<block type="bdsp__btwr_sub_renshou_ribbon_set"></block>';
TOOLBOX_XML += '<block type="bdsp__btwr_sub_select_poke"></block>';
TOOLBOX_XML += '<block type="bdsp__btwr_sub_set_leader_clear_flag"></block>';
TOOLBOX_XML += '<block type="bdsp__btwr_sub_set_score"></block>';
TOOLBOX_XML += '<block type="bdsp__btwr_sub_update_random"></block>';
TOOLBOX_XML += '<block type="bdsp__btwr_tool_chk_entry_poke_num"></block>';
TOOLBOX_XML += '<block type="bdsp__btwr_tool_clear_play_data"></block>';
TOOLBOX_XML += '<block type="bdsp__btwr_tool_get_wifi_rank"></block>';
TOOLBOX_XML += '<block type="bdsp__btwr_tool_pop_now_location"></block>';
TOOLBOX_XML += '<block type="bdsp__btwr_tool_push_now_location"></block>';
TOOLBOX_XML += '<block type="bdsp__btwr_tool_set_now_win"></block>';
TOOLBOX_XML += '<block type="bdsp__btwr_tool_set_play_mode"></block>';
TOOLBOX_XML += '<block type="bdsp__btwr_tool_set_rank"></block>';
TOOLBOX_XML += '<block type="bdsp__c08r0801scopecameraset"></block>';
TOOLBOX_XML += '<block type="bdsp__c08r0801scopecamera_sequence"></block>';
TOOLBOX_XML += '<block type="bdsp__call"></block>';
TOOLBOX_XML += '<block type="bdsp__call_effect"></block>';
TOOLBOX_XML += '<block type="bdsp__call_effect_obj"></block>';
TOOLBOX_XML += '<block type="bdsp__call_safari_scope"></block>';
TOOLBOX_XML += '<block type="bdsp__call_ship_demo"></block>';
TOOLBOX_XML += '<block type="bdsp__call_ship_demo_sea_map"></block>';
TOOLBOX_XML += '<block type="bdsp__call_waza_omoidashi_ui"></block>';
TOOLBOX_XML += '<block type="bdsp__call_waza_oshie_ui"></block>';
TOOLBOX_XML += '<block type="bdsp__call_waza_wasure_ui"></block>';
TOOLBOX_XML += '<block type="bdsp__camera_controller_end"></block>';
TOOLBOX_XML += '<block type="bdsp__camera_controller_is_null"></block>';
TOOLBOX_XML += '<block type="bdsp__camera_controller_play"></block>';
TOOLBOX_XML += '<block type="bdsp__camera_controller_wait"></block>';
TOOLBOX_XML += '<block type="bdsp__camera_cos_angle_wait"></block>';
TOOLBOX_XML += '<block type="bdsp__camera_set_cos_angle"></block>';
TOOLBOX_XML += '<block type="bdsp__camera_shake"></block>';
TOOLBOX_XML += '<block type="bdsp__camera_target_dummy"></block>';
TOOLBOX_XML += '<block type="bdsp__camera_target_hero"></block>';
TOOLBOX_XML += '<block type="bdsp__capture_btl_set"></block>';
TOOLBOX_XML += '<block type="bdsp__case_cancel"></block>';
TOOLBOX_XML += '<block type="bdsp__case_jump"></block>';
TOOLBOX_XML += '<block type="bdsp__casset_version_get"></block>';
TOOLBOX_XML += '<block type="bdsp__cb_item_num_add"></block>';
TOOLBOX_XML += '<block type="bdsp__cb_item_num_get"></block>';
TOOLBOX_XML += '<block type="bdsp__cb_seal_kind_num_get"></block>';
TOOLBOX_XML += '<block type="bdsp__change_fashion_req"></block>';
TOOLBOX_XML += '<block type="bdsp__chara_look_lock"></block>';
TOOLBOX_XML += '<block type="bdsp__chara_look_release"></block>';
TOOLBOX_XML += '<block type="bdsp__checkminomuchicomp"></block>';
TOOLBOX_XML += '<block type="bdsp__check_can_seed_water"></block>';
TOOLBOX_XML += '<block type="bdsp__check_fld_lift"></block>';
TOOLBOX_XML += '<block type="bdsp__check_my_gsid"></block>';
TOOLBOX_XML += '<block type="bdsp__check_online_account"></block>';
TOOLBOX_XML += '<block type="bdsp__check_pocket"></block>';
TOOLBOX_XML += '<block type="bdsp__check_pofin"></block>';
TOOLBOX_XML += '<block type="bdsp__check_safari_train"></block>';
TOOLBOX_XML += '<block type="bdsp__check_secret_base_expantion"></block>';
TOOLBOX_XML += '<block type="bdsp__check_waza_oshie"></block>';
TOOLBOX_XML += '<block type="bdsp__check_waza_oshie_all"></block>';
TOOLBOX_XML += '<block type="bdsp__chg_common_scr"></block>';
TOOLBOX_XML += '<block type="bdsp__chg_local_scr"></block>';
TOOLBOX_XML += '<block type="bdsp__chg_poke_waza"></block>';
TOOLBOX_XML += '<block type="bdsp__chk_box_item"></block>';
TOOLBOX_XML += '<block type="bdsp__chk_poke_seikaku_all"></block>';
TOOLBOX_XML += '<block type="bdsp__chk_poke_waza"></block>';
TOOLBOX_XML += '<block type="bdsp__chk_poke_waza_group"></block>';
TOOLBOX_XML += '<block type="bdsp__chk_prmexp"></block>';
TOOLBOX_XML += '<block type="bdsp__chk_ribbon"></block>';
TOOLBOX_XML += '<block type="bdsp__chk_ribbon_count"></block>';
TOOLBOX_XML += '<block type="bdsp__chk_ribbon_count_all"></block>';
TOOLBOX_XML += '<block type="bdsp__chk_temoti_pokerus"></block>';
TOOLBOX_XML += '<block type="bdsp__chk_week"></block>';
TOOLBOX_XML += '<block type="bdsp__chk_zenkoku_zukan"></block>';
TOOLBOX_XML += '<block type="bdsp__chk_zukan_touroku"></block>';
TOOLBOX_XML += '<block type="bdsp__climax_demo"></block>';
TOOLBOX_XML += '<block type="bdsp__clip_consavedata_check"></block>';
TOOLBOX_XML += '<block type="bdsp__clip_tvsavedata_check"></block>';
TOOLBOX_XML += '<block type="bdsp__clip_tv_title_save"></block>';
TOOLBOX_XML += '<block type="bdsp__cmpval"></block>';
TOOLBOX_XML += '<block type="bdsp__cmpwk"></block>';
TOOLBOX_XML += '<block type="bdsp__coin_win_del"></block>';
TOOLBOX_XML += '<block type="bdsp__coin_win_write"></block>';
TOOLBOX_XML += '<block type="bdsp__coin_write"></block>';
TOOLBOX_XML += '<block type="bdsp__colosseum_map_change_in"></block>';
TOOLBOX_XML += '<block type="bdsp__colosseum_map_change_out"></block>';
TOOLBOX_XML += '<block type="bdsp__comm_direct_end"></block>';
TOOLBOX_XML += '<block type="bdsp__comm_direct_end_timing"></block>';
TOOLBOX_XML += '<block type="bdsp__comm_direct_enter_btl_room"></block>';
TOOLBOX_XML += '<block type="bdsp__comm_get_current_id"></block>';
TOOLBOX_XML += '<block type="bdsp__comm_player_set_dir"></block>';
TOOLBOX_XML += '<block type="bdsp__comm_reset"></block>';
TOOLBOX_XML += '<block type="bdsp__comm_synchronize"></block>';
TOOLBOX_XML += '<block type="bdsp__comp_btl_point"></block>';
TOOLBOX_XML += '<block type="bdsp__comp_coin"></block>';
TOOLBOX_XML += '<block type="bdsp__comp_gold"></block>';
TOOLBOX_XML += '<block type="bdsp__comp_my_gold"></block>';
TOOLBOX_XML += '<block type="bdsp__comp_wk_coin"></block>';
TOOLBOX_XML += '<block type="bdsp__consio_timing_check"></block>';
TOOLBOX_XML += '<block type="bdsp__consio_timing_send"></block>';
TOOLBOX_XML += '<block type="bdsp__contest_proc"></block>';
TOOLBOX_XML += '<block type="bdsp__con_acce_no_get"></block>';
TOOLBOX_XML += '<block type="bdsp__con_best_performer_check"></block>';
TOOLBOX_XML += '<block type="bdsp__con_breeder_name_get"></block>';
TOOLBOX_XML += '<block type="bdsp__con_camera_flash_check"></block>';
TOOLBOX_XML += '<block type="bdsp__con_camera_flash_set"></block>';
TOOLBOX_XML += '<block type="bdsp__con_category_and_rank_set"></block>';
TOOLBOX_XML += '<block type="bdsp__con_category_name"></block>';
TOOLBOX_XML += '<block type="bdsp__con_category_ribbon_name_set"></block>';
TOOLBOX_XML += '<block type="bdsp__con_check_entry_poke"></block>';
TOOLBOX_XML += '<block type="bdsp__con_contest_star_name_set"></block>';
TOOLBOX_XML += '<block type="bdsp__con_desk_mode_get"></block>';
TOOLBOX_XML += '<block type="bdsp__con_ending_skip_check"></block>';
TOOLBOX_XML += '<block type="bdsp__con_entry_param_get"></block>';
TOOLBOX_XML += '<block type="bdsp__con_have_contest_star_check"></block>';
TOOLBOX_XML += '<block type="bdsp__con_have_ribbon_check"></block>';
TOOLBOX_XML += '<block type="bdsp__con_hblank_start"></block>';
TOOLBOX_XML += '<block type="bdsp__con_hblank_stop"></block>';
TOOLBOX_XML += '<block type="bdsp__con_hero_change"></block>';
TOOLBOX_XML += '<block type="bdsp__con_judge_name_get"></block>';
TOOLBOX_XML += '<block type="bdsp__con_msgprint_flag_reset"></block>';
TOOLBOX_XML += '<block type="bdsp__con_msgprint_flag_set"></block>';
TOOLBOX_XML += '<block type="bdsp__con_my_entry_no_get"></block>';
TOOLBOX_XML += '<block type="bdsp__con_my_entry_no_word_set"></block>';
TOOLBOX_XML += '<block type="bdsp__con_nick_name_get"></block>';
TOOLBOX_XML += '<block type="bdsp__con_num_tag_set"></block>';
TOOLBOX_XML += '<block type="bdsp__con_obj_code_get"></block>';
TOOLBOX_XML += '<block type="bdsp__con_open_boutique_select_menu"></block>';
TOOLBOX_XML += '<block type="bdsp__con_open_capsule_select_menu"></block>';
TOOLBOX_XML += '<block type="bdsp__con_open_matching_menu"></block>';
TOOLBOX_XML += '<block type="bdsp__con_open_poke_select_menu"></block>';
TOOLBOX_XML += '<block type="bdsp__con_open_resume_matching_menu"></block>';
TOOLBOX_XML += '<block type="bdsp__con_pokelist_get_result"></block>';
TOOLBOX_XML += '<block type="bdsp__con_pokelist_set_proc"></block>';
TOOLBOX_XML += '<block type="bdsp__con_pokestatus_set_proc"></block>';
TOOLBOX_XML += '<block type="bdsp__con_popularity_get"></block>';
TOOLBOX_XML += '<block type="bdsp__con_ranking_check"></block>';
TOOLBOX_XML += '<block type="bdsp__con_rank_name"></block>';
TOOLBOX_XML += '<block type="bdsp__con_rank_name_get"></block>';
TOOLBOX_XML += '<block type="bdsp__con_rank_set"></block>';
TOOLBOX_XML += '<block type="bdsp__con_record_disp"></block>';
TOOLBOX_XML += '<block type="bdsp__con_reset_parameter"></block>';
TOOLBOX_XML += '<block type="bdsp__con_reward_name_set"></block>';
TOOLBOX_XML += '<block type="bdsp__con_reward_showmaster_name_set"></block>';
TOOLBOX_XML += '<block type="bdsp__con_ribbon_name_get"></block>';
TOOLBOX_XML += '<block type="bdsp__con_select_multi_mode"></block>';
TOOLBOX_XML += '<block type="bdsp__con_select_single_mode"></block>';
TOOLBOX_XML += '<block type="bdsp__con_sio_param_init_set"></block>';
TOOLBOX_XML += '<block type="bdsp__con_system_create"></block>';
TOOLBOX_XML += '<block type="bdsp__con_system_exit"></block>';
TOOLBOX_XML += '<block type="bdsp__con_twinkle_star_name_set"></block>';
TOOLBOX_XML += '<block type="bdsp__con_type_name_get"></block>';
TOOLBOX_XML += '<block type="bdsp__con_victory_breeder_name_get"></block>';
TOOLBOX_XML += '<block type="bdsp__con_victory_entry_no_get"></block>';
TOOLBOX_XML += '<block type="bdsp__con_victory_item_no_get"></block>';
TOOLBOX_XML += '<block type="bdsp__con_victory_nick_name_get"></block>';
TOOLBOX_XML += '<block type="bdsp__con_wait_contest_menu"></block>';
TOOLBOX_XML += '<block type="bdsp__count_monsbox_space"></block>';
TOOLBOX_XML += '<block type="bdsp__cp_adr_adr"></block>';
TOOLBOX_XML += '<block type="bdsp__cp_adr_reg"></block>';
TOOLBOX_XML += '<block type="bdsp__cp_adr_val"></block>';
TOOLBOX_XML += '<block type="bdsp__cp_reg_adr"></block>';
TOOLBOX_XML += '<block type="bdsp__cp_reg_reg"></block>';
TOOLBOX_XML += '<block type="bdsp__cp_reg_val"></block>';
TOOLBOX_XML += '<block type="bdsp__create_hyouta"></block>';
TOOLBOX_XML += '<block type="bdsp__ctrl_bgm_flag_reset"></block>';
TOOLBOX_XML += '<block type="bdsp__ctrl_bgm_flag_set"></block>';
TOOLBOX_XML += '<block type="bdsp__custom_ball_event_call"></block>';
TOOLBOX_XML += '<block type="bdsp__custom_ball_num_add"></block>';
TOOLBOX_XML += '<block type="bdsp__custom_ball_trainer_copy_open"></block>';
TOOLBOX_XML += '<block type="bdsp__custom_ball_trainer_page"></block>';
TOOLBOX_XML += '<block type="bdsp__custom_ball_trainer_page_wait"></block>';
TOOLBOX_XML += '<block type="bdsp__cutin"></block>';
TOOLBOX_XML += '<block type="bdsp__cycling_road_set"></block>';
TOOLBOX_XML += '<block type="bdsp__d17system_map_select"></block>';
TOOLBOX_XML += '<block type="bdsp__d20r0106_legend_is_unseal"></block>';
TOOLBOX_XML += '<block type="bdsp__dame_tamago_chk_all"></block>';
TOOLBOX_XML += '<block type="bdsp__darkness_temporarily_off"></block>';
TOOLBOX_XML += '<block type="bdsp__darkness_temporarily_on"></block>';
TOOLBOX_XML += '<block type="bdsp__debug_btl_set"></block>';
TOOLBOX_XML += '<block type="bdsp__debug_child_win"></block>';
TOOLBOX_XML += '<block type="bdsp__debug_parent_win"></block>';
TOOLBOX_XML += '<block type="bdsp__debug_print"></block>';
TOOLBOX_XML += '<block type="bdsp__debug_print_flag"></block>';
TOOLBOX_XML += '<block type="bdsp__debug_print_flag_stationed"></block>';
TOOLBOX_XML += '<block type="bdsp__debug_print_work"></block>';
TOOLBOX_XML += '<block type="bdsp__debug_print_work_stationed"></block>';
TOOLBOX_XML += '<block type="bdsp__debug_reset_work"></block>';
TOOLBOX_XML += '<block type="bdsp__debug_sio_contest"></block>';
TOOLBOX_XML += '<block type="bdsp__debug_sio_encount"></block>';
TOOLBOX_XML += '<block type="bdsp__debug_trainer_flag_on_jump"></block>';
TOOLBOX_XML += '<block type="bdsp__debug_trainer_flag_set"></block>';
TOOLBOX_XML += '<block type="bdsp__debug_tr_talk_btl"></block>';
TOOLBOX_XML += '<block type="bdsp__debug_watch_work"></block>';
TOOLBOX_XML += '<block type="bdsp__del_sodateya_egg"></block>';
TOOLBOX_XML += '<block type="bdsp__del_waiticon"></block>';
TOOLBOX_XML += '<block type="bdsp__dendou_ball_anm"></block>';
TOOLBOX_XML += '<block type="bdsp__dendou_num_get"></block>';
TOOLBOX_XML += '<block type="bdsp__dendou_num_set"></block>';
TOOLBOX_XML += '<block type="bdsp__dendou_set_proc"></block>';
TOOLBOX_XML += '<block type="bdsp__display_message"></block>';
TOOLBOX_XML += '<block type="bdsp__display_message_close"></block>';
TOOLBOX_XML += '<block type="bdsp__dof_change_target_pos"></block>';
TOOLBOX_XML += '<block type="bdsp__dof_far_depth"></block>';
TOOLBOX_XML += '<block type="bdsp__dof_reset_target_pos"></block>';
TOOLBOX_XML += '<block type="bdsp__door_enable_set"></block>';
TOOLBOX_XML += '<block type="bdsp__door_force_anime_end"></block>';
TOOLBOX_XML += '<block type="bdsp__door_transition_zone_set"></block>';
TOOLBOX_XML += '<block type="bdsp__dpr_shop_open"></block>';
TOOLBOX_XML += '<block type="bdsp__dpr_shop_open_wait"></block>';
TOOLBOX_XML += '<block type="bdsp__dpw_init_proc"></block>';
TOOLBOX_XML += '<block type="bdsp__dressing_imc_acce_check"></block>';
TOOLBOX_XML += '<block type="bdsp__dress_name"></block>';
TOOLBOX_XML += '<block type="bdsp__dummy"></block>';
TOOLBOX_XML += '<block type="bdsp__dummy_anime"></block>';
TOOLBOX_XML += '<block type="bdsp__dummy_anime_wait"></block>';
TOOLBOX_XML += '<block type="bdsp__dummy_set_pos"></block>';
TOOLBOX_XML += '<block type="bdsp__dummy_set_pos_hero"></block>';
TOOLBOX_XML += '<block type="bdsp__easy_board_msg"></block>';
TOOLBOX_XML += '<block type="bdsp__easy_infoboard_msg"></block>';
TOOLBOX_XML += '<block type="bdsp__easy_msg"></block>';
TOOLBOX_XML += '<block type="bdsp__easy_obj_msg"></block>';
TOOLBOX_XML += '<block type="bdsp__easy_voice_msg"></block>';
TOOLBOX_XML += '<block type="bdsp__eff_scale"></block>';
TOOLBOX_XML += '<block type="bdsp__elevator_anm"></block>';
TOOLBOX_XML += '<block type="bdsp__elevator_floor_get"></block>';
TOOLBOX_XML += '<block type="bdsp__elevator_floor_write"></block>';
TOOLBOX_XML += '<block type="bdsp__embankment"></block>';
TOOLBOX_XML += '<block type="bdsp__ending_demo"></block>';
TOOLBOX_XML += '<block type="bdsp__end_lightintensity"></block>';
TOOLBOX_XML += '<block type="bdsp__end_lightintensity_charcter"></block>';
TOOLBOX_XML += '<block type="bdsp__end_lightintensity_poke"></block>';
TOOLBOX_XML += '<block type="bdsp__entry_uwasa_zukan"></block>';
TOOLBOX_XML += '<block type="bdsp__event_camera_end_wait"></block>';
TOOLBOX_XML += '<block type="bdsp__event_camera_frame"></block>';
TOOLBOX_XML += '<block type="bdsp__event_camera_index"></block>';
TOOLBOX_XML += '<block type="bdsp__event_camera_mode"></block>';
TOOLBOX_XML += '<block type="bdsp__event_camera_wait"></block>';
TOOLBOX_XML += '<block type="bdsp__event_data"></block>';
TOOLBOX_XML += '<block type="bdsp__event_data_end"></block>';
TOOLBOX_XML += '<block type="bdsp__event_end"></block>';
TOOLBOX_XML += '<block type="bdsp__event_entity_clip_attach_player"></block>';
TOOLBOX_XML += '<block type="bdsp__event_entity_clip_play"></block>';
TOOLBOX_XML += '<block type="bdsp__event_entity_clip_wait"></block>';
TOOLBOX_XML += '<block type="bdsp__event_entity_visible"></block>';
TOOLBOX_XML += '<block type="bdsp__event_get_temoti_poke_chk_get_pos"></block>';
TOOLBOX_XML += '<block type="bdsp__event_start"></block>';
TOOLBOX_XML += '<block type="bdsp__ev_entity_player_move_end"></block>';
TOOLBOX_XML += '<block type="bdsp__ev_entity_player_move_reset"></block>';
TOOLBOX_XML += '<block type="bdsp__ev_entity_player_move_start"></block>';
TOOLBOX_XML += '<block type="bdsp__eye_trainer_id_get"></block>';
TOOLBOX_XML += '<block type="bdsp__eye_trainer_move_check"></block>';
TOOLBOX_XML += '<block type="bdsp__eye_trainer_move_set"></block>';
TOOLBOX_XML += '<block type="bdsp__eye_trainer_type_get"></block>';
TOOLBOX_XML += '<block type="bdsp__face_index"></block>';
TOOLBOX_XML += '<block type="bdsp__fade_area_in"></block>';
TOOLBOX_XML += '<block type="bdsp__fade_area_out"></block>';
TOOLBOX_XML += '<block type="bdsp__fade_ball"></block>';
TOOLBOX_XML += '<block type="bdsp__fade_building_in"></block>';
TOOLBOX_XML += '<block type="bdsp__fade_building_out"></block>';
TOOLBOX_XML += '<block type="bdsp__fade_default"></block>';
TOOLBOX_XML += '<block type="bdsp__fade_dungeon_in"></block>';
TOOLBOX_XML += '<block type="bdsp__fade_dungeon_out"></block>';
TOOLBOX_XML += '<block type="bdsp__fade_speed"></block>';
TOOLBOX_XML += '<block type="bdsp__fade_wait"></block>';
TOOLBOX_XML += '<block type="bdsp__fieldobj_bitset_fellowhit"></block>';
TOOLBOX_XML += '<block type="bdsp__find_bg_disable"></block>';
TOOLBOX_XML += '<block type="bdsp__find_bg_enable"></block>';
TOOLBOX_XML += '<block type="bdsp__finish_map_proc"></block>';
TOOLBOX_XML += '<block type="bdsp__first_btl_set"></block>';
TOOLBOX_XML += '<block type="bdsp__first_pokemon_name"></block>';
TOOLBOX_XML += '<block type="bdsp__first_poke_no_get"></block>';
TOOLBOX_XML += '<block type="bdsp__first_poke_select_proc"></block>';
TOOLBOX_XML += '<block type="bdsp__first_poke_select_set_and_del"></block>';
TOOLBOX_XML += '<block type="bdsp__fix_goods_call"></block>';
TOOLBOX_XML += '<block type="bdsp__fix_seal_call"></block>';
TOOLBOX_XML += '<block type="bdsp__fix_shop_call"></block>';
TOOLBOX_XML += '<block type="bdsp__flag_change_label"></block>';
TOOLBOX_XML += '<block type="bdsp__flag_check"></block>';
TOOLBOX_XML += '<block type="bdsp__flag_check_wk"></block>';
TOOLBOX_XML += '<block type="bdsp__flag_reset"></block>';
TOOLBOX_XML += '<block type="bdsp__flag_set"></block>';
TOOLBOX_XML += '<block type="bdsp__flag_set_wk"></block>';
TOOLBOX_XML += '<block type="bdsp__fldobj_blink_anm"></block>';
TOOLBOX_XML += '<block type="bdsp__fldobj_shake_anm"></block>';
TOOLBOX_XML += '<block type="bdsp__fld_item_event"></block>';
TOOLBOX_XML += '<block type="bdsp__fld_scope_mode_off"></block>';
TOOLBOX_XML += '<block type="bdsp__fld_scope_mode_on"></block>';
TOOLBOX_XML += '<block type="bdsp__fld_trade_alloc"></block>';
TOOLBOX_XML += '<block type="bdsp__fld_trade_chg_monsno"></block>';
TOOLBOX_XML += '<block type="bdsp__fld_trade_del"></block>';
TOOLBOX_XML += '<block type="bdsp__fld_trade_event"></block>';
TOOLBOX_XML += '<block type="bdsp__fld_trade_monsno"></block>';
TOOLBOX_XML += '<block type="bdsp__floor_close"></block>';
TOOLBOX_XML += '<block type="bdsp__floor_open"></block>';
TOOLBOX_XML += '<block type="bdsp__fnote_data_make"></block>';
TOOLBOX_XML += '<block type="bdsp__fnote_data_save"></block>';
TOOLBOX_XML += '<block type="bdsp__fnote_start_set"></block>';
TOOLBOX_XML += '<block type="bdsp__fov_offset_rate"></block>';
TOOLBOX_XML += '<block type="bdsp__free_3d_anime"></block>';
TOOLBOX_XML += '<block type="bdsp__friend_data_num"></block>';
TOOLBOX_XML += '<block type="bdsp__front_pokemon"></block>';
TOOLBOX_XML += '<block type="bdsp__fureai_talk_end"></block>';
TOOLBOX_XML += '<block type="bdsp__fureai_talk_start"></block>';
TOOLBOX_XML += '<block type="bdsp__game_over_call"></block>';
TOOLBOX_XML += '<block type="bdsp__generate_info_get"></block>';
TOOLBOX_XML += '<block type="bdsp__get_before_zone_id"></block>';
TOOLBOX_XML += '<block type="bdsp__get_bp"></block>';
TOOLBOX_XML += '<block type="bdsp__get_bp_gift"></block>';
TOOLBOX_XML += '<block type="bdsp__get_btl_point"></block>';
TOOLBOX_XML += '<block type="bdsp__get_coin_gift"></block>';
TOOLBOX_XML += '<block type="bdsp__get_coin_num"></block>';
TOOLBOX_XML += '<block type="bdsp__get_costume"></block>';
TOOLBOX_XML += '<block type="bdsp__get_form"></block>';
TOOLBOX_XML += '<block type="bdsp__get_fureai_select_poke_temoti_no"></block>';
TOOLBOX_XML += '<block type="bdsp__get_gold"></block>';
TOOLBOX_XML += '<block type="bdsp__get_honey_tree_state"></block>';
TOOLBOX_XML += '<block type="bdsp__get_hyouka_msgid"></block>';
TOOLBOX_XML += '<block type="bdsp__get_is_have_secretbase"></block>';
TOOLBOX_XML += '<block type="bdsp__get_item_count"></block>';
TOOLBOX_XML += '<block type="bdsp__get_kuji_atari_num"></block>';
TOOLBOX_XML += '<block type="bdsp__get_language"></block>';
TOOLBOX_XML += '<block type="bdsp__get_mailbox_datanum"></block>';
TOOLBOX_XML += '<block type="bdsp__get_map_pos"></block>';
TOOLBOX_XML += '<block type="bdsp__get_my_sex"></block>';
TOOLBOX_XML += '<block type="bdsp__get_natsuki"></block>';
TOOLBOX_XML += '<block type="bdsp__get_news_poke_no"></block>';
TOOLBOX_XML += '<block type="bdsp__get_now_hour"></block>';
TOOLBOX_XML += '<block type="bdsp__get_now_zone_id"></block>';
TOOLBOX_XML += '<block type="bdsp__get_player_cap"></block>';
TOOLBOX_XML += '<block type="bdsp__get_pocket_no"></block>';
TOOLBOX_XML += '<block type="bdsp__get_poketch"></block>';
TOOLBOX_XML += '<block type="bdsp__get_poketch_app_id"></block>';
TOOLBOX_XML += '<block type="bdsp__get_poketch_flag"></block>';
TOOLBOX_XML += '<block type="bdsp__get_poke_count"></block>';
TOOLBOX_XML += '<block type="bdsp__get_poke_count2"></block>';
TOOLBOX_XML += '<block type="bdsp__get_poke_count3"></block>';
TOOLBOX_XML += '<block type="bdsp__get_poke_count4"></block>';
TOOLBOX_XML += '<block type="bdsp__get_poke_count5"></block>';
TOOLBOX_XML += '<block type="bdsp__get_poke_seikaku"></block>';
TOOLBOX_XML += '<block type="bdsp__get_random_hit"></block>';
TOOLBOX_XML += '<block type="bdsp__get_rel_pos_hero"></block>';
TOOLBOX_XML += '<block type="bdsp__get_rnd"></block>';
TOOLBOX_XML += '<block type="bdsp__get_rnd_next"></block>';
TOOLBOX_XML += '<block type="bdsp__get_seed_compost"></block>';
TOOLBOX_XML += '<block type="bdsp__get_seed_count"></block>';
TOOLBOX_XML += '<block type="bdsp__get_seed_ground"></block>';
TOOLBOX_XML += '<block type="bdsp__get_seed_status"></block>';
TOOLBOX_XML += '<block type="bdsp__get_seed_type"></block>';
TOOLBOX_XML += '<block type="bdsp__get_sodateya_aishou"></block>';
TOOLBOX_XML += '<block type="bdsp__get_sodateya_egg"></block>';
TOOLBOX_XML += '<block type="bdsp__get_sodateya_ziisan"></block>';
TOOLBOX_XML += '<block type="bdsp__get_sodate_name"></block>';
TOOLBOX_XML += '<block type="bdsp__get_statue_num"></block>';
TOOLBOX_XML += '<block type="bdsp__get_tag_patner_id"></block>';
TOOLBOX_XML += '<block type="bdsp__get_tamago_count"></block>';
TOOLBOX_XML += '<block type="bdsp__get_temoti_poke_num"></block>';
TOOLBOX_XML += '<block type="bdsp__get_time_zone"></block>';
TOOLBOX_XML += '<block type="bdsp__get_trcard_rank"></block>';
TOOLBOX_XML += '<block type="bdsp__get_ug_hata_num"></block>';
TOOLBOX_XML += '<block type="bdsp__get_ug_npc_talk_count"></block>';
TOOLBOX_XML += '<block type="bdsp__get_urayama_encount_index"></block>';
TOOLBOX_XML += '<block type="bdsp__gold_win_del"></block>';
TOOLBOX_XML += '<block type="bdsp__gold_win_write"></block>';
TOOLBOX_XML += '<block type="bdsp__gold_write"></block>';
TOOLBOX_XML += '<block type="bdsp__goods_chk"></block>';
TOOLBOX_XML += '<block type="bdsp__goods_name"></block>';
TOOLBOX_XML += '<block type="bdsp__group_entry"></block>';
TOOLBOX_XML += '<block type="bdsp__group_entry_check"></block>';
TOOLBOX_XML += '<block type="bdsp__group_exist_check"></block>';
TOOLBOX_XML += '<block type="bdsp__group_leader_name"></block>';
TOOLBOX_XML += '<block type="bdsp__group_make"></block>';
TOOLBOX_XML += '<block type="bdsp__group_name"></block>';
TOOLBOX_XML += '<block type="bdsp__group_name_in"></block>';
TOOLBOX_XML += '<block type="bdsp__guinness_win"></block>';
TOOLBOX_XML += '<block type="bdsp__haifu_poke_retry_check"></block>';
TOOLBOX_XML += '<block type="bdsp__hero_move_grid_center"></block>';
TOOLBOX_XML += '<block type="bdsp__hero_move_grid_center_front"></block>';
TOOLBOX_XML += '<block type="bdsp__hidemap_state_chg"></block>';
TOOLBOX_XML += '<block type="bdsp__hideneff_start"></block>';
TOOLBOX_XML += '<block type="bdsp__hideneff_wait"></block>';
TOOLBOX_XML += '<block type="bdsp__hiden_flash"></block>';
TOOLBOX_XML += '<block type="bdsp__hiden_kiribarai"></block>';
TOOLBOX_XML += '<block type="bdsp__hide_item_event"></block>';
TOOLBOX_XML += '<block type="bdsp__hikitori_list"></block>';
TOOLBOX_XML += '<block type="bdsp__hikitori_list_name_set"></block>';
TOOLBOX_XML += '<block type="bdsp__hikitori_poke"></block>';
TOOLBOX_XML += '<block type="bdsp__hikitori_ryoukin"></block>';
TOOLBOX_XML += '<block type="bdsp__hit_door_anime"></block>';
TOOLBOX_XML += '<block type="bdsp__hit_door_anime_wait"></block>';
TOOLBOX_XML += '<block type="bdsp__honey_tree"></block>';
TOOLBOX_XML += '<block type="bdsp__honey_tree_after_set"></block>';
TOOLBOX_XML += '<block type="bdsp__honey_tree_btl_set"></block>';
TOOLBOX_XML += '<block type="bdsp__ifval_call"></block>';
TOOLBOX_XML += '<block type="bdsp__ifval_jump"></block>';
TOOLBOX_XML += '<block type="bdsp__ifwk_call"></block>';
TOOLBOX_XML += '<block type="bdsp__ifwk_jump"></block>';
TOOLBOX_XML += '<block type="bdsp__if_call"></block>';
TOOLBOX_XML += '<block type="bdsp__if_flagoff_call"></block>';
TOOLBOX_XML += '<block type="bdsp__if_flagoff_jump"></block>';
TOOLBOX_XML += '<block type="bdsp__if_flagon_call"></block>';
TOOLBOX_XML += '<block type="bdsp__if_flagon_jump"></block>';
TOOLBOX_XML += '<block type="bdsp__if_jump"></block>';
TOOLBOX_XML += '<block type="bdsp__if_tr_flagoff_call"></block>';
TOOLBOX_XML += '<block type="bdsp__if_tr_flagoff_jump"></block>';
TOOLBOX_XML += '<block type="bdsp__if_tr_flagon_call"></block>';
TOOLBOX_XML += '<block type="bdsp__if_tr_flagon_jump"></block>';
TOOLBOX_XML += '<block type="bdsp__image_clip_set_proc"></block>';
TOOLBOX_XML += '<block type="bdsp__image_clip_view_con_check_proc"></block>';
TOOLBOX_XML += '<block type="bdsp__image_clip_view_con_set_proc"></block>';
TOOLBOX_XML += '<block type="bdsp__image_clip_view_tv_set_proc"></block>';
TOOLBOX_XML += '<block type="bdsp__imc_acce_add_item"></block>';
TOOLBOX_XML += '<block type="bdsp__imc_acce_add_item_chk"></block>';
TOOLBOX_XML += '<block type="bdsp__imc_acce_item_chk"></block>';
TOOLBOX_XML += '<block type="bdsp__imc_acce_sub_item"></block>';
TOOLBOX_XML += '<block type="bdsp__imc_bg_add_item"></block>';
TOOLBOX_XML += '<block type="bdsp__imc_bg_item_chk"></block>';
TOOLBOX_XML += '<block type="bdsp__imc_bg_name"></block>';
TOOLBOX_XML += '<block type="bdsp__infoboard_make"></block>';
TOOLBOX_XML += '<block type="bdsp__init_change_label"></block>';
TOOLBOX_XML += '<block type="bdsp__init_combat_gym"></block>';
TOOLBOX_XML += '<block type="bdsp__init_elec_gym"></block>';
TOOLBOX_XML += '<block type="bdsp__init_fld_lift"></block>';
TOOLBOX_XML += '<block type="bdsp__init_ghost_gym"></block>';
TOOLBOX_XML += '<block type="bdsp__init_safari_train"></block>';
TOOLBOX_XML += '<block type="bdsp__init_steel_gym"></block>';
TOOLBOX_XML += '<block type="bdsp__init_water_gym"></block>';
TOOLBOX_XML += '<block type="bdsp__init_weather"></block>';
TOOLBOX_XML += '<block type="bdsp__input_jump"></block>';
TOOLBOX_XML += '<block type="bdsp__invisible_obj_prop"></block>';
TOOLBOX_XML += '<block type="bdsp__is_haihu_event_enable"></block>';
TOOLBOX_XML += '<block type="bdsp__itemlist_get_result"></block>';
TOOLBOX_XML += '<block type="bdsp__itemlist_set_proc"></block>';
TOOLBOX_XML += '<block type="bdsp__itemno_to_monsno"></block>';
TOOLBOX_XML += '<block type="bdsp__item_chk"></block>';
TOOLBOX_XML += '<block type="bdsp__item_name"></block>';
TOOLBOX_XML += '<block type="bdsp__item_waza_name"></block>';
TOOLBOX_XML += '<block type="bdsp__jump"></block>';
TOOLBOX_XML += '<block type="bdsp__kabenobori"></block>';
TOOLBOX_XML += '<block type="bdsp__kabenobori_check"></block>';
TOOLBOX_XML += '<block type="bdsp__kaseki_count"></block>';
TOOLBOX_XML += '<block type="bdsp__kaseki_itemno"></block>';
TOOLBOX_XML += '<block type="bdsp__kuji_atari_chk"></block>';
TOOLBOX_XML += '<block type="bdsp__kuji_atari_init"></block>';
TOOLBOX_XML += '<block type="bdsp__last_keywait"></block>';
TOOLBOX_XML += '<block type="bdsp__ldval"></block>';
TOOLBOX_XML += '<block type="bdsp__ldval_sex"></block>';
TOOLBOX_XML += '<block type="bdsp__ldval_version"></block>';
TOOLBOX_XML += '<block type="bdsp__ldwk"></block>';
TOOLBOX_XML += '<block type="bdsp__ldwkval"></block>';
TOOLBOX_XML += '<block type="bdsp__ld_adr_adr"></block>';
TOOLBOX_XML += '<block type="bdsp__ld_adr_reg"></block>';
TOOLBOX_XML += '<block type="bdsp__ld_adr_val"></block>';
TOOLBOX_XML += '<block type="bdsp__ld_reg_adr"></block>';
TOOLBOX_XML += '<block type="bdsp__ld_reg_reg"></block>';
TOOLBOX_XML += '<block type="bdsp__ld_reg_val"></block>';
TOOLBOX_XML += '<block type="bdsp__ld_reg_wdata"></block>';
TOOLBOX_XML += '<block type="bdsp__level_jijii_init"></block>';
TOOLBOX_XML += '<block type="bdsp__level_jijii_no"></block>';
TOOLBOX_XML += '<block type="bdsp__load_camera_controller"></block>';
TOOLBOX_XML += '<block type="bdsp__load_uma_anime"></block>';
TOOLBOX_XML += '<block type="bdsp__load_uma_anime_wait"></block>';
TOOLBOX_XML += '<block type="bdsp__load_wait_camera_controller"></block>';
TOOLBOX_XML += '<block type="bdsp__localkoukan_apply"></block>';
TOOLBOX_XML += '<block type="bdsp__lose_check"></block>';
TOOLBOX_XML += '<block type="bdsp__mailbox"></block>';
TOOLBOX_XML += '<block type="bdsp__map_change"></block>';
TOOLBOX_XML += '<block type="bdsp__map_change_none_fade"></block>';
TOOLBOX_XML += '<block type="bdsp__menu_req"></block>';
TOOLBOX_XML += '<block type="bdsp__me_play"></block>';
TOOLBOX_XML += '<block type="bdsp__me_wait"></block>';
TOOLBOX_XML += '<block type="bdsp__money_close"></block>';
TOOLBOX_XML += '<block type="bdsp__money_open"></block>';
TOOLBOX_XML += '<block type="bdsp__mons_own_chk"></block>';
TOOLBOX_XML += '<block type="bdsp__monument_name"></block>';
TOOLBOX_XML += '<block type="bdsp__move_code_change"></block>';
TOOLBOX_XML += '<block type="bdsp__move_code_get"></block>';
TOOLBOX_XML += '<block type="bdsp__move_combat_gym_wall"></block>';
TOOLBOX_XML += '<block type="bdsp__move_fld_lift"></block>';
TOOLBOX_XML += '<block type="bdsp__move_ghost_gym_lift"></block>';
TOOLBOX_XML += '<block type="bdsp__move_safari_train"></block>';
TOOLBOX_XML += '<block type="bdsp__msgexpandbuf"></block>';
TOOLBOX_XML += '<block type="bdsp__msg_azuke_set"></block>';
TOOLBOX_XML += '<block type="bdsp__msg_boy_event"></block>';
TOOLBOX_XML += '<block type="bdsp__msg_sodateya_aishou"></block>';
TOOLBOX_XML += '<block type="bdsp__mystery_disable_msg"></block>';
TOOLBOX_XML += '<block type="bdsp__mystery_enable_msg"></block>';
TOOLBOX_XML += '<block type="bdsp__mystery_get_present_id"></block>';
TOOLBOX_XML += '<block type="bdsp__mystery_postman_end"></block>';
TOOLBOX_XML += '<block type="bdsp__mystery_postman_init"></block>';
TOOLBOX_XML += '<block type="bdsp__mystery_postman_save_end"></block>';
TOOLBOX_XML += '<block type="bdsp__mystery_present_check"></block>';
TOOLBOX_XML += '<block type="bdsp__mystery_receive_check"></block>';
TOOLBOX_XML += '<block type="bdsp__mystery_receive_present"></block>';
TOOLBOX_XML += '<block type="bdsp__my_tr_type_name"></block>';
TOOLBOX_XML += '<block type="bdsp__namein"></block>';
TOOLBOX_XML += '<block type="bdsp__namein_monument"></block>';
TOOLBOX_XML += '<block type="bdsp__namein_poke"></block>';
TOOLBOX_XML += '<block type="bdsp__naminori"></block>';
TOOLBOX_XML += '<block type="bdsp__naminori_end"></block>';
TOOLBOX_XML += '<block type="bdsp__natural_park_accessory_no_get"></block>';
TOOLBOX_XML += '<block type="bdsp__natural_park_get_monohiroi_item_no"></block>';
TOOLBOX_XML += '<block type="bdsp__natural_park_poke_create"></block>';
TOOLBOX_XML += '<block type="bdsp__natural_park_poke_kaisan"></block>';
TOOLBOX_XML += '<block type="bdsp__natural_park_poke_select_menu"></block>';
TOOLBOX_XML += '<block type="bdsp__natural_park_poke_syuugou"></block>';
TOOLBOX_XML += '<block type="bdsp__natural_park_walk_count_clear"></block>';
TOOLBOX_XML += '<block type="bdsp__natural_park_walk_count_get"></block>';
TOOLBOX_XML += '<block type="bdsp__news_count_chk"></block>';
TOOLBOX_XML += '<block type="bdsp__news_count_set"></block>';
TOOLBOX_XML += '<block type="bdsp__new_nankai_word_complete_check"></block>';
TOOLBOX_XML += '<block type="bdsp__new_nankai_word_set"></block>';
TOOLBOX_XML += '<block type="bdsp__next_anm_last_keywait"></block>';
TOOLBOX_XML += '<block type="bdsp__nickname_placement"></block>';
TOOLBOX_XML += '<block type="bdsp__nick_name"></block>';
TOOLBOX_XML += '<block type="bdsp__nick_name_all"></block>';
TOOLBOX_XML += '<block type="bdsp__nick_name_pc"></block>';
TOOLBOX_XML += '<block type="bdsp__none_use_number"></block>';
TOOLBOX_XML += '<block type="bdsp__nop"></block>';
TOOLBOX_XML += '<block type="bdsp__normal_lose"></block>';
TOOLBOX_XML += '<block type="bdsp__normal_wazalist_get_result"></block>';
TOOLBOX_XML += '<block type="bdsp__normal_wazalist_set_proc"></block>';
TOOLBOX_XML += '<block type="bdsp__not_zone_del_set"></block>';
TOOLBOX_XML += '<block type="bdsp__npc_trade_pokelist_set_proc"></block>';
TOOLBOX_XML += '<block type="bdsp__number_name"></block>';
TOOLBOX_XML += '<block type="bdsp__number_name_ex"></block>';
TOOLBOX_XML += '<block type="bdsp__nutmixer_call"></block>';
TOOLBOX_XML += '<block type="bdsp__nutmixer_play_check"></block>';
TOOLBOX_XML += '<block type="bdsp__nuts_name"></block>';
TOOLBOX_XML += '<block type="bdsp__obj_add"></block>';
TOOLBOX_XML += '<block type="bdsp__obj_anime"></block>';
TOOLBOX_XML += '<block type="bdsp__obj_anime_fureai"></block>';
TOOLBOX_XML += '<block type="bdsp__obj_anime_pos"></block>';
TOOLBOX_XML += '<block type="bdsp__obj_anime_speed"></block>';
TOOLBOX_XML += '<block type="bdsp__obj_anime_wait"></block>';
TOOLBOX_XML += '<block type="bdsp__obj_change_label"></block>';
TOOLBOX_XML += '<block type="bdsp__obj_del"></block>';
TOOLBOX_XML += '<block type="bdsp__obj_dir_change"></block>';
TOOLBOX_XML += '<block type="bdsp__obj_dir_change_world"></block>';
TOOLBOX_XML += '<block type="bdsp__obj_id_jump"></block>';
TOOLBOX_XML += '<block type="bdsp__obj_invisible"></block>';
TOOLBOX_XML += '<block type="bdsp__obj_pause"></block>';
TOOLBOX_XML += '<block type="bdsp__obj_pause_all"></block>';
TOOLBOX_XML += '<block type="bdsp__obj_pause_clear"></block>';
TOOLBOX_XML += '<block type="bdsp__obj_pause_clear_all"></block>';
TOOLBOX_XML += '<block type="bdsp__obj_pos_change"></block>';
TOOLBOX_XML += '<block type="bdsp__obj_pos_change_world"></block>';
TOOLBOX_XML += '<block type="bdsp__obj_pos_change_world_find"></block>';
TOOLBOX_XML += '<block type="bdsp__obj_pos_get"></block>';
TOOLBOX_XML += '<block type="bdsp__obj_scale"></block>';
TOOLBOX_XML += '<block type="bdsp__obj_visible"></block>';
TOOLBOX_XML += '<block type="bdsp__oekaki_board_set_proc"></block>';
TOOLBOX_XML += '<block type="bdsp__offset_wait"></block>';
TOOLBOX_XML += '<block type="bdsp__ojigi"></block>';
TOOLBOX_XML += '<block type="bdsp__ookisa_kiroku_set_buf"></block>';
TOOLBOX_XML += '<block type="bdsp__ookisa_kurabe_init"></block>';
TOOLBOX_XML += '<block type="bdsp__ookisa_record_chk"></block>';
TOOLBOX_XML += '<block type="bdsp__ookisa_record_set"></block>';
TOOLBOX_XML += '<block type="bdsp__ookisa_temoti_set_buf"></block>';
TOOLBOX_XML += '<block type="bdsp__ookisa_value_set_buf"></block>';
TOOLBOX_XML += '<block type="bdsp__open_battle_win"></block>';
TOOLBOX_XML += '<block type="bdsp__open_custum_win"></block>';
TOOLBOX_XML += '<block type="bdsp__open_custum_win_fixed"></block>';
TOOLBOX_XML += '<block type="bdsp__open_custum_win_word_set"></block>';
TOOLBOX_XML += '<block type="bdsp__open_password_swkeyboard"></block>';
TOOLBOX_XML += '<block type="bdsp__open_special_win_label"></block>';
TOOLBOX_XML += '<block type="bdsp__oshie_wazalist_get_result"></block>';
TOOLBOX_XML += '<block type="bdsp__oshie_wazalist_set_proc"></block>';
TOOLBOX_XML += '<block type="bdsp__oshie_waza_count"></block>';
TOOLBOX_XML += '<block type="bdsp__pair_objid_set"></block>';
TOOLBOX_XML += '<block type="bdsp__paperplane_set"></block>';
TOOLBOX_XML += '<block type="bdsp__park_item_name"></block>';
TOOLBOX_XML += '<block type="bdsp__partner_name_set"></block>';
TOOLBOX_XML += '<block type="bdsp__party_deokisisuform_change"></block>';
TOOLBOX_XML += '<block type="bdsp__party_monsno_check"></block>';
TOOLBOX_XML += '<block type="bdsp__pc_dendou_set_proc"></block>';
TOOLBOX_XML += '<block type="bdsp__pc_dendou_set_proc_open_wait"></block>';
TOOLBOX_XML += '<block type="bdsp__pc_kaifuku"></block>';
TOOLBOX_XML += '<block type="bdsp__pc_recover_anm"></block>';
TOOLBOX_XML += '<block type="bdsp__perap_data_check"></block>';
TOOLBOX_XML += '<block type="bdsp__perap_rec_start"></block>';
TOOLBOX_XML += '<block type="bdsp__perap_rec_stop"></block>';
TOOLBOX_XML += '<block type="bdsp__perap_save"></block>';
TOOLBOX_XML += '<block type="bdsp__player_dir_get"></block>';
TOOLBOX_XML += '<block type="bdsp__player_dir_jump"></block>';
TOOLBOX_XML += '<block type="bdsp__player_field_demo_bgm_play"></block>';
TOOLBOX_XML += '<block type="bdsp__player_form_get"></block>';
TOOLBOX_XML += '<block type="bdsp__player_hegiht_valid"></block>';
TOOLBOX_XML += '<block type="bdsp__player_name"></block>';
TOOLBOX_XML += '<block type="bdsp__player_pos_get"></block>';
TOOLBOX_XML += '<block type="bdsp__player_pos_offset_set"></block>';
TOOLBOX_XML += '<block type="bdsp__player_report_draw_del"></block>';
TOOLBOX_XML += '<block type="bdsp__player_report_draw_set"></block>';
TOOLBOX_XML += '<block type="bdsp__player_req_bit_on"></block>';
TOOLBOX_XML += '<block type="bdsp__player_req_start"></block>';
TOOLBOX_XML += '<block type="bdsp__play_emo_se"></block>';
TOOLBOX_XML += '<block type="bdsp__play_fureai_voice_nakayoshirank"></block>';
TOOLBOX_XML += '<block type="bdsp__play_report_btltower_win"></block>';
TOOLBOX_XML += '<block type="bdsp__play_report_training"></block>';
TOOLBOX_XML += '<block type="bdsp__pms_buf"></block>';
TOOLBOX_XML += '<block type="bdsp__pms_input_double"></block>';
TOOLBOX_XML += '<block type="bdsp__pms_input_single"></block>';
TOOLBOX_XML += '<block type="bdsp__pm_version_get"></block>';
TOOLBOX_XML += '<block type="bdsp__pocket_name"></block>';
TOOLBOX_XML += '<block type="bdsp__poffin_name"></block>';
TOOLBOX_XML += '<block type="bdsp__pofin_add"></block>';
TOOLBOX_XML += '<block type="bdsp__pofin_add_chk"></block>';
TOOLBOX_XML += '<block type="bdsp__pokecen_clear_ball"></block>';
TOOLBOX_XML += '<block type="bdsp__pokecen_put_ball"></block>';
TOOLBOX_XML += '<block type="bdsp__pokelist_form_change_get_result"></block>';
TOOLBOX_XML += '<block type="bdsp__pokelist_form_change_set_proc"></block>';
TOOLBOX_XML += '<block type="bdsp__pokelist_get_result"></block>';
TOOLBOX_XML += '<block type="bdsp__pokelist_set_proc"></block>';
TOOLBOX_XML += '<block type="bdsp__pokemon_name"></block>';
TOOLBOX_XML += '<block type="bdsp__pokemon_name_extra"></block>';
TOOLBOX_XML += '<block type="bdsp__pokepark_control"></block>';
TOOLBOX_XML += '<block type="bdsp__pokepark_deposit_count"></block>';
TOOLBOX_XML += '<block type="bdsp__pokepark_get_score"></block>';
TOOLBOX_XML += '<block type="bdsp__pokepark_trans_mons"></block>';
TOOLBOX_XML += '<block type="bdsp__pokestatus_get_result"></block>';
TOOLBOX_XML += '<block type="bdsp__poketch_add"></block>';
TOOLBOX_XML += '<block type="bdsp__poketch_check"></block>';
TOOLBOX_XML += '<block type="bdsp__poketch_hook_reset"></block>';
TOOLBOX_XML += '<block type="bdsp__poketch_hook_set"></block>';
TOOLBOX_XML += '<block type="bdsp__poketch_name"></block>';
TOOLBOX_XML += '<block type="bdsp__poketore_get_charge"></block>';
TOOLBOX_XML += '<block type="bdsp__poketore_start"></block>';
TOOLBOX_XML += '<block type="bdsp__poke_level_chk"></block>';
TOOLBOX_XML += '<block type="bdsp__poke_level_get"></block>';
TOOLBOX_XML += '<block type="bdsp__poke_level_get_all"></block>';
TOOLBOX_XML += '<block type="bdsp__poke_lvup_how_many"></block>';
TOOLBOX_XML += '<block type="bdsp__poke_mail_chk"></block>';
TOOLBOX_XML += '<block type="bdsp__poke_mail_del"></block>';
TOOLBOX_XML += '<block type="bdsp__poke_tarent_pow_max"></block>';
TOOLBOX_XML += '<block type="bdsp__poke_type_name"></block>';
TOOLBOX_XML += '<block type="bdsp__poke_window_anm"></block>';
TOOLBOX_XML += '<block type="bdsp__poke_window_anm_wait"></block>';
TOOLBOX_XML += '<block type="bdsp__poke_window_del"></block>';
TOOLBOX_XML += '<block type="bdsp__poke_window_put"></block>';
TOOLBOX_XML += '<block type="bdsp__poke_window_put_pp"></block>';
TOOLBOX_XML += '<block type="bdsp__push_water_gym_button"></block>';
TOOLBOX_XML += '<block type="bdsp__ranking_view"></block>';
TOOLBOX_XML += '<block type="bdsp__recongnize_open_wait"></block>';
TOOLBOX_XML += '<block type="bdsp__recongnize_tokikake"></block>';
TOOLBOX_XML += '<block type="bdsp__record_add"></block>';
TOOLBOX_XML += '<block type="bdsp__record_corner_set_proc"></block>';
TOOLBOX_XML += '<block type="bdsp__record_get"></block>';
TOOLBOX_XML += '<block type="bdsp__record_inc"></block>';
TOOLBOX_XML += '<block type="bdsp__record_set"></block>';
TOOLBOX_XML += '<block type="bdsp__record_setiflarge"></block>';
TOOLBOX_XML += '<block type="bdsp__regular_check"></block>';
TOOLBOX_XML += '<block type="bdsp__regulation_list_call"></block>';
TOOLBOX_XML += '<block type="bdsp__release_camera_controller"></block>';
TOOLBOX_XML += '<block type="bdsp__release_effect"></block>';
TOOLBOX_XML += '<block type="bdsp__release_uma_anime"></block>';
TOOLBOX_XML += '<block type="bdsp__remaind_wazalist_get_result"></block>';
TOOLBOX_XML += '<block type="bdsp__remaind_wazalist_set_proc"></block>';
TOOLBOX_XML += '<block type="bdsp__remaind_waza_count"></block>';
TOOLBOX_XML += '<block type="bdsp__report_save"></block>';
TOOLBOX_XML += '<block type="bdsp__report_save_check"></block>';
TOOLBOX_XML += '<block type="bdsp__report_win_close"></block>';
TOOLBOX_XML += '<block type="bdsp__report_win_open"></block>';
TOOLBOX_XML += '<block type="bdsp__reset_savebgm"></block>';
TOOLBOX_XML += '<block type="bdsp__reset_stop_eye_encount"></block>';
TOOLBOX_XML += '<block type="bdsp__reset_sys_flag"></block>';
TOOLBOX_XML += '<block type="bdsp__reset_ug_npc_talk_count"></block>';
TOOLBOX_XML += '<block type="bdsp__ret"></block>';
TOOLBOX_XML += '<block type="bdsp__return_loop"></block>';
TOOLBOX_XML += '<block type="bdsp__return_script_wk_set"></block>';
TOOLBOX_XML += '<block type="bdsp__revenge_trainer_search"></block>';
TOOLBOX_XML += '<block type="bdsp__revenge_trainer_talk_type_get"></block>';
TOOLBOX_XML += '<block type="bdsp__ribbon_name"></block>';
TOOLBOX_XML += '<block type="bdsp__rival_name"></block>';
TOOLBOX_XML += '<block type="bdsp__rival_pokemon_name"></block>';
TOOLBOX_XML += '<block type="bdsp__rotate_elec_gym_gear"></block>';
TOOLBOX_XML += '<block type="bdsp__rotomu_form_check"></block>';
TOOLBOX_XML += '<block type="bdsp__safari_end"></block>';
TOOLBOX_XML += '<block type="bdsp__safari_scope_sequence"></block>';
TOOLBOX_XML += '<block type="bdsp__safari_start"></block>';
TOOLBOX_XML += '<block type="bdsp__save_field_obj"></block>';
TOOLBOX_XML += '<block type="bdsp__save_playreport"></block>';
TOOLBOX_XML += '<block type="bdsp__save_rendou_enable"></block>';
TOOLBOX_XML += '<block type="bdsp__scene_change_data"></block>';
TOOLBOX_XML += '<block type="bdsp__scene_change_end"></block>';
TOOLBOX_XML += '<block type="bdsp__scene_change_label"></block>';
TOOLBOX_XML += '<block type="bdsp__seacret_poke_retry_check"></block>';
TOOLBOX_XML += '<block type="bdsp__seal_name"></block>';
TOOLBOX_XML += '<block type="bdsp__seikaku_name"></block>';
TOOLBOX_XML += '<block type="bdsp__sel_child_win"></block>';
TOOLBOX_XML += '<block type="bdsp__sel_parent_win"></block>';
TOOLBOX_XML += '<block type="bdsp__sel_win_jump"></block>';
TOOLBOX_XML += '<block type="bdsp__seq_close_door"></block>';
TOOLBOX_XML += '<block type="bdsp__seq_open_door"></block>';
TOOLBOX_XML += '<block type="bdsp__setup_paso_anm"></block>';
TOOLBOX_XML += '<block type="bdsp__setup_rah_cyl"></block>';
TOOLBOX_XML += '<block type="bdsp__setup_ship"></block>';
TOOLBOX_XML += '<block type="bdsp__set_custum_win_msbt"></block>';
TOOLBOX_XML += '<block type="bdsp__set_door_obj"></block>';
TOOLBOX_XML += '<block type="bdsp__set_escape_location"></block>';
TOOLBOX_XML += '<block type="bdsp__set_event_camera_param"></block>';
TOOLBOX_XML += '<block type="bdsp__set_force_blink"></block>';
TOOLBOX_XML += '<block type="bdsp__set_globalwaterfield"></block>';
TOOLBOX_XML += '<block type="bdsp__set_lightintensity"></block>';
TOOLBOX_XML += '<block type="bdsp__set_lightintensity_charcter"></block>';
TOOLBOX_XML += '<block type="bdsp__set_lightintensity_poke"></block>';
TOOLBOX_XML += '<block type="bdsp__set_map_proc"></block>';
TOOLBOX_XML += '<block type="bdsp__set_matching_group"></block>';
TOOLBOX_XML += '<block type="bdsp__set_offset"></block>';
TOOLBOX_XML += '<block type="bdsp__set_pos_hero_match_x"></block>';
TOOLBOX_XML += '<block type="bdsp__set_pos_hero_match_z"></block>';
TOOLBOX_XML += '<block type="bdsp__set_ribbon"></block>';
TOOLBOX_XML += '<block type="bdsp__set_seed_compost"></block>';
TOOLBOX_XML += '<block type="bdsp__set_seed_nuts"></block>';
TOOLBOX_XML += '<block type="bdsp__set_seed_water"></block>';
TOOLBOX_XML += '<block type="bdsp__set_sodateya_poke"></block>';
TOOLBOX_XML += '<block type="bdsp__set_stop_eye_encount"></block>';
TOOLBOX_XML += '<block type="bdsp__set_sys_flag"></block>';
TOOLBOX_XML += '<block type="bdsp__set_teleport_id"></block>';
TOOLBOX_XML += '<block type="bdsp__set_turn_hero_frame"></block>';
TOOLBOX_XML += '<block type="bdsp__set_turn_obj_frame"></block>';
TOOLBOX_XML += '<block type="bdsp__set_tv_int"></block>';
TOOLBOX_XML += '<block type="bdsp__set_tv_player_name"></block>';
TOOLBOX_XML += '<block type="bdsp__set_tv_poke_nick_name"></block>';
TOOLBOX_XML += '<block type="bdsp__set_up_door_anime"></block>';
TOOLBOX_XML += '<block type="bdsp__set_visibility"></block>';
TOOLBOX_XML += '<block type="bdsp__set_warp_id"></block>';
TOOLBOX_XML += '<block type="bdsp__set_weather"></block>';
TOOLBOX_XML += '<block type="bdsp__se_play"></block>';
TOOLBOX_XML += '<block type="bdsp__se_stop"></block>';
TOOLBOX_XML += '<block type="bdsp__se_wait"></block>';
TOOLBOX_XML += '<block type="bdsp__shinou_zukan_get_num"></block>';
TOOLBOX_XML += '<block type="bdsp__shinou_zukan_see_num"></block>';
TOOLBOX_XML += '<block type="bdsp__shop_call"></block>';
TOOLBOX_XML += '<block type="bdsp__shop_open_battle"></block>';
TOOLBOX_XML += '<block type="bdsp__shop_open_boutique_buy"></block>';
TOOLBOX_XML += '<block type="bdsp__shop_open_boutique_change"></block>';
TOOLBOX_XML += '<block type="bdsp__shop_open_fixed"></block>';
TOOLBOX_XML += '<block type="bdsp__shop_open_flower"></block>';
TOOLBOX_XML += '<block type="bdsp__shop_open_otenki"></block>';
TOOLBOX_XML += '<block type="bdsp__shop_open_palpark"></block>';
TOOLBOX_XML += '<block type="bdsp__shop_open_seal"></block>';
TOOLBOX_XML += '<block type="bdsp__shop_open_sell"></block>';
TOOLBOX_XML += '<block type="bdsp__slot_machine"></block>';
TOOLBOX_XML += '<block type="bdsp__slot_rentyan_chk"></block>';
TOOLBOX_XML += '<block type="bdsp__snd_climax_data_load"></block>';
TOOLBOX_XML += '<block type="bdsp__snd_initial_vol_set"></block>';
TOOLBOX_XML += '<block type="bdsp__sodateya_pokelist"></block>';
TOOLBOX_XML += '<block type="bdsp__sodateya_pokelist_get_result"></block>';
TOOLBOX_XML += '<block type="bdsp__sodateya_pokelist_set_proc"></block>';
TOOLBOX_XML += '<block type="bdsp__sodateya_tamago_chk"></block>';
TOOLBOX_XML += '<block type="bdsp__sodate_poke_level_str"></block>';
TOOLBOX_XML += '<block type="bdsp__sorawotobu"></block>';
TOOLBOX_XML += '<block type="bdsp__sorawotobu_end"></block>';
TOOLBOX_XML += '<block type="bdsp__speakers_name"></block>';
TOOLBOX_XML += '<block type="bdsp__sp_event_data_end"></block>';
TOOLBOX_XML += '<block type="bdsp__sp_location_set"></block>';
TOOLBOX_XML += '<block type="bdsp__sp_wild_btl_set"></block>';
TOOLBOX_XML += '<block type="bdsp__start_generate"></block>';
TOOLBOX_XML += '<block type="bdsp__start_paso_off_anm"></block>';
TOOLBOX_XML += '<block type="bdsp__start_paso_on_anm"></block>';
TOOLBOX_XML += '<block type="bdsp__start_rah_cyl"></block>';
TOOLBOX_XML += '<block type="bdsp__stop_effect"></block>';
TOOLBOX_XML += '<block type="bdsp__sub_coin"></block>';
TOOLBOX_XML += '<block type="bdsp__sub_gold"></block>';
TOOLBOX_XML += '<block type="bdsp__sub_goods"></block>';
TOOLBOX_XML += '<block type="bdsp__sub_item"></block>';
TOOLBOX_XML += '<block type="bdsp__sub_my_gold"></block>';
TOOLBOX_XML += '<block type="bdsp__sub_natsuki"></block>';
TOOLBOX_XML += '<block type="bdsp__sub_tama"></block>';
TOOLBOX_XML += '<block type="bdsp__sub_trap"></block>';
TOOLBOX_XML += '<block type="bdsp__sub_treasure"></block>';
TOOLBOX_XML += '<block type="bdsp__sub_wk"></block>';
TOOLBOX_XML += '<block type="bdsp__sub_wk_coin"></block>';
TOOLBOX_XML += '<block type="bdsp__support_name"></block>';
TOOLBOX_XML += '<block type="bdsp__support_pokemon_name"></block>';
TOOLBOX_XML += '<block type="bdsp__switch"></block>';
TOOLBOX_XML += '<block type="bdsp__sxy_bg_pos_change"></block>';
TOOLBOX_XML += '<block type="bdsp__sxy_dir_change"></block>';
TOOLBOX_XML += '<block type="bdsp__sxy_exit_pos_change"></block>';
TOOLBOX_XML += '<block type="bdsp__sxy_mv_change"></block>';
TOOLBOX_XML += '<block type="bdsp__sxy_pos_change"></block>';
TOOLBOX_XML += '<block type="bdsp__sys_flag_badge_count"></block>';
TOOLBOX_XML += '<block type="bdsp__sys_flag_badge_get"></block>';
TOOLBOX_XML += '<block type="bdsp__sys_flag_badge_set"></block>';
TOOLBOX_XML += '<block type="bdsp__sys_flag_bag_get"></block>';
TOOLBOX_XML += '<block type="bdsp__sys_flag_bag_set"></block>';
TOOLBOX_XML += '<block type="bdsp__sys_flag_flash_get"></block>';
TOOLBOX_XML += '<block type="bdsp__sys_flag_flash_reset"></block>';
TOOLBOX_XML += '<block type="bdsp__sys_flag_flash_set"></block>';
TOOLBOX_XML += '<block type="bdsp__sys_flag_game_clear_get"></block>';
TOOLBOX_XML += '<block type="bdsp__sys_flag_game_clear_set"></block>';
TOOLBOX_XML += '<block type="bdsp__sys_flag_kairiki_get"></block>';
TOOLBOX_XML += '<block type="bdsp__sys_flag_kairiki_reset"></block>';
TOOLBOX_XML += '<block type="bdsp__sys_flag_kairiki_set"></block>';
TOOLBOX_XML += '<block type="bdsp__sys_flag_kiribarai_get"></block>';
TOOLBOX_XML += '<block type="bdsp__sys_flag_kiribarai_reset"></block>';
TOOLBOX_XML += '<block type="bdsp__sys_flag_kiribarai_set"></block>';
TOOLBOX_XML += '<block type="bdsp__sys_flag_one_step_get"></block>';
TOOLBOX_XML += '<block type="bdsp__sys_flag_one_step_reset"></block>';
TOOLBOX_XML += '<block type="bdsp__sys_flag_one_step_set"></block>';
TOOLBOX_XML += '<block type="bdsp__sys_flag_pair_get"></block>';
TOOLBOX_XML += '<block type="bdsp__sys_flag_pair_reset"></block>';
TOOLBOX_XML += '<block type="bdsp__sys_flag_pair_set"></block>';
TOOLBOX_XML += '<block type="bdsp__sys_flag_shoes_get"></block>';
TOOLBOX_XML += '<block type="bdsp__sys_flag_shoes_set"></block>';
TOOLBOX_XML += '<block type="bdsp__sys_flag_zukan_get"></block>';
TOOLBOX_XML += '<block type="bdsp__sys_flag_zukan_set"></block>';
TOOLBOX_XML += '<block type="bdsp__take_seed"></block>';
TOOLBOX_XML += '<block type="bdsp__takikudari"></block>';
TOOLBOX_XML += '<block type="bdsp__takinobori"></block>';
TOOLBOX_XML += '<block type="bdsp__talkmsg"></block>';
TOOLBOX_XML += '<block type="bdsp__talkmsg_allput"></block>';
TOOLBOX_XML += '<block type="bdsp__talkmsg_allput_arc"></block>';
TOOLBOX_XML += '<block type="bdsp__talkmsg_allput_pms"></block>';
TOOLBOX_XML += '<block type="bdsp__talkmsg_arc"></block>';
TOOLBOX_XML += '<block type="bdsp__talkmsg_autoget"></block>';
TOOLBOX_XML += '<block type="bdsp__talkmsg_btower_appear"></block>';
TOOLBOX_XML += '<block type="bdsp__talkmsg_con_sio"></block>';
TOOLBOX_XML += '<block type="bdsp__talkmsg_ng_poke_name"></block>';
TOOLBOX_XML += '<block type="bdsp__talkmsg_noskip"></block>';
TOOLBOX_XML += '<block type="bdsp__talkmsg_pms"></block>';
TOOLBOX_XML += '<block type="bdsp__talkmsg_sp"></block>';
TOOLBOX_XML += '<block type="bdsp__talkmsg_sp_auto"></block>';
TOOLBOX_XML += '<block type="bdsp__talk_close"></block>';
TOOLBOX_XML += '<block type="bdsp__talk_close_no_clear"></block>';
TOOLBOX_XML += '<block type="bdsp__talk_coliseum_npc"></block>';
TOOLBOX_XML += '<block type="bdsp__talk_end"></block>';
TOOLBOX_XML += '<block type="bdsp__talk_keywait"></block>';
TOOLBOX_XML += '<block type="bdsp__talk_obj_end"></block>';
TOOLBOX_XML += '<block type="bdsp__talk_obj_pause_all"></block>';
TOOLBOX_XML += '<block type="bdsp__talk_obj_start"></block>';
TOOLBOX_XML += '<block type="bdsp__talk_obj_start_look_none"></block>';
TOOLBOX_XML += '<block type="bdsp__talk_obj_start_turn_not"></block>';
TOOLBOX_XML += '<block type="bdsp__talk_open"></block>';
TOOLBOX_XML += '<block type="bdsp__talk_poke_get_temoti_index"></block>';
TOOLBOX_XML += '<block type="bdsp__talk_start"></block>';
TOOLBOX_XML += '<block type="bdsp__talk_ug_npc"></block>';
TOOLBOX_XML += '<block type="bdsp__talk_union_npc"></block>';
TOOLBOX_XML += '<block type="bdsp__tamago_demo"></block>';
TOOLBOX_XML += '<block type="bdsp__tama_chk"></block>';
TOOLBOX_XML += '<block type="bdsp__tama_name"></block>';
TOOLBOX_XML += '<block type="bdsp__teleport"></block>';
TOOLBOX_XML += '<block type="bdsp__temoti_ball_load"></block>';
TOOLBOX_XML += '<block type="bdsp__temoti_ball_load_wait"></block>';
TOOLBOX_XML += '<block type="bdsp__temoti_box_monsno"></block>';
TOOLBOX_XML += '<block type="bdsp__temoti_box_pokemon_name"></block>';
TOOLBOX_XML += '<block type="bdsp__temoti_box_poke_chk"></block>';
TOOLBOX_XML += '<block type="bdsp__temoti_monsno"></block>';
TOOLBOX_XML += '<block type="bdsp__temoti_poke_chk"></block>';
TOOLBOX_XML += '<block type="bdsp__temoti_poke_chk_get_pos"></block>';
TOOLBOX_XML += '<block type="bdsp__temoti_poke_chk_num"></block>';
TOOLBOX_XML += '<block type="bdsp__temoti_poke_contest_status_get"></block>';
TOOLBOX_XML += '<block type="bdsp__temoti_poke_sex_get"></block>';
TOOLBOX_XML += '<block type="bdsp__temoti_poke_type"></block>';
TOOLBOX_XML += '<block type="bdsp__temoti_rotomu_form_chg_check"></block>';
TOOLBOX_XML += '<block type="bdsp__temoti_rotomu_form_get"></block>';
TOOLBOX_XML += '<block type="bdsp__temoti_rotomu_form_waza_chg"></block>';
TOOLBOX_XML += '<block type="bdsp__temoti_wazano"></block>';
TOOLBOX_XML += '<block type="bdsp__temoti_waza_name"></block>';
TOOLBOX_XML += '<block type="bdsp__time_wait"></block>';
TOOLBOX_XML += '<block type="bdsp__tmap_bg_set_proc"></block>';
TOOLBOX_XML += '<block type="bdsp__tobari_4f_shop_open"></block>';
TOOLBOX_XML += '<block type="bdsp__trade_list_set_proc"></block>';
TOOLBOX_XML += '<block type="bdsp__trainer_bgm_set"></block>';
TOOLBOX_XML += '<block type="bdsp__trainer_btl_set"></block>';
TOOLBOX_XML += '<block type="bdsp__trainer_flag_check"></block>';
TOOLBOX_XML += '<block type="bdsp__trainer_flag_reset"></block>';
TOOLBOX_XML += '<block type="bdsp__trainer_flag_set"></block>';
TOOLBOX_XML += '<block type="bdsp__trainer_id_get"></block>';
TOOLBOX_XML += '<block type="bdsp__trainer_lose"></block>';
TOOLBOX_XML += '<block type="bdsp__trainer_lose_check"></block>';
TOOLBOX_XML += '<block type="bdsp__trainer_msg_set"></block>';
TOOLBOX_XML += '<block type="bdsp__trainer_multi_btl_set"></block>';
TOOLBOX_XML += '<block type="bdsp__trainer_talk_type_get"></block>';
TOOLBOX_XML += '<block type="bdsp__trainer_type_get"></block>';
TOOLBOX_XML += '<block type="bdsp__training_open"></block>';
TOOLBOX_XML += '<block type="bdsp__training_open_wait"></block>';
TOOLBOX_XML += '<block type="bdsp__trap_chk"></block>';
TOOLBOX_XML += '<block type="bdsp__trap_name"></block>';
TOOLBOX_XML += '<block type="bdsp__treasure_chk"></block>';
TOOLBOX_XML += '<block type="bdsp__tr_card_set_proc"></block>';
TOOLBOX_XML += '<block type="bdsp__tr_type_name"></block>';
TOOLBOX_XML += '<block type="bdsp__tsign_set_proc"></block>';
TOOLBOX_XML += '<block type="bdsp__turearuki_item_timer_set"></block>';
TOOLBOX_XML += '<block type="bdsp__turearuki_pokemon_index"></block>';
TOOLBOX_XML += '<block type="bdsp__turearuki_pokemon_talk"></block>';
TOOLBOX_XML += '<block type="bdsp__turearuki_poke_create"></block>';
TOOLBOX_XML += '<block type="bdsp__turearuki_poke_delete"></block>';
TOOLBOX_XML += '<block type="bdsp__turearuki_take_item"></block>';
TOOLBOX_XML += '<block type="bdsp__turn_hero_site"></block>';
TOOLBOX_XML += '<block type="bdsp__turn_hero_talk_obj"></block>';
TOOLBOX_XML += '<block type="bdsp__tv_end"></block>';
TOOLBOX_XML += '<block type="bdsp__tv_entry_parkinfo_acce"></block>';
TOOLBOX_XML += '<block type="bdsp__tv_entry_parkinfo_init"></block>';
TOOLBOX_XML += '<block type="bdsp__tv_entry_parkinfo_item"></block>';
TOOLBOX_XML += '<block type="bdsp__tv_entry_watch_change_name"></block>';
TOOLBOX_XML += '<block type="bdsp__tv_entry_watch_hide_item"></block>';
TOOLBOX_XML += '<block type="bdsp__tv_get_data_total"></block>';
TOOLBOX_XML += '<block type="bdsp__tv_interviewer_check"></block>';
TOOLBOX_XML += '<block type="bdsp__tv_interview_entry"></block>';
TOOLBOX_XML += '<block type="bdsp__tv_interview_msg"></block>';
TOOLBOX_XML += '<block type="bdsp__tv_interview_str_word_set"></block>';
TOOLBOX_XML += '<block type="bdsp__tv_make_msg"></block>';
TOOLBOX_XML += '<block type="bdsp__tv_monitor_reset"></block>';
TOOLBOX_XML += '<block type="bdsp__tv_monitor_set"></block>';
TOOLBOX_XML += '<block type="bdsp__tv_red_gyarados_off"></block>';
TOOLBOX_XML += '<block type="bdsp__tv_red_gyarados_on"></block>';
TOOLBOX_XML += '<block type="bdsp__tv_set_endflag"></block>';
TOOLBOX_XML += '<block type="bdsp__tv_start"></block>';
TOOLBOX_XML += '<block type="bdsp__tv_start_number"></block>';
TOOLBOX_XML += '<block type="bdsp__tv_topic_branch_get"></block>';
TOOLBOX_XML += '<block type="bdsp__tv_topic_int_get"></block>';
TOOLBOX_XML += '<block type="bdsp__tv_topic_str_gender_word_set"></block>';
TOOLBOX_XML += '<block type="bdsp__tv_topic_str_word_set"></block>';
TOOLBOX_XML += '<block type="bdsp__tv_tpic_branch"></block>';
TOOLBOX_XML += '<block type="bdsp__tv_tpic_enable"></block>';
TOOLBOX_XML += '<block type="bdsp__ug_ballitem_check"></block>';
TOOLBOX_XML += '<block type="bdsp__ug_item_name"></block>';
TOOLBOX_XML += '<block type="bdsp__ug_leave_hoyuta"></block>';
TOOLBOX_XML += '<block type="bdsp__ug_man_shop_npc_rand_place"></block>';
TOOLBOX_XML += '<block type="bdsp__ug_shop_item_name"></block>';
TOOLBOX_XML += '<block type="bdsp__ug_shop_menu_init"></block>';
TOOLBOX_XML += '<block type="bdsp__ug_shop_talk_end"></block>';
TOOLBOX_XML += '<block type="bdsp__ug_shop_talk_start"></block>';
TOOLBOX_XML += '<block type="bdsp__ug_shop_trap_name"></block>';
TOOLBOX_XML += '<block type="bdsp__uma_anime_attach"></block>';
TOOLBOX_XML += '<block type="bdsp__uma_anime_play"></block>';
TOOLBOX_XML += '<block type="bdsp__uma_is_null"></block>';
TOOLBOX_XML += '<block type="bdsp__uma_play_wait"></block>';
TOOLBOX_XML += '<block type="bdsp__underground_kaseki_dig_count"></block>';
TOOLBOX_XML += '<block type="bdsp__underground_talk_count"></block>';
TOOLBOX_XML += '<block type="bdsp__underground_talk_count2"></block>';
TOOLBOX_XML += '<block type="bdsp__underground_talk_count_clear"></block>';
TOOLBOX_XML += '<block type="bdsp__underground_tool_give_count"></block>';
TOOLBOX_XML += '<block type="bdsp__underground_trap_hit_count"></block>';
TOOLBOX_XML += '<block type="bdsp__union_battle_start_check"></block>';
TOOLBOX_XML += '<block type="bdsp__union_beacon_change"></block>';
TOOLBOX_XML += '<block type="bdsp__union_bmpmenu_start"></block>';
TOOLBOX_XML += '<block type="bdsp__union_child_select_command_set"></block>';
TOOLBOX_XML += '<block type="bdsp__union_connect_cut_restart"></block>';
TOOLBOX_XML += '<block type="bdsp__union_connect_start"></block>';
TOOLBOX_XML += '<block type="bdsp__union_connect_talk_denied"></block>';
TOOLBOX_XML += '<block type="bdsp__union_connect_talk_ok"></block>';
TOOLBOX_XML += '<block type="bdsp__union_get_card_talk_no"></block>';
TOOLBOX_XML += '<block type="bdsp__union_get_info_talk_no"></block>';
TOOLBOX_XML += '<block type="bdsp__union_get_talk_number"></block>';
TOOLBOX_XML += '<block type="bdsp__union_id_set"></block>';
TOOLBOX_XML += '<block type="bdsp__union_map_change"></block>';
TOOLBOX_XML += '<block type="bdsp__union_obj_all_vanish"></block>';
TOOLBOX_XML += '<block type="bdsp__union_parent_card_talk_no"></block>';
TOOLBOX_XML += '<block type="bdsp__union_parent_start_command_set"></block>';
TOOLBOX_XML += '<block type="bdsp__union_pokelist_set_proc"></block>';
TOOLBOX_XML += '<block type="bdsp__union_proc"></block>';
TOOLBOX_XML += '<block type="bdsp__union_result_get"></block>';
TOOLBOX_XML += '<block type="bdsp__union_return_setup"></block>';
TOOLBOX_XML += '<block type="bdsp__union_script_result_set"></block>';
TOOLBOX_XML += '<block type="bdsp__union_trainer_name_regist"></block>';
TOOLBOX_XML += '<block type="bdsp__union_view_my_status_set"></block>';
TOOLBOX_XML += '<block type="bdsp__union_view_tr_sel_set"></block>';
TOOLBOX_XML += '<block type="bdsp__union_view_tr_type_msg_get"></block>';
TOOLBOX_XML += '<block type="bdsp__union_view_tr_type_no_get"></block>';
TOOLBOX_XML += '<block type="bdsp__unique_poke_fix"></block>';
TOOLBOX_XML += '<block type="bdsp__unique_poke_temp"></block>';
TOOLBOX_XML += '<block type="bdsp__unknown_form_get"></block>';
TOOLBOX_XML += '<block type="bdsp__unknown_msg"></block>';
TOOLBOX_XML += '<block type="bdsp__update_weather"></block>';
TOOLBOX_XML += '<block type="bdsp__urayama_encount_no_chk"></block>';
TOOLBOX_XML += '<block type="bdsp__urayama_encount_set"></block>';
TOOLBOX_XML += '<block type="bdsp__use_special_item"></block>';
TOOLBOX_XML += '<block type="bdsp__use_spray"></block>';
TOOLBOX_XML += '<block type="bdsp__use_sub_attribute"></block>';
TOOLBOX_XML += '<block type="bdsp__use_tankenset"></block>';
TOOLBOX_XML += '<block type="bdsp__vanish_dummy_obj_add"></block>';
TOOLBOX_XML += '<block type="bdsp__vanish_dummy_obj_del"></block>';
TOOLBOX_XML += '<block type="bdsp__visible_obj_prop"></block>';
TOOLBOX_XML += '<block type="bdsp__vm_add"></block>';
TOOLBOX_XML += '<block type="bdsp__voice_play"></block>';
TOOLBOX_XML += '<block type="bdsp__voice_wait"></block>';
TOOLBOX_XML += '<block type="bdsp__wait_3d_anime"></block>';
TOOLBOX_XML += '<block type="bdsp__wait_check_online_account"></block>';
TOOLBOX_XML += '<block type="bdsp__wait_special_win_label"></block>';
TOOLBOX_XML += '<block type="bdsp__warp_enable_set"></block>';
TOOLBOX_XML += '<block type="bdsp__warp_end_animation"></block>';
TOOLBOX_XML += '<block type="bdsp__warp_panel_end"></block>';
TOOLBOX_XML += '<block type="bdsp__warp_panel_start"></block>';
TOOLBOX_XML += '<block type="bdsp__warp_start_animation"></block>';
TOOLBOX_XML += '<block type="bdsp__wazalist_get_result"></block>';
TOOLBOX_XML += '<block type="bdsp__wazalist_set_proc"></block>';
TOOLBOX_XML += '<block type="bdsp__waza_count"></block>';
TOOLBOX_XML += '<block type="bdsp__waza_del"></block>';
TOOLBOX_XML += '<block type="bdsp__waza_item_chk"></block>';
TOOLBOX_XML += '<block type="bdsp__waza_name"></block>';
TOOLBOX_XML += '<block type="bdsp__white_in"></block>';
TOOLBOX_XML += '<block type="bdsp__white_out"></block>';
TOOLBOX_XML += '<block type="bdsp__wifi_auto_reg"></block>';
TOOLBOX_XML += '<block type="bdsp__wifi_earth_set_proc"></block>';
TOOLBOX_XML += '<block type="bdsp__wifi_husiginaokurimono_open_flag_set"></block>';
TOOLBOX_XML += '<block type="bdsp__wifi_p2p_match_event_call"></block>';
TOOLBOX_XML += '<block type="bdsp__wifi_p2p_match_set_del"></block>';
TOOLBOX_XML += '<block type="bdsp__wild_btl_set"></block>';
TOOLBOX_XML += '<block type="bdsp__wipe_fade_end_check"></block>';
TOOLBOX_XML += '<block type="bdsp__wipe_fade_start"></block>';
TOOLBOX_XML += '<block type="bdsp__wireless_icon_easy"></block>';
TOOLBOX_XML += '<block type="bdsp__wireless_icon_easy_end"></block>';
TOOLBOX_XML += '<block type="bdsp__worldtrade_set_proc"></block>';
TOOLBOX_XML += '<block type="bdsp__yes_no_win"></block>';
TOOLBOX_XML += '<block type="bdsp__zenkoku_zukan_flag"></block>';
TOOLBOX_XML += '<block type="bdsp__zenkoku_zukan_get_num"></block>';
TOOLBOX_XML += '<block type="bdsp__zenkoku_zukan_see_num"></block>';
TOOLBOX_XML += '<block type="bdsp__zishin"></block>';
TOOLBOX_XML += '<block type="bdsp__zone_name"></block>';
TOOLBOX_XML += '<block type="bdsp__zone_name2"></block>';
TOOLBOX_XML += '<block type="bdsp__zone_name_label"></block>';
TOOLBOX_XML += '<block type="bdsp__zukan_chk_national"></block>';
TOOLBOX_XML += '<block type="bdsp__zukan_chk_shinou"></block>';
TOOLBOX_XML += '<block type="bdsp__zukan_recongnize_national"></block>';
TOOLBOX_XML += '<block type="bdsp__zukan_recongnize_shinou"></block>';
TOOLBOX_XML += '<block type="bdsp__zukan_sex_ver_up"></block>';
TOOLBOX_XML += '<block type="bdsp__zukan_text_ver_up"></block>';
TOOLBOX_XML += '<block type="bdsp__zukan_touroku"></block>';
TOOLBOX_XML += '<block type="bdsp__zukan_touroku_wait"></block>';
TOOLBOX_XML += '</category>';
TOOLBOX_XML += '<category name="END" colour="230">';
TOOLBOX_XML += '<block type="bdsp__end"></block>';
TOOLBOX_XML += '</category>';
TOOLBOX_XML += '</xml>';
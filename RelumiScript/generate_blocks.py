import json
import os

# --- CONFIGURATION ---
INPUT_JSON = "JSON/commands.json"
OUTPUT_JS = "Blockly/block_defs.js"

# Define "Fancy" overrides here. 
# If a command name is in this dict, the generic generator will skip it, 
# and we will inject the custom definition instead.
CUSTOM_BLOCKS = {
    "_ADD_POKEMON": {
        "type": "bdsp_add_pokemon",
        "message0": "Give Pokemon %1 Level %2 Item %3 (Unknown %4)",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "ARG_0",
                "options": [
                    ["Bulbasaur", "1"], ["Ivysaur", "2"], ["Venusaur", "3"], 
                    ["Charmander", "4"], ["Charmeleon", "5"], ["Charizard", "6"],
                    ["Pikachu", "25"], ["Arceus", "493"] 
                    # You can expand this list or load it from another JSON file
                ]
            },
            { "type": "field_number", "name": "ARG_1", "value": 5, "min": 1, "max": 100 },
            {
                "type": "field_dropdown",
                "name": "ARG_2",
                "options": [ ["None", "0"], ["Master Ball", "1"], ["Potion", "17"] ]
            },
            { "type": "field_number", "name": "ARG_3", "value": 0 }
        ],
        "previousStatement": None,
        "nextStatement": None,
        "colour": 160,
        "tooltip": "Gives a Pokemon to the player (Custom Block)"
    }
}

def generate_js():
    if not os.path.exists(INPUT_JSON):
        print(f"Error: Could not find {INPUT_JSON}")
        return

    with open(INPUT_JSON, "r", encoding="utf-8-sig") as f:
        commands = json.load(f)

    js_output = []
    
    # 1. Start writing the JS file
    js_output.append("// Auto-generated Block Definitions")
    js_output.append("console.log('Loading static block definitions...');")
    js_output.append("var commandMap = {};") 

    # 2. Iterate through all commands
    for cmd in commands:
        name = cmd.get("Name")
        desc = cmd.get("Description", "No description")
        args = cmd.get("Args", [])
        
        block_type = f"bdsp_{name.lower()}"
        
        # Register in commandMap for the decompiler (Text -> Blocks)
        # We need to know how many args it has to parse it correctly
        js_output.append(f"commandMap['{name}'] = {{ type: '{block_type}', args: {len(args)} }};")

        # CHECK: Is this a custom fancy block?
        if name in CUSTOM_BLOCKS:
            # Inject the manually written block definition
            defi = CUSTOM_BLOCKS[name]
            js_output.append(f"Blockly.Blocks['{block_type}'] = {{")
            js_output.append(f"  init: function() {{")
            js_output.append(f"    this.jsonInit({json.dumps(defi)});")
            js_output.append(f"  }}")
            js_output.append(f"}};")
            
            # Inject the Generator
            js_output.append(f"Blockly.JavaScript['{block_type}'] = function(block) {{")
            js_output.append(f"  var code = '{name}(';")
            for i in range(len(defi['args0'])):
                js_output.append(f"  code += block.getFieldValue('ARG_{i}');")
                if i < len(defi['args0']) - 1:
                    js_output.append("  code += ', ';")
            js_output.append("  code += ')\\n';")
            js_output.append("  return code;")
            js_output.append("};")
            
        else:
            # Standard Generic Block Generation
            js_output.append(f"Blockly.Blocks['{block_type}'] = {{")
            js_output.append("  init: function() {")
            js_output.append(f"    this.appendDummyInput().appendField('{name}');")
            
            for i, arg in enumerate(args):
                arg_name = arg.get("TentativeName", f"Arg {i}")
                # For generic blocks, we use Value Inputs (sockets) so you can plug variables in
                js_output.append(f"    this.appendValueInput('ARG_{i}').appendField('{arg_name}');")
            
            js_output.append("    this.setPreviousStatement(true, null);")
            js_output.append("    this.setNextStatement(true, null);")
            js_output.append("    this.setColour(230);")
            js_output.append(f"    this.setTooltip({json.dumps(desc)});")
            js_output.append("  }")
            js_output.append("};")

            # Standard Generator
            js_output.append(f"Blockly.JavaScript['{block_type}'] = function(block) {{")
            js_output.append(f"  var code = '{name}(';")
            for i in range(len(args)):
                # Generic blocks read from attached inputs
                js_output.append(f"  var val = Blockly.JavaScript.valueToCode(block, 'ARG_{i}', Blockly.JavaScript.ORDER_ATOMIC) || '0';")
                js_output.append("  val = val.replace(/^'|'$/g, '');") # clean quotes
                js_output.append("  code += val;")
                if i < len(args) - 1:
                    js_output.append("  code += ', ';")
            js_output.append("  code += ')\\n';")
            js_output.append("  return code;")
            js_output.append("};")

    # 3. Write Toolbox XML definition
    js_output.append("var TOOLBOX_XML = '<xml>';")
    js_output.append("TOOLBOX_XML += '<category name=\"Logic\" colour=\"210\">' +")
    js_output.append("'  <block type=\"controls_if\"></block>' +")
    js_output.append("'  <block type=\"logic_compare\"></block>' +")
    js_output.append("'  <block type=\"math_number\"></block>' +")
    js_output.append("'  <block type=\"text\"></block>' +")
    js_output.append("'</category>';")
    
    js_output.append("TOOLBOX_XML += '<category name=\"Commands\" colour=\"230\">';")
    for cmd in commands:
        name = cmd.get("Name")
        block_type = f"bdsp_{name.lower()}"
        js_output.append(f"TOOLBOX_XML += '<block type=\"{block_type}\"></block>';")
    js_output.append("TOOLBOX_XML += '</category></xml>';")

    # Ensure output dir exists
    os.makedirs(os.path.dirname(OUTPUT_JS), exist_ok=True)
    
    with open(OUTPUT_JS, "w", encoding="utf-8") as f:
        f.write("\n".join(js_output))
    
    print(f"Success! Generated definitions for {len(commands)} commands.")
    print(f"File saved to: {OUTPUT_JS}")

if __name__ == "__main__":
    generate_js()
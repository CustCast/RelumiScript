import json
import os

# --- CONFIGURATION ---
INPUT_JSON = "JSON/commands.json"
OUTPUT_JS = "Blockly/block_defs.js"

# --- CUSTOM BLOCKS ---
CUSTOM_BLOCKS = {
    # 1. SPECIAL LABEL BLOCK
    "bdsp_label": {
        "type": "bdsp_label",
        "message0": "Label: %1",
        "args0": [{ "type": "field_input", "name": "LABEL_NAME", "text": "Label_Name" }],
        "previousStatement": None,
        "nextStatement": None,
        "colour": 60,
        "tooltip": "A jump target for scripts."
    }
}

def generate_js():
    if not os.path.exists(INPUT_JSON):
        print(f"Error: {INPUT_JSON} not found")
        return

    with open(INPUT_JSON, "r", encoding="utf-8-sig") as f:
        commands = json.load(f)

    js_output = []
    js_output.append("// Auto-generated Block Definitions")
    js_output.append("var commandMap = {};") 

    # --- 1. INJECT LABEL BLOCK ---
    js_output.append("Blockly.Blocks['bdsp_label'] = { init: function() { this.jsonInit(" + json.dumps(CUSTOM_BLOCKS['bdsp_label']) + "); } };")
    js_output.append("Blockly.JavaScript['bdsp_label'] = function(block) { return block.getFieldValue('LABEL_NAME') + ':\\n'; };")

    # --- 2. GENERATE COMMAND BLOCKS ---
    for cmd in commands:
        name = cmd.get("Name")
        desc = cmd.get("Description", "No description")
        args = cmd.get("Args", [])
        
        block_type = f"bdsp_{name.lower()}"
        
        # Register for Decompiler
        # Note: We store the exact 'Name' to help the parser match match case
        js_output.append(f"commandMap['{name}'] = {{ type: '{block_type}', args: {len(args)} }};")

        if name in CUSTOM_BLOCKS:
            # Custom Block
            defi = CUSTOM_BLOCKS[name]
            js_output.append(f"Blockly.Blocks['{block_type}'] = {{ init: function() {{ this.jsonInit({json.dumps(defi)}); }} }};")
            
            # Generator (SPACE SEPARATED)
            js_output.append(f"Blockly.JavaScript['{block_type}'] = function(block) {{")
            js_output.append(f"  var code = '{name}';")
            for i in range(len(defi['args0'])):
                js_output.append(f"  code += ' ' + block.getFieldValue('ARG_{i}');")
            js_output.append("  code += '\\n'; return code; };")
            
        else:
            # Generic Block
            js_output.append(f"Blockly.Blocks['{block_type}'] = {{")
            js_output.append("  init: function() {")
            js_output.append(f"    this.appendDummyInput().appendField('{name}');")
            for i, arg in enumerate(args):
                arg_name = arg.get("TentativeName", f"Arg {i}")
                js_output.append(f"    this.appendValueInput('ARG_{i}').appendField('{arg_name}');")
            js_output.append("    this.setPreviousStatement(true, null);")
            js_output.append("    this.setNextStatement(true, null);")
            js_output.append("    this.setColour(230);")
            js_output.append(f"    this.setTooltip({json.dumps(desc)});")
            js_output.append("  } };")

            # Generator (SPACE SEPARATED)
            js_output.append(f"Blockly.JavaScript['{block_type}'] = function(block) {{")
            js_output.append(f"  var code = '{name}';")
            for i in range(len(args)):
                js_output.append(f"  var val = Blockly.JavaScript.valueToCode(block, 'ARG_{i}', Blockly.JavaScript.ORDER_ATOMIC) || '0';")
                js_output.append("  val = val.replace(/^'|'$/g, '');") 
                js_output.append("  code += ' ' + val;")
            js_output.append("  code += '\\n'; return code; };")

    # --- 3. GENERATE TOOLBOX XML ---
    js_output.append("var TOOLBOX_XML = '<xml>';")
    js_output.append("TOOLBOX_XML += '<category name=\"Logic\" colour=\"210\">' +")
    js_output.append("'  <block type=\"bdsp_label\"></block>' +") # Add Label to toolbox
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

    # Write File
    os.makedirs(os.path.dirname(OUTPUT_JS), exist_ok=True)
    with open(OUTPUT_JS, "w", encoding="utf-8-sig") as f:
        f.write("\n".join(js_output))
    
    print(f"Done! Saved to {OUTPUT_JS}")

if __name__ == "__main__":
    generate_js()
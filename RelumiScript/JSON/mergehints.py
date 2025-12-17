import json
import os

def merge_json_files(hints_path, commands_path, output_path):
    print(f"Loading {hints_path}...")
    try:
        with open(hints_path, 'r', encoding='utf-8') as f:
            hints_data = json.load(f)
    except FileNotFoundError:
        hints_data = []

    print(f"Loading {commands_path}...")
    with open(commands_path, 'r', encoding='utf-8') as f:
        commands_data = json.load(f)

    # Create a map of existing hints for easy lookup
    hints_map = {h['Cmd']: h for h in hints_data}
    
    merged_hints = []
    
    for cmd in commands_data:
        cmd_name = cmd['Name']
        
        if cmd_name in hints_map:
            # --- MIGRATION LOGIC ---
            # Existing hint: Ensure 'Type' is a list for all params
            hint = hints_map[cmd_name]
            for param in hint['Params']:
                # If Type is a string, convert it to a list
                if 'Type' in param and isinstance(param['Type'], str):
                    param['Type'] = [param['Type']]
            merged_hints.append(hint)
        else:
            # --- PLACEHOLDER LOGIC ---
            # New hint: Create from command definition
            new_params = []
            new_sentence = [{"Text": f"Execute {cmd_name}"}]
            
            if 'Args' in cmd:
                for idx, arg in enumerate(cmd['Args']):
                    # Get type list from command definition
                    # commands.json already uses lists for types (e.g. ["Work", "Number"])
                    arg_types = arg.get('Type', ["Unknown"])
                    if isinstance(arg_types, str):
                        arg_types = [arg_types]
                    
                    # Create a friendly reference name (e.g., "TentativeName" -> "tentative_name")
                    ref_name = arg.get('TentativeName', f"arg{idx}").lower().replace(" ", "_")
                    
                    new_params.append({
                        "Index": idx,
                        "Type": arg_types,
                        "Ref": ref_name,
                        "DependsOn": None
                    })
                    
                    # Add a default visual representation to the sentence
                    new_sentence.append({"Text": " "})
                    new_sentence.append({"Check": ref_name, "Text": f"{{{ref_name}}}"})
            
            merged_hints.append({
                "Cmd": cmd_name,
                "Params": new_params,
                "Sentence": new_sentence
            })

    print(f"Saving merged data to {output_path}...")
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(merged_hints, f, indent=2, ensure_ascii=False)
    print("Done.")

if __name__ == "__main__":
    # Adjust paths relative to where you run the script
    merge_json_files('hints.json', 'commands.json', 'hints.json')
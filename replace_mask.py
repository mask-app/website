import os
import re

def replace_in_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        return
    
    # Negative lookbehind: don't match if preceded by -, /, _, #, ., or any letter/number (though \b handles letters/numbers mostly)
    # Also skip if preceded by ':' ? No, `: mask` might exist in text.
    # Exclude preceded by: -, /, _, ., #
    # Exclude followed by: -, _, ., :, G, I (for SVG ids)
    pattern = r'(?<![-/_.#\da-zA-Z])\bmask\b(?![-_.GI:\da-zA-Z])'
    
    new_content = re.sub(pattern, 'Mask', content)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk('.'):
    for file in files:
        if file.endswith('.webmanifest'):
             replace_in_file(os.path.join(root, file))

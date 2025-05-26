import os
import re

# Define the directory path
DIRECTORY = "/Users/liudmilanemkova/Desktop/adapty-docs/versioned_docs/version-3.0"

# Define filename patterns to include
INCLUDE_PREFIXES = ("server-side-api", "ss", "web-api", "export-analytics-api")

# Regular expressions
TABITEM_PATTERN = re.compile(r'(<TabItem\s+value=")[^"]*("\s+label=")([^"<]+)("[^>]*>)')

# Mapping of labels to their corresponding values
TABITEM_MAPPING = {
    "cURL": "curl",
    "Python": "python",
    "JavaScript": "js",
    "Ruby": "ruby",
    "PHP": "php",
}

def get_tab_value(label):
    """Determines the correct value based on the label."""
    for key, value in TABITEM_MAPPING.items():
        if key in label:
            return value
    return None

def update_tabs_in_file(file_path, found_values):
    """Updates the <TabItem> tags in the given markdown file."""
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Replace <TabItem> values based on label content and track found values
    def replace_tabitem(match):
        prefix, label_prefix, label, suffix = match.groups()
        new_value = get_tab_value(label)
        found_values.add(label)  # Track found tab labels
        if new_value:
            return f'{prefix}{new_value}{label_prefix}{label}{suffix}'
        return match.group(0)
    
    updated_content = TABITEM_PATTERN.sub(replace_tabitem, content)
    
    # Write back only if changes were made
    if updated_content != content:
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(updated_content)
        print(f"Updated: {file_path}")
    else:
        print(f"No changes: {file_path}")

def process_md_files(directory):
    """Processes all .md files in the directory, including specific prefixes."""
    found_values = set()
    for filename in os.listdir(directory):
        if filename.endswith(".md") and filename.startswith(INCLUDE_PREFIXES):
            file_path = os.path.join(directory, filename)
            update_tabs_in_file(file_path, found_values)
    
    print("\nTabItem labels found but not listed:")
    print(set(found_values) - set(TABITEM_MAPPING.keys()))

if __name__ == "__main__":
    process_md_files(DIRECTORY)

import os
import re

# Define the directory path
DIRECTORY = "/Users/liudmilanemkova/Desktop/adapty-docs/versioned_docs/version-3.0"

# Define filename patterns to exclude
EXCLUDE_PREFIXES = ("server-side-api", "ss", "web-api", "export-analytics-api")

# Regular expressions
TABS_PATTERN = re.compile(r'<Tabs(?:\s+groupId="[^"]*")?(\s+queryString)?>')
TABITEM_PATTERN = re.compile(r'(<TabItem\s+value=")[^"]*("\s+label=")([^"<]+)("[^>]*>)')

# Mapping of labels to their corresponding values
TABITEM_MAPPING = {
    "Swift": "swift",
    "iOS": "swift",
    "Swift-Callback": "swift-callback",
    "Swift UI": "swiftui",
    "SwiftUI": "swiftui",
    "Kotlin": "kotlin",
    "Java": "java",
    "RN": "rn",
    "React Native": "rn",
    "Flutter": "flutter",
    "Unity": "unity",
}

def get_tab_value(label):
    """Determines the correct value based on the label."""
    if "Swift-Callback" in label:
        return "swift-callback"
    if "Swift UI" in label or "SwiftUI" in label:
        return "swiftui"
    if "Java" in label:
        return "java"
    if ("Kotlin" in label or "Android" in label) and "Java" not in label:
        return "kotlin"
    for key, value in TABITEM_MAPPING.items():
        if key in label:
            return value
    return None

def update_tabs_in_file(file_path):
    """Updates the <Tabs> and <TabItem> tags in the given markdown file."""
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Replace the <Tabs> occurrences ensuring groupId is set to "current-os"
    updated_content = TABS_PATTERN.sub(r'<Tabs groupId="current-os" queryString>', content)
    
    # Replace <TabItem> values based on label content
    def replace_tabitem(match):
        prefix, label_prefix, label, suffix = match.groups()
        new_value = get_tab_value(label)
        if new_value:
            return f'{prefix}{new_value}{label_prefix}{label}{suffix}'
        return match.group(0)
    
    updated_content = TABITEM_PATTERN.sub(replace_tabitem, updated_content)
    
    # Write back only if changes were made
    if updated_content != content:
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(updated_content)
        print(f"Updated: {file_path}")
    else:
        print(f"No changes: {file_path}")

def process_md_files(directory):
    """Processes all .md files in the directory, excluding specific prefixes."""
    for filename in os.listdir(directory):
        if filename.endswith(".md") and not filename.startswith(EXCLUDE_PREFIXES):
            file_path = os.path.join(directory, filename)
            update_tabs_in_file(file_path)

if __name__ == "__main__":
    process_md_files(DIRECTORY)
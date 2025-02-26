import os
import re

# Define the directory path
DIRECTORY = "/Users/liudmilanemkova/Desktop/adapty-docs/versioned_docs/version-3.0"

# Regular expression to extract TabItem values
TABITEM_PATTERN = re.compile(r'<TabItem\s+value="([^"]+)"')

def extract_tabitem_values(directory):
    """Extracts and lists all unique TabItem values in markdown files."""
    tab_values = set()

    for filename in os.listdir(directory):
        if filename.endswith(".md"):
            file_path = os.path.join(directory, filename)
            with open(file_path, "r", encoding="utf-8") as file:
                content = file.read()
                matches = TABITEM_PATTERN.findall(content)
                tab_values.update(matches)

    print("\nUnique <TabItem> values found:")
    for value in sorted(tab_values):
        print(value)

if __name__ == "__main__":
    extract_tabitem_values(DIRECTORY)

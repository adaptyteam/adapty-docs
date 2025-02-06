import os
import re

# Directories to scan
directories = [
    "/Users/liudmilanemkova/Desktop/adapty-docs/src/components/reusable/",
    "/Users/liudmilanemkova/Desktop/adapty-docs/versioned_docs/version-3.0/"
]

# Regular expression to match code blocks
code_block_pattern = re.compile(r'```(\w+)(.*?)\n', re.MULTILINE)

def update_file(file_path):
    """Update a markdown file to add 'showLineNumbers' in code snippets, but skip those where LanguageName is 'http'."""
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    updated_content = content

    # Function to modify matches
    def replacer(match):
        lang = match.group(1)  # Language name
        attrs = match.group(2).strip()  # Additional attributes

        # Skip modifying if the language is 'http'
        if lang.lower() == "http":
            return match.group(0)  # Return original match unchanged

        # Check if 'showLineNumbers' is already present
        if "showLineNumbers" not in attrs:
            if attrs:
                attrs = f"showLineNumbers {attrs}"
            else:
                attrs = "showLineNumbers"

        return f"```{lang} {attrs}\n"

    # Apply regex replacement
    updated_content = re.sub(code_block_pattern, replacer, updated_content)

    # Only update if changes were made
    if updated_content != content:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(updated_content)
        print(f"Updated: {file_path}")

def process_directory(directory):
    """Recursively processes all markdown files in a directory."""
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".md"):
                update_file(os.path.join(root, file))

# Process all directories
for dir_path in directories:
    process_directory(dir_path)

print("✅ All markdown files updated successfully! Skipped 'http' snippets.")

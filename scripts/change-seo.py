import os
import re

# Define path to markdown files
MD_DIRECTORY = "/Users/liudmilanemkova/Desktop/adapty-docs/versioned_docs/version-3.0/"

# Regex patterns for extracting fields
description_pattern = re.compile(r'description:\s*"(.*?)"', re.IGNORECASE)
metadata_pattern = re.compile(r'metadataTitle:\s*"(.*?)"', re.IGNORECASE)

# Iterate through all .md files in the directory
for filename in os.listdir(MD_DIRECTORY):
    if filename.endswith(".md"):
        file_path = os.path.join(MD_DIRECTORY, filename)
        
        with open(file_path, "r", encoding="utf-8") as file:
            content = file.read()

        # Extract existing values
        description_match = description_pattern.search(content)
        metadata_match = metadata_pattern.search(content)

        if description_match and metadata_match:
            current_description = description_match.group(1)
            current_metadata = metadata_match.group(1)

            # Swap the values
            updated_content = description_pattern.sub(f'description: "{current_metadata}"', content)
            updated_content = metadata_pattern.sub(f'metadataTitle: "{current_description}"', updated_content)

            # Save the updated content
            with open(file_path, "w", encoding="utf-8") as file:
                file.write(updated_content)
            
            print(f"✅ Swapped fields in: {filename}")
        else:
            print(f"⚠️ Fields not found in: {filename}")

print("🎉 Swap process completed!")

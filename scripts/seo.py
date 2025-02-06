import os
import re
import pandas as pd

# Define paths
MD_DIRECTORY = "/Users/liudmilanemkova/Desktop/adapty-docs/versioned_docs/version-3.0/"
CSV_FILE = "/Users/liudmilanemkova/Downloads/Docs pages SEO optimization - Sheet1.csv"  # Local path to CSV file

# Load CSV file
df = pd.read_csv(CSV_FILE)

# Ensure required columns exist
required_columns = {"Slug", "Updated SEO title", "Updated meta description"}
if not required_columns.issubset(df.columns):
    raise ValueError(f"CSV file must contain the following columns: {required_columns}")

# Convert Slug column to a dictionary for quick lookup
updates = {
    str(row["Slug"]).strip(): (str(row["Updated SEO title"]).strip(), str(row["Updated meta description"]).strip())
    for _, row in df.iterrows()
}

# Regex patterns for extracting fields
description_pattern = re.compile(r'description:\s*"(.*?)"', re.IGNORECASE)
metadata_pattern = re.compile(r'metadataTitle:\s*"(.*?)"', re.IGNORECASE)

# Iterate through all .md files in the directory
for filename in os.listdir(MD_DIRECTORY):
    if filename.endswith(".md"):
        slug_name = filename[:-3]  # Remove .md extension
        if slug_name not in updates:
            continue  # Skip files that don't match a slug in the CSV

        file_path = os.path.join(MD_DIRECTORY, filename)
        
        with open(file_path, "r", encoding="utf-8") as file:
            content = file.read()

        # Get new values from CSV
        new_description, new_metadata = updates[slug_name]

        updated_content = content

        # Update description if provided and not empty
        if new_description and new_description.lower() != "nan" and description_pattern.search(content):
            updated_content = description_pattern.sub(f'description: "{new_description}"', updated_content)

        # Update metadataTitle if provided and not empty
        if new_metadata and new_metadata.lower() != "nan" and metadata_pattern.search(content):
            updated_content = metadata_pattern.sub(f'metadataTitle: "{new_metadata}"', updated_content)

        # Save the updated content if changes were made
        if updated_content != content:
            with open(file_path, "w", encoding="utf-8") as file:
                file.write(updated_content)
            print(f"✅ Updated: {filename}")
        else:
            print(f"🔹 No changes for: {filename}")

print("🎉 Update process completed!")

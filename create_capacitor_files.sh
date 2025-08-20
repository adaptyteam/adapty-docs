#!/bin/bash

# Script to create Capacitor documentation files from React Native files
# This script copies React Native files and replaces "react-native" with "capacitor" in content and filenames

cd versioned_docs/version-3.0

# Find all react-native files
for file in react-native-*.md; do
    if [ -f "$file" ]; then
        # Create the new filename by replacing react-native with capacitor
        new_file=$(echo "$file" | sed 's/react-native-/capacitor-/g')
        
        echo "Creating $new_file from $file"
        
        # Copy the file and replace content
        sed 's/react-native-/capacitor-/g; s/React Native/Capacitor/g; s/react-native-adapty/@adapty\/capacitor/g; s/@adapty\/react-native-ui/@adapty\/capacitor-ui/g; s/sdkreactnative/sdkcapacitor/g' "$file" > "$new_file"
        
        echo "Created $new_file"
    fi
done

echo "All Capacitor files have been created!"

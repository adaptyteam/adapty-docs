import os

# Paths to the directories
docs_folders = [
    '/Users/liudmilanemkova/Desktop/adapty-docs/versioned_docs/version-3.0',
    '/Users/liudmilanemkova/Desktop/adapty-docs/src/components/reusable'
]

ff_img_folder = '/Users/liudmilanemkova/Desktop/adapty-docs/versioned_docs/version-3.0/FF_img'
img_folder = '/Users/liudmilanemkova/Desktop/adapty-docs/versioned_docs/version-3.0/img'

# List of image file extensions to check
image_extensions = ['.png', '.jpg', '.gif', '.webp']

# Function to get all image files in the image folder (excluding .snagx files)
def get_image_files(folder, extensions):
    image_files = []
    for root, dirs, files in os.walk(folder):
        for file in files:
            if any(file.endswith(ext) for ext in extensions):
                image_files.append(file)
    return image_files

# Function to check if an image is used in any of the provided .md folders
def is_image_referenced(image_name, docs_folders):
    for docs_folder in docs_folders:
        for root, dirs, files in os.walk(docs_folder):
            for file in files:
                if file.endswith('.md'):
                    file_path = os.path.join(root, file)
                    try:
                        with open(file_path, 'r', encoding='utf-8') as md_file:
                            content = md_file.read()
                            if image_name in content:
                                return True
                    except Exception as e:
                        print(f"Error reading {file_path}: {e}")
    return False

# Function to find and delete unused images
def find_and_delete_unused_images(image_folder, docs_folders):
    all_images = get_image_files(image_folder, image_extensions)
    unused_images = []
    for image in all_images:
        if not is_image_referenced(image, docs_folders):
            unused_images.append(image)
            image_path = os.path.join(image_folder, image)
            try:
                os.remove(image_path)
                print(f"Deleted unused image: {image}")
            except OSError as e:
                print(f"Error deleting {image}: {e}")

    # Output summary
    if not unused_images:
        print(f"No unused images found in {image_folder}.")
    else:
        print(f"Unused images in {image_folder}: {unused_images}")

# Run checks
print("🔍 Checking FF_img folder:")
find_and_delete_unused_images(ff_img_folder, docs_folders)

print("\n🔍 Checking img folder:")
find_and_delete_unused_images(img_folder, docs_folders)

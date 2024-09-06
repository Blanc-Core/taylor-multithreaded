import os

def write_to_output_file(content, file_path, rewrite=False):
    """
    Write the provided content to the specified file.
    Handles encoding issues and appends to the file if rewrite is False.
    If rewrite is True, the file will be overwritten.
    """
    try:
        # Ensure the directory exists
        os.makedirs(os.path.dirname(file_path), exist_ok=True)

        # Open the file with UTF-8 encoding to handle special characters
        mode = 'w' if rewrite else 'a'
        with open(file_path, mode, encoding='utf-8') as file:
            file.write(content)
    except Exception as e:
        print(f"An error occurred while writing to {file_path}: {e}")


# Example usage
if __name__ == "__main__":
    content = "Sample content to write to file.\n"
    file_path = "path/to/your/output.txt"
    
    # Calling the function without specifying 'rewrite', so it defaults to False
    write_to_output_file(content, file_path)
    
    # Calling the function with 'rewrite' set to True
    write_to_output_file(content, file_path, rewrite=True)

def clear_file_if_not_empty(file_path):
    """
    Clears the content of the file if it is not empty.

    Parameters:
    file_path (str): Path to the file to be checked and cleared.
    """
    try:
        # Open the file with explicit encoding
        with open(file_path, "r", encoding="utf-8") as file:
            content = file.read()
            if content.strip():  # Check if the file content is not empty or just whitespace
                with open(file_path, 'w', encoding="utf-8") as file_to_clear:
                    file_to_clear.write("")
    except UnicodeDecodeError as e:
        print(f"Error reading file {file_path}: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

# Example usage
clear_file_if_not_empty("outputs/OverallPlannerOutput.txt")
clear_file_if_not_empty("outputs/ModulePlannerOutput.txt")
clear_file_if_not_empty("outputs/PagePlannerOutput.txt")

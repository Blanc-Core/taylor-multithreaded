import re
import os

class ParseAndAdd:
    def __init__(self, llmFileOutputPath, frontendDirectoryPath):
        self.llmOutputCodePath = llmFileOutputPath
        self.processedLines = []
        self.fileAndCodeDict = ""
        self.frontendDirectoryPath = frontendDirectoryPath

    def performBasicChecks(self):
        # Regular expression pattern to identify the correct "File PATH" lines
        pattern = r"(?i)[/*\s]*File PATH:\s*(.+\.(js|css|jsx|plaintext))"

        # Function to ensure lines start and end with exactly 4 stars and adjust the file path
        def swap_stars(line):
            match = re.match(pattern, line)
            if match:
                # Extract the file path
                file_path = match.group(1).strip()

                # Reformat the line with exactly 4 stars at the beginning and end
                line = f"****File PATH: {file_path}****\n"
            else:
                print(f"Warning: Line does not match expected format: {line.strip()}")
            return line

        # Read the file
        with open(self.llmOutputCodePath, 'r') as file:
            lines = file.readlines()

        # Process each line
        self.processedLines = [
            swap_stars(re.sub(r'^\*+|^/+|\*+$', '', line)) if re.search(pattern, line) else line
            for line in lines
        ]

    
    #Doing it for app.js file
    def processAppJs(self):
        processed_lines = []
        for line in self.processedLines:
            if re.search(r"components/[aA][pP][pP]\.(js|css)", line):
                line = line.replace("components/", "")
            processed_lines.append(line)
        
        self.processedLines = processed_lines
    
    def parseAndModifyFile(self):
        with open(self.llmOutputCodePath, 'w') as file:
            file.writelines(self.processedLines)

    def remove_ticks(self):
        result = []
        for line in self.processedLines:
            if not line.strip().startswith('```'):
                result.append(line)
        
        self.processedLines = result
    
    def create_dict(self):
        file_content_dict = {}
        current_path = None
        current_content = []

        for line in self.processedLines:
            if re.match(r"^\*\*\*\*File [pP][aA][tT][hH]:", line):
                if current_path:
                    file_content_dict[current_path] = ''.join(current_content).strip()
                # Extract the path after "****File PATH:" and remove "****"
                current_path = re.split(r":\s*", line, maxsplit=1)[1].strip().replace('****', '')
                current_content = []
            else:
                current_content.append(line)
        
        # Add the last file content to the dictionary
        if current_path:
            file_content_dict[current_path] = ''.join(current_content).strip()
        
        self.fileAndCodeDict = file_content_dict
        return file_content_dict

    
    def add_content_to_files(self):
        file_count = 0  # Initialize a counter

        for key, value in self.fileAndCodeDict.items():
            # Construct the full file path
            file_path = os.path.join(self.frontendDirectoryPath, 'src', key)
            os.makedirs(os.path.dirname(file_path), exist_ok=True)

            # Check if the file exists
            if os.path.exists(file_path):
                print(f"File {file_path} exists. Clearing and updating content.")
            else:
                print(f"File {file_path} does not exist. Creating and adding content.")

            # Open the file in write mode ('w'), which clears the old content if the file exists,
            # or creates the file if it doesn't exist
            with open(file_path, 'w') as file:
                file.write(value)

            print(f"Content added to {file_path}")
            file_count += 1  # Increment the counter for each file updated

        # Print out the number of files appended
        print(f"Total number of files updated: {file_count}")
        
    def getAllFilePaths(self):
        self.performBasicChecks()
        self.processAppJs()
        self.remove_ticks()
        self.parseAndModifyFile()
        self.create_dict()
        return self.fileAndCodeDict.keys()

    def process_and_check(self):
        self.performBasicChecks()
        self.processAppJs()
        self.remove_ticks()
        self.parseAndModifyFile()
        self.create_dict()
        self.add_content_to_files()
        print(self.fileAndCodeDict.keys())


#Testing

#PARAMS are the text file with teh code and then the frontendPath defined in main
parser = ParseAndAdd("output.txt", "Akshay/frontend")
parser.process_and_check()
print(parser.getAllFilePaths())
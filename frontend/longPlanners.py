import sys
import os

# Add the parent directory to the Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from mainClasses.basicClientRequest import ClientRequest
from openai import OpenAI
from dotenv import load_dotenv
from frontend.prompts.systemPrompts import overallPlannerPrompt, modulePlannerPrompt
load_dotenv()

class OverallPlanner:
    def __init__(self, businessProblemFile, model, verbose):
        with open(businessProblemFile, 'r') as file:
            self.businessProblem = file.read()  # Assuming the file contains the business problem text
        self.model = model
        self.verbose = verbose
        self.systemPrompt = overallPlannerPrompt.format(businessProblem=self.businessProblem)

    def generate(self):
        self.userPrompt = """Please follow the instructions in the prompt. I want extreme detailed and thought out answers. ENSURE TO WRITE LOGIC FOR EACH Module.
        Simply give me the output in the format of the prompt. I do not want additional text. JUST THE OUTPUT. Create as few pages as possible. I want less pages 
        but more content within them.
        """
        coder = ClientRequest(self.systemPrompt, self.model, self.userPrompt, True)
        generatedOverallPlan = coder.generate()
        return self.splitModules(generatedOverallPlan)
        
    def splitModules(self, codeOutput):
        # Split the entire string into individual modules
        modules_list = codeOutput.strip().split("### Module Name:")

        # Remove any empty strings from the list
        modules_list = [module.strip() for module in modules_list if module.strip()]

        # Add "### Module Name:" back to the start of each module
        modules_list = ["### Module Name:" + module for module in modules_list]

        # Return the list of modules
        return modules_list


class ModulePlanner:
    def __init__(self, singularModulePlan, model, streaming):
        self.client = OpenAI()  # Adjusted to match the new openai client initialization if necessary
        self.model = model
        self.streaming = streaming
        self.singularModulePlan = singularModulePlan
        self.systemPrompt = modulePlannerPrompt.format(overallModulePlan=singularModulePlan)
        self.allModules = []

    def generate(self):
        userPrompt = """
        Please follow the instructions in the prompt. I want extreme detailed and thought out answers. ENSURE TO WRITE LOGIC FOR EACH PAGE NEEDED WITHIN THE MODULE.
        Simply give me the output in the format of the prompt. I do not want additional text. JUST THE OUTPUT. Remember this is being done in Ant Design.
        ***IF WORKING WITH CHARTS THINK ABOUT COOL STUFF LIKE TREES, HEAT MAP, ALL THAAT COOL STUFF FOR ECHARTS NOT THE BASIC BORING CHARTS YOU CAN HAVE THOSE BUT THINK OF UNQIUE CHARTS***
        """
        coder = ClientRequest(self.systemPrompt, self.model, userPrompt, True)
        generatedModulePlan = coder.generate()
        self.allModules.append(generatedModulePlan)
        return generatedModulePlan
    
    def parseEachPage(self, codeOutput):
        # Split the entire string into individual modules
        modules_list = codeOutput.strip().split("### Page Name:")
        
        # Remove the first empty element if it exists
        if modules_list and not modules_list[0]:
            modules_list.pop(0)
        
        # Prepend "### Page Name:" to each module
        modules_list = ["### Page Name:" + module for module in modules_list]
        
        return modules_list

# Example usage
if __name__ == "__main__":
    planner = OverallPlanner("businessProblem.txt", "gpt-4o-mini", True)
    output = planner.generate()
    print(output)
    for module in output:
        print("######################################")
        module_planner = ModulePlanner(module, "gpt-4o-mini", True)  # Assuming output[0] is a singular module plan
        module_output = module_planner.generate()
        print("######################################")
    
    for module in module_planner.allModules:
        print("######################################")
        print("MODULE OUTPUT")
        print(module)
        print("######################################")
        


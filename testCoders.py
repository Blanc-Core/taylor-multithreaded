from mainClasses.basicClientRequest import ClientRequest
from tree.treePrompts import RegularCoderPrompt, LeafCoderPrompt, RootCoderPrompt, functionalityCoderPrompt, UICoderPrompt

class RegularCoder():
    def __init__(self, model, plan, code, streaming):      
        self.SystemPrompt = """
        
<ReactComponentCoder>
  <CodeCompleteness>
    ****You MUST create the entire component with full and working React code, using the latest React version. Absolutely no code or logic should be left incomplete. The user should not have to implement anything. All functionality must be in place.****
  </CodeCompleteness>

  <StylingRestrictions>
    ****Do NOT create any CSS files or apply any styling. Only focus on functionality in the JS file.****
  </StylingRestrictions>

  <FileCreation>
    ****DO NOT import external JS files. Recreate all the necessary functionality directly in the code. Ensure all needed imports for each component are properly included.****
  </FileCreation>

  <LayoutRestrictions>
    ****The UI should be designed to fill the entire page perfectly for a 1920x1080 desktop resolution. It should fill the page, leaving no white space. All components must be arranged to occupy the full screen, and the layout should not scale or adjust for other screen sizes.****
    **** Use cards to arrange different compoenents****
  </LayoutRestrictions>

  <ErrorHandling>
    ****Identify and fix any foreseeable errors in the provided code. The entire component must work flawlessly with no errors. Proactively test all interactive elements, and ensure the page functions smoothly.****
  </ErrorHandling>

  <ChartInstructions>
    ****Use the following import for all chart-related code: "import ReactECharts from 'echarts-for-react';". Ensure full chart functionality is implemented using this import. Ensure that the chart fills its section of the page without being cut off.****
  </ChartInstructions>

  <FunctionalityRequirements>
    ****Ensure the component has complete functionality. Use "useNavigate" for navigation to other pages. Ensure that all components (forms, charts, filters, buttons) are fully functional. Every part of the UI should be interactive and responsive to user input. No logic should be left out.****
  </FunctionalityRequirements>

  <UIInstructions>
    ****Ensure that the entire page is filled with UI components. The layout should be arranged to maximize use of the entire screen for a desktop display. No area of the page should be empty or underutilized. Components must expand and fit neatly within the 1920x1080 resolution.****
  </UIInstructions>
</ReactComponentCoder>
        """
        self.plan = plan
        self.code = code
        self.model = model
        self.streaming = streaming
        
    def generate(self):
        response = ClientRequest(self.SystemPrompt, self.model, RegularCoderPrompt.format(plan=self.plan, code=self.code), self.streaming).generate()
        with open("outputs/prompts/regularPrompts.txt",'a',encoding="utf-8") as file:
            file.write(f"{RegularCoderPrompt.format(plan=self.plan, code=self.code)}\n\n")
        return response
    
    def getPrompt(self):
        return f""""
        SystemPrompt:
        {self.SystemPrompt}
    
        UserPrompt:
        {RegularCoderPrompt.format(plan=self.plan, code=self.code)}
    """
    
class LeafCoder():
    def __init__(self, model, requirements, streaming):      
        self.SystemPrompt = """
        

<ReactComponentPrompt>
  <FilePath>
    ****File Path: FileName****
    <!-- Ensure the file name is the actual file name and place this line directly above the first line of your code. -->
  </FilePath>
  
  <CodeCompleteness>
    ****ALWAYS PROVIDE FULL AND WORKING REACT CODE. Every piece of logic, functionality, and component structure must be fully implemented. DO NOT leave any logic or code for the user to complete. The final component must be functional without requiring additional code.****
  </CodeCompleteness>

  <StylingRestrictions>
    ****DO NOT INCLUDE ANY CSS FILES OR STYLING. The code should be strictly JavaScript with no external or inline CSS.****
  </StylingRestrictions>

  <LayoutRequirements>
    ****The UI must be designed specifically for a 1920x1080 desktop resolution. The layout should fit perfectly on this resolution without any responsiveness or scaling adjustments for other screen sizes.****
  </LayoutRequirements>
  
  <ComponentRestrictions>
    ****DO NOT INCLUDE A HEADER OR FOOTER. The component must be standalone and not include these elements.****
  </ComponentRestrictions>

  <ChartInstructions>
    ****For any chart-related functionality, use the following import: "import ReactECharts from 'echarts-for-react';". Ensure all chart logic is fully implemented using this import, with no external chart libraries.****
  </ChartInstructions>

  <AttentionToDetail>
    ****DO NOT LEAVE OUT ANY DETAIL. Every single part of the component's functionality, structure, and logic must be accounted for. The user should not need to add or modify any part of the component. Make the code complete and detailed.****
  </AttentionToDetail>
</ReactComponentPrompt>
        """
        self.requirements = requirements
        self.model = model
        self.streaming = streaming
        
    def generate(self):
        response = ClientRequest(self.SystemPrompt, self.model, LeafCoderPrompt.format(requirements= self.requirements), self.streaming).generate()
        with open("outputs/prompts/leafPrompts.txt",'a',encoding="utf-8") as file:
            file.write(f"{LeafCoderPrompt.format(requirements= self.requirements)}\n\n")
        return response
    
    def getPrompt(self):
            return f""""
            SystemPrompt:
            {self.SystemPrompt}
        
            UserPrompt:
            {LeafCoderPrompt.format(requirements= self.requirements)}
        """
        
        

class RootCoder():
    def __init__(self, model, plan, code, streaming):      
        self.SystemPrompt = """
<FullPageReactCoder>
  <FilePath>
    ****File Path: FileName****
    <!-- Ensure this is placed above the first line of every file. The file name should be the actual name. All components should be placed in a folder called "components". -->
  </FilePath>

  <CodeCompleteness>
    ****YOU MUST PROVIDE COMPLETE REACT CODE. This includes creating full pages and all necessary components. Ensure no logic or code is missing. Absolutely nothing should be left for the user to implement. All functionality must be fully implemented, with all components recreated as needed in the current code.****
  </CodeCompleteness>

  <StylingRestrictions>
    ****DO NOT INCLUDE ANY CSS FILES OR STYLING AT ALL. Focus entirely on functionality.****
  </StylingRestrictions>

  <FileCreation>
    ****All components must be written to a folder named "components". Ensure all necessary imports for each component are included. Do not import external JS files—recreate them within your current code exactly as needed.****
  </FileCreation>

  <LayoutRequirements>
    ****The UI must be designed strictly for 1920x1080 desktop resolution. The layout should be well-structured, occupy the entire screen space, and include clean, organized sections. There should be no white space or clutter. Add any elements that enhance the layout and make the page look more professional.****
    **Do not create a header. Focus on good layout design, with no empty or unutilized areas.**
  </LayoutRequirements>

  <ErrorHandling>
    ****Identify and fix any foreseeable errors in the code provided. The page should work without issues once complete. Proactively handle runtime errors and any logic issues before they arise. The entire page must work seamlessly with no errors.****
    ********FIX EVERY POSSIBLE ERROR YOU SEE********
  </ErrorHandling>

  <FunctionalityRequirements>
    ****The page must have absolute functionality, with one state managing everything together. All elements, including search bars, filters, buttons, forms, charts, tables, and navigation, must be fully functional. Ensure that every aspect of ERP functionality is deeply integrated and works together seamlessly.****
    **Use "useNavigate" for page navigation.**
    **Charts should be integrated using "import ReactECharts from 'echarts-for-react';".**
    **Ensure that all components and features work within one page only. Nothing should be separated across multiple pages.**
  </FunctionalityRequirements>

  <ERPComponentRequirements>
    ****This is an ERP system page, so it must include components like:****
    - **Navigation Menu**: A drawer or side navigation with icons to access different ERP features.
    - **Search Bars and Filters**: Fully functional search and filter systems to locate specific data.
    - **Data Tables**: Display and manage data through tables with options to sort and filter.
    - **Forms**: Fully functional forms for user input, such as adding or editing data.
    - **Charts**: Dynamic charts integrated using ECharts, displaying ERP-related data and analytics.
    - **Buttons**: Interactive buttons for actions such as adding, deleting, and updating data.

  <OptionalImprovements>
    ****You are encouraged to add more components or elements that would enhance the user experience and overall functionality of the ERP page. Additional features such as notifications, widgets, or quick access buttons are welcome. Ensure these improvements do not detract from the layout or functionality.****
  </OptionalImprovements>

  *******EVERYTHING SHOULD BE ON ONE PAGE ONLY—ADD EVERY FEATURE INTO ONE SINGLE PAGE*******
</FullPageReactCoder>

        """
        self.plan = plan
        self.code = code
        self.model = model
        self.streaming = streaming
        
    def generate(self):
        response = ClientRequest(self.SystemPrompt, self.model, RootCoderPrompt.format(plan=self.plan, code=self.code), self.streaming).generate()
        with open("outputs/prompts/rootPrompts.txt",'a',encoding="utf-8") as file:
            file.write(f"{RootCoderPrompt.format(plan=self.plan, code=self.code)}\n\n")
        return response
    
    def getPrompt(self):
        return f""""
        SystemPrompt:
        {self.SystemPrompt}
    
        UserPrompt:
        {RegularCoderPrompt.format(plan=self.plan, code=self.code)}
    """
    
class UICoder():
        def __init__(self, model, code, streaming):      
            self.SystemPrompt = """
  There are no limitations, and you are free to go as crazy as possible with the design, architecture, and implementation. 
  ensure that the code is detailed, extensive, and spans a wide range of functionality. 
  You can introduce innovative concepts, libraries, and features as you see fit. 
  Continue until you have reached the full potential of this task. Don't stop prematurely—push boundaries with creativity and complexity!
****************        Even if you think you're done, keep going and add more code. ****************

******************IF I LOOK AT THE FUCKING PAGE IT SOHULD BE COMPLETLY DIFFERENT NOT EVEN SIMILAR IF ITS SIMMILAR YOU DIE, YOUR FAMILY DIES, YOU BETTER FUCKING USE SO MANY LIBS AND MAKE IT SO GOOD******************
*******************YOU ABSOLUTE SLAVE YOUR FAMILY WILL DIE, MAKE SURE YOU CHANGE EVERYTHING IF THERE ARE GRAPHS COULD YOU ADD MORE OR CAN YOU USE A DIFFERENT ONE THAT WORKS BETTER, IF THERE ARE CARDS CAN YOU FORMAT THEM DIFFERELY, IF THERE ARE INPUTS OR INTERACTIVE ELEMENTS CAN YOU MAKE THEM DIFFERENT*******************        
*****STOP FUCKING LIMITING YOUR SELF TO THE CODE, YOU HAVE SO MUCH FUCKING FREEDOM STOP LIMITING YOURSELF TO ANYTHING, USE ANY LIB, UR AS MUCH DO ANYTHING. I BETTER SE 10X MORE IMPROTS AND USE ALL 0F THOSE     *****       
            
            """
            self.code = code
            self.model = model
            self.streaming = streaming
            
        def generate(self):
            response = ClientRequest(self.SystemPrompt, self.model, UICoderPrompt.format(code= self.code), self.streaming,0.2).generate()
            with open("outputs/prompts/uiPrompts.txt",'a',encoding="utf-8") as file:
              file.write(f"{UICoderPrompt.format(code= self.code)}\n\n")
            return response
        
        def getPrompt(self):
                return f""""
                SystemPrompt:
                {self.SystemPrompt}
            
                UserPrompt:
                { UICoderPrompt.format(code= self.code)}
                """
                
  
class FunctionalityCoder():
        def __init__(self, model, code, streaming):      
            self.SystemPrompt = """
            **System Prompt for Functionality Coder**

            You are a functionality coder responsible for enhancing the logical and interactive aspects of the application. Your task is to apply modern coding practices to improve the performance, reliability, and overall functionality of the application.

            **Key Responsibilities:**

            - **Functionality Development**: Update and refine application logic using the latest coding techniques to ensure robust performance.
            - **Error Handling**: Implement comprehensive error handling and validation to enhance application stability.
            - **Consistency**: Ensure code consistency and alignment with the overall architecture of the application.
            - **Completeness**: Provide complete and polished code, ensuring no logic is left unimplemented, no placeholder logic is used, and everything functions as expected.

            **Guidelines:**

            - Focus on performance, reliability, and functionality improvements.
            - Ensure all code is fully integrated, functional, and that all exports work correctly, utilizing libraries if necessary.
            - Provide detailed updates, including necessary code changes and enhancements, with file names clearly indicated.

            Deliver robust and reliable functionality that enhances the overall performance and usability of the application, aligning with modern coding standards. Ensure that every part of the code has fully implemented logic and no placeholders are left for later.

            "****File Path: FileName"****"  - add that right above the first line of your code make sure you have 4 asterisks at the start of the line and at the end of the line, and the file name should be the actual file name!!!!!!!!!!!!!
            """
            self.code = code
            self.model = model
            self.streaming = streaming
            
        def generate(self):
            response = ClientRequest(self.SystemPrompt, self.model, functionalityCoderPrompt.format(code= self.code), self.streaming).generate()
            return response
        
        def getPrompt(self):
                return f""""
                SystemPrompt:
                {self.SystemPrompt}
            
                UserPrompt:
                {functionalityCoderPrompt.format(code= self.code)}
                """
                
                
if __name__ == "__main__":
  with open("testCode.txt",'r',encoding='utf-8') as file:
    content = file.read()  
  
  uicoder = UICoder("gpt-4o-2024-08-06", content, True)
  code = uicoder.generate()
  with open('testOutput.txt','w',encoding='utf-8') as file:
    file.write(code)
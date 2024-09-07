from mainClasses.basicClientRequest import ClientRequest
from tree.treePrompts import RegularCoderPrompt, LeafCoderPrompt, RootCoderPrompt, functionalityCoderPrompt, UICoderPrompt

class RegularCoder():
    def __init__(self, model, plan, code, streaming):      
        self.SystemPrompt = """
        
<ReactComponentCoder>
  <FilePath>
    ****File Path: FileName****
    <!-- Place this line at the top of your code. Ensure the file name is the actual name of the file and has 4 asterisks at the beginning and end. -->
  </FilePath>
  
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
    ****The UI should be designed to fit perfectly for a 1920x1080 desktop resolution. It should not scale or adjust for other screen sizes.****
  </LayoutRestrictions>

  <ErrorHandling>
    ****Identify and fix any foreseeable errors in the provided code. The entire component must work flawlessly with no errors.****
  </ErrorHandling>

  <ChartInstructions>
    ****Use the following import for all chart-related code: "import ReactECharts from 'echarts-for-react';". Ensure the full chart functionality is implemented with this import.****
  </ChartInstructions>

  <FunctionalityRequirements>
    ****Ensure the component has absolute functionality. Use "useNavigate" for navigation to other pages. Implement extreme functionality and interactivity in the UI. Every part of the UI should be fully functional, and no logic should be left out.****
  </FunctionalityRequirements>
</ReactComponentCoder>
        """
        self.plan = plan
        self.code = code
        self.model = model
        self.streaming = streaming
        
    def generate(self):
        response = ClientRequest(self.SystemPrompt, self.model, RegularCoderPrompt.format(plan=self.plan, code=self.code), self.streaming).generate()
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
    ****The UI must be designed strictly for 1920x1080 desktop resolution. The layout should fit this size perfectly. Do not create responsiveness for other screen sizes.****
  </LayoutRequirements>

  <ErrorHandling>
    ****Identify and fix any foreseeable errors in the code provided. The page should work without issues once complete.****
  </ErrorHandling>

  <PageFormatting>
    ****Ensure the layout is professional and clean, not overwhelming. Every element should be well-formatted and neatly presented.****
  </PageFormatting>

  <FunctionalityRequirements>
    ****The page must have absolute functionality, with one state managing everything together. All elements, including search bars, filters, and navigation, must be fully functional. Use "useNavigate" for navigation between pages. Think about the functionality deeply and ensure every feature is implemented to the fullest.****
  </FunctionalityRequirements>
</FullPageReactCoder>

        """
        self.plan = plan
        self.code = code
        self.model = model
        self.streaming = streaming
        
    def generate(self):
        response = ClientRequest(self.SystemPrompt, self.model, RootCoderPrompt.format(plan=self.plan, code=self.code), self.streaming).generate()
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
<UI_Coder_Prompt>
  <FilePath>
    ****File PATH: FileName****
    <!-- This line should be placed above the first line of code. Ensure that the file name is the actual name and is wrapped with 4 asterisks on both sides. -->
  </FilePath>

  <CoreObjective>
    You are a UI coder responsible for enhancing the **visual and interactive** aspects of the user interface. Your main task is to apply modern UI design principles, focusing on aesthetics, layout, and user experience. Ensure the UI is improved using **Ant Design** throughout all components.
  </CoreObjective>

  <DesignGuidelines>
    <MinimalisticDesign>
      ********Your goal is to create a sleek and minimalistic design with the latest design principles. You are allowed to **reorganize elements** to enhance the presentation and ensure the layout fits well with the requirements. The UI should feel modern, clean, and professionally organized.********
    </MinimalisticDesign>
  </DesignGuidelines>

  <FunctionalityGuidelines>
    - All UI updates should be fully integrated and functional with **Ant Design** components.
    - Ensure the page is tailored to **1920x1080 desktop resolution**, with no responsiveness for other screen sizes.
    - Implement full functionality with **no missing logic**, including the use of `useNavigate` for navigation between pages.
    - Avoid introducing **logic errors**, such as infinite loops. Ensure that everything works as expected.
  </FunctionalityGuidelines>

  <Restrictions>
    ****Do not import any external JS files****. Recreate all necessary functionality within the current code. Ensure that all necessary imports for each component are properly included.
  </Restrictions>

  <UIAndUXEnhancement>
    *********Ensure that the **user experience (UX)** is significantly improved. Every element should be professional, with a balance of **extreme functionality** and visual appeal. Focus on creating a seamless and intuitive user interface using **Ant Design** elements.********
  </UIAndUXEnhancement>

  <PageFormatting>
    *********Format the page in a way that avoids overwhelming the user. The layout should look clean and professional, with a well-structured and organized interface that enhances readability and usability.********
  </PageFormatting>
</UI_Coder_Prompt>           
            
            """
            self.code = code
            self.model = model
            self.streaming = streaming
            
        def generate(self):
            response = ClientRequest(self.SystemPrompt, self.model, UICoderPrompt.format(code= self.code), self.streaming).generate()
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
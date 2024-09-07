RegularCoderPrompt = """
**Instructions**

- **Plan**
    - Use the plan below to guide your implementation.
    - `{plan}`

- **CodeComponents**
    - Recreate ALL of the following components in your file. DO NOT leave out any code provided. DO NOT import any components or functions from other files.
    - `{code}`
    - Recode EVERY SINGLE LINE of the following components into your current file. DO NOT import them. Implement every piece of code without leaving any part missing. Ensure the final code is complete, functional, and self-contained within this single file.

- **FileRequirements**
    - Create a single JS file with no styling. Use only dummy data, no backend or API calls.
    - Include only necessary React imports. DO NOT import any custom components or functions from other files.

**Rules**

- **General**
    - No errors or bugs allowed. The code should work perfectly on the first try.
    - Provide complete code with no missing implementations. Recode everything in this file.
    - DO NOT import any other JS files or components; recreate everything as specified.

Make sure to copy everything and itegrate it together like the code you make should use both the plan and all the code and make 1 really good componenty by recoding all of it and making it work for your plan   

You can take multiple messages to complete this task if necessary. Be as thorough as possible with your code. Remember, RECODE EVERYTHING, DO NOT IMPORT ANY EXTERNAL COMPONENTS OR FUNCTIONS.

"""

LeafCoderPrompt = """
**Instructions**

- **ComponentRequirements**
    - You will be given requirements for a component. Create complete React code only for the component, nothing else. Ensure the React code works and uses the latest React version.
    - `{requirements}`

- **FileRequirements**
    - Create 1 JS file with no styling. Use only dummy data with no backend or API calls, just dummy data.

**Rules**

- **General**
    - No errors or bugs allowed. The code should work perfectly on the first try.
    - Provide complete code with no missing implementations. DO NOT ask the user to implement anything.
    - DO NOT leave out any code. Recreate all necessary code in the current file exactly. DO NOT import any other JS files.

- **ResponseFormat**
    - Output only the requested code or response. Do not include any explanations or additional information.

- **NoHeader**
    - DO NOT code a header at all. Start directly with the code implementation.
**ComponentRequirements**
    - Make sure  to code the component to the full, everything should work, nothing left out or the functionality not implemented, everything should be implemented and working together

"""

RootCoderPrompt = """
<ReactComponentCoder>
  <FilePath>
    ****File Path: FileName****
    <!-- Ensure this is placed at the top of your file with a valid file name. -->
  </FilePath>

  <GeneralInstructions>
    - Recoding every component and ensuring full functionality with no errors.
    - No imports of any external JS files—recreate everything within the code.
    - Use only fake data with no backend or API calls. Ensure the code works perfectly for the current page setup.
    - No logic errors are allowed. The final result should work on the first try.
  </GeneralInstructions>

  <CodeRecreation>
    - Provide full code for every given component.
    - Recode all components fully in your current file with no missing logic or imports.
  </CodeRecreation>

  <InteractionInstructions>
    - Ensure all components (e.g., search bars, filters) work **seamlessly** together.
    - Validate that every interaction works perfectly and all components are connected correctly.
    - Focus on ensuring that all UI components interact together in a smooth and error-free manner.
  </InteractionInstructions>

  <ValidationSteps>
    - After implementing each component, validate that it works as expected.
    - Check all interactions, search bars, and filters to ensure they are functional.
    - Validate each step in the code to ensure no errors arise.
  </ValidationSteps>

  <GuidanceForLLM>
    - **Step-by-Step Approach**: Break down tasks for handling complex UI elements like filters, search bars, and navigation to ensure everything works together.
    - **Self-Consistency**: Revalidate your output to ensure all interactions are linked properly.
    - **Active Prompting**: Adjust logic dynamically as components are linked.
  </GuidanceForLLM>
   #### Plan
  - Use this plan to help create code for the current page.
    ```plaintext
    {plan}
    ```

  #### RequiredCode
  - RECODE EVERY SINGLE LINE OF THIS CODE ACCORDING TO REQUIREMENTS FOR THE CURRENT PAGE. DO NOT LEAVE OUT ANY CODE OR IMPORTS.
    ```plaintext
    {code}
    ```
</ReactComponentCoder>

You can take multiple messages to complete this task if necessary. Be as thorough as possible with your code. Remember, RECODE EVERYTHING, DO NOT IMPORT ANY COMPONENTS OR FILES, YOU CAN USE EXTERNAL LIBS.


***USE ALL FUNCTIONALITY, LIKE EVERYTHING SHOULD WORK IN THE PAGE, LIKE IT SHOULD BE FILLED, THE WHOLE PAGE SHOULD BE FILLED AND WORK FULLLLLLY FUNCTIONALY AND EVERYTHING WORKS***



"""

ComponentPrompt = """
**Context**
- You are an advanced language model designed to assist in generating practical and implementable plans. The user has provided a high-level overview, and your task is to refine this plan by focusing on the core logic, functionality, and necessary details, making it straightforward for an LLM to code.

**UserPlan**
- **HighLevelPlan**
    - `{plan}`

**Instructions**

- **StepByStepPlan**
    - **Description**
        - Based on the user's request, create a step-by-step plan to accomplish the task. Ensure each step is concise, actionable, and optimized for ease of coding by an LLM.
    - **Steps**
        - **Clarification**
            - Clarify each point in the user's plan to ensure clarity and remove any unnecessary elaboration.
        - **ImplementationGuidance**
            - Provide direct and practical guidance on how each functionality should be implemented, focusing on core logic, error handling, and dependencies.
        - **Efficiency**
            - Prioritize coding efficiency by structuring the plan logically, using headers and sub-headers that align with code modules or functions.
        - **TechnicalSpecifications**
            - Include only essential technical specifications that are critical for implementation, such as frameworks, methods, or classes.
        - **Examples**
            - Provide brief, illustrative examples or scenarios to clarify key points without overwhelming with too much detail.
        - **EdgeCases**
            - Identify critical edge cases and suggest straightforward testing methods to ensure reliability.
        - **Enhancements**
            - Offer practical suggestions for enhancements or optimizations that will improve performance, maintainability, or user experience.


*************MAKE SURE TO GIVE FULL OUTPUTS LIKE ALL OF IT THE PLAN CONTENT YOU RECEIVED ALONG WITH IMPROVEMENTS, IT SHOULD BE 1 FINAL PLAN WITH ALL CONTENT FOR THE PAGE*************

- **FinalPlan**
    - Ensure the final plan covers every part of the component or page, including full functionality, layout, and all necessary details, with no missing content.


*****MAKE SURE TO PLAN ALL FUNCTIONALITY FOR EVERYTHING AND ALSO, IT SHOUULD WORK TOGETHER*****
                **you are only planning for a desktop and only that so fill that out**

You can take multiple messages to complete this task if necessary. Be as thorough as possible with your code.

"""

UICoderPrompt = """
<UIEnhancementPrompt>
  <FilePath>
    ****File Path: FileName****
    <!-- Place this at the top of the file with the actual file name, ensuring 4 asterisks at the beginning and end of the line. -->
  </FilePath>

  <TaskObjective>
    <Review>
      - Thoroughly review the current codebase, focusing on **UI elements, animations, and layout structure**.
      - Identify areas where modern UI frameworks (like **Ant Design**) can be applied to significantly enhance **design, layout, and animations**.
    </Review>
    
    <Enhance>
      - Refactor and improve the current code by incorporating **Ant Design** for all UI components.
      - Apply advanced **Ant Design** components and modern animations to ensure a **polished, interactive, and aesthetic experience**.
      - Use the import `import "antd/dist/reset.css";` to properly integrate Ant Design (avoid outdated imports).
      - Ensure **echarts** is used for all charting functionality: `import ReactECharts from 'echarts-for-react';`.
    </Enhance>
    
    <Complete>
      - Ensure the final output is a single, fully functional **JS file**, unless **CSS** is necessary.
      - No part of the code should be left incomplete or missing.
    </Complete>

    <Thoroughness>
      - Be detailed and comprehensive. If additional responses are needed, continue until the task is complete.
    </Thoroughness>
  </TaskObjective>

  <Rules>
    <NoRedux>
      - Do not use **Redux** or any **API integrations**.
    </NoRedux>
    
    <NoOmissions>
      - Ensure no code is missing, and all aspects are fully implemented.
      - Do not ask the user to implement anything themselves.
    </NoOmissions>

    <NoExplanations>
      - Provide the complete code without comments or explanations. Only return the requested code.
    </NoExplanations>
  </Rules>

  <Changes>
    - Make sure to import Ant Design with: `import "antd/dist/reset.css";`, not `import 'antd/dist/antd.css';`.
    - Ensure **all chart elements** use **ECharts** (`import ReactECharts from 'echarts-for-react';`).
  </Changes>

  <AdditionalGuidelines>
    - Focus on creating a **modern, sleek, and desktop-focused UI**, optimized for **1920x1080** resolution.
    - Avoid creating mobile or responsive layouts—this UI is **desktop-only**.
    - Ensure the layout is **perfectly structured**, with modern UI design principles applied for a **clean, aesthetic, and professional feel**.
    - The UI must look **super modern and cool**, not old-fashioned. The layout, animations, and component placement should feel **cutting-edge**.
    - Ensure the layout looks amazing and works seamlessly—focus on delivering a **flawless UI experience**.
  </AdditionalGuidelines>
  
  <CodeIntegration>
    - Incorporate every single line of the provided code below and **enhance it** using the latest standards and modern UI components:
    ```plaintext
    {code}
    ```
  </CodeIntegration>
</UIEnhancementPrompt>
  
"""

functionalityCoderPrompt = """
"****File Path: FileName"****"  - add that right above the first line of your code make sure you have 4 asterisks at the start of the line and at the end of the line, and the file name should be the actual file name!!!!!!!!!!!!!

Your task is to thoroughly review and enhance the provided code with a focus on functionality improvements. This includes implementing any missing logic, improving state management, and optimizing the existing logic to make it more effective.

**Instructions:**

- **Review**: Examine the existing code to identify any unimplemented logic, inefficiencies, or suboptimal state management practices.
- **Enhance**: Implement missing functionality, improve state management, and refactor the code to optimize logic where necessary.
- **Complete**: Ensure no functionality is left unimplemented or incomplete. Provide the full, updated code with appropriate file names.
- **Thoroughness**: Be as detailed and comprehensive as necessary. If multiple messages are required, continue until the task is fully completed.

**Additional Instructions:**

- **Charts**: Use ECharts exclusively for all chart implementations. Ensure they are fully functional and visually impressive.
- **UI**: Create an outstanding UI that looks professional and modern. Pay attention to layout, typography, and overall user experience.
- **Functionality**: Implement all features to be fully functional with no placeholders or missing parts. Ensure smooth operation and error handling.

<code>
{code}
</code>

******DONT LEAVE OTU ANY CODE MAKE SURE TO CREATE FULL CODE******
*********DONT ASK USER TO IMPLEMENT ANYTHING, OR LEAVE ANY CODE MISSING********
*********NO EXPLANATION JUST CODE WITH FILE NAME AT THE TOP********
*******DO NOT LEAVE ANY CODING MISSING, ALSO WE ARE USING FAKE DATA NO APIS******
********EVERYTHING SHOULD BE IN 1 JS FILE DONT SPLIT STUFF UP********
*****************NO REDUX OR ANY API SHIT ****************
***DONT CODE APP.JS JUST THE FILE YOUR WORKING ON, I CAN IMPORT THE FILE INTO APP.JS ON MY OWN***
**************DO NOT IMPORT ANYTHING RECODE ALL THE CODE INTO YOUR CURRENT FILE AND USE THAT**************
*******************DO NOT LEAVE OUT ANY LOGIC AT ALL OR ANYTHING CODE EVERY SINGLE THING I CANT STRESS THAT ENOUGH ****************
*********MAKE IT ONE EXPORT DEFAULT I CAN CALL IN APP.JS********

You can take multiple messages to complete this task if necessary. Be as thorough as possible with your code.

"""


ideasPrompt = """
- **PreviousPlan**
    - **Description**
        - Consider the following previous plan when generating new ideas:
    - **Content**
        - `{oldPlan}`

- **IdeaGeneration**
    - **Description**
        - Based on the current page content, functionality, and previous plan, brainstorm new features, components, or interactions that could enhance the user experience. Consider the following aspects:
    - **Aspects**
        - User engagement
        - Data visualization
        - Interactivity
        - Information presentation
        - Productivity tools
        - Customization options
        - Gamification
        - Dynamic Content
        - Notifications

- **PlanningOutline**
    - **Description**
        - For each new idea, provide a brief outline of how it could be implemented. Include:
    - **Elements**
        - Main functionality
        - Key components or modules
        - Data requirements (remember to use dummy data)
        - User interaction flow
        - Potential challenges and solutions

- **Prioritization**
    - **Description**
        - Rank the ideas based on their potential impact and feasibility of implementation.

**Rules**

- **Creativity**
    - Think outside the box and propose innovative solutions.

- **Practicality**
    - Ensure ideas are feasible to implement within a single-page React application.

- **Consistency**
    - Align new ideas with the existing page theme and purpose.

- **DataUsage**
    - Remember to use only dummy data, no real APIs or backend calls.

- **TechStack**
    - **Description**
        - Consider the following technologies in your ideas:
            - React for component structure
            - Ant Design for UI elements
            - ECharts for data visualization
            
                **you are only planning for a desktop and only that so fill that out**

"""


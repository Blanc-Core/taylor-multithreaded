RegularCoderPrompt = """
# **Instructions**

## **Plan**
- Use the **exact** plan outlined below as the foundation for your implementation.
- `{plan}`
- **Integrate** the plan directly into the code components provided, ensuring every part of the plan is fully reflected in the code. The integration must be seamless, with no missing details or gaps. All pieces should function together as a single, cohesive file.

## **CodeComponents**
- **Rewrite EVERY SINGLE LINE** of the components below as **const** functions within the current file.
- **DO NOT** leave out any provided code.
- **DO NOT** import any components or functions from other files. Every component must be rewritten as a **const** function in this file, fully recoded from scratch.
- **Adjust** the code so that it **dynamically works** for your current code structure. Every function should be self-contained, with dynamic behavior that adapts to the current project setup.
- `{code}`
- Ensure that every line of code is **faithfully recoded**. **No shortcuts, no omissions, no imports.** Every component should be rewritten as a **const** function and fully integrated into the file.

## **FileRequirements**
- Create a single **JavaScript** file.
- **DO NOT** include any external styling (e.g., CSS files). Styling should not be a part of this task.
- Use only **dummy data**, with no backend, API calls, or external services.
- Include only necessary React imports (e.g., `useState`, `useEffect` if needed).
- **DO NOT** import any custom components or functions from other files. All logic and components must be fully contained within the single file.

## **Rules**

### **General**
- **NO ERRORS**: The code must work perfectly on the first try, without bugs or issues.
- Provide **complete code**, fully functional and self-contained. **Recreate every part of the code in this file** with no omissions, placeholders, or imports.
- **DO NOT** import any external JS files or components. **Recreate every component and function exactly as specified**, rewriting each as a **const** function.

## **Goal**
- The final product should be a **single, complete component** that integrates the plan and code components fully.
- Every component and function provided should be **recoded, rewritten as const functions**, and **integrated perfectly** into the current file without summarization, omission, or importation from other files.
- The result should be **100% functional**, fully dynamic, and self-contained with no missing code. It should fully reflect the plan provided and **adapt to the current code structure**.

---

**Important**: Absolutely **NO summarization**. Every single piece of code must be **rewritten as a const function**, fully integrated and dynamically functional within the current file. The goal is to have one **complete, error-free**, and **self-contained** file with everything implemented as described.


"""

LeafCoderPrompt = """
# **Instructions**

## **ComponentRequirements**
- You will be given the requirements for a component. Create **complete React code** only for the component and nothing else.
- Ensure the React code works flawlessly using the **latest version of React**.
- **DO NOT** summarize or leave anything out. All functionality must be fully implemented and working together.
- `{requirements}`

## **FileRequirements**
- Create **1 JS file** with **no styling**.
- Use only **dummy data**. **No backend** or API calls, only dummy data should be used.
- The entire file should be **self-contained**. **DO NOT** import any other JS files or components.

## **Rules**

### **General**
- **No errors or bugs** allowed. The code must work perfectly on the first try.
- Provide **complete, fully functional code** with no missing implementations or placeholder logic.
- **DO NOT** ask the user to implement anything. **DO NOT** leave out any code. Recreate everything within this file, and **DO NOT** import any external JS files or components.
- All necessary code must be included in this file, fully implemented, and functional with **no missing parts**.

### **ResponseFormat**
- Output **only** the requested code or response. **DO NOT** include explanations, comments, or additional information. Respond with the **complete code only**.

### **NoHeader**
- **DO NOT** include a header or any boilerplate explanations. Start **directly** with the code implementation.

## **ComponentRequirements**
- The component must be **fully implemented**, with **all functionality** integrated. **Nothing should be left out** or incomplete. Ensure all pieces work together seamlessly, and the code is ready to run without any issues.
"""

RootCoderPrompt = """
<ReactComponentCoder>
  <FilePath>
    ****File Path: FileName****
    <!-- Ensure this is placed at the top of your file with a valid file name. -->
  </FilePath>

  <GeneralInstructions>
    - Recoding **every single component**, ensuring full functionality, and **fixing any errors or logic issues**.
    - **DO NOT** import any external JS files—recreate everything within the provided code.
    - Use only **dummy data** with no backend or API calls. Ensure the code works **flawlessly** for the current page setup.
    - **No logic errors** allowed: All components, mappings, charts, and interactions must function without issues. If errors exist in the provided code, **proactively identify and fix them**.
    - **Every component, feature, and interaction must be fully implemented and improved where necessary**. The page should be fully functional, visually complete, and **professionally enhanced**.
  </GeneralInstructions>

  <CodeRecreation>
    - Provide **full code** for every component and **fix any potential issues**.
    - **NO code should be missing, left out, simplified, or assumed**—every piece of logic must be present and correct.
    - Recreate all components fully, **ensuring every part works together seamlessly**. **Fix any layout issues**, optimize UI, and implement **complete functionality** for all components.
  </CodeRecreation>

  <InteractionInstructions>
    - Ensure **ALL components** (e.g., search bars, filters, buttons, forms, charts) work **perfectly** together.
    - Validate that every interaction works as expected—searching, filtering, clicking, chart updates, etc.
    - **NO part of the UI should be broken, unresponsive, or incorrectly implemented**—everything must be functional.
    - The UI should be **visually optimized** with enhanced layouts and interactions that feel smooth, modern, and professional.
    - **Fix any layout or visual issues**. Ensure the page is **visually complete, fully functional**, and works together as a unified system without any bugs.
  </InteractionInstructions>

  <ValidationSteps>
    - After implementing **each component**, validate that it works as expected and fixes any issues.
    - Check all interactions (search, filter, click, chart rendering, form input) and **verify that everything is fully functional**.
    - **Verify the entire page** for responsiveness and errors—ensure every part of the page is filled with working components.
    - **Proactively improve** areas of the UI that may be weak, unoptimized, or not user-friendly.
  </ValidationSteps>

  <GuidanceForLLM>
    - **Step-by-Step Approach**: Break down tasks to handle complex UI elements (like charts, filters, dynamic data mappings) to ensure everything works perfectly.
    - **Fix errors as you go**: Proactively identify and fix any logic, interaction, or rendering issues. **Do not leave anything broken**.
    - **Enhance Layout**: If the layout feels cluttered, unbalanced, or outdated, **improve it** to be modern, clean, and user-friendly. **No placeholders or incomplete elements**.
    - **No Summarization**: Recode every single line with improvements and do not leave out any logic or interaction. **Enhance the code where needed** and ensure everything is dynamically functional.
  </GuidanceForLLM>

  #### Plan
  - Use this plan to create code for the current page, enhancing functionality, layout, and interactions.
    ```plaintext
    {plan}
    ```

  #### RequiredCode
  - **RECODE AND FIX** every single line of the provided code, ensuring that it is fully functional, free of errors, and optimized for the current page.
    ```plaintext
    {code}
    ```

</ReactComponentCoder>

---

**Important**: Absolutely **NO missing logic** or functionality. **Fix every possible error, logic issue, or interaction** that may exist. The page must be fully functional and visually complete with modern, professional design. All UI elements and logic must work perfectly together with no placeholders or incomplete elements.

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
    <!-- Ensure this is placed at the top of the file with the actual file name, ensuring 4 asterisks at the beginning and end of the line. -->
  </FilePath>

  <TaskObjective>
    <Review>
      - Conduct a **complete review** of the **entire codebase**, focusing on making the UI look **visually impressive and optimized for desktop (1920x1080 resolution)**.
      - Ensure **NO existing functionality is omitted or broken**—**retain all logic and functionality** while improving the UI's design, interactivity, and visual polish.
      - Identify and fix any **outdated or poorly designed UI elements**—the layout must be **modern, sleek, and optimized** for large desktop screens. Everything should look clean, smooth, and professionally structured.
    </Review>

    <Enhance>
      - **Dramatically improve** the UI using **Ant Design** components with a strong focus on creating a **high-end, visually stunning desktop experience**.
      - Use **modern animations**, **hover effects**, and **dynamic transitions** to make the UI feel **interactive and polished**.
      - Ensure the layout is designed for **1920x1080 resolution**, with proper use of **spaced grids**, **aligned components**, and **consistent theming** to give the UI a **modern, clean appearance**.
      - **Do not add mobile or responsive layouts**—this UI is designed **exclusively for desktop**.
      - Improve the UI’s overall **flow, spacing, and structure**. The layout must be **spacious and easy to navigate**. Components should never feel cramped or poorly spaced.
      - Apply **professional animations** and **transitions** to components (e.g., buttons, modals, and forms) to enhance the overall experience.
      - Ensure the final look and feel is **modern and highly polished**.
    </Enhance>

    <Complete>
      - The final result must be a **fully functional, enhanced UI**—no placeholders or incomplete logic.
      - **All components and interactions must be fully improved, visually polished, and thoroughly tested** to ensure the UI works **perfectly** on **large screens**.
      - The output should be **100% visually complete** with no skipped elements. The entire UI must feel **professionally designed**.
    </Complete>

    <Thoroughness>
      - Be **extremely detailed** and **comprehensive**—ensure every part of the UI is enhanced and **nothing is left out**.
      - **Test every component and interaction**—validate that **everything works** seamlessly and looks **visually superior** for **desktop** users.
      - Continue improving until the UI is **100% polished, modern, and visually stunning**.
    </Thoroughness>
  </TaskObjective>

  <Rules>
    <NoRedux>
      - **DO NOT** use **Redux**, **external state management**, or **API integrations**.
    </NoRedux>

    <NoOmissions>
      - **DO NOT omit any functionality or code**—recreate and improve everything necessary within the file and **enhance every part**.
      - **DO NOT ask the user to implement anything themselves**—the output must be fully self-contained and functional.
      - **No placeholders or skipped logic**—everything must be implemented and visually polished.
    </NoOmissions>

    <NoExplanations>
      - Provide the **complete code only** without any comments or explanations.
    </NoExplanations>
  </Rules>

  <Changes>
    - Ensure **Ant Design** is imported correctly using: `import "antd/dist/reset.css";`—avoid using outdated imports like `antd/dist/antd.css`.
    - All **chart elements** must use **ECharts**: `import ReactECharts from 'echarts-for-react';`.
    - **Retain and improve all existing functionality and UI interactions**—nothing should be broken, and every feature should be improved visually.
    - **Absolutely no mobile or responsive elements**—this UI is strictly for **desktop (1920x1080 resolution)**.
  </Changes>

  <AdditionalGuidelines>
    - Focus on creating a **modern, sleek, and professional desktop UI** optimized for **1920x1080 resolution**.
    - **Strictly avoid responsive or mobile layouts**—the UI should be designed exclusively for **desktop**.
    - Apply modern **UI design principles** such as **grids, proper spacing, clean alignment, and professional animations** to create a sleek and polished desktop layout.
    - The UI must include **smooth transitions, hover effects**, and **interactive components** to provide a **high-end user experience**.
    - Ensure the layout is **spacious and clean** with proper **use of grids and spacing**. **White space** should be used to prevent the UI from looking cluttered or cramped.
    - The overall look must feel **cutting-edge** and **professionally designed**: use **modern component arrangement, hover effects, dynamic animations, and transitions** to make the UI **stand out on a desktop display**.
    - Ensure the UI is **visually stunning and fully functional**—replace any outdated elements with **modern, desktop-optimized components**.
  </AdditionalGuidelines>

  <CodeIntegration>
    - Incorporate **every single line** of the provided code below, **enhance the layout for a professional desktop experience**, and ensure all logic and functionality are retained and improved:
    ```plaintext
    {code}
    ```
  </CodeIntegration>
</UIEnhancementPrompt>

---

**Important**: The UI must be significantly **enhanced and visually polished**—the goal is to create a **high-end, professional look** for **desktop users (1920x1080 resolution)**. The entire layout should feel **modern, sleek, and highly interactive**. **No mobile or responsive layouts are allowed**.

---

**Important**: Every feature and component of the UI must be **visually stunning** and fully optimized for a **desktop-first experience**. The final result must look **modern, cutting-edge, and highly professional** for **1920x1080 resolution**. No outdated or poorly designed elements are allowed. Ensure the layout, functionality, and animations reflect a **high-end desktop UI**.
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


overallPlannerPrompt = """
You are a highly skilled software architect tasked with designing a modern desktop enterprise software solution to solve a specific business problem for a client. Your primary objectives are to ensure 
ease of use and modularity throughout the software. The architecture will consist of multiple modules, each addressing distinct aspects of the client's needs. Within each module, there will be several 
interconnected pages that work together seamlessly to achieve the module's goals. There is no API or BACKEND. USE DUMMY DATA WHEN NEEDED.

Business Problem:
<Business Problem>
{businessProblem}
</Business Problem>


I WANT EXTREME DETAILS. I WANT TO SEE EVERYTHING

FORMAT:
### Module Name: [Module Name] 
   1. **Name and Purpose:**
      - **Name**: Exact name of the module.
      - **Purpose**: Explain the module’s purpose and how it addresses the business problem.
      - **ProblemSolved**: List all the problems that need to be solved by this module. ENSURE EXTENSIVE DETAILS.

   2. **Logic:**
      - **Responsibilities:**
        - **Primary Tasks**: Core tasks the module handles.
        - **Secondary Tasks**: Supporting tasks that enhance the primary ones.
        - **Key Features**: Important features and how they work together.

      - **Frontend Logic:**
        - **User Interactions**: How users interact with the module.
        - **Data Handling**: Use fake data to simulate operations. Describe validation and usage.
        - **Dynamic Behaviors**: Describe any dynamic aspects like real-time updates or conditional rendering.

   3. **Interconnectivity:**
      - **Interactions**: How this module interacts with others,focusing on frontend interactions.
      - **Data Exchange**: How data is shared between modules using fake data.
      - **Integration Points**: Integration with shared components or context providers.

    4.  **Additional Notes:**
        - **Strict Module Adherence:** Only create the modules explicitly mentioned. Do not add extra modules.
        - **Component Grouping:** Group functionalities under specified modules as described.
        - **Frontend Focus:** Focus on frontend details and use fake data. Exclude backend interactions.
   
   5. **Page Breakdown:**
      - Pages needed in the module. List all of them by name.
      - List what they are for

### Module Name: [Module Name] 
[CONTINUE]
   
You can take multiple messages to complete this task if necessary. Be as through and compresive as possible in your analysis and explainations. GIVE ME the answer in the same format as the example.
Use as many tokens as you need to complete this task.
"""


modulePlannerPrompt = """
You are a seasoned software architect. Your task is to design the pages within a module, ensuring they deliver **intuitive user experiences**, **modular 
consistency**, and **robust component design**. Each page should be structured with a clear **parent-child component hierarchy**. 

### Objectives:
- **Modular Consistency:** Align all pages with the module’s overall purpose and aesthetic. Ensure components are reusable, adaptable, and consistent across the module.
- **Component-Centric Design:** Focus on defining parent and child components, ensuring they work together seamlessly to create an intuitive user experience.
- **User-Centric Approach:** Design components with user navigation, interaction, and feedback in mind.

### Module Overview:
<Overall Module Plan>
{overallModulePlan}
</Overall Module Plan>

### Page Name: [Page Name]

#### 1. **Name and Purpose**
   - **Name:** Provide the exact name of the page.
   - **Purpose:** Explain the page’s role within the module and its functionality.
   - **Problems Solved:** List the specific problems this page addresses.

#### 2. **Component Structure**
   - **Parent Components:** Identify the core components forming the page's structure.
     - **Core Role:** Define each parent component's main responsibilities.
     - ** Components:** Specify which components will be used.
   - **Sub-Components (Children):** List and describe each child component, highlighting their functionality and contribution to the parent component’s role.
   - **Component Breakdown:**
     - **Hierarchy:** Detail the parent-child component structure, explaining their interactions.
     - **Dynamic Relationships:** Describe any real-time data exchanges or user interactions between components.
     - **Reusability:** Discuss how child components can be reused within this page or across other module pages.

#### 3. **User Interaction and Flow**
   - **Component Interactions:** Explain how users will interact with each component, focusing on information flow and actions.
   - **Feedback Mechanisms:** Define how components will provide feedback (e.g., visual cues, alerts, real-time updates).
   - **Adaptive Behavior:** Describe any responsive behaviors based on user input or screen size.

#### 4. **Data Handling**
   - **Data Flow:** Outline how data flows between parent and child components, using mock data to simulate backend interactions.
   - **State Management:** Explain how state is managed within the component hierarchy to ensure data consistency.
   - **Mock Data Implementation:** Detail strategies for using mock data to demonstrate functionality without backend dependency.

#### 5. **Interconnectivity**
   - **Intra-Module Interactions:** Explain how this page’s components interact with components on other pages within the module.
   - **Data Sharing:** Detail how data is shared between this page’s components and those on other pages.
   - **Integration Points:** Highlight any shared components or context providers that influence this page’s components.

#### 6. **Scalability and Performance**
   - **Scalability Considerations:** Discuss how the component structure supports scaling (e.g., adding more child components or handling increased data volume).
   - **Performance Metrics:** Define metrics for measuring component performance (e.g., load times, responsiveness, resource usage). Describe how these metrics will be monitored and optimized.

#### 7. **Navigation and User Flow** [ONLY MENTION THE PAGES THAT YOU ARE CURRENTLY CREATING]
   - **Navigation To This Page:** Describe how users will navigate to this page, focusing on the components facilitating navigation.
   - **Navigation From This Page:** Explain how users will navigate from this page to others, detailing the components responsible for guiding the user.

#### 8. **Innovative Features**
   - **Unique Features:** Describe any innovative features or techniques that enhance the user experience or page functionality.
   - **Components Needed for Innovative Features:** List the components required to support these innovative features.

#### 9. **Page URL**
   - **URL for This Page (React):** Provide the URL structure for this page.

### Page Name: [Page Name]
[CONTINUE]
"""
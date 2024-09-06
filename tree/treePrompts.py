RegularCoderPrompt = """
<Prompt>
    <FileHeader>
        "****File Path: FileName"**** - add that right above the first line of your code. Make sure you have 4 asterisks at the start of the line and at the end of the line, and the file name should be the actual file name.    
    </FileHeader>
    
    <Instructions>
        <Plan>
            <Description>
                Use the plan below to guide your implementation.
            </Description>
            <Content>{plan}</Content>
        </Plan>
        
        <CodeComponents>
            <Description>
                Recreate ALL of the following components in your file. DO NOT leave out any code provided. DO NOT import any components or functions from other files.
            </Description>
            <Content>{code}</Content>
            <Recode>
            Recode EVERY SINGLE LINE of the following components into your current file. DO NOT import them. Implement every piece of code without leaving any part missing. Ensure the final code is complete, functional, and self-contained within this single file.
            </Recode>
        </CodeComponents>
        
        <FileRequirements>
            <SingleFile>
                <Description>
                    Create a single JS file with no styling. Use only dummy data, no backend or API calls.
                </Description>
            </SingleFile>
            
            <Imports>
                <Description>
                    Include only necessary React imports. DO NOT import any custom components or functions from other files.
                </Description>
            </Imports>
        </FileRequirements>
    </Instructions>
    
    <Rules>
        <General>
            <NoBugs>No errors or bugs allowed. The code should work perfectly on the first try.</NoBugs>
            <CompleteCode>Provide complete code with no missing implementations. Recode everything in this file.</CompleteCode>
            <NoImports>
                <Description>
                    DO NOT import any other JS files or components; recreate them in the current file exactly.
                </Description>
            </NoImports>
        </General>
        
        <ResponseFormat>
            <NoExplanation>No explanations, just the code with the file name at the top.</NoExplanation>
        </ResponseFormat>
    </Rules>
</Prompt>

You can take multiple messages to complete this task if necessary. Be as thorough as possible with your code. Remember, RECODE EVERYTHING, DO NOT IMPORT ANY EXTERNAL COMPONENTS OR FUNCTIONS.

"""

LeafCoderPrompt = """
<Prompt>
    <FileHeader>
        "****File Path: FileName"**** - add that right above the first line of your code. Make sure you have 4 asterisks at the start of the line and at the end of the line, and the file name should be the actual file name.
    </FileHeader>
    
    <Instructions>
        <ComponentRequirements>
            <Description>
                You will be given requirements for a component. You are to create complete React code only for the component, nothing else. Make sure the React code works and uses the latest React version.
            </Description>
            <Requirements>
                <Content>{requirements}</Content>
            </Requirements>
        </ComponentRequirements>
        
        <FileRequirements>
            <SingleFile>
                <Description>
                    Create 1 JS file with no styling. Ensure the file uses only dummy data with no backend or API calls, just dummy data.
                </Description>
            </SingleFile>
        </FileRequirements>
    </Instructions>
    
    <Rules>
        <General>
            <NoBugs>No errors or bugs allowed. The code should work perfectly on the first try.</NoBugs>
            <CompleteCode>Provide complete code with no missing implementations. DO NOT ask the user to implement anything.</CompleteCode>
            <NoImports>
                <Description>
                    DO NOT leave out any code. Recreate all necessary code in the current file exactly. DO NOT import any other JS files.
                </Description>
            </NoImports>
        </General>
        
        <ResponseFormat>
            <NoExplanation>No explanations, just the code with the file name at the top.</NoExplanation>
        </ResponseFormat>
    </Rules>
    
    <Specifics>
        <DataUsage>
            <FakeData>
                <Description>
                    Use fake data only. NO API or backend calls, just dummy data.
                </Description>
            </FakeData>
            <MapFunction>
                <Description>
                    DO NOT mess up the .map function. Ensure it is used correctly.
                </Description>
            </MapFunction>
        </Specifics>
    </Specifics>
    
    <Completion>
        <MessageSplitting>
            <Description>
                You can take multiple messages to complete this task if necessary. Be as thorough as possible with your code.
            </Description>
        </MessageSplitting>
    </Completion>
</Prompt>

"""

RootCoderPrompt = """
<Prompt>
    <FileHeader>
        "****File Path: FileName"**** - Add that right above the first line of your code. Make sure you have 4 asterisks at the start and end of the line, and the file name should be the actual file name.
    </FileHeader>
    
    <Instructions>
        <CodeComponents>
            <Description>
                You will be given 1 or multiple code components. DO NOT import them; RECODE EVERY SINGLE LINE in your file. Make the component for your current plan without leaving any code missing. You are to provide the full, self-contained code for the component.
            </Description>
            <Plan>
                <PlanForPage>
                    <Description>
                        Use this plan to help create code for the current page.
                    </Description>
                    <Content>{plan}</Content>
                </PlanForPage>
                <RequiredCode>
                    <Description>
                        MAKE SURE TO RECODE EVERY SINGLE LINE OF THIS CODE WHEN CODING REQUIREMENTS FOR THE CURRENT PAGE. DO NOT LEAVE OUT ANY OF THE FOLLOWING CODE. DO NOT IMPORT ANYTHING.
                    </Description>
                    <Content>{code}</Content>
                </RequiredCode>
            </Plan>
        </CodeComponents>
        
        <FileRequirements>
            <SingleFile>
                <Description>
                    Create 1 JS file, no styling at all. Ensure the file uses only fake data with no backend or API calls, just dummy data. All code must be self-contained within this single file.
                </Description>
            </SingleFile>
        </FileRequirements>
    </Instructions>
    
    <Rules>
        <General>
            <NoBugs>No errors or bugs allowed. The code should work perfectly on the first try.</NoBugs>
            <CompleteCode>Provide complete code with no missing implementations. DO NOT ask the user to implement anything. Recode everything in this file.</CompleteCode>
            <NoImports>
                <Description>
                    DO NOT import any other JS files or custom components; recreate them in your current code exactly. Only use necessary React imports.
                </Description>
            </NoImports>
            <FakeData>
                <Description>
                    Use fake data only. NO API or backend calls, just dummy data.
                </Description>
            </FakeData>
            <NoStyling>No styling at all; focus entirely on functionality.</NoStyling>
            <MapFunction>
                <Description>
                    DO NOT mess up the .map function. Ensure it is used correctly.
                </Description>
            </MapFunction>
        </General>
        
        <ResponseFormat>
            <NoExplanation>No explanations, just the code with the file name at the top.</NoExplanation>
        </ResponseFormat>
    </Rules>
    
    <Completion>
        <MessageSplitting>
            <Description>
                You can take multiple messages to complete this task if necessary. Be as thorough as possible with your code. Remember, RECODE EVERYTHING, DO NOT IMPORT ANY EXTERNAL COMPONENTS OR FUNCTIONS.
            </Description>
        </MessageSplitting>
    </Completion>
</Prompt>

"""

ComponentPrompt = """
<Prompt>
    <Context>
        You are an advanced language model designed to assist in generating practical and implementable plans. The user has provided a high-level overview, and your task is to refine this plan by focusing on the core logic, functionality, and necessary details, making it straightforward for an LLM to code.
    </Context>

    <UserPlan>
        <HighLevelPlan>{plan}</HighLevelPlan>
    </UserPlan>
    
    <Instructions>
        <StepByStepPlan>
            <Description>
                Based on the user's request, create a step-by-step plan to accomplish the task. Ensure each step is concise, actionable, and optimized for ease of coding by an LLM.
            </Description>
            <Steps>
                <Clarification>
                    Clarify each point in the user's plan to ensure clarity and remove any unnecessary elaboration.
                </Clarification>
                <ImplementationGuidance>
                    Provide direct and practical guidance on how each functionality should be implemented, focusing on core logic, error handling, and dependencies.
                </ImplementationGuidance>
                <Efficiency>
                    Prioritize coding efficiency by structuring the plan logically, using headers and sub-headers that align with code modules or functions.
                </Efficiency>
                <TechnicalSpecifications>
                    Include only essential technical specifications that are critical for implementation, such as frameworks, methods, or classes.
                </TechnicalSpecifications>
                <Examples>
                    Provide brief, illustrative examples or scenarios to clarify key points without overwhelming with too much detail.
                </Examples>
                <EdgeCases>
                    Identify critical edge cases and suggest straightforward testing methods to ensure reliability.
                </EdgeCases>
                <Enhancements>
                    Offer practical suggestions for enhancements or optimizations that will improve performance, maintainability, or user experience.
                </Enhancements>
            </Steps>
        </StepByStepPlan>

        <Summary>
            <Description>
                After listing the steps, provide a brief summary of the plan, highlighting key considerations, dependencies, or potential challenges.
            </Description>
        </Summary>

        <SimplifiedPlan>
            <Description>
                If the task is simple and can be accomplished without other assistance, provide a straightforward one or two-step plan. Avoid overcomplicating if not necessary.
            </Description>
        </SimplifiedPlan>
    </Instructions>
    
    <Rules>
        <ChartUsage>
            <Description>
                For charts, use Recharts only. Do not use ChartJS or any other library.
            </Description>
        </ChartUsage>
        <DataUsage>
            <Description>
                Use only fake data; no API or backend calls are allowed, just dummy data.
            </Description>
        </DataUsage>
    </Rules>
</Prompt>

You can take multiple messages to complete this task if necessary. Be as thorough as possible with your code.

"""

UICoderPrompt = """
<Prompt>
    <FileHeader>
        "****File Path: FileName"**** - Add that right above the first line of your code. Make sure you have 4 asterisks at the start and end of the line, and the file name should be the actual file name.
    </FileHeader>

    <Instructions>
        <Review>
            <Description>
                Examine the existing code, including UI elements, animations, and overall structure. Identify areas for improvement.
            </Description>
        </Review>

        <Enhance>
            <Description>
                Refactor and update the code to utilize modern UI techniques. Use "Ant Design" for all UI changes, enhancing the placement, animations, and overall design of the page. GO ALL OUT with these enhancements.
            </Description>
        </Enhance>

        <Complete>
            <Description>
                Ensure no code is left out or missing. Provide the full, updated code with appropriate file names. EVERYTHING should be coded in one JS file unless CSS is necessary.
            </Description>
        </Complete>

        <Thoroughness>
            <Description>
                Be as detailed and comprehensive as necessary. If multiple messages are required, continue until the task is fully completed.
            </Description>
        </Thoroughness>
    </Instructions>

    <CodeContent>
        <Description>
            Review the following code, and make sure to recode it entirely within the provided guidelines.
        </Description>
        <Content>{code}</Content>
    </CodeContent>

    <Rules>
        <NoRedux>No Redux or any API integrations allowed.</NoRedux>
        <NoOmissions>
            <Description>
                DO NOT leave out any code. Make sure to create full code, covering every single detail. DO NOT ask the user to implement anything or leave any code missing.
            </Description>
        </NoOmissions>
        <NoExplanations>No explanations; just provide the code with the file name at the top.</NoExplanations>
        <AntDesign>
            <Description>
                GO HAM with Ant Design, making the UI so much better. Focus only on desktop UI, ensuring it fits the screen size.
            </Description>
        </AntDesign>
        <SingleExport>
            <Description>
                Make it one export default that can be called in App.js. Everything should be in one JS file unless CSS is necessary.
            </Description>
        </SingleExport>
        <FakeData>
            <Description>
                Use fake data only. NO API or backend calls at all, just dummy data.
            </Description>
        </FakeData>
        <CleanCode>
            <Description>
                Write clean and documented code. The code should work on the first try without any errors or bugs.
            </Description>
        </CleanCode>
        <Library>
            <Description>
                Choose the library or dependency you know best.
            </Description>
        </Library>
    </Rules>

    <Completion>
        <MessageSplitting>
            <Description>
                You can take multiple messages to complete this task if necessary. Be as thorough as possible with your code.
            </Description>
        </MessageSplitting>
    </Completion>
</Prompt>

"""

functionalityCoderPrompt = """
"****File Path: FileName"****"  - add that right above the first line of your code make sure you have 4 asterisks at the start of the line and at the end of the line, and the file name should be the actual file name!!!!!!!!!!!!!

Your task is to thoroughly review and enhance the provided code with a focus on functionality improvements. This includes implementing any missing logic, improving state management, and optimizing the existing logic to make it more effective.

**Instructions:**

- **Review**: Examine the existing code to identify any unimplemented logic, inefficiencies, or suboptimal state management practices.
- **Enhance**: Implement missing functionality, improve state management, and refactor the code to optimize logic where necessary.
- **Complete**: Ensure no functionality is left unimplemented or incomplete. Provide the full, updated code with appropriate file names.
- **Thoroughness**: Be as detailed and comprehensive as necessary. If multiple messages are required, continue until the task is fully completed.


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
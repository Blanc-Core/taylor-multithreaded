from mainClasses.basicClientRequest import ClientRequest

userPrompt = """

You are a highly skilled front-end developer tasked with creating the main entry file (`app.js`) for a modern React application that uses a drawer navigator for 
seamless navigation across multiple pages. The `app.js` should include:

1. **React and Routing Setup:**
   - Use `react-router-dom` for routing.
   - Implement a drawer navigation menu using `antd` components.
   - Use `Routes` instead of `Switch`.
   - Ensure that the navigation includes links to at least three pages: Home, About, and Contact.

2. **Component Structure:**
   - **Main Layout:** A layout that contains a persistent drawer on the left side and a main content area on the right.
   - **Drawer Content:** A list of navigation items linking to different routes.
   - **Routes:** Define routes for Home, About, and Contact pages, each with placeholder content.

3. **Functional Requirements:**
   - **Drawer Behavior:** The drawer should be responsive, collapsing on smaller screens and expandable on larger screens.
   - **Routing Logic:** Properly implement `react-router-dom` to handle page navigation.
   - **User Interaction:** Ensure that clicking on a drawer item navigates to the corresponding page.

4. **Styling and UI:**
   - **CSS and Theming:** Provide basic styling for the drawer and the main content area. Use Ant Design’s theming system to create a modern and consistent look.
   - **Responsiveness:** Ensure the layout is fully responsive and adapts to different screen sizes.

**I WANT EXTREME DETAILS. I WANT TO SEE EVERYTHING.**

<Code>
{code}
</Code>

Give me the code for the app.js file in teh following format: 

****File Name: app.js****
[Code Output]
"""


class AppJSmaker:
    def __init__(self, model, allTheCode):
        self.model = model

        self.userPrompt = userPrompt.format(code = allTheCode)

    def generate(self):
        self.systemPrompt = """
        you are to generate app.js by importing the correct files and thinking carefully and routes with react router dom and setting app.js js up for react
        make sure to do correct imports as well read the code properly
        """
        coder = ClientRequest(self.systemPrompt, self.model, self.userPrompt, True)
        generatedAppJs = coder.generate()
        
            # Write the generated app.js content to a file
        with open("app.js", "w", encoding="utf-8") as app_js_file:
                app_js_file.write(generatedAppJs)
            
                print("app.js has been generated successfully.")
    
    

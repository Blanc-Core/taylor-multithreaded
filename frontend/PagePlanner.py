from pydantic import BaseModel, Field
from openai import OpenAI
from dotenv import load_dotenv
from typing import List, Optional
import json

load_dotenv()

# Add navigation routing 
class PagePlanner:
    def __init__(self):
        self.client = OpenAI()  # Adjusted to match the new openai client initialization if necessaryç=
        # gpt-4o-2024-08-06
        self.model = "gpt-4o-2024-08-06"  # Ensure this model is available or adjust to a valid model

    def generate_completion(self, user_plan: str, response_format: BaseModel):
        systemPrompt = """
        You are an expert React developer tasked with designing a modern desktop enterprise software page to solve a client's business problem, with a primary focus on component structure.
        DO not miss a single component.
        """
        user_prompt = user_plan

        completion = self.client.beta.chat.completions.parse(  # Changed to `parse` method
            model=self.model,
            messages=[
                {"role": "system", "content": systemPrompt},
                {"role": "user", "content": "PLEASE DO NOT MISS EVEN A Single COMPONENT MENTIONED HERE. Here is the page: " + user_prompt}
            ],
            response_format=response_format,
            temperature= 0.7,
            max_tokens= 16384
        )
        return completion.choices[0].message
  

class UserInteraction(BaseModel):
    interact: str = Field(description="The element does the user interact with on the component even hypothetical ones and plan for that")
    possibleInteractions: str = Field(description="list of items of the table imagine the user clicks on that what should happen")
    result: str = Field(description="Explanation of what should show up when the user interacts with the component for example a new page or a centered card with a backdrop to add")
    resultFunctionality: str = Field(description="extreme detail of the functionality from the result")

class ColourScheme(BaseModel):
    primaryColor: str = Field(description="Primary color used in the visual design, consistent across the ERP system. Use HEX CODE")
    secondaryColor: str = Field(description="Secondary color used in the visual design, complementing the primary color. Use HEX CODE")
    tertiaryColor: str = Field(description="Tertiary color used in the visual design, ensuring a cohesive look and feel. Use HEX CODE")
    spacing: str = Field(description="Spacing used in the visual design, optimized to reduce empty spaces and improve content density. SHOULD MINIMIZE WHITE SPACE")
    typography: str = Field(description="Typography used in the visual design, with a focus on clarity and readability in an ERP environment.")
class Interconnections(BaseModel):
    pageUrl: str = Field(description="URL of the page for navigation within the ERP system in react.")
    description: str = Field(description="Detailed description of the interconnection, detailing its purpose and role within the ERP system.")
    
class ComponentInfo(BaseModel):
    componentDescription: str = Field(description="Description of the component, detailing its purpose and role within the ERP system.")
    functionality: str = Field(description="Precise functionality of the component, directly supporting ERP tasks. WRITE A LONG Paragraph EXPLAINING")
    details: List[str] = Field(description="Specific details or requirements of the child component, such as input fields, buttons, or charts - if charts use ECharts and cool charts not just normal ones. WRITE A REALLY LONG paragraph EXPLAINING")
    isVisible: bool = Field(description="Visibility status of the child component")
    interconnectivity: list[Interconnections]
    userInteraction: UserInteraction

class Components(BaseModel):
    componentName: str = Field(description="Component Name")
    componentInfo: ComponentInfo
    components: List["Components"] = Field(description="List of child components within this component. EVERY SMALL COMPONENT WITHIN THIS COMPONENT. DO NOT MISS ANY")

class PageInfromation(BaseModel):
    purposeAndGoals: str = Field(description="Purpose of the ERP page, providing a comprehensive overview of its role.")
    problemSolved: str = Field(description="Specific problem solved by the ERP page, detailing how it improves workflow or efficiency. WRITE A REALLY LONG SENTENCE EXPLAINING")
    colour: ColourScheme 

# Page OverView
class Page(BaseModel):
    pageName: str = Field(description="Name of the page")
    pageInfo: PageInfromation
    components: List[Components]
    pageUrl: str = Field(description="URL of the page for navigation within the ERP system in react.")

Page.model_rebuild()

class Output(BaseModel):
    finalOutput: Page

def processPage(page):
    gpt_completion = PagePlanner()
    response_format = Output  # This is your expected response format
    codeSteps = gpt_completion.generate_completion(page, response_format=response_format)
    final_output_dict = codeSteps.parsed.dict()
    fullJson = json.dumps(final_output_dict, indent=4)
    
    return fullJson
  


if __name__ == "__main__":
    user_plan = """

### Page Name: Purchase Orders Page

#### 1. **Name and Purpose**
   - **Name:** Purchase Orders Page
   - **Purpose:** This page serves as the central interface for managing purchase orders, allowing users to create new orders, view existing ones, and export order information.
   - **Problems Solved:** 
     - Simplifies the process of creating and managing purchase orders.
     - Provides a clear overview of current purchase orders and their statuses.
     - Enables easy export of purchase order data for financial tracking.

#### 2. **Component Structure**
   - **Parent Components:**
     - **PurchaseOrderContainer:** 
       - **Core Role:** Acts as the main wrapper for the page, managing state and rendering child components.
       - **Components:** 
         - PurchaseOrderForm
         - PurchaseOrderTable
         - ExportButton
   - **Sub-Components (Children):**
     - **PurchaseOrderForm:**
       - **Functionality:** Form for entering new purchase orders including fields for supplier, item, quantity, and price.
     - **PurchaseOrderTable:**
       - **Functionality:** Displays a summary table of all purchase orders with options to edit or delete.
     - **ExportButton:**
       - **Functionality:** Triggers the export of purchase order data in CSV format.

   - **Component Breakdown:**
     - **Hierarchy:** 
       - PurchaseOrderContainer
         - PurchaseOrderForm
         - PurchaseOrderTable
         - ExportButton
     - **Dynamic Relationships:** 
       - PurchaseOrderTable updates in real-time as orders are added or modified via PurchaseOrderForm.
     - **Reusability:** 
       - PurchaseOrderForm can be reused on different pages that require order entry functionality.

#### 3. **User Interaction and Flow**
   - **Component Interactions:** 
     - Users fill out PurchaseOrderForm to create new orders, triggering state updates in PurchaseOrderContainer.
     - Users can click options in PurchaseOrderTable to edit or delete orders.
   - **Feedback Mechanisms:** 
     - Real-time validation feedback in PurchaseOrderForm (e.g., error messages for invalid quantity).
     - Confirmation prompts before deletion in PurchaseOrderTable.
   - **Adaptive Behavior:** 
     - The layout adjusts based on screen size, ensuring usability on both desktop and mobile devices.

#### 4. **Data Handling**
   - **Data Flow:** 
     - Data flows from PurchaseOrderForm to PurchaseOrderContainer where it updates the state, which is then passed down to PurchaseOrderTable for rendering.
     - Mock data example: `{ id: 1, supplier: 'ABC Supplies', item: 'Glass', quantity: 100, price: 2000 }`
   - **State Management:** 
     - State is managed in PurchaseOrderContainer using React's useState hook to keep track of purchase orders.
   - **Mock Data Implementation:** 
     - Mock data can be created using JSON and stored in a local state for demonstration, simulating backend interactions.

#### 5. **Interconnectivity**
   - **Intra-Module Interactions:** 
     - PurchaseOrderTable may interact with the Statistics module to display purchasing trends.
   - **Data Sharing:** 
     - Purchase order data is shared between the Purchase Orders Page and other pages like the Dashboard.
   - **Integration Points:** 
     - Shared components like the form and table are used across different pages in the module for consistency.

#### 6. **Scalability and Performance**
   - **Scalability Considerations:** 
     - The component structure allows for easy addition of more input fields in PurchaseOrderForm or additional features in the table.
   - **Performance Metrics:** 
     - Metrics such as load times and interaction response times will be monitored using performance profiling tools.

#### 7. **Navigation and User Flow**
   - **Navigation To This Page:** 
     - Users can navigate to the Purchase Orders Page via a sidebar link labeled "Purchase Orders."
   - **Navigation From This Page:** 
     - Users can return to the main dashboard from this page using a "Back to Dashboard" button located at the top of the page.

#### 8. **Innovative Features**
   - **Unique Features:** 
     - Real-time data validation in the purchase order form enhances user experience.
   - **Components Needed for Innovative Features:** 
     - Use of Ant Design's Form.Item for validation feedback, and modal components for confirmation dialogs.

#### 9. **Page URL**
   - **URL for This Page (React):** `/purchase-orders` 

        """
    gpt_completion = PagePlanner()
    response_format = Output  # This is your expected response format
    codeSteps = gpt_completion.generate_completion(user_plan, response_format=response_format)
    print(codeSteps)
    final_output_dict = codeSteps.parsed.dict()
    print(json.dumps(final_output_dict, indent=4))
  

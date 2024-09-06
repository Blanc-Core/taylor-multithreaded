import instructor
from pydantic import BaseModel, Field
from typing import List, Optional
from openai import OpenAI

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

class ComponentInfo(BaseModel):
    componentDescription: str = Field(description="Description of the component, detailing its purpose and role within the ERP system.")
    functionality: str = Field(description="Precise functionality of the component, directly supporting ERP tasks. WRITE A LONG Paragraph EXPLAINING")
    details: List[str] = Field(description="Specific details or requirements of the child component, such as input fields, buttons, or data displays. WRITE A REALLY LONG paragraph EXPLAINING")
    isVisible: bool = Field(description="Visibility status of the child component")
    componentQuery: str = Field(description="A search query to search on the internet to build this component. Needs to be a question.")
    userInteraction: UserInteraction

class Components(BaseModel):
    componentName: str = Field(description="Parent component that houses the child components for the main page. This component encapsulate a parent component within the page.")
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

# Patch the OpenAI client
client = instructor.from_openai(OpenAI())

# Extract structured data from natural language
user_info = client.chat.completions.create(
    model="gpt-4o-mini",
    response_model=Page,
    messages=[{"role": "user", "content": "A page for an erp."}],
)

print(user_info.pageName)
#> John Doe
print(user_info.pageInfo)
#> 30

print(user_info.components)

print(user_info.pageUrl)

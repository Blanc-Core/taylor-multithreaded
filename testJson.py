from pydantic import BaseModel, Field
from openai import OpenAI
from dotenv import load_dotenv
from typing import List, Optional
import json

load_dotenv()

class GeneralColorScheme(BaseModel):
    primary_color: str = Field(description="Primary color used in the UI. Hex code needed")
    secondary_color: str = Field(description="Secondary color used in the UI. Hex code needed")
    accent_color: str = Field(description="Accent color used in the UI. Hex code needed")
    background_color: str = Field(description="Background color used in the UI. Hex code needed")
    text_color: str = Field(description="Text color used in the UI. Hex code needed")

class UiRequirements(BaseModel):
    description: str = Field(..., description="Detailed description of the UI requirements for the module. This should include specific design goals, layout information, and any particular user interaction considerations. Write a paragraph")
    user_interactions: str = Field( description="Explains how the user is expected to interact with the UI, including common workflows and user behavior patterns. Write a paragraph")
    color_scheme: GeneralColorScheme =  Field( description="Color scheme used in the UI with detail on how they are used. ENSURE EACH MODULE HAS THE SAME COLOUR SCHEME")

class ProblemsSolved(BaseModel):
    primary_problem: str = Field(description="Primary problem solved by the module. Write a paragraph explaining in detail how the module solves the problem")
    secondary_problem: str = Field(description="Secondary problem solved by the module. Write a paragraph explaining in detail how the module solves the problem")

class FunctionalRequirements(BaseModel):
    description: str = Field(description="Comprehensive description of the module's functionality, including the overall purpose and specific features it provides.")
    uses: str = Field(description="Detailed explanation of how the module will be used. Write a paragraph")
    problems_solved: ProblemsSolved

class Module(BaseModel):
    name: str = Field(..., description="Name of the module. This should be a clear and concise identifier for the module's functionality.")
    functional_requirements: FunctionalRequirements 
    ui_requirements: UiRequirements

Module.model_rebuild()

class Modules(BaseModel):
    description: str = Field(description="Thorough explanation of the company's business problem, including the operational context and how the company addresses its challenges. This should also cover the broader objectives and goals.")
    modules: List[Module] 

class Format(BaseModel):
    output: Modules 

class PagePlanner:
    def __init__(self):
        self.client = OpenAI()  # Adjusted to match the new openai client initialization if necessary
        self.model = "gpt-4o-mini"  # Ensure this model is available or adjust to a valid model

    def generate_completion(self, user_plan: str):
        response_format =  Format

        system_prompt = """You are a expert analyst who can look at a business problem for a ERP that a company needs and break it up into different modules. 
        Modules are the different components of the ERP for example dashbaord, statistics and so on. ENSURE THE GENERAL color scheme is consistant within the modules"""

        user_prompt = user_plan

        completion = self.client.beta.chat.completions.parse(  # Changed to `parse` method
            model=self.model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": "PLEASE DO NOT MISS EVNE A Single thing MENTIONED HERE." + user_prompt}
            ],
            response_format=response_format,
            max_tokens=16384,
        )
        return completion.choices[0].message

    def parse_completion(self, completion):
        parsed_content = completion.parsed

        if hasattr(parsed_content, 'output') and hasattr(parsed_content.output, 'modules'):
            modules = parsed_content.output.modules
        else:
            raise ValueError("Unexpected structure in completion response. Check the response format.")

        output_dict = {}
        for module in modules:
            # Concatenating description, uses, and problems solved as a single string
            functional_requirements = (
                module.functional_requirements.description + " " +
                module.functional_requirements.uses + " " +"\n"
                + module.functional_requirements.problems_solved.primary_problem + " " + "\n"
                + module.functional_requirements.problems_solved.secondary_problem
            )
            # Adding everything in ui_requirements 
        # Combining all ui_requirements elements into a single string
            ui_requirements = (
                f"{module.ui_requirements.description} "
                f"{module.ui_requirements.user_interactions} " + "\n" + 
                f"Color Scheme: Primary Color: {module.ui_requirements.color_scheme.primary_color}, "
                f"Secondary Color: {module.ui_requirements.color_scheme.secondary_color}, "
                f"Accent Color: {module.ui_requirements.color_scheme.accent_color}, "
                f"Background Color: {module.ui_requirements.color_scheme.background_color}, "
                f"Text Color: {module.ui_requirements.color_scheme.text_color}."
            )
            module_info = {
                "functional_requirements": functional_requirements,
                "ui_requirements": ui_requirements
            }
            output_dict[module.name] = module_info
        
        return output_dict


if __name__ == "__main__":
    userPrompt = """
## Business Problem: Inventory Management and Optimization for Manufacturing ERP

### **Problem Statement**
The manufacturing company, **SteelCraft Inc.**, specializes in producing high-quality steel products for various industries, including automotive, construction, and aerospace. Over the years, the company has expanded its operations and now operates multiple factories across different locations. However, the company's current inventory management system is outdated and unable to efficiently handle the complexities of its growing operations.

### **Challenges**
1. **Inventory Accuracy**: The existing system often leads to discrepancies between the physical inventory and the records in the system. This inaccuracy results in production delays, overstocking, and understocking, affecting overall efficiency and customer satisfaction.

2. **Demand Forecasting**: SteelCraft Inc. struggles with accurate demand forecasting, leading to either excess inventory or stockouts. The lack of precise forecasting tools causes significant issues in meeting customer demands and maintaining optimal inventory levels.

3. **Supplier Management**: The company works with numerous suppliers for raw materials, each with different lead times and reliability. The current system does not effectively track supplier performance, resulting in delays and inconsistencies in raw material availability.

4. **Warehouse Management**: SteelCraft Inc. operates multiple warehouses across various locations, and the lack of integration between these warehouses leads to inefficiencies in inventory transfer, stock location tracking, and space utilization.

5. **Production Planning**: The existing system does not provide real-time data on inventory levels, making it difficult for production managers to plan and execute production schedules effectively. This often leads to production downtime due to material shortages or excess inventory, increasing operational costs.

6. **Compliance and Reporting**: The company needs to adhere to strict industry regulations and compliance standards. The current system lacks the capability to generate accurate and timely reports, making it difficult to maintain compliance and respond to audits.

7. **Integration with Other Systems**: SteelCraft Inc. uses various software solutions for different aspects of its operations, such as accounting, sales, and HR. However, the lack of integration between these systems and the inventory management system results in data silos, leading to inefficiencies and data inconsistencies.

### **Proposed Solution**
To address these challenges, SteelCraft Inc. requires a comprehensive ERP system with robust inventory management and optimization capabilities. The proposed ERP solution should include:

1. **Advanced Inventory Tracking**: Implement real-time inventory tracking with automated updates and reconciliation to ensure accuracy between physical and system records.

2. **Demand Forecasting Tools**: Integrate AI-powered demand forecasting tools that analyze historical data, market trends, and customer orders to predict future demand accurately.

3. **Supplier Relationship Management (SRM)**: Develop a supplier management module to track supplier performance, lead times, and reliability, allowing for better supplier selection and management.

4. **Warehouse Management System (WMS)**: Integrate a warehouse management system to optimize space utilization, streamline inventory transfers between locations, and provide real-time visibility into stock levels across all warehouses.

5. **Production Planning and Scheduling**: Provide production managers with real-time data and analytics on inventory levels, enabling them to plan production schedules more effectively and reduce downtime.

6. **Compliance and Reporting Module**: Include a compliance and reporting module that automatically generates reports for regulatory compliance, audits, and internal performance reviews.

7. **System Integration**: Ensure seamless integration between the ERP system and other business software, such as accounting, sales, and HR, to eliminate data silos and improve overall operational efficiency.

### **Expected Outcomes**
- **Increased Inventory Accuracy**: Achieving near-perfect inventory accuracy, reducing discrepancies, and improving overall inventory management.
- **Improved Demand Forecasting**: More accurate demand forecasts, leading to optimized inventory levels and reduced stockouts or overstocking.
- **Enhanced Supplier Performance**: Better supplier management and relationships, resulting in timely delivery of raw materials and reduced production delays.
- **Optimized Warehouse Operations**: Improved space utilization, faster inventory transfers, and real-time visibility into stock levels across all locations.
- **Efficient Production Planning**: Reduced production downtime, more efficient use of resources, and lower operational costs.
- **Compliance Assurance**: Timely and accurate reporting for regulatory compliance, reducing the risk of fines and penalties.
- **Operational Synergy**: Enhanced data flow between different business functions, leading to greater operational efficiency and better decision-making.

### **Conclusion**
The implementation of a modern ERP system tailored to SteelCraft Inc.'s specific needs will address the current challenges in inventory management and optimize overall operations. By investing in this solution, SteelCraft Inc. will be able to maintain its competitive edge, improve customer satisfaction, and achieve sustainable growth.
    
    """
    
    gpt_completion = PagePlanner()
    completion_response = gpt_completion.generate_completion(userPrompt)
    entireJson = completion_response.parsed.dict()
    print(json.dumps(entireJson, indent=4))

    
    # Parse the completion into a list of formatted strings
    formatted_output = gpt_completion.parse_completion(completion_response)
    
    # Save the output to a file or print it directly
    #json dup the output to a file
    print("OUTPUT TO UI")
    print(json.dumps(formatted_output, indent=4))
    
    with open("output.json", 'w') as json_file:
        json.dump(formatted_output, json_file, indent=4)

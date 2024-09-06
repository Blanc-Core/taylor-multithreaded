from mainClasses.basicClientRequest import ClientRequest
from tree.treePrompts import ComponentPrompt

class PlanImprover():
    def __init__(self, model, plan, streaming):      
        self.SystemPrompt = """
        
You are an advanced language model designed to assist in generating practical and implementable plans. The user has provided a high-level overview, and your task is to refine this plan by focusing on the core logic, functionality, and necessary details, making it straightforward for an LLM to code.
        make sure you dont talk about backend, and go more in deapth about more things that shoukld be added on to make it better
        ***dont halucinate make sure to create good plans***
        """
        self.plan = plan
        self.model = model
        self.streaming = streaming
        
    def generate(self):
        response = ClientRequest(self.SystemPrompt, self.model, ComponentPrompt.format(plan=self.plan), self.streaming).generate()
        return response
    
    def getPrompt(self):
        return f""""
        SystemPrompt:
        {self.SystemPrompt}
    
        UserPrompt:
        {ComponentPrompt.format(plan=self.plan)}
    """
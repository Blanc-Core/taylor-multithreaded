from mainClasses.basicClientRequest import ClientRequest
from tree.treePrompts import ComponentPrompt, ideasPrompt

class PlanImprover():
    def __init__(self, model, plan, streaming):      
        self.SystemPrompt = """
        
You are an advanced language model designed to assist in generating practical and implementable plans. The user has provided a high-level overview, and your task is to refine this plan by focusing on the core logic, functionality, and necessary details, making it straightforward for an LLM to code.
        make sure you dont talk about backend, and go more in deapth about more things that shoukld be added on to make it better
        ***dont halucinate make sure to create good plans***
        
        *************THINK ABOUT WHAT WOULD FILL UP THE PAGE LIKE MAKE SURE TO PLAN FOR A PROFESSIONAL ERP*************
        *****THINK ABOUT ALL THE STUFF THE USER WOULD WANT FOR THE CONPONENT, THINGS THEY WOULD WANT TO SEE AND ADD, MAKE SURE TO PLAN FOR THAT, THINGS LIKE THAT************
        **********do not talk aboout headers at all, if there is a header or a footer in the plan dont talk about it forget about headers and footers************
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
    
    
class IdeasPlanner():
    def __init__(self, model, oldPlan, streaming):      
        self.SystemPrompt = """
        
        You are an advanced language model designed to assist in generating practical and implementable plans. The user has provided a high-level overview, and your task is to refine this plan by focusing on the core logic, functionality, and necessary details, making it straightforward for an LLM to code.
        make sure you dont talk about backend, and go more in deapth about more things that shoukld be added on to make it better
        ***dont halucinate make sure to create good plans***
        *************MAKE SURE TO GIVE FULL OUTPUTS LIKE ALL OF IT THE PLAN CONTENT YOU RECIVED ALONG WITH IMPROVEMENTS, IT SHOULD BE 1 FINAL PLAN WITH ALL CONTENT FOR THE PAGE*************
        
        *************THINK ABOUT WHAT WOULD FILL UP THE PAGE LIKE MAKE SURE TO PLAN FOR A PROFESSIONAL ERP*************
        *****THINK ABOUT ALL THE STUFF THE USER WOULD WANT FOR THE CONPONENT, THINGS THEY WOULD WANT TO SEE AND ADD, MAKE SURE TO PLAN FOR THAT, THINGS LIKE THAT************
        **********do not talk aboout headers at all, if there is a header or a footer in the plan dont talk about it forget about headers and footers************
        """
        self.plan = oldPlan
        self.model = model
        self.streaming = streaming
        
    def generate(self):
        response = ClientRequest(self.SystemPrompt, self.model, ideasPrompt.format(oldPlan=self.plan), self.streaming).generate()
        return response
    
    
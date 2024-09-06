from typing import Optional

class TreeNode:
    def __init__(self, Name, Content, parent: Optional['TreeNode'] = None):
        self.Name = Name
        self.Content = Content
        self.children = []
        self.parent = parent
        self.code = ""
        self.Root = False

    def add_child(self, child):
        child.parent = self
        self.children.append(child)
    
    def get_child_by_name(self, name: str) -> Optional['TreeNode']:
        for child in self.children:
            if child.Name == name:
                return child
        return None
    
    def addCode(self, code):
        self.code += (f"\n\n{code}")
        
    def setRoot(self, Value: bool):
        self.Root = Value    
    
    def isRoot(self):
        return self.Root
    
    def getCode(self):
        return self.code
    
    def find_node(self, name: str) -> Optional['TreeNode']:
        if self.Name == name:
            return self
        for child in self.children:
            result = child.find_node(name)
            if result:
                return result
        return None
    
    def print_tree(self, level=0):
        print(' ' * level * 2 + f'- {self.Name}: ')
        for child in self.children:
            child.print_tree(level + 1)
    
    def remove_child(self, child):
        self.children.remove(child)
        child.parent = None

    def getName(self):
        return self.Name
    
    def getParent(self):
        return self.parent
    
    def getContent(self):
        return self.Content

    def is_leaf(self):
        return len(self.children) == 0
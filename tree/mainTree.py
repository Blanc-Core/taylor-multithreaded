import json
from tree.Node import TreeNode
from tree.TreeCoders import RegularCoder, LeafCoder, RootCoder
from tree.planners import PlanImprover

class TreeProcessor:
    def __init__(self, json_data):
        self.json_data = json_data
        self.root = None
    def search(self, content):
        #parse the query
        # call search query
        pass

    def writer(self, content):
        with open("output.txt", "a", encoding="utf-8") as f:
            f.write("\n\n" + content)

    def dfs_recursive_reverse(self, node: TreeNode):
        # First, recursively visit all children
        for child in node.children:
            self.dfs_recursive_reverse(child)

        # Then, process the current node
        if node.is_leaf():
            print(f"Visiting node: {node.getName()} (is leaf)")

            planner = PlanImprover("gpt-4o-mini", node.getContent(), True)
            plan = planner.generate()

            requirements = f"Component Name: {node.getName()}, Component requirements: {plan}"

            coder = LeafCoder("gpt-4o-mini", requirements, True)
            code = coder.generate()
            parent = node.getParent()
            print(f"Parent: {parent.getName()}")

            parent.addCode(code)
        elif node.isRoot():
            print(f"Visiting node: {node.getName()} (is root)")
            planner = PlanImprover("gpt-4o-mini", node.getContent(), True)
            plan = planner.generate()

            requirements = f"Component Name: {node.getName()}, Component requirements: {plan}"

            coder = RootCoder("gpt-4o-mini", requirements, node.getCode(), True)
            code = coder.generate()

            self.writer(code)
        else:
            print(f"Visiting node: {node.getName()}")

            planner = PlanImprover("gpt-4o-mini", node.getContent(), True)
            plan = planner.generate()

            requirements = f"Component Name: {node.getName()}, Component requirements: {plan}"

            coder = RegularCoder("gpt-4o-mini", requirements, node.getCode(), True)
            code = coder.generate()
            parent = node.getParent()
            print(f"Parent: {parent.getName()}")
            try:
                parent.addCode(code)
            except Exception as e:
                print(f"Error adding code to parent: {e}")

    def create_tree_from_json(self, component, parent=None):
        node = TreeNode(component['componentName'], component['componentInfo'], parent)

        for child_component in component.get('components', []):
            child_node = self.create_tree_from_json(child_component, node)
            node.add_child(child_node)

        return node

    def build_tree(self):
        jsonObj = (self.json_data)

        # Create the root node for the page
        self.root = TreeNode(jsonObj["finalOutput"]["pageName"], jsonObj["finalOutput"]["pageInfo"])
        self.root.setRoot(True)

        # Build the tree recursively
        for component in jsonObj["finalOutput"]["components"]:
            child_node = self.create_tree_from_json(component, self.root)
            self.root.add_child(child_node)

    def process(self):
        # Build the tree
        print("Building tree...")
        self.build_tree()
        print("Tree built!")
        # Print the tree structure (optional)
        self.root.print_tree()
        print("\n\n\n")
        print("Processing tree...")
        # Process the tree using DFS
        self.dfs_recursive_reverse(self.root)


# Example usage
if __name__ == "__main__":
    # Load the JSON data from a file or another source
    json_data = """
{
    "finalOutput": {
        "pageName": "Statistics Overview Page",
        "pageInfo": {
            "purposeAndGoals": "The Statistics Overview Page serves as the central dashboard for displaying key production metrics through tables and graphs, providing insights into operational efficiency.",
            "problemSolved": "The Statistics Overview Page offers a consolidated view of production statistics, allows users to quickly assess performance metrics, and supports data-driven decision-making with visual representations, enhancing the overall workflow efficiency of the enterprise by providing real-time access to critical data that guides strategic decisions.",
            "colour": {
                "primaryColor": "#1890ff",
                "secondaryColor": "#f0f2f5",
                "tertiaryColor": "#ffffff",
                "spacing": "8px",
                "typography": "Roboto, sans-serif"
            }
        },
        "components": [
            {
                "componentName": "OverviewLayout",
                "componentInfo": {
                    "componentDescription": "Provides the main layout for the page, including header, footer, and content area.",
                    "functionality": "The OverviewLayout is a comprehensive layout component that structures the entire page, ensuring that the header, footer, and content areas are well-organized and accessible. It utilizes Ant Design's Layout, Menu, and Breadcrumb components to create a cohesive and navigable structure. The layout is responsive, adapting to different screen sizes, and provides a seamless user experience by maintaining consistent design elements across the page. The header typically contains navigation elements and branding, the content area houses the main dashboard features, and the footer provides additional links or information. Breadcrumbs enhance navigation by showing the user's current location within the application, improving usability and reducing user errors. The Menu component allows users to access different sections of the application quickly, fostering a smooth workflow and increasing productivity.",
                    "details": [
                        "Header: Uses Ant Design's Layout.Header for branding and navigation.",
                        "Menu: Provides navigational links to other parts of the ERP system.",
                        "Breadcrumb: Displays the user's current location, improving navigation.",
                        "Footer: Contains additional links and information relevant to the user."
                    ],
                    "isVisible": true,
                    "userInteraction": {
                        "interact": "Menu items and breadcrumb links.",
                        "possibleInteractions": "Clicking on a menu item should navigate to the corresponding page.",
                        "result": "Navigation to a different page or section within the ERP system.",
                        "resultFunctionality": "Upon interacting with the menu or breadcrumbs, the application should seamlessly transition to the selected page, updating the URL and active state in the menu to reflect the current page. This ensures that the user is always aware of their location within the application and can easily navigate between different sections without confusion."
                    }
                },
                "components": [
                    {
                        "componentName": "StatisticsDashboard",
                        "componentInfo": {
                            "componentDescription": "Serves as the main container for charts and tables, organizing the data presentation components.",
                            "functionality": "The StatisticsDashboard acts as the primary container for displaying production metrics and data visualizations. It employs Ant Design's Card, Row, and Col components to structure and present data in a clear and organized manner. The dashboard is designed to be highly interactive, allowing users to engage with the data through sortable tables and dynamic graphs that update based on user input. This component is integral to providing a comprehensive overview of production statistics, facilitating data analysis and strategic decision-making. It ensures that all data elements are accessible and visually appealing, making complex information easy to digest for users.",
                            "details": [
                                "Card: Used to encapsulate each section of data, such as tables and graphs.",
                                "Row and Col: Organize the layout of tables and graphs, ensuring a responsive design.",
                                "Dynamic updating: Data within the dashboard updates in real-time based on user interactions with the FilterPanel."
                            ],
                            "isVisible": true,
                            "userInteraction": {
                                "interact": "Cards containing the table and graph, filter options.",
                                "possibleInteractions": "Clicking on filter options should update the data in the table and graph.",
                                "result": "Updated display of production statistics and performance metrics in the table and graph components.",
                                "resultFunctionality": "When a user interacts with the filter options, the StatisticsDashboard component should fetch the relevant data and update the ProductionTable and PerformanceGraph components accordingly. This interaction ensures that users can refine the data view to suit their needs, providing meaningful insights and enhancing the decision-making process."
                            }
                        },
                        "components": [
                            {
                                "componentName": "FilterPanel",
                                "componentInfo": {
                                    "componentDescription": "Provides options for users to filter data based on date range, order types, etc.",
                                    "functionality": "The FilterPanel is a versatile component that allows users to customize the data displayed on the Statistics Overview Page. It provides a range of filtering options, such as date ranges and order types, enabling users to tailor the data view to their specific needs. The panel is designed to be intuitive, with user-friendly controls that facilitate quick and efficient data filtering. Once the user selects their desired filters, the component communicates these preferences to the StatisticsDashboard, which then updates the ProductionTable and PerformanceGraph components to reflect the filtered data. This interaction ensures that users can obtain precise insights into production metrics without navigating away from the page.",
                                    "details": [
                                        "Date range picker: Allows users to select a specific time frame for data analysis.",
                                        "Order type selector: Enables filtering by different types of production orders.",
                                        "Apply button: Triggers the data update when the user finalizes their filter selection."
                                    ],
                                    "isVisible": true,
                                    "userInteraction": {
                                        "interact": "Date range picker and order type selector inputs.",
                                        "possibleInteractions": "Selecting a date range or order type should refine the data shown in the table and graph.",
                                        "result": "Filtered data displayed in the ProductionTable and PerformanceGraph.",
                                        "resultFunctionality": "Upon selecting a filter option, the FilterPanel communicates the user's preferences to the StatisticsDashboard, which then fetches and displays the relevant data in the ProductionTable and PerformanceGraph components. This process ensures that the user has immediate access to customized data views, enhancing the utility and flexibility of the dashboard."
                                    }
                                },
                                "components": [],
                                "componentQuery": "How to create a filter panel with date range and order type selection in React using Ant Design?"
                            },
                            {
                                "componentName": "Row",
                                "componentInfo": {
                                    "componentDescription": "Organizes the layout of tables and graphs within the StatisticsDashboard.",
                                    "functionality": "The Row component is a structural element that organizes the layout of the dashboard's content. It is used in conjunction with the Col component to create a responsive grid system, allowing for the flexible placement and alignment of the ProductionTable and PerformanceGraph components. This structure ensures that the dashboard maintains a clean and organized appearance, regardless of the amount of data being displayed. The Row component is crucial for achieving a balanced layout, optimizing space utilization, and enhancing the overall aesthetic of the Statistics Overview Page. It adapts to different screen sizes, ensuring a consistent user experience across devices.",
                                    "details": [
                                        "Responsive design: Adapts to different screen sizes, maintaining layout integrity.",
                                        "Flexible placement: Allows for easy rearrangement of components within the dashboard."
                                    ],
                                    "isVisible": true,
                                    "userInteraction": {
                                        "interact": "None directly; serves as a layout mechanism.",
                                        "possibleInteractions": "Adjusts automatically based on the screen size and component content.",
                                        "result": "Consistent and responsive layout of dashboard components.",
                                        "resultFunctionality": "The Row component works seamlessly with the Col component to ensure that the layout is responsive and adaptive. It automatically adjusts the arrangement of the ProductionTable and PerformanceGraph components based on the user's screen size, ensuring that the dashboard remains accessible and visually appealing across different devices."
                                    }
                                },
                                "components": [
                                    {
                                        "componentName": "Col (ProductionTable)",
                                        "componentInfo": {
                                            "componentDescription": "Displays production statistics in a sortable and filterable table format.",
                                            "functionality": "The ProductionTable component is designed to present production statistics in a structured and accessible manner. It utilizes Ant Design's Table component to enable sorting, filtering, and searching of data, allowing users to interact with the information effectively. The table displays key metrics such as orders completed and time spent, providing a comprehensive overview of production performance. Users can sort the data by any column, apply filters to refine the dataset, and search for specific entries, making it a powerful tool for data analysis. The component is responsive, adapting to different screen sizes without sacrificing usability or clarity.",
                                            "details": [
                                                "Sortable columns: Users can sort data by any column for easier analysis.",
                                                "Filter options: Allows users to apply filters to refine the data view.",
                                                "Search functionality: Enables quick location of specific data entries."
                                            ],
                                            "isVisible": true,
                                            "userInteraction": {
                                                "interact": "Sortable columns and filter inputs.",
                                                "possibleInteractions": "Sorting, filtering, and searching within the table should update the displayed data.",
                                                "result": "A dynamically updated view of production statistics based on user interactions.",
                                                "resultFunctionality": "When a user interacts with the ProductionTable, such as by sorting a column or applying a filter, the component should dynamically update to reflect these changes. This interaction allows users to tailor the data view to their specific needs, enhancing their ability to analyze and interpret production metrics."
                                            }
                                        },
                                        "components": [],
                                        "componentQuery": "How to create a sortable and filterable table in React using Ant Design?"
                                    },
                                    {
                                        "componentName": "Col (PerformanceGraph)",
                                        "componentInfo": {
                                            "componentDescription": "Visualizes key metrics over time using a line or bar chart.",
                                            "functionality": "The PerformanceGraph component provides a visual representation of key production metrics over time, utilizing line or bar charts to illustrate trends and patterns. This component is crucial for users who prefer visual data interpretation, as it highlights significant changes and correlations within the dataset. The graph is interactive, allowing users to hover over data points for detailed information and adjust the time frame for analysis. By displaying data visually, the PerformanceGraph facilitates a deeper understanding of production performance, enabling users to identify areas for improvement and make informed decisions. The graph is responsive, ensuring accessibility across various devices.",
                                            "details": [
                                                "Interactive data points: Users can hover to view detailed information.",
                                                "Adjustable time frame: Allows users to modify the time frame for data analysis.",
                                                "Responsive design: Adapts to different screen sizes without losing clarity."
                                            ],
                                            "isVisible": true,
                                            "userInteraction": {
                                                "interact": "Graph data points and time frame controls.",
                                                "possibleInteractions": "Hovering over data points provides more information; adjusting the time frame updates the graph.",
                                                "result": "A visually updated graph reflecting user interactions and selected time frames.",
                                                "resultFunctionality": "When a user interacts with the PerformanceGraph, such as by hovering over data points or adjusting the time frame, the graph dynamically updates to present the relevant information. This interaction enhances the user's ability to explore and understand production trends, facilitating strategic decision-making based on visual data analysis."
                                            }
                                        },
                                        "components": [],
                                        "componentQuery": "How to create interactive line or bar charts in React using Ant Design?"
                                    }
                                ],
                                "componentQuery": "How to organize a dashboard layout using Ant Design's Card, Row, and Col components?"
                            }
                        ],
                        "componentQuery": "How to create a responsive and navigable layout in React using Ant Design's Layout, Menu, and Breadcrumb components?"
                    }
                ],
                "componentQuery": "How to structure an enterprise-level statistics overview page using React and Ant Design? What are the best practices for implementing dashboards in Ant Design?"
            }
        ],
        "pageUrl": "/statistics/overview"
    }
}


    
"""


    data = json.loads(json_data) 
    # Instantiate the TreeProcessor with the JSON data
    processor = TreeProcessor(data)

    # Process the tree
    processor.process()
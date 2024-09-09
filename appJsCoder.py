from mainClasses.basicClientRequest import ClientRequest

userPrompt = """

<ReactComponentCoder>
  <FilePath>
    ****File Path: src/app.js****
    <!-- Ensure this is placed at the top of your file with a valid file name. -->
  </FilePath>

  <GeneralInstructions>
    - Set up **React Router** for navigation using `react-router-dom`.
    - Implement a **drawer navigation** menu using Ant Design's components. The drawer should be responsive, collapsing on smaller screens and expandable on larger screens.
    - Use **`Routes`** for handling navigation (not `Switch`).
    - Provide **navigation links** that can easily be updated or replaced with any page, not just specific ones like Home, About, or Contact.
    - Use **Ant Design's icons** and ensure the layout is fully responsive, using `Sider` for the drawer.
    - Ensure routing works properly and there are **no missing or incorrect imports**.
  </GeneralInstructions>

  <ComponentRequirements>
    - Ensure the layout has a **persistent drawer** on the left and a **main content area** on the right.
    - Include **routes that are dynamic**, allowing new pages to be easily added.
    - The drawer should use **Ant Design icons** for visual appeal.
    - **Drawer Behavior**: The drawer should collapse on smaller screens and expand on larger screens.
    - The code should support a structure where **new pages can be added** without modifying the core layout logic.
  </ComponentRequirements>


{code}
"""


class AppJSmaker:
    def __init__(self, model, verbose, allTheCode):
        self.model = model
        self.verbose = verbose
        self.userPrompt = userPrompt.format(code = allTheCode)

    def generate(self):
        self.systemPrompt = """
        you are to generate app.js by importing the correct files and thinking carefully and routes with react router dom and setting app.js js up for react
        make sure to do correct imports as well read the code properly
        
          #### Plan
  - Set up the **router** using `react-router-dom` to handle dynamic pages.
  - Create a **drawer layout** with Ant Design, ensuring it collapses and expands properly based on screen size.
  - Ensure **dynamic page routing** so new pages can easily be added.
  - The layout should use Ant Design’s theming system to provide a modern look and feel.

  #### RequiredCode
  - Implement the following code for `app.js`:

```javascript
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined, // Use dynamic icons for visual appeal
  InfoCircleOutlined,
  MailOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css"; // Ensure the correct Ant Design theming is used

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // Dynamic routing content, can be expanded later
  const routes = [
    { path: "/", name: "Home", icon: <HomeOutlined /> },
    { path: "/about", name: "About", icon: <InfoCircleOutlined /> },
    { path: "/contact", name: "Contact", icon: <MailOutlined /> },
    // Add any additional routes as needed here
  ];

  return (
    <Router>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          breakpoint="lg"
          collapsedWidth="0"
          trigger={null}
        >
          <div className="logo" style={{ padding: "16px", textAlign: "center", color: "#fff" }}>
            {collapsed ? "Logo" : "My App"}
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            {routes.map((route, index) => (
              <Menu.Item key={index} icon={route.icon}>
                <Link to={route.path}>{route.name}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: "0 16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button type="primary" onClick={toggleCollapsed}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <div style={{ color: "#fff", fontSize: "18px" }}>My App Header</div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: 280,
            }}
          >
            <Routes>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={<h1>{route.name} Page</h1>} // Placeholder content
                />
              ))}
              {/* Add more routes as necessary */}
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;

but make sure to change the things shown in the drawer to be relavent!!!!!!
        """
        coder = ClientRequest(self.systemPrompt, self.model, self.userPrompt, True)
        generatedAppJs = coder.generate()
        return generatedAppJs
    
if __name__ == "__main__":
    with open("output.txt",'r',encoding='utf-8') as file:
        content = file.read()
        appJsMaker = AppJSmaker("gpt-4o-2024-08-06", True, content)
        generatedAppJs = appJsMaker.generate()
        
        # Write the generated app.js content to a file
        with open("app.js", "w", encoding="utf-8") as app_js_file:
            app_js_file.write(generatedAppJs)
        
        print("app.js has been generated successfully.")
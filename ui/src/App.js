import React, {
  useState
} from "react";
import {
  Layout
} from "antd";
import TopicMenu from "./components/TopicMenu";

import "./app.css";

import NavBar from "./components/NavBar/NavBar";
import SideBar from "./components/SideBar/SideBar";
import HomePage from "./pages/HomePage";


function App() {
  const pages =[<HomePage/>]
  const topics = [ 'Home'];
  const [contentIndex, setContentIndex] = useState(0);
  const [selectedKey, setSelectedKey] = useState("0");
  const changeSelectedKey = (event) => {
    const key = event.key;
    setSelectedKey(key);
    setContentIndex(+key);
  };
  const Menu = ( <
    TopicMenu topics = {
      topics
    }
    selectedKey = {
      selectedKey
    }
    changeSelectedKey = {
      changeSelectedKey
    }
    />
  );
  return ( <>
    <div className = "App" >
    <NavBar menu = { Menu}/>
     <Layout >
    <SideBar menu = { Menu}/>
     <Layout.Content className = "content" > 
     {pages[contentIndex]} 
     </Layout.Content>
      </Layout>
    </div>
    </>
  );
}

export default App;
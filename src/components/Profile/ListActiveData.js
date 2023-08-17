import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Input,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function TabComponent({ visiblePost }) {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );
  const [tabs, setTabs] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [editingTab, setEditingTab] = useState(null);
  const [editedTabName, setEditedTabName] = useState("");

  useEffect(() => {
    if (currentUser.lists) {
      setTabs(Object.keys(currentUser.lists));
    }
  }, [currentUser]);

  const handleTabChange = (event, newValue) => {
    // console.log(currentUser.lists, newValue, tabs[newValue]);
    visiblePost(currentUser.lists[tabs[newValue]])
    setCurrentTab(newValue);
  };

  const handleAddTab = () => {
    const newTabName = `Tab ${tabs.length + 1}`;
    setTabs([...tabs, newTabName]);
    setCurrentTab(tabs.length);
    updateLists(newTabName, []);
  };

  const handleDeleteTab = (tabName) => {
    const updatedTabs = tabs.filter((tab) => tab !== tabName);
    setTabs(updatedTabs);
    setCurrentTab(Math.min(currentTab, updatedTabs.length - 1));

    // Update user data and local storage
    const updatedLists = { ...currentUser.lists };
    delete updatedLists[tabName];
    setCurrentUser((prevUser) => ({
      ...prevUser,
      lists: updatedLists,
    }));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  };

  const handleSaveTabName = () => {
    if (editingTab) {
      const updatedTabs = tabs.map((tab) =>
        tab === editingTab ? editedTabName : tab
      );
      setTabs(updatedTabs);
      setEditingTab(null);

      // Update user data and local storage
      const updatedLists = { ...currentUser.lists };
      updatedLists[editedTabName] = updatedLists[editingTab];
      delete updatedLists[editingTab];
      setCurrentUser((prevUser) => ({
        ...prevUser,
        lists: updatedLists,
      }));
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
  };

  const handleEditTab = (tabName) => {
    const tabToEdit = tabs.find((tab) => tab === tabName);
    setEditingTab(tabToEdit);
    setEditedTabName(tabToEdit);
  };

  const handleShareTab = (tabName) => {
    // Add your share functionality here
    alert(`Share ${tabName} functionality`);
  };

  const updateLists = (tabName, value) => {
    // const updatedLists = { ...currentUser.lists, [tabName]: value };
    // Assuming you have a function to update currentUser in your app's state
    // updateCurrentUser({ ...currentUser, lists: updatedLists });
    const updatedLists = { ...currentUser.lists, [tabName]: value };
    // Assuming you have a function to update currentUser in your app's state
    // updateCurrentUser({ ...currentUser, lists: updatedLists });
    setCurrentUser({ ...currentUser, lists: updatedLists });
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  };

  return (
    <div>
      <AppBar position="static">
        <Tabs value={currentTab} onChange={handleTabChange}>
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab} />
          ))}
          <IconButton onClick={handleAddTab} color="inherit">
            <AddIcon />
          </IconButton>
        </Tabs>
      </AppBar>
      {tabs.map((tabName, index) => (
        <TabPanel key={index} value={currentTab} index={index}>
          <div>
            {editingTab === tabName ? (
              <div>
                <Input
                  value={editedTabName}
                  onChange={(e) => setEditedTabName(e.target.value)}
                />
                <IconButton onClick={handleSaveTabName}>
                  <DoneIcon />
                </IconButton>
              </div>
            ) : (
              <Typography variant="h6">
                {tabName}
                <IconButton onClick={() => handleEditTab(tabName)}>
                  <EditIcon />
                </IconButton>
              </Typography>
            )}
          </div>
          {/* Rest of the tab content */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleShareTab(tabName)}
            startIcon={<ShareIcon />}
          >
            Share
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDeleteTab(tabName)}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </TabPanel>
      ))}
    </div>
  );
}

export default TabComponent;

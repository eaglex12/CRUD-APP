import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import api from '../api/contacts';
import "./App.css";
import { v4 as uuidv4 }  from  "uuid";
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import ContactDetail from "./ContactDetail"; 
import EditContact from "./EditContact";
import { ContactsCrudContextProvider } from "../context/ContactsCrudContext";



function App() {
 return (
    <div className="ui container">
      <Router>
       <Header />
       <ContactsCrudContextProvider>
       <Routes>
      <Route 
       path="/" 
       exact
       element ={<ContactList/>}
       
            
        //     render= { (props) => (
        //      <ContactList
        //         {...props} 
        //         contacts={contacts} 
        //         getContactId={removeContactHandler} 
        //      />
        //  )}
     />
            
            
            <Route 
            path="/add" 
            element ={<AddContact/>}
           
          //  render={(props)=>(
          //   <AddContact
          //   {...props}
          //   addContactHandler={addContactHandler}
          //   />

        // )}
  
  />
          <Route
            path="/edit"
            element = {<EditContact />}
            />
          

          <Route path="/contact/:id" element={<ContactDetail/>} />
 
      </Routes>
      </ContactsCrudContextProvider>
      
       
      </Router>
    </div>
  );
}

export default App;

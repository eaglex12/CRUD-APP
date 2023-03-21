import { createContext,useContext ,useState} from "react";
import React  from 'react';
import { v4 as uuidv4 }  from  "uuid";

import api from '../api/contacts';


const contactsCrudContext =createContext();

export function ContactsCrudContextProvider ({children}){
     const [contacts, setContacts]= useState([]);
     const [searchResults, setSearchResults] = useState([]);
     const [searchTerm, setSearchTerm]= useState("");
     //retrieve contact
     const retrieveContacts = async () => {
        const response = await api.get("/contacts");
        if(response.data) setContacts(response.data);
       
      };
      //delete contact
      const removeContactHandler = async(id) => {
        await api.delete(`/contacts/${id}`);
         const newContactList = contacts.filter((contact) => {
          return contact.id !== id;
        });
    
        setContacts(newContactList);
      };  
      //Add contact
      const addContactHandler=async(contact)=> {
        console.log(contact);
        const request ={
          id: uuidv4(),
          ...contact
        };
        const response= await api.post("/contacts", request)
        setContacts([...contacts, response.data]);
      };
      //update contacts
      const updateContactHandler = async (contact) => {
        const response = await api.put(`/contacts/${contact.id}`, contact);
        const { id } = response.data;
        setContacts(
          contacts.map((contact) => {
            return contact.id === id ? { ...response.data } : contact;
          })
        );
      };
      //search
      const searchHandler = (searchTerm) => {
        setSearchTerm(searchTerm);
        if (searchTerm !== "") {
          const newContactList = contacts.filter((contact) => {
            return Object.values(contact)
              .join(" ")
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          });
          setSearchResults(newContactList);
        } else {
          setSearchResults(contacts);
        }
      };
    
    const value ={
        
        contacts,
        searchTerm,
        searchResults,
        searchHandler,
        retrieveContacts,
        removeContactHandler,
        addContactHandler,
        updateContactHandler
    }

    return < contactsCrudContext.Provider value={ value}>
                 {children}
    </contactsCrudContext.Provider>
}
export function useContactsCrud() {

    return useContext(contactsCrudContext);
}
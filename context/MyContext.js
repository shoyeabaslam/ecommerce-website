import React, { createContext, useState } from "react";

export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [emailId, setEmailId] = useState("");
  const [nameEntry, setNameEnter] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [apartmentAddress, setApartmentAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("India");
  const [specialInstruction, setSpecialInstruction] = useState("");
  const [buyNowDetails,setBuyNowDetails] = useState({});
  

  return (
    <MyContext.Provider value={{emailId,setEmailId,nameEntry,setNameEnter,phoneNumber, setPhoneNumber,streetAddress, setStreetAddress,apartmentAddress, setApartmentAddress,pincode, setPincode,city, setCity,state, setState,specialInstruction, setSpecialInstruction,country,setCountry,buyNowDetails,setBuyNowDetails}}>
      {children}
    </MyContext.Provider>
  );
};

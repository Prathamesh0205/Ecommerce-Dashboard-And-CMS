"use client"

import { useStoreModalCharacter } from "@/hooks/character-modal";

import { useStoreModal } from "@/hooks/use-store-modal";



import { useEffect } from "react";



export default function SetupPage() {

const {isOpen,onClose,onOpen}=useStoreModal((state)=>state);
const {setRequired}=useStoreModalCharacter((state)=>state)



useEffect(()=>{
  
 
  if(!isOpen ){
   
    setRequired();
    onOpen();

  }


},[isOpen,onOpen])


  return null;
}

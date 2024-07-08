"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "../ui/modal";
import * as z from "zod";

import { Button } from "../ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useStoreModalCharacter } from "@/hooks/character-modal";
import { useTransition } from "react";
import axios from "axios"
import { toast } from "sonner";
import {  useRouter} from "next/navigation";



const formSchema=z.object({
    name:z.string().min(1),
})
export const StoreModal=()=>{
    const router=useRouter()

    const {isOpen,onClose}=useStoreModal((state)=>state);
    const {Message,content}=useStoreModalCharacter((state)=>state)
    const [isPending,startTranstion]=useTransition()

    const [name,setName]=useState("");

        const handleClose=()=>{

        setName("")
        onClose();
    }
    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();

      
         startTranstion(async()=>{
            try {
              const response=  await axios.post("/api/stores",{name:name})
              window.location.assign(`/${response.data.id}`)
                    
              toast.success("Store created");
            } catch (error) {
                toast.error("Something went wrong")
            }
            
          
            
           

           
 
        })
          

        
       
      if(!name )
        {
           Message();
        }
   
    

    }
    

    return (
        <>
    <Modal title="Create Store" description="Add a new Store to manage products and categories"
     isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit}>
        <div className={cn("flex flex-col",!name?"gap-y-2":"gap-y-4")}>
            <label className={cn("font-semibold",!name?"text-red-600":"text-black")}>Name</label>
            <input disabled={isPending} type="text" name="Ecommerce" value={name} placeholder="E-commerce" className="rounded border font-semibold  h-10 pl-4" onChange={(e)=>{setName(e.target.value)}}></input>
            {!name&&(
                <label className="text-red-600 font-semibold">{content}</label>
            )}
        <div className="flex flex-row justify-end gap-x-2">
            <Button disabled={isPending }variant="outline" type="button" onClick={handleClose}>
               Cancel
            </Button>
            <Button disabled={isPending} type="submit">
               Continue
            </Button>
        </div>
        </div>

    </form>
    </Modal>
  
    </>
   
    )

}
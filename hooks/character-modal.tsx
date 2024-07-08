
import {create} from "zustand"

export enum formVariant{
    Required="Required",
    Message="Name must contains at least 1 character"

}

interface useStoreModalCharacter{
    content:formVariant;
    Message:()=>void;
    setRequired:()=>void;


}

export const useStoreModalCharacter=create<useStoreModalCharacter>(
    (set)=>({
     Message:()=>set({content:formVariant.Message}),
     content:formVariant.Required,
     setRequired:()=>set({content:formVariant.Required})
    })
)
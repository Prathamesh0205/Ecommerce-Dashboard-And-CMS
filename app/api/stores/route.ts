"use server"
import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";


export async function POST(req:Request){
    try {
        const {userId}=auth(); //user id from clerk
        const  body=await req.json();
        const name=body.name as string;
    
       
    
        if(!userId){
            return new NextResponse("Unauthorized",{status:401});
        }
        if(!name)
        {
            return new NextResponse("Name is Required",{status:404});
        }
    
        // const isExist=await prismadb.store.findUnique({
        //     where:{
        //         name
        //     }
        // })
    
        //     if(isExist)
        //     {
        //         return new NextResponse("Store name already exist",{status:404});
        //     }
    
        const store=await prismadb.store.create({
            data:{
                name,
                userId
            }
        })


        
        return  NextResponse.json(store);
    } catch (error) {
        console.log(error)
    }

     

}
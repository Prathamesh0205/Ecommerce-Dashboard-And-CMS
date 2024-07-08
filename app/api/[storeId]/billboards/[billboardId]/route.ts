"use server"
import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";


export async function PATCH(req:Request,{params}:{params:{storeId:string,billboardId:string}}){
    try {
        const {userId}=auth(); //user id from clerk
        const  body=await req.json();
        const label=body.label as string;
        const imageUrl=body.imageUrl as string;
       
    
        if(!userId){
            return new NextResponse("Unauthenticated",{status:401});
        }
        if(!label)
        {
            return new NextResponse("label is Required",{status:400});
        }
         
        if(!imageUrl)
            {
                return new NextResponse("image URL is Required",{status:400});
            }
        if(!params.billboardId)
            {
                return new NextResponse("billboard id is Required",{status:400});

            }

          const storeByUserId=await prismadb.store.findFirst({
            where:{
                id:params.storeId,
                userId
            }
          })

          if(!storeByUserId)
            {
                return new NextResponse("Unauthorized",{status:403});
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
    
        const billboard=await prismadb.billboard.updateMany({
            where:{
                id:params.billboardId,
            },
            data:{
                label,
                imageUrl,
            }
        })


        
        return  NextResponse.json(billboard);
    } catch (error) {
        console.log("[BILLBOARD_PATCH]",error);
        return new NextResponse("Internal error",{status:500})
    }

     

}


export async function DELETE(req:Request,{params}:{params:{storeId:string,billboardId:string}}){
    try {
        const {userId}=auth(); //user id from clerk
        const  body=await req.json();
        const label=body.label as string;
        const imageUrl=body.imageUrl as string;
       
    
        if(!userId){
            return new NextResponse("Unauthenticated",{status:401});
        }
        if(!label)
        {
            return new NextResponse("label is Required",{status:400});
        }
         
        if(!imageUrl)
            {
                return new NextResponse("image URL is Required",{status:400});
            }
        if(!params.billboardId)
            {
                return new NextResponse("billboard id is Required",{status:400});

            }

          const storeByUserId=await prismadb.store.findFirst({
            where:{
                id:params.storeId,
                userId
            }
          })

          if(!storeByUserId)
            {
                return new NextResponse("Unauthorized",{status:403});
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
    
        const billboard=await prismadb.billboard.deleteMany({
            where:{
                id:params.billboardId,
            },
            
        })


        
        return  NextResponse.json(billboard);
    } catch (error) {
        console.log("[BILLBOARD_DELETE]",error);
        return new NextResponse("Internal error",{status:500})
    }

     

}


export async function GET(req:Request,{params}:{params:{billboardId:string}}){
    try {
        if(!params.billboardId)
            {
                return new NextResponse("billboard id is Required",{status:400});

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
    
        const billboard=await prismadb.billboard.findUnique({
            where:{
                id:params.billboardId,
            },
            
        })


        
        return  NextResponse.json(billboard);
    } catch (error) {
        console.log("[BILLBOARD_GET]",error);
        return new NextResponse("Internal error",{status:500})
    }

     

}
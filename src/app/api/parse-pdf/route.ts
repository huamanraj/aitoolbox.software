import {NextResponse} from 'next/server';
import  pdf from "pdf-parse";

export const config={
    api:{
        bodyParser: false,
    },
};
export async function POST(request: Request){
    //const pdf=require("pdf-parse");
    try{
        // 1. Parse the FormData from the Request object
        const formData= await request.formData();
        const file= formData.get('pdfFile') as File | null;

        if(!file){
            return NextResponse.json({error: 'No PDF file uploaded.'}, {status: 400});
        }
        // if(file.size>10 *1024*1024){
        //     return NextResponse.json({error: 'File size exceeds 10MB limit.'}, {status: 413});
        // }
        //2. Convert File to ArrayBuffer/Buffer for pdf-parse
        const arrayBuffer= await file.arrayBuffer();
        const buffer= Buffer.from(arrayBuffer);

        //3. Extract Text using pdf-parse
        const data= await pdf(buffer);
        const extractedText = data.text.trim();

        if(!extractedText){
            return NextResponse.json({error: 'Could not extract any text from the PDF.'}, {status: 422});
        }
        // 4. Return the extracted text
        return NextResponse.json({text: extractedText},{status: 200});
        // return NextResponse.json({ 
        //     text: `[SUCCESS] Received file named: ${file.name} (Size: ${file.size} bytes). PDF parsing logic is currently bypassed.` 
        // }, { status: 200 });
    } catch(error: any){
        console.error('PDF Parsing Error:', error);
        
        return NextResponse.json({error: `Server-side PDF parsing failed: ${error.message}`}, {status: 500});
    }
}
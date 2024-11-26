import Image from "next/image";



export default function Spinner(){
    return(
        <div className="flex items-center justify-center gap-2">
            Processing
            <Image src='assets/spinner.svg' height={50} width={25} alt="spinner" className=" animate-spin dark:filter dark:invert"/> 
        </div>
    )
}
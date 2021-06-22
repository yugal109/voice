import React,{useEffect} from "react"

function CanOrNot(storageName,path,history){

    useEffect(()=>{
        if(storageName){
          history.push(path)
        }
      },[storageName,path,history])

}
export default CanOrNot;
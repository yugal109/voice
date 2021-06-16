import React,{useEffect} from "react"

function CanOrNot(storageName,path,history){

    useEffect(()=>{
        if(storageName){
          history.push(path)
        }
      },[storageName])

}
export default CanOrNot;
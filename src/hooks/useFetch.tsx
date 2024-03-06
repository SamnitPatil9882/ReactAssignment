import { useEffect, useState } from "react"
import CardInfo from "../dto/model"

const useFetch=(url: string)=>{
    const [data,setData] = useState<CardInfo[]>([])

    useEffect(()=>{
        fetch(url)
     .then(res=>res.json())
     .then(data=>{
        setData(data)
     })
    },[url])

    return [data,setData] as [CardInfo[],React.Dispatch<React.SetStateAction<CardInfo[]>>]
    // return [data,setData]!
    // return data
}

export default useFetch;
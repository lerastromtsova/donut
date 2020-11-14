import React, {useEffect, useState} from "react";

import API from "../utils/api";

function SuccessPage() {
    const [imageUrl, setImageUrl] = useState("")
    useEffect(() => {
        API.get("http://api.giphy.com/v1/gifs/random?tag=funny+cat&rating=g&api_key=dc6zaTOxFJmzC&limit=1")
            .then(response => {
                setImageUrl(response.data.data.image_url);
                console.log(response.data);
            })
            .catch(ex => {
                console.log(ex)
            });
        }
        , [])
    return (<img src={imageUrl}/>)
}

export default SuccessPage

import axios from "axios"
import { useEffect, useState } from "react"

type ImageDisplayProps = {
    roomId: string | undefined
}

export type Image = {
    data: string
    name: string
    size: string
}

export const ImageDisplay = ({roomId}: ImageDisplayProps) => {
const [image, setImage] = useState<Image>()

    useEffect(() => {
        getImage()
    })

    const getImage = async () => {
        const {data} = await axios.get(`file/?type=image&roomId=${roomId}`)
        setImage(data)
    }

    return <>
        {image ? (
            <img src={`data:image/png;base64,${image.data}`} alt={image.name} />
        ) : (
           <p>No image available</p>
        )}
    </>
}
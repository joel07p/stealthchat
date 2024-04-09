import axios, { AxiosError } from "axios"
import { toast } from "sonner"

export const handleRequestError = (error: unknown) => {
    if(axios.isAxiosError(error)) {
        const axiosError: AxiosError = error

        toast(axiosError.name, {
            description: axiosError.message,
            action: {
              label: "Undo",
              onClick: () => console.log("Close"),
            },
          })
    }
}
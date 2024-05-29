type CodeAttachmentType = {
    code: string
}

export const CodeAttachment = ({ code }: CodeAttachmentType) => {
    return <>
        {code}
    </>
}
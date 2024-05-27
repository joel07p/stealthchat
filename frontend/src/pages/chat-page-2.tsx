import { Mail } from "./components/mail"
import { accounts, mails } from "./data"

export default function MailPage() {
  return (
    <>
      <div className="hidden flex-col md:flex">
        <Mail
          accounts={accounts}
          mails={mails}
          defaultLayout={undefined}
          defaultCollapsed={false}
          navCollapsedSize={4}
        />
      </div>
    </>
  )
}

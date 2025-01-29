import { format } from "date-fns"
import { enUS } from "date-fns/locale"
import { MdOutlineDateRange } from "react-icons/md"

interface DateSelectorProps {
  date: Date 
  setDate: () => void
}

export const DateSelector = ({date, setDate }: DateSelectorProps) => {
  return (
    <div>
      <button
        className="inline-flex items-center gap-2 text-[13px] font-medium text-purple-600 bg-purple-200/40 hover:bg-purple-200/70 rounded px-2 py-1 cursor-pointer"
        onClick={() => {}}
      >
        <MdOutlineDateRange className="text-lg" />
        {format(date || " ", 'do MMM yyyy', {locale: enUS})}
      </button>

      

    </div>
  )
}

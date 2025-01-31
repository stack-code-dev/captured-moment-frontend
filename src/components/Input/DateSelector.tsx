import { format } from "date-fns"
import { enUS } from "date-fns/locale"
import { DayPicker } from "react-day-picker"
import { MdClose, MdOutlineDateRange } from "react-icons/md"
import "react-day-picker/style.css";
import { Dispatch, SetStateAction, useState } from "react";

interface DateSelectorProps {
  date: Date 
  setDate: Dispatch<SetStateAction<Date>>
}

export const DateSelector = ({date, setDate }: DateSelectorProps) => {
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false)

  return (
    <div>
      <button
        className="inline-flex items-center gap-2 text-[13px] font-medium text-purple-600 bg-purple-200/40 hover:bg-purple-200/70 rounded px-2 py-1 cursor-pointer"
        onClick={() => {
          setOpenDatePicker(true)
        }}
      >
        <MdOutlineDateRange className="text-lg" />
        {format(date || new Date(), 'do MMM yyyy', {locale: enUS})}
      </button>

      {openDatePicker && 
        <div className="overflow-y-scroll p-5 bg-purple-50/80 rounded-lg relative pt-9">
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center bg-purple-100 hover:bg-purple-100 absolute top-2 right-2"
            onClick={() => {setOpenDatePicker(false)}}
          >
            <MdClose className="text-xl text-purple-600" />
          </button>

          <DayPicker 
            required
            captionLayout="dropdown-years"
            mode="single"
            selected={date}
            onSelect={setDate}
            pagedNavigation
          />
        </div>
      }
    </div>
  )
}

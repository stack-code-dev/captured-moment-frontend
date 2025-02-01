import { DateRange, DayPicker } from "react-day-picker"

interface DateFilterProps {
  dateRage: DateRange | undefined
  onHandleDaySelected: (newSelected: DateRange | undefined) => void
}

export const DateFilter = ({ dateRage, onHandleDaySelected }: DateFilterProps) => {
  return (
    <aside className="w-[320px]">
      
      <div className="bg-white border border-slate-200 shadow-lg shadow-slate-200/60 rounded-lg p-3">
        <DayPicker
          required
          captionLayout="dropdown-years"
          mode="range"
          selected={dateRage}
          onSelect={onHandleDaySelected}
          pagedNavigation
        />
      </div>
    </aside>
  )
}

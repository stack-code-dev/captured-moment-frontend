import { MdAdd, MdClose } from "react-icons/md"
import { DateSelector } from "../../components/Input/DateSelector"
import { useState } from "react"
import { ImageSelector } from "../../components/Input/ImageSelector"

export const AddEditTravelMoment = () => {
  const [visitedDate, setVisitedDate] = useState<Date>(new Date('2025-01-21T02:46:19.183Z'))
  const [image, setImage] = useState<File | string | null>("")

  return (
    <section className="relative">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-slate-700">
          Add Moment
        </h2>

        <div>
          <div className="flex items-center gap-3 bg-violet-50/50 p-2 rounded-l-lg">
            <button className="btn-small" onClick={() => {}}>
              <MdAdd /> ADD MOMENT
            </button>

            <button className="" onClick={() => {}}>
              <MdClose className="text-sl text-slate-400" />
            </button>
          </div>
        </div>
      </header>


      <main>
        <div className="flex-1 flex flex-col gap-2 pt-4">
          <label className="input-label">TITLE</label>
          <input 
            type="text" 
            className="text-2xl text-slate-950 outline-none"
            placeholder="Write your memory here"
            onChange={() => {}}
          />

          <div className="my-3">
            <DateSelector 
              date={visitedDate}
              setDate={setVisitedDate}
            />
          </div>

          <ImageSelector
            image={image}
            setImage={setImage}
          />

          <div className="flex flex-col gap-2 mt-4">
            <label className="input-label">MOMENT</label>
            <textarea 
              className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
              placeholder="Your Moment"
              rows={10}
              onChange={() => {}}
            />
          </div>

          <div className="pt-3">
            <label>VISITED LOCATIONS</label>
          </div>
        </div>
      </main>
    </section>
  )
}

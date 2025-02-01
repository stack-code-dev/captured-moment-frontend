import { Dispatch, SetStateAction, useState } from "react"
import { GrMapLocation } from "react-icons/gr"
import { MdAdd, MdClose } from "react-icons/md"

interface TagInputProos {
  tags: string[]
  setTag: Dispatch<SetStateAction<string[]>>
}

export const TagInput = ({tags, setTag}: TagInputProos) => {
  const [inputValue, setinputValue] = useState<string>("")

  const addNewTag = () => {
    const value = inputValue.trim()

    if(value !== ""){
      setTag([...tags, value])
      setinputValue("")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      addNewTag()
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTag(tags.filter((tag) => tag !== tagToRemove))
  }
 
  return (
    <div>
      
      {tags.length > 0 &&
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className='flex items-center gap-2 text-violet-600 bg-violet-200/40 px-3 py-1 rounded'
            >
              <GrMapLocation className="text-sm" /> {tag}
              <button onClick={() => handleRemoveTag(tag)}>
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      }
      <div className="flex items-center gap-4 mt-3">
        <input 
          type="text" 
          value={inputValue}
          onChange={handleInputChange}
          className='text-sm bg-transparent border px-3 py-2 rounded outline-none'
          placeholder="Add Location"
          onKeyDown={handleKeyDown}
        />

        <button 
          className='w-8 h-8 flex items-center justify-center rounded border border-violet-500 hover:bg-violet-500'
          onClick={addNewTag}
        >
          <MdAdd className="text-2xl text-purple-500 hover:text-white" />
        </button>
      </div>
    </div>
  )
}

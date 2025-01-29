import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { FaHeart } from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";

interface CapturedMomentCardProps {
  imageUrl: string
  title: string
  story: string
  date: string
  visitedLocation: string[]
  isFavorite: boolean
  onFavoriteClick: () => Promise<void>
}

export const CapturedMomentCard = ({
  imageUrl,
  title,
  story,
  date,
  visitedLocation,
  isFavorite,
  onFavoriteClick
}: CapturedMomentCardProps) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)

    return format(date, 'do MMM yyyy', {locale: enUS})
  }

  return (
    <article
    className="border rounded-lg overflow-hidden bg-white hover:shadow-lg hover:shadow-slate-200 transition-all ease-in-out relative cursor-pointer"
  >
    <img 
      src={imageUrl} 
      alt={title} 
      className="w-full h-56 object-cover rounded-lg"
      onClick={() => {}}
    />

    <button
      className="w-12 h-12 flex items-center justify-center bg-white/40 rounded-lg border-white/30 absolute top-4 right-4"
      onClick={onFavoriteClick}
    >
      <FaHeart 
        className={`icon-btn ${isFavorite ? 'text-red-500' : 'text-white'}`}
      />
    </button>

    <div className="p-4">
      <header className="flex items-center gap-3">
        <div className="flex-1">
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-xs text-slate-500">
            {formatDate(date)}
          </span>
        </div>
      </header>

      <p className="text-xs text-slate-600 mt-2">{story.slice(0, 60)}</p>

      <div className="inline-flex items-center gap-2 text-[13px] text-violet-600 bg-violet-200/40 rounded mt-3 px-2 py-1">
        <GrMapLocation />
        {visitedLocation.map((item, idx) => (
          visitedLocation.length == idx + 1 ? `${item}` : `${item}, `
        ))}
      </div>
    </div>
  </article>
  )
}


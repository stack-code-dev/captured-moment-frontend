import { useEffect, useState } from "react";
import { axiosInstance } from "../../api/axiosInstance";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navabar } from "../../components/Navabar";
import { CapturedMomentCard } from "../../components/Card/CapturedMomentCard";
import { ToastContainer, toast } from 'react-toastify';
import { MdAdd } from 'react-icons/md'
import Modal from 'react-modal';
import { AddEditTravelMoment } from "./AddEditTravelMoment";
import { ViewTravelMoment } from "./ViewTravelMoment";
import { DateFilter } from "../../components/DateFilter";
import { DateRange } from "react-day-picker";
import { EmptyCard } from "../../components/Card/EmptyCard";
import EmptyImg from '../../assets/empty-memories.svg'

interface MomentsProps {
  id: string
  imageUrl: string
  isFavorite: boolean
  story: string
  title: string
  userId: string
  visitedDate: string
  visitedLocation: string[]
}

interface UserInfoProps {
  created_at: string
  email: string
  fullName: string
  id: string
  password: string
  uptaded_at: string
}

interface ModalProps {
  isShow: boolean
  type: string
  data: MomentsProps | null
}

export const Home = () => {
  const [userInfo, setUserInfo] = useState<UserInfoProps | null>(null)
  const [allMoments, setAllMoments] = useState<MomentsProps[]>([])
  const [dateRage, setDateRage] = useState<DateRange | undefined>()
  const [openAddEditModal, setOpenAddEditModal] = useState<ModalProps>({
    isShow: false,
    type: 'add',
    data: null
  })

  const [openViewModal, setOpenViewModal] = useState<ModalProps>({
    isShow: false,
    type: 'view',
    data: null
  })
  
  const navigate = useNavigate();

  // Busca das informações de usuário
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get('/get-user')
      if(response.data && response.data.user) {
        setUserInfo(response.data.user)
      }
    } catch (error){
      if(axios.isAxiosError(error)) {
        if(error.response?.status === 401) {
          localStorage.clear()
          navigate("/login")
        }
      }
    }
  }

  // Pegar momentos registrados do usuário
  const getAllCapturedMoments = async () => {
    try {
      const response = await axiosInstance.get('get-all-moments');

      if(response.data.memories) {
        setAllMoments(response.data.memories)
      }
    } catch (error){
      console.log("An unexpected error occurred. Please try again.", error)
    }
  }

  // Função de deeleção de um momento
  const handleDeleteCapturedMoment = async (data: MomentsProps | null) => {
    const momentId = data?.id

    try {
      const response = await axiosInstance.delete(`/delete-moment/${momentId}`)

      if(response.data) {
        toast.success('Moment Deleted Successfuly');
        setOpenViewModal((prevState) => ({...prevState, isShow: false}))
        getAllCapturedMoments()
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.", error)
    }
  }

  // Filtro de momentos capturados por dia
  const filterMomentsByDate = async (newSelected: DateRange | undefined) => {
    try{
      const startDate = newSelected?.from ? new Date(newSelected?.from).getTime() : null
      const endDate = newSelected?.to ? new Date(newSelected?.to).getTime() : null

      if(startDate && endDate) {
        const response = await axiosInstance.get('registered-moment/filter', {
          params: { startDate, endDate }
        })

        if(response.data.moment) {
          setAllMoments(response.data.moment)
        }
      }
    } catch (error) {
      if(axios.isAxiosError(error)) {
        if(error.response && error.response.data && error.response.data.message) {
          console.log(error.response.data.message)
        }
      }
    }
  }

  const handleDaySelected = (newSelected: DateRange | undefined) => {
    setDateRage(newSelected)
    filterMomentsByDate(newSelected)
  }

  const handleViewStory = (moment: MomentsProps) => {
    setOpenViewModal({ isShow: true, type: 'view', data: moment })
  }

  const updateIsFavorite = async (moment: MomentsProps) => {
    try {
      const response = await axiosInstance.put(`/update-is-favorite/${moment.id}`, {
        isFavorite: !moment.isFavorite
      })

      if(response.data.moment) {
        toast.success('Moment Updated Successfuly')
        getAllCapturedMoments();
      }

    } catch (error) {
      if(axios.isAxiosError(error)) {
        if(error.response && error.response.data && error.response.data.message) {
          console.log(error.response.data.message)
        }
      }
    }
  }

  useEffect(() => {
    getUserInfo()
    getAllCapturedMoments()
  },[])

  return (
    <>
      <Navabar userInfo={userInfo} />
    
      <main className="container mx-auto py-10">
        <div className="flex gap-7">
          <section className="flex-1">
            {allMoments.length > 0 ? 
              <div className="grid grid-cols-2 gap-4">
                {/* CARD - MOMENT */}
                {allMoments.map((moment) => (
                  <CapturedMomentCard 
                    key={moment.id}
                    imageUrl={moment.imageUrl}
                    title={moment.title}
                    story={moment.story}
                    date={moment.visitedDate}
                    visitedLocation={moment.visitedLocation}
                    isFavorite={moment.isFavorite}
                    onHandleViewStory={() => handleViewStory(moment)}
                    onFavoriteClick={() => updateIsFavorite(moment)}
                  />
                ))}
              </div>
              :
              <EmptyCard 
                imgSrc={EmptyImg}
                message="Begin your first Travel Story! Click the 'Add' button to capture your thoughts, ideas, and memories. Let`s get started!"
              />
            }
          </section>

          <DateFilter dateRage={dateRage} onHandleDaySelected={handleDaySelected} />
        </div>
      </main>

      {/* Add & Edit Captured Moment */}
      <Modal
        isOpen={openAddEditModal.isShow}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 999,
          }
        }}
        ariaHideApp={false}
        className="model-box"
      >
        <AddEditTravelMoment 
          type={openAddEditModal.type}
          momentInfo={openViewModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShow: false, type: 'add', data: null })
          }}
          getAllMoments={() => getAllCapturedMoments()}
        />
      </Modal>


      {/* View Captured Moment */}
      <Modal
        isOpen={openViewModal.isShow}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 999,
          }
        }}
        ariaHideApp={false}
        className="model-box"
      >
        <ViewTravelMoment 
          momentInfo={openViewModal.data}
          onClose={()=>{
            setOpenViewModal((prevState) => ({...prevState, isShow: false}))
          }}
          onEditClick={() => {
            setOpenViewModal((prevState) => ({...prevState, isShow: false}))
            setOpenAddEditModal((prevState) => ({...prevState, isShow: true, type: 'edit'}))
          }}
          onDeleteClick ={() => handleDeleteCapturedMoment(openViewModal.data)}
        />
      </Modal>

      <button 
        className="w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-violet-400 fixed right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShow: true, type: 'add', data: null })
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <ToastContainer />
    </>
  );
}


import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/16/solid"
import { useActivity } from "../hooks/useActivity"

export default function ActivityList() {

  const {state,dispatch, categoryName} =useActivity()

  return (
    <>
      <div className="space-y-4 bg-slate-300 shadow p-3">
        {state.activities.map(activity => (
          <div key={activity.id} className="px-2 py-3 pl-5 pr-5 bg-white shadow-1xl mt-1 rounded-lg flex justify-between">
            <div className="space-y-6 relative">
              <p className={`absolute -top-3 -left-8 px-10 py-2 uppercase font-bold rounded-br-lg rounded-tl-lg ${activity.category === 1 ? 'bg-lime-500 text-slate-800 ' : 'bg-orange-500 text-slate-100'}`}>
                {categoryName(+activity.category)}
              </p>
              <p className="text-1xl font-bold pt-2">{activity.name}</p>
              <p className="font-black text-2xl text-lime-500">
                {activity.calories} {''}
                <span>Calorias</span>
              </p>
            </div>
            <div className="flex gap-5 items-center">
              <button onClick={() => dispatch({type:'setActiveId', payload:{id: activity.id}})}>
                <PencilSquareIcon className="h-8 w-8 text-slate-600"/>             
              </button>
              <button onClick={() => dispatch({type:'delete', payload:{id: activity.id}})}>
                <XCircleIcon className="h-8 w-8 text-red-500"/>             
              </button>
            </div>
          </div>
        ))}
      </div>
      
    </>
  )
}

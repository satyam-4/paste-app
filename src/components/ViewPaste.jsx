import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

const ViewPaste = () => {

  const { id } = useParams();
  
  const pastes = useSelector((state) => state.paste.pastes);

  const paste = pastes.find((p) => {
    return p._id === id;
  })

  return (
    <div className="mt-5 flex flex-col items-center h-fit">
        <div className='w-[75%] flex justify-between items-center'>
            <input 
            readOnly
            value={paste.title}
            type="text" 
            placeholder="Title"
            className='bg-gray-200 border border-gray-400 pl-5 p-2 w-[80%] rounded-md placeholder:text-gray-500'
            />
        </div>
        <div className='bg-[#343333] w-[75%] mt-3 p-3 rounded-md overflow-hidden'>
            <div className='w-full h-5 pl-2 mb-2 flex gap-2 items-center'>
                <div className='bg-red-500 w-[15px] h-[15px] rounded-full'></div>
                <div className='bg-yellow-500 w-[15px] h-[15px] rounded-full'></div>
                <div className='bg-green-500 w-[15px] h-[15px] rounded-full'></div>
            </div>
            <textarea 
            readOnly
            value={paste.content}
            placeholder="Write Your Content Here....."
            rows={20}
            className='bg-[#e7e7e7] resize-none w-[100%] p-4 rounded-md outline-none  scrollbar-thumb-gray-500 scrollbar-track-transparent scrollbar-thin'
            >
            </textarea>
        </div>
    </div>
  )
}

export default ViewPaste
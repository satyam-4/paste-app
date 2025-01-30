import { useDispatch, useSelector } from 'react-redux'
import React, { useState } from 'react'
import { removeFromPastes } from '../redux/PasteSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Pencil, Share } from 'lucide-react';
import { Eye } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { Copy } from 'lucide-react';
import { Share2 } from 'lucide-react';
import { Calendar } from 'lucide-react';
import ModalShare from './ModalShare';

const Pastes = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pastes = useSelector((state) => state.paste.pastes);  // jo pastes stored hai store me unhe access kiya

  const [searchQuery, setSearchQuery] = useState('');
  const [share, setShare] = useState(null);

  const filteredPastes = pastes.filter((item) => {
    return item.title.toLowerCase().includes(searchQuery.toLowerCase());
  })

  function handleEdit(id) {
    navigate(`/?pasteId=${id}`);
  }

  function handleView(id) {
    navigate(`/pastes/${id}`)
  }

  function handleDelete(filteredItem) {
    const pasteIdOfFilteredItem = filteredItem._id;
    dispatch(removeFromPastes(pasteIdOfFilteredItem));
  }

  function handleCopy(filteredItem) {
    navigator.clipboard.writeText(filteredItem.content);
    toast.success("Copied")
  }

  function handleShare() {
    setShare(true);
  }

  function showTitle(title) {
    if(title.length > 25) {
      return title.slice(0, 25) + "....";
    }

    else {
      return title;
    }
  }

  function showContent(content) {
    if(content.length > 280) {
      return content.slice(0, 280) + ".......";
    }

    else {
      return content;
    }
  }

  function printDate(isoDate) {
    const date = new Date(isoDate);
    // Format the date into "Month Day, Year"
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return formattedDate;
  }

  return (
    <div className='flex flex-col justify-center gap-16 items-center mt-5'>
      <input 
      type="search"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder='Search title'
      className='bg-gray-200 rounded-md pl-5 p-2 w-[40%] placeholder:text-gray-500'
      />

      <div className='w-full flex flex-col justify-center items-center gap-2'>
        {
          filteredPastes.length > 0 ? (
            filteredPastes.map((filteredItem) => {
              return (
                <div 
                key={filteredItem._id}
                className='bg-[#f9f7f7] flex w-[50%] justify-between items-start border-black border m-1 p-4 rounded-md'>
                  <div className='w-[63%] flex flex-col'>
                    <div className='text-5xl font-semibold w-[100%] h-[100px] break-words'>
                      {showTitle(filteredItem.title)} 
                    </div>
                    <div className='h-28 w-[100%]'>
                      {showContent(filteredItem.content)}
                    </div>
                  </div>
                  <div className='flex flex-col items-end gap-3 w-[37%] h-[100px] pt-3'>
                    <div className='flex gap-5 '>
                      <button onClick={() => handleEdit(filteredItem._id)} className='bg-[#edecec] border border-[#0000003b] rounded-md p-1 hover:text-blue-600 transition-all duration-75'>
                        <Pencil />
                      </button>
                      <button onClick={() => handleView(filteredItem._id)}
                      className='bg-[#edecec] border border-[#0000003b] rounded-md p-1 hover:text-purple-600 transition-all duration-75'>
                        <Eye />   
                      </button>
                      <button onClick={() => handleDelete(filteredItem)}
                      className='bg-[#edecec] border border-[#0000003b] rounded-md p-1 hover:text-red-600 transition-all duration-75'>
                        <Trash2 />
                      </button>
                      <button onClick={() => handleCopy(filteredItem)}
                      className='bg-[#edecec] border border-[#0000003b] rounded-md p-1 hover:text-green-600 transition-all duration-75'>
                        <Copy />
                      </button>
                      <button onClick={() => handleShare()}
                      className='bg-[#edecec] border border-[#0000003b] rounded-md p-1 hover:text-yellow-600 transition-all duration-75'>
                        <Share2 />
                      </button>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Calendar />
                      {printDate(filteredItem.createdAt)}
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className='p-5 rounded-xl font-bold text-4xl bg-gray-100'>
              No Pastes
            </div>
          )
        }
      </div>
      {share ? <ModalShare setShare={setShare} /> : null}
    </div>
  )
}

export default Pastes
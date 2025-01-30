import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } from '../redux/PasteSlice';
import toast from 'react-hot-toast';
import { Copy } from 'lucide-react';

const Home = () => {

    const dispatch = useDispatch();
    const pastes = useSelector((state) => state.paste.pastes);
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();  // useSearchParams is a react hook used to get 
    const pasteId = searchParams.get("pasteId");

    function createNewPasteId() {
        return Date.now().toString(36)  // return this as a paste id
    }

    function createPaste() {
        const paste = {
            title: title,
            content: note,
            _id: pasteId || createNewPasteId(),
            createdAt: new Date().toISOString(),
        }

        if(pasteId) {
            //update paste
            dispatch(updateToPastes(paste));

            // after creation or updation clear title, content and url
            setTitle('');  
            setNote('');
            setSearchParams({});  // empty object
        }

        else {
            //create paste
            if(title != '' && note != '') {
                dispatch(addToPastes(paste));

                setTitle('');  
                setNote('');
                setSearchParams({});
            }

            else {
                toast.error("Required field");
            }
        }


    }

    useEffect(() => {
        if(pasteId) {
            const paste = pastes.find((p) => {
                return p._id === pasteId
            });

            setTitle(paste.title);
            setNote(paste.content);
        }
    }, [pasteId])

    function handleCopy(content) {
        navigator.clipboard.writeText(content);
        toast.success("Copied")
    }

  return (
    <div className=" mt-5 flex flex-col items-center h-fit">
        <div className='w-[75%] flex justify-between items-center'>
            <input 
            value= {title}
            type="text" 
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            className='bg-gray-200 border border-gray-400 pl-5 p-2 w-[80%] rounded-md placeholder:text-gray-500 font-semibold'
            />
            <button 
            onClick={createPaste}
            className='bg-[#9825d1] p-2 pl-3 pr-3 rounded-md ml-12 font-mono text-white font-bold hover:bg-[#8232b1] transition-all duration-25 '>
                {
                    pasteId ? "Update My Paste" : "Create My Paste"
                }
            </button>
        </div>
        <div className='bg-[#343333] w-[75%] mt-3 p-3 rounded-md overflow-hidden'>
            <div className='w-full h-5 pl-2 pr-2 mb-2 flex justify-between items-center'>
                <div className='flex gap-2'>
                    <div className='bg-red-500 w-[15px] h-[15px] rounded-full'></div>
                    <div className='bg-yellow-500 w-[15px] h-[15px] rounded-full'></div>
                    <div className='bg-green-500 w-[15px] h-[15px] rounded-full'></div>
                </div>
                <button className='text-white' onClick={() => handleCopy(note)}>
                    <Copy />
                </button>
            </div>
            <textarea 
            value={note}
            placeholder="Write Your Content Here....."
            onChange={(e) => setNote(e.target.value)}
            rows={20}
            className='bg-[#e7e7e7] resize-none w-[100%] p-4 rounded-md outline-none  scrollbar-thumb-gray-500 scrollbar-track-transparent scrollbar-thin'
            >
            </textarea>
        </div>
    </div>
  )
}

export default Home
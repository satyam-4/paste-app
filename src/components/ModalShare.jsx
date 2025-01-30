import React from "react";
import { WhatsappShareButton, FacebookShareButton, LinkedinShareButton, TelegramShareButton, TwitterShareButton } from 'react-share';
import { WhatsappIcon, FacebookIcon, LinkedinIcon, TelegramIcon, TwitterIcon } from 'react-share';
import { X } from 'lucide-react';

const ModalShare = ({ setShare }) => {

    function handleCancel() {
        console.log("first")
        setShare(null);
    }
    
    return (
        <div className="fixed inset-0 bg-opacity-30 bg-black backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white rounded-md">
                <div className="flex justify-end items-center p-1">
                    <button
                    onClick={handleCancel} 
                    className="hover:bg-gray-200 rounded-md">
                        <X />
                    </button>
                </div>
                <div className="flex gap-10 items-center p-7 font-semibold">
                    <WhatsappShareButton>
                        <div className="flex flex-col justify-center items-center gap-2">
                            <WhatsappIcon round />
                            WhatsApp
                        </div>
                    </WhatsappShareButton>

                    <FacebookShareButton>
                        <div className="flex flex-col justify-center items-center gap-2">
                            <FacebookIcon round />
                            Facebook
                        </div>
                    </FacebookShareButton>

                    <LinkedinShareButton>
                        <div className="flex flex-col justify-center items-center gap-2">
                            <LinkedinIcon round />
                            LinkedIn
                        </div>
                    </LinkedinShareButton>

                    <TelegramShareButton>
                        <div className="flex flex-col justify-center items-center gap-2">
                            <TelegramIcon round />
                            Telegram
                        </div>
                    </TelegramShareButton>

                    <TwitterShareButton>
                        <div className="flex flex-col justify-center items-center gap-2">
                            <TwitterIcon round />
                            Twitter
                        </div>
                    </TwitterShareButton>
                </div>
            </div>
        </div>
    )
}

export default ModalShare
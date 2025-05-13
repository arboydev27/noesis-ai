import React from "react";

import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  ChatBubbleBottomCenterIcon,
  ChatBubbleLeftEllipsisIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

interface ChatItemProps {
  text: string;
  onEdit: () => void;
  onDelete: () => void;
}

// const ChatItem = ({ text, onEdit, onDelete }: ChatItemProps) => {
const ChatItem = ({ text, onEdit, onDelete }: ChatItemProps) => {
  const x = useMotionValue(0);
  const pacity = useTransform(x, [-100, 0], [1, 0]);

  return (
    // <div className="w-full flex items-center bg-white rounded-xl shadow-md p-4 hover:bg-gray-50 transition">
    //   {/* Chat Icon */}
    //   <ChatBubbleBottomCenterIcon className="w-4 h-4 text-[#130261] mr-4 flex-shrink-0" />

    //   {/* Chat Text */}
    //   <p className="flex-grow text-[#130261] text-xs truncate opacity-90">
    //     {text}
    //   </p>

    //   {/* Action Icons */}
    //   <div className="flex gap-2 ml-4">
    //     <PencilSquareIcon
    //       onClick={onEdit}
    //       className="w-4 h-4 text-gray-500 hover:text-[#9747FF] cursor-pointer"
    //     />
    //     <TrashIcon
    //       onClick={onDelete}
    //       className="w-4 h-4 text-gray-500 hover:text-red-500 cursor-pointer"
    //     />
    //   </div>
    // </div>
    <div className="relative w-full h-13 overflow-hidden rounded-xl">
      {/* Background (Delete action) */}
      <div className="absolute inset-0 bg-red-100 flex justify-end items-center pr-6">
        <TrashIcon className="w-4 h-4 text-red-600" />
      </div>

      {/* Foreground (Swipeable chat card) */}
      <motion.div
        className="absolute inset-0 bg-white shadow-md rounded-xl p-4 flex items-center gap-2"
        drag="x"
        dragConstraints={{ left: -100, right: 0 }}
        style={{ x }}
        onDragEnd={(event, info) => {
          if (info.offset.x < -80) {
            onDelete();
          }
        }}
      >
        <ChatBubbleLeftEllipsisIcon className="w-4 h-4 text-[#424242]" />
        <p className="flex-grow text-[#424242] text-xs truncate">{text}</p>
        <PencilSquareIcon
          onClick={onEdit}
          className="w-4 h-4 text-[#424242] hover:text-[#9747FF] cursor-pointer"
        />
      </motion.div>
    </div>
  );
};

export default ChatItem;

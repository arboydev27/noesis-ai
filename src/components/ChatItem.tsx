import React from "react";

import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  ChatBubbleLeftEllipsisIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

interface ChatItemProps {
  text: string;
  onClick: () => void;
  // onEdit: () => void;
  onDelete: () => void;
}

// const ChatItem = ({ text, onEdit, onDelete }: ChatItemProps) => {
const ChatItem = ({ text, onClick, onDelete }: ChatItemProps) => {
  const x = useMotionValue(0);
  const pacity = useTransform(x, [-100, 0], [1, 0]);

  return (
    <div className="relative w-full h-9 overflow-hidden rounded-xl cursor-pointer">
      {/* Background (Delete action) */}
      <div className="absolute inset-0 bg-red-100 flex justify-end items-center pr-6">
        <TrashIcon className="w-4 h-4 text-red-600" />
      </div>

      {/* Foreground (Swipeable chat card) */}
      <motion.div
        className="absolute inset-0 pl-2 bg-white shadow-md rounded-xl flex items-center gap-2 hover:bg-[#f0ebff] transition-all"
        onClick={onClick}
        drag="x"
        dragConstraints={{ left: -100, right: 0 }}
        style={{ x }}
        onDragEnd={(event, info) => {
          if (info.offset.x < -80) {
            onDelete();
          }
        }}
      >
        {/* Chat icon */}
        <ChatBubbleLeftEllipsisIcon className="w-4 h-4 text-[#424242] flex-shrink-0" />

        {/* Text wrapper: grow but truncate without pushing icons */}
        <div className="flex-grow min-w-0">
          <p className="text-[#424242] text-xs truncate">{text}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatItem;

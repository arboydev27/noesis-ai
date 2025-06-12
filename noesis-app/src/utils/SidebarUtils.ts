// export interface Chat {
//   id: number;
//   prompt: string;
//   createdAt: string;
// }

// interface ChatGroup {
//   title: string;
//   chats: Chat[];
// }

// export function groupChatsByDate(chats: Chat[]): ChatGroup[] {
//   const now = new Date();
//   const groups: Record<string, Chat[]> = {
//     Today: [],
//     Yesterday: [],
//     "Last 7 Days": [],
//     "Last 30 Days": [],
//   };

//   const previousMonthChats: Chat[] = [];
//   const previousYearChats: Chat[] = [];

//   const todayStr = now.toISOString().split("T")[0];
//   const yesterdayStr = new Date(now.getTime() - 86400000).toISOString().split("T")[0];

//   chats.forEach(chat => {
//     const chatDate = new Date(chat.createdAt);
//     const chatStr = chat.createdAt.split("T")[0];
//     const diffTime = now.getTime() - chatDate.getTime();
//     const diffDays = diffTime / (1000 * 60 * 60 * 24);

//     if (chatStr === todayStr) {
//       groups["Today"].push(chat);
//     } else if (chatStr === yesterdayStr) {
//       groups["Yesterday"].push(chat);
//     } else if (diffDays <= 7) {
//       groups["Last 7 Days"].push(chat);
//     } else if (diffDays <= 30) {
//       groups["Last 30 Days"].push(chat);
//     } else {
//       const chatMonth = chatDate.getMonth();
//       const chatYear = chatDate.getFullYear();
//       const nowMonth = now.getMonth();
//       const nowYear = now.getFullYear();

//       if (chatMonth === nowMonth - 1 && chatYear === nowYear) {
//         previousMonthChats.push(chat);
//       } else if (chatYear === nowYear - 1) {
//         previousYearChats.push(chat);
//       }
//     }
//   });

//   const result: ChatGroup[] = [
//     { title: "Today", chats: groups["Today"] },
//     { title: "Yesterday", chats: groups["Yesterday"] },
//     { title: "Last 7 Days", chats: groups["Last 7 Days"] },
//     { title: "Last 30 Days", chats: groups["Last 30 Days"] },
//   ];

//   if (previousMonthChats.length > 0) {
//     const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
//       new Date(now.getFullYear(), now.getMonth() - 1)
//     );
//     result.push({ title: monthName, chats: previousMonthChats });
//   }

//   if (previousYearChats.length > 0) {
//     result.push({ title: `${now.getFullYear() - 1}`, chats: previousYearChats });
//   }

//   return result;
// }

export interface Chat {
  id: number;
  prompt: string;
  createdAt: string;
}

interface ChatGroup {
  title: string;
  chats: Chat[];
}

export function groupChatsByDate(chats: Chat[]): ChatGroup[] {
  const now = new Date();
  const groups: Record<string, Chat[]> = {
    Today: [],
    Yesterday: [],
    "Last 7 Days": [],
    "Last 30 Days": [],
  };

  const previousMonthChats: Chat[] = [];
  const previousYearChats: Chat[] = [];

  const todayStr = now.toISOString().split("T")[0];
  const yesterdayStr = new Date(now.getTime() - 86400000).toISOString().split("T")[0];

  chats.forEach(chat => {
    const chatDate = new Date(chat.createdAt);
    const chatStr = chat.createdAt.split("T")[0];
    const diffTime = now.getTime() - chatDate.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (chatStr === todayStr) {
      groups["Today"].push(chat);
    } else if (chatStr === yesterdayStr) {
      groups["Yesterday"].push(chat);
    } else if (diffDays <= 7) {
      groups["Last 7 Days"].push(chat);
    } else if (diffDays <= 30) {
      groups["Last 30 Days"].push(chat);
    } else {
      const chatMonth = chatDate.getMonth();
      const chatYear = chatDate.getFullYear();
      const nowMonth = now.getMonth();
      const nowYear = now.getFullYear();

      if (chatMonth === nowMonth - 1 && chatYear === nowYear) {
        previousMonthChats.push(chat);
      } else if (chatYear === nowYear - 1) {
        previousYearChats.push(chat);
      }
    }
  });

  const result: ChatGroup[] = [];

  // Only include non-empty predefined groups
  for (const title of ["Today", "Yesterday", "Last 7 Days", "Last 30 Days"]) {
    if (groups[title].length > 0) {
      result.push({ title, chats: groups[title] });
    }
  }

  // Only include non-empty extended groups
  if (previousMonthChats.length > 0) {
    const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
      new Date(now.getFullYear(), now.getMonth() - 1)
    );
    result.push({ title: monthName, chats: previousMonthChats });
  }

  if (previousYearChats.length > 0) {
    result.push({ title: `${now.getFullYear() - 1}`, chats: previousYearChats });
  }

  return result;
}

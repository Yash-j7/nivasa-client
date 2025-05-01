import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import {
  setNotification,
  setSingleNotification,
} from "../redux/notifications/notificationSlice";
import { activeChatId } from "./Conversations";
import { signal } from "@preact/signals-react";

// Local server
export const socket = io("https://glitch.com/edit/#!/glitch-hello-node", {
  headers: {
    "user-agent": "chrome",
  },
});

export const notifySignal = signal({
  notifications: [],
});

const SocketConnection = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log("currentUser", currentUser);

  //======== Get Notification From DB =========//
  useEffect(() => {
    const loadPrevNotification = async () => {
      try {
        const unseenNotificaton = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/notification/${
            currentUser._id
          }`,
          {
            credentials: "include", // This is crucial
          }
        );
        const res = await unseenNotificaton.json();
        if (!unseenNotificaton.ok) {
          throw new Error(res.message || "Failed to fetch notifications");
        }
        if (res.success === false) {
          console.log(res);
        } else {
          notifySignal.value.notifications = res;
          dispatch(setNotification(res));
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    currentUser && loadPrevNotification();
  }, []);

  //=========== Store notifications to DB =============//
  const sendNotificationToDB = async (notificationData) => {
    try {
      const sendNotification = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/notification/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(notificationData),
        }
      );
      const response = await sendNotification.json();
      if (response.success === false) {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //----- Get Notification from socket and setNotification---------//
  useEffect(() => {
    socket.on(`${currentUser?._id}`, (socketNotification) => {
      const currentPath = window.location.pathname;

      if (currentPath !== "/message") {
        activeChatId.value.chatId = "";
      }

      if (socketNotification.chatId !== activeChatId.value.chatId) {
        const isNotificationExist = notifySignal.value.notifications.some(
          (notify) => notify.chatId === socketNotification.chatId
        );

        if (!isNotificationExist) {
          notifySignal.value.notifications = [
            ...notifySignal.value.notifications,
            socketNotification,
          ];
          dispatch(setSingleNotification(socketNotification));
          sendNotificationToDB(socketNotification);
        }
      }
    });
  });

  return <></>;
};

export default SocketConnection;

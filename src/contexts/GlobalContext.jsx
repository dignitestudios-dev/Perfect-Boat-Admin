import axios from "../axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onMessageListener } from "../firebase/messages";
import Cookies from "js-cookie";
export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const route = useNavigate();
  const [activeLink, setActiveLink] = useState("Home");
  const token = Cookies.get("token");
  const navigate = (url, active) => {
    route(url);
    setActiveLink(active);
  };

  const test = "";

  // for notifications
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [notifications, setNotifications] = useState([]);
  const [notificationUpdate, setNotificationUpdate] = useState(false);

  onMessageListener()
    .then((payload) => {
      setShow(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      setNotificationUpdate((prev) => !prev);
      setTimeout(() => {
        setShow(false);
        setNotification({ title: "", body: "" });
      }, 3000);
    })
    .catch((err) => console.log("failed: ", err));

  return (
    <GlobalContext.Provider
      value={{
        test,
        navigate,
        activeLink,
        show,
        setShow,
        notification,
        setNotification,
        notifications,
        setNotifications,
        notificationUpdate,
        setNotificationUpdate,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

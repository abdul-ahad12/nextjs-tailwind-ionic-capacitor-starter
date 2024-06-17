// src/notificationService.ts

export interface Notification {
    message: string;
    timestamp: string;
  }
  
  const notificationsKey = 'notificationsUser';
  
  export function addNotification(message: string) {
    // Get the current date and time
    const now = new Date();
    const currentDate = now.toDateString();
    const currentTime = now.toLocaleTimeString();
  
    // Format the timestamp
    let timestamp = `${currentDate}, ${currentTime}`;
  
    const today = new Date().toDateString();
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = yesterdayDate.toDateString();
  
    if (currentDate === today) {
      timestamp = `Today, ${currentTime}`;
    } else if (currentDate === yesterday) {
      timestamp = `Yesterday, ${currentTime}`;
    }
  
    // Create the notification object
    const newNotification: Notification = {
      message,
      timestamp,
    };
  
    // Get the existing notifications from local storage
    const existingNotifications = localStorage.getItem(notificationsKey);
    let notifications: Notification[] = [];
  
    if (existingNotifications) {
      notifications = JSON.parse(existingNotifications);
    }
  
    // Add the new notification to the list
    notifications.push(newNotification);
  
    // Save the updated list back to local storage
    localStorage.setItem(notificationsKey, JSON.stringify(notifications));
  }
  
  export function getNotifications(): Notification[] {
    const existingNotifications = localStorage.getItem(notificationsKey);
    if (existingNotifications) {
      return JSON.parse(existingNotifications);
    }
    return [];
  }
  
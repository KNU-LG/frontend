# KNU Capstone Design Project 1 Frontend Repository

## 📋 Table of Contents
- [Tech Stack](#tech-stack)
- [Implemented Features and Technologies](#implemented-features-and-technologies)
  - [Home Screen](#home-screen)
  - [Settings Screen](#settings-screen)
  - [Widget Configuration Screen](#widget-configuration-screen)
  - [Widget Addition Screen](#widget-addition-screen)
  - [Login and Signup](#login-and-signup)
  - [Widget Mode and Image Slide Mode](#widget-mode-and-image-slide-mode)
  - [Calendar Widget](#calendar-widget)
  - [Dimming Feature](#dimming-feature)
  - [Dark / Light Mode](#dark--light-mode)
- [How to Run](#how-to-run)
  - [Emulator](#emulator)
  - [Raspberry Pi](#raspberry-pi)
- [License](#license)

## Tech Stack

<div>
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
<img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white">
<img src="https://img.shields.io/badge/Emotion-black?style=for-the-badge&labelColor=white">
<img src="https://img.shields.io/badge/-TanStack%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white">
<img src="https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white">
<img src="https://img.shields.io/badge/✋ react use gesture-%23CC342D.svg?style=for-the-badge&logo=&logoColor=white">
<img src="https://img.shields.io/badge/webOS-a50034.svg?style=for-the-badge&logo=lg&logoColor=white">
<div/>

## Implemented Features and Technologies

### Home Screen

This is the initial screen that appears when the application starts. The configured widgets are displayed here.

![Home Sreen](/src//assets//docsImage/image-1.png)

You can also add a wallpaper through the widget setting mode.

![Add Image](/src//assets//docsImage/image-11.png)

### Settings Screen

This screen allows users to access various features.

![Settings Screen](/src//assets//docsImage/image-9.png)
### Login and Signup

`react-hook-form` is used for validation, and `useForm` is utilized to manage login and signup states.<br/>

**On login or signup** -> The input values are sent to the server, and a token is received in response.

![Login Screen](/src//assets//docsImage/image-3.png)
![SignUP Screen](/src//assets//docsImage/image-4.png)

### Widget Mode and Image Slide Mode

- **Widget Mode** displays the widgets. Additionally, you must log in first to add widgets <br/>

- **Image Slide Mode** displays an image slideshow.
![Image Slide Screen](/src//assets//docsImage/image-5.png)

### Widget Configuration Screen

Users can modify or delete widget positions on this screen. At this point, `react-use-gesture` is used to update the widget's position. After pressing the edit button, users can rearrange widget positions. Once editing is complete, pressing the save button updates the widget position array in local storage and also sends the changes to the server via an API.<br/>

![Widget Configuration Screen](/src//assets//docsImage/image-6.png)

### Widget Addition Screen

Users can add their desired widgets on this screen. Widgets are categorized by type and size (L, M, S). Upon selecting a widget to add, users are directed to the widget editing page. During this process, the widget position and type arrays are updated in the user's local device and Server.<br/>


### Calendar Widget

Clicking on a widget opens a modal where users can add schedules in the calendar widget.<br/>

**When adding a calendar** -> The calendar widget data is sent via an API, and users are directed to the widget editing page.<br/>

**When deleting a calendar** -> The calendar widget is deleted via an API. Simultaneously, the local storage data is updated, and the UI is reloaded to reflect the changes.<br/>

**When adding a schedule** -> The schedule title and content are received using `react-hook-form`. Clicking the "Add Schedule" button sends the data to the server. `TanStack Query` caches the data and updates it using a cache key.<br/>

**When deleting a schedule** -> The schedule is deleted via an API, and the cached data is also updated.<br/>

![Calendar Image](/src//assets//docsImage/image-7.png)

### Dimming Feature

This is managed through a dimming provider. Using `window.addEventListener`, it detects `mousemove`, `keydown`, `touchstart`, and `click` events. If no such events are detected for 10 seconds, an additional layer is applied to darken the screen.

![alt text](/src//assets//docsImage/image-8.png)

### Dark / Light Mode

The `Context API` is used to globally manage and toggle between dark and light modes. Each mode's CSS values are globally managed to affect the UI.

- Light Mode
![alt text](/src//assets//docsImage/image-9.png)

- Dark Mode
![alt text](/src//assets//docsImage/image-10.png)
## How to Run

### Emulator

> npm install -g @webos-tools/cli

Install the CLI tool using the above command.

> npm build

Build the React app using the above command.

> ares-package -n build

Package the built app into an IPK file using the webOS CLI tool.

> ares-install your-app-name.ipk

Install the app onto the webOS emulator using the above command. After installation, run the app through the emulator.

### Raspberry Pi

* ensure that you already has some ipk file from repository build command.

> ares-setup-devices

before command it, Check your device connected at same network. (I recommand just you can use mobile hospot)

<img width="642" alt="image" src="https://github.com/user-attachments/assets/812a4d48-75fb-431e-8b04-61f8c77c43b7">

manually add your device information.

> ares-install app.ipk -d TARGET_DEVICE

TARGET_DEVICE is input value of Device Name at previous command.

## License

This project is licensed under the MIT License.

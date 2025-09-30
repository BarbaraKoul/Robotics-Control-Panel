# Project - Robotics Control Panel

<img width="1912" height="867" alt="Στιγμιότυπο οθόνης 2025-09-13 234134" src="https://github.com/user-attachments/assets/e8c9095e-8fbd-4adb-826c-f2cb50b71733" />

(in progress)

## About
This Repository is made for **Robotics Control Panel**, a MERN Stack Web Application with the following features:
- [x] Real-time fetching and presentation of robots' functionality data (battery, position, sensors)
- [ ] Connection of more than one robot at the same time
- [x] Manual (joystick) or automate (path planning) control of robots
- [ ] Live POV of the robot trough camera
- [x] Record and analysis of logs (performance, paths, battery usage) and progress save for future use
- [x] Visualization of data with graphs and interactive maps

  The above can be also applied for simulations, like **turtlesim** of ROS <br/>
  <br/>
*checked boxes mean that the features are currently added* **SO FAR FOR SIMULATIONS**

## Installation
Clone the Repository. Seeing that the application uses **ROS Noetic** for the robotics simulations, make sure that you have **WSL** for Windows or a **Virtual Machine** for running Linux Ubuntu 20.04 and download it there. 
- For the simulation data:<br/>

   Download ROS Noetic [ROS Noetic Ninjemys Installation](https://wiki.ros.org/noetic/Installation/Ubuntu)<br/>
  
     You can make your own simulations with turtlesim and launch them in the default rosbridge port 9090. However, if you want to run the example simulation I made:<br/>
     
  1. Download all the dependencies (They are listed in the **package.xml** file)
  2. Build the workspace (catkin make)
  3. Source the workspace (source devel/setup.bash)
  4. Run ROS Master with the command **roscore**
  5. In a new terminal run the turtlesim simulation (rosrun turtlesim turtlesim_node)
  6. In a third terminal start the **Rosbridge Websocket Server** (roslaunch rosbridge_server rosbridge_websocket.launch)
  7. If you want to run the nodes I made: run rosrun turtle_control controller_node (publisher) / rosrun turtle_control listener.py (listener)
 
     Again, you have the option to make a **launch file** and run all of them together.<br/>

  -For the Web Application:
  1. Install Node.Js dependencies (npm install)
  2. start the web server (node index.js)
  3. Visit: [Robotics Control Panel](http://localhost:3000) (http://localhost:3000)

You'll be able to see this: <img width="1919" height="873" alt="image" src="https://github.com/user-attachments/assets/fa52fcca-5105-4df1-ba71-cae1a533367b" />
This is Robotics Control Panel!


## User Documentation
The features of Robotics Control Panel are not only about telemetry, but also of control, as the name indicates!
- **Data Panel**: You are able to see the XY coordinates, angle Theta, angular and linear velocity of the simulation in a modern UI panel
- **History Panel**: Here the last 30 data submissions are presented.
- **XY-Time chart** and Angular/Linear Velocity-Time chart: Real-Time charts of the data over time made with Chart.Js
- **Trajectory Chart**: See in real-time the trajectory of the robot simulation (X-Y Chart) also made with Chart.Js
- **Joystick**: If you don't want to use the keyboard/nodes, take the Robot's Control with the Joystick in the down-right corner of your screen!

Note that:
- All the data are saved in a MongoDB Cluster (New features like replay are coming soon...)
- The example nodes I made for the simulation are written both in C++ and Python for diversion. You can use the language of your choice.
- I used ROS Noetic and not ROS2 for educational purposes and only. ROS2 integration is coming soon.
- The menu bar is not completed yet and currently is for UI purposes.

## Technologies (so far)
+ **Languages**: JavaScript, C++, Python, HTML/CSS Shell Script
+ **Frontend**: React, CSS
+ **Backend**: Express
+ **Database**: MongoDB 
+ **OS**: Windows 11 (for web app development), Linux Ubuntu 20.04 (for ROS)
+ **Tools**: VS Code, Git
+ **UI/UX design**: Figma 

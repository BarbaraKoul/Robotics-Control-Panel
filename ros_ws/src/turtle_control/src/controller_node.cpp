#include "ros/ros.h"
#include "geometry_msgs/Twist.h"

int main(int argc, char **argv) {
  ros::init(argc, argv, "controller_node");
  ros::NodeHandle nh;

  ros::Publisher pub = nh.advertise<geometry_msgs::Twist>("/turtle1/cmd_vel", 10);
  ros::Rate loop_rate(1);

  while (ros::ok()) {
    geometry_msgs::Twist msg;
    msg.linear.x = 2.0;
    msg.angular.z = 1.0;
    pub.publish(msg);

    ROS_INFO("Publishing: linear=%.2f angular=%.2f", msg.linear.x, msg.angular.z);
    ros::spinOnce();
    loop_rate.sleep();
  }
  return 0;
}

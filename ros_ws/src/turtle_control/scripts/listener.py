#!/usr/bin/env python
import rospy
from turtlesim.msg import Pose

def callback(data):
    rospy.loginfo("Pose -> x: %.2f, y: %.2f, theta: %.2f", data.x, data.y, data.theta)

if __name__ == '__main__':
    rospy.init_node('pose_listener', anonymous=True)
    rospy.Subscriber("/turtle1/pose", Pose, callback)
    rospy.spin()

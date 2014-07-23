ScalingNodeJS-minimal
=====================

Getting Started:
- Install RabbitMQ & Erlang
- Install MongoDB
- Clone the repository to a local repository.
- Run 'npm install'

Information:
This repository consists of 4 branches that show progressive development of a nodejs app from single core http server to multinode, multicore http server with a message bus. The idea is that you start with branch #1 to see how to set up a very basic nodejs app. Then move on through each progressive branch to learn what changes were necessary to make each step work. 

Usage branch #1-3:
- node server

Branch #4: (you can use a port number to run multiple instances to see that each server receives all messages)
- node server [-p #####]


There is, or will be, a follow-up that uses meanjs to demonstrate more advanced usage.

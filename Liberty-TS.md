# Liberty TS

**Core objections**
* Micro services for each API layer & Bus queue
* API using JSON and protobuf protocol
* Web Socket to JavaScript observer pattern
* Distrubuted Observe Pattern
* No Existing Framework Easy to edit
* Each section built on sub git repositories
* JS backend agnostic - Easy to subitute between backend JS framework such as Deno and Node 

## Introduction

Liberty TS a highly customizable light weight HTTP server built on Deno.


## How to communicate between servers
The access (Access server is the route server) is based on HTTP proxy to distrubute the route to the correct server. Websocket server will also be accessed via the route proxy server.

Bus service is UDP/TCP connection between servers based on distrubuted in memorry database which writes down to a json document incase the server crashes.


Planned work: 
- IOC Container based on config
- CLI:
    - precomplie code to enable interface DI injection
    - Create schemantics for the code
- Microservices
- Simple out the box message que
- Http/https service
- Port across to Node
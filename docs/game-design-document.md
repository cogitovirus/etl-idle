# ETL Idle
Last updated: 2024.05.03
Author: Wiktor Żołnierowicz

## Game overview
Finite idle game. The player is a data engineer who has to manage the data pipeline. The player has to optimize the pipeline to process the data as fast as possible. The player can upgrade the pipeline components to increase the processing speed.

### Concept

bytes/s
kB/s
MB/s
GB/s
TB/s
PB/s
EB/s
ZB/s

Upgrades:
- Hadoop cluster
- Spark


## Obj
class
id
name
desc
buyName ?
tags ?
cost = { $, bytes}
require - eq or object ?
modifiers - { speed: 1.2, cost: 0.8 }

events

tasks ? 
upgrades ?

Global State: Consider using React Contexts (/contexts) or another state management library to manage global game state accessible across different components.
Local State: For local state management (e.g., UI state like toggles, modals), use local component state or custom hooks (/hooks).

game state / useState / redux / wtf is state anyways
 avoid component state
 
I recommend holding your values outside react (e.g. in Redux) and passing your values into a functional component rather than holding the values in component state. 


#### Batch
Upgrades:
- Hadoop
- Spark v1.1 , 1.2 etc.

#### Streaming
Upgrades:
- Kafka

#### ML
Upgrades:
- PyTorch
- TensorFlow

### AI
- LLM
- LangChain


## Art style
Retro.



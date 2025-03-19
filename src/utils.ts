
import { BASE_NODE_PORT } from "./config";
import { NodeState, Value } from "./types";

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function broadcastMessage(
    nodeId: number,
    N: number,
    step: number,
    nodeState: NodeState
  ) {
    if (nodeState.killed) {
      console.log(`Node ${nodeId} is killed, not sending messages.`);
      return;
    }
  
    for (let i = 0; i < N; i++) {
      if (i !== nodeId) {
        fetch(`http://localhost:${BASE_NODE_PORT + i}/message`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            step: step,         
            value: nodeState.x, 
            k: nodeState.k, 
          }),
        }).catch((error) => {
          console.error(`Error sending message to node ${i}:`, error);
        });
      }
    }
  }

  

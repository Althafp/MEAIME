# Onchain AI Agent Platform

## Project Structure
1. **`packages/web`**  
   Provides a user interface for creating Vaults and AI Agents.
2. **`packages/contract/AI_vault`**  
   Contains the Vault smart contract.
3. **`packages/server`**  
   Implements the backend with FastAPI, integrating the AI Agent, CDP, and LLM functionality.

---

## How to Run

### Frontend (`packages/web`)  
Set up the interface for creating Vaults and AI Agents.

### Smart Contract (`packages/contract/ai-vault`)  
Install dependencies, configure the environment, and deploy the Vault smart contract.

### Backend (`packages/server`)  
Configure environment variables, set up dependencies, and start the FastAPI server.

---

## Notes
- The platform is partially integrated due to time constraints:
  - Frontend, backend, and smart contracts can be tested independently.
- Backend functionality includes testing CDP and LLM via API.
- Frontend allows for creating USDC Vaults and AI Agents through API interaction.

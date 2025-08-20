import { ethers } from 'ethers';

export interface ZoneReport {
  latitude: number;
  longitude: number;
  zoneType: 'safe' | 'crowded' | 'avoid';
  description?: string;
  timestamp: number;
}

// Simple contract ABI for logging incidents
const INCIDENT_LOGGER_ABI = [
  "function logIncident(string memory location, string memory zoneType, string memory description, uint256 timestamp) public returns (uint256)",
  "event IncidentLogged(uint256 indexed id, address indexed reporter, string location, string zoneType, string description, uint256 timestamp)"
];

// Mock contract address (would be deployed on Mumbai testnet)
const CONTRACT_ADDRESS = "0x1234567890123456789012345678901234567890";

export class BlockchainService {
  private provider: ethers.Provider | null = null;
  private signer: ethers.Signer | null = null;
  private contract: ethers.Contract | null = null;

  async initialize(rpcUrl: string): Promise<void> {
    try {
      // Initialize provider
      this.provider = new ethers.JsonRpcProvider(rpcUrl);
      
      // Create a random wallet for demo purposes
      // In production, this would integrate with MetaMask or other wallet
      const randomWallet = ethers.Wallet.createRandom();
      this.signer = randomWallet.connect(this.provider);
      
      // Initialize contract
      this.contract = new ethers.Contract(CONTRACT_ADDRESS, INCIDENT_LOGGER_ABI, this.signer);
      
      console.log("Blockchain service initialized with wallet:", await this.signer.getAddress());
    } catch (error) {
      console.error("Failed to initialize blockchain service:", error);
      throw error;
    }
  }

  async logIncidentOnChain(report: ZoneReport): Promise<string> {
    if (!this.contract || !this.signer) {
      throw new Error("Blockchain service not initialized");
    }

    try {
      const location = `${report.latitude},${report.longitude}`;
      const description = report.description || `${report.zoneType} zone reported`;
      
      // For demo purposes, we'll create a mock transaction hash
      // In real implementation, this would be an actual blockchain transaction
      const mockTxHash = this.generateMockTxHash();
      
      console.log("Logging incident on blockchain:", {
        location,
        zoneType: report.zoneType,
        description,
        timestamp: report.timestamp,
        txHash: mockTxHash
      });
      
      // Simulate blockchain delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return mockTxHash;
    } catch (error) {
      console.error("Failed to log incident on blockchain:", error);
      throw error;
    }
  }

  private generateMockTxHash(): string {
    // Generate a realistic-looking transaction hash for demo
    const chars = '0123456789abcdef';
    let hash = '0x';
    for (let i = 0; i < 64; i++) {
      hash += chars[Math.floor(Math.random() * chars.length)];
    }
    return hash;
  }

  getPolygonScanUrl(txHash: string): string {
    return `https://mumbai.polygonscan.com/tx/${txHash}`;
  }

  async getWalletAddress(): Promise<string> {
    if (!this.signer) {
      throw new Error("Signer not initialized");
    }
    return await this.signer.getAddress();
  }

  isInitialized(): boolean {
    return this.provider !== null && this.signer !== null && this.contract !== null;
  }
}

export const blockchainService = new BlockchainService();
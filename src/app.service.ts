import { Injectable } from '@nestjs/common';
import { createPublicClient, http,  Address } from 'viem'
import { sepolia } from 'viem/chains'
import tokenJson from './assets/MyToken.json'
import * as dotenv from 'dotenv';
dotenv.config();



const PRIVATEAPIKEY = process.env.INFURA_API_KEY || 'NO RESPONSE';
const deployerprivatekey = process.env. PRIVATE_KEY || '';


@Injectable()
export class AppService {
  getHello(): string {
    return `${PRIVATEAPIKEY}`;
  }

  getContractAddress(): string {
    return "0x2282A77eC5577365333fc71adE0b4154e25Bb2fa";
  }

  async getTokenName(): Promise<string> {
    const publicClient = createPublicClient({
      chain: sepolia,
      transport: http(`https://sepolia.infura.io/v3/${PRIVATEAPIKEY}`),
    });
    const name = await publicClient.readContract({
      address: this.getContractAddress() as Address,
      abi: tokenJson.abi,
      functionName: "name"
    });
    return name as string;
  }
}

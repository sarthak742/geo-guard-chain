import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ZoneReport {
  latitude: number;
  longitude: number;
  zone_type: 'safe' | 'crowded' | 'avoid';
  description?: string;
  user_id: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get the user from the request
    const {
      data: { user },
    } = await supabaseClient.auth.getUser()

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    const { method } = req;

    if (method === 'POST') {
      const body: ZoneReport = await req.json();
      
      console.log('Received zone report:', body);

      // Validate the request
      if (!body.latitude || !body.longitude || !body.zone_type) {
        return new Response(
          JSON.stringify({ error: 'Missing required fields' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        )
      }

      // Simulate blockchain transaction
      const mockBlockchainTx = await simulateBlockchainTransaction(body);
      
      // Store in Supabase with blockchain hash
      const { data: zoneData, error: zoneError } = await supabaseClient
        .from('zones')
        .insert({
          user_id: user.id,
          latitude: body.latitude,
          longitude: body.longitude,
          zone_type: body.zone_type,
          description: body.description,
          blockchain_tx_hash: mockBlockchainTx.txHash
        })
        .select()
        .single();

      if (zoneError) {
        console.error('Database error:', zoneError);
        return new Response(
          JSON.stringify({ error: 'Failed to save zone report' }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        )
      }

      console.log('Zone report saved successfully:', zoneData);

      return new Response(
        JSON.stringify({
          success: true,
          data: zoneData,
          blockchain: mockBlockchainTx
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})

async function simulateBlockchainTransaction(report: ZoneReport) {
  // Get RPC URL from environment
  const rpcUrl = Deno.env.get('POLYGON_RPC_URL') || 'https://rpc-mumbai.maticvigil.com';
  
  console.log('Simulating blockchain transaction for:', report);
  
  // Simulate blockchain delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Generate mock transaction hash
  const mockTxHash = generateMockTxHash();
  
  const blockchainData = {
    txHash: mockTxHash,
    polygonScanUrl: `https://mumbai.polygonscan.com/tx/${mockTxHash}`,
    network: 'Polygon Mumbai Testnet',
    gasUsed: Math.floor(Math.random() * 50000) + 21000,
    status: 'success'
  };
  
  console.log('Blockchain transaction simulated:', blockchainData);
  
  return blockchainData;
}

function generateMockTxHash(): string {
  const chars = '0123456789abcdef';
  let hash = '0x';
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
}
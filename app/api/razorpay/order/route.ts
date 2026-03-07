import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const { amount, productId, size, type } = await req.json();

    // 1. In a real application, you would create an order in your Razorpay dashboard
    // using the Razorpay Node SDK:
    // const Razorpay = require('razorpay');
    // const rzp = new Razorpay({ key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });
    // const order = await rzp.orders.create({ amount: amount * 100, currency: 'INR', receipt: 'receipt#1' });
    
    // For this mockup, we'll generate a dummy order ID
    const mockOrderId = `order_${crypto.randomBytes(8).toString('hex')}`;

    return NextResponse.json({
      orderId: mockOrderId,
      amount: amount * 100, // Razorpay expects amount in paise
      currency: "INR"
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

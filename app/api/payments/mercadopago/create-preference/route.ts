
import { NextResponse } from "next/server"
import axios from "axios"

export async function POST(){
  const accessToken = process.env.MP_ACCESS_TOKEN
  if(!accessToken) return NextResponse.json({ error:"MP_ACCESS_TOKEN faltante" }, { status: 500 })

  const payload = {
    items: [{ title: "BYNINIA – Orden", quantity: 1, currency_id: "ARS", unit_price: 1000 }],
    back_urls: {
      success: `${process.env.SITE_URL}/success`,
      failure: `${process.env.SITE_URL}/checkout`,
      pending: `${process.env.SITE_URL}/checkout`
    },
    auto_return: "approved"
  }

  const { data } = await axios.post("https://api.mercadopago.com/checkout/preferences", payload, {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
  return NextResponse.json({ id: data.id, init_point: data.init_point })
}

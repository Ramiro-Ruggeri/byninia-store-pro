
"use client"
import Button from "@/components/atoms/Button"
export default function Checkout(){
  const pay = async ()=>{
    const res = await fetch('/api/payments/mercadopago/create-preference', { method:'POST' })
    const data = await res.json()
    if(data?.init_point) location.href = data.init_point
  }
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <Button className="w-full" onClick={pay}>Pagar con Mercado Pago</Button>
    </div>
  )
}

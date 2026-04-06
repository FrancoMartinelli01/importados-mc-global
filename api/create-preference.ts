import type { VercelRequest, VercelResponse } from '@vercel/node';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const { items, payer } = req.body;
    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: items.map((item: any) => ({
          id: item.id,
          title: item.name,
          quantity: item.qty,
          unit_price: item.price,
          currency_id: 'ARS',
        })),
        payer: {
          name: payer.name,
          email: payer.email,
          phone: { number: payer.phone },
        },
        shipments: {
          receiver_address: {
            street_name: payer.address,
            city_name: payer.city,
            state_name: payer.province,
            country_name: 'Argentina',
          },
        },
        back_urls: {
          success: `${process.env.VITE_APP_URL}/orden/exitosa`,
          failure: `${process.env.VITE_APP_URL}/orden/fallida`,
          pending: `${process.env.VITE_APP_URL}/orden/exitosa`,
        },
        auto_return: 'approved',
        statement_descriptor: 'Importados MC',
      },
    });
    res.status(200).json({ init_point: result.init_point });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creando preferencia de pago' });
  }
}

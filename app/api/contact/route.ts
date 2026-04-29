import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import nodemailer from 'nodemailer'

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  company: z.string().max(100).optional(),
  service: z.string().min(1).max(200),
  description: z.string().min(10).max(5000),
  budget: z.string().max(100).optional(),
  timeline: z.string().max(100).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as unknown
    const data = contactSchema.parse(body)

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: `"33 Nexus" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `New Project Inquiry — ${data.service} — ${data.name}`,
      html: `
        <div style="font-family: DM Sans, sans-serif; background: #080808; color: #F5F0E8; padding: 40px; border-radius: 16px;">
          <div style="border-bottom: 1px solid #C9A84C; padding-bottom: 24px; margin-bottom: 24px;">
            <h1 style="font-family: 'Bebas Neue', sans-serif; color: #C9A84C; font-size: 2rem; letter-spacing: 0.1em; margin: 0;">
              NEW PROJECT INQUIRY
            </h1>
            <p style="color: #6B6560; margin: 8px 0 0; font-size: 0.88rem;">33 Nexus Client Portal</p>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1F1F1F; color: #6B6560; font-size: 0.77rem; width: 140px;">NAME</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1F1F1F; color: #F5F0E8;">${data.name}</td>
            </tr>
            ${data.company ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1F1F1F; color: #6B6560; font-size: 0.77rem;">COMPANY</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1F1F1F; color: #F5F0E8;">${data.company}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1F1F1F; color: #6B6560; font-size: 0.77rem;">SERVICE</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1F1F1F; color: #C9A84C;">${data.service}</td>
            </tr>
            ${data.budget ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1F1F1F; color: #6B6560; font-size: 0.77rem;">BUDGET</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1F1F1F; color: #F5F0E8;">${data.budget}</td>
            </tr>` : ''}
            ${data.timeline ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1F1F1F; color: #6B6560; font-size: 0.77rem;">TIMELINE</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1F1F1F; color: #F5F0E8;">${data.timeline}</td>
            </tr>` : ''}
          </table>

          <div style="margin-top: 24px;">
            <div style="color: #6B6560; font-size: 0.77rem; margin-bottom: 8px;">PROJECT DESCRIPTION</div>
            <p style="color: #F5F0E8; line-height: 1.8; background: #0D0D0D; padding: 20px; border-radius: 8px; border-left: 2px solid #C9A84C;">
              ${data.description.replace(/\n/g, '<br>')}
            </p>
          </div>

          <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #1F1F1F; color: #6B6560; font-size: 0.66rem; letter-spacing: 0.15em;">
            © 2024 33 NEXUS — 888
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: err.errors }, { status: 400 })
    }
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}

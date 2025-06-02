import { type NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = process.env.RESEND_SENDER;

export async function POST(request: NextRequest) {
  const { name, email, message, subject } = await request.json();

  if (!name || !email || !message || !subject) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const { error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Resendのデフォルト送信元アドレス
      to: [toEmail ?? 'mkame19941031@gmail.com'], // Resendのテスト用アドレス
      subject: `[お問い合わせ] ${subject} from ${name}`,
      html: `<p>${name}さんからお問合せがありました。</p><p>メールアドレス: ${email}</p><p>メッセージ: ${message}</p>`,
    });

    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({ error: 'メール送信中にエラーが発生しました' }, { status: 500 });
  }
}

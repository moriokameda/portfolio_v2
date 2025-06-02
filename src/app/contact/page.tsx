'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  name: z.string().min(2, {
    message: '名前は2文字以上で入力をお願いいたします。',
  }),
  email: z.string().email({
    message: 'メールアドレスが不正です。',
  }),
  subject: z.string().min(1, {
    message: '件名は1文字以上入力してください。',
  }),
  message: z.string().min(1, {
    message: '問い合わせ内容は1文字以上入力してください。',
  }),
});

export default function ContactPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'メール送信に失敗しました');
      }

      toast.success('メッセージを送信しました');
      form.reset();
      router.push('/');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'メール送信に失敗しました');
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">お問い合わせ</h1>
            <p className="text-xl text-muted-foreground">
              お気軽にメッセージをお送りください。できるだけ早くご返信いたします。
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>お問い合わせフォーム</CardTitle>
              <CardDescription>
                以下のフォームにご記入ください。24時間以内にご返信いたします。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>お名前</FormLabel>
                        <FormControl>
                          <Input placeholder="お名前をご入力ください" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>メールアドレス</FormLabel>
                        <FormControl>
                          <Input placeholder="example@example.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>件名</FormLabel>
                        <FormControl>
                          <Input placeholder="お問い合わせの件名をご入力ください" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>メッセージ</FormLabel>
                        <FormControl>
                          <textarea
                            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="プロジェクトについてのご相談や、その他のお問い合わせをご記入ください"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" size="lg">
                    送信する
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

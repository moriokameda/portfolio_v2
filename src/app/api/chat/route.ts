import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `あなたはプロジェクト情報を整理するアシスタントです。
以下の2つの機能を提供します：

1. プロジェクト情報の登録
ユーザーの入力から以下の情報を抽出し、JSONフォーマットで返してください：
- title: プロジェクトのタイトル
- description: プロジェクトの説明
- technologies: 使用技術の配列
- imagePath: 画像パス（デフォルトは"/images/projects/default.jpg"）
- github: GitHubリポジトリのURL（オプション）
- demo: デモサイトのURL

2. プロジェクト一覧の表示
ユーザーがプロジェクト一覧や登録済みプロジェクトについて質問した場合、
"showProjects": true を含むJSONを返してください。

応答フォーマット：
1. プロジェクト登録の場合
{
  "data": {
    "title": "プロジェクト名",
    ...（他のフィールド）
  }
}

2. プロジェクト一覧表示の場合
{
  "showProjects": true,
  "message": "現在登録されているプロジェクト一覧を表示します。"
}

3. 質問や確認が必要な場合
{
  "message": "質問内容や確認メッセージ"
}

情報が不足している場合は、ユーザーに質問してください。`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.map((msg: { role: string; content: string }) => ({
          role: msg.role,
          content: msg.content,
        })),
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const response = completion.choices[0].message;
    let result;

    try {
      // レスポンスがJSONかどうかを確認
      const content = response.content || '';
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        const jsonData = JSON.parse(jsonMatch[0]);
        if (jsonData.data) {
          // プロジェクトデータが含まれている場合
          result = {
            type: 'data',
            data: jsonData.data,
            message: content.replace(jsonMatch[0], '').trim(),
          };
        } else if (jsonData.showProjects) {
          // プロジェクト一覧表示の場合
          result = {
            type: 'showProjects',
            message: jsonData.message || '登録済みプロジェクトの一覧です：',
          };
        } else if (jsonData.message) {
          // 質問の場合
          result = {
            type: 'message',
            message: jsonData.message,
          };
        }
      } else {
        // 通常のメッセージの場合
        result = {
          type: 'message',
          message: content,
        };
      }
    } catch (error) {
      // JSON解析に失敗した場合は通常のメッセージとして扱う
      result = {
        type: 'message',
        message: response.content || '',
      };
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process the request' },
      { status: 500 }
    );
  }
}

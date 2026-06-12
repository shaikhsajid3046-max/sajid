import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') ?? 'Sajid Sheikh'
  const subtitle = searchParams.get('subtitle') ?? 'Designer & Creative'

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          width: '100%',
          height: '100%',
          padding: '60px',
          backgroundColor: '#080808',
          fontFamily: 'serif',
        }}
      >
        <p
          style={{
            fontSize: 14,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#545454',
            marginBottom: 24,
          }}
        >
          {subtitle}
        </p>
        <h1
          style={{
            fontSize: 72,
            fontWeight: 300,
            lineHeight: 0.95,
            color: '#F0EDE8',
            margin: 0,
          }}
        >
          {title}
        </h1>
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            right: 60,
            fontSize: 12,
            letterSpacing: '0.1em',
            color: '#BFA46D',
            textTransform: 'uppercase',
          }}
        >
          sajidsheikh.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}

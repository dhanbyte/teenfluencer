import { NextResponse } from 'next/server'

export async function GET() {
  const svg = `
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="200" fill="#f3f4f6"/>
      <text x="150" y="100" text-anchor="middle" fill="#6b7280" font-family="Arial" font-size="14">
        Product Image
      </text>
    </svg>
  `
  
  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000'
    }
  })
}
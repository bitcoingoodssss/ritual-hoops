import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const twitterId = searchParams.get('id');

  if (!twitterId) {
    return NextResponse.json({ error: 'Twitter ID is required' }, { status: 400 });
  }

  const cleanId = twitterId.replace('@', '').trim();
  if (!cleanId || cleanId.length < 1) {
    return NextResponse.json({ error: 'Invalid Twitter ID' }, { status: 400 });
  }

  try {
    // Use unavatar.io to validate - it returns 404 for non-existent Twitter accounts
    const validateUrl = `https://unavatar.io/twitter/${cleanId}?fallback=false`;
    const validateRes = await fetch(validateUrl, { 
      method: 'HEAD', 
      redirect: 'follow',
      headers: { 'User-Agent': 'RitualHoops/1.0' }
    });

    // unavatar returns 302/200 for valid accounts, 404 for invalid
    if (!validateRes.ok) {
      return NextResponse.json({ 
        error: 'Twitter account not found', 
        valid: false 
      }, { status: 404 });
    }

    // Get the avatar URL (follow redirects to get actual image)
    const avatarUrl = `https://unavatar.io/twitter/${cleanId}?size=256`;
    
    return NextResponse.json({ 
      success: true, 
      valid: true,
      avatarUrl,
      twitterId: cleanId 
    });
  } catch {
    return NextResponse.json({ 
      error: 'Failed to verify Twitter account', 
      valid: false 
    }, { status: 500 });
  }
}
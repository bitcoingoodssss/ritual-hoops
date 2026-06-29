import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const twitterId = searchParams.get('id');

  if (!twitterId) {
    return NextResponse.json({ error: 'Twitter ID is required' }, { status: 400 });
  }

  try {
    const cleanId = twitterId.replace('@', '');
    
    // Try multiple approaches to get the avatar
    // Method 1: Use the Twitter profile image URL pattern
    const avatarUrl = `https://unavatar.io/twitter/${cleanId}`;
    
    // Verify the URL works by making a HEAD request
    const response = await fetch(avatarUrl, { method: 'HEAD', redirect: 'follow' });
    
    if (response.ok) {
      // Also try to get the actual profile pic URL for higher quality
      const profileUrl = `https://unavatar.io/twitter/${cleanId}?size=256`;
      return NextResponse.json({ 
        success: true, 
        avatarUrl: profileUrl,
        twitterId: cleanId 
      });
    }

    // Fallback: Use DiceBear avatar as placeholder
    const fallbackUrl = `https://api.dicebear.com/9.x/adventurer/svg?seed=${cleanId}&backgroundColor=ff6b35`;
    return NextResponse.json({ 
      success: true, 
      avatarUrl: fallbackUrl,
      twitterId: cleanId,
      fallback: true 
    });
  } catch {
    const cleanId = twitterId.replace('@', '');
    const fallbackUrl = `https://api.dicebear.com/9.x/adventurer/svg?seed=${cleanId}&backgroundColor=ff6b35`;
    return NextResponse.json({ 
      success: true, 
      avatarUrl: fallbackUrl,
      twitterId: cleanId,
      fallback: true 
    });
  }
}
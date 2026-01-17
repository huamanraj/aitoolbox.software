import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of common bot/crawler paths that should return 404 immediately
const BLOCK_PATHS = [
    '/wp-admin',
    '/wp-login',
    '/wordpress',
    '/.env',
    '/.git',
    '/admin.php',
    '/xmlrpc.php',
    '/wp-config.php',
    '/setup.php',
    '/config.php',
    '/blog/wp-admin',
    '/blog/wp-login',
    '/wp/wp-admin',
    '/wp/wp-login',
    '/administrator',
    '/v1/user/login',
    '/api/v1/user/login',
];

// List of common file extensions that should be handled as static
const STATIC_EXTENSIONS = [
    '.txt',
    '.xml',
    '.json',
    '.ico',
    '.png',
    '.jpg',
    '.jpeg',
    '.gif',
    '.svg',
    '.webp',
    '.woff',
    '.woff2',
    '.ttf',
    '.eot',
];

// Specific known static files that should be served normally
const KNOWN_STATIC_FILES = [
    '/favicon.ico',
    '/apple-touch-icon.png',
    '/browserconfig.xml',
    '/robots.txt',
    '/sitemap.xml',
    '/ads.txt',
    '/logo.png',
    '/favicon.svg',
    '/favicon-96x96.png',
    '/web-app-manifest-192x192.png',
    '/web-app-manifest-512x512.png',
    '/og-image.jpg',
    '/manifest.json',
    '/.well-known/assetlinks.json',
];

export function middleware(request: NextRequest) {
    const { pathname, search } = request.nextUrl;
    const url = request.nextUrl.clone();
    const host = request.headers.get('host');

    // 1. WWW to non-WWW redirect (Canonical Domain)
    if (host?.startsWith('www.')) {
        url.hostname = host.replace(/^www\./, '');
        return NextResponse.redirect(url, 301);
    }

    // 2. Trailing slash removal (Canonical Path)
    // Next.js handles this by default if trailingSlash: false,
    // but explicit 301 in middleware is better for SEO consistency.
    if (pathname !== '/' && pathname.endsWith('/')) {
        url.pathname = pathname.slice(0, -1);
        return NextResponse.redirect(url, 301);
    }

    // 3. Enforce lowercase paths (Canonical Case)
    // Exclude _next internals and known static files if they need case sensitivity (though usually they don't)
    if (pathname !== pathname.toLowerCase() && !pathname.startsWith('/_next')) {
        url.pathname = pathname.toLowerCase();
        return NextResponse.redirect(url, 301);
    }

    // 4. Block common malicious/bot paths immediately with 404
    // This is cleaner for SEO than redirecting to home
    if (BLOCK_PATHS.some(path => pathname.toLowerCase().startsWith(path.toLowerCase()))) {
        return new NextResponse(null, { status: 404 });
    }

    // 5. Handle common missing static files
    const isStaticFile = STATIC_EXTENSIONS.some(ext => pathname.toLowerCase().endsWith(ext));

    if (isStaticFile) {
        // Case-insensitive check for known static files
        const isKnown = KNOWN_STATIC_FILES.some(f => f.toLowerCase() === pathname.toLowerCase());

        if (isKnown) {
            return NextResponse.next();
        }

        // If it's a static file request that we don't recognize and isn't handled by the matcher exclusion,
        // it's better to 404 than to redirect to home.
        return new NextResponse(null, { status: 404 });
    }

    // Standard response for all other requests
    const response = NextResponse.next();

    // 6. Security & SEO Headers
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    // Cache control for dynamic pages (short cache, or revalidate)
    // For Next.js, it's better to let Next.js handle its own page caching, 
    // but we can ensure standard headers are present.

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - all files with common image/font extensions
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot)$).*)',
    ],
};


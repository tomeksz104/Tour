//import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// export default withAuth(
//   // `withAuth` augments your `Request` with the user's token.
//   function middleware(req) {
//     if (
//       req.nextUrl.pathname === "/admin" &&
//       req.nextauth.token?.user.role !== "admin"
//     ) {
//       return new NextResponse("You are not authorized!");
//     }
//   },
//   {
//     callbacks: {
//       authorized: (params) => {
//         let { token } = params;
//         return !!token;
//       },
//     },
//   }
// );

// export function middleware(request) {
//   return NextResponse.next();
// }

export default async function middleware(req) {
  const path = req.nextUrl.pathname;
  const session = !req.cookies.get("next-auth.session-token");

  if (!session) {
    return NextResponse.redirect(
      new URL(`/api/auth/signin?callbackUrl=${path}`, req.url)
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/user/settings", "/place/new", "/place/update/:path*"],
};

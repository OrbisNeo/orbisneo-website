export const GET = () => {
  const prod =
    import.meta.env.PUBLIC_SITE_ENV === "production" &&
    import.meta.env.PUBLIC_NOINDEX !== "true";

  const body = prod
    ? "User-agent: *\nDisallow: /admin/\n\nSitemap: https://www.orbisneoconsulting.com/sitemap.xml\n"
    : "User-agent: *\nDisallow: /\n";

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};

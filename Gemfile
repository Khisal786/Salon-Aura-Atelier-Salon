source "https://rubygems.org"

# Modern Jekyll 4 setup
gem "jekyll", "~> 4.3"

# Essential agency plugins (fully compatible with GitHub Pages hosting)
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.17.0"
  gem "jekyll-seo-tag", "~> 2.8"
  gem "jekyll-sitemap", "~> 1.4"
end

# Windows compatibility for timezone data only (no broken native file watchers)
platforms :windows do
  gem "tzinfo", "~> 2.0"
  gem "tzinfo-data"
end
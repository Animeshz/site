// https://alexanderle.com/create-an-rss-feed-from-scratch

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Feed } from "feed";
import { SitemapStream, streamToPromise } from 'sitemap';

const rss_file = 'rss.xml'
const atom_file = 'atom.xml'

// Full credit to: https://stackoverflow.com/a/45130990/11377112
async function* get_md_files(dir) {
    const dirents = await fs.promises.readdir(dir, { withFileTypes: true })
    for (const dirent of dirents) {
        const res = path.resolve(dir, dirent.name)
        if (dirent.isFile() && dirent.name.endsWith('.md')) {
            if (dirent.name == 'index.md') continue;
            yield res
        } else if (dirent.isDirectory()) {
            yield* get_md_files(res)
        }
    }
}

async function gen_feed(cfg, site_url, sitemap_stream) {
    const feed = new Feed({
        title: cfg.site.title,
        description: cfg.site.description,
        link: site_url + cfg.site.base,
        language: "en",
        copyright: "All rights reserved 2022, Animesh Sahu",
        feedLinks: {
            rss: site_url + cfg.site.base + rss_file,
            atom: site_url + cfg.site.base + atom_file,
        },
        author: {
            name: "Animesh Sahu",
            email: "animeshsahu19@yahoo.com",
            link: "https://github.com/Animeshz",
        }
    })

    const sitemap = new SitemapStream({ hostname: site_url })
    sitemap.pipe(sitemap_stream)

    for await (const filename of get_md_files(cfg.srcDir + '/blogs')) {
        const file_content = await fs.promises.readFile(filename, 'utf-8')
        const stat = await fs.promises.stat(filename)
        const { data, excerpt } = matter(file_content, { excerpt: f => f.excerpt = (f.content.split('\n').find(e => e != '') || '').replace(/^#\s+/, '') })
        if (!data.draft) {
            const html_file = filename.replace(cfg.srcDir, '').replace(/^\//, '').replace(/\.md/, '.html')
            const link = site_url + cfg.site.base + html_file
            feed.addItem({
                title: data.title || excerpt,
                link: link,
                description: data.description,
                date: new Date(data.created || stat.birthtime),
                image: (site_url + cfg.site.base + data?.image) ?? '',
                content: data.description,
            });

            sitemap.write(link)
        }
    }

    sitemap.end()

    return feed
}

async function run(cfg, site_url, dest) {
    if (!fs.existsSync(dest))
        await fs.promises.mkdir(dest, { recursive: true })

    const sitemap_stream = fs.createWriteStream(path.resolve(dest, 'sitemap.xml'))
    let feed = await gen_feed(cfg, site_url, sitemap_stream)
    await fs.promises.writeFile(path.resolve(dest, rss_file), feed.rss2(), 'utf-8')
    await fs.promises.writeFile(path.resolve(dest, atom_file), feed.atom1(), 'utf-8')
}

export default run;

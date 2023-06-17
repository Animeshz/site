import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import CheapWatch from 'cheap-watch';

function convert_date(date) {
    date = new Date(date)
    return {
        time: +date,
        string: date.toJSON().split('T')[0]
    }
}

function compare_date(obj1, obj2) {
    return obj1.frontmatter.created.time < obj2.frontmatter.created.time ? 1 : -1
}

async function blogs_meta(path) {
    let paths = await fs.promises.readdir(path, { withFileTypes: true })
    let blogs = await Promise.all(
        paths.filter(dirent => dirent.isFile() && dirent.name != 'index.md')
            .map(dirent => dirent.name)
            .map(async item => {
                const filename = path + '/' + item
                const stat = await fs.promises.stat(filename)
                const content = await fs.promises.readFile(filename, 'utf-8')
                const { data, excerpt } = matter(content, { excerpt: f => f.excerpt = (f.content.split('\n').find(e => e != '') || '').replace(/^#\s+/, '') })
                data.created = convert_date(data.created || stat.birthtime)
                data.updated = convert_date(data.updated || stat.mtime)
                return {
                    title: data.title || excerpt,
                    frontmatter: data,
                    regular_path: `/blogs/${item.replace('.md', '.html')}`
                }
            })
    )

    blogs = blogs.filter(result => !result.frontmatter.draft)
    blogs.sort(compare_date)
    return blogs
}

async function write(src, dest) {
    let blogs = await blogs_meta(src)
    await fs.promises.writeFile(dest + '/blogs.json', JSON.stringify(blogs), 'utf-8')
}

async function run(src, dest) {
    if (!fs.existsSync(dest))
        await fs.promises.mkdir(dest, { recursive: true })

    write(src, dest)
    if (process.env.NODE_ENV === 'production') return;

    const watcher = new CheapWatch({
        dir: path.resolve(src),
        filter: ({ path }) => path.endsWith('.md'),
        debounce: 50
    })
    await watcher.init()
    watcher.on('+', () => write(src, dest))
    watcher.on('-', () => write(src, dest))
}

export default run;

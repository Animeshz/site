import{_ as e,o as t,c as a,V as o}from"./chunks/framework.d1c50dd7.js";const g=JSON.parse('{"title":"June 2023","description":"","frontmatter":{"title":"June 2023","created":"2023-06-23 10:17 PM","updated":"2023-06-23 10:17 PM"},"headers":[],"relativePath":"journal/2023/June.md","filePath":"journal/2023/June.md","lastUpdated":1695392810000}'),i={name:"journal/2023/June.md"},r=o('<h1 id="june-2023" tabindex="-1">June 2023 <a class="header-anchor" href="#june-2023" aria-label="Permalink to &quot;June 2023&quot;">​</a></h1><p>At the time of writing, its <s>been halfway</s> (update: <em>almost the whole</em>) june has passed. And a lot has happened this month as my classes have ended after the endsem, with a break of this full month.</p><h2 id="reached-home-4th-of-june" tabindex="-1">Reached home 4th of June <a class="header-anchor" href="#reached-home-4th-of-june" aria-label="Permalink to &quot;Reached home 4th of June&quot;">​</a></h2><p>Had travelled Lucknow more than ever (with my Dad coming here before we leave for home). After that, we finally departed to Allahabad through Cab at 9AM for taking a direct flight to Raipur, which we finally reached at 6:30PM.</p><h2 id="entertainment" tabindex="-1">Entertainment <a class="header-anchor" href="#entertainment" aria-label="Permalink to &quot;Entertainment&quot;">​</a></h2><p>Finished watching <a href="https://en.wikipedia.org/wiki/The_Flash_(season_3)" target="_blank" rel="noreferrer">The Flash Season 3</a>, a SciFi series with alot of pressure handling going on with time-travel side-effects, working with detective and great visuals.</p><p><sub>The Flash is a character based on DC Comics.</sub></p><h2 id="books" tabindex="-1">Books <a class="header-anchor" href="#books" aria-label="Permalink to &quot;Books&quot;">​</a></h2><p>Read first 2 chapters of <a href="https://en.wikipedia.org/wiki/Ikigai" target="_blank" rel="noreferrer">Ikigai</a>. Start applying anti-aging secrets of city of Okinawa (situated in Japan, a city of centernarians - every 24.55% of people over there live over age of 100 years).</p><p>Read <a href="https://en.wikipedia.org/wiki/The_4-Hour_Workweek" target="_blank" rel="noreferrer">4 Hour Work Week</a> halfway through (till chapter 7), start applying the principles which is what next 2 points below are.</p><h2 id="reinstall-void-on-zfs" tabindex="-1">Reinstall Void on ZFS <a class="header-anchor" href="#reinstall-void-on-zfs" aria-label="Permalink to &quot;Reinstall Void on ZFS&quot;">​</a></h2><p>I&#39;ve moved my setup to use <a href="/site/notes/20-29--DevEnvironment/21--Linux/21.01-ZFS.html">21.01 ZFS filesystem</a>, it has got me a lot of benefits such as extra storage (reported 1.48x compression ratio w/ lz4 compression method), pooled storage i.e. multiple volume all share same storage space, atomic r/w, snapshots, and many more (you could even merge two disks later).</p><h2 id="moved-my-linux-dotfiles-over-to-nix" tabindex="-1">Moved my linux dotfiles over to nix <a class="header-anchor" href="#moved-my-linux-dotfiles-over-to-nix" aria-label="Permalink to &quot;Moved my linux dotfiles over to nix&quot;">​</a></h2><p>I have tried many ways to manage my dotfiles &amp; installation of packages in the past, starting with Makefile, yadm bootstrapping script, Justfile, normal shell scripts, ansible, puppet, chef. I had atleast a few complaints from each of them!</p><p>Recently tried nix, and it finally became my go-to option.</p><p>See <a href="/site/notes/20-29--DevEnvironment/21--Linux/21.02-Nix.html">21.02 Nix</a> for more info.</p><h2 id="fight-with-emacs-and-rise-of-emacs-chdir" tabindex="-1">Fight with emacs and rise of emacs-chdir <a class="header-anchor" href="#fight-with-emacs-and-rise-of-emacs-chdir" aria-label="Permalink to &quot;Fight with emacs and rise of emacs-chdir&quot;">​</a></h2><p>My experience with emacs has always been good from inside but inferior from outside.</p><p>I get that elisp is very powerful and can handle almost everything you wish to do from inside, but sometimes you have to rely on system-wide things just because they create more consistency across use of different apps.</p><p>My <a href="https://github.com/Animeshz/scripts/blob/main/main/pwd-launch" target="_blank" rel="noreferrer">pwd-launch</a> script launches applications in directory the currently focused/active X window is at. This was breaking since emacs unlike most well-behaved softwares has <em>itch</em> to diverge from unix-philosophy. It&#39;ll give you cli option to chdir emacs to certain directory at startup which is literally of no use, as you can just cd and exec emacs instead... But emacs will never report directory change as you change file, it never calls chdir, never give you option to even allow you doing that from any elisp function. Dude!!! Ok I shouldn&#39;t rant this much in this page.</p><p>I had to write a simple <a href="https://github.com/Animeshz/emacs-chdir" target="_blank" rel="noreferrer">emacs-package</a> to fix it by calling chdir whenever <code>(default-directory)</code> changes.</p><h2 id="opened-a-pr-on-nixos-nixpkgs-to-fix-ruby-packaging" tabindex="-1">Opened a PR on NixOS/nixpkgs to fix ruby packaging <a class="header-anchor" href="#opened-a-pr-on-nixos-nixpkgs-to-fix-ruby-packaging" aria-label="Permalink to &quot;Opened a PR on NixOS/nixpkgs to fix ruby packaging&quot;">​</a></h2><p>I&#39;ve used puppet (through RAL) along with nix, and its not packaged there, for the most obvious reason its not needed in NixOS. So I packaged it for personal use, but encountered an unexpected issue.</p><p>For over two years, there has been this issue <a href="https://github.com/NixOS/nixpkgs/issues/128223" target="_blank" rel="noreferrer">#128223</a> which was blocking everybody to package any ruby package coming from custom path or git on nix/nixos (and I needed custom puppet build with xbps - void-linux package manager - so needed git build of ruby gem).</p><p>I go ahead and fixed it by going deep into how it was implemented and how its delegated ruby-bundler handled the compilation process. It was fun to explore, everything regarding changes I listed in the PR description <a href="https://github.com/NixOS/nixpkgs/issues/237917" target="_blank" rel="noreferrer">#237917</a>, be sure to check out you&#39;ll definitely learn something new!</p><h2 id="redesign-this-site" tabindex="-1">Redesign this site <a class="header-anchor" href="#redesign-this-site" aria-label="Permalink to &quot;Redesign this site&quot;">​</a></h2><p>Threw away the legacy.</p><p>Changed color-scheme, new way to handle indexes using <a href="https://animeshz.github.io/site/notes/10-19--Programming/11--Languages/13.01-Emacs.html" target="_blank" rel="noreferrer">13.01 Emacs org-mode</a>, merge awesome into the notes section, added projects and this journal sections to the site. Changing the index &amp; RSS generation of blogs into this org-mode is also queued for the future.</p><h2 id="migrate-to-logseq-for-note-taking" tabindex="-1">Migrate to logseq for note-taking. <a class="header-anchor" href="#migrate-to-logseq-for-note-taking" aria-label="Permalink to &quot;Migrate to logseq for note-taking.&quot;">​</a></h2><p>Previously I used to use google calendar for hourly journaling &amp; idea note on android for quickly writing down ideas &amp; a private discord server to dump links to, just cause it works from both mobile and desktop.</p><p>I finally found a good app, <a href="https://animeshz.github.io/site/notes/90-99--Miscellaneous/91--Curation/91.01-Note-Taking.html" target="_blank" rel="noreferrer">91.01 Note Taking Logseq</a> that is cross-platform as well as effective for my note taking, for the reasons I wrote in the note.</p><h2 id="entertainment-continue" tabindex="-1">Entertainment (continue) <a class="header-anchor" href="#entertainment-continue" aria-label="Permalink to &quot;Entertainment (continue)&quot;">​</a></h2><p>Skipped Flash Season 4 with summary, completed Flash Season 5, and see summary of subsequent seasons instead to save more time, may watch final S8 &amp; S9 sometime in future.</p><h2 id="capture-and-make-everything-searchable" tabindex="-1">Capture and make everything searchable <a class="header-anchor" href="#capture-and-make-everything-searchable" aria-label="Permalink to &quot;Capture and make everything searchable&quot;">​</a></h2><p>One of core principles of 4 Hour Work Week is that, Evernote used to solve problem for him by making the images captured searcable, easily clip the bottle / business-card / handwritten-notes and just search whatever you remembered about it and boom.</p><p>However that comes only with Evernote premium, so I tried some HuggingFace models for OCR recognition and image captioning, found <a href="https://huggingface.co/Salesforce/blip-image-captioning-base" target="_blank" rel="noreferrer">Blip Image Captioning Base</a> works really great, although none of models I found were particularly great for OCR (text-recognition).</p><p>At the end of it, found that Google Keep actually already has inbuilt OCR that&#39;s really good for even handwritten notes. Making images searchable, and doesn&#39;t coagulate gallary either. Also allows for option to extract the text into note, so its transparent to also view the detected text rather than just making images searchable.</p><h2 id="books-continue" tabindex="-1">Books (continue) <a class="header-anchor" href="#books-continue" aria-label="Permalink to &quot;Books (continue)&quot;">​</a></h2><p>Started <a href="https://markmanson.net/books/everything-is-fucked" target="_blank" rel="noreferrer">Everything is f*cked - A book about hope</a> by Mark Manson. He is one my favourite author, and this book goes even deep into the rabbithole of more of those fundamental concepts along with validations that his previous book might have seem to missing.</p><p>And <a href="https://summaries.com/blog/12-months-to-1-dollar-million" target="_blank" rel="noreferrer">12 months to $1M</a> by Ryan Daniel. At the start, its been very dark, but I like to point one quote I liked the most.</p><blockquote><p>That&#39;s why people hate on billionaires, or company that don&#39;t pay enough taxes: They believe that &quot;top 1 percent&quot; get rich by taking from others.<br><br> The truth is that we create value. For every slice you take you have to bake a whole other pie.</p></blockquote><p>Not particularly book, but start understanding <a href="https://www.youtube.com/watch?v=34fp5QO9Yz8&amp;pp=ygUIc3RvaWNpc20%3D" target="_blank" rel="noreferrer">Stoicism</a> (from different sources) for overcoming emotional-stress.</p><h2 id="resume" tabindex="-1">Resume <a class="header-anchor" href="#resume" aria-label="Permalink to &quot;Resume&quot;">​</a></h2><p>With intern-season I&#39;ve almost forgot to update my resume, and had made it earlier using AltaCV template (with those design and all).</p><p>So I remade <a href="https://www.linkedin.com/in/animeshz/overlay/1635530922297/single-media-viewer?type=DOCUMENT&amp;profileId=ACoAADVBJAsBVJhjZH5jMP_OqJZDJYMT1Gdiwro&amp;lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BvmYB9zZXTKOnZjdkjHcbjw%3D%3D" target="_blank" rel="noreferrer">my resume</a> in plain text format, over google docs.</p><h2 id="stack-overflow-2023-survey-results" tabindex="-1">Stack Overflow 2023 Survey Results <a class="header-anchor" href="#stack-overflow-2023-survey-results" aria-label="Permalink to &quot;Stack Overflow 2023 Survey Results&quot;">​</a></h2><p>Interesting to see <a href="https://www.phoenixframework.org" target="_blank" rel="noreferrer">Phoenix</a> is the most admired web framework and technology; more developers would choose to work with Phoenix again than those who have used the three most common: React, Node.js, and Next.js.</p><p>It seemed fun that a lot of people want to shift to Notepad++, even those using VS Code right now, really interesting.</p><h2 id="other-events-towards-the-end-of-june" tabindex="-1">Other events towards the end of June <a class="header-anchor" href="#other-events-towards-the-end-of-june" aria-label="Permalink to &quot;Other events towards the end of June&quot;">​</a></h2><ul><li>Celebrated birthday of my cousin on 26th of June, Gifted him an extra-fluid gel pen for writing anywhere and one of my favourite full-read book: Rework.</li><li>Written next blog post: <a href="https://animeshz.github.io/site/blogs/using-git-for-effective-collaboration.html" target="_blank" rel="noreferrer">Using git for effective collaboration - Understanding branch, refs and rebase</a></li><li>Start converting keyboard-mouse-kt project to use Nix instead of bulky Docker for the build [WIP].</li><li>Start on new project <em>rebase-my-life</em> [WIP] which closely resembles to interactive git rebase, to run bulk operations on various tools like gmail (e.g. bulk unsub/delete using vim), generally for those apps which has list-like / table-like data structures involved.</li></ul>',50),n=[r];function s(h,l,d,c,u,p){return t(),a("div",null,n)}const f=e(i,[["render",s]]);export{g as __pageData,f as default};